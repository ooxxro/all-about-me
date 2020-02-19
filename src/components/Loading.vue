<template>
  <div class="loading">
    <SyncLoader color="#fc4c92" />
  </div>
</template>

<script>
import SyncLoader from "vue-spinner/src/SyncLoader";

export default {
  components: {
    SyncLoader
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
