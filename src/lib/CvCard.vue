<template>
  <div class="cv-card">
    <!--    Header-->
    <div  >
      <div>
        <slot name="header-right"></slot>
      </div>
      <div style="text-align: left">
        <slot name="header-left"></slot>
      </div>
    </div>

    <cv-divider v-if="hasHeader"/>
    <!--    Content-->
    <div  class="card-content">
      <slot name="content"></slot>
    </div>
    <cv-divider v-if="hasFooter"/>
    <!--    Footer-->
    <div  style="direction: ltr" >
      <slot name="footer"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name: 'CvCard',
  computed: {
    hasHeader() {
      return !!this.$slots.header
    },
    hasFooter() {
      return !!this.$slots.footer
    }
  }
}
</script>
<style lang="scss" scoped>
.cv-card {
  background: #FFFFFF;
  box-shadow: 0 16.1856px 25.5562px -12.7781px rgba(0, 48, 209, 0.153027);
  border-radius: 10px;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
  > div {
    width: 100%;
    margin: 0 !important;
    padding-right: 5px;
    padding-left: 5px;
  }
  .card-content{
    min-height: 35px !important;
  }
}

.cv-card > div {
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;

  & > div {
    min-width: 50%;
  }
}
</style>
