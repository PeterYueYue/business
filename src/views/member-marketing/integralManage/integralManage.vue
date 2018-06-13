
<style>
.businessInformation{
    text-align: right;
    margin-right: 20px;
    font-size: 12px;
}
.head{
    padding-top: 20px;
    border-bottom: 1px solid #cccccc;
}
.businessInformation span{
    color: #20a0ff;
    cursor: pointer;
}
.integralbox{
    padding: 0 10px;
}
.integralTitle .block{
    width: 9px;
    height: 25px;
    background-color: #20a0ff;
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    margin-top: 20px;
}
.intlist{
    margin-left: 5px;
    margin-top: 24px;
    display: inline-block;
    font-size: 12px;
    font-weight: 400;

}
.searchbox .el-input{
    display: inline-block;
    vertical-align: top;
    width: 200px;
    margin-right: 40px;
}
.searchbox .el-button{
    display: inline-block;
    vertical-align: top;
    width: 60px;
}
.searchbox{
    padding-left: 50px;
    font-size: 12px;
    margin-top: 20px;
    line-height: 30px;
    position:relative;
}
.addAnyting{
    position:absolute;
    right: 20px;
    top:0;
}
.tableList{
    margin-top: 20px;
}
.popupBox{
    position: absolute;
    top: 0;
    left: 0;
    
    width: 100%;
    height:100%;
    background-color:rgba(0, 0, 0, .5);
    z-index: 2;

}
.addnewproject{
    width: 800px;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    box-shadow:0 1px 3px rgba(0,0,0,.3);
    border-radius: 3px;
    height: 400px;
    

}
.addnewproject .title{
    text-indent: 10px;
    font-size: 15px;
    font-weight: 400;
    color: #1f2d3d;
    margin: 0;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    
}
.addnewproject .inputany{
    width: 200px;
}
.addnewproject .el-form-item{
    margin-top: 10px;
}
.addnewproject .el-select{
    width: 70px;
}
 .popupBox.el-button--small{
    padding:  7px 32px;


}
.handlBtn{
    border: none;
    color: #20a0ff;
    background-color: rgba(0, 0, 0, 0);
    
}
.deleteBtn{
    color: red;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    
}
.deleteBtn:hover{
    background-color: rgba(0, 0, 0, 0);
    color: red;
}
.buttons{
    text-align: center;
}
</style>

<template>
    <div class="integralbox">

        <header class="head">
            <div class="businessInformation ">
                会员积分业务页面链接：http://********.com 
                <span  
                v-clipboard:copy="message"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                
                >复制</span>
            </div>
        </header>
        <section class="content">
            <div class="integralTitle">
                <span class="block"></span>
                <span class="intlist">积分管理员列表</span>
            </div>
            <div class="searchbox">
                姓名：<el-input v-model="searchName" size="small" placeholder="请输入内容"></el-input>
                手机号：<el-input v-model="searchPhone" size="small" placeholder="请输入内容"></el-input>
                <el-button size="small" type="primary">搜索</el-button>
                <el-button class="addAnyting" @click="isShowpopupBox = true" size="small" type="primary">＋新增</el-button>
            </div>
            <div class="tableList">
                <el-table 
                        
                        :data="list"
                        style="width: 100%">
                    <el-table-column                        
                            prop="index"   
                            width="100"                       
                            label="序号">
                    </el-table-column>
                    <el-table-column                        
                            prop="name"
                            width="150"
                            label="姓名">
                    </el-table-column>                   
                    <el-table-column
                            prop="sex"
                            width="60"
                            label="性别">                       
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机号码(账号)">
                    </el-table-column>
                    <el-table-column label="启用状态">
                        <template slot-scope="scope">
                            <el-switch
                            v-model="scope.row.enableStr"
                            @change="changeState(scope)"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="160"
                            prop="createDate"
                            label="创建日期">
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="danger"
                        class="deleteBtn"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                        class="handlBtn"
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        
                    </template>
                    </el-table-column>
                    
                </el-table>
                <!-- <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :page-size="10"
                        layout="total, prev, pager, next,jumper"
                        :total="totalPage"
                        class="foot_nav">
                </el-pagination> -->
                <div  v-show="isShowpopupBox"  class="popupBox">
                    <div class="addnewproject">
                        <div class="title">
                            新增积分管理
                        </div>
                        <el-form  :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                            <el-form-item label="姓名">
                                <el-input class="inputany" size="small" v-model="formLabelAlign.name"></el-input>
                            </el-form-item>                          
                            <el-form-item label="性别">
                                <!-- <el-input size="small" v-model="formLabelAlign.region"></el-input> -->
                                <el-select size="small"      v-model="sex" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.sex"
                                    :label="item.label"
                                    :value="item.sex">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input  class="inputany" size="small" v-model="formLabelAlign.mobil"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input  class="inputany" size="small" v-model="formLabelAlign.password1"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input  class="inputany" size="small" v-model="formLabelAlign.password2"></el-input>
                            </el-form-item>
                            <el-form-item label="启用状态">
                                <el-switch  v-model="formLabelAlign.delivery"></el-switch>
                            </el-form-item>
                            <el-form-item class="buttons"  >
                                <el-button size="small" type="primary" @click="onSubmit">提交</el-button>
                                <el-button size="small" @click="isShowpopupBox = false"  >返回</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div  v-show="isShowRedactBox"  class="popupBox">
                    <div class="addnewproject">
                        <div class="title">
                            积分管理员编辑
                        </div>
                        <el-form  :label-position="labelPosition" label-width="80px" :model="compileForm">
                            <el-form-item label="姓名">
                                <el-input class="inputany" size="small" v-model="compileForm.name"></el-input>
                            </el-form-item>                          
                            <el-form-item label="性别">
                                <!-- <el-input size="small" v-model="formLabelAlign.region"></el-input> -->
                                <el-select size="small"      v-model="sex" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.sex"
                                    :label="item.label"
                                    :value="item.sex">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input disabled="true"  class="inputany" size="small" v-model="compileForm.mobil"></el-input>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input  class="inputany" size="small" v-model="compileForm.password1"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input  class="inputany" size="small" v-model="compileForm.password2"></el-input>
                            </el-form-item>
                            <el-form-item label="启用状态">
                                <el-switch  v-model="compileForm.delivery"></el-switch>
                            </el-form-item>
                            <el-form-item class="buttons"  >
                                <el-button size="small" type="primary" @click="compile">提交</el-button>
                                <el-button size="small" @click="isShowRedactBox = false"  >返回</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import {getintegralManagelist,disablePointer,addvipUser,enablePointer,deletevipUser,redactUser} from '@/api/api.js'
