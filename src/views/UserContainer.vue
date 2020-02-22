<template>
  <div class="user-container">
    <Header />
    <div v-if="notfound" class="notfound">
      404 Not Found
    </div>
    <div v-else-if="!data" class="loading-wrapper">
      <Loading />
    </div>
    <User
      v-else
      :data="data"
      :loggedIn="user.loggedIn"
      :isSelf="user.loggedIn && user.data.uid === $route.params.uid"
      :uid="$route.params.uid"
      :currentUser="user.data"
      :currentUserData="userData"
    />
  </div>
</template>

<script>
import Header from "../components/Header";
import User from "../components/User";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    User,
  },
  data() {
    return {
      data: null,
      notfound: false,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
      userData: "userData",
    }),
  },
  watch: {
    user: {
      handler(val) {
        // console.log("watch user", val);
        if (val.data && val.data.uid) {
          // this.updateData(val.data.uid);
          console.log(val.data.uid);
        }
      },
      deep: true,
      immediate: true,
    },
    $route: {
      handler(/*to, from*/) {
        // react to route changes...
        console.log(this.$route.params.uid);
        this.updateData(this.$route.params.uid);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateData(uid) {
      this.notfound = false;
      // console.log("updateData");
      let db = firebase.firestore();
      let docRef = db.collection("aboutMe").doc(uid);
      docRef.get().then(doc => {
        if (doc.exists) {
          this.data = doc.data();
          // console.log(doc.data());
        } else {
          // console.log("not found");
          this.notfound = true;
        }
      });
      // .catch(error => {
      //   console.log("Fetch data error:", error);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  display: flex;
  flex-direction: column;
}
.loading-wrapper {
  position: relative;
  flex: 1;
}
.notfound {
  font-size: 50px;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
