import "modern-normalize/modern-normalize.css";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import Loading from "./components/Loading";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.component("Loading", Loading);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASNxLbemWVg1B4tPuGnTw6RrLqC8qoJEc",
  authDomain: "vue-login-7f9fc.firebaseapp.com",
  databaseURL: "https://vue-login-7f9fc.firebaseio.com",
  projectId: "vue-login-7f9fc",
  storageBucket: "vue-login-7f9fc.appspot.com",
  messagingSenderId: "296727529050",
  appId: "1:296727529050:web:734e5a7f80752a0986fa63",
  measurementId: "G-ETRSDCE63K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.auth().onAuthStateChanged(user => {
  // console.log(user);
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
