<template>
  <div>
    <!-- 功能 -->
    <div class="header-menu">
      <el-input style="width: 250px;" placeholder="SEARCH用户" v-model="keyword" @clear="inputListener" clearable>
        <el-button slot="append" type="primary" icon="el-icon-search" @click="searchStudent">SEARCH</el-button>
      </el-input>
      <el-button type="primary" @click="addStudent()" class="addbtn">ADD</el-button>

      <el-button style="margin-left:20px;" type="success" plain icon="el-icon-document" @click="handleDownload">
        导出Excel
      </el-button>

<!--      <el-upload style="margin-left:20px;display: inline"-->
<!--                 action="api/excel/users">-->
<!--        <el-button  type="warning" plain icon="el-icon-upload2" @click="">-->
<!--          导入Excel-->
<!--        </el-button>-->
<!--      </el-upload>-->
    </div>
    <!-- 数据显示 -->
    <el-table :data="studentData" size="mini" :stripe="true" :highlight-current-row="true">
      <el-table-column label="序号" type="selection"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="realname" label="姓名" fixed width="100"></el-table-column>
      <el-table-column prop="idno" label="身份证号" ></el-table-column>
      <el-table-column prop="gender" label="性别" :formatter="genderFilter"></el-table-column>
      <el-table-column prop="age" label="年龄" ></el-table-column>
      <el-table-column prop="phone" label="电话" ></el-table-column>
      <el-table-column prop="roles" label="权限">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.roles}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-setting" size="mini" @click="resetById(scope.$index, scope.row)">重置密码</el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="deleteById(scope.$index, scope.row)"></el-button>
          <el-button type="primary" icon="el-icon-edit" circle @click="editById(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹出表单EDIT用户 -->
    <el-dialog title="EDIT用户" :visible.sync="visibleForm">
      <el-form
          :model="editFormData"
          label-position="left"
          label-width="80px"
          :rules="editFormRules"
      >
        <el-form-item label="ID">
          <el-input v-model="editFormData.id" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="editFormData.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editFormData.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="editFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="editFormData.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="editFormData.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="roles">
          <el-radio-group v-model="editFormData.roles">
            <el-radio-button label="admin">管理员</el-radio-button>
            <el-radio-button label="normal">审核员</el-radio-button>
            <el-radio-button label="ban">封禁用户</el-radio-button>
          </el-radio-group>
        </el-form-item>
<!--        <el-form-item label="部门" prop="groupId">-->
<!--          <el-select v-model="editFormData.groupId" placeholder="" >-->
<!--            <el-option v-for="item in groups"-->
<!--                       :key="item.id" :label="item.remark" :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleForm = false">取 消</el-button>
        <el-button type="primary" @click="commit()">SUBMIT</el-button>
      </div>
    </el-dialog>

    <el-dialog title="ADD用户" :visible.sync="visibleAddForm">
      <el-form
          :model="addFormdata"
          label-position="left"
          label-width="80px"
          :rules="editFormRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addFormdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realname">
          <el-input v-model="addFormdata.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="addFormdata.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮件" prop="email">
          <el-input v-model="addFormdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="addFormdata.addr" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="addFormdata.age" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="部门" prop="groupId">-->
<!--          <el-select v-model="addFormdata.groupId" placeholder="" >-->
<!--            <el-option v-for="item in groups"-->
<!--                       :key="item.id" :label="item.remark" :value="item.id">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="权限" prop="roles">
          <el-radio-group v-model="addFormdata.roles">
            <el-radio-button label="admin">管理员</el-radio-button>
            <el-radio-button  label="normal">审核员</el-radio-button>
            <el-radio-button  label="ban">封禁用户</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAddForm = false">取 消</el-button>
        <el-button type="primary" @click="addCommit()">SUBMIT</el-button>
      </div>
    </el-dialog>

    <el-dialog title="验证超级密码" :visible.sync="visiblePassForm">
      <el-form
          :model="passData"
          label-position="left"
          label-width="80px">
        <el-form-item label="超级密码" prop="spass">
          <el-input type="password" v-model="passData.spass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visiblePassForm = false">取 消</el-button>
        <el-button type="primary" @click="vertifypass()">SUBMIT</el-button>
      </div>
    </el-dialog>

    <!-- 上一页，当前页，下一页 -->
    <div class="footer-button">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {add,list,modify,remove} from "@/api/user";
import {get} from "@/api/group";