export default {    
    data(){
        return{
            message: 'Copy These Text',
            searchName:'',
            searchPhone:'',
            list:[],
            onOrOff:true,
            labelPosition: 'right',
            labelPosition: 'right',
            formLabelAlign: {
            name: '',
            mobil: '',
            password1: '',
            password2: '',
            delivery:false
            },
            compileForm:{
                name: '',
                mobil: '',
                password1: '',
                password2: '',
                delivery:false
            },
            options: [{
            sex: '男',
            label: '男'
            }, {
            sex: '女',
            label: '女'
            }],
            sex: '男',
            isShowpopupBox:false,
            isShowRedactBox:false,
            userMessage:'',

        }
    },
    mounted(){
        this.getDataList()
    },
    methods:{
        handleEdit(index,row){

            this.userMessage = row;
            this.compileForm.name = row.name;
            this.compileForm.mobil = row.mobile;
            this.sex  = row.sex;
            this.compileForm.password = row.password;
            this.isShowRedactBox = true;
        },
        handleDelete(index,row){
            console.log(index,"222")
            console.log(this.list[index].id)
            var data = this.qs.stringify({
                id: this.list[index].id,
            });
            deletevipUser(data).then(res =>{
                this.getDataList()
                this.$message('删除成功');
                console.log(res)

            })

        },
        onSubmit() {  //新增
            var data = this.qs.stringify({
                pointerInfo:`${this.formLabelAlign.mobil}AAA${this.formLabelAlign.password1}AAA${this.formLabelAlign.name}AAA${this.sex}`          
            });
            addvipUser(data).then(res =>{
                this.$message('提交成功');
                this.getDataList()
                this.isShowpopupBox = false;
            })
        },
        compile(){ //编辑
            console.log(this.userMessage)


            var data = this.qs.stringify({
                pointerInfo:`${this.formLabelAlign.mobil}AAA${this.formLabelAlign.password1}AAA${this.formLabelAlign.name}AAA${this.sex}`          
            });
            redactUser(data).then(res => {
                console.log(res)
            })


        },
        changeState(scope){


            console.log(scope)
            var data = this.qs.stringify({
                id: this.list[scope.$index].id,
            });
            if(scope.row.enableStr == false) {
                disablePointer(data).then(res =>{
                    this.getDataList()
                    console.log(res,"禁止状态")
                })
            } else if(scope.row.enableStr == true){
                enablePointer(data).then(res =>{
                    this.getDataList()
                    console.log(res,"启用状态")
                })
            }
        },
        getDataList(){
            var data = this.qs.stringify({
                pageNumber: '1',
                name: '',
                mobile: '',               
            });          
            getintegralManagelist(data).then(res =>{
                this.list = res.content.result;
                this.list.forEach((e,i) =>{
                    e.index = (i+1)
                })
            })
        },
        onCopy: function (e) {
            this.$message('复制成功');
        },
        onError: function (e) {
        alert('Failed to copy texts')
        }
    }
}
</script>

