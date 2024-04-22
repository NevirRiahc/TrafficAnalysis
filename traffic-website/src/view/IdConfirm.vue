<template>
  <div>
    <div id="JobChance">

      <div class="banner container-fuild text-center">实名认证</div>
      <div class="container">
          <h2>实名认证</h2>
        <div class="row" style="margin-top: 30px;">
          <div class="col-8">
            <label class="btn btn-default p-0">
              <input
                  type="file"
                  accept="image/*"
                  ref="file"
                  @change="selectImage"
              />
            </label>
          </div>

          <div class="col-4">
            <button
                class="btn btn-success"
                :disabled="!currentImage"
                @click="upload"
                style="width: 120px; margin-top: 10px;"
            >
              识别
            </button>
          </div>
        </div>

        <div v-if="currentImage" class="progress">
          <div
              class="progress-bar progress-bar-info"
              role="progressbar"
              :aria-valuenow="progress"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="{ width: progress + '%' }"
          >
            {{ progress }}%
          </div>
        </div>

        <div v-if="previewImage">
          <div>
            <img class="preview my-3" :src="previewImage" alt=""/>
          </div>
        </div>

        <div v-if="message" class="alert alert-secondary" role="alert">
          {{ message }}
        </div>

        <div style="margin-top: 30px; margin-bottom: 100px;">
          <div class="form-group row">
            <label class="col-4">自动识别身份证号：</label>
            <input v-model="idno" disabled type="text" style="width: 400px;" class="col-4 form-control" placeholder="身份证号码">
          </div>
          <div class="form-group">
            <button class="btn btn-primary col-sm-3" style="width: 120px;" @click="idconfirm">实名认证</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadService from '@/api/upload'
import {idconfirm} from '@/api/user'
import Swal from 'sweetalert2'
import mixin from '@/mixins/mixins'

export default {
  name: 'upload-image',
  mixins: [mixin],
  data () {
    return {
      currentImage: undefined,
      previewImage: undefined,
      progress: 0,
      message: '',
      imageInfos: [],
      idno: ''
    }
  },

  methods: {
    idconfirm(){
      idconfirm({'id': this.uid, 'idno': this.idno}).then(res=>{
        // console.log(res)
        Swal.fire({'title': res.data.message} )
      })
    },
    selectImage () {
      this.currentImage = this.$refs.file.files.item(0)
      this.previewImage = URL.createObjectURL(this.currentImage)
      this.progress = 0
      this.message = ''
    },

    upload () {
      this.progress = 0

      UploadService.idRecognize(this.currentImage, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      })
          .then((response) => {
            console.log(response)
            const {code, data} = response.data
            if(code == 0){
              this.message = "*** 百度接口识别成功！ ***"
              this.idno = data.idno
            }else{
              this.message = "*** 百度识别接口异常！ ***"
            }

            // return UploadService.getFiles()
          })
          .then((images) => {
            // this.imageInfos = images.data
          })
          .catch((err) => {
            this.progress = 0
            this.message = 'Could not upload the image! ' + err
            this.currentImage = undefined
          })
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("../assets/img/banner_2.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}

.JobChance-container {
  margin: 100px;
  padding: 30px;
  transition: all ease 0.5s;
  border: 1px dashed salmon;
}

.JobChance-container h2 {
  color: rgb(255, 102, 19);
  font-weight: bolder;
  text-align: center;
}

.JobChance-container p {
  font-size: 20px;
  color: rgb(255, 102, 19);
  font-weight: 700;
}

.JobChance-container ol {
  list-style-type: decimal;
  padding-left: 30px;
}

.JobChance-container ol > li {
  font-size: 14px;
  line-height: 2.7rem;
}

@media screen and (max-width: 997px) {
  .JobChance-container {
    margin: 20px 0;
    padding: 20px;
    border: 1px dashed salmon;
  }
}

.icon {
  width: 75px;
  height: 75px;
}
</style>
