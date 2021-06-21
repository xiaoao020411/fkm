<template>
  <div class="role_add">
    <div class="head">
      <p>{{ this.id == undefined ? '角色添加' : '角色编辑' }}</p>
    </div>
    <div class="form">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input style="width:300px;" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in menuList"
          :key="index"
          prop="username"
          v-if="item.pid == 0"
          :label="item.name"
        >
          <el-checkbox-group v-model="checkValue">
            <el-checkbox
              :label="subItem.id"
              @change="handleCheckAllChange"
              v-for="(subItem, subIndex) in menuList"
              :key="subIndex"
              v-if="subItem.pid == item.id"
              >{{ subItem.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>

        <el-button style="margin-left:40%;" @click="submit">{{
          this.id == undefined ? '添加' : '编辑'
        }}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: 0,
        name: '',
        menus: [],
      },
      menuList: [],
      checkValue: [],
      id: '',
      page: 1000,
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      let self = this
      if (to.path == '/administratorAdd') {
        self.form = {
          id: 0,
          name: '',
          menus: [],
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
      this.id = this.$route.query.ids
      if (this.id == undefined) {
        return
      }
      this.$http.get('/api/administratorrole/get?id=' + this.id).then((res) => {
        console.log(res)
        this.form = res.data
        this.form.menus.forEach((item, index) => {
          if (item.checked > 0) {
            this.checkValue.push(item.id)
          }
        })
        // this.menu1List = res.data.list
      })
    },
    handleCheckAllChange(value) {
      this.form.menus = []
      this.checkValue.forEach((item, key) => {
        this.form.menus.push({ id: item })
      })
      // console.log(this.form.menus)
    },
    getData() {
      this.$http.get('/api/menu/list?psize=' + this.page).then((res) => {
        // console.log(res)
        this.menuList = res.data.list
      })
    },
    submit() {
      // console.log(this.form)

      this.$http.post('/api/administratorrole/add', this.form).then((res) => {
        console.log(res)
        this.form = {}
        this.$router.push({ path: '/adminRole' })
      })
    },
  },
}
</script>

<style lang="scss">
.role_add {
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
    width: 100%;
    height: 100%;

    margin: 0 auto;
  }
}
</style>
