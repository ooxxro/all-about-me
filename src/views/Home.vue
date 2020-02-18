<template>
  <div class="home">
    <button @click="add">add</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      count: 1
    };
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    },
    add() {
      this.count++;
    }
  }
};
</script>
