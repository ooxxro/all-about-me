<template>
  <header class="header">
    <router-link to="/">
      <h1>All About Me</h1>
    </router-link>

    <div class="right">
      <el-dropdown trigger="click">
        <el-avatar
          size="large"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Profile</el-dropdown-item>
          <el-dropdown-item>Setting</el-dropdown-item>
          <el-dropdown-item divided>
            logout
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  background: pink;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  a {
    text-decoration: none;
  }
  h1 {
    margin: 0;
    color: #333;
  }
}

.right {
  .el-dropdown {
    cursor: pointer;
  }
}
</style>
