<template>
  <div class="header">
    <h1 class="logo">
      <img :src="logo" alt="logo" />
    </h1>
    <el-popover placement="right" width="200" v-model="visible" @show="ruleForm=token">
      <el-form ref="updateUser" :model="ruleForm" size="mini" :rules="rules" class="mini-form">
        <el-form-item label="用户名" >
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
            prop="username"
            :rules="{
              required: true,
              message: '用户名不能为空',
              trigger: 'blur',
            }"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="call" >
          <el-input
            v-model="ruleForm.call"
            placeholder="请输入联系方式"
            :rules="{
              required: true,
              message: '联系方式不能为空',
              trigger: 'blur',
            }"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px; margin-bottom: 0px"
          ><el-button size="mini" type="text" @click="visible = false"
            >取消</el-button
          >
          <el-button type="success" size="mini" @click.stop="submitForm"
            >修改</el-button
          >
        </el-form-item>
      </el-form>
      <el-button type="text" class="user-info" slot="reference">{{
        token.username
      }}</el-button>
    </el-popover>
    <p class="quit" @click="quit">
      <img :src="quite" alt="quit" />
    </p>
    <div class="addimg">
      <NewMaterial></NewMaterial>
      <RuleManage v-if="token.role>6"></RuleManage>
    </div>
  </div>
</template>

<script>
import NewMaterial from "@/components/NewMaterial";
import { mapGetters } from "vuex";
import RuleManage from "@/components/RuleManage";
import { logo_white, quite } from "@/assets/image.js";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.updateUser.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logo: logo_white,
      quite: quite,
      visible: false,
      ruleForm:{
        username:'',
        password:'',
        checkPass:'',
        objectId:'',
        call:''
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    quit() {
      this.$store.dispatch("RemoveToken");
      this.$electron.ipcRenderer.send("switchToLogin");
    },
    submitForm() {
      console.log(this.token)
      this.$refs["updateUser"].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("UpdateToken", this.ruleForm)
            .then((it) => {
              if (it.updatedAt) {
                this.$message.success("修改成功");
                this.token.checkPass=""
                this.visible=false
              }
              else{
                 this.$message(it);
              }
            })
            .catch((err) => {
              if(err.code==202)
              this.$message.error("修改失败,用户名已存在");
              else
              this.$message.error("修改失败，"+err.message);
            });
        } else {
          return false;
        }
      });
    },
  },
  components: {
    NewMaterial,
    RuleManage,
  },
  watch: {},
  computed: {
    ...mapGetters(["token"]),
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  .logo {
    width: 45px;
    // margin: 15px;
    img {
      width: 100%;
      height: auto;
      vertical-align: top;
      margin-top: 8px;
    }
  }
  .user-info {
    color: white;
    margin: 10px 0 0 0px;
    font-size: 16px;
    font-weight: bold;
    width: 130px;
  }
  .quit {
    position: absolute;
    // bottom: 25px;
    right: 20px;
    width: 18px;
    margin-top: 5px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .addimg {
    position: absolute;
    margin-top: 5px;
    display: flex;
    align-items: center;
    left: 200px;
    // bottom: 20px;
    // font-size: 12px;
    // line-height: 22px;
  }
}
</style>
