<template>
  <el-dialog
    title="编辑物料"
    :visible.sync="visible"
    @close="handleClose"
    class="upload"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
      <el-form-item label="基本信息" prop="title">
        <el-col :span="11">
          <el-input v-model="ruleForm.title" placeholder="名称"></el-input
        ></el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-input v-model="ruleForm.description" placeholder="备注"></el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="所属大类" prop="sort1">
        <el-radio-group
          v-model="ruleForm.sort1"
          size="small"
          @change="bigSelect"
        >
          <el-tooltip
            :content="item.description ? item.description : item.title"
            placement="top"
            :key="index"
            v-for="(item, index) in sort1"
          >
            <el-radio-button :label="index + 1">{{
              item.title
            }}</el-radio-button></el-tooltip
          >
        </el-radio-group>
      </el-form-item>

      <el-form-item label="所属中类" prop="sort2">
        <el-col
          v-if="sort_2.length == 0"
          :span="4"
          :class="[
            { 'ske-loading': !ruleForm.sort2.code },
            { 'code-tag': !ruleForm.sort2.code },
          ]"
          style="margin-left: 0px"
        >
          <span>😴</span>
        </el-col>
        <el-radio-group v-model="ruleForm.sort2" size="small" v-else>
          <el-tooltip
            :content="item.description ? item.description : item.title"
            placement="top"
            :key="index"
            v-for="(item, index) in sort_2"
          >
            <el-radio-button :label="index + 1">{{
              item.title
            }}</el-radio-button>
          </el-tooltip>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="颜色分类" prop="sort3">
        <el-radio-group v-model="ruleForm.sort3" size="small">
          <el-tooltip
            :content="item.description ? item.description : item.title"
            placement="top"
            :key="index"
            v-for="(item, index) in sort3"
          >
            <el-radio-button :label="index + 1">{{
              item.title
            }}</el-radio-button></el-tooltip
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主要材质" prop="sort4">
        <el-radio-group v-model="ruleForm.sort4" size="small">
          <el-tooltip
            :content="item.description ? item.description : item.title"
            placement="top"
            :key="index"
            v-for="(item, index) in sort4"
          >
            <el-radio-button :label="index + 1">{{
              item.title
            }}</el-radio-button></el-tooltip
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标识编码" prop="lastSort">
        <el-col :span="6">
          <el-input
            v-model="ruleForm.lastSort"
            placeholder="代表编码后四位"
          ></el-input
        ></el-col>

        <el-col
          :offset="2"
          :span="16"
          :class="[
            { 'ske-loading': !ruleForm.code },
            { 'code-tag': ruleForm.code },
          ]"
        >
          <span v-if="!ruleForm.code">✈</span>

          <span v-else class="code">{{ ruleForm.code }}</span>
          <div v-if="ruleForm.code">
            <span v-for="(item, index) in labels" :key="index">{{
              item + " / "
            }}</span>
          </div>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="生成信息">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item> -->
      <el-form-item>
        <el-col class="line">
          <el-button type="primary" @click="submitForm">更新</el-button>
          <el-button @click="resetForm">重置</el-button></el-col
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { updateMaterial, getTags } from "@/service/getData.js";
import { mapGetters } from "vuex";

