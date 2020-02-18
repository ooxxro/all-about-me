<template>
  <div class="home">
    <HelloWorld bb="Berber" :count="count" />
    <HelloWorld bb="Berber" :count="count + 1" />
    <HelloWorld bb="Berber" :count="3" />
    <HelloWorld bb="Berder" :count="4" />
    <button @click="add">add</button>
    <button @click="logout">logout</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

import firebase from 'firebase';
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
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
          this.$router.replace('login');
        });
    },
    add() {
      this.count++;
    }
  }
};
</script>
