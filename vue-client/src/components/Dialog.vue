<template>
  <div class="dialog">
    <el-dialog :title="dialog.title" :visible.sync="dialog.show">
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="margin: 10px; width: auto"
        >
          <el-form-item label="收支类型:">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(acounttype, index) in acountType"
                :key="index"
                :label="acounttype"
                :value="acounttype"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="acountDescrition" label="收支描述:">
            <el-input
              type="acountDescrition"
              v-model="formData.acountDescrition"
            ></el-input>
          </el-form-item>

          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>

          <el-form-item prop="AcountCash" label="账户现金:">
            <el-input
              type="AcountCash"
              v-model="formData.AcountCash"
            ></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="btn-right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')"
              >提 交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Object,
      title:"",
      option:"edit"
    },
    formData:{
      type:Object
    }
  },
  name: "Dialog",
  data() {
    return {
     
      acountType: ["充值", "购物", "生活", "转账"],
      formRules: {
        acountDescrition: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" },
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" },
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" },
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }],
      },
    };
  },

  methods: {
    //   有个修饰符，sync忘记加了
    //   element本身提供的好像不生效，需要自己绑定一个事件
    //   closeDialog(){
    //       this.dialog.show=false
    //   }
    onSubmit(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
            const url =this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          this.$axios.post(`/api/acounts/${url}`, this.formData).then(() => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success",
            });
            this.dialog.show = true;
            this.$emit("update");
          });
        }
      });
    },
  },
};
</script>

<style>
.form {
  overflow: hidden;
}
.btn-right {
  float: right;
}
</style>