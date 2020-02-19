<template>
  <div class="home">
    <Header />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      count: 1
    };
  }
};
</script>
