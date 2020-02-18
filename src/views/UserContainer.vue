<template>
  <div>
    <Header />

    <div class="container">
      <div class="menu">
        <div class="menu-top">
          <div class="profile-wrapper">
            <img src="../assets/horsy-sheep.jpg" alt="profile image" />
          </div>
        </div>
        <div class="menu-bottom">
          <button class="menu-item">About Me</button>
          <button class="menu-item">About Me</button>
          <button class="menu-item">About Me</button>
          <button class="menu-item">About Me</button>
          <button class="menu-item">About Me</button>
          <button class="menu-item">About Me</button>
        </div>
      </div>
      <div class="content">
        <div v-for="i in [...Array(100)]" :key="i">content</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: calc(100vh - 64px);
}
.menu {
  width: 240px;
  overflow-x: hidden;
  overflow-y: auto;
  .menu-top {
    padding: 20px;
    text-align: left;
    .profile-wrapper {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
      }
    }
  }
  .menu-bottom {
    display: flex;
    flex-direction: column;
    .menu-item {
      height: 50px;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      transition: all 0.3s;
      &:nth-child(3n + 1) {
        background: lightblue;
      }
      &:nth-child(3n + 2) {
        background: lightcoral;
      }
      &:nth-child(3n) {
        background: lightcyan;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
.content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
