<template>
  <div class="teachers">
    <div class="top">
      <div class="head"><p>师资管理</p></div>
      <div class="foot">
        <el-form style="display: flex;">
          <el-input
            style="margin:0 20px;"
            v-model="from.name"
            placeholder="搜索姓名"
          ></el-input>
          <el-form-item>
            <el-button type="primary" @click="submitFrom">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      :data="tableData"
      :cell-style="rowClass"
      :header-cell-style="headClass"
      style="width:95%;margin:0 auto;"
      v-loading="loading"
    >
      <el-table-column prop="photo" label="图片" width="150">
        <template slot-scope="scope">
          <div>
            <img
              :src="$config.baseimg + scope.row.photo"
              width="30px"
              height="30px"
              alt=""
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="tel" label="电话"> </el-table-column>
      <el-table-column prop="wechat" label="微信号"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="remarks" label="备注"> </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="del([scope.row.id])">
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
  data() {
    return {
      tableData: [],
      page: 1,
      psize: 8,
      total: 0,
      loading: true,
      from: {
        name: '',
      },
      dialogVisible: false,
      headers: { token: localStorage.getItem('token') },
    }
  },
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
        .get('/api/teachers/list', { key: that.from.name })
        .then((res) => {
          console.log(res)
          that.tableData = res.data.list
        })
    },
    handleAvatarSuccess(res, file) {
      // console.log(res)
      // this.imageUrl = URL.createObjectURL(file.raw)
      this.from.photo = res.data
    },
    updata(id) {
      this.$router.push({ path: '/teacherAdd', query: { id } })
    },
    del(id) {
      console.log(id)
      let that = this
      that.$http.get('/api/teachers/delete?id=' + id).then((res) => {
        // console.log(res)
        that.getData()
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success',
        })
      })
    },
    getData() {
      let that = this
      that.$http
        .get('/api/teachers/list', { page: this.page, psize: this.psize })
        .then(
          (res) => {
            // console.log(res)
            that.tableData = res.data.list
            that.total = res.data.counts
            that.loading = false
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
    handleClick(row) {
      console.log(row)
    },
  },
}
</script>

<style lang="scss">
.teachers {
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
  .from {
    width: 80%;
    height: 100%;
    margin: 20px auto;

    .top {
      width: 100%;
      height: 100%;
      margin: 20px auto;
      display: flex;
      .left {
        width: 50%;
        height: 100%;
      }
      .right {
        width: 50%;
        height: 100%;
        background-color: white;
        div {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          p {
            margin-top: 10px;

            margin-left: 40px;
          }
        }
      }
    }
  }
}
</style>
