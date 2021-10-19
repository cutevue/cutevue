<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { CutevueSample } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  // components: {
  //  CutevueSample,
  // }
});
</script>

<template>
  <div id="app">
    <cutevue-sample />
    <cv-card>
      <div slot="content">
        <h1>سلام دنیا</h1>
      </div>
    </cv-card>
  </div>
</template>
