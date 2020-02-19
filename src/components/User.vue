<template>
  <div class="user-component">
    <div class="menu">
      <div class="menu-top">
        <div class="profile-wrapper">
          <img src="../assets/yoshi-sticker.jpg" alt="profile image" />
        </div>
      </div>
      <div class="menu-bottom">
        <button class="menu-item">About Me</button>
        <!-- <button class="menu-item">Friend List</button> -->
        <button class="menu-item">My Class</button>
        <button class="menu-item">Future Goal</button>
        <button class="menu-item">Fun Stuff</button>
        <button class="menu-item">Other Stuff</button>
        <button class="menu-item">Interesting Links</button>
        <!-- <button class="menu-item">Comments</button> -->
      </div>
    </div>
    <div class="content">
      <div class="content-aboutMe">
        <div class="aboutMe-upDown">
          <div class="aboutMe-up">
            <h2>Who am I</h2>
          </div>

          <div class="aboutMe-down">
            <div class="down-left">
              <img src="../assets/yoshi-circle.jpg" alt="profile image" />
            </div>
            <div class="down-right">
              <p v-if="data">
                {{ data.aboutMe }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="content-friendList"></div> -->
      <div class="section content-myClass">
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
      <div class="section content-futureGoal">
        <div class="futureGoal-upDown">
          <div class="futrueGoal-up">
            <h2>Future Goal</h2>
          </div>
          <div class="futureGoal-down">
            <p>
              Find a good man
              <br />
              <br />Travel around the world
            </p>
          </div>
        </div>
      </div>
      <div class="section content-funStuff">
        <div class="funStuff-upDown">
          <div class="funStuff-up">
            <h2>Fun Stuff</h2>
          </div>
          <div class="funStuff-down">
            <p>
              Boring days
              <br />
              <br />Nothing to say
            </p>
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
            <p>
              google.com
              <br />
              <br />canvas.wisc.edu
            </p>
          </div>
        </div>
      </div>
      <!-- <div class="content-comments"></div> -->

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
    data: Object
  }
};
</script>

<style lang="scss" scoped>
.user-component {
  display: flex;
  height: calc(100vh - 64px);
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
    h2 {
      font-size: 22px;
    }
  }

  .aboutMe-down {
    display: flex;
  }
  .aboutMe-up {
    h2 {
      font-size: 28px;
    }
  }
  .down-left {
    img {
      width: 200px;
      height: 200px;
      object-fit: cover;
    }
  }
  .down-right {
    display: flex;
    align-items: center;
    p {
      white-space: pre-wrap;
    }
  }

  .content-myClass {
    background: lightpink;
    padding: 0.5rem 1rem;
    .myclass-down {
      .class-tag {
        padding: 10px 30px;
        display: inline-block;
        background: darkmagenta;
        color: #fff;
        margin: 10px;
        border-radius: 3px;
      }
    }
  }

  .content-futureGoal {
    // background: red;
    padding: 0.5rem 1rem;
  }

  .content-funStuff {
    background: lightsalmon;
    padding: 0.5rem 1rem;
  }

  .content-otherStuff {
    // background: red;
    padding: 0.5rem 1rem;
  }

  .content-interestingLinks {
    background: lightgoldenrodyellow;
    padding: 0.5rem 1rem;
  }

  footer {
    background: lightgray;
    text-align: center;
    p {
      margin: 0;
    }
  }
}
</style>
