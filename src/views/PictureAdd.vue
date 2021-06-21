<template>
  <div class="picture_add">
    <div class="head">
      <p>{{ id == undefined ? '图片添加' : '图片编辑' }}</p>
    </div>
    <div class="from">
      <el-form :model="from" :rules="rules" ref="from" label-width="80px">
        <el-form-item prop="typeid" label="所在位置">
          <el-select v-model="from.typeid" placeholder="请选择所在位置">
            <el-option
              v-for="(item, index) in typeid"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="图片标题">
          <el-input v-model="from.title" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item prop="picture" label="图片">
          <el-upload
            :headers="headers"
            class="upload-demo"
            action="/api/upload/add"
            :on-success="handleAvatarSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <img
              v-if="from.picture"
              style="width:100px;height:100px;"
              :src="$config.baseimg + from.picture"
              alt=""
            />
          </el-upload>
        </el-form-item>
        <el-form-item prop="url" label="链接地址">
          <el-input v-model="from.url" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="排序">
          <el-input v-model="from.sort" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item prop="enabled" label="是否显示">
          <el-radio-group v-model="from.enabled">
            <el-radio value="1" label="1">是</el-radio>
            <el-radio value="2" label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fromadd(from)">{{
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
    return {
      headers: { token: localStorage.getItem('token') },
      from: {
        title: '',
        picture: '',
        sort: '',
        typeid: '',
        url: '',
        enabled: '',
      },
      rules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
        ],
        picture: [{ required: true, message: '选择图片', trigger: 'blur' }],
        sort: [
          { required: true, message: '输入排序', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '请输入链接地址', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur',
          },
        ],
        typeid: [
          {
            required: true,
            message: '请选择所在位置',
            trigger: 'change',
          },
        ],
      },
      typeid: [],
      id: '',
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      let self = this
      if (to.path == '/pictureAdd') {
        self.from = {
          title: '',
          picture: '',
          sort: '',
          typeid: '',
          url: '',
          enabled: '',
        }
      }
    },
  },
  created() {
    this.getData()
    this.getModel()
  },
  methods: {
    getModel() {
      this.id = this.$route.query.id
      if (this.id == undefined) {
        return
      }
      let that = this
      that.$http.get('/api/advertisement/get?id=' + this.id).then((res) => {
        that.from = res.data
      })
    },
    getData() {
      let that = this
      that.$http.get('/api/adtype/list').then(
        (res) => {
          console.log(res)
          this.typeid = res.data.list
        },
        (fail) => {
          console.log(fail)
        }
      )
    },
    handleAvatarSuccess(res, file) {
      this.from.picture = res.data
      console.log(file)
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    fromadd(from) {
      this.$refs.from.validate((valid) => {
        if (valid) {
          let that = this
          that.$http.post('/api/advertisement/add', that.from).then(
            (res) => {
              if (that.id == undefined) {
                console.log(res)
                that.from = {}
                that.$router.push({
                  path: '/muke/picture',
                })
                that.$message({
                  message: '添加成功',
                  type: 'success',
                })
              } else {
                console.log(res)
                that.from = {}
                that.$router.push({
                  path: '/muke/picture',
                })
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
.picture_add {
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
    width: 50%;
    height: 100%;
    margin: 20px auto;
  }
}
</style>
