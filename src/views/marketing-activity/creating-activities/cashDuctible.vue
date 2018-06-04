<!--代金券创建s-->
<!--活动营销/单品营销-->
<template>
    <div class="zj-main mainBox">
        <!-- <div class="ticket_show">
            <div>
                <img src="../../../assets/ticket.png" alt="">
                <span>{{money}}元</span>
                <p>活动日期:{{startTime}}至{{endTime}}</p>
            </div>
        </div> -->

        <div class="smallhint" > 小提示：积分商城券池创建</div>
        <div class="ticket_rule  center bottom_margin_50">
            <span class="ticket_title_all">活动内容</span>
            <el-form ref="form" :model="form" label-width="140px">
                <el-form-item class="ticket_title" label="活动名称 :">
                    <el-input size="small"  v-model="form.name" placeholder="请输入活动名称"></el-input>
                    <span  v-if="form.name.length > 30" class="wrongColor"> * 活动名称长度不能超过30个字符</span>
                </el-form-item>

                <el-form-item  label="出资人账号:" >
                    <el-input class="width_200 "   v-model="fundAccount"  size="small"  placeholder="请输入出资人账号" ></el-input>
                </el-form-item>
                 <el-form-item label="活动时间 :">
                    <div class="block">
                        <el-date-picker
                                v-model="time"
                                type="daterange"
                                align="right"
                                size="small"
                                placeholder="选择日期范围"
                                @change="changeTime"
                                :picker-options="pickerOptions2">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="适用门店 :">
                    <div>
                        <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
                        <!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
                        <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
                        <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item label="发放数量 :"  >
                    <el-select size="small"   v-model="emitOption" placeholder="请选择">
                        <el-option
                        v-for="item in optionsNumber"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input class="width_90"  v-model="emitNumber"     v-if="emitOption == '限制'" type="number" placeholder="请输入数量" size="small" ></el-input>
                </el-form-item>
                <el-form-item label="券面额 :">
                    <el-input class="width_90"  type="number"   @blur="denominationalIsOk" size="small" v-model="money" placeholder="请输入"></el-input>
                    元 
                    <!-- <span v-if="jmeIsOk == false"  class="wrongColor">/*劵面额只能为大于0的数字，且长度小于8位</span> -->
                </el-form-item>
                <el-form-item class="ticket_limit " label="最低消费 :">
                    <el-select class="margin_bto10" v-model="form.uselimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                                v-for="item in limitselectdata"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div  v-if="this.form.uselimitselectvalue == 1">
                        <span>消费满 </span>
                        <el-input class="width_90"  type="number"  @blur="reviseNumberX"  size="small" placeholder="金额" v-model="numberX"></el-input>
                        <span>可用</span>
                    </div>
                </el-form-item>
                <el-form-item class="ticket_number" label="券有效期 :">
                    <el-select size="small"   v-model="validity" placeholder="请选择">
                        <el-option
                        v-for="item in optionsValidity"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                     <span v-if="validity == '相对时间'"  >&ensp;券领取后&ensp;</span>
                    <el-input v-if="validity == '相对时间'" class="width_90"   @blur="reviseNumbers"    size="small" v-model="finallyValidity" type="number"
                              placeholder="输入天数"></el-input><span v-if="validity == '相对时间'"  >&ensp;天有效</span>
                    <el-date-picker
                            v-if="validity == '绝对时间'"
                            v-model="finallyValidity1"
                            type="daterange"
                            align="right"
                            size="small"
                            placeholder="选择日期范围"
                            :picker-options="pickerOptions2">
                    </el-date-picker>   
                </el-form-item>
                <el-form-item  label="使用说明:" >
                    <div class="margin_bto10"    v-for=" (item , i)  in instructions"  :key="item.id" >
                        <el-input class="width_300 "  v-model="item.val"   size="small"  placeholder="例如：本优惠券不可兑换现金" ></el-input>
                        <el-button  v-if="instructions.length > 1"   type="danger" size="small" @click="delinstructions(item,i)" class="margin_left50"  circle>删除</el-button>
                    </div>

                    <el-button  v-if="instructions.length <= 4"   @click="addinstructions" size="small" type="primary" round>新增</el-button>
                </el-form-item>

                <el-form-item v-if="isSubmit == true"  >
                    <el-button class="bottom_button" size="small" type="primary" @click="saveMessage">提 交</el-button>
                </el-form-item>
                <el-form-item v-if="isSubmit == false"  >
                    <el-button class="bottom_button" size="small" @click="payAction" type="primary" >立即支付</el-button>
                </el-form-item>
                <!--选择适用门店弹窗-->
                <el-dialog
                        title="选择适用门店"
                        v-model="dialogVisible_queryshops"
                        size="small"
                        top="20%">
                    <div class="kinds_main">
                        <div class="shopkinds_list">
                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"
                                         @change="handleCheckAllChange">全选
                            </el-checkbox>
                            <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                                <div class="check_divbox" v-for="item in Objects"  :key="item.id"  >
                                    <el-checkbox :label="item.shopId"  :key="item.id">{{item.main_shop_name}}</el-checkbox>
                                </div>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
                        <el-button type="primary" @click="queryshops_btn">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {formateDate,formDateSecond,formDateSecond59,formatTimestamp,weekDispose,DateLong} from '../../../api/CommonMethods'
    import {getstorelist,creatCashDuctible,getShopLists} from '../../../api/api';
    export default {
        data() {
            return {
                times:[
                    {
                        value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    }
                ],
                times1:[
                    {
                        value:[new Date(2018, 10 ,10),new Date(2018, 10 ,10)]
                    }
                ],
                checkList:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                checkList1:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                
                choosekinds: '',
                wayskinds: [
                    {value: 'QR_CODE', label: '二维码'},
                    {value: 'SHORT_LINK', label: '短链接'},
                    {value: 'SHOP_DETAIL', label: '店铺主页'},
//                  {value: 'PAYMENT_RESULT',label: '支付成功页'},
//                  {value: 'URL_WITH_TOKEN',label: '口令送'},
                ],
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                checkedShopPid:[],
                shopsnumber: '',
                startTime: '****-**-**',
                endTime: '****-**-**',
                time: '',
                money: '',
                showList: [],
                emitNumber:'',
                emitOption:'限制',
                optionsNumber:[
                    
                    {
                        value: '限制',
                        label: '限制'
                    }
                ],
                finallyValidity:'',
                finallyValidity1:'',
                validity:'相对时间',
                optionsValidity:[
                    {
                        value: '相对时间',
                        label: '相对时间'
                    },
                    {
                        value: '绝对时间',
                        label: '绝对时间'
                    }
                ],
                instructions:[
                    {
                        val:''
                    }
                ],
                formRadio:'1',
                isPresentRadio:'false',
                brandName:'',
                form: {
                    dialogImageUrl: '',
                    dialogVisible: false,
                    numbers:'45',
                    name: '',
                    shop: '门店1',
                    number: '',
                    time: '',
                    detallimitselectvalue:'2',
                    uselimitselectvalue: '',
                    number1: '',
                    number2: '',
                    limittime: '',
                    code_radio: '1',
                    ways: []
                },
                timelimitselectdata:[
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                detallimitselectdata:[
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                limitselectdata: [
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                datelimitselectdata: [
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                hhddatas2: [],
                Objects: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: '一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                choose_goods: false,
                dialogVisible_queryshops: false,
                messageData:{},
                firstTime:'',
                lastTime:'',
                numberX:'',
                jmeIsOk:true,
                priceTickets:'',
                imageUrltologo: '',
                brandLogo:'',//图片id
                urlLogo:'',
                shopid:{id:''},//上传图片带的id
                forbidden_use_date:[],
                fundAccount:'',
                isSubmit:true,
                payUrl:''
                
            }
        },
        mounted:function () {
            this.shopList();
            this.cookie()
        },
        methods: {
            delinstructions(item,index){
                
                if(this.instructions.length > 1){
                    this.instructions = this.instructions.filter( (e,i) => index !==i )
                }
            },
            addinstructions(){

                if(this.instructions.length < 5){
                    this.instructions.push({
                        val:''
                    })
                }
            },
            cookie(){
                function getCookie(cookieName) {                   
                    var strCookie = document.cookie;
                    var arrCookie = strCookie.split("; ");
                    for(var i = 0; i < arrCookie.length; i++){
                        var arr = arrCookie[i].split("=");
                        if(cookieName == arr[0]){
                            return arr[1];
                        }
                    }
                    return "";
                }
                var user_id  = getCookie("ENTITY_ID");

                console.log(user_id)
                this.shopid.id = user_id ;
            },
            logobeforeAvatarUpload(file) {
                this.$message('正在上传');
            },
            logoonsuccess(response, file, fileList) {

                console.log(response)
                if (response.error == 0) {
                    this.$message.success('上传LOGO图片成功!');
                    this.imageUrltologo = URL.createObjectURL(file.raw);
                    this.brandLogo = response.imageId;
                    this.urlLogo = response.url;
                }
                else if(response.error == 1){
                    this.$message(response.message);
                }
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //领券时间3个函数(添加,删除,处理)
            addDomain(){
                this.times.push({
                       value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    })
            },
            removeDomain(time) {
                var index = this.times.indexOf(time)
                if (index !== -1) {
                    this.times.splice(index, 1)
                }
            },
            //核销时间3个函数(添加,删除,处理)
            addDomain1(){
                this.times1.push({
                       value:[new Date(),new Date()]
                    })
            },
            removeDomain1(time) {
                var index = this.times1.indexOf(time)
                if (index !== -1) {
                    this.times1.splice(index, 1)
                }
            },
            payAction(){
                window.open(this.payUrl)
                this.$confirm('请在新打开的页面上完成付款', '提示', {
                confirmButtonText: '支付已完成',
                cancelButtonText: '支付遇到问题',
                type: 'warning'
                }).then(() => {
                    this.$router.push({path: '/voucherList'})
                }).catch(() => {
                });
            },
            saveMessage:function () {
                // 活动名称
                if(this.form.name){
                    this.messageData.brandName =this.form.name;
                }else{
                    this.$message("活动名称不可为空且最大长度为32");
                    return;
                }
                //出资人账号
                this.messageData.fundAccount = this.fundAccount;
                //处理时间选择是否正确
                let date1 = new Date(this.firstTime).getTime();
                let nowTime = new Date().getTime();
                if(date1 + 86400000 > nowTime){
                    this.messageData.publishStartTime=this.firstTime;
                    this.messageData.publishEndTime=this.lastTime;

                }else{
                    this.$message("请选择正确的时间格式");
                    return;
                }
                // 使用说明
                this.messageData.isShare = this.isPresentRadio
                let str = [];
                this.instructions.forEach(e => {
                    str.push(e.val)
                })
                this.messageData.voucherDescription = str.toString().replace('"','')
                // 券有效期
                if(this.validity == '相对时间'){
                    // 相对时间
                    this.messageData.voucherDataType   	 = "RELATIVE";
                    this.finallyValidity1 = '';
                    this.messageData.start = "";
                    this.messageData.end = "";
                    this.messageData.duration = this.finallyValidity;

                }
                if(this.validity == '绝对时间'){
                    // 绝对时间
                    this.messageData.voucherDataType   	 = "FIXED";
                    this.finallyValidity = '';
                    this.messageData.duration  = "";
                    this.messageData.start = formateDate(this.finallyValidity1[0]).replace(/\//g,'-');
                    this.messageData.end = formateDate(this.finallyValidity1[1]).replace(/\//g,'-');
                }
                this.messageData.unit = 'DAY';
                //券面额
                if(!this.jmeIsOk){
                    this.$message("券面额不正确");
                    return;
                }else{
                    this.messageData.amount=this.money;
                }   
                //门店信息
                if(this.checkedshopstrue){
                    this.messageData.STORE = this.checkedshops.toString();
                }else{
                    this.$message("请选择门店");
                    return;
                }
                 //数量
                if(this.emitOption == "不限制"){

                    this.messageData.voucherQuantity="9999"
                }  
                if(this.emitOption == "限制"){
                    this.messageData.voucherQuantity=this.emitNumber;
                }               
                //使用条件 
                if(this.form.uselimitselectvalue == 1){
                    if(this.numberX){
                        this.messageData.floorAmount=this.numberX;
                    }else{
                        this.$message("消费金额必须大于0");
                        return;
                    }
                }else if(this.form.uselimitselectvalue == 2){
                    this.messageData.floorAmount='0.01';
                }
                delete this.messageData['publish_channels_type'];
                console.log(this.messageData)

                let data=this.qs.stringify(this.messageData);
                creatCashDuctible(data).then(res=>{

                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == 10000){

                        this.isSubmit = false;
                        this.payUrl = res.content;
                        this.$message({
                            message: '恭喜你，创建代金券成功!',
                            type: 'success'
                        });
                        // this.$router.push({path: '/voucherList'});
                    } else{
                        this.errorMessage = res.message;
                        this.$message(res.errorCode);
                    }

                         


                        
                    })
            },
            shopList: function () {
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000'
                });
                getShopLists(data).then(res=>{

                    console.log(res)
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else{
                            this.Objects=res.content.resultList;
                        }
                    })
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].id);
                }
                this.checkedshops = event.target.checked ? this.hhddatas2 : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.Objects.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;

                
            },
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            // 上架门店确定
            queryshops_btn() {
                this.checkedShopPid = [];
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
                this.Objects.forEach(e =>{
                    this.checkedshops.forEach(k =>{
                        if(e.shopId == k){
                            this.checkedShopPid.push(e.pId)
                        } 
                    })
                })
                
            },
            changeTime: function () {
                this.startTime = formateDate(this.time[0]);
                this.endTime = formateDate(this.time[1]);
                this.firstTime = formDateSecond(this.time[0]);
                this.lastTime = formDateSecond59(this.time[1]);
                
            },
            selectChange: function () {
            },
            denominationalIsOk(){ //判断券面额输入是否正确
                this.money = Math.abs(this.money);
                this.money = this.money.toFixed(2)
                if(this.money == '0.00' || this.money.toString().length > '11'){
                    this.money = ''
                }
                var reg = /^([^0]|.{2,})$/;
                let money = parseFloat(this.money);
                if(reg.test(money)&& money > 0 && this.money.length <=8){
                this.jmeIsOk = true;
                }else{
                this.jmeIsOk = false;
                }
            },
            numberIsOk(){  //判断代金券数量输入是否正确
                this.form.number = Math.abs(this.form.number);
                this.form.number = parseInt(this.form.number);
                if(this.form.number == '0.00' ||this.form.number.toString().length > '8' ){
                    this.form.number = ''
                }
                var reg = /^\d{1,4}$/;
                if(reg.test(this.form.number) && this.form.number > 0 ){
                    this.priceTickets = false;
                }else{
                    this.priceTickets = true;
                }
            },
            reviseNumbers(){
                this.form.numbers = Math.abs(this.form.numbers);
                this.form.numbers = parseInt(this.form.numbers);
                if(this.form.numbers  == '0.00'||this.form.numbers.toString().length > '8'){
                    this.form.numbers = ''
                    
                }
            },
            reviseNumberX(){
                this.numberX = Math.abs(this.numberX);
                this.numberX = this.numberX.toFixed(2);
                if(this.numberX == '0.00' || this.numberX.toString().length > '11'){
                    this.numberX = ''
                }
            }
            
           
            

        },

    }
</script>

<style>

    .active1 {
        /*border: 1px solid red;*/
    }

    .ticket_title_all {
        display: inline-block;
        margin-top: 10px;
        padding-left: 8px;
        border-left: 10px solid #00a0e9;
    }

    .ticket_show {
        text-align: center;
        width: 39%;
        display: inline-block;
        margin-top: 80px;
        justify-content: center;
    }

    .ticket_show div {
        display: inline-block;
        height: 450px;
        width: 230px;
        margin: 50px auto;
        position: relative;
    }

    .ticket_show div img {
        height: 450px;
        width: 230px;
        
        display: inline-block;
        z-index: 10;
    }

    .ticket_show div span {
        display: inline-block;
        position: absolute;
        width: 100px;
        top: 150px;
        left: 65px;
        text-align: center;
        /*outline:1px solid orange;*/
        z-index: 50;
        font-size: 20px;
    }

    .ticket_show div p {
        display: inline-block;
        width: 195px;
        text-align: center;
        /*outline:1px solid red;*/
        position: absolute;
        font-size: 12px;
        top: 180px;
        left: 15px;
        z-index: 60;
    }

    .ticket_tip {
        line-height: 20px;
        display: block;
        color: #888;
        font-size: 12px;
    }



    .ticket_title .el-input {
        width: 260px;
    }

    /*.ticket_limit .el-input {
      width: 260px;
    }*/

    .width_90 {
        width: 90px !important;
    }

    .choose_goods_main {
        height: 500px;
    }

    .choose_goods_main .main_left {
        width: 25%;
        float: left;
        height: 100%;
    }

    .choose_goods_main .main_left .left_box {
        height: 100%;
        margin: 10px;
    }

    .choose_goods_main .main_left .left_box .box_title {
        height: 40px;
        background-color: #00a0e9;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .box_title span {
        line-height: 40px;
        color: white;
        margin-left: 14px;
    }

    .choose_goods_main .main_left .left_box .box_list {
        height: calc(100% - 40px);
        -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        overflow: auto;
        border: 1px solid #dddddd;
    }

    .box_list .list {
        display: block;
        padding: 5px 10px;
        margin: 0px;
    }

    .choose_goods_main .main_left .left_box .box_list::-webkit-scrollbar {
        display: none;
    }

    .choose_goods_main .main_right {
        float: left;
        width: 75%;
        height: 100%;
    }

    .main_right .right_query_input {
        width: 160px;
        margin-right: 30px;
    }

    .main_right .right_title_input {
        width: 50px;
    }

    .right_box {
        margin: 10px;
    }

    .right_box_title {
        margin: 20px 0;
    }

    .right_box .el-table__body-wrapper {
        height: 385px;
    }

    .setways .el-select, .setways .el-select .el-input {
        width: 260px;
    }

    .bottom_margin_200 {
        margin-bottom: 200px;
    }

    .shopkinds_list {
        overflow: auto;
        height: 200px;
        background-color: rgba(221, 221, 221, 0.5);
        border-radius: 4px;
    }
    .display_i_b{
        display: inline-block;
    }
    .shopkinds_list .check_divbox {
        margin: 6px 6px 0 6px;
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .check_choose_list .el-table__body-wrapper {
        height: 385px;
    }
    .margin_b_20{
        display: inline-block;
    }

    .wrongColor{
        color: red;
    }
   .center{
       margin-left: 25%;
   }
   .width_50{
       width: 50px;
   }
   .width_100{
       width: 100px;
   }
   .width_150{
       width: 150px;
   }
   .width_200{
       width: 200px;
   }
   .width_300{
       width: 300px;
   }
   .margin_bto10{
       margin-bottom: 10px;
   }
   .margin_tp20{
       margin-top: 20px;
   }
   .margin_left50{
       margin-left: 50px;
   }
   .mainBox{
       position: relative;
   }
   .smallhint{
       position: absolute;
       left: 5px;
       top: 0;
       font-size: 12px;
   }
   .el-message-box__btns button{
       padding:10px 40px;
       margin-top: 30px;
       margin-bottom: 20px;
       width: 166px;
   }
   .el-message-box__btns {
       text-align: center;
   }
</style>
