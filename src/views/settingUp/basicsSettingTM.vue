<template>
    <div class="basicsSetting">
        <div class="title">基础设置</div>
        <el-form  label-width="150px">
            <el-form-item label="付费类型:">
                <el-input readonly="readonly"  class="width_100px" size="small" v-model="circelData.circleType"></el-input>
            </el-form-item>
            <el-form-item label="授权过期时间:">
                <el-input readonly="readonly"  size="small"  class="width_200px" v-model="circelData.authTokenExpiresTime"></el-input>
            </el-form-item>
            <el-form-item label="服务到期时间:">
                <el-input readonly="readonly"  size="small" class="width_200px" v-model="circelData.endDate"></el-input>
            </el-form-item>
            <el-form-item label="转盘领奖网址:">
                <el-input readonly="readonly"  size="small" class="width_200px" v-model="circelData.rewardUrl"></el-input>
            </el-form-item>
            <el-form-item label="收款账号授权过期时间:">
                <el-input  readonly="readonly"   class="width_200px" size="small" v-model="circelData.sellerExpiresTime"></el-input>
                <el-button   @click="dialogVisible = true"  size="small">重新授权</el-button>
            </el-form-item>
            <el-form-item label="会员卡领卡链接:">
                <el-input readonly="readonly"  size="small" v-model="circelData.memberCardUrl"></el-input>
            </el-form-item>
            
            <el-form-item label="自主积分">
                <el-radio-group v-model="circelData.selfPoint">
                <el-radio label="0">否</el-radio>
                <el-radio label="1">是</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item  v-show="!circelData.crmImplClass" label="会员卡前缀:">
                <el-input class="width_100px" size="small" v-model="circelData.cardFront"></el-input>
            </el-form-item>
            <el-form-item label="口碑商圈首页:">
                <el-input class="width_300px" size="small" v-model="circelData.mainUrl"></el-input>
            </el-form-item>
            <el-form-item label="新密码:">
                <el-input type="password" class="width_100px" size="small" v-model="password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码:">
                <el-input    type="password" class="width_100px" size="small" v-model="password1"></el-input>
                <span v-if="passwordIsok == false" class="colorRead"  > 格式不正确</span>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">修改设置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
        title="授权二维码"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <img class="qrCodeImg" :src=circelData.qrCode alt="">
        </el-dialog>
    </div>
</template>
<script>

 import {getCircleSet,setCircleSet} from '../../api/api.js'
  export default {
    data() {
      return {
        circelData:{
           crmImplClass:''     
        },
        dialogVisible: false,
        password:'',
        password1:'',
        passwordIsok:true,
        
      }
    },
    mounted(){
        getCircleSet().then(res =>{  this.circelData = res.content;  console.log(this.circelData)})
    },
    methods: {
      onSubmit() {
        this.passwordRevise()
        if(this.passwordIsok == false){ return false } ;
        var data = this.qs.stringify({
               selfPoint :this.circelData.selfPoint ,
               cardFront :this.circelData.cardFront,
               mainUrl   :this.circelData.mainUrl,
               password  :this.password,
               crmImplClass: this.circelData.crmImplClass
            });
        setCircleSet(data).then(res =>{this.$message('设置成功') })
      },
      handleClose(done) { done();},
      passwordRevise(){
          if(this.password !== this.password1 && this.password1.length > 0){
              this.passwordIsok = false;
          }else{
              this.passwordIsok = true;
          }
      }
    }
  }
</script>
<style>

.basicsSetting{
    width: 900px;
    margin: 0 auto;
    position: relative;
    padding-top: 100px;
}
.basicsSetting .title{
    position: absolute;
    left: -100px;
    font-size: 18px;
    top: 0;
    color: black;
    
}
.basicsSetting .qrCodeImg{
    width: 200px;
    height: 200px;
    
}
.basicsSetting .el-dialog__body{
    text-align: center;
}
.basicsSetting .subheading{
    margin-left: -100px;
}
.basicsSetting .width_100px{
    width: 100px;
}
.basicsSetting .width_200px{
    width: 200px;
}
.basicsSetting .width_300px{
    width: 300px;
}
.basicsSetting .colorRead{
    color: red;
}

</style>
