<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input style="width: 250px;" placeholder="SEARCH" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">SEARCH</el-button>
      </el-input>
      <el-button type="primary" @click="addRecord()" class="addbtn">ADD</el-button>

    </div>
    <!-- 数据显示 -->
    <el-table :data="datas" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="username" label="评论人"></el-table-column>
      <el-table-column prop="content" label="评论内容"></el-table-column>
      <el-table-column prop="label" label="情感倾向">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.label == 'positive'">正面</el-tag>
          <el-tag type="danger" v-if="scope.row.label == 'negative'">负面</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="概率"></el-table-column>
      <el-table-column prop="create_time" label="更新时间"></el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单EDIT -->
    <el-dialog title="EDIT" :visible.sync="visibleForm">
      <el-form :model="editFormData" label-position="left" label-width="80px" :rules="editFormRules">
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input></el-form-item>
        <el-form-item label="GAMEID" prop="gameid">
          <el-input v-model="editFormData.gameid" autocomplete="off"></el-input></el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editFormData.name" autocomplete="off"></el-input></el-form-item>
        <el-form-item label="支持的交易方式" prop="supportransactionmode">
          <el-input v-model="editFormData.supportransactionmode" autocomplete="off"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">SUBMIT</el-button>
      </div>
    </el-dialog>

    <el-dialog title="ADD" :visible.sync="visibleAddForm">
      <el-form :model="addFormdata" label-position="left" label-width="80px" :rules="editFormRules">
        <el-form-item label="GAMEID" prop="gameid">
          <el-input v-model="addFormdata.gameid" autocomplete="off"></el-input></el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addFormdata.name" autocomplete="off"></el-input></el-form-item>
        <el-form-item label="支持的交易方式" prop="supportransactionmode">
          <el-input v-model="addFormdata.supportransactionmode" autocomplete="off"></el-input></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAddForm = false">取 消</el-button>
        <el-button type="primary" @click="addCommit()">SUBMIT</el-button>
      </div>
    </el-dialog>

    <!-- 上一页，当前页，下一页 -->
    <div class="footer-button">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="page" :page-size="pageSize"
          layout="total, prev, pager, next" :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {add,list,modify,remove} from "@/api/comment";
import mixin from '@/mixins/mixins'

export default {
  name: "List",
  mixins: [mixin],
  data() {
    return {
      datas: [],
      imageUrl: '',
      imageUrl2:  '',
      types: ['手机游戏','网络游戏'],
      gametypenames: ['MOBA','动作','策略','角色扮演','生存','竞速','二次元','益智','卡牌','回合制','模拟',''],
      type: '',
      editFormData: [],
      addFormdata:{},
      visibleAddForm: false,
      keyword: '',
      page: 1,
      pageSize: 10,
      total: 0,
      groups:[],
      visibleForm: false,
      editFormRules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
      }
    };
  },

  mounted() {
    this.getDataList();
    // console.log('uid:' + this.uid)
    // console.log('phone:' + this.phone)
  },

  methods: {
    addRecord() {
      this.visibleAddForm = true;
    },
    addCommit() {
      // console.log(this.addFormdata);
      add(this.addFormdata)
          .then(res => {
            if (res.code == 0) {
              this.visibleAddForm = false;
              this.$message({ message: "ADD成功", type: "success" });
            }
          })
          .catch(error => {
            this.$message.error("ADD失败");
          });
    },

    /***
     * EDIT提交
     */
    commit() {
      this.modifyStudent(this.editFormData)
    },

    /**
     * 查询所有
     */
    getDataList() {
      list(this.page, this.pageSize, '').then(res => {
        // console.log(res)
        let ret = res.data
        this.datas = ret.records
        this.total = ret.total
        // console.log(this.datas)
      }).catch(error => {this.$message.error("查询数据列表失败")});
    },

    /**
     * 关键字查询
     */
    searchStudent() {
      list(this.page, this.pageSize, this.keyword).then(res => {
            let ret = res.data
            this.datas = ret.records
            this.total = ret.total
            this.$message({ message: "查询成功", type: "success" })
          })
          .catch(error => {
            this.$message.error("查询失败")
          });
    },

    resetById(index, row) {
      this.resetPassword(row.id);
    },

    /**
     * 根据idDEL
     */
    deleteById(index, row) {
      this.deleteStudentById(row.id)
    },

    deleteStudentById(id) {
      remove({"id":id})
          .then(res => {
            this.$message({ message: "DEL成功", type: "success" })
            this.getDataList()
          })
          .catch(error => {
            this.$message.error("DEL失败")
          });
    },

    /**
     * EDIT
     */
    editById(index, row) {
      let modifyId = row.id
      this.editFormData = row
      this.visibleForm = true
    },

    /**
     * 更新
     */
    modifyStudent(modifyData) {
      modify(modifyData)
          .then(res => {
            this.$message({ message: "更新成功", type: "success" })
            this.getDataList()
            this.visibleForm = false
          })
          .catch(error => {
            this.$message.error("更新失败")
          });
    },

    handleSizeChange() {},

    handleCurrentChange(v) {
      this.page = v
      this.getDataList()
    },
    inputListener() {
      this.getDataList()
    },

    handleUploadSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //console.log('res',res)
      this.editFormData.shopimageurl = res.fileDownloadUri
    },

    handleUploadSuccess2(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
      //console.log('res',res)
      this.editFormData.icon = res.fileDownloadUri
    },

    handleUploadSuccess3(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //console.log('res',res)
      this.addFormdata.shopimageurl = res.fileDownloadUri
    },

    handleUploadSuccess4(res, file) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
      //console.log('res',res)
      this.addFormdata.icon = res.fileDownloadUri
    },
    // 兼容本地地址和在线地址的获取图片地址方式,
    // getImageUrl(url) {
    //   if(url.startsWith('http://localhost'))
    //      return url
    //   else
    //     // 在线地址
    //     return 'https://images.weserv.nl/?url=' + 'http:' + url
    // }
  }
};
</script>

<style lang="less" scoped>
.el-input-group {
  width: 40%;
}
.header-menu {
  margin-bottom: 5px;
  padding: 5px;
  text-align: left;
  margin-bottom: 5px;
}

.footer-button {
  margin-top: 10px;
}

.addbtn{
  margin-left: 5px;
}

.avatar{
  max-height: 80px;
}
</style>
