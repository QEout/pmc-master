<template>
  <section class="app-main">
    <p class="uploadImage" @click="openRule">
      <i class="el-icon-s-tools"></i>规则设置
    </p>
    <el-dialog title="规则设置" :visible.sync="ruleVisible" class="upload">
      <div class="tag-div">
        <span style="margin-right: 20px"> 所属大类 </span>
        <div class="tag-group group">
          <el-tooltip
            :content="tag.description ? tag.description : tag.title"
            placement="top"
            :key="index"
            v-for="(tag, index) in defaultTags0"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @close="handleClose(tag.objectId, index, 0)"
              class="tags"
            >
              {{ tag.code + " " + tag.title }}
            </el-tag>
          </el-tooltip>
          <div v-if="inputVisible0" class="group-input">
            <div
              :class="[
                'el-form-item',
                'el-form-item--feedback',
                sort0.error ? 'is-error' : 'is-success',
              ]"
              style="margin-bottom: 0px"
            >
              <!-- is-success -->
              <el-input
                class="input-new-tag"
                v-model="sort0.content"
                ref="saveTagInput0"
                size="small"
                @keyup.enter.native="handleInputConfirm(sort0, 0, 1)"
                @blur="handleInputConfirm(sort0, 0, 1)"
              >
              </el-input>
              <div class="el-form-item__error">
                {{ sort0.error }}
              </div>
            </div>
          </div>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(0)"
            >新建，例：1 产成品 描述</el-button
          >
        </div>
      </div>
      <div class="tag-div">
        <div class="tag-group group">
          <span style="margin-right: 20px"> 所属中类 </span>
          <el-select
            @change="selectOne"
            v-model="currentTitle"
            placeholder="所属中类"
            size="small"
            style="width: 130px; margin-right: 20px"
          >
            <el-option
              v-for="(item, index) in defaultTags0"
              :key="item.code"
              :label="item.title"
              :value="index"
            >
              <span style="float: left">{{ item.title }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.code
              }}</span>
            </el-option>
          </el-select>
          <el-tooltip
            :content="tag.description ? tag.description : tag.title"
            placement="top"
            :key="index"
            v-for="(tag, index) in defaultTags1[currentIndex]"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @close="handleClose(tag.objectId, index, 1)"
              class="tags"
            >
              {{ tag.code + " " + tag.title }}
            </el-tag>
          </el-tooltip>
          <div v-if="inputVisible1" class="group-input">
            <div
              :class="[
                'el-form-item',
                'el-form-item--feedback',
                sort1.error ? 'is-error' : 'is-success',
              ]"
              style="margin-bottom: 0px"
            >
              <!-- is-success -->
              <el-input
                class="input-new-tag"
                v-model="sort1.content"
                ref="saveTagInput1"
                size="small"
                @keyup.enter.native="handleInputConfirm(sort1, 1, 2)"
                @blur="handleInputConfirm(sort1, 1, 2)"
              >
              </el-input>
              <div class="el-form-item__error">
                {{ sort1.error }}
              </div>
            </div>
          </div>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(1)"
            >新建，例：01 电池包 描述</el-button
          >
        </div>
      </div>
      <div class="tag-div">
        <div class="tag-group group">
          <span style="margin-right: 20px"> 颜色分类 </span>
          <el-tooltip
            :content="tag.description ? tag.description : tag.title"
            placement="top"
            :key="index"
            v-for="(tag, index) in defaultTags2"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @close="handleClose(tag.objectId, index, 2)"
              class="tags"
            >
              {{ tag.code + " " + tag.title }}
            </el-tag>
          </el-tooltip>
          <div v-if="inputVisible2" class="group-input">
            <div
              :class="[
                'el-form-item',
                'el-form-item--feedback',
                sort2.error ? 'is-error' : 'is-success',
              ]"
              style="margin-bottom: 0px"
            >
              <!-- is-success -->
              <el-input
                class="input-new-tag"
                v-model="sort2.content"
                ref="saveTagInput2"
                size="small"
                @keyup.enter.native="handleInputConfirm(sort2, 2, 2)"
                @blur="handleInputConfirm(sort2, 2, 2)"
              >
              </el-input>
              <div class="el-form-item__error">
                {{ sort2.error }}
              </div>
            </div>
          </div>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(2)"
            >新建，例：01 蓝色 描述</el-button
          >
        </div>
      </div>
      <div class="tag-div">
        <div class="tag-group group">
          <span style="margin-right: 20px"> 主要材质 </span>
          <el-tooltip
            :content="tag.description ? tag.description : tag.title"
            placement="top"
            :key="index"
            v-for="(tag, index) in defaultTags3"
          >
            <el-tag
              closable
              :disable-transitions="false"
              @close="handleClose(tag.objectId, index, 3)"
              class="tags"
            >
              {{ tag.code + " " + tag.title }}
            </el-tag>
          </el-tooltip>
          <div v-if="inputVisible3" class="group-input">
            <div
              :class="[
                'el-form-item',
                'el-form-item--feedback',
                sort3.error ? 'is-error' : 'is-success',
              ]"
              style="margin-bottom: 0px"
            >
              <!-- is-success -->
              <el-input
                class="input-new-tag"
                v-model="sort3.content"
                ref="saveTagInput3"
                size="small"
                @keyup.enter.native="handleInputConfirm(sort3, 3, 1)"
                @blur="handleInputConfirm(sort3, 3, 1)"
              >
              </el-input>
              <div class="el-form-item__error">
                {{ sort3.error }}
              </div>
            </div>
          </div>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput(3)"
            >新建，例：1 塑料 描述</el-button
          >
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ruleVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadTags">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { deleteResource, getTags, setTag } from "@/service/getData";
export default {
  data() {
    return {
      ruleVisible: false,
      currentTitle: "",
      currentIndex: "",
      defaultTags0: [],
      defaultTags1: [[], [], [], [], [], [], [], [], [], []],
      defaultTags2: [],
      defaultTags3: [],
      inputVisible0: false,
      inputVisible1: false,
      inputVisible2: false,
      inputVisible3: false,
      sort0: {
        content: "",
        error: "",
      },
      sort1: {
        content: "",
        error: "",
      },
      sort2: {
        content: "",
        error: "",
      },
      sort3: {
        content: "",
        error: "",
      },
    };
  },
  computed: {
    ...mapGetters(["token"]),
  },
  // watch: {
  //   defaultTags(newVal) {
  //     this.defaultTags = newVal;
  //   },
  // },
  methods: {
    handleClose(objectId, index, i) {
      let a = this.currentIndex;
      if (objectId) {
        this.$confirm("此操作将删除已存在的该元素, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteResource("sortList", objectId);
            this.switchTags(i).splice(index, 1);
            this.currentIndex = 999;
            this.currentIndex = a;
            console.log(this.defaultTags[i]);
          })
          .catch(() => {});
      } else {
        this.switchTags(i).splice(index, 1);

        this.currentIndex = 999;
        this.currentIndex = a;
        //  this.selectOne(i)
        console.log(this.currentIndex);
      }
    },
    switchTags(i) {
      switch (i) {
        case 0:
          return this.defaultTags0;
        case 1:
          return this.defaultTags1[this.currentIndex];
        case 2:
          return this.defaultTags2;
        case 3:
          return this.defaultTags3;
      }
    },
    selectOne(index) {
      this.currentIndex = index;
    },
    async openRule() {
      this.ruleVisible = true;
      var that = this;
      for (let i = 0; i < 4; i++) {
        await  getTags(this.token.company,i).then((res) => {
          console.log(res);
          if (i == 1) {
            // let a=that.currentIndex
            that.defaultTags0.forEach((item, index) => {
              that.defaultTags1[index] = res.filter(
                (it) => it.parentCode == item.code
              );
            });
            console.log(that.defaultTags1);
            //  that.currentIndex = 999
            //  that.currentIndex=a
          } else {
            // eval("that.defaultTags" + i + "= res");
            switch (i) {
              case 0:
                that.defaultTags0 = res;
                break;
              case 1:
                that.defaultTags1 = res;
                break;
              case 2:
                that.defaultTags2 = res;
                break;
              case 3:
                that.defaultTags3 = res;
                break;
              default:
                console.log(i);
            }
          }
        });
      }
    },
    flatten(arr) {
      console.log("sdfjkf");
      return [].concat(
        ...arr.map((x) => (Array.isArray(x) ? this.flatten(x) : x))
      );
    },
    uploadTags() {
      this.ruleVisible = false;
      let array = [];
      for (let i = 0; i < 4; i++) {
        if (i == 1)
          array = this.flatten(this.defaultTags1).filter(
            (data) => !data.objectId
          );
        else array = this.switchTags(i).filter((data) => !data.objectId);
        console.log(array);
        if (array.length > 0) {
          console.log(array);
          array.forEach((it) => {
            setTag(this.token.company,it, i == 1).then((res) => {
              if (res.objectId) this.$message.success(it.title + "新建成功");
              else this.$message.error(it.title + "新建失败");
            });
          });
        }
      }
    },
    showInput(i) {
      // eval("this.inputVisible" + i + "= true");
      switch (i) {
        case 0:
          this.inputVisible0 = true;
          break;
        case 1:
          this.inputVisible1 = true;
          break;
        case 2:
          this.inputVisible2 = true;
          break;
        case 3:
          this.inputVisible3 = true;
          break;
        default:
          console.log(i);
      }
      this.$nextTick((_) => {
        // eval("this.$refs.saveTagInput" + i + ".$refs.input.focus()");
        switch (i) {
          case 0:
            this.$refs.saveTagInput0.$refs.input.focus();
            break;
          case 1:
            this.$refs.saveTagInput1.$refs.input.focus();
            break;
          case 2:
            this.$refs.saveTagInput2.$refs.input.focus();
            break;
          case 3:
            this.$refs.saveTagInput3.$refs.input.focus();
            break;
          default:
            console.log(i);
        }
      });
    },

    handleInputConfirm(sort, index, num) {
      if (!sort.content) {
        sort.error = "内容不能为空";
        return;
      }
      let a = sort.content.split(" ");
      console.log(a);
      if (!/^\d+$/.test(a[0])) {
        sort.error = "请输入正确的编码";
        return;
      }
      if (a[0].length != num) {
        sort.error = "编码长度不正确";
        return;
      }
      console.log(this.switchTags(index));
      if (this.switchTags(index).length > 0) {
        let i =
          this.switchTags(index).findIndex((value) => value.code == a[0]) + 1;
        if (i > 0) {
          sort.error = "与第" + i + "个元素编码重复";
          return;
        }
      }
      if (!a[1]) {
        sort.error = "请输入名称";
        return;
      }
      if (index == 1)
        this.switchTags(index).push({
          code: a[0],
          title: a[1],
          parentCode: this.defaultTags0[this.currentIndex].code,
          description: a[2],
          sort: index,
        });
      else
        this.switchTags(index).push({
          code: a[0],
          title: a[1],
          description: a[2],
          sort: index,
        });
      // eval("this.inputVisible" + index + "= false");
      // eval("this.sort" + index + ".error = ''");
      // eval("this.sort" + index + ".content = ''");
      switch (index) {
        case 0:
          this.inputVisible0 = false;
          this.sort0.error = "";
          this.sort0.content = "";
          break;
        case 1:
          this.inputVisible1 = false;
          this.sort1.error = "";
          this.sort1.content = "";
          break;
        case 2:
          this.inputVisible2 = false;
          this.sort2.error = "";
          this.sort2.content = "";
          break;
        case 3:
          this.inputVisible3 = false;
          this.sort3.error = "";
          this.sort3.content = "";
          break;
        default:
          console.log(index);
      }

      console.log(this.switchTags(index));
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  .uploadImage {
    margin-left: 20px;
    padding: 10px;
    background: #66b1ff;
    border-radius: 10px;

    cursor: pointer;
    // padding-right: 2px;
    font-size: 14px;
    i {
      vertical-align: sub;
      font-size: 22px;
      margin-right: 5px;
    }
  }
  .uploadImage:hover {
    background: #3a8ee6;
  }
  .upload {
    text-align: center;
    img {
      width: 100%;
      height: auto;
    }
    .dialog-footer {
      text-align: right;
    }
  }
  .button-new-tag {
    margin: 5px 0;
  }
  .tag-div {
    display: -webkit-box;
    margin-bottom: 20px;
    -webkit-box-align: center;
    .group {
      display: flex;
      align-items: center;

      flex-wrap: wrap;
      .tags {
        margin: 5px 20px 5px 0;
        // margin-bottom:10px;
      }
      .group-input {
        width: 154px;
        position: sticky;
        margin: 5px 0;
      }
    }
  }
}
</style>

