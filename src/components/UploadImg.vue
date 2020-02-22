<template>
  <div
    class="upload-img"
    :class="{ round }"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <img v-if="imgUrl" :src="imgUrl" alt="about me image" />
    <div class="upload-overlay">
      <div
        class="hint"
        :class="{ 'no-img': !imgUrl }"
        :style="progress != -1 ? 'opacity: 1' : ''"
      >
        <i class="el-icon-upload" />
        {{ hint }}
        <el-progress
          v-if="progress >= 0"
          type="circle"
          :percentage="progress"
          :status="progress === 100 ? 'success' : null"
          :width="round ? width : 100"
          color="#fc4c92"
        />
        <input type="file" accept="image/*" @change="onUpload" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    hint: {
      String,
      default: "Click to upload/change image!",
    },
    foldername: String,
    filename: String,
    resizeWidth: Number,
    resizeHeight: Number,
    width: Number,
    height: Number,
    round: {
      type: Boolean,
      default: false,
    },
    imgUrl: String,
  },
  data() {
    return {
      progress: -1,
    };
  },
  methods: {
    convertImg(file, filename, cb) {
      //load original image
      let original = new Image();
      original.onload = () => {
        // put image to canvas
        const canvas = document.createElement("canvas");
        canvas.width = this.resizeWidth;
        canvas.height = this.resizeHeight;
        // reszie image using canvas
        const ctx = canvas.getContext("2d");
        const wCount = original.width / this.resizeWidth;
        const hCount = original.height / this.resizeHeight;
        let sx, sy, sw, sh;
        if (wCount > hCount) {
          // crop "vertically"
          sh = original.height;
          sw = (original.height * this.resizeWidth) / this.resizeHeight;
          sy = 0;
          sx = (original.width - sw) / 2;
        } else {
          // crop horizontally
          sw = original.width;
          sh = (original.width * this.resizeHeight) / this.resizeWidth;
          sx = 0;
          sy = (original.height - sh) / 2;
        }

        ctx.drawImage(
          original,
          sx,
          sy,
          sw,
          sh,
          0,
          0,
          this.resizeWidth,
          this.resizeHeight
        );
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
    onUpload(e) {
      // Create a root reference
      const filename = this.filename || new Date().toISOString();
      let ref = firebase.storage().ref(`${this.foldername}/${filename}`);

      this.convertImg(e.target.files[0], filename, png => {
        const task = ref.put(png);
        task.on(
          "state_changed",
          snapshot => {
            // progress
            this.progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          err => {
            // error
            alert(`Error while uploading ${filename} photo:`, err.message);
            setTimeout(() => {
              this.progress = -1;
            }, 1000);
          },
          () => {
            // success
            // console.log("Uploaded");
            task.snapshot.ref.getDownloadURL().then(url => {
              setTimeout(() => {
                this.progress = -1;
              }, 1000);
              this.$emit("uploaded", url);
            });
          }
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.upload-img {
  position: relative;
  flex: 0 0 auto;
  overflow: hidden;
  &.round {
    border-radius: 50%;
    .el-progress {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .upload-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .hint {
      font-size: 20px;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      display: flex;
      padding: 0 20px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      opacity: 0;
      transition: all 0.3s;
      &:hover {
        opacity: 1;
      }
      &.no-img {
        background: rgba(255, 186, 186, 0.6);
        color: #fc4c92;
        opacity: 1;
        &:hover {
          opacity: 0.8;
        }
      }
      .el-icon-upload {
        font-size: 50px;
      }
      > * {
        &:not(:last-child) {
          margin-bottom: 8px;
        }
      }
    }
    input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>
