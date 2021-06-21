<template>
  <div class="liaison">
    <div class="top">
      <div class="head"><p>联络信息</p></div>
      <div class="foot">
        <el-form style="display: flex;">
          <el-input style="margin:0 20px;" placeholder="关键字"></el-input>
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
      style="width:95%;margin:0 auto;"
      v-loading="loading"
    >
      <el-table-column prop="remarks" label="机构名称"> </el-table-column>
      <el-table-column prop="linkman" label="联系人"> </el-table-column>
      <el-table-column prop="tel" label="联系方式"> </el-table-column>
      <el-table-column prop="wechat" label="微信号"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="latitude" label="经度"> </el-table-column>
      <el-table-column prop="longitude" label="纬度"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" @click="updata([scope.row])" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑联络信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="机构名称">
          <el-input style="width:300px" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input style="width:300px" v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input style="width:300px" v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input style="width:300px" v-model="form.wechat"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input style="width:300px" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input style="width:300px" v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="经度">
          <el-col :span="11">
            <el-input style="width:100px" v-model="form.latitude"></el-input>
          </el-col>
          <el-col class="line" :span="2">纬度</el-col>
          <el-col :span="11">
            <el-input style="width:100px" v-model="form.longitude"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {},
      loading: true,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    updataAdd() {
      this.$http.post('/api/contact/update', this.form).then((res) => {
        console.log(res)
        this.dialogVisible = false
      })
    },
    updata(row) {
      console.log(row)
      this.form = row[0]
      console.log(this.form)
      this.dialogVisible = true
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
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
      that.$http.get('/api/contact/get', {}).then((res) => {
        console.log(res)

        that.tableData.push(res.data)
        that.loading = false
      })
    },
  },
}
</script>

<style lang="scss">
.liaison {
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
