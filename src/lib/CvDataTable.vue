<template>
  <div>
    <div class="data-table-wrapper">
      <table class="table">
        <!-- Header -->
        <thead>
        <tr>
          <th v-if="rowsSelectable">انتخاب</th>
          <th class="row-number">ردیف</th>
          <th v-if="hasOptions" class="options">عملیات</th>
          <!-- rest of the headers -->
          <th
              v-show="!header.hidden"
              v-for="(header, index) in actualHeaders"
              :key="index"
              class="clickable"
              @click="onSortTable(header.value)"
          >
            {{ header.text }}
          </th>
        </tr>
        </thead>
        <!-- Content -->
        <tbody>
        <!-- skeleton page -->
        <tr
            v-for="i in 3"
            :key="`skeleton${i}`"
            v-if="rows.length === 0 && loading"
            class="skeleton"
            :style="{ maxHeight: maxHeight }"
        >
          <td v-for="i in actualHeaders.length + 1 " :key="i" class="skeleton-box"></td>
        </tr>
        <!-- if no-content section -->
        <tr v-if="rows.length === 0 && !loading">
          <td colspan="100%">
            <div class="empty-state">
              <div class="content">
                <div class="icon">
                  <img src="/images/errors/not_found.svg" alt="Not Found :(">
                </div>
                <div class="message">اطلاعاتی یافت نشد.</div>
                <div class="help">
                  فیلترهای جستجو را بررسی کنید.
                </div>
              </div>
            </div>
          </td>
        </tr>
        <!-- loading floating dots -->
        <tr v-if="loading" class="loading">
          <td colspan="100%">
            <cv-floating-dot/>
          </td>
        </tr>
        <!-- table rows -->
        <tr
            v-for="(row, index) in rows"
            :key="index"
            @click="onRowClick(row)"
        >
          <!-- selection column -->
          <td
              v-if="rowsSelectable"
              @click="$emit('input', selectedRows)"
          >
            <cv-checkbox v-model="selectedRows" :checked-value="row"/>
          </td>
          <!-- numbers column -->
          <td>
            {{ (page - 1) * rowsPerPage + index + 1 }}
          </td>
          <!-- options column -->
          <td v-if="hasOptions">
            <slot name="options" :rowValue="row"/>
          </td>
          <!-- rest of the columns -->
          <td
              v-show="!header.hidden"
              v-for="(header, index) in actualHeaders"
              :key="index"
              :style="{ textAlign: header.align }"
              @click="onCellClick(row, header.value)"
          >
            <slot :name="header.value" :values="row">
              <div @mouseenter="checkMarquee" @mouseleave="removeMarquee">
                {{ getObj(row, header.value) }}
              </div>
            </slot>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <!-- pagination section -->
        <tr>
          <td colspan="100%">
            <cv-pagination
                v-model="showSettings"
                v-if="totalRows > rowsPerPage"
                :total-rows="totalRows"
                :rows-per-page="rowsPerPage"
                :leftover="rows.length"
                @syncPagination="syncPagination"
            />
          </td>
        </tr>

        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    totalRows: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    rowsPerPage: {
      type: Number,
      default: 1
    },
    headers: {
      type: Array,
      default() {
        return []
      }
    },
    rows: {
      type: Array,
      default() {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: false
    },
    rowsSelectable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      gridTemplateColumns: '',
      resizingEle: null,
      resizingEleIndex: null,
      hasOptions: false,
      selectedRows: [],
      showSettings: false,
      chosenMaxHeight: 'auto',
      inputHeight: '500',
      listOfColumns: null,
      actualHeaders: [],
      clickable: false,
      reverseSort: false,
      curentSortKey: null,
      cvSelectOptions: [
        {name: 'چپ', value: 'start'},
        {name: 'وسط', value: 'center'},
        {name: 'راست', value: 'end'}
      ],
      alignment: {name: 'وسط ', value: 'aaa'},
      // The current dragging item
      draggingEle: null,
      // The current position of mouse relative to the dragging element
      x: 0,
      y: 0,
      // to avoid other elements to fill the position of the dragging element
      placeholder: null,
      isDraggingStarted: false
    }
  },
  created() {
    // adding necessary REACTIVE properties to headers
    this.headers.forEach((element) => {
      // hidden sets its visibility, allowing users to active/deactive a column
      if (!element.hidden) {
        this.$set(element, 'hidden', false)
      }
      // is width is not pre-set, we set it to auto
      if (!element.width) {
        this.$set(element, 'width', 'auto')
      }
      // same with align
      if (!element.align) {
        this.$set(element, 'align', 'center')
      }
      // create a header clone so that we can manipulate it later
      this.actualHeaders.push({...element})
    })

    // set initial widths according to user settings
    // (60px is for numbers column, 50px is for chechbox column)
    this.gridTemplateColumns = this.rowsSelectable ? '50px 60px' : '60px'

    // user can see rows are clickable
    if (!!this.$listeners['click:row']) this.clickable = true
  },
  computed: {
    /**
     * handles the height setting
     */
    maxHeight() {
      if (this.chosenMaxHeight === 'manual') {
        return this.inputHeight + 'px'
      } else return 'initial'
    }
  },
  mounted() {
    // if user has passed any #options slot, add its column
    if (!!Object.prototype.hasOwnProperty.call(this.$scopedSlots, 'options')) {
      this.hasOptions = true
      this.gridTemplateColumns += ' 80px'
    }
  },
  methods: {
    /**
     * Activates marquee effect if overflow id detected
     * @param {Mouseenter Event} e - event when mouse enters the cell
     */
    checkMarquee(e) {
      if (e.srcElement.scrollWidth > e.srcElement.clientWidth) {
        e.srcElement.classList.add('marquee')
      }
    },

    /**
     * If marquee is activated, removes it
     * @param {Mouseleave Event} e - event when mouse leaves a cell
     */
    removeMarquee(e) {
      if (e.srcElement.classList.contains('marquee')) {
        e.srcElement.classList.remove('marquee')
      }
    },

    /**
     * Emits the value of all cells in the clicked row as an object
     * @param {Object} rowValue - Data of one row
     */
    onRowClick(rowValue) {
      this.$emit('click:row', rowValue)
    },

    /**
     * Emits the text value of a cell
     * @param {Object} rowValue - Data of one row
     * @param {headerValue} headerValue - the value of the corresponding header
     */
    onCellClick(rowValue, headerValue) {
      this.$emit('click:cell', this.getObj(rowValue, headerValue))
    },

    /**
     * Finds the actual cell data in the object passed as 'rows' prop
     * @param {Object} rowValue - Data of one row
     * @param {String} headerValue - the value of the corresponding header
     * @returns {String} the text value of the required cell
     */
    getObj(row, value) {
      // if it is not nested (e.g. row['name'])
      if (!value.includes('.')) {
        return row[value]
      } else {
        /* if it is nested then we don't know how deep (row['info']['natural']['name']...['...']
      so we need to create it based on the header.value taken from the user
      */
        let result = 'row'
        value.split('.').forEach((element) => {
          result += `['${element}']`
        })
        // eslint-disable-next-line no-eval
        return eval(result)
      }
    },

    /**
     * Calculates the widths of all columns
     * if the user specified the initial width using headers[*].width,
     * it will set that as the width, otherwise 1fr will be used.
     */
    updateWidths() {
      // reset widths
      let widths = this.gridTemplateColumns

      // Add user widths for the middle column
      this.actualHeaders.forEach((element) => {
        if (element.hidden) return
        widths += element.width === 'auto' ? ' 1fr' : ` ${element.width}px`
      })

      // finally, set the widths
      document.querySelectorAll('.tr').forEach((element) => {
        element.style.gridTemplateColumns = widths
      })
    },
    /**
     * swaps teo elements in the dom
     * @param {HtmlElement} nodeA - dragging element
     * @param {HtmlElement} nodeA - target element
     */
    swap(nodeA, nodeB) {
      const parentA = nodeA.parentNode
      const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling

      // Move `nodeA` to before the `nodeB`
      nodeB.parentNode.insertBefore(nodeA, nodeB)

      // Move `nodeB` to before the sibling of `nodeA`
      parentA.insertBefore(nodeB, siblingA)
    },
    /**
     * updates the position of the dragging element based on user action
     * @param {MouseEvent} e - mousemove event
     */
    mouseMoveHandler(e) {
      const draggingRect = this.draggingEle.getBoundingClientRect()

      if (!this.isDraggingStarted) {
        // Update the flag
        this.isDraggingStarted = true

        // Let the placeholder take the height of dragging element
        // So the next element won't move up
        this.placeholder = document.createElement('div')
        this.placeholder.classList.add('placeholder')
        this.draggingEle.parentNode.insertBefore(
            this.placeholder,
            this.draggingEle.nextSibling
        )

        // Set the placeholder's height
        this.placeholder.style.height = `${draggingRect.height}px`
      }
      // Set position for dragging element
      this.draggingEle.style.position = 'absolute'
      this.draggingEle.style.top = `${e.pageY - this.y}px`
      // this.draggingEle.style.top = `${e.pageY - this.y}px`
      // this.draggingEle.style.left = `${e.pageX - this.x}px`

      // The current order:
      // prevEle
      // draggingEle
      // placeholder
      // nextEle
      const prevEle = this.draggingEle.previousElementSibling
      const nextEle = this.placeholder.nextElementSibling
      // User moves item to the top
      if (prevEle && this.isAbove(this.draggingEle, prevEle)) {
        // The current order    -> The new order
        // prevEle              -> placeholder
        // draggingEle          -> draggingEle
        // placeholder          -> prevEle
        this.swap(this.placeholder, this.draggingEle)
        this.swap(this.placeholder, prevEle)
        return
      }
      // User moves the dragging element to the bottom
      if (nextEle && this.isAbove(nextEle, this.draggingEle)) {
        // The current order    -> The new order
        // draggingEle          -> nextEle
        // placeholder          -> placeholder
        // nextEle              -> draggingEle
        this.swap(nextEle, this.placeholder)
        this.swap(nextEle, this.draggingEle)
      }
    },
    /**
     * called whenever dragging is finished, resets everything, removes listeners
     */
    mouseUpHandler() {
      // Remove the placeholder if exits
      !!this.placeholder &&
      this.placeholder.parentNode.removeChild(this.placeholder)
      // Reset the flag
      this.isDraggingStarted = false
      // Remove the position styles
      this.draggingEle.style.removeProperty('top')
      // this.draggingEle.style.removeProperty('left')
      this.draggingEle.style.removeProperty('position')

      // reset everything
      this.x = 0
      this.y = 0
      this.draggingEle = null
      this.sortHeaders()

      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', this.mouseMoveHandler)
      document.removeEventListener('mouseup', this.mouseUpHandler)
    },
    /**
     * determines if a node is above another node or not
     * @param {HtmlElement} nodeA - dragging element
     * @param {HtmlElement} nodeA - previous node of the dragging element
     * @returns {Boolean} - true if the current node is above the other, otherwise false
     */
    isAbove(nodeA, nodeB) {
      // Get the bounding rectangle of nodes
      const rectA = nodeA.getBoundingClientRect()
      const rectB = nodeB.getBoundingClientRect()

      return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2
    },
    /**
     * changes the order of the columns in actualHeaders
     * triggers on mouse up
     */
    sortHeaders() {
      let listOfColumns = this.$vnode.elm.children[1].children[0].children[1]
          .children[1].children
      let temp = []
      for (let i = 1; i < listOfColumns.length; i++) {
        this.actualHeaders.forEach((e) => {
          if (listOfColumns[i].children[1].innerText === e.text) {
            temp.push({...e})
            return
          }
        })
      }
      this.actualHeaders = []
      this.actualHeaders = temp
    },
    /**
     * constantly updates the width of the resizing header and all its sub-column data
     */
    resizeHeader() {
      this.actualHeaders[
          this.resizingEleIndex
          ].width = this.resizingEle.clientWidth
    },
    /**
     * Removes 'mouseup' and 'mousedown' listeners form document
     */
    onResizeFinish() {
      document.removeEventListener('mousemove', this.resizeHeader)
      document.removeEventListener('mouseup', this.onResizeFinish)
    },
    /**
     * updates the placeholder text for cvSelect
     * @param {Object} header - changed header
     */
    evaluatePlaceholder(header) {
      if (header.align === 'start') return 'چپ'
      else if (header.align === 'end') return 'راست'
      else return 'وسط'
    },
    onSortTable(key) {
      // if ascending then switch to descending
      if (this.curentSortKey === key) {
        this.reverseSort = !this.reverseSort
      } else {
        this.curentSortKey = key
      }

      this.sortByKey(this.rows, this.curentSortKey, this.reverseSort)
    },
    /**
     * sorts the given array by the given key
     * @param {Array} array - an array of objects
     * @param {String} key - the object key by which array is sorted
     */
    sortByKey(array, key, reverse = false) {

      if (key === null) return

      if (this.isNumber(this.getObj(array[0], key))) {
        array.sort((a, b) => {
          let current = Number(this.getObj(a, key))
          let other = Number(this.getObj(b, key))
          return current < other ? -1 : current > other ? 1 : 0
        })
      } else {
        try {
          array.sort((a, b) => {
            let current = this.getObj(a, key)
            let other = this.getObj(b, key)
            return current.localeCompare(other)
          })
        } catch {
        }
      }

      if (reverse) array.reverse()
    },
    /**
     * checks if the input is a number or not
     * @param {String|Number} input - a string or a number
     * @returns {Boolean} true if the input is actually a number, otherwise false
     */
    isNumber(input) {
      if (typeof input === 'number') return true
      return !isNaN(input) && !isNaN(parseFloat(input))
    },
    syncPagination(e) {
      this.$emit('syncPagination', e)
    }
  },
  watch: {
    /**
     * Everytime a change is detected on headers, update column widths
     */
    actualHeaders: {
      handler() {
        this.updateWidths()
      },
      deep: true
    },
    loading(val) {
      if (!val) {
        this.sortByKey(this.rows, this.curentSortKey, this.reverseSort)
      }
    }
  },
  updated() {
    this.updateWidths()
  }
}
</script>

