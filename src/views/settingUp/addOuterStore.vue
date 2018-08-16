<template>
    <div class="addStore">
        <el-button class="addBtn"  @click="dialogVisible = true;title = '新增门店'" size="small" type="primary">新增门店</el-button>
        <el-table
            :data="list"
            
            style="width: 100%">

            <el-table-column
            label="店铺名称"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
            </template>
            </el-table-column>

            <el-table-column
            label="pid"
            >
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.partnerId }}</span>
            </template>
            </el-table-column>
            <el-table-column
            label="创建时间"
            >
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.createTimeString }}</span>
            </template>
            </el-table-column>

            
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 弹出框 -->
        <el-dialog
        :title= title
        :visible.sync="dialogVisible"
        width="30%"
        >

        <el-form   >
            <el-form-item  style="width:500px; margin-left:auto;margin-right:auto"   label-width="120px"  label="店铺名称：">
                <el-input   size="small" v-model="name"></el-input>
            </el-form-item>
            <el-form-item   style="width:500px; margin-left:auto;margin-right:auto"   label-width="120px"  label="pid：">
                <el-input :disabled= "title =='门店编辑'"   size="small" v-model="id"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false ;name ='';id ='';">取 消</el-button>
            <el-button type="primary" @click="addStore">确 定</el-button>
        </span>
        </el-dialog>
    </div>
    
</template>

<script>
import {setOuterStoreList,addOuterStore,editouterStore,deleteouterStore} from '@/api/api.js'
  export default {
    data() {
      return {
        list:[],
        dialogVisible: false,
        name:'',
        id:'',
        title:'',
        zid:'',
      }
      
    },
    mounted(){
        this.getStoreList();
    },

    methods: {
        getStoreList(){
            let data = this.qs.stringify({
                pageNumber:'1'
            })
            setOuterStoreList(data).then(res => {
                console.log(res)
                this.list = res.content.result;
            })
        },
        handleEdit(index, row) {
            this.title = "门店编辑"
            this.dialogVisible = true;
            this.name = row.shopName;
            this.id = row.partnerId;
            this.zid = row.id;
            console.log(index, row);
        },
        handleDelete(index, row) {
            let data = this.qs.stringify({
                "id":row.id
            })

            deleteouterStore(data).then(res => {
                this.$message.success("删除成功!");
                this.getStoreList();

            })

            console.log(index, row);
        },
        // 新增门店
        addStore(){

            if(this.title == "门店编辑"){
                // 编辑
                let data = this.qs.stringify({
                    "shopName":this.name,
                    "partnerId":this.id,
                    "id":this.zid
                })
                editouterStore(data).then(res => {
                    console.log(res)
                    this.$message.success("编辑成功!");
                    this.clear();
                })

            }else{  
                // 新增
                let data = this.qs.stringify({
                    "shopName":this.name,
                    "partnerId":this.id
                })
                addOuterStore(data).then(res =>{
                    if(res.errorCode == 10000){
                        this.$message.success("新增成功!");
                        this.clear();
                    }else if(res.errorCode == 1){
                        this.$message.error(res.message);
                    }


                    
                })
            }
        },
        // 清空数据刷新列表
        clear(){
            this.name = '';
            this.id = '';
            this.zid ='';
            this.dialogVisible = false;
            this.getStoreList();
        }
    }
  }
</script>
<style>

.addBtn{
    margin: 30px 0 20px 0; 
}
.addStore{
    padding:0 150px;
}


</style>

