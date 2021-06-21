<template>
  <div class="commodity_add">
    <div class="head">
      <p>{{ id == undefined ? '商品添加' : '商品编辑' }}</p>
    </div>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <div class="top">
          <div class="top_left">
            <el-form-item prop="name" label="课程名称">
              <el-input v-model="form.name" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item prop="comment" label="描述">
              <el-input v-model="form.comment" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item prop="catid" label="商品分类">
              <el-select v-model="form.catid">
                <el-option
                  v-for="(item, index) in catid"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="photo" label="封面图片">
              <el-upload
                class="upload-demo"
                action="/api/upload/add"
                :show-file-list="false"
                :on-success="handleAvatar"
                :headers="headers"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <img
                  v-if="form.photo"
                  style="width:30px;height:30px;"
                  :src="$config.baseimg + form.photo"
                  alt=""
                />
              </el-upload>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="checkedColors">
                <el-checkbox
                  v-for="color in colors"
                  :label="color"
                  :key="color"
                  @change="checkedc(color)"
                  >{{ color }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="checkedSizes">
                <el-checkbox
                  v-for="size in sizes"
                  :label="size"
                  :key="size"
                  @change="checkeds(size)"
                  >{{ size }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
            <table>
              <tr v-for="(item, index) in productCats" :key="index">
                <td>{{ item.color }}</td>
                <td>
                  <div v-for="(sitem, sindex) in item.size" :key="sindex">
                    <li>{{ sitem.name }}</li>
                    <li><input placeholder="价格" type="text" /></li>
                    <li><input placeholder="库存" type="text" /></li>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <div class="top_right">
            <div>
              <el-form-item prop="pictures">
                <el-upload
                  class="avatar-uploader"
                  action="/api/upload/add"
                  :on-success="leAvatarSuccess"
                  :show-file-list="false"
                  multiple
                  :headers="headers"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <img
                  v-for="(item, index) in form.pictures"
                  :key="index"
                  :src="$config.baseimg + item.filename"
                  style="width:30px;height30px"
                  alt=""
                />
                <p>上传照片</p>
              </el-form-item>
            </div>

            <div>
              <el-form-item prop="videos">
                <el-upload
                  class="avatar-uploader"
                  multiple
                  :on-success="handSuccess"
                  :show-file-list="false"
                  action="/api/upload/add"
                  :headers="headers"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <video
                  v-for="(item, index) in form.videos"
                  :key="index"
                  :src="$config.baseimg + item.filename"
                  style="width:30px;height30px"
                ></video>
                <p>上传视频</p>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="bottom">
          <el-form-item style="margin-top:20px;" prop="info" label="商品介绍">
            <el-input
              type="textarea"
              v-model="form.info"
              style="width:50%;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="displayOrder" label="排序">
            <el-input
              v-model="form.displayOrder"
              style="width:300px;"
            ></el-input>
          </el-form-item>
          <el-form-item prop="addtime" label="添加时间">
            <el-date-picker
              v-model="form.addtime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="submit(form)">{{
              this.id == undefined ? '添加' : '编辑'
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
      form: {
        id: 0,
        name: '',
        photo: '',
        comment: '',
        catid: '',
        info: '',
        addtime: '',
        displayOrder: '',
        videos: [],
        pictures: [],
      },
      rules: {
        name: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
        comment: [
          { required: true, message: '请描述一下课程', trigger: 'blur' },
        ],
        catid: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
        photo: [{ required: true, message: '请选择封面图片', trigger: 'blur' }],
        pictures: [{ required: true, message: '请选择图片', trigger: 'blur' }],
        videos: [{ required: true, message: '请选择视频', trigger: 'blur' }],
        info: [{ required: true, message: '请输入商品介绍', trigger: 'blur' }],
        displayOrder: [
          { required: true, message: '请选择排序', trigger: 'blur' },
        ],
        addtime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
      },
      id: '',
      catid: [],
      value: '',
      imageUrl: '',
      // 颜色复选框
      checkedColors: [],
      colors: ['蓝色', '红色', '紫色', '玫瑰色'],
      // 尺寸复选框
      checkedSizes: [],
      newcheckedSizes: [],
      sizes: ['X', 'XL', 'M', 'L'],
      productCats: [],
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      let self = this
      if (to.path == '/muke/commodity_add') {
        self.sizeForm = {
          id: 0,
          name: '',
          photo: '',
          comment: '',
          catid: '',
          info: '',
          addtime: '',
          displayOrder: '',
          videos: [],
          pictures: [],
        }
      }
    },
  },
  created() {
    this.getfenlei()
    this.getModel()
  },
  methods: {
    getModel() {
      this.id = this.$route.query.id
      if (this.id == undefined) {
        return
      }
      let that = this
      that.$http.get('/api/product/get?id=' + this.id).then((res) => {
        that.form = res.data
      })
    },
    checkedc(item) {
      this.colorIndex = item
      console.log(item)
      let checkedc = this.checkedColors
      let checkeds = this.checkedSizes
      console.log(checkedc)
      if (checkedc.length > 1) {
      }
      this.checkedSizes = []
      if (this.checkedColors.indexOf(item) == -1) {
        let index = this.getItem(item)
        this.productCats.splice(index, 1)
      } else {
        let model = { color: item, size: [{ name: '' }] }
        this.productCats.push(model)
      }
    },
    getItem(color) {
      let index = -1
      for (let i = 0; i < this.productCats.length; i++) {
        if (this.productCats[i].color == color) {
          index = i
          break
        }
      }
      return index
    },
    //   点击尺寸复选框
    checkeds(item) {
      let index = this.getItem(this.colorIndex)
      if (index == -1) {
        let model = { color: this.colorIndex, size: [{ name: item }] }

        this.productCats.push(model)
      } else {
        let list = []
        for (let i = 0; i < this.checkedSizes.length; i++) {
          list.push({ name: this.checkedSizes[i] })
        }
        this.productCats[index].size = list
      }

      //let model=  { color:this.colorIndex, size: [{ name:item}] };

      console.log(this.checkedSizes)
      let checkeds = this.checkedSizes
      console.log(this.checkedSizes)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    handleAvatar(res, file) {
      console.log(res)
      this.form.photo = res.data
      // this.imageUrl = URL.createObjectURL(file.raw)
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
    getfenlei() {
      this.$http.get('/api/productcat/list', {}).then((res) => {
        console.log(res)
        this.catid = res.data.list
      })
    },
    submit(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.post('/api/product/add', form).then((res) => {
            if (this.id == undefined) {
              console.log(res)
              this.$router.push({ path: '/muke/commodity' })
              this.$message({
                message: '添加成功',
                type: 'success',
              })
            } else {
              console.log(res)
              this.$router.push({ path: '/muke/commodity' })
              this.$message({
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
  },
}
</script>

<style lang="scss">
.commodity_add {
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
        table {
          border-collapse: collapse;
          width: 100%;

          td {
            border: solid 1px #000;
            padding: 0px;
            div {
              display: flex;
              border-bottom: solid 1px #000;
            }
            div:last-child {
              border-bottom: none;
            }
            li {
              display: inline-block;
              flex: 1;
            }
          }
        }
      }
      .top_right {
        width: 50%;
        height: 100%;
        display: flex;
        div {
          display: flex;
          flex-direction: column;
          align-items: center;

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
