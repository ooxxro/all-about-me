<template>
  <header class="header">
    <router-link to="/">
      <h1>All About Me</h1>
    </router-link>

    <div class="right">
      <el-dropdown
        v-if="user.loggedIn"
        trigger="click"
        @command="dropDownClick"
      >
        <el-avatar
          size="large"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="link">
            <router-link to="/user">Profile</router-link>
          </el-dropdown-item>
          <el-dropdown-item class="link">
            <router-link to="/setting">Setting</router-link>
          </el-dropdown-item>
          <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div v-else class="visiter">
        <router-link class="login" to="/login">LOGIN</router-link>
        <router-link class="signUp" to="/sign-up">SIGN UP</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    dropDownClick(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    logout() {
      console.log("logout");
      firebase.auth().signOut();
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

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
  .visiter {
    a {
      color: #fc4c92;
      background: #fff;
      padding: 6px 12px;
      border-radius: 4px;
      border: 1px solid #fc4c92;
      font-size: 16px;
      line-height: 16px;
      transition: all 0.3s;
      // font-weight:
      &:not(:last-child) {
        margin-right: 1rem;
      }
      &:hover {
        color: #fff;
        background: #fc4c92;
      }
      &.signUp {
        color: #fff;
        background: #fc4c92;
        border-color: transparent;
        &:hover {
          background: #ff76ad;
        }
      }
    }
  }
}
.link {
  padding: 0;
  a {
    display: block;
    height: 100%;
    width: 100%;
    text-decoration: none;
    color: inherit;
    padding: 0 20px;
  }
}
</style>
