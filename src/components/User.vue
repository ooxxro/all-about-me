<template>
  <div class="user-component">
    <div class="menu">
      <div class="menu-top">
        <div class="profile-wrapper">
          <img
            :src="
              photoURL ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            "
            alt="avatar"
          />
        </div>
      </div>
      <div class="menu-bottom">
        <button class="menu-item menu-aboutMe">About Me</button>
        <button class="menu-item menu-friendList">Friend List</button>
        <button class="menu-item menu-myClass">My Class</button>
        <button class="menu-item menu-futureGoal">Future Goal</button>
        <button class="menu-item menu-funStuff">Fun Stuff</button>
        <button class="menu-item menu-otherStuff">Other Stuff</button>
        <button class="menu-item menu-interestiongLinks">
          Interesting Links
        </button>
        <button class="menu-item menu-comments">Comments</button>
      </div>
    </div>
    <div class="content">
      <div class="content-aboutMe">
        <div class="aboutMe-upDown">
          <div class="aboutMe-down">
            <div class="down-left">
              <div class="img-wrapper">
                <img
                  v-if="aboutMeImgUrl"
                  :src="aboutMeImgUrl"
                  alt="profile image"
                />
                <img v-else src="../assets/keropi2.jpg" alt="profile image" />
              </div>
            </div>
            <div class="down-right" v-if="data">
              <h2>Hi, I'm {{ displayName ? displayName : "..." }}</h2>
              <div v-if="data.aboutMe">{{ data.aboutMe }}</div>
              <div v-else>I'm too lazy to write something about myself...</div>
            </div>
          </div>
        </div>
      </div>
      <div class="section content-friendList">
        <div class="friendList-upDown">
          <div class="friendList-up">
            <h2>Friend List</h2>
          </div>
          <div class="friendList-down">
            <p>
              Derder
              <br />
              <br />Snoopy
            </p>
          </div>
        </div>
      </div>
      <div
        class="section content-myClass"
        v-if="data.myClasses && data.myClasses.length"
      >
        <div class="myClass-upDown">
          <div class="myclass-up">
            <h2>My Class</h2>
          </div>
          <div class="myclass-down">
            <div class="class-tag" v-for="(c, i) in data.myClasses" :key="i">
              {{ c }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="section content-futureGoal"
        v-if="data.futureGoals && data.futureGoals.length"
      >
        <div class="futureGoal-upDown">
          <div class="futrueGoal-up">
            <h2>Future Goal</h2>
          </div>
          <div class="futureGoal-down">
            <div v-for="(c, i) in data.futureGoals" :key="i">
              <div class="futureGoal-list">
                {{ c }}
              </div>
              <br />
            </div>
          </div>
        </div>
      </div>
      <div class="section content-funStuff">
        <div class="funStuff-upDown">
          <div class="funStuff-up">
            <h2>Fun Stuff</h2>
          </div>
          <div class="funStuff-down">
            <div class="funStuff-left">
              <div class="img-wrapper">
                <img src="../assets/yoyo.png" alt="profile image" />
              </div>
            </div>
            <div
              class="funStuff-right"
              v-for="(c, i) in data.funStuff"
              :key="i"
            >
              {{ c }}
            </div>
          </div>
        </div>
      </div>
      <div class="section content-otherStuff">
        <div class="otherStuff-upDown">
          <div class="otherStuff-up">
            <h2>Other Stuff</h2>
          </div>
          <div class="otherStuff-down">
            <p>
              None
              <br />
              <br />Nothing here
            </p>
          </div>
        </div>
      </div>
      <div class="section content-interestingLinks">
        <div class="link-upDown">
          <div class="link-up">
            <h2>Interesting Links</h2>
          </div>
          <div class="link-down">
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
      <div class="section content-comments">
        <div class="comments-upDown">
          <div class="comments-up">
            <h2>Comments</h2>
          </div>
          <div class="comments-down">
            <p>
              Hello
              <br />
              <br />Nice to meet you
            </p>
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
export default {
  props: {
    data: Object,
    displayName: String,
    photoURL: String,
    aboutMeImgUrl: String,
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
  .menu-top {
    padding: 20px;
    text-align: left;
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
  .menu-top {
    background: #fca9d0;
  }
  .menu-bottom {
    display: flex;
    flex-direction: column;
    .menu-item {
      height: 50px;
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      transition: all 0.3s;
      &:nth-child(3n + 1) {
        background: lightsalmon;
      }
      &:nth-child(3n + 2) {
        background: lightpink;
      }
      &:nth-child(3n) {
        background: lightgoldenrodyellow;
      }
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
.content {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
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
      margin-top: 55px;
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
      padding: 0 28px;
      align-items: center;
    }
    .funStuff-left {
      flex: 1 0 35%;
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
