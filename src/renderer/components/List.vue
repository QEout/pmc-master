<template>
  <div class="privileges-table">
    <el-table
      :data="
        list.filter(
          (data) =>
            !search ||
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.code.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      class="material-table"
      v-loading="loading"
      :row-key="
        (row) => {
          return row.objectId;
        }
      "
      height="590px"
      size="small"
      @selection-change="handleSelectChange"
    >
      <el-table-column type="expand">
        <template slot="header">
          <el-popover
            :value="selectState"
            placement="bottom"
            min-width="200"
            trigger="click"
            @show="showPop"
          >
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入名称或编码搜索"
            >
              <el-button
                slot="append"
                icon="el-icon-close"
                @click="selectState = false"
              ></el-button>
            </el-input>

            <div
              class="data-use"
              @click="exportData"
              style="padding: 10px 5px; border-bottom: 1px solid #e4e4e4"
            >
              <span>导出数据到EXCEL</span>
              <span class="el-icon el-icon-arrow-right"></span>
            </div>
            <!-- 
            <el-checkbox-group v-model="bucketGroup" style="padding-top: 10px">
              <el-row v-for="(bucket, index) in bucketList" :key="index">
                <el-checkbox
                  v-if="currentBucket.objectId != bucket.objectId"
                  :label="bucket.objectId"
                  style="padding-bottom: 10px"
                  >{{ bucket.title }}</el-checkbox
                >
              </el-row>
            </el-checkbox-group> -->
            <el-row v-for="(bucket, index) in bucketList" :key="index">
              <!-- <el-switch
                v-if="currentBucket.objectId != bucket.objectId"
                v-model="bucket.check"
                :inactive-text="bucket.title"
              >
              </el-switch> -->
              <div
                v-if="currentBucket.objectId != bucket.objectId"
                @click="toggleCheck(bucket.objectId)"
                class="data-use"
                :style="{
                  color:
                    buckets.indexOf(bucket.objectId) > -1
                      ? '#3a8ee6'
                      : '#909399',
                }"
              >
                <span style="margin-right: 10px">{{ bucket.title }}</span>
                <span
                  class="el-icon el-icon-check"
                  v-if="buckets.indexOf(bucket.objectId) > -1"
                ></span>
                <span class="el-icon el-icon-plus" v-else></span>
              </div>
            </el-row>
            <!-- <el-select
              v-model="bucketGroup"
              multiple
              placeholder="请选择"
              style="padding-top: 10px"
            >
              <el-option
                v-for="bucket in bucketList"
                :key="bucket.objectId"
                :label="bucket.title"
                :value="bucket.objectId"
              >
              </el-option>
            </el-select> -->

            <div class="data-use" @click="copyData">
              <span>导出数据到选中的空间</span>
              <span class="el-icon el-icon-arrow-right"></span>
            </div>

            <div slot="reference" class="t-menu">
              <i class="el-icon el-icon-menu"></i>
            </div>
          </el-popover>
        </template>
        <template slot-scope="props">
          <!-- <div class="block"> -->
          <!-- <el-row>
  <el-button type="primary" icon="el-icon-edit" round></el-button>
  <el-button type="danger" icon="el-icon-delete" round></el-button>
