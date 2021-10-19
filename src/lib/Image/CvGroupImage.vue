<template>
  <div class="cv-document-container"  >
    <cv-image v-for="image in images"
              :image-url="image.document"
              :title="image.description"
              :key="image.id"
    />
  </div>
</template>

<script>
export default {
  name: "CvGroupImage",
  props: {
    images: Array
  }
}
</script>

<style lang="scss" scoped>
.cv-document-container {
  display: flex;
  justify-items: center;
  justify-content: flex-start;
}
</style>

