<template>
  <el-menu default-active="0">
    <el-menu-item
      :index="'' + index"
      v-for="(item, index) in bucketList"
      :key="index"
      @click="switchBucket(item)"
    >
      <span slot="title">
        <!-- <i class="el-icon-upload" @click.stop.prevent="beforeDelete(item)"></i > -->
        {{ item.title }}</span
      >
      <el-popover placement="right" width="200" trigger="click" >
        <el-form
          ref="updateBucket"
          :model="item"
          size="mini"
         class="mini-form"
        >
          <el-form-item label="空间名称" >
            <el-input
              v-model="item.title"
              placeholder="请输入内容"
              prop="title"
              :rules="{
                required: true,
                message: '物料空间名称为空',
                trigger: 'blur',
              }"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="description"
           
          >
            <el-input
              v-model="item.description"
              placeholder="请输入描述"
            ></el-input>
          </el-form-item>
          <el-form-item
         
            label="排序"
            prop="sort"
            :rules="{ type: 'number', message: '必须为数字值' }"
          >
            <el-input v-model.number="item.sort" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 10px; margin-bottom: 0px"
            ><el-button
              type="danger"
              size="mini"
              @click.stop="beforeDelete(item.objectId)"
              >删除</el-button
            >
            <el-button type="success" size="mini" @click.stop="submitForm(item)"
              >修改</el-button
            >
          </el-form-item>
        </el-form>
        <i class="el-icon-s-unfold delete" slot="reference" ></i>
      </el-popover>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    switchBucket(data) {
      this.$store.dispatch("SwitchBucket", data);
    },
    submitForm(form) {
       if(this.token.role<4)
       return this.$message("抱歉，您没有权限")
      this.$refs["updateBucket"][0].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("UpdateBucket", form)
            .then((it) => {
              if (it) {
                this.$message.success("修改成功");
                // this.cancel("updateBucket");
              }
            })
            .catch((err) => {
              // console.log(err)
              this.$message.error("修改失败");
            });
        } else {
          return false;
        }
      });
    },
    beforeDelete(objectId) {
         if(this.token.role<5)
       return this.$message("抱歉，您没有权限")
      this.$confirm("此操作将永久删除该空间, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("DeleteBucket", objectId)
            .then(() => {
              this.$message.success("删除成功");
            })
            .catch(() => {
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  computed: {
    ...mapGetters(["bucketList","token"]),
  },
  mounted() {
    this.$store.dispatch("GetBucket");
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.delete {
  position: absolute;
  right: 0;
  top: 12px;
  margin-right: 0px;
  color: grey;
}
span {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
  width: 100%;
  display: block;
}
.el-popover {
  padding: 0px;
}
// .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
//     margin-bottom: 0px;}
// .title {

//   // word-wrap: normal;
//   //  text-overflow: ellipsis;
// }
</style>
