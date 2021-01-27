<template>
  <section>
    <h4 class="title">
      物料空间列表
      <i class="el-icon-plus add" @click="dialogVisible = true"></i>
    </h4>
    <el-dialog title="添加物料空间" :visible.sync="dialogVisible" width="40%">
      <el-form ref="createBucket" :model="form" size="small">
        <el-form-item
          label="物料空间名称"
          prop="title"
          :rules="{
            required: true,
            message: '物料空间名称为空',
            trigger: 'blur',
          }"
        >
          <el-input
            v-model="form.title"
            placeholder="请输入物料空间名称"
          ></el-input>
        </el-form-item>
       <el-form-item
          label="描述"
          prop="description"
        >
          <el-input
            v-model="form.description"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
       <el-form-item
          label="排序"
          prop="sort"
           :rules="{ type: 'number', message: '必须为数字值'}"
        >
          <el-input
            v-model.number="form.sort"
            placeholder="请输入排序，数字越小越靠前"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancel('createBucket')">取 消</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="submitForm('createBucket')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        title: "",
        description: "",
        sort:1
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("CreateBucket", this.form)
            .then((it) => {
              if (it) {
                this.$message.success("添加成功");
                this.cancel("createBucket");
              }
            })
            .catch(() => {
              this.$message.error("添加失败");
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel(formName) {
      this.resetForm(formName);
      this.dialogVisible = false;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title {
  font-weight: normal;
  font-size: 14px;
  padding:14px 5px 16px 20px;
  // padding-bottom: 16px;
      border-bottom: 1px solid #EBEEF5;
  background: #ecf5ff;
  color: #409eff;
  font-weight: bold;
  overflow: hidden;
  .add {
    float: right;
    background: #409eff;
    border-radius: 100%;
    padding: 2px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
