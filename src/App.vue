<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  > * {
    height: 100vh;
    position: relative;
  }
}
body {
  background: #ffbaba;
  word-break: break-word;
}
</style>