export default {
  name: "UserList",
  data() {
    return {
      studentData: [],
      dataAll:[],
      passData:{
        spass:''
      },
      editFormData: [],
      addFormdata:{
        userId: "",
        username: "",
        realname: "",
        idno: "",
        description: "",
        phone: "",
        email:"",
        addr: "",
        age: "",
        roles:"normal"
      },
      visiblePassForm: false,
      visibleAddForm: false,
      keyword: '',
      page: 1,
      pageSize: 10,
      total: 0,
      groups:[],
      visibleForm: false,
      editFormRules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮件", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      }
    };
  },

  mounted() {
    this.allStudent();
    this.getGroup();
  },

  methods: {
    getGroup(){
      get(1,20).then(res=>{
        this.groups = res.data.records
        // console.log(this.groups)
      })
    },
    groupNameFilter(row, column){
      let res = this.groups.filter((item, i) => {
        return item.id == row.groupId;
      })
      if(res.length>0)
        return res[0].remark
      else
        return '无部门'
    },
    genderFilter(row, column){
      if(row.gender=='M')
        return '男'
      else
        return '女'
    },
    addStudent() {
      this.visibleAddForm = true;
    },
    addCommit() {
      // console.log(this.addFormdata);
      add(this.addFormdata)
          .then(res => {
            if (res.code == 0) {
              this.visibleAddForm = false;
              this.$message({ message: "ADD用户成功", type: "success" });
            }
          })
          .catch(error => {
            this.$message.error("ADD用户失败");
          });
    },
    // 清空年级回到查询所有用户
    gradeListener() {
      this.allStudent()
      this.value2 = ''
    },

    // 清空班级回到查询所有班级
    classListener() {

    },


    /***
     * EDIT提交
     */
    commit() {
      // if(this.editFormData.roles == 'admin'){
      //   //验证超级密码
      //   this.visibleForm = false
      //   this.visiblePassForm = true
      //   return ;
      // }
      this.modifyStudent(this.editFormData)
    },

    vertifypass(){
      this.visiblePassForm = false
      if(this.passData.spass == this.$store.state.user.superpassword){
        this.modifyStudent(this.editFormData)
      }else{
        this.$message.error('超级密码错误！')
        this.allStudent()
      }
    },

    inputListener() {
      this.allStudent()
    },

    /**
     * 查询所有用户
     */
    allStudent() {
      list(this.page, this.pageSize, '').then(res => {
        console.log(res)
        let ret = res.data
        this.studentData = ret.records
        this.total = ret.total
        console.log(this.studentData)
        // this.$message({message:'查询成功', type: 'success'})
      })
          .catch(error => {
            this.$message.error("查询用户列表失败")
          });
    },

    /**
     * 关键字查询用户
     */
    searchStudent() {
      list(this.page, this.pageSize, this.keyword).then(res => {
            let ret = res.data
            this.studentData = ret.records
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

    resetPassword(id){
      modify({"id":id,"password":"123456"})
          .then(res => {
            this.$message({ message: "重置密码成功", type: "success" });
          })
          .catch(error => {
            this.$message.error("重置密码失败");
          });
    },

    /**
     * 根据idDEL用户
     */
    deleteById(index, row) {
      this.deleteStudentById(row.id)
    },

    deleteStudentById(id) {
      remove({"id":id})
          .then(res => {
            this.$message({ message: "DEL成功", type: "success" })
            this.allStudent()
          })
          .catch(error => {
            this.$message.error("DEL失败")
          });
    },

    /**
     * EDIT用户
     */
    editById(index, row) {
      let modifyId = row.id
      this.editFormData = row
      this.visibleForm = true
    },

    /**
     * 更新用户
     */
    modifyStudent(modifyData) {
      modify(modifyData)
          .then(res => {
            this.$message({ message: "更新成功", type: "success" })
            this.allStudent()
            this.visibleForm = false
          })
          .catch(error => {
            this.$message.error("更新失败")
          });
    },

    handleSizeChange() {},

    handleCurrentChange(v) {
      this.page = v
      this.allStudent()
    },

    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID','用户名','姓名','部门' ,'身份证号', '性别', '年龄', '电话','权限']
        const filterVal = ['id','username','realname', 'groupId', 'idno', 'gender', 'age','phone','roles']
        const list = this.studentData
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户名单',
          autoWidth: true,
          bookType: 'xlsx'
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'gender') {
          return this.jFormat1(v[j])
        }else if(j === 'groupId')
          return this.jFormat2(v[j])
        else {
          return v[j]
        }
      }))
    },
    jFormat1(data){
      if (data == '0') {
        return '男'
      }else{
        return '女'
      }
    },
    jFormat2(data){
      let res = this.groups.filter((item, i) => {
        return item.id == data;
      })
      if(res.length>0)
        return res[0].remark
      else
        return '无部门'
    },
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
</style>
