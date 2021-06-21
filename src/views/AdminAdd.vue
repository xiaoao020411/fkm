<template>
  <div class="admin_add">
    <div class="head">
      <p>{{ id == undefined ? '管理员添加' : '管理员编辑' }}</p>
    </div>
    <div class="from">
      <el-form :model="from" :rules="rules" ref="from" label-width="80px">
        <el-form-item label-width="100px" prop="username" label="管理员名称">
          <el-input v-model="from.username" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" prop="pass" label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="from.pass"
            style="width:300px;"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label-width="100px" prop="name" label="名字">
          <el-input v-model="from.name" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" prop="tel" label="电话">
          <el-input v-model="from.tel" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label-width="100px" prop="typeid" label="角色">
          <el-select v-model="from.typeid" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in typeid"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fromadd('from')">{{
            id == undefined ? '添加' : '编辑'
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        let reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      from: {
        username: '',
        pass: '',
        name: '',
        tel: '',
        typeid: '',
      },
      typeid: [],
      rules: {
        username: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
        ],
        pass: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' },
        ],
        tel: [
          {
            validator: checkPhone,
            trigger: 'blur',
          },
        ],
        typeid: [
          {
            required: true,
            message: '请选择是否是超级管理员',
            trigger: 'change',
          },
        ],
      },
      id: '',
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      let self = this
      if (to.path == '/administratorAdd') {
        self.from = {
          username: '',
          pass: '',
          name: '',
          tel: '',
          typeid: '',
        }
      }
    },
  },
  created() {
    this.getModel()
    this.role()
  },
  methods: {
    getModel() {
      this.id = this.$route.query.id
      if (this.id == undefined) {
        return
      }
      let that = this
      that.$http.get('/api/admin/get?id=' + this.id).then((res) => {
        that.from = res.data
      })
    },
    //角色接口
    role() {
      this.$http.get('/api/administratorrole/list').then((res) => {
        console.log(res)
        this.typeid = res.data.list
      })
    },
    fromadd(from) {
      this.$refs[from].validate((valid) => {
        if (valid) {
          let that = this
          that.$http.post('/api/admin/add', that.from).then(
            (res) => {
              if (that.id == undefined) {
                console.log(res)
                that.from = {}
                that.$router.push({ path: '/muke/admin' })
                that.$message({
                  message: '添加成功',
                  type: 'success',
                })
              } else {
                console.log(res)
                that.from = {}
                that.$router.push({ path: '/muke/admin' })
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
  },
}
</script>

<style lang="scss">
.admin_add {
  width: 100%;
  height: 584px;
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
    width: 50%;
    height: 100%;
    margin: 20px auto;
  }
}
</style>
