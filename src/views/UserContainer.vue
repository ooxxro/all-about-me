<template>
  <div class="user-container">
    <Header />
    <div v-if="!data" class="loading-wrapper">
      <Loading />
    </div>
    <User v-else :data="data" />
  </div>
</template>

<script>
import Header from "../components/Header";
import User from "../components/User";
import Loading from "../components/Loading";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    User,
    Loading
  },
  data() {
    return {
      data: null
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  watch: {
    user: {
      handler(val) {
        // console.log("watch user", val);
        if (val.data && val.data.uid) this.updateData(val.data.uid);
      },
      deep: true
    }
  },
  mounted() {
    // console.log("mounted user.data:", this.user.data);
    if (this.user.data && this.user.data.uid)
      this.updateData(this.user.data.uid);
  },
  methods: {
    updateData(uid) {
      // console.log("updateData");
      let db = firebase.firestore();
      let docRef = db.collection("aboutMe").doc(uid);
      docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            this.data = doc.data();
            // console.log(doc.data());
          } else {
            console.log("not found");
          }
        })
        .catch(error => {
          console.log("提取文件時出錯:", error);
        });
    }
  }
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
