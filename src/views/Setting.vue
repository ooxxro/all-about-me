<template>
  <div class="setting-page">
    <Header />
    <Loading v-if="!user.data" />
    <template v-else>
      <!-- <Account Setting> -->
      <el-card>
        <h3>Account Setting</h3>

        <h4>Avatar</h4>
        <UploadImg
          hint="+ avatar"
          foldername="avatars"
          :filename="user.data.uid + '.png'"
          :resizeWidth="240"
          :resizeHeight="240"
          :width="120"
          :height="120"
          round
          @uploaded="onUploadedAvatar"
        />

        <h4>Dispaly Name</h4>
        <div class="form-item">
          <el-input v-model="displayName" placeholder="Bucky Badger" />
          <el-button
            type="danger"
            @click="onSubmitDisplayName"
            :disabled="
              displayName.trim() === user.data.displayName ||
                !displayName.trim()
            "
          >
            Save
          </el-button>
        </div>

        <h4>Email</h4>
        <div class="form-item">
          <el-input
            v-model="email"
            type="email"
            placeholder="bucky.badger@wisc.edu"
          />
          <el-button
            type="danger"
            @click="onSubmitEmail"
            :disabled="email.trim() === user.data.email || !email.trim()"
          >
            Save
          </el-button>
        </div>

        <h4>Change Password</h4>
        <div class="form-item">
          <el-input
            v-model="currentPassword"
            placeholder="Current Password"
            show-password
          />
          <el-input
            v-model="newPassword"
            placeholder="New Password"
            show-password
          />
          <el-input
            v-model="confirmNewPassword"
            placeholder="Confirm New Password"
            show-password
          />
          <el-button
            @click="onSubmitPassword"
            type="danger"
            :disabled="
              !currentPassword ||
                !newPassword ||
                newPassword !== confirmNewPassword
            "
          >
            Change
          </el-button>
        </div>
      </el-card>
      <!-- </End: Account Setting> -->

      <!-- <Profile Setting> -->
      <el-card>
        <h3>Update Your Profile!</h3>

        <h4>About Me</h4>
        <div class="form-item">
          <UploadImg
            hint="upload/change About Me photo!"
            :foldername="user.data.uid"
            filename="aboutme.png"
            :resizeWidth="1200"
            :resizeHeight="1600"
            :width="210"
            :height="280"
          />
          <el-input type="textarea" :rows="8" v-model="form.aboutMe" />
        </div>

        <!-- my class -->
        <h4>My Classes</h4>
        <div style="margin: -5px">
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
            style="margin: 5px"
          />
          <el-button
            v-else
            class="button-new-class"
            type="primary"
            plain
            size="small"
            @click="showClassInput"
            style="margin: 5px"
          >
            + New Class
          </el-button>
        </div>
        <!-- end: my class -->

        <!-- <future goal> -->
        <h4>Future Goal</h4>
        <div>
          <div
            v-for="(c, i) in form.futureGoals"
            :key="i"
            style="margin: 0 -5px"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @close="removeGoal(i)"
              type="warning"
            >
              {{ i + 1 + ". " + c }}
            </el-tag>
          </div>
          <el-input
            v-model="newGoal"
            placeholder="Get A in CS506. (Press Enter to add a future goal)"
            @keyup.enter.native="addGoal"
            @blur="addGoal"
          />
        </div>
        <!-- <end: future goal> -->

        <!-- <Fun Stuff> -->
        <h4>Fun Stuff</h4>
        <div>
          <div v-for="(c, i) in form.funStuff" :key="i" style="margin: 0 -5px">
            <el-tag
              closable
              :disable-transitions="false"
              @close="removeFun(i)"
              type="success"
            >
              {{ c }}
            </el-tag>
          </div>
          <el-input
            v-model="newFun"
            placeholder="Tell your fun story"
            @keyup.enter.native="addFun"
            @blur="addFun"
          />
        </div>
        <!-- </End: Fun Stuff> -->

        <!-- <Other Stuff> -->
        <h4>Other Stuff</h4>
        <div />
        <!-- </End: Other Stuff> -->

        <!-- <Interesting Links> -->
        <h4>Interesting Links</h4>
        <div>
          <div
            v-for="(c, i) in form.interestingLinks"
            :key="i"
            style="margin: 0 -5px"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @close="removeLink(i)"
              type="success"
            >
              {{ c }}
            </el-tag>
          </div>
          <el-input
            v-model="newLink"
            placeholder="Tell your fun story"
            @keyup.enter.native="addLink"
            @blur="addLink"
          />
        </div>
        <!-- </End: Interesting Links> -->

        <div class="bottom-button">
          <el-button type="danger" @click="onSubmit">Save</el-button>
        </div>
      </el-card>
      <!-- <End: Profile Setting> -->
    </template>
  </div>
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import Header from "../components/Header";
import UploadImg from "../components/UploadImg";

