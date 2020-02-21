<template>
  <div class="user-container">
    <Header />
    <div v-if="!data || !user.data" class="loading-wrapper">
      <Loading />
    </div>
    <User
      v-else
      :data="data"
      :displayName="user.data.displayName"
      :aboutMeImgUrl="aboutMeImgUrl"
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
      aboutMeImgUrl: null,
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  watch: {
    user: {
      handler(val) {
        // console.log("watch user", val);
        if (val.data && val.data.uid) {
          this.updateData(val.data.uid);
          this.fetchAboutMeImg(val.data.uid);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    updateData(uid) {
      // console.log("updateData");
      let db = firebase.firestore();
      let docRef = db.collection("aboutMe").doc(uid);
      docRef.get().then(doc => {
        if (doc.exists) {
          this.data = doc.data();
          // console.log(doc.data());
        } else {
          // console.log("not found");
          this.data = {};
        }
      });
      // .catch(error => {
      //   console.log("Fetch data error:", error);
      // });
    },
    fetchAboutMeImg(uid) {
      let storage = firebase.storage();
      let ref = storage.ref(uid + "/aboutme.png");
      ref
        .getDownloadURL()
        .then(url => {
          this.aboutMeImgUrl = url;
        })
        .catch(() => {});
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
</style>
