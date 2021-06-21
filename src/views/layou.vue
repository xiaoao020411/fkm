<template>
  <div class="loyou">
    <div v-for="(item, index) in list" :key="index">
      <li>{{ item.username }}</li>
      <li>{{ item.tel }}</li>
      <li>{{ item.typeName }}</li>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let that = this
      that.$http.get('/api/admin/list', {}).then(
        (res) => {
          that.list = res.data.list
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
    }
  },
}
</script>
