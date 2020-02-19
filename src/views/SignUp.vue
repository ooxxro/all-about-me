<template>
  <div class="sign-up">
    <Header />
    <el-card>
      <h3>Let's create your account!</h3>
      <input type="text" v-model="email" placeholder="Email" />
      <br />
      <input type="password" v-model="password" placeholder="Password" />
      <br />
      <el-button @click="signUp" type="danger">SIGN UP</el-button>
      <span>
        Or go back to login
        <router-link to="/login">login</router-link>
      </span>
    </el-card>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import firebase from "firebase";
export default {
  name: "signUp",
  components: {
    Header
  },
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.replace("/user");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>

<style lang="scss" scoped>
.sign-up {
  text-align: center;
}
.el-card {
  margin: 35px auto;
  max-width: 400px;
}
h3 {
  font-size: 24px;
}
input {
  margin: 10px 0;
  width: 75%;
  padding: 10px;
}
button {
  margin-top: 10px;
  // width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin: 25px 0;
  font-size: 14px;
}
span a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
