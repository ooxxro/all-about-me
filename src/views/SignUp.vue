<template>
  <div class="sign-up">
    <Header />

    <div class="sign-up-body">
      <div class="body-left">
        <div>ALL</div>
        <div>ABOUT</div>
        <div>ME</div>
      </div>

      <el-card class="body-right">
        <h3>Let's create your account!</h3>
        <form @submit.prevent="signUp">
          <input
            type="text"
            v-model="email"
            placeholder="Email"
            @keyup.enter="signUp"
          />
          <br />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            @keyup.enter="signUp"
          />
          <br />
          <el-button @click="signUp" type="danger">SIGN UP</el-button>
        </form>
        <span>
          Or go back to login
          <router-link to="/login">Login</router-link>
        </span>
      </el-card>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  name: "signUp",
  components: {
    Header,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["fetchUser"]),
    signUp() {
      if (!this.email || !this.password) return;

      let db = firebase.firestore();

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          res => {
            const displayName = this.email.split("@")[0];
            const dbPromise = db
              .collection("aboutMe")
              .doc(res.user.uid)
              .set({
                displayName,
                photoURL: "",
                friendList: [],
                aboutMe: "",
                aboutMeImgUrl: "",
                myClasses: [],
                futureGoals: [],
                funStuff: [],
                otherStuff: "",
                interestingLinks: [],
                lastUpdated: new Date(),
                createdAt: new Date(),
              });
            const user = firebase.auth().currentUser;
            const authPromise = user.updateProfile({
              displayName,
            });

            Promise.all([dbPromise, authPromise])
              .then(() => {
                // Update successful.
                return user.reload();
              })
              .then(() => {
                this.fetchUser(firebase.auth().currentUser);
              })
              .then(() => {
                this.$router.replace("/setting");
              });
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-up-body {
  margin-top: 35px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.body-left {
  margin-right: 200px;
  font-size: 100px;
  color: #fc4c92;
  font-family: Waiting for the Sunrise;
  font-weight: bold;
  text-shadow: 0px 0px 0 rgb(232, 56, 126), -1px 0px 0 rgb(225, 49, 119),
    -2px 0px 0 rgb(219, 43, 113), -3px 0px 0 rgb(213, 37, 107),
    -4px 0px 0 rgb(207, 31, 101), -5px 0px 0 rgb(200, 24, 94),
    -6px 0px 0 rgb(194, 18, 88), -7px 0px 0 rgb(188, 12, 82),
    -8px 0px 0 rgb(181, 5, 75), -9px 0px 0 rgb(175, -1, 69),
    -10px 0px 0 rgb(169, -7, 63), -11px 0px 10px rgba(51, 51, 51, 0.52),
    -11px 0px 1px rgba(51, 51, 51, 0.5), 0px 0px 10px rgba(51, 51, 51, 0.2);
  div {
    transform: rotate(-8deg);
    &:not(:last-child) {
      margin-bottom: 18px;
    }
  }
}
.sign-up {
  text-align: center;
}
.el-card {
  // margin-top: 37px;
  width: 400px;
  padding: 0 30px;
}
h3 {
  font-size: 24px;
}
input {
  margin: 10px 0;
  width: 75%;
  padding: 10px;
  min-width: 240px;
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
