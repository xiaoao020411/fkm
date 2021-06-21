<template>
  <div class="activity">
    <div class="top">
      <div class="head"><p>新手指南</p></div>
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
      psize: 10,
      total: 0,
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

    getData() {
      let that = this
      that.$http
        .get('/api/records/list?typeid=7', {
          page: that.page,
          psize: that.psize,
        })
        .then((res) => {
          console.log(res)
          that.tableData = res.data.list
          that.total = res.data.counts
        })
    },
    submit() {
      let that = this
      that.$http
        .get('/api/records/list?typeid=7', {
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
.activity {
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
