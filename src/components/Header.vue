<template>
  <header class="header">
    <router-link to="/">
      <h1>All About Me</h1>
    </router-link>

    <div class="right" v-if="!user.loading">
      <div class="logged-in" v-if="user.loggedIn">
        <router-link class="profile-wrapper" to="/user">
          <div class="name" v-if="user.data.displayName">
            {{ user.data.displayName }}
          </div>
          <el-avatar
            size="large"
            :src="
              user.data.photoURL ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
          />
        </router-link>
        <el-dropdown trigger="click" @command="dropDownClick">
          <i class="el-icon-more" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="link">
              <router-link to="/setting">Setting</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
      user: "user",
    }),
  },
  methods: {
    dropDownClick(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    logout() {
      console.log("logout");
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
          this.$router.push("/");
        })
        .catch(error => {
          // An error happened.
          alert("Error when logout: ", error.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  background: #fff;
  // #fdf2f0
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;

  a {
    text-decoration: none;
  }
  h1 {
    margin: 0;
    color: #fc4c92;
    font-family: "Architects Daughter", cursive;
    // font-family: "Carter One", cursive;
    text-shadow: 2px 2px 0px #fff, 5px 4px 0px rgba(0, 0, 0, 0.15);
  }
}

.right {
  .logged-in {
    display: flex;
    align-items: center;
    margin-right: -8px;
  }
  .profile-wrapper {
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 5px;
    transition: all 0.4s;
    color: inherit;
    &:hover {
      background: #eee;
    }
    .name {
      margin: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
  .el-dropdown {
    i {
      font-size: 1.5rem;
      padding: 13px;
      border-radius: 4px;
      &:hover {
        background: #eee;
      }
    }
    cursor: pointer;
  }
  .visiter {
    a {
      color: #fc4c92;
      background: #fff;
      padding: 9px 12px;
      border-radius: 4px;
      border: 1px solid #fc4c92;
      font-size: 16px;
      line-height: 16px;
      transition: all 0.3s;
      display: inline-block;
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
