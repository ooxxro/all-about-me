<template>
  <div class="home">
    <Header />

    <section class="hero">
      <div class="headline">
        <div>ALL</div>
        <div>ABOUT</div>
        <div>ME</div>
      </div>
      <img class="hero-img" src="../assets/hero-yoshi.png" alt="" />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    Header,
  },
  data() {
    return {
      count: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 800px;
  padding: 100px 60px;
  overflow: hidden;
}
.hero-img {
  width: 60%;
  height: auto;
  object-fit: cover;
  border: 10px solid #fff;
  transform: rotate(7deg);
  flex: 0 1 auto;
}
.headline {
  flex: 0 0 auto;
  margin-right: 100px;
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
</style>
