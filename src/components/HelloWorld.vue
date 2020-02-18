<template>
  <div class="hello">
    <h1>Wanna get {{ count }} {{ bbb }}?</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    bb: String,
    count: Number
  },
  computed: {
    bbb() {
      if (this.count > 1) return this.bb + 's';

      return this.bb;
    }
  }
};
</script>

<style scoped lang="scss">
h1 {
  color: pink;
}
</style>
