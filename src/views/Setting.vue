<template>
  <div class="setting-page">
    <Header />
    <el-card>
      <h3>Update your profile!</h3>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        @submit.native.prevent
      >
        <el-form-item label="About Me">
          <el-input type="textarea" :rows="5" v-model="form.aboutMe"></el-input>
        </el-form-item>

        <!-- my class -->
        <el-form-item label="My Class">
          <el-tag
            v-for="(c, i) in form.myClasses"
            :key="i"
            closable
            :disable-transitions="false"
            @close="removeClass(i)"
            type="danger"
          >
            {{ c }}
          </el-tag>
          <el-input
            class="input-new-class"
            v-if="classInputVisible"
            v-model="newClass"
            ref="newClassInput"
            size="small"
            placeholder="CS506"
            @keyup.enter.native="addClass"
            @blur="addClass"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-class"
            type="primary"
            plain
            size="small"
            @click="showClassInput"
          >
            + New Class
          </el-button>
        </el-form-item>
        <!-- end: my class -->

        <el-form-item>
          <el-button type="danger" @click="onSubmit">Save</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header";
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "Setting",
  components: {
    Header
  },
  data() {
    return {
      newClass: "",
      classInputVisible: false,
      form: {
        aboutMe: "",
        myClasses: []
      }
    };
  },
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  methods: {
    addClass() {
      let newClass = this.newClass.trim();
      if (newClass && !this.form.myClasses.includes(newClass)) {
        this.form.myClasses.push(newClass);
      }
      this.classInputVisible = false;
      this.newClass = "";
    },
    removeClass(index) {
      this.dynamicTags.splice(index, 1);
    },
    showClassInput() {
      this.classInputVisible = true;
      this.$nextTick(() => {
        this.$refs.newClassInput.$refs.input.focus();
      });
    },
    onSubmit() {
      console.log("submit!");
      let db = firebase.firestore();

      db.collection("aboutMe")
        .doc(this.user.data.uid)
        .set({
          aboutMe: this.form.aboutMe,
          myClasses: this.form.myClasses
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-page {
}
.el-card {
  margin: 35px auto;
  max-width: 800px;
}
h3 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 40px;
}
.el-form {
  padding: 30px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-class {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-class {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
