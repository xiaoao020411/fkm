<template>
  <div class="teachers_add">
    <div class="head">
      <p>
        师资添加
      </p>
    </div>
    <div class="from">
      <el-form :model="from" :rules="rules" ref="from" label-width="80px">
        <div class="top">
          <div class="lefts">
            <el-form-item prop="name" label="姓名">
              <el-input v-model="from.name" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item prop="tel" label="联系方式">
              <el-input v-model="from.tel" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item prop="wechat" label="微信号">
              <el-input v-model="from.wechat" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
              <el-input v-model="from.email" style="width: 300px;"></el-input>
            </el-form-item>
            <el-form-item prop="address" label="地址">
              <el-input v-model="from.address" style="width: 300px;"></el-input>
            </el-form-item>
          </div>
          <div class="you">
            <el-form-item prop="photo">
              <div>
                <el-upload
                  action="/api/upload/add"
                  list-type="picture-card"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  v-model="from.photo"
                  :headers="headers"
                >
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <img
                  v-if="from.photo"
                  style="width:147px;height:147px"
                  :src="$config.baseimg + from.photo"
                  alt=""
                />
                <p>上传图片</p>
              </div>
            </el-form-item>
          </div>
        </div>

        <div class="foot">
          <el-form-item prop="remarks" label="备注">
            <el-input
              type="textarea"
              v-model="from.remarks"
              style="width:50%;"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFrom(from)">{{
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
    // 手机号码验证
    const validatePhone = (rule, value, callback) => {
      const patter = new RegExp(
        '^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$'
      )
      if (!patter.test(value)) {
        return callback(new Error('请输入正确格式的手机号！'))
      } else {
        callback() // 必须有此项回调，否则验证会一直不通过
      }
    }
    //邮箱验证
    const validateEmail = (rule, value, callback) => {
      const mailbox = new RegExp(
        '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$'
      )
      if (!mailbox.test(value)) {
        return callback(new Error('请输入正确格式的邮箱！'))
      } else {
        callback()
      }
    }
    return {
      headers: { token: sessionStorage.getItem('token') },
      from: {
        name: '',
        tel: '',
        wechat: '',
        photo: '',
        address: '',
        email: '',
        remarks: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
        ],
        tel: [
          {
            // 手机号
            required: true,
            message: '手机号不能为空',
          },
          {
            validator: validatePhone,
            trigger: 'blur',
          },
        ],
        wechat: [
          { required: true, message: '请输入微信号', trigger: 'blur' },
          {
            min: 5,
            max: 15,
            message: '长度在 5 到 15 个字符',
            trigger: 'blur',
          },
        ],
        email: [
          {
            // 邮箱
            required: true,
            message: '邮箱不能为空',
          },
          {
            validator: validateEmail,
            trigger: 'blur',
          },
        ],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        photo: [{ required: true, message: '选择图片', trigger: 'blur' }],
        remarks: [{ required: true, message: '请输入备注', trigger: 'blur' }],
      },
      id: '',
    }
  },
  watch: {
    $route(to, from) {
      let self = this
      if (to.path == '/teacherAdd') {
        self.from = {
          name: '',
          tel: '',
          wechat: '',
          photo: '',
          address: '',
          email: '',
          remarks: '',
        }
      }
    },
  },
  created() {
    this.getModel()
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.from.photo = res.data
    },
    submitFrom(from) {
      this.$refs.from.validate((valid) => {
        if (valid) {
          let that = this
          that.$http.post('/api/teachers/add', from).then(
            (res) => {
              if (this.id == undefined) {
                console.log(res)
                that.from = {}
                that.$router.push({ path: '/teachers' })
                that.$message({
                  message: '添加成功',
                  type: 'success',
                })
              } else {
                console.log(res)
                that.from = {}
                that.$router.push({ path: '/teachers' })
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
    },
    getModel() {
      this.id = this.$route.query.id
      if (this.id == undefined) {
        return
      }
      let that = this
      that.$http.get('/api/teachers/get?id=' + this.id).then((res) => {
        that.from = res.data
      })
    },
  },
}
</script>
<style lang="scss">
.teachers_add {
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
  .from {
    width: 100%;
    height: 600px;

    .top {
      width: 100%;
      height: 90%;
      display: flex;

      .lefts {
        width: 50%;
        height: 100%;
      }
      .you {
        width: 50%;
        height: 100%;
      }
    }
  }
}
</style>
