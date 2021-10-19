<template>
  <div class="cv-radio">
    <input
      type="radio"
      :name="group"
      :checked="selected"
      @change="$emit('input', selectedValue)"
    />
    <label v-if="label !== ''">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CvRadio',
  props: {
    value: {
      type: String,
      default: ''
    },
    selectedValue: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    group: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  },
  mounted() {
    if (this.selected) {
      this.$emit('input', this.selectedValue)
    }
  }
}
</script>

<style lang="scss" scoped>

// Hack for Firefox browser to show ::after and ::before
input[type='radio'] {
  -moz-appearance: initial;
}

// never change box-sizing: content-box
*,
*::after,
*::before {
  box-sizing: content-box;
}

.cv-radio {
  //display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 1rem;
  //direction: ltr;
  height: 25px;
}

// hiding original input
input {
  position: relative;
  cursor: pointer;
  width: 0;
  height: 0;

  // custom styles to :before and :after
  &:hover:before {
    border-width: 3.5px;
  }

  &:checked:before,
  &:checked:after,
  &:before,
  &:after {
    content: ' ';
    transform: translate(100%, -65%);
    position: absolute;
    transition: all 0.1s ease;
    border-color: $color-primary;
    border-style: solid;
  }

  // unchecked state
  &:before {
    width: 15px;
    height: 15px;
    border-width: 2px;
    border-style: solid;
    //border-radius: 50%;
    background-color: $background-color;
  }

  // checked state
  &:checked:before {
    border-width: 2px;
  }

  // floater
  &:after {
    width: 0;
    height: 0;
    border-width: 0;
    top: -10px;
    left: 20px;
  }

  // tick
  &:checked:after {
      border-width: 0 2px 2px 0;
      width: 5px;
      height: 12px;
      transform: rotate(45deg) translate(-100%, -20%);
      top: -5px;
      left: 9px;
  }
}
</style>
