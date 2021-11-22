<template>
  <div class="register">
    <section class="form-container">
      <div class="title">用户注册</div>
      <el-form
        :model="userInfo"
        :rules="rules"
        ref="registerForm"
        label-width="100px"
        class="register-form"
        label-position="left"
      >
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="userInfo.userEmail"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="userInfo.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
          <el-input
            type="password"
            v-model="userInfo.userPassword"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="userPasswordConfirm">
          <el-input
            type="password"
            v-model="userInfo.userPasswordConfirm"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>

        <el-form-item label="选择身份">
          <el-select v-model="userInfo.identity" placeholder="选择身份">
            <el-option label="管理员" value="manager"> </el-option>
            <el-option label="员工" value="employee"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="submit-btn"
            @click="submitForm('registerForm')"
            >注册</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  data() {
    const upcValidator = (rule, value, callback) => {
      if (value !== this.userInfo.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userInfo: {
        userEmail: "",
        userName: "",
        userPassword: "",
        userPasswordConfirm: "",
        identity: "",
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
        userName: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
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
        userPasswordConfirm: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur",
          },
          { validator: upcValidator, trigger: "blur" },
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
            .post("/api/users/register", this.userInfo)
            .then((res) => {
              console.log(res);
              this.$router.push("/login");
            })
            .catch((err) => {
              console.log(err);
            });
          
        }
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.register {
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
    width: 500px;
    height: 500px;
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
    .register-form {
      display: flex;
      flex-direction: column;
      padding: 0 30px 0 30px;
      .submit-btn {
        width: 100%;
      }
    }
  }
}
</style>