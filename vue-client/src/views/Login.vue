<template>
  <div class="login">
    <section class="form-container">
      <div class="title">用户登陆</div>
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="loginForm"
        label-width="80px"
        class="login-form"
        label-position="left"
      >
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userInfo.userEmail"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="userPassword">
          <el-input
            type="password"
            v-model="userInfo.userPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            @click="submitForm('loginForm')"
            >登陆</el-button
          >
        </el-form-item>

        <div class="tips">
          <span
            >没有账号？点击这里->
            <router-link to="/register">注册</router-link>
          </span>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import isEmpty from '../util'
export default {
  name: "Login",
  components: {},
  data() {
    return {
      userInfo: {
        userEmail: "",
        userPassword: "",
      },
      rules: {
        userEmail: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],

        userPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      // this.$refs['registerForm']
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.userInfo)
            .then((res) => {
              console.log(res);
              // 拿到token,放到localStorage
              const { token } = res.data;
              localStorage.setItem("userToken", token);
              // this.$axios.post('/api/users/profile',this.userInfo)
              // 解析token,存到vuex
              const decode = jwt_decode(token);
              console.log(decode );
              // 授权设置，如果decode为空，
              this.$store.dispatch('setIsAuthorized',!isEmpty(decode))
              this.$store.dispatch('setUser',decode)

              this.$router.push("/home");
            })
            .catch((err) => {
              console.log(err);
            });
          // 延迟500s才执行，不然第一次登陆路由守卫鉴权先于token存储，导致isLogin为false
          // setTimeout(() => {
          //   this.$router.push("/home");
          // }, 500);
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(97, 186, 255, 1) 0%,
    rgba(166, 239, 253, 1) 90.1%
  );
  .form-container {
    width: 400px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.18);
    .title {
      font-size: 24px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding: 20px;
    }
    .login-form {
      display: flex;
      flex-direction: column;
      padding: 0 30px 0 30px;
      .login-btn {
        width: 100%;
      }
    }
    .tips {
      display: flex;
      justify-content: right;
    }
  }
}
</style>