<template>
  <div class="login">
    <h3>Sign in</h3>
    <input type="text" v-model="email" placeholder="Email" />
    <br />
    <input type="password" v-model="password" placeholder="Password" />
    <br />
    <button @click="login">Log in</button>
    <span>
      Don't have an account?
      <router-link to="/sign-up">Sign Up</router-link>
    </span>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            this.$router.replace('home');
          },
          err => {
            alert('Oops. ' + err.message);
          }
        );
    }
  }
};
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 10px;
  width: 10%;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
span a {
  text-decoration: underline;
  cursor: pointer;
}
</style>
