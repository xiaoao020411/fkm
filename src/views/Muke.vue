<template>
  <div class="muke">
    <div class="left">
      <div class="img">
        <img
          src="../assets/logo.png"
          style="background-color:#000;"
          :style="{ width: isCollapse ? '40px' : '88px' }"
          alt=""
        />
        <p>展校科技</p>
      </div>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        style="border-right:none;"
        :unique-opened="true"
        router
      >
        <el-submenu
          v-for="(item, index) in menuList"
          :key="index"
          v-if="item.pid == 0"
          :index="index + ''"
        >
          <template slot="title">
            <i class="iconfont" :class="item.ico"></i>
            <span slot="title" style="margin-left:5px;">{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(sub, sindex) in menuList"
            :key="sindex"
            v-if="sub.pid == item.id"
            :index="sub.url"
            >{{ sub.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </div>
    <div class="right" :class="{ collapse: isCollapse }">
      <div class="header">
        <div
          style="width:50px;height:50px;display:flex;align-items: center;
  justify-content: center;"
          @click="clickisshow"
          :class="[
            isCollapse ? 'iconfont icon-shouqi' : 'iconfont icon-zhankai',
          ]"
        ></div>
        <div class="head_right">
          <img src="../assets/logo.png" style="background-color:#000;" alt="" />
          <p>展校科技-办学系统</p>
          <button @click="loginOut">退出登陆</button>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: { token: sessionStorage.getItem('token') },
      isCollapse: false,
      menuList: [],
    }
  },
  created() {
    this.menuList = JSON.parse(sessionStorage.getItem('menu'))
    console.log(sessionStorage.getItem())
  },
  methods: {
    loginOut() {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    clickisshow() {
      if (this.isCollapse == false) {
        this.isCollapse = true
      } else {
        this.isCollapse = false
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="scss">
.muke {
  display: flex;

  .left {
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    width: auto;

    .img {
      width: 100%;
      height: 200px;
      display: flex;

      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 88px;
        height: auto;
        border-radius: 10px;
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
      }
    }
    .el-menu-item:hover {
      outline: 0 !important;
      color: #ff8923 !important;
      background: none !important;
      border-right: 2px solid #ff8923 !important;
      box-sizing: border-box;
    }
    .el-menu-item.is-active {
      color: #ff8923 !important;
    }
    //鼠标悬浮时，主菜单的样式
    .el-submenu__title:focus,
    .el-submenu__title:hover {
      outline: 0 !important;
      color: #ff8923 !important;
      background: none !important;
    }
    .el-menu--horizontal:focus,
    .el-menu--horizontal:hover {
      outline: 0 !important;
      color: #ff8923 !important;
      background: none !important;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-width: 200px;
      min-height: 400px;
    }
  }
  .right {
    position: absolute;
    top: 0;
    left: 200px;
    bottom: 0;
    right: 0;

    flex: 1;
    height: 100%;

    background-color: #f9f9f9;

    .main {
      width: 95%;

      background-color: red;
      margin: 0 auto;
      background-color: #fff;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      position: relative;
      top: 64px;
      left: 0;
    }
    .header {
      width: 100%;
      height: 64px;
      position: absolute;
      top: 0;
      left: 0;

      border: 1px solid #f9f9f9;
      border-top: none;
      border-right: none;
      box-sizing: border-box;
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .clickisshow {
        color: red;
        &.on {
          color: blue;
        }
      }
      .head_right {
        width: 300px;
        height: 100%;
        display: flex;
        align-items: center;
        button {
          margin-left: 20px;
        }
        img {
          width: 35px;
          height: 35px;
          border-radius: 15px;
          margin-right: 13px;
        }
        p {
          font-size: 16px;
          color: #333333;
        }
      }
    }
  }
  .right.collapse {
    left: 60px;
  }
}
</style>
