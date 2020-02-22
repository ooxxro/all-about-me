<template>
  <div class="user-component">
    <div class="menu">
      <div class="menu-top">
        <div class="profile-wrapper">
          <img :src="data.photoURL || defaultPhotoURL" alt="avatar" />
        </div>
      </div>
      <div class="menu-item-after menu-item-top-after" />
      <div class="menu-bottom">
        <div class="menu-item-before menu-about-me" />
        <button class="menu-item menu-about-me" @click="scrollTo('#about-me')">
          About Me
        </button>
        <div class="menu-item-after menu-about-me" />
        <div class="menu-item-before menu-friend-list" />
        <button
          class="menu-item menu-friend-list"
          @click="scrollTo('#friend-list')"
        >
          Friend List
        </button>
        <div class="menu-item-after menu-friend-list" />
        <div class="menu-item-before menu-my-classes" />
        <button
          class="menu-item menu-my-classes"
          @click="scrollTo('#my-classes')"
        >
          My Classes
        </button>
        <div class="menu-item-after menu-my-classes" />
        <div class="menu-item-before menu-future-goals" />
        <button
          class="menu-item menu-future-goals"
          @click="scrollTo('#future-goals')"
        >
          Future Goals
        </button>
        <div class="menu-item-after menu-future-goals" />
        <div class="menu-item-before menu-fun-stuff" />
        <button
          class="menu-item menu-fun-stuff"
          @click="scrollTo('#fun-stuff')"
        >
          Fun Stuff
        </button>
        <div class="menu-item-after menu-fun-stuff" />
        <div class="menu-item-before menu-other-stuff" />
        <button
          class="menu-item menu-other-stuff"
          @click="scrollTo('#other-stuff')"
        >
          Other Stuff
        </button>
        <div class="menu-item-after menu-other-stuff" />
        <div class="menu-item-before menu-interesting-links" />
        <button
          class="menu-item menu-interesting-links"
          @click="scrollTo('#interesting-links')"
        >
          Interesting Links
        </button>
        <div class="menu-item-after menu-interesting-links" />
        <div class="menu-item-before menu-comments" />
        <button class="menu-item menu-comments" @click="scrollTo('#comments')">
          Comments
        </button>
        <div class="menu-item-after menu-comments" />
        <div class="menu-item-bottom-block" />
      </div>
    </div>
    <div id="content" class="content">
      <div class="toolbar">
        <el-button
          v-if="
            loggedIn &&
              !isSelf &&
              (!currentUserData.friendList ||
                !currentUserData.friendList.includes(uid))
          "
          type="danger"
          round
          @click="onAddFriend"
          >+ Add Friend</el-button
        >
        <el-button
          v-if="
            loggedIn &&
              !isSelf &&
              currentUserData.friendList &&
              currentUserData.friendList.includes(uid)
          "
          type="info"
          plain
          round
          @click="onUnfriend"
        >
          Un-friend
        </el-button>
      </div>
      <div id="about-me" class="content-aboutMe">
        <div class="aboutMe-upDown">
          <div class="aboutMe-down">
            <div class="down-left">
              <div class="img-wrapper">
                <img
                  v-if="data.aboutMeImgUrl"
                  :src="data.aboutMeImgUrl"
                  alt="profile image"
                />
                <img v-else src="../assets/keropi2.jpg" alt="profile image" />
              </div>
            </div>
            <div class="down-right" v-if="data">
              <h2>Hi, I'm {{ data.displayName ? data.displayName : "..." }}</h2>
              <div v-if="data.aboutMe">{{ data.aboutMe }}</div>
              <div v-else>I'm too lazy to write something about myself...</div>
            </div>
          </div>
        </div>
      </div>
      <div id="friend-list" class="section content-friendList">
        <div class="friendList-upDown">
          <div class="friendList-up">
            <h2>Friend List</h2>
          </div>
          <div class="friendList-down">
            <router-link
              v-for="(fuid, i) in data.friendList"
              :key="i"
              :to="`/user/${fuid}`"
              class="friend-tag"
            >
              <template v-if="friendData[fuid]">
                <img
                  :src="friendData[fuid].photoURL || defaultPhotoURL"
                  alt="avatar"
                />
                <span>{{ friendData[fuid].displayName }}</span>
              </template>
            </router-link>
          </div>
        </div>
      </div>
      <div id="my-classes" class="section content-myClass">
        <div class="myClass-upDown">
          <div class="myclass-up">
            <h2>My Classes</h2>
          </div>
          <div
            class="myclass-down"
            v-if="data.myClasses && data.myClasses.length"
          >
            <div class="class-tag" v-for="(c, i) in data.myClasses" :key="i">
              {{ c }}
            </div>
          </div>
        </div>
      </div>
      <div id="future-goals" class="section content-futureGoal">
        <div class="futureGoal-upDown">
          <div class="futrueGoal-up">
            <h2>Future Goals</h2>
          </div>
          <div
            class="futureGoal-down"
            v-if="data.futureGoals && data.futureGoals.length"
          >
            <div v-for="(c, i) in data.futureGoals" :key="i">
              <div class="futureGoal-list">
                {{ c }}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div id="fun-stuff" class="section content-funStuff">
        <div class="funStuff-upDown">
          <div class="funStuff-up">
            <h2>Fun Stuff</h2>
          </div>
          <template v-if="data.funStuff">
            <div
              class="funStuff-down"
              v-for="(fun, i) in data.funStuff"
              :key="i"
            >
              <div class="funStuff-left" v-if="fun.imgUrl">
                <div class="img-wrapper">
                  <img :src="fun.imgUrl" alt="fun stuff image" />
                </div>
              </div>
              <div
                class="funStuff-right"
                :style="i % 2 !== 0 ? 'order: -1' : ''"
              >
                {{ fun.text }}
              </div>
            </div>
          </template>
        </div>
      </div>
      <div id="other-stuff" class="section content-otherStuff">
        <div class="otherStuff-upDown">
          <div class="otherStuff-up">
            <h2>Other Stuff</h2>
          </div>
          <div class="otherStuff-down" v-if="data.otherStuff">
            <div>{{ data.otherStuff }}</div>
          </div>
        </div>
      </div>
      <div id="interesting-link" class="section content-interestingLinks">
        <div class="link-upDown">
          <div class="link-up">
            <h2>Interesting Links</h2>
          </div>
          <div class="link-down" v-if="data.interestingLinks">
            <a
              class="link"
              v-for="(c, i) in data.interestingLinks"
              :key="i"
              :href="
                !c.startsWith('http://') && !c.startsWith('https://')
                  ? `http://${c}`
                  : c
              "
              target="_blank"
            >
              {{ c }}
            </a>
          </div>
        </div>
      </div>
      <div id="comments" class="section content-comments">
        <div class="comments-upDown">
          <div class="comments-up">
            <h2>Comments</h2>
          </div>
          <div class="comments-down">
            <vue-disqus
              :key="uid"
              shortname="bb-all-about-me"
              :identifier="uid"
              :url="currentURL"
            />
          </div>
        </div>
      </div>

      <!-- <div v-for="i in [...Array(100)]" :key="i">content</div> -->
      <footer>
        <p>2020 ® All Rights Reserved</p>
      </footer>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    data: Object,
    loggedIn: Boolean,
    isSelf: Boolean,
    uid: String,
    currentUser: Object,
    currentUserData: Object,
  },
  data() {
    return {
      defaultPhotoURL:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      friendData: {},
    };
  },
  computed: {
    currentURL() {
      return window.location.href;
    },
  },
  watch: {
    "data.friendList": {
      handler() {
        this.fetchFriendList();
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    scrollTo(selector) {
      this.$scrollTo(document.querySelector(selector), 300, {
        container: document.querySelector("#content"),
        offset: -40,
      });
    },
    onAddFriend() {
      if (!this.loggedIn) return;

      let db = firebase.firestore();
      db.collection("aboutMe")
        .doc(this.currentUser.uid)
        .update({
          friendList: firebase.firestore.FieldValue.arrayUnion(this.uid),
        })
        .then(() => {
          // console.log("add friend success");
          this.$store.dispatch("fetchUserData");
        })
        .catch(() => {
          // console.error("Error when add friend: " + err.message);
        });
    },
    onUnfriend() {
      if (!this.loggedIn) return;

      let db = firebase.firestore();
      db.collection("aboutMe")
        .doc(this.currentUser.uid)
        .update({
          friendList: firebase.firestore.FieldValue.arrayRemove(this.uid),
        })
        .then(() => {
          // console.log("un-friend success");
          this.$store.dispatch("fetchUserData");
        })
        .catch(() => {
          // console.error("Error when un-friend: " + err.message);
        });
    },
    fetchFriendList() {
      if (!this.data.friendList) return;

      let db = firebase.firestore();
      this.data.friendList.forEach(uid => {
        let docRef = db.collection("aboutMe").doc(uid);
        docRef.get().then(doc => {
          if (doc.exists) {
            this.$set(this.friendData, uid, doc.data());
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-component {
  display: flex;
  height: calc(100vh - 64px);
  color: #333333;
}
.menu {
  width: 240px;
  overflow-x: hidden;
  overflow-y: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;

  .menu-top {
    padding: 20px;
    text-align: left;
    background: #fca9d0;
    border-bottom-right-radius: 50px;
    .profile-wrapper {
      border-radius: 50%;
      width: 120px;
      height: 120px;
      overflow: hidden;
      margin: 0 auto;
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
      }
    }
  }
  .menu-bottom {
    display: flex;
    flex-direction: column;
    $dark: 5%;
    .menu-about-me {
      background: lighten(#f55066, $dark);
    }
    .menu-friend-list {
      background: lighten(#f78b7c, $dark);
    }
    .menu-my-classes {
      background: lighten(#fcae69, $dark);
    }
    .menu-future-goals {
      background: lighten(#bace5c, $dark);
    }
    .menu-fun-stuff {
      background: lighten(#80d49a, $dark);
    }
    .menu-other-stuff {
      background: lighten(#65cfc8, $dark);
    }
    .menu-interesting-links {
      background: lighten(#d8a8e7, $dark);
    }
    .menu-comments {
      background: lighten(#c7c1c1, $dark);
    }
    .menu-item {
      height: 60px;
      // background: none;
      color: #333;
      border: none;
      font-weight: bold;
      padding: 0;
      cursor: pointer;
      outline: inherit;
      transition: all 0.3s;
      border-top-left-radius: 50px;
      border-bottom-right-radius: 50px;
      overflow: hidden;
      &:hover {
        // opacity: ;
      }
    }
  }
  .menu-item-before,
  .menu-item-after {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      background: inherit;
    }
  }
  .menu-item-before {
    &:before {
      top: -50px;
      right: 0;
      width: 50px;
      height: 50px;
      z-index: -1;
    }
  }
  .menu-item-after {
    &:before {
      bottom: -50px;
      left: 0;
      width: 50px;
      height: 50px;
      z-index: -1;
    }
  }
  .menu-item-top-after {
    background: #fca9d0;
  }
  .menu-item-bottom-block {
    border-top-left-radius: 50px;
    background: #ffbaba;
    height: 50px;
    overflow: hidden;
  }
}
.content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  // word-break: break-word;
  .toolbar {
    padding: 5px 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > * {
      margin: 10px;
    }
  }
  .section {
    background: rgba(255, 227, 243, 0.5);
    padding: 0.5rem 2.5rem 1.5rem 2.5rem;
    margin: 50px;
    border-radius: 5px;
    // line-height: 1.5;
    h2 {
      font-size: 22px;
      // font-family: "Carter One", cursive;
      // font-family: "Leckerli One", cursive;
      font-family: "McLaren", cursive;
    }
  }

  .content-aboutMe {
    padding: 0rem 2.5rem 0.5rem 2.5rem;
    .aboutMe-down {
      display: flex;
      padding: 0 70px;
      align-items: center;
    }
    .down-left {
      flex: 1 0 35%;
      .img-wrapper {
        border: 5px solid #f55066;
        transform: translate(-5px, 5px);
        position: relative;
        padding-top: 133%;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 5px solid #fff;
        transform: translate(10px, -10px);
      }
    }
    .down-right {
      flex: 1 0 65%;
      overflow: auto;
      &::-webkit-scrollbar {
        background: transparent;
      }
      align-items: center;
      margin: 15px 0 15px 25px;
      white-space: pre-wrap;
      padding: 20px 30px;
      background: rgba(255, 255, 255, 0.5);
      color: #000;
      border-radius: 3px;
      min-height: 200px;
      max-height: 300px;
      line-height: 1.5;
      font-family: "Kalam", cursive;
      font-size: 20px;
      h2 {
        margin: 0 0 14px;
        font-size: 36px;
        color: #ff037b;
        font-family: "Gaegu", cursive;
      }
    }
  }

  .content-friendList {
    border-left: 9px solid #f78b7c;
    .friend-tag {
      display: inline-flex;
      align-items: center;
      border-left: 6px solid #f78b7c;
      padding: 10px 30px;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
      font-size: 20px;
      text-decoration: none;
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        margin-right: 20px;
      }
    }
  }

  .content-myClass {
    // border-top: 9px solid orange;
    border-left: 9px solid #fcae69;
    .myclass-down {
      .class-tag {
        border-left: 6px solid #fcae69;
        padding: 10px 30px;
        display: inline-block;
        background: #ffbaba;
        color: #000;
        margin: 10px;
        border-radius: 4px;
        font-family: "Boogaloo", cursive;
        font-size: 20px;
      }
    }
  }

  .content-futureGoal {
    border-left: 9px solid #bace5c;
    .futureGoal-list {
      border-left: 6px solid #bace5c;
      padding: 10px 30px;
      display: inline-block;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
    }
  }

  .content-funStuff {
    border-left: 9px solid #80d49a;
    .funStuff-down {
      display: flex;
      padding: 30px 28px;
      align-items: center;
      justify-content: center;
    }
    .funStuff-left {
      flex: 0 0 300px;
      transform: rotate(-7deg);
      .img-wrapper {
        border: 5px solid #80d49a;
        transform: translate(-5px, 5px);
        position: relative;
        padding-top: 100%;
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border: 5px solid #b9ebc9;
        transform: translate(10px, -15px);
      }
    }
    .funStuff-right {
      // border-left: 6px solid #bace5c;
      padding: 10px 30px;
      display: inline-block;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
    }
  }

  .content-otherStuff {
    border-left: 9px solid #65cfc8;
    .otherStuff-down {
      border-left: 6px solid #65cfc8;
      padding: 10px 30px;
      display: inline-block;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
    }
  }

  .content-interestingLinks {
    border-left: 9px solid #d8a8e7;
    //  #d2bcd5;
    .link {
      border-left: 6px solid #d8a8e7;
      display: block;
      padding: 10px 30px;
      background: #ffbaba;
      color: #000;
      margin: 10px;
      border-radius: 4px;
    }
  }

  .content-comments {
    border-left: 9px solid #c7c1c1;
    //  #d2bcd5;
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
}
</style>