export default {
  props: {
    material: {
      type: Object,
    },
    editVisible: {
      type: Boolean,
    },
  },
  data() {
    return {
      visible: false,
      labels: [],
      sort1: [],
      sort2: [],
      sort_2: [],
      sort3: [],
      sort4: [],
      ruleForm: {
        objectId: "",
        title: "",
        description: "",
        bucket: "",
        labels: [],
        author: {},
        sort1: "",
        sort2: "",
        sort3: "",
        sort4: "",
        code: "",
        lastSort: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入物料名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        sort1: [
          { required: true, message: "请选择所属大类", trigger: "change" },
        ],
        sort2: [
          { required: true, message: "请选择所属中类", trigger: "change" },
        ],
        sort3: [
          { required: true, message: "请选择颜色分类", trigger: "change" },
        ],
        sort4: [
          { required: true, message: "请选择主要材质", trigger: "change" },
        ],
        lastSort: [
          { required: true, message: "请输入标识编码", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["token", "currentBucket"]),
  },

  methods: {
    bigSelect(index) {
      //change 触发事件
      //直接就拿到当前的这个对象了
      this.sort_2 = this.sort2.filter(
        (it) => it.parentCode == this.sort1[index - 1].code
      );
    },
    async openDialog() {
      var that = this;
      for (let i = 0; i < 4; i++) {
        await  getTags(this.token.company,i).then((res) => {
          //  that.switchSort(i+1,res);
          // eval("that.sort" + (i + 1) + "= res");
          switch (i) {
            case 0:
              that.sort1 = res;
              break;
            case 1:
              that.sort2 = res;
              break;
            case 2:
              that.sort3 = res;
              break;
            case 3:
              that.sort4 = res;
              break;
            default:
              console.log(i);
          }
        });
      }
    },
    // switchSort(i,res){
    //   switch (i){
    //     case 1:
    //       this.sort1=res;
    //       break
    //     case 2:
    //       this.sort2=res;
    //       break
    //     case 3 :
    //       this.sort3=res;
    //       break
    //       case 4:
    //       this.sort4=res;
    //       break
    //   }
    // },
    async getMaterialProps(newVal) {
      await this.openDialog();
      let material = newVal;
      console.log(material);
      var that = this;
      let index, title, code, aimSort;
      // let ruleForm = this.ruleForm;
      for (let i = 1; i < material.labels.length + 1; i++) {
        code = material.labels[i - 1].code;
        title = material.labels[i - 1].title;
        if (i == 2) {
          this.bigSelect(index + 1);
          index = this.sort_2.findIndex(
            (value) => value.code == code
            // (value) => value.code == code && value.title == title
          );
        } else {
          // aimSort = eval("that.sort" + i);
             switch (i) {
            case 1:
               aimSort =that.sort1;
              break;
            case 3:
               aimSort =that.sort3;
              break;
            case 4:
               aimSort =that.sort4;
              break;
            default:
              console.log(i);
          }
          console.log(aimSort);
          index = aimSort.findIndex((value) => value.code == code);
        }
        console.log(index);
        if (index > -1)
        //  eval("that.ruleForm.sort" + i + "=index+1");
           switch (i) {
            case 1:
              that.ruleForm.sort1 =index+1;
              break;
            case 2:
                that.ruleForm.sort2 =index+1;
              break;
            case 3:
                that.ruleForm.sort3 =index+1;
              break;
            case 4:
                that.ruleForm.sort4 =index+1;
              break;
            default:
              console.log(i);
          }
      }
      // index=title=code=aimSort=''
      that.ruleForm.objectId = material.objectId;
      that.ruleForm.title = material.title;
      that.ruleForm.lastSort = material.lastSort;
      that.ruleForm.description = material.description;
      console.log(that.ruleForm);
    },
    submitForm() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid && this.ruleForm.code) {
          this.ruleForm.author = this.token;
          this.ruleForm.labels = [
            this.sort1[this.ruleForm.sort1 - 1],
            this.sort_2[this.ruleForm.sort2 - 1],
            this.sort3[this.ruleForm.sort3 - 1],
            this.sort4[this.ruleForm.sort4 - 1],
          ];
          updateMaterial(this.ruleForm)
            .then((res) => {
              console.log(res);
              this.handleSuccess();
            })
            .catch((err) => {
              console.log(err);
              this.handleError();
            });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      // console.log(this.$refs["ruleForm"]);
      this.$refs["ruleForm"].resetFields();
    },
    handleSuccess() {
      this.handleClose();
      this.$message.success("上传成功");
      this.$store.dispatch("GetList", this.currentBucket);
    },
    handleClose() {
      this.$emit("changeEditVisible", false);
    },
    handleError() {
      this.handleClose();
      this.$message.error("上传失败");
    },
    makeCode() {
      let ruleForm = this.ruleForm;
      if (
        ruleForm.title &&
        ruleForm.sort1 &&
        ruleForm.sort2 &&
        ruleForm.sort3 &&
        ruleForm.sort4 &&
        ruleForm.lastSort
      ) {
        this.ruleForm.code =
          this.sort1[ruleForm.sort1 - 1].code +
          this.sort_2[ruleForm.sort2 - 1].code +
          this.sort3[ruleForm.sort3 - 1].code +
          this.sort4[ruleForm.sort4 - 1].code +
          ruleForm.lastSort;
        this.labels = [
          this.sort1[ruleForm.sort1 - 1].title,
          this.sort_2[ruleForm.sort2 - 1].title,
          this.sort3[ruleForm.sort3 - 1].title,
          this.sort4[ruleForm.sort4 - 1].title,
        ];
      } else {
        this.ruleForm.code = "";
      }
    },
  },
  watch: {
    ruleForm: {
      handler: function (nowVal, oldVal) {
        this.makeCode();
      },
      deep: true,
    },
    editVisible(newVal) {
      this.visible = newVal;
    },
    material(newVal) {
      this.getMaterialProps(newVal);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.line {
  text-align: center;
}
.uploadImage:hover {
  background: #3a8ee6;
}
.upload {
  text-align: center;
  // padding: 10px 20px;

  img {
    width: 100%;
    height: auto;
  }
  .dialog-footer {
    text-align: right;
  }
}
.code-tag {
  padding: 0 10px;
  padding-left: 0;
  border-radius: 12px;
  color: white;
  background: #409eff;
  .code {
    margin-right: 10px;
    /* color: #66b1ff; */
    background: #c0c4cc;
    padding: 12px;
    font-weight: bold;
    border-radius: 10px;
  }
  div {
    display: inline-block;
  }
}
// .el-dialog{
//   width:30%;
// }

.ske-loading {
  margin-left: 8.33333%;
  border-radius: 12px;
  color: white;
  text-align: center;
}
</style>

