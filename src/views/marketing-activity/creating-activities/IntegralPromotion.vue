<!--积分促销-->
<template>
    <div class="qs_mian">
        <div class="details">
            <span class="ticket_title_all">积分活动内容</span>
            <el-form ref="form" class="active_content" label-width="150px">
                <el-form-item class="active_input_b" label="活动名称 : ">
                    <el-input size="small" placeholder="请输入活动名称"      v-model="data.pointName"></el-input>
                </el-form-item>
                <el-form-item class="active_input_b" label="促销方式 : ">
                    <el-radio class="radio" v-model="radio" label="1">积分倍率</el-radio>
                    *
                    <el-input size="small" @blur="reviseProbability"  type="number" placeholder="请输入倍率" class="zj-input" v-model="data.times"></el-input>
                    <br>
                    <span class="zj-spans">提示：用户在指定的时间段内消费,获得积分翻N倍</span>
                    <br>
                    <el-radio class="radio" v-model="radio" label="2">增送额外积分</el-radio>
                    <br>
                    <div class="ewjf_items" v-for="(item,index) in items">
                        消费满
                        <el-input size="small" v-model="item.manjine"    type="number"  @blur="reviseManjine(index)"  placeholder="金额" class="zj-input"></el-input>
                        <span>元，可获得额外百分之</span>
                        <el-input size="small" v-model="item.shuzi" placeholder="数字" @blur="reviseShuzi(index)"  type="number"  class="zj-input"></el-input>
                        <span>积分</span>
                        <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain1(item)">删除</el-button>
                    </div>
                    <el-button class="add_item" type="primary" v-if="items.length < 3" @click="addDomain1">新增
                    </el-button>
                </el-form-item>
                <el-form-item class="active_input_b" label="活动优先级 : ">
                    <el-input size="small" placeholder="数字"  type="number"  @blur="reviseActivey"   class="zj-input" v-model="data.activey"></el-input>
                    <br>
                    <span class="zj-spans">提示：如促销活动规则发生重叠，则优先高的生效（数字越大，优先级越高）</span>
                </el-form-item>
                <el-form-item class="active_input_b" label="活动时间 : ">
                    <el-date-picker v-model="time" type="daterange" size="small" align="right" placeholder="选择日期范围"
                                    @change="changeTime" :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="active_input_b" label="促销时间 : ">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="星期一"></el-checkbox>
                        <el-checkbox label="星期二"></el-checkbox>
                        <el-checkbox label="星期三"></el-checkbox>
                        <el-checkbox label="星期四"></el-checkbox>
                        <el-checkbox label="星期五"></el-checkbox>
                        <el-checkbox label="星期六"></el-checkbox>
                        <el-checkbox label="星期日"></el-checkbox>
                    </el-checkbox-group>
                    <div class="neiform">
                        <div v-for="(time,index) in times" class="margin_b_20">
                            <el-time-picker
                                    is-range
                                    v-model="time.value"
                                    placeholder="选择时间范围">
                            </el-time-picker>
                            <el-button class="detale_btn" type="danger" v-if="index != 0"
                                       @click.prevent="removeDomain(time)">删除
                            </el-button>

                        </div>
                        <el-button type="primary"    v-if="times.length < 5" @click="addDomain">新增</el-button>
                    </div>
                    <p class="zj-spans">提示 : 促销时间段不可重叠,否则创建不成功!</p>
                </el-form-item>
                <el-form-item label="适用门店 : ">
                    <div>
                        <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
                        <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
                        <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店
                        </el-button>
                    </div>
                </el-form-item>

                <el-form-item label="活动备注 : ">
                    <el-input class="card_des_set" type="textarea" :rows="5" resize='none' placeholder="请输入活动描述"
                              v-model="data.memo">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="bottom_button" size="small" :disabled="disabled" type="primary" @click="surRefer">
                        确认
                    </el-button>
                </el-form-item>

            </el-form>
            <!--选择适用门店弹窗-->
            <el-dialog title="选择适用门店" v-model="dialogVisible_queryshops" size="small" top="20%">
                <div class="kinds_main">
                    <div class="shopkinds_list">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                            全选
                        </el-checkbox>
                        <el-checkbox-group v-model="checkedshops" @change="handleCheckedCitiesChange">
                            <div class="check_divbox" v-for="item in Objects">
                                <el-checkbox :label="item.id">{{item.main_shop_name}}</el-checkbox>
                            </div>
                        </el-checkbox-group>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
                    <el-button type="primary" @click="queryshops_btn">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {getShopLists, integralNow, getLoginStatus, pointBased} from '../../../api/api'
    import {formateDate, checkRate, weekDispose, DateLong} from '../../../api/CommonMethods'

    export default {
        data() {
            return {
                items: [
                    {
                        manjine: '',
                        shuzi: ''
                    }
                ],
                times: [
                    {
                        value: [new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                    }
                ],
                checkList: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
                radio: '',
                disabled: false,
                totalPoint: '',
                data: {
                    pointName: '',
                    times: '',
                    money: '',
                    point: '',
                    activey: '',
                    startDate: '',
                    endDate: '',
                    memo: ''
                },
                shopsnumber: '',
                dialogVisible_queryshops: false,
                isIndeterminate: true,
                checkAll: false,
                checkedshops: [],
                checkedshopstrue: [],
                Objects: [],
                hhddatas2: [],
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                time: '',
            }
        },
        mounted: function () {
            let data = this.qs.stringify({
                pageNumber: '1',
                pageSize: '10000'
            });
            this.getLsit(data);
        },
        methods: {
            reviseProbability(){
                this.data.times = Math.abs(this.data.times);
                this.data.times = this.data.times.toFixed(2);
                if(this.data.times == '0.00' || this.data.times.length >12){
                    this.data.times = ''
                }
            },
            reviseManjine(index){
                this.items[index].manjine = Math.abs(this.items[index].manjine);
                this.items[index].manjine = parseInt(this.items[index].manjine);
                if(this.items[index].manjine == '0.00' || this.items[index].manjine.toString().length > '8' ){
                    this.items[index].manjine = ''
                }

                console.log()



            },
            reviseShuzi(index){
                this.items[index].shuzi = Math.abs(this.items[index].shuzi);
                this.items[index].shuzi = parseInt(this.items[index].shuzi);
                if(this.items[index].shuzi == '0.00' ||this.items[index].shuzi.toString().length > '8' ){
                    this.items[index].shuzi = ''
                }
            },
            reviseActivey(){
                this.data.activey = Math.abs(this.data.activey)
                this.data.activey = parseInt(this.data.activey);
                if(this.data.activey == '0.00' || this.data.activey.toString().length > '8'){
                    this.data.activey = ''
                }
            },
            addDomain1() {
                this.items.push({
                    manjine: '',
                    shuzi: ''
                })
            },
            removeDomain1(time) {
                var index = this.items.indexOf(time);
                if (index !== -1) {
                    this.items.splice(index, 1)
                }
            },
            //领券时间3个函数(添加,删除,处理)
            addDomain() {

                this.times.push({
                    value: [new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                })
            },
            removeDomain(time) {
                let index = this.times.indexOf(time);
                if (index !== -1) {
                    this.times.splice(index, 1)
                }
            },
            verify: function (data) {
                checkRate(data);
                if (checkRate(data) == false) {
                    this.$message({
                        message: '请填写正整数!',
                        type: 'warning'
                    });
                }
            },
//            提交信息
            surRefer: function () {
                let message = {};

                let re = {
                    positiveIntegerDecimal:/^([1-9][0-9]*)+(.[0-9]{1,2})?$/,     // 非零开头的最多带两位小数的数字
                    positiveInteger:/^[1-9]+$/                                   // 非零开头数字
                }
                if (this.radio == 1) {

                   if(re.positiveIntegerDecimal.test(this.data.times)){
                        message.times = this.data.times;
                   }else{
                        this.$message('积分倍率格式不对');
                        return
                   }      




                } else if (this.radio == 2) {
                    let dataList = '';
                    for (let i = 0; i < this.items.length; i++) {

                        if(re.positiveInteger.test(this.items[i].manjine) && re.positiveInteger.test(this.items[i].shuzi)  ){
                            let a = this.items[i].manjine;
                            let b = this.items[i].shuzi;
                            let c = a + '-' + b;
                            if (i == 0) {
                                dataList = c;
                            } else {
                                dataList = dataList + ';' + c
                            }

                        }else{
                            this.$message('赠送额外积分的金额或百分数格式错误');
                            return;
                        }

                        
                    }
                    message.extendPoint = dataList;
                }

//                if (!this.data.pointName || !this.data.activey || !this.data.startDate || !this.data.endDate || !this.checkedshops || !this.data.memo) {
//                    this.$message({
//                        message: '信息填写不完整!',
//                        type: 'warning'
//                    });
//                } else {


                
                if(this.data.pointName.length <=0 ){
                    this.$message('请输入活动名称');
                    return;
                }else{
                    message.title = this.data.pointName;
                }if(this.data.pointName.length >= 32){
                    this.$message('活动名称过长 最大长度为32');
                    return;
                }else{
                    message.title = this.data.pointName;
                }

                if(re.positiveInteger.test(this.data.activey)){
                    message.sortNum = this.data.activey;
                }else{
                    this.$message('活动优先级输入格式错误');
                    return;
                    
                }

                //处理时间选择是否正确
                let date1 = new Date(this.data.startDate).getTime();
                let nowTime = new Date().getTime();

                if(date1 + 86400000 > nowTime){
                    message.startDate = this.data.startDate;
                    message.endDate = this.data.endDate;

                }else{

                    this.$message("请选择正确的活动时间段格式");
                    return;
                }

                message.shopIds = this.checkedshops.join();
                message.memo = this.data.memo;
//                }
                

                let newArrTime = []
                this.times.forEach(e =>{
                    newArrTime.push({
                        startTime : e.value[0].getTime(),
                        endTime   :e.value[1].getTime()
                    })
                })


                for(var i=0;i<newArrTime.length;i++){
                    if(newArrTime[i].startTime == newArrTime[i].endTime){
                        this.$message("领券开始时间不可以等于结束时间");
                        return;
                    }
                }
                
                var startTimeArr = [];
                var endTimeArr = [];
                var thatThis = this;
                (newArrTime || []).map(function(item) {
                    startTimeArr.push(item.startTime);
                    endTimeArr.push(item.endTime);
                    
                });
                var allStartTime = startTimeArr.sort();
                var allEndTime = endTimeArr.sort();
                var result = 0;
                for(var k=1;k<allStartTime.length;k++){
                    if (allStartTime[k] <= allEndTime[k-1]){
                        result+=1;
                    }

                }
                // return result>0;

                if(result > 0){
                    this.$message("促销时间段不能重叠");
                    return;

                }else{
                    message.promotionWeek = weekDispose(this.checkList);
                    message.promotionTime = DateLong(this.times);

                }

                let data = this.qs.stringify(message);
                console.log(message);
                pointBased(data).then(res => {
                    this.disabled = false;
                    if (res.errorCode == 10000) {
                        this.$message({
                            message: '保存成功!已跳转到活动列表',
                            type: 'success'
                        });
                        this.$router.push({path: '/rewardPromotion'});
                    } else if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else if (res.errorCode == 20001) {
                        this.disabled = false;
                        this.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                })
            },
//              获取门店列表
            getLsit(data) {
                getLoginStatus().then(res => {
                    if (res == false) {
                        this.$router.push({path: '/login'});
                    }
                });
                getShopLists(data).then(res => {
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else {
                        this.Objects = res.content.resultList;
                    }

                })
            },
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (let i = 0; i < this.Objects.length; i++) {
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
            //    上架门店确定
            queryshops_btn() {
                this.dialogVisible_queryshops = false;
                this.checkedshopstrue = this.checkedshops;
                this.shopsnumber = this.checkedshopstrue.length;
            },
            changeTime: function () {
                if (!this.time[0] == '') {
                    this.data.startDate = formateDate(this.time[0]);
                    this.data.endDate = formateDate(this.time[1]);
                }

            }
        }
    }

</script>
<style scoped>
     *{
         font-size: 12px;
     }           
    .ewjf_items {
        display: inline-block;
        padding-left: 24px;
        font-size: 13px;
    }

    .ewjf_items .el-button {
        padding: 0 10px;
        height: 28px;
        line-height: 28px;
        margin-left: 10px;
    }

    .add_item {
        padding: 0 8px;
        height: 28px;
        line-height: 28px;
        margin-left: 5px;
    }

    .display_i_b {
        display: inline-block;
    }

    .zj-input {
        width: 90px !important;
    }

    .zj-spans {
        display: inline-block;
        color: red;
        font-size: 10px;
    }

    .details {
        width: 750px;
        /*outline: 1px solid orange;*/
        margin: 20px auto;
    }

    .active_rule .el-input {
        width: 100px;
    }

    .active_input_b .el-input {
        width: 250px;
    }

    .card_des_set {
        width: 250px;
    }

    .active_content {
        margin-top: 30px;
    }

    .shopkinds_list {
        overflow: auto;
        height: 200px;
        background-color: rgba(221, 221, 221, 0.5);
        border-radius: 4px;
    }

    .shopkinds_list .check_divbox {
        margin: 6px 6px 0 6px;
        width: 165px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
    }

    .pop-small-size {
        color: red !important;
        font-size: 12px !important;
    }

    .pop-add-model {
        /*outline: 1px solid red;*/
        margin-left: 150px;
        width: 100%;
        margin-bottom: 10px;
    }

    .pop-add-model > .el-input {
        width: 100px;
    }

    .pop-add-model > span {
        font-size: 14px;
        color: #48576a;
    }

    .pop-add-model > input {
        width: 100px;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #bfcbd9;
        box-sizing: border-box;
        color: #1f2d3d;
        font-size: inherit;
        height: 30px;
        line-height: 1;
        outline: 0;
        padding: 3px 10px;
        margin-left: 10px;
    }

    .pop-add-model > p {
        font-size: 14px;
        margin-top: 5px;
        color: #f4333c;
    }

    .neiform .el-input {
        height: 30px;
    }

    .neiform .el-button {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        vertical-align: bottom;
    }

    /*.neiform .margin_b_20 {
        margin-bottom: 10px;
    }*/

    .detale_btn {
        vertical-align: middle;
    }
</style>