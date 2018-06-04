<template>
<div class="reg_give_box">
    <!-- <div class="ticket_show">
        <div>
            <img src="../../../assets/images/ticket.png" alt="">
            <span>0元</span>
            <p>活动日期:XXXXX至XXXX</p>
        </div>
    </div> -->
    <div class="ticket_rule  registerbox bottom_margin_50">
        <span class="ticket_title_all ">活动内容</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"  class="regsternameInput" size="small"  ></el-input>
            </el-form-item>
            
            <el-form-item class="registerType"  label="活动开始时间" required>
                <el-col :span="11">
                <el-form-item prop="date1">
                    <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
                <!-- <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-form-item prop="date2">
                    <el-time-picker size="small" type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
                </el-col> -->
            </el-form-item>
            <el-form-item class="registerType" label="活动结束时间" required>
                <el-col :span="11">
                <el-form-item prop="date3">
                    <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date3" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
                <!-- <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-form-item prop="date4">
                    <el-time-picker size="small" type="fixed-time" placeholder="选择时间" v-model="ruleForm.date4" style="width: 100%;"></el-time-picker>
                </el-form-item>
                </el-col> -->
            </el-form-item>
            <el-form-item class="registerType" label="券id" prop="itemId">
                <el-input v-model="ruleForm.itemId"  type="number"  @blur="reviseItemId"   size="small" class="regsternameInput"   ></el-input>
            </el-form-item>

            <el-form-item  class="registerType" label="券类型" prop="region"    >
                <el-select size="small" v-model="ruleForm.region" placeholder="请选择券类型">
                <el-option size="small" label="折扣券" value="DIS"></el-option>
                <el-option size="small" label="代金券" value="MONEY"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item class="registerType"   v-if="ruleForm.region == 'DIS' " label="折扣" prop="discount">
                <el-input v-model="ruleForm.discount" size="small" @blur="reviseDiscount"  type="number"   class="regsternameInput"   ></el-input>
            </el-form-item>
            <el-form-item class="registerType"  v-if="ruleForm.region == 'MONEY'" label="券面额" prop="amount">
                <el-input v-model="ruleForm.amount"  size="small"  @blur="reviseAmount" type="number"  class="regsternameInput"   ></el-input>
            </el-form-item>

            <el-form-item class="registerType" label="最低消费金额" prop="lowLimit">
                <el-input v-model="ruleForm.lowLimit" size="small"   type="number"  @blur="reviseLowLimit"  class="regsternameInput"   ></el-input>
            </el-form-item>

            <el-form-item  class="registerType" label="有效期时间" prop="region"    >
                <el-select size="small" v-model="section" placeholder="券有效期方式">
                <el-option size="small" label="指定时间段" value="1"></el-option>
                <el-option size="small" label="指定天数" value="2"></el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item class="registerType" v-if="ruleForm.section == '1' "   label="券有效期开始" required>
                <el-col :span="11">
                <el-form-item prop="date5">
                    <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date5" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
                <!-- <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-form-item prop="date6">
                    <el-time-picker size="small" type="fixed-time" placeholder="选择时间" v-model="ruleForm.date6" style="width: 100%;"></el-time-picker>
                </el-form-item>
                </el-col> -->
            </el-form-item>
            <el-form-item class="registerType" v-if="ruleForm.section == '1' " label="券有效期结束" required>
                <el-col :span="11">
                <el-form-item prop="date7">
                    <el-date-picker size="small" type="date" placeholder="选择日期" v-model="ruleForm.date7" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
                <!-- <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                <el-form-item prop="date8">
                    <el-time-picker size="small" type="fixed-time" placeholder="选择时间" v-model="ruleForm.date8" style="width: 100%;"></el-time-picker>
                </el-form-item>
                </el-col> -->
            </el-form-item>
            <el-form-item  v-if="ruleForm.section == '2' " class="registerType" label="领取后" prop="validDate">
                <el-input v-model="ruleForm.validDate" type="number" @blur="reviseValidDate"  size="small"  class="registerWidth_50"   ></el-input>天有效
            </el-form-item>
            <el-form-item class="registerType" >
                <el-button size="small" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</div>
