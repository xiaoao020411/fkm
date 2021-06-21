<template>
  <div class="honor_add">
    <div class="head">
      <div v-if="typeid == 1">
        <p>{{ this.id == undefined ? '添加作品信息' : '编辑作品信息' }}</p>
      </div>
      <div v-else-if="typeid == 2">
        <p>{{ this.id == undefined ? '添加活动信息' : '编辑活动信息' }}</p>
      </div>
      <div v-else-if="typeid == 3">
        <p>{{ this.id == undefined ? '添加赛事信息' : '编辑赛事信息' }}</p>
      </div>
      <div v-else-if="typeid == 4">
        <p>{{ this.id == undefined ? '添加考级信息' : '编辑考级信息' }}</p>
      </div>
      <div v-else>
        <p>{{ this.id == undefined ? '添加荣誉信息' : '编辑荣誉信息' }}</p>
      </div>
    </div>
    <div class="form">
      <el-form :model="from" :rules="rules" ref="from" label-width="80px">
        <div class="top">
          <div class="top_left">
            <el-form-item prop="title" label="标题">
              <el-input v-model="from.title" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item prop="comment" label="描述">
              <el-input v-model="from.comment" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item prop="photo" label="封面图片">
              <el-upload
                class="upload-demo"
                action="/api/upload/add"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                :headers="headers"
              >
                <el-button size="small" type="primary">上传图片</el-button>
                <img
                  v-if="from.photo"
                  style="width:30px;height:30px;"
                  :src="$config.baseimg + from.photo"
                  alt=""
                />
              </el-upload>
            </el-form-item>
            <el-form-item prop="videos" label="课程视频">
              <el-upload
                class="upload-demo"
                action="/api/upload/add"
                multiple
                :show-file-list="false"
                :on-success="handSuccess"
                :headers="headers"
              >
                <el-button size="small" type="primary">上传视频</el-button>
                <video
                  v-for="(item, index) in from.videos"
                  :key="index"
                  :src="$config.baseimg + item.filename"
                  style="width:30px;height30px"
                ></video>
              </el-upload>
            </el-form-item>
          </div>
          <div class="top_right">
            <el-form-item prop="pictures">
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="/api/upload/add"
                  :show-file-list="false"
                  :on-success="leAvatarSuccess"
                  :headers="headers"
                  multiple
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <p>上传照片</p>
              </div>
            </el-form-item>
            <div class="img">
              <img
                v-for="(item, index) in from.pictures"
                :key="index"
                :src="$config.baseimg + item.filename"
                style="width:50px;height:50px;margin-top:10px;"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-form-item
            style="margin-top:20px;"
            prop="content"
            label="详细信息"
          >
            <el-input
              v-model="from.content"
              type="textarea"
              style="width:50%;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFrom('from')"
              >确定</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    Date.prototype.Format = function(fmt) {
      var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'H+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
      }
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ('00' + o[k]).substr(('' + o[k]).length)
          )
      return fmt
    }
    return {
      headers: { token: sessionStorage.getItem('token') },
      from: {
        id: 0,
        title: '',
        typeid: this.$route.params.typeid,

        photo: '',
        comment: '',
        content: '',
        state: 0,
        videos: [],
        pictures: [],
      },
      id: '',
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
        comment: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        photo: [{ required: true, message: '请选择封面图片', trigger: 'blur' }],
        videos: [
          { required: true, message: '请选择上传视频', trigger: 'blur' },
        ],
        pictures: [
          { required: true, message: '请选择封面图片', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请输入详细信息', trigger: 'blur' },
        ],
      },
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      let self = this
      if (to.path == '/muke/memorabiliaAdd/' + this.$route.params.typeid) {
        self.sizeForm = {
          id: 0,
          title: '',
          typeid: this.$route.params.typeid,
          photo: '',
          comment: '',
          content: '',
          state: 0,
          videos: [],
          pictures: [],
        }
      }
    },
  },
  created() {
    this.getModel()
  },
  methods: {
    getModel() {
      this.id = this.$route.query.id
      // console.log(this.id)
      if (this.id == undefined) {
        return
      }
      let that = this
      that.$http.get('/api/records/get?id=' + that.id).then((res) => {
        // console.log(res)
        that.from = res.data
      })
    },
    submitFrom(from) {
      this.$refs[from].validate((valid) => {
        if (valid) {
          let that = this
          that.from.addtime = new Date().Format('yyyy-MM-dd HH:mm:ss')
          that.$http.post('/api/records/add', that.from).then((res) => {
            if (that.id == undefined) {
              console.log(res)
              that.$router.push({
                path: '/muke/memorabilia/' + this.$route.params.typeid,
              })
              that.$message({
                message: '添加成功',
                type: 'success',
              })
            } else {
              console.log(res)
              that.$router.push({
                path: '/muke/memorabilia/' + this.$route.params.typeid,
              })
              that.$message({
                message: '编辑成功',
                type: 'success',
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    leAvatarSuccess(res, file) {
      if (res.errCode == 10000) {
        this.from.pictures.push({ filename: '', oldfilename: file.name })
        const index = this.from.pictures.length - 1
        this.from.pictures[index].filename = res.data
      }
    },
    handSuccess(res, file) {
      console.log(res)
      if (res.errCode == 10000) {
        this.from.videos.push({ filename: '', oldfilename: file.name })

        const index = this.from.videos.length - 1
        this.from.videos[index].filename = res.data
      }
    },
    handleAvatarSuccess(res, file) {
      if (res.errCode == 10000) {
        this.from.photo = res.data
      }
    },
  },
}
</script>

<style lang="scss">
.honor_add {
  width: 100%;
  height: 100%;
  .head {
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;
    p {
      margin-left: 20px;
    }
  }
  .form {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    .top {
      width: 100%;
      height: 70%;
      display: flex;
      .top_left {
        width: 50%;
        height: 100%;
      }
      .top_right {
        width: 50%;
        height: 100%;
        display: flex;
        .img {
          margin-left: 60px;
          height: 293px;
        }
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 10px;

          p {
            margin-top: 10px;
          }
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409eff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
  }
}
</style>
