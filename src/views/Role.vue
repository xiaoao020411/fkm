<template>
  <div class="role">
    <div class="head">
      <p>角色管理</p>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        style="width: 50%;margin:0 auto;"
        v-loading="loading"
      >
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>

        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      loading: true,
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http.get('/api/administratorrole/list', {}).then((res) => {
        console.log(res)
        this.tableData = res.data.list
        this.loading = false
      })
    },
    updata(id) {
      console.log(String(id))
      const ids = String(id)

      this.$router.push({ path: '/adminRoleAdd', query: { ids } })
    },
  },
}
</script>

<style lang="scss">
.role {
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
  .table {
    margin: 0 auto;
  }
}
</style>
