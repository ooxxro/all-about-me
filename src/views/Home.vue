<template>
  <div class="home">
    <Header />

    <div class="hero">
      <div class="headline">
        <div>ALL</div>
        <div>ABOUT</div>
        <div>ME</div>
      </div>
      <img class="hero-img" src="../assets/hero-yoshi.png" alt="" />
    </div>

    <section class="users">
      <h3>Most Recently Updated Profile Users</h3>

      <div v-if="users">
        <router-link
          v-for="user in users"
          :key="user.uid"
          :to="`/user/${user.uid}`"
          class="user-card"
        >
          <img :src="user.photoURL || defaultPhotoURL" alt="avatar" />
          <div>
            <div class="name">{{ user.displayName }}</div>
            <div>
              {{ user.friendList.length }} friend{{
                user.friendList.length === 1 ? "" : "s"
              }}
            </div>
          </div>
        </router-link>
      </div>
    </section>
    <footer>
      <p>2020 ® All Rights Reserved</p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import firebase from "firebase";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      defaultPhotoURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      users: [],
    };
  },
  mounted() {
    let db = firebase.firestore();
    let ref = db.collection("aboutMe");
    ref
      .orderBy("lastUpdated", "desc")
      .limit(9)
      .get()
      .then(snapshot => {
        this.users = snapshot.docs.map(doc => ({
          uid: doc.id,
          friendList: [],
          ...doc.data(),
        }));
      });
  },
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  // height: 800px;
  padding: 100px 10px;
  overflow: hidden;
}
.hero-img {
  width: 60%;
  max-width: 800px;
  height: auto;
  object-fit: cover;
  border: 10px solid #fff;
  transform: rotate(7deg);
  flex: 0 1 auto;
  margin: 0 50px;
}
.headline {
  flex: 0 0 auto;
  margin: 20px 50px 50px;
  font-size: 100px;
  color: #fc4c92;
  font-family: Waiting for the Sunrise;
  font-weight: bold;
  text-align: center;
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

section {
  padding: 30px 50px;
}
.users {
  background: rgba(255, 255, 255, 0.5);
  text-align: center;
  padding-bottom: 60px;
  h3 {
    font-size: 26px;
  }
  .user-card {
    display: inline-flex;
    align-items: center;
    text-align: left;
    // border-left: 6px solid #f78b7c;
    width: 300px;
    padding: 10px 10px;
    background: #fff;
    color: #888;
    margin: 10px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 16px;
    img {
      flex: 0 0 auto;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
      margin-right: 20px;
    }
    .name {
      color: #222;
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
}

footer {
  background: #f1ccb8;
  text-align: center;
  p {
    padding: 6px 0;
    line-height: 20px;
    margin: 0;
  }
}
</style>
