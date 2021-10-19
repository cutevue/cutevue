<template>
  <div class="image-frame">
    <img :src="imageUrl"
         width="200" height="256" :alt="title"
    >
    <div class="image-caption">
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CvImage",
  props: {
    title: String,
    imageUrl: String
  }
}
</script>

<style lang="scss" scoped>
.image-frame {
  width: 200px;
  background: #fff;
  padding: 18px 18px 2px 18px;
  border: 1px solid #999;
}

.image-caption {
  margin-top: 4px;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
}
</style>