export default {
  name: "Setting",
  components: {
    Header,
    UploadImg,
  },
  data() {
    return {
      displayName: "",
      email: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      aboutMeImgUrl: null,
      aboutMeImgProgress: -1,
      newClass: "",
      classInputVisible: false,
      newGoal: "",
      newFun: "",
      newLink: "",
      form: {
        aboutMe: "",
        myClasses: [],
        futureGoals: [],
        funStuff: [],
        interestingLinks: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
  watch: {
    user: {
      handler(user) {
        if (user.data) {
          this.displayName = user.data.displayName || "";
          this.email = user.data.email || "";

          this.fetchProfile(user.data.uid);
          this.fetchAboutMeImg(user.data.uid);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["fetchUser"]),
    onUploadedAvatar(url) {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          photoURL: url,
        })
        .then(() => {
          return user.reload();
        })
        .then(() => {
          this.fetchUser(firebase.auth().currentUser);
        });
    },
    onSubmitDisplayName() {
      const user = firebase.auth().currentUser;

      user
        .updateProfile({
          displayName: this.displayName.trim(),
        })
        .then(() => {
          // Update successful.
          return user.reload();
        })
        .then(() => {
          this.fetchUser(firebase.auth().currentUser);
          alert("Update Display Name Successful.");
        })
        .catch(() => {
          // An error happened.
          alert("Error occurred when updating Display Name.");
        });
    },
    async onSubmitEmail() {
      const user = firebase.auth().currentUser;
      let password;
      try {
        const { value } = await this.$prompt(
          "Please type your Password",
          "Confirm update email",
          {
            confirmButtonText: "OK",
            cancelButtonText: "cancel",
            inputType: "password",
          }
        );
        password = value;
      } catch (err) {
        // user canceled
        return;
      }

      try {
        await this.reauthenticate(user.email, password);
      } catch (err) {
        alert(err.message);
        return;
      }

      try {
        await user.updateEmail(this.email);
        // Update successful.
        await user.reload();
        this.fetchUser(firebase.auth().currentUser);
        alert("Update email Successful.");
      } catch (err) {
        // An error happened.
        alert("Error occurred when updating email.");
        return;
      }
    },
    async onSubmitPassword() {
      const user = firebase.auth().currentUser;

      try {
        await this.reauthenticate(user.email, this.currentPassword);
      } catch (err) {
        alert(err.message);
        return;
      }

      try {
        await user.updatePassword(this.newPassword);
        // Update successful.
        alert("Change Password Successful.");
        this.currentPassword = "";
        this.newPassword = "";
        this.confirmNewPassword = "";
      } catch (err) {
        // An error happened.
        alert("Error occurred when changing Password: " + err.message);
      }
    },
    reauthenticate(email, password) {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      // Now you can use that to reauthenticate
      return user.reauthenticateWithCredential(credential);
    },
    fetchProfile(uid) {
      let db = firebase.firestore();
      let docRef = db.collection("aboutMe").doc(uid);
      docRef.get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          this.form.aboutMe = data.aboutMe || "";
          this.form.myClasses = data.myClasses || [];
          this.form.futureGoals = data.futureGoals || [];
          this.form.funStuff = data.funStuff || [];
          this.form.interestingLinks = data.interestingLinks || [];
          // console.log(doc.data());
        } else {
          // console.log("not found");
        }
      });
    },
    // Update Profile
    uploadAboutMeImg(e) {
      // Create a root reference
      let ref = firebase.storage().ref(this.user.data.uid + "/aboutme.png");

      this.convertImg(e.target.files[0], "aboutme.png", 1200, png => {
        const task = ref.put(png);
        task.on(
          "state_changed",
          snapshot => {
            // progress
            this.aboutMeImgProgress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          err => {
            // error
            alert("Error while uploading about me photo:", err.message);
            setTimeout(() => {
              this.aboutMeImgProgress = -1;
            }, 1000);
          },
          () => {
            // success
            // console.log("Uploaded");
            task.snapshot.ref.getDownloadURL().then(url => {
              this.aboutMeImgUrl = url;
              setTimeout(() => {
                this.aboutMeImgProgress = -1;
              }, 1000);
            });
          }
        );
      });
    },
    fetchAboutMeImg(uid) {
      let storage = firebase.storage();
      let ref = storage.ref(uid + "/aboutme.png");
      ref
        .getDownloadURL()
        .then(url => {
          this.aboutMeImgUrl = url;
        })
        .catch(() => {});
    },
    convertImg(file, filename, resizeSize, cb) {
      //load original image
      let original = new Image();
      original.onload = () => {
        // put image to canvas
        let canvas = document.createElement("canvas");
        // reszie image using canvas
        let width = original.width;
        let height = original.height;
        if (width > height) {
          if (width > resizeSize) {
            height *= resizeSize / width;
            width = resizeSize;
          }
        } else {
          if (height > resizeSize) {
            width *= resizeSize / height;
            height = resizeSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(original, 0, 0, width, height);
        // read from canvas to png image file
        let dataURL = canvas.toDataURL("image/png");
        // https://stackoverflow.com/a/43358515/12017013
        let arr = dataURL.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        cb(new File([u8arr], filename, { type: mime }));
      };
      original.onerror = () => {
        alert("The provided file couldn't be loaded as an Image media");
      };
      original.src = URL.createObjectURL(file);
    },
    addClass() {
      let newClass = this.newClass.trim();
      if (newClass && !this.form.myClasses.includes(newClass)) {
        this.form.myClasses.push(newClass);
      }
      this.classInputVisible = false;
      this.newClass = "";
    },
    removeClass(index) {
      this.form.myClasses.splice(index, 1);
    },
    showClassInput() {
      this.classInputVisible = true;
      this.$nextTick(() => {
        this.$refs.newClassInput.$refs.input.focus();
      });
    },
    addGoal() {
      let newGoal = this.newGoal.trim();
      if (newGoal && !this.form.futureGoals.includes(newGoal)) {
        this.form.futureGoals.push(newGoal);
      }
      this.newGoal = "";
    },
    removeGoal(index) {
      this.form.futureGoals.splice(index, 1);
    },
    addFun() {
      let newFun = this.newFun.trim();
      if (newFun && !this.form.funStuff.includes(newFun)) {
        this.form.funStuff.push(newFun);
      }
      this.newFun = "";
    },
    removeFun(index) {
      this.form.funStuff.splice(index, 1);
    },
    addLink() {
      let newLink = this.newLink.trim();
      if (newLink && !this.form.interestingLinks.includes(newLink)) {
        this.form.interestingLinks.push(newLink);
      }
      this.newLink = "";
    },
    removeLink(index) {
      this.form.interestingLinks.splice(index, 1);
    },

    onSubmit() {
      console.log("submit!");
      let db = firebase.firestore();

      db.collection("aboutMe")
        .doc(this.user.data.uid)
        .set({
          aboutMe: this.form.aboutMe.trim(),
          myClasses: this.form.myClasses,
          futureGoals: this.form.futureGoals,
          funStuff: this.form.funStuff,
          interestingLinks: this.form.interestingLinks,
        })
        .then(() => {
          alert("Update Profile Successful.");
          this.$router.push("/user");
        })
        .catch(err => {
          alert("Error occurred when updating profile: " + err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item {
  display: flex;
  align-items: center;
  input {
    flex: 1;
  }
  > *:not(:last-child) {
    margin-right: 1rem;
  }
}
.el-card {
  margin: 35px auto;
  padding: 50px 30px;
  max-width: 800px;
}
h3 {
  text-align: center;
  font-size: 24px;
  margin: 0 auto 50px;
}

.el-tag {
  margin: 5px;
  font-size: 14px;
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
.bottom-button {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}
.el-textarea {
  font-size: 16px;
}
</style>