<style lang="scss" scoped>


.data-table-wrapper {
  border-radius: 10px;
  width: 100%;

  /*********************************/

  table.table {
    position: relative;
    width: 100%;
    border-spacing: 0 0.5em;

    thead {
      font-size: 90%;
      border-radius: 5px 5px 0 0;
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.24) 0 1px 1px 1px;

      .th {
        border-left: 2px solid $color-primary;
        text-align: center;
        font-weight: bold;
        padding: 0.2rem 0;
        min-width: 50px;
        color: white;

        &.clickable {
          cursor: pointer;
        }

        &:last-child {
          border-left: none;
        }
      }
    }

    tr.skeleton {
      margin-top: 0.5rem;

      .skeleton-box {
        position: relative;
        height: 30px;
        border-radius: 10px;
        overflow: hidden;
        background-color: #dddbdd;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
                  90deg,
                  rgba(#fff, 0) 0,
                  rgba(#fff, 0.2) 20%,
                  rgba(#fff, 0.5) 60%,
                  rgba(#fff, 0)
          );
          animation: loading 0.5s infinite;
        }

        @keyframes loading {
          100% {
            transform: translateX(100%);
          }
        }
      }
    }

    tr.loading {
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      height: 100%;
      width: 100%;
      display: table;
      z-index: 100;
    }

    tbody {
      position: relative;
    }
  }

  .table th, .table td {
    text-align: center;
    padding: 0.25em;
  }

  .table tr {
    border-bottom: 1px solid #DDD;

    padding: 0.5rem 0;
    color: $fontColorDark;

    &.clickable {
      cursor: pointer;

      &:hover {
        font-weight: bold;
      }
    }

    &:nth-child(even) {
      background: #e5e5e5;
    }

    .td {
      text-align: center;
      overflow: hidden;
      max-width: 100px;
    }
  }

  @media screen and (max-width: 800px) {
    tr {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0.5em 0;
      border: 1px solid rgba(3, 3, 3, 0.2);
    }
    td, th {
      flex: 1 1 150px;
      border: 0.5px solid rgba(3, 3, 3, 0.2);
    }
  }
}

/********** Not found **********/
.empty-state {
  margin: 10px auto;
  background: #ffffff;
  box-shadow: 1px 2px 10px #e1e3ec;
  border-radius: 4px;

  .content {
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      border-radius: 150px;
      justify-content: center;
      background-color: #f7fafc;
      box-shadow: 0 2px 1px #e1e3ec;

      img {
        width: 170px;
      }
    }

    .message {
      color: #38a169;
      font-size: 1.5rem;
      font-weight: 500;
      margin-top: 0.85rem;
    }

    .help {
      color: #a2a5b9;
      font-size: 0.875rem;
    }
  }
}
</style>
