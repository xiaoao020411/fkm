<template>
  <div class="admin">
    <div class="top">
      <div class="head"><p>管理员管理</p></div>
      <div class="foot">
        <el-form style="display: flex; ">
          <el-input
            style="margin: 0 20px;"
            v-model="from.username"
            placeholder="搜索登陆账号"
          ></el-input>
          <el-form-item>
            <el-button type="primary" @click="submitFrom">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      :data="list"
      :cell-style="rowClass"
      :header-cell-style="headClass"
      style="width:95%;margin:0 auto;"
      v-loading="loading"
    >
      <el-table-column prop="username" label="登陆账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="tel" label="联系电话"> </el-table-column>
      <el-table-column prop="pass" label="密码"> </el-table-column>
      <el-table-column prop="typeName" label="账号类型"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow([scope.row.id])"
            type="text"
            size="small"
          >
            移除
          </el-button>
          <el-button type="text" size="small" @click="updata([scope.row.id])"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      style="display: flex;
  align-items: center;
  justify-content: center;margin-top:10px;"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getData()
  },
  methods: {
    // 表头样式设置
    headClass() {
      return 'text-align: center;background:rgb(242,242,242);color:rgb(140,138,140)'
    },
    // 表格样式设置
    rowClass() {
      return 'text-align: center;'
    },

    submitFrom() {
      let that = this
      that.$http
        .get('/api/admin/list', { key: that.from.username })
        .then((res) => {
          that.list = res.data.list
        })
    },
    updata(id) {
      this.$router.push({ path: '/administratorAdd', query: { id } })
    },
    getData() {
      let that = this
      that.$http
        .get('/api/admin/list', {
          page: this.page,
          psize: this.psize,
        })
        .then(
          (res) => {
            console.log(res)
            that.list = res.data.list
            that.total = res.data.counts
            this.loading = false
          },
          (fail) => {
            console.log(fail)
          }
        )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.psize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getData()
    },
    deleteRow(id) {
      let that = this
      that.$http.get('/api/admin/delete?id=' + id).then(
        (res) => {
          console.log(res)
          this.getData()
          this.$message({
            message: '删除成功',
            type: 'success',
          })
        },
        (fail) => {
          console.log(fail)
        }
      )
    },
  },

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      psize: 8,
      uniqueOpened: false,
      loading: true,
      from: {
        username: '',
      },
    }
  },
}
</script>

<style lang="scss">
.admin {
  width: 100%;
  height: 655px;
  overflow-y: auto;
  .top {
    width: 100%;
    height: 180px;
    background-color: white;
    .head {
      width: 100%;
      height: 50px;

      display: flex;
      align-items: center;
      p {
        margin-left: 20px;
      }
    }
    .foot {
      width: 100%;
      height: 130px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
