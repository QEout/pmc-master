<template >
<div class="uploadImage">
  <el-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入物料名称或编码"
  @select="handleSelect"
>
<!-- <template slot="prepend" ><i class="el-icon-search"></i> </template> -->
</el-autocomplete></div>
</template>

<script>
import { getHistory, setHistory, removeHistory } from "@/utils/common";
  export default {
    data() {
      return {
        materials: [],
        state: '',
        timeout:  null
      };
    },
    methods: {
      loadAll() {
      let history =  window.localStorage.getItem("history")
        return history;
      },
      querySearchAsync(queryString, cb) {
        let materials = this.materials;
        let results = queryString ? materials.filter(this.createStateFilter(queryString)) : materials;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console
        this.$confirm("此操作将永久删除该空间, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("DeleteBucket", data)
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
      }
    },
    mounted() {
      this.materials = this.loadAll();
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .uploadImage {
    // margin-left:20px;
        padding-right: 20px;

    border-radius: 10px;

    cursor:pointer;
    // padding-right: 2px;
    font-size: 14px;
    i {
      vertical-align: sub;
      font-size: 22px;
      margin-right: 5px;
    }
  }
  </style>