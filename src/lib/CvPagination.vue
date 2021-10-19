<template>
  <div class="cv-pagination">
    <!-- table settings -->
    <cv-tooltip right style="margin-right: auto">
      <template #content>
        <div class="settings-icon" @click="$emit('input', true)">
          <svg
            enable-background="new 0 0 512 512"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="m30 256c0-124.617 101.383-226 226-226 46.867 0 91.563 14.211 129.196 40.587h-29.074c-8.284 0-15 6.716-15 15s6.716 15 15 15h70.292c8.284 0 15-6.716 15-15v-70.292c0-8.284-6.716-15-15-15s-15 6.716-15 15v37.339c-44.427-34.135-98.504-52.634-155.414-52.634-68.38 0-132.667 26.629-181.02 74.98-48.351 48.353-74.98 112.64-74.98 181.02 0 44.921 11.871 89.182 34.33 127.998 2.78 4.806 7.818 7.49 12.997 7.49 2.55 0 5.134-.651 7.499-2.019 7.17-4.149 9.619-13.325 5.471-20.496-19.82-34.255-30.297-73.321-30.297-112.973z"
              />
              <path
                d="m477.67 128.002c-4.15-7.171-13.328-9.619-20.496-5.47-7.17 4.149-9.619 13.325-5.471 20.496 19.82 34.253 30.297 73.318 30.297 112.972 0 124.617-101.383 226-226 226-46.863 0-91.551-14.215-129.18-40.587h29.058c8.284 0 15-6.716 15-15s-6.716-15-15-15h-70.291c-8.284 0-15 6.716-15 15v70.292c0 8.284 6.716 15 15 15s15-6.716 15-15v-37.376c44.426 34.146 98.496 52.671 155.413 52.671 68.38 0 132.667-26.629 181.02-74.98 48.351-48.353 74.98-112.64 74.98-181.02 0-44.923-11.871-89.184-34.33-127.998z"
              />
              <path
                d="m389.413 225.863c1.029-3.843.49-7.937-1.499-11.382l-30-51.962c-1.989-3.445-5.266-5.959-9.108-6.989-3.843-1.029-7.937-.491-11.382 1.499l-17.076 9.859c-6.073-4.406-12.538-8.152-19.348-11.209v-19.679c0-8.284-6.716-15-15-15h-60c-8.284 0-15 6.716-15 15v19.678c-6.81 3.058-13.274 6.803-19.348 11.209l-17.076-9.859c-3.445-1.99-7.543-2.529-11.382-1.499-3.843 1.029-7.119 3.543-9.108 6.989l-30 51.962c-1.989 3.445-2.528 7.54-1.499 11.382 1.03 3.843 3.544 7.119 6.989 9.108l16.993 9.81c-.379 3.725-.569 7.473-.569 11.22s.19 7.495.569 11.218l-16.993 9.81c-3.445 1.989-5.959 5.266-6.989 9.108-1.029 3.843-.49 7.937 1.499 11.382l30 51.962c1.989 3.445 5.266 5.959 9.108 6.989 3.844 1.031 7.938.491 11.382-1.499l17.076-9.859c6.073 4.407 12.538 8.152 19.348 11.209v19.68c0 8.284 6.716 15 15 15h60c8.284 0 15-6.716 15-15v-19.678c6.81-3.057 13.274-6.803 19.348-11.209l17.076 9.859c3.444 1.989 7.541 2.528 11.382 1.499 3.843-1.029 7.119-3.543 9.108-6.989l30-51.962c1.989-3.445 2.528-7.54 1.499-11.382-1.03-3.843-3.544-7.119-6.989-9.108l-16.993-9.81c.379-3.725.569-7.473.569-11.22s-.19-7.495-.569-11.218l16.993-9.81c3.445-1.99 5.959-5.266 6.989-9.109zm-55.032 14.041c1.074 5.263 1.619 10.679 1.619 16.096s-.545 10.833-1.619 16.096c-1.292 6.324 1.607 12.765 7.196 15.992l12.856 7.422-15 25.98-12.963-7.484c-5.592-3.229-12.626-2.516-17.458 1.772-8.18 7.261-17.517 12.67-27.751 16.078-6.128 2.04-10.262 7.773-10.262 14.232v14.912h-30v-14.912c0-6.458-4.134-12.192-10.262-14.232-10.234-3.408-19.571-8.817-27.751-16.078-4.831-4.289-11.865-5.001-17.458-1.772l-12.963 7.484-15-25.98 12.856-7.422c5.589-3.227 8.488-9.668 7.196-15.992-1.072-5.263-1.617-10.679-1.617-16.096s.545-10.833 1.619-16.096c1.292-6.324-1.607-12.765-7.196-15.992l-12.856-7.422 15-25.98 12.963 7.484c5.593 3.23 12.626 2.517 17.458-1.772 8.18-7.261 17.517-12.67 27.752-16.078 6.127-2.041 10.261-7.774 10.261-14.232v-14.912h30v14.912c0 6.458 4.134 12.191 10.261 14.232 10.235 3.408 19.572 8.817 27.752 16.078 4.831 4.289 11.865 5.001 17.458 1.772l12.963-7.484 15 25.98-12.856 7.422c-5.591 3.227-8.49 9.668-7.198 15.992z"
              />
              <path
                d="m256 201c-30.327 0-55 24.673-55 55s24.673 55 55 55 55-24.673 55-55-24.673-55-55-55zm0 80c-13.785 0-25-11.215-25-25s11.215-25 25-25 25 11.215 25 25-11.215 25-25 25z"
              />
            </g>
          </svg>
        </div>
      </template>
      تنظیمات جدول
    </cv-tooltip>
    <!-- show all btn -->
    <cv-tooltip top style="margin-right: 0.5rem">
      <template #content>
        <cv-button primary small @click="rowCount = totalRows">همه</cv-button>
      </template>
      نمایش همه (حداکثر 100)
    </cv-tooltip>
    <!-- item per page input -->
    <div class="row-count">
      <input
        v-model.lazy.number="rowCount"
        type="number"
        name="rowCountInput"
        class="input"
        max="100"
        min="1"
        step="1"
      />
      <label for="rowCountInput">:تعداد سطر ها</label>
    </div>
    <!-- select page input -->
    <div class="current-page">
      <input
        v-model.lazy.number="pageNumber"
        type="number"
        name="currentPageInput"
        class="input"
        :max="Math.ceil(totalRows / rowCount)"
        min="1"
        step="1"
      />
      <label for="currentPageInput">:صفحه</label>
    </div>
    <!-- vertical line -->
    <span class="vertical-line" />
    <!-- last page button -->
    <cv-tooltip top>
      <template #content>
        <div
          class="last-page"
          @click="pageNumber = Math.ceil(totalRows / rowCount)"
        >
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              d="m16.293 17.707 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414L10.586 12zM7 6h2v12H7z"
            ></path>
          </svg>
        </div>
      </template>
      صفحه ی آخر
    </cv-tooltip>
    <!-- next page button -->
    <cv-tooltip top>
      <template #content>
        <div class="next-page" @click="pageNumber++">
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
            ></path>
          </svg>
        </div>
      </template>
      صفحه ی بعد
    </cv-tooltip>
    <!-- table information -->
    <p class="data">
      ردیف {{ (pageNumber - 1) * rowCount + 1 }} تا
      {{ (pageNumber - 1) * rowCount + leftover }} از {{ totalRows }}
    </p>
    <!-- previous page button -->
    <cv-tooltip top>
      <template #content>
        <div class="previous-page" @click="pageNumber--">
          <svg xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
            ></path>
          </svg>
        </div>
      </template>
      صفحه ی قبل
    </cv-tooltip>
    <!-- first page button -->
    <cv-tooltip top>
      <template #content>
        <div class="first-page" @click="pageNumber = 1">
          <svg xmlns="http://www.w3.org/2000/svg" viewport="0 0 24 24">
            <path
              d="m16.293 17.707 1.414-1.414L13.414 12l4.293-4.293-1.414-1.414L10.586 12zM7 6h2v12H7z"
            ></path>
          </svg>
        </div>
      </template>
      صفحه ی اول
    </cv-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    totalRows: {
      type: Number,
      default: 100
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    leftover: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageNumber: 1,
      rowCount: 0
    }
  },
  watch: {
    pageNumber(val) {
      const maxPages = Math.ceil(this.totalRows / this.rowCount)
      if (val < 1) this.pageNumber = 1
      else if (val > maxPages) this.pageNumber = maxPages
      this.checkPreviousPageBtn()
      this.checkNextPageBtn()
      this.updatePage()
    },
    rowCount(val) {
      if (val >= 100) this.rowCount = 100
      else if (val < 1) this.rowCount = 1
      this.checkPreviousPageBtn()
      this.checkNextPageBtn()
      this.updatePage()
    }
    // totalRows() {
    //   this.checkNextPageBtn()
    // }
  },
  created() {
    this.rowCount = this.rowsPerPage
  },
  mounted() {
    this.checkPreviousPageBtn()
    this.checkNextPageBtn()
  },
  methods: {
    /**
     * Sends the updated page information
     */
    updatePage() {
      this.$emit('syncPagination', {
        pageNumber: this.pageNumber,
        rowCount: this.rowCount
      })
    },

    /**
     * Disables previous and first button if page number is 1
     */
    checkPreviousPageBtn() {
      const firstPageBtn = this.$vnode.elm.children[8]
      const previousPageBtn = this.$vnode.elm.children[9]
      if (this.pageNumber === 1) {
        previousPageBtn.style.opacity = '0.5'
        previousPageBtn.style.pointerEvents = 'none'
        firstPageBtn.style.opacity = '0.5'
        firstPageBtn.style.pointerEvents = 'none'
      } else {
        previousPageBtn.style.opacity = '1'
        previousPageBtn.style.pointerEvents = 'auto'
        firstPageBtn.style.opacity = '1'
        firstPageBtn.style.pointerEvents = 'auto'
      }
    },

    /**
     * Disables next and last button if page number is max
     */
    checkNextPageBtn() {
      const nextPageBtn = this.$vnode.elm.children[5]
      const lastPageBtn = this.$vnode.elm.children[6]
      const maxPages = Math.ceil(this.totalRows / this.rowCount)

      if (this.pageNumber === maxPages) {
        nextPageBtn.style.opacity = '0.5'
        nextPageBtn.style.pointerEvents = 'none'
        lastPageBtn.style.opacity = '0.5'
        lastPageBtn.style.pointerEvents = 'none'
      } else {
        nextPageBtn.style.opacity = '1'
        nextPageBtn.style.pointerEvents = 'auto'
        lastPageBtn.style.opacity = '1'
        lastPageBtn.style.pointerEvents = 'auto'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$color-secondary: #248fde;
$color-primary: #044f87;
.cv-pagination {
  direction: ltr;
  display: flex;
  border-top: 1px solid $color-primary;
  padding: 0.5rem 1rem 0;
  margin: 0.5rem;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;

  .first-page,
  .last-page,
  .next-page,
  .previous-page {
    display: grid;
    place-items: center;
    background: rgba($color: $color-secondary, $alpha: 0.2);
    padding: 0.2rem;
    border-radius: 10px;

    svg {
      width: 24px;
      height: 24px;
      fill: $color-primary;
    }
  }
  .first-page,
  .previous-page {
    transform: rotate(180deg);
  }

  .data {
    display: grid;
    place-items: center;
    margin: 0 1rem;
    color: $fontColorDark;
  }
  .vertical-line {
    width: 2px;
    background: $color-primary;
    border-radius: 2px;
    transition: all 0.3s ease-out;
  }

  .current-page,
  .row-count {
    margin-right: 1rem;
    .input {
      background: rgba($color: $color-secondary, $alpha: 0.2);
      border-radius: 10px;
      padding: 0.1rem 0rem 0.1rem 0.3rem;
      width: 50px;
      text-align: center;

      &:focus {
        outline: none;
      }
    }
    label {
      color: $fontColorDark;
    }
  }
}

.settings-icon {
  display: grid;
  width: 24px;

  &:hover {
    transform: scale(1.1);
    animation: rotate 1s linear infinite reverse;
  }

  svg {
    width: 100%;
    fill: $color-primary;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(180deg) scale(1.1);
  }
}
</style>
