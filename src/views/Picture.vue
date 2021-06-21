<template>
  <div class="picture">
    <div class="top">
      <div class="head"><p>图片管理</p></div>
      <div class="foot">
        <el-form style="width:100%;display:flex;">
          <el-input
            style="width:222px;margin:0 20px;"
            placeholder="关键字"
            v-model="from.title"
          ></el-input>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
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
      <el-table-column prop="picture" label="图片" width="150">
        <template slot-scope="scope">
          <div>
            <img
              :src="$config.baseimg + scope.row.picture"
              width="30px"
              height="30px"
              alt=""
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="url" label="链接地址"> </el-table-column>

      <el-table-column prop="enabled" label="是否显示">
        <template slot-scope="scope">
          <span>{{ scope.row.enabled == 1 ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="deleteData([scope.row.id])"
          >
            移除
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="uploadData([scope.row.id])"
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
      headers: { token: localStorage.getItem('token') },
      channel: '',
      tableData: [],
      loading: true,
      dialogVisible: false,
      psize: 10,
      page: 1,
      total: 0,
      loading: true,
      from: {
        title: '',
      },
      typeid: [],
    }
  },
  created() {
    this.loading = true
    this.getData()
    this.getlist()
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
    uploadData(id) {
      this.$router.push({ path: '/pictureAdd', query: { id } })
    },

    getlist() {
      let that = this
      that.$http.get('/api/adtype/list').then(
        (res) => {
          // console.log(res)
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

    getData() {
      let that = this
      that.$http
        .get('/api/advertisement/list', { page: this.page, psize: this.psize })
        .then(
          (res) => {
            console.log(res)
            that.tableData = res.data.list
            that.total = res.data.counts
            that.loading = false
          },
          (fail) => {
            console.log(fail)
          }
        )
    },
    deleteData(id) {
      let that = this
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          that.$http.get('/api/advertisement/delete?id=' + id).then(
            (res) => {
              console.log(res)
              this.getData()
            },
            (fail) => {
              console.log(fail)
            }
          )
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
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
    onSubmit() {
      let that = this
      that.$http
        .get('/api/advertisement/list', { key: that.from.title })
        .then((res) => {
          console.log(res)
          that.tableData = res.data.list
        })
    },
  },
}
</script>

<style lang="scss">
.picture {
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