</template>
<script>
import {submitRegister} from '../../../api/api';
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          pickStartDate:'',
          pickEndDate:'',
          validStartDate:'',
          validEndDate:'',
          region: 'MONEY',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          date5: '',
          date6: '',
          date7: '',
          date8: '',
          delivery: false,
          type: '',
          resource: '',
          desc: '',
          itemId:'',
          lowLimit:'',
          discount:'',
          amount:'',
          validDate:'',
          section:'1'
          
        },
        section:'1',
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 32, message: '长度在 3 到 32 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date3: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date5: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date7: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ],
          itemId:[
            {  required: true,message: '请填写券id 长度在 3 到 15 个字符', trigger: 'blur'},
            { min: 3, max: 15, message: '长度在 3 到 15 个字符',trigger: 'blur' }
          ],
          lowLimit:[
            { required: true,message: '请填写最低消费金额', trigger: 'blur'},
            { max: 11 , message: '长度最多 8 个字符' ,trigger: 'change'}
          ],
          discount:[
            { required: true,message: '请填写折扣力度', trigger: 'blur'},
            { max: 3 , message: '格式不正确' ,trigger: 'change'}
          ],
          amount:[
            { required: true,message: '请填写券面额 长度最多 8 个字符', trigger: 'blur'},
            { max:11 , message: '长度最多 8 个字符' ,trigger: 'change'}
          ],
          validDate:[
            { required: true,message: '请填写有效期天数', trigger: 'blur'}
          ],
          
        }
      };
    },
    watch: {
        section:function(newSection, oldSection){
            this.ruleForm.section = newSection;
            if(newSection == '1'){
                this.ruleForm.validDate = '';
            }else{
                this.ruleForm.date5 = '';
                this.ruleForm.date7 = '';
            }
        }   
    },
    methods: {
        reviseItemId(){
            if(this.ruleForm.itemId){
                this.ruleForm.itemId = Math.abs(this.ruleForm.itemId).toString();
                this.ruleForm.itemId = parseInt(this.ruleForm.itemId).toString();
                if(this.ruleForm.itemId == "0.00"){
                    this.ruleForm.itemId = ''
                }
            }
        },
        reviseDiscount(){
            if(this.ruleForm.discount){
                this.ruleForm.discount = Math.abs(this.ruleForm.discount);
                this.ruleForm.discount = this.ruleForm.discount.toFixed(1);
            }
        },
        reviseAmount(){
            if(this.ruleForm.amount){
                this.ruleForm.amount = Math.abs(this.ruleForm.amount);
                this.ruleForm.amount = this.ruleForm.amount.toFixed(2);
            }
        },
        reviseLowLimit(){
            if(this.ruleForm.lowLimit){
                this.ruleForm.lowLimit = Math.abs(this.ruleForm.lowLimit);
                this.ruleForm.lowLimit = this.ruleForm.lowLimit.toFixed(2);
            }
        },
        reviseValidDate(){
            if(this.ruleForm.validDate){
                this.ruleForm.validDate = Math.abs(this.ruleForm.validDate);
                this.ruleForm.validDate = Math.ceil(this.ruleForm.validDate);
            }
        },
        submitForm(formName) {
            if(this.ruleForm.date1){
                if(this.ruleForm.date1 < new Date() - 86400000){
                this.$message({
                        message: '活动开始日期不能早于当前日期!',
                        type: 'error'
                    }); 
                    return;
                }
            } 
            if(this.ruleForm.date3){
                if(this.ruleForm.date3 < this.ruleForm.date1){
                this.$message({
                        message: '活动结束日期不能早于开始日期!',
                        type: 'error'
                    }); 
                    return;
                }
            }
            if(this.ruleForm.date5){
                if(this.ruleForm.date5 < this.ruleForm.date1){
                    this.$message({
                        message: '有效期开始日期不能早于活动开始日期!',
                        type: 'error'
                    }); 
                    return;
                }
            }
            if(this.ruleForm.date7){
                if(this.ruleForm.date7 < this.ruleForm.date5){
                    this.$message({
                        message: '有效期结束日期不能早于开始日期!',
                        type: 'error'
                    }); 
                    return;
                }
            }
            this.$refs[formName].validate((valid) => {
            if (valid) {
                // alert('submit!');
                this.ruleForm.date1?this.ruleForm.date1 = this.ruleForm.date1.toLocaleDateString().replace(/\//g,"-"):this.ruleForm.date1 = '';
                this.ruleForm.date3?this.ruleForm.date3 = this.ruleForm.date3.toLocaleDateString().replace(/\//g,"-"):this.ruleForm.date3 = '';
                this.ruleForm.date5?this.ruleForm.date5 = this.ruleForm.date5.toLocaleDateString().replace(/\//g,"-"):this.ruleForm.date5 = '';
                this.ruleForm.date7?this.ruleForm.date7 = this.ruleForm.date7.toLocaleDateString().replace(/\//g,"-"):this.ruleForm.date7 = '';
                let data = [
                this.ruleForm.name,
                // this.changeTimes(this.ruleForm.date1,this.ruleForm.date2),
                // this.changeTimes(this.ruleForm.date3,this.ruleForm.date4),
                this.ruleForm.date1,
                this.ruleForm.date3,
                this.ruleForm.itemId,
                this.ruleForm.region,
                this.ruleForm.lowLimit,
                this.ruleForm.discount,
                this.ruleForm.amount,
                this.ruleForm.date5,
                this.ruleForm.date7,
                // this.changeTimes(this.ruleForm.date5,this.ruleForm.date6),
                // this.changeTimes(this.ruleForm.date7,this.ruleForm.date8),
                this.ruleForm.validDate
                ]
                console.log(data)
                let circleVoucherInfo = [];
                data.forEach((e,index) =>{
                    // if(e){
                    let att = e+"AAA"
                    circleVoucherInfo.push(att)
                    att = ''
                    // }
                
                
                })
                circleVoucherInfo =  circleVoucherInfo.toString().trim().replace(/,/g,"").slice(0,-3)
                // circleVoucherInfo =  circleVoucherInfo.toString().trim().replace(/,/g,"")
                let upData = this.qs.stringify({
                'circleVoucherInfo':circleVoucherInfo
                })

                submitRegister(upData).then( res =>{
                console.log(res)


                if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == 10000){
                        this.$message({
                            message: '恭喜你，创建代金券成功!',
                            type: 'success'
                        });
                        this.$router.push({path: '/registerList'});
                    } else{
                        this.errorMessage = res.message;
                        this.$message(res.message);
                    }

                }).catch(err =>{

                console.log(err)
                })

            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    //设定统一时间格式
        changeTimes(time1,time2){
            if(time1 && time2){
                var sT = time1.toLocaleDateString().replace(/\//g,"-");
                var eT = time2.toLocaleTimeString().replace(/\//g,"-").replace(/上午|下午/g,"");
                return sT+" "+eT
            }

        }
    }
  }
</script>
<style>
.registerbox{
    margin-left: 260px;
}
.regsternameInput{
    width: 360px;
}
.registerType{
    margin-top: 18px;
}
.el-col-2{
  width: 1%;
}
.registerWidth_50{
  width: 50px;
  margin-right: 20px;
}
</style>
