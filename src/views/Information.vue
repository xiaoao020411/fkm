<template>
  <div class="information">
    <div class="top">
      <div class="head"><p>课程管理</p></div>
      <div class="foot">
        <el-form label-width="100%" style="display: flex;">
          <el-form-item label="老师">
            <el-select
              v-model="from.teachers"
              style="width: 200px;"
              placeholder="请选择老师"
            >
              <el-option
                v-for="(item, index) in teachers"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left:60px;" label="状态">
            <el-select
              v-model="value"
              style="width: 200px; "
              placeholder="请选择活动区域"
            >
              <el-option label="区域一" value="0"></el-option>
              <el-option label="区域二" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-input
            style="width:200px;margin-left:250px;"
            placeholder="关键字"
          ></el-input>
          <el-form-item>
            <el-button type="primary">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <el-table
      :data="tableData"
      :cell-style="rowClass"
      :header-cell-style="headClass"
      text-align="center"
      style="width:95%;margin:0 auto;"
      v-loading="loading"
    >
      <el-table-column prop="photo" label="图片" width="50">
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
      <el-table-column prop="name" label="课程名称" width="80">
      </el-table-column>
      <el-table-column prop="teachername" label="老师" width="80">
      </el-table-column>
      <el-table-column prop="courseStartTime" label="上课时间" width="180">
      </el-table-column>
      <el-table-column prop="levelid" label="课程难度" width="80">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="100">
      </el-table-column>
      <el-table-column prop="classRoom" label="教室" width="100">
      </el-table-column>
      <el-table-column prop="price" label="价格" width="60"> </el-table-column>
      <el-table-column prop="students" label="学生人数" width="80">
      </el-table-column>
      <el-table-column prop="info" label="课程介绍" width="auto">
      </el-table-column>
      <el-table-column label="操作" width="100">
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
      dialogVisible: false,
      channel: '',
      tableData: [],
      value: '',
      from: {
        teachers: '',
      },
      teachers: '',
      page: 1,
      psize: 10,
      total: 0,
      loading: true,
    }
  },
  created() {
    this.getData()
    this.teacherslist()
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
    getData() {
      let that = this

      that.$http
        .get('/api/courses/list', { page: this.page, psize: this.psize })
        .then((res) => {
          console.log(res)
          that.tableData = res.data.list
          that.total = res.data.counts
          that.loading = false
        })
    },
    teacherslist() {
      let that = this
      that.$http
        .get('/api/teachers/list', { psize: this.psize })
        .then((res) => {
          // console.log(res)
          this.teachers = res.data.list
        })
    },
    updata(id) {
      // console.log(row)

      this.$router.push({ path: '/coursesadd', query: { id } })
    },
    del(id) {
      let that = this
      that.$http.get('/api/courses/delete?id=' + id).then((res) => {
        console.log(res)
        that.getData()
        this.$message({
          message: '删除成功',
          type: 'success',
        })
      })
    },
  },
}
</script>

<style lang="scss">
.information {
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
