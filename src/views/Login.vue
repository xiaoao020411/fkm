<template>
  <div class="login">
    <div class="block"></div>
    <div class="login_add">
      <div class="top">
        <img src="../assets/logo.png" style="width:74px;height:71px;" alt="" />
      </div>
      <div class="bottom">
        <h2>密码登陆</h2>
        <el-form label-width="100px">
          <input type="text" v-model="model.username" placeholder="邮箱/账号" />
          <input type="password" v-model="model.pass" placeholder="密码" />
          <div>
            <p>还没有账号？<a href="#">立即注册</a></p>
            <a href="#">忘记密码</a>
          </div>
          <button @click="login()">登陆</button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username: '',
        pass: '',
      },
    }
  },
  methods: {
    login() {
      let that = this
      that.$http.post('/api/admin/checklogin', that.model).then(
        (res) => {
          console.log(res)
          localStorage.setItem('menu', JSON.stringify(res.data.menu))
          localStorage.setItem('token', res.data.token)
          console.log(localStorage.getItem('token'))
          that.$router.push({
            path: '/',
          })
          that.$message({
            message: '恭喜你，登陆成功',
            type: 'success',
          })
        },
        (fail) => {
          if (that.model.username == '') {
            that.$message.error('账号不能为空')
            return
          }
          if (that.model.pass == '') {
            that.$message.error('密码不能为空')
            return
          }
          console.log(fail)
          that.$message.error('账号或者密码不正确')
        }
      )
    },
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;

  .block {
    width: 100%;
    height: 100%;
    background: url(../assets/login-bg.jpg) no-repeat;
    background-size: 100% 100%;
    opacity: 0.4;
    position: relative;
  }
  .login_add {
    width: 507px;
    height: 615px;

    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -253.5px;

    .top {
      width: 100%;
      height: 159px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
    .bottom {
      width: 100%;
      height: 456px;
      background-color: white;
      border-radius: 10px;
      position: relative;

      h2 {
        width: 412px;
        height: 22px;
        font-size: 20px;
        position: absolute;
        left: 50%;
        top: 54px;
        margin-left: -206px;
      }
      input:nth-child(1) {
        width: 412px;
        height: 50px;
        border-radius: 5px;
        border: 1px solid #ccc;
        position: absolute;
        left: 50%;
        top: 125px;
        margin-left: -206px;
        padding-left: 10px;
      }
      input:nth-child(2) {
        width: 412px;
        height: 50px;
        border-radius: 5px;
        border: 1px solid #ccc;
        position: absolute;
        left: 50%;
        top: 202px;
        margin-left: -206px;
        padding-left: 10px;
      }
      div {
        width: 412px;
        font-size: 14px;
        height: 16px;
        position: absolute;
        left: 50%;
        bottom: 174px;
        margin-left: -206px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        a {
          text-decoration: none;
        }
        a:nth-child(1) {
          color: #ff6666;
        }
        a:nth-child(2) {
          color: #000;
        }
      }
      button {
        width: 412px;
        height: 54px;
        border-radius: 30px;
        background-color: #ff6666;
        border: 1px solid #ff6666;
        position: absolute;
        left: 50%;
        margin-left: -206px;
        bottom: 58px;
        border: 1px solid #fff;
        outline-style: none;
        cursor: pointer;
      }
    }
  }
}
</style>
