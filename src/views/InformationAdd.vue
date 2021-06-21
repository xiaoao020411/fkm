<template>
  <div class="information_add">
    <div class="head">
      <p>{{ id == undefined ? '课程添加' : '课程编辑' }}</p>
    </div>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <div class="top">
          <div class="top_left">
            <el-form-item prop="name" label="课程名称">
              <el-input placeholder="请输入内容" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="封面图片">
              <el-upload
                class="upload-demo"
                action="/api/upload/add"
                :on-success="leAvatarSuccess"
                multiple
                :show-file-list="false"
                :headers="headers"
              >
                <el-button size="small" type="primary">上传图片</el-button>
                <img
                  v-for="(item, index) in form.pictures"
                  :key="index"
                  :src="$config.baseimg + item.filename"
                  style="width:30px;height30px"
                  alt=""
                />
              </el-upload>
            </el-form-item>
            <el-form-item label="课程视频">
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
                  v-for="(item, index) in form.videos"
                  :key="index"
                  :src="$config.baseimg + item.filename"
                  style="width:30px;height30px"
                ></video>
              </el-upload>
            </el-form-item>
            <el-form-item prop="teacherid" label="上课老师">
              <el-select v-model="form.teacherid">
                <el-option
                  v-for="(item, index) in teachers"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="courseStartTime" label="上课时间">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.courseStartTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="courseEndTime" label="结束时间">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="form.courseEndTime"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item prop="address" label="上课地址">
              <el-input
                placeholder="请输入内容"
                v-model="form.address"
              ></el-input>
            </el-form-item>

            <el-form-item prop="classRoom" label="教室">
              <el-input
                placeholder="请输入内容"
                v-model="form.classRoom"
              ></el-input>
            </el-form-item>
            <el-form-item prop="levelid" label="难度">
              <el-select v-model="form.levelid">
                <el-option
                  v-for="(item, index) in difficulty"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="purposeid" label="目的">
              <el-select v-model="form.purposeid">
                <el-option
                  v-for="(item, index) in objective"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="catid" label="类型">
              <el-select v-model="form.catid">
                <el-option
                  v-for="(item, index) in type"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="modeid" label="模式">
              <el-select v-model="form.modeid">
                <el-option
                  v-for="(item, index) in pattern"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="price" label="价格">
              <el-input
                placeholder="请输入内容"
                v-model="form.price"
              ></el-input>
            </el-form-item>
            <el-form-item label="标准卡扣课时">
              <el-input-number
                v-model="form.consume"
                style="width: 233px"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="学生人数">
              <el-input-number
                v-model="form.students"
                style="width: 233px"
                controls-position="right"
                :min="1"
              ></el-input-number>
            </el-form-item>
          </div>
          <div class="top_right">
            <el-form-item prop="photo">
              <div>
                <el-upload
                  class="avatar-uploader"
                  :on-success="handleAvatarSuccess"
                  action="/api/upload/add"
                  :headers="headers"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <img
                  v-if="form.photo"
                  style="width:100px;height:100px;"
                  :src="$config.baseimg + form.photo"
                  alt=""
                />
                <p>上传照片</p>
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="bottom">
          <el-form-item prop="info" label="课程介绍">
            <el-input type="textarea" v-model="form.info"></el-input>
          </el-form-item>
          <el-form-item prop="note" label="注意事项">
            <el-input type="textarea" v-model="form.note"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submitForm(form)">{{
              id == undefined ? '添加' : '编辑'
            }}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: { token: localStorage.getItem('token') },
      id: '',
      form: {
        id: 0,
        name: '',
        teacherid: '',
        teachername: null,
        photo: '',
        courseStartTime: '',
        courseEndTime: '',
        address: '',
        classRoom: '',
        levelid: '',
        purposeid: '',
        catid: '',
        modeid: '',
        price: '',
        consume: '',
        info: '',
        note: '',
        students: '',

        videos: [],
        pictures: [],
      },
      rules: {
        name: [
          { required: true, message: '请选择课程名称', trigger: 'change' },
        ],
        teacherid: [
          { required: true, message: '请选择上课老师', trigger: 'change' },
        ],
        courseStartTime: [
          { required: true, message: '请选择上课时间', trigger: 'change' },
        ],
        courseEndTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入上课地址', trigger: 'change' },
        ],
        classRoom: [
          { required: true, message: '请输入教室', trigger: 'change' },
        ],
        address: [
          { required: true, message: '请输入上课地址', trigger: 'change' },
        ],
        levelid: [{ required: true, message: '请选择难度', trigger: 'change' }],
        purposeid: [
          { required: true, message: '请选择目的', trigger: 'change' },
        ],
        catid: [{ required: true, message: '请选择类型', trigger: 'change' }],
        modeid: [{ required: true, message: '请选择模式', trigger: 'change' }],
        price: [{ required: true, message: '请输入价格', trigger: 'change' }],
        photo: [{ required: true, message: '请选择图片', trigger: 'change' }],
        info: [
          { required: true, message: '请输入课程介绍', trigger: 'change' },
        ],
        note: [
          { required: true, message: '请输入注意事项', trigger: 'change' },
        ],
      },
      teachers: [],
      difficulty: [],
      objective: [],
      type: [],
      pattern: [],
      psize: 5,
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      let self = this
      if (to.path == '/coursesadd') {
        self.form = {
          id: 0,
          name: '',
          teacherid: '',
          teachername: null,
          photo: '',
          courseStartTime: '',
          courseEndTime: '',
          address: '',
          classRoom: '',
          levelid: '',
          purposeid: '',
          catid: '',
          modeid: '',
          price: '',
          consume: '',
          info: '',
          note: '',
          students: '',

          videos: [],
          pictures: [],
        }
      }
    },
  },
  created() {
    this.getData()
    this.Infodifficulty()
    this.Infoobjective()
    this.Infotype()
    this.Infopattern()
    this.getModel()
  },
  methods: {
    getModel() {
      this.id = this.$route.query.id
      if (this.id == undefined) {
        return
      }
      let that = this
      that.$http.get('/api/courses/get?id=' + this.id).then((res) => {
        that.form = res.data
      })
    },
    leAvatarSuccess(res, file) {
      if (res.errCode == 10000) {
        this.form.pictures.push({ filename: '' })

        const index = this.form.pictures.length - 1
        this.form.pictures[index].filename = res.data
      }
    },
    handSuccess(res, file) {
      console.log(res)
      if (res.errCode == 10000) {
        this.form.videos.push({ filename: '' })

        const index = this.form.videos.length - 1
        this.form.videos[index].filename = res.data
      }
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      this.form.photo = res.data
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    submitForm(form) {
      console.log(form)

      this.$refs.form.validate((valid) => {
        if (valid) {
          let that = this

          that.$http.post('/api/courses/add', this.form).then(
            (res) => {
              if (that.id == undefined) {
                console.log(res)
                that.form = {}
                that.$router.push({ path: '/muke/information' })
                that.$message({
                  message: '添加成功',
                  type: 'success',
                })
              } else {
                console.log(res)
                that.form = {}
                that.$router.push({ path: '/muke/information' })
                that.$message({
                  message: '编辑成功',
                  type: 'success',
                })
              }
            },
            (fail) => {
              console.log(fail)
            }
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // console.log(333, JSON.stringify(this.form))
    },
    //难度
    Infodifficulty() {
      let that = this
      that.$http.get('/api/courselevel/list').then((res) => {
        console.log('难度', res)
        that.difficulty = res.data.list
      })
    },
    //目的
    Infoobjective() {
      let that = this
      that.$http.get('/api/coursepurpose/list').then((res) => {
        console.log('目的', res)
        that.objective = res.data.list
      })
    },
    //类型
    Infotype() {
      let that = this
      that.$http.get('/api/coursecat/list').then((res) => {
        console.log('类型', res)
        that.type = res.data.list
      })
    },
    //模式
    Infopattern() {
      let that = this
      that.$http.get('/api/coursemode/list').then((res) => {
        console.log('模式', res)
        that.pattern = res.data.list
      })
    },
    getData() {
      let that = this
      that.$http
        .get('/api/teachers/list', { psize: this.psize })
        .then((res) => {
          // console.log(res)
          this.teachers = res.data.list
        })
    },
  },
}
</script>

<style lang="scss">
.information_add {
  width: 100%;
  height: 655px;
  overflow-y: auto;
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
    .bottom {
      width: 100%;
      height: 30%;
    }
  }
}
</style>
