<template>
  <div class="honor">
    <div class="top">
      <div class="head">
        <div v-if="typeid == 1">
          <p>作品信息</p>
        </div>
        <div v-else-if="typeid == 2">
          <p>活动信息</p>
        </div>
        <div v-else-if="typeid == 3">
          <p>赛事信息</p>
        </div>
        <div v-else-if="typeid == 4">
          <p>考级信息</p>
        </div>
        <div v-else>
          <p>荣誉信息</p>
        </div>
      </div>
      <div class="foot">
        <el-form style="display: flex;">
          <el-input
            style="margin:0 20px;"
            v-model="form.title"
            placeholder="关键字"
          ></el-input>
          <el-form-item>
            <el-button type="primary" @click="submit">搜索</el-button>
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
      <el-table-column prop="photo" label="描述">
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
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="comment" label="描述"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
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
      typeid: this.$route.params.typeid,
      tableData: [],
      page: 1,
      psize: 10,
      total: 0,
      loading: true,
      form: {
        title: '',
      },
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
    updata(id) {
      this.$router.push({
        path: '/muke/memorabiliaAdd/' + this.$route.params.typeid,
        query: { id },
      })
    },
    del(id) {
      let that = this
      that.$http.get('/api/records/delete?id=' + id).then((res) => {
        console.log(res)
        that.getData()
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      })
    },
    getData() {
      let that = this
      that.$http
        .get('/api/records/list?typeid=' + this.$route.params.typeid, {
          page: that.page,
          psize: that.psize,
        })
        .then((res) => {
          that.tableData = res.data.list
          that.total = res.data.counts
          that.loading = false
        })
    },
    submit() {
      let that = this
      that.$http
        .get('/api/records/list?typeid=5', {
          key: this.form.title,
          page: that.page,
          psize: that.psize,
        })
        .then((res) => {
          that.tableData = res.data.list
          that.total = res.data.counts
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
  },
}
</script>

<style lang="scss">
.honor {
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
