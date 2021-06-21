<template>
  <div class="commodity">
    <div class="top">
      <div class="head"><p>商品管理</p></div>
      <div class="foot">
        <el-form style="display: flex;">
          <el-input
            style="margin:0 20px;"
            v-model="form.name"
            placeholder="关键字"
          ></el-input>
          <el-form-item>
            <el-button type="primary" @click="onSubmit()">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      :data="tableData"
      style="width:95%;margin:0 auto;"
      v-loading="loading"
    >
      <el-table-column prop="photo" label="图片">
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
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="comment" label="描述"> </el-table-column>
      <el-table-column prop="catid" label="分类"> </el-table-column>
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
      form: {
        name: '',
      },
      page: 1,
      psize: 10,
      total: 0,
      loading: true,
    }
  },
  created() {
    this.getData()
  },
  methods: {
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
    updata(id) {
      // console.log(row)

      this.$router.push({ path: '/productAdd', query: { id } })
    },
    getData() {
      let that = this
      that.$http
        .get('/api/product/list', { page: this.page, psize: this.psize })
        .then((res) => {
          console.log(res)
          this.tableData = res.data.list
          this.total = res.data.counts
          this.loading = false
        })
    },
    del(id) {
      this.$http.get('/api/product/delete?id=' + id).then((res) => {
        console.log(res)
        this.getData()
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      })
    },
    onSubmit() {
      this.$http
        .get('/api/product/list', { key: this.form.name })
        .then((res) => {
          console.log(res)
          this.tableData = res.data.list
        })
    },
  },
}
</script>

<style lang="scss">
.commodity {
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