</el-row> -->

          <el-timeline :reverse="reverse">
            <el-timeline-item
              :timestamp="props.row.createdAt + '：' + props.row.description"
            >
              创建于
            </el-timeline-item>
            <el-timeline-item :timestamp="props.row.updatedAt">
              更新于
            </el-timeline-item>
            <el-timeline-item
              :timestamp="
                props.row.authorInfo.name + ' ' + props.row.authorInfo.call
              "
            >
              {{
                props.row.authorInfo.objectId == props.row.author.objectId
                  ? "作者"
                  : "编辑者"
              }}
            </el-timeline-item>
            <el-timeline-item>
              <el-button-group>
                <el-button
                  icon="el-icon-edit"
                  size="mini"
                  @click="handleEdit(props.row)"
                ></el-button>
                <!-- <el-button type="primary" icon="el-icon-share" size="mini"></el-button> -->
                <el-button
                  @click="handleDelete(props.row)"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button> </el-button-group
            ></el-timeline-item>
          </el-timeline>
          <!-- </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="title" label="物料名称" sortable>
      </el-table-column>
      <el-table-column prop="code" label="编码" sortable> </el-table-column>
      <el-table-column
        label="特征"
        sortable
        prop="labels"
        :filters="labelFilter"
        :filter-method="filterLabel"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span
            style="margin-right: 5px"
            v-for="(item, index) in scope.row.labels"
            :key="index"
            >{{ item.title }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="最近更新" width="120" sortable prop="updatedAt">
        <template slot-scope="scope">
          <span>{{ scope.row.timeFN }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="60"
        type="selection"
        :reserve-selection="true"
        v-if="selectState"
      >
      </el-table-column>
    </el-table>
    <EditMaterial
      :material="editMaterial"
      :editVisible="editVisible"
      @changeEditVisible="(it) => (editVisible = it)"
    />
    <!-- <CopyMaterial 
    :materialList="sList"
    :copyVisible="copyVisible" 
      @changeCopyVisible="(it) => (copyVisible = it)"
    /> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EditMaterial from "@/components/EditMaterial";
import Blob from "@/excel/Blob";
import { export_json_to_excel } from "@/excel/Export2Excel.js";
import { createMaterial } from "@/service/getData.js";
export default {
  data() {
    return {
      selectState: false,
      selectList: [],
      buckets: [],
      bucketGroup: [],
      search: "",
      loading: false,
      reverse: true,
      editVisible: false,
      editMaterial: {},
      labelFilter: [{ text: "产成品", value: "产成品" }],
    };
  },
  components: {
    EditMaterial,
    // CopyMaterial,
  },
  created: function () {
    // console.log(this.list)
    // let res = {};
    // this.list.labels.map((it) => {
    //   res.text = res.value = it.title;
    //   this.labelFilter.add(res);
    // });
  },

  methods: {
    handleSelectChange(row) {
      console.log(row);
      // if(row.length==0)
      //   return;
      this.selectList = row; // 将选中的数据给selectList
      //   console.log(this.selectList)
    },
    showPop() {
      this.selectState = true;
    },
    toggleCheck(objectId) {
      let a = this.buckets.indexOf(objectId);
      if (a > -1) this.buckets.splice(a, 1);
      else this.buckets.push(objectId);
      console.log(this.buckets);
    },
    copyData() {
      if (this.buckets.length === 0) {
        this.$message({
          message: "请至少选择一个空间",
          type: "warning",
        });
        return;
      }
      this.buckets.forEach((bucket) => {
        this.selectList.map((it) => {
          it.bucket = bucket;
          it.author = this.token;
          createMaterial(it).then((res) => {
            if (res.objectId) this.$message.success(it.title + "导出成功");
            else this.$message.error(it.title + "导出失败");
          });
        });
      });
      //  this.$message.success("导出成功"+toString(numList[0])+"条，"+"失败"+toString(numList[1])+"条");
    },
    exportData() {
      if (this.selectList.length === 0) {
        this.$message({
          message: "请至少选择一条需要导出的数据",
          type: "warning",
        });
        return;
      }
      console.log(this.selectList);
      //导出
      require.ensure([], () => {
        const tableHeader = ["物料名称", "编码", "特征", "更新时间", "描述"]; // 设置Excel表格的表头
        const filterVal = [
          "title",
          "code",
          "labels",
          "updatedAt",
          "description",
        ]; // 跟表格表头对应的绑定的prop
        let list = this.filterTableData(
          JSON.parse(JSON.stringify(this.selectList))
        ); // this.selectList为选中的要导出的数据，用filterTableData方法先处理一下数据格式(要进行深度拷贝，以免过滤的时候，影响页面上展示的数据)，再存到list
        let data = this.formatJson(filterVal, list);
        console.log(data);
        export_json_to_excel(
          tableHeader,
          data,
          this.currentBucket.title + "的物料信息"
        ); //最后一个是导出表格的名字
      });
    },
    formatJson(filterVal, Data) {
      return Data.map((v) => filterVal.map((j) => v[j]));
    },
    //导出数据前对数据处理
    filterTableData(data) {
      data.forEach((item) => {
        item.labels = item.labels.map((it) => {
          return it.title;
        });
      });
      return data;
    },
    filterLabel(value, row) {
      let res = [];

      row.labels.map((it) => {
        res.push(it.title);
      });
      //  console.log(res.find(value))
      return res.indexOf(value) > -1;
    },
    // preview(index, row) {
    //   this.previewUrl = "http://" + this.url[0] + "/" + row.key;
    //   this.previewVisible = true;
    // },
    handleEdit(row) {
      if(this.token.role<2)
       return this.$message("抱歉，您没有权限")
      this.editMaterial = row;
      this.editVisible = true;
    },
    handleDelete(row) {
       if(this.token.role<3)
       return this.$message("抱歉，您没有权限")
      this.$confirm("此操作将永久删除该物料信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("DeleteBucketListItem", row.objectId)
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
    ...mapGetters(["list", "currentBucket", "bucketList", "token"]),
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  // margin-bottom: 0;
  width: 50%;
}
.t-menu {
  font-size: 16px;
}
.t-menu:hover {
  color: #409eff;
  cursor: pointer;
}
.data-use {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  padding: 5px;
  // font-size: 13px;
  // color: #909399;
}
.data-use:hover {
  background-color: #ecf5ff;
  color: #409eff;
  cursor: pointer;
}
</style>
