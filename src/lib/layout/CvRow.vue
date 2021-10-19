<template>
  <div :style="styleGeneral" class="grid-row">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    gutter: {
      type: Number,
      default: 12
    },
    columns: {
      type: Number,
      default: 12,
    },
  },
  computed: {
    styleGeneral() {
      return this.gutter
          ? `--paddingVGR:${this.gutter / 2}px;--marginVGR:-${this.gutter / 2}px`
          : '--paddingVGR:0px;--marginVGR:0px';
    }
  },
};
</script>

<style lang="scss" scoped>
.grid-row {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + (var(--paddingVGR) * 2));
  margin: var(--marginVGR);
}
</style>
