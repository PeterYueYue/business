
<style>

.padding_16 .f_r .el-input--small,.padding_16 .f_r .el-select{
    width: 100px !important;
}
.margin_r_10{
    margin-right: 10px;
}
</style>

<template>
    <div class="padding_16">
        <div class="tab_header padding_t_l_r_0">
            <el-button type="primary"  @click="addgift_btn">&#X3000;+新增商品&#X3000;</el-button>
            <el-button type="primary"  @click="plchoose(0)">上架已选中礼品</el-button>
            <el-button type="primary"  @click="plchoose(1)">下架已选中礼品</el-button>
            <!--<el-button type="primary"  @click="showallgifts">显示所有已上架礼品</el-button>-->
            <div class="f_r">
                <span>商品类型 : </span>
                <el-select v-model="typeSelect" class="margin_r_10"  placeholder="请选择" size="small" @change="selectChange">
                    <el-option
                    v-for="item in typeSelectData"
                    :key="item.type"
                    :label="item.text"
                    :value="item.type">
                    </el-option>
                </el-select>
                <span>商品状态 : </span>
                <el-select v-model="selectvalue" class="margin_r_10" placeholder="请选择" size="small"  @change="selectChange">
                    <el-option
                    
                    v-for="item in selectdata"
                    :key="item.type"
                    :label="item.text"
                    :value="item.type">
                    </el-option>
                </el-select>
                <span>商品名称 : </span>
                <el-input class="width_150" size="small"  v-model="queryacticvename" placeholder="请输入商品名"></el-input>
                <el-button class="query_button" type="primary" size="small"  @click="query_gift_btn">搜 索</el-button>
            </div>
        </div>
        <div class="tab_list"   
        
        v-loading="loading2"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <div class="block">
                <el-table
                :data="tableData"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55"> 
                    </el-table-column>
                    <el-table-column width="25" prop="index" label="序号" >
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" >
                    </el-table-column>
                    <el-table-column label="商品图片">
                        <template slot-scope="scope">
                            <div class="gift_table_imgbox">
                                <img :src="scope.row.logo" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="商品类型">
                        <template slot-scope="scope">
                            <p v-if="scope.row.productSource == 'SELF'&&scope.row.productType == 'MONEY'">代金券</p></p>
                            <p v-if="scope.row.productSource == 'SELF'&&scope.row.productType == 'RATE'">折扣券</p></p>
                            <p v-if="scope.row.productSource == 'SELF'&&scope.row.productType == 'EXCHANGE'">兑换券</p></p>
                            <p v-if="scope.row.productSource == 'SELF'&&scope.row.productType == 'CASH'">现金抵价券</p></p>
                            <p v-if="scope.row.productSource == 'OUTER'">外部导入</p></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="exchangePage" label="兑换条件">
                    </el-table-column>
                    <el-table-column prop="count" label="数量">
                    </el-table-column>
                    <el-table-column width="60" label="位置排序">
                        <template slot-scope="scope">
                            <div>
                                <el-input @blur="changeOrder(scope.row)" @change="showasdasd" size="small" :value="scope.row.showOrder" ></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <p >{{scope.row.voucherStatus}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status == 'start'" @click="soldoutgift_btn(scope.row.id)" type="text" size="small">下架</el-button>
                            <el-button v-if="scope.row.status == 'end'" @click="upshowgift_btn(scope.row.id)" type="text" size="small">上架</el-button>
                            <!-- <span style="color: #ddd">|</span> -->
                            <!-- <el-button @click="compilegift_btn(scope.row.id)" type="text" size="small">查看详情</el-button> -->
                            <span  v-if="scope.row.marketed == '1'"  @click="upOrLower(scope.row)" class="lowerFrame">下架</span>
                            <span v-if="scope.row.marketed == '0'"  @click="upOrLower(scope.row)" class="lowerFrame">上架</span>
                            <span style="color: #ddd">|</span>
                            <el-button @click="editAction(scope.row)"  type="text" size="small">编辑</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="removegift_btn(scope.row.id)" style="color:red;" type="text" size="small">删除</el-button>
                            
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    :page-size="pageSize" 
                    layout="total, prev, pager, next,jumper" 
                    :total="total" 
                    class="foot_nav">
                </el-pagination>
            </div>
        </div>
        <!--下架商品-->
        <el-dialog
            title="下架商品"
            v-model="soldoutgift_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 4px;text-align: center;">下架后该礼品将不再显示到支付宝会员卡积分兑换页面</p>
            <p style="padding: 4px;text-align: center;">是否确认下架? </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sxplay(1,3)">确 定</el-button>
                <el-button @click="soldoutgift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--上架商品-->
        <el-dialog
            title="上架商品"
            v-model="upshowgift_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 4px;text-align: center;">上架后该礼品将显示到支付宝会员卡积分兑换页面</p>
            <p style="padding: 4px;text-align: center;">是否确认上架? </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sxplay(2,4)">确 定</el-button>
                <el-button @click="upshowgift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--删除商品-->
        <el-dialog
            title="删除商品"
            v-model="removegift_dialog"
            size="tiny"
            top="30%">
            <p style="padding: 4px;text-align: center;">删除后该礼品将从支付宝会员卡积分兑换页面下架 </p>
            <p style="padding: 4px;text-align: center;">是否确认删除?  </p>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="removegift_true_btn">确 定</el-button>
                <el-button @click="removegift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--添加商品-->
        <add-and-compile 
        
         v-on:changeAddgift_dialog="changeAddgift_dialog"     
         v-bind:addgift_dialog ='addgift_dialog'  >

         </add-and-compile>
       
        
    </div>
</template>
<script>
    import addAndCompile from './common/addAndCompileTemplate.vue'
    import { getShopLists,savaGift,giftLibrary,selectGift,deleteGift,afterGift,afterGifts,integralStoreList,upPutAway,downSoldOut,deleteAction,sort,addStiorInfo,addCondition} from '../../../api/api';
    import {formateDate,formDateSecond,formDateSecond59,formatTimestamp,weekDispose,weekDispose1,DateLong} from '../../../api/CommonMethods'
    export default {
        components:{addAndCompile},
        data() {
            
            var totalNumvalidate=(rule, value, callback) => {
                let reg = /^[0-9]\d*$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的礼品库存数量'));
                }
                callback();
            };
             var pointvalidate=(rule, value, callback) => {
                let reg = /^[0-9]\d*$/;
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的兑换所需积分'));
                }
                callback();
            };
            return {
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
                
                checkList:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                checkList1:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                
                addgift_dialog:false,
                
                

                typeSelectData:[
                    {text:'全部',type:''},
                    {text:'代金券',type:'MONEY'},
                    {text:'折扣券',type:'RATE'},
                    {text:'实物换购券',type:'EXCHANGE'},
                    {text:'现金抵价券',type:'CASH'},
                ],
                typeSelect:'',
                selectdata:[
                    {text:'全部',type:''},
                    {text:'已上架',type:'up'},
                    {text:'已下架',type:'down'},
                    {text:'已过期',type:'over'},
                ],
                selectvalue:'',
                
                compileform:{
                    name:'',
                    status:'start',
                    id:'',
                    totalNum:'',
                    point:'',
                    // logo:'',
                    typeOptionsValue:'',
                    sourceValue:'',
                    movableValue:'',
                    textarea:'',
                    money:'',
                    money1:'',
                    maxPreAmount:''
                },
                pageSize:10,
                pageNumber:'1',
                model_test:'',
                removegift_dialog:false,
                compilegift_dialog:false,
                upshowgift_dialog:false,
                shopid:{id:''},
                
                radio:'1',
                addgift_dialog:false,
                soldoutgift_dialog:false,
                totalCount:0,
                total:0,
                queryacticvename:'',
                choosegiftid:'',
                tableData:[],
                chooseafterid:'',
                multipleSelection:'',
                choosedig:'',
                showOrder:'',
                
                typeOptionsValue:'',
                
                
                
                
                movableValue:'',
                textarea:'',
                moneyValue:'',
                addTimeValue:'',
                addTimeValue1:'',
                exchangeAstrictCount:'',
                forbidden_use_date:[],
                
                
                
                checkedShopPid:[],
                hhddatas2: [],
                
                
                addcondition:'',
                grade:[],
                loading2: false,
                isChangeSort:'',
                isTimes:false,
                
                shoptitle:'添加商品',
                isproductId:'',

            }
        },
        mounted: function() {
            this.cookie();
            this.getGiftList();
            this.shopList();
        },
        
        methods: {
            changeAddgift_dialog(state){
                this.addgift_dialog = state;
            },
            editAction(item){
                this.shoptitle = '编辑商品';
                this.addgift_dialog = true;
                this.addform.typeOptionsValue = item.productType;
                this.addform.sourceValue  =item.productSource;
                this.addform.movableValue = item.name;
                // id
                if(this.addform.sourceValue == 'OUTER'){
                    this.outerId = item.itemId;
                } else if(this.addform.sourceValue == 'SELF'){
                    this.ticketItemID = item.activeId;
                }
                
                this.isproductId = item.id;
                this.addform.name = item.name;
                this.imageUrltologo = item.logo;
                this.addform.logo = item.logo;
                this.addform.textarea  =item.goodDetails;
                this.weightLive = item.showOrder;
                this.exchangeOpction = item.gradeCN.split(',').map(e =>{
                    let a = {name :e}
                    return a
                })
                this.exchangeValue =  item.grade.split(',').map((e,i) =>item.exchangePage.split(',')[i]) 
                this.integralValue = item.bindingPoint
                this.value6 = this.addTimeValue = [new Date(item.pickStartDate), new Date(item.pickEndDate)];
                this.exchangeAstrictValue = item.pickLimitPeriod;
                this.exchangeAstrictCount = item.pickLimitNum;
                this.addform.point = item.count.toString();
                this.instructions =  item.memo.split(',').map((e,i) => {  
                    var obj =  { val:e}
                    return obj   
                });
                this.moneyValue = item.bindingMoney;
                if(item.shopIds){this.checkedshops = item.shopIds.split(',');}
                this.shopsnumber = this.checkedshops.length; 
                this.checkedshopstrue = this.checkedshops;
                this.validityType = item.validType;
                if(this.addform.sourceValue == 'OUTER'){
                    if(this.validityType == 'RELATIVE'){
                        this.validDays = item.validDays;
                    } else if(this.validityType == 'FIXED'){
                        this.value7 = this.addTimeValue1 = [new Date(item.validStartDate), new Date(item.validEndDate)];
                    }
                    







                    if(item.useTime){
                        this.timelimitselectvalue = '1';
                        this.times = item.useTime.split('^').map( (e)=> {
                            let newE = {value:e.split(',')}
                            newE.value[0] = new Date(new Date().toLocaleDateString()+' '+newE.value[0]);
                            newE.value[1] = new Date(new Date().toLocaleDateString()+' '+newE.value[1]);
                            return newE
                        })
                    }
                    console.log(item.forbiddenUseDate)
                    if(item.forbiddenUseDate){
                       this.detallimitselectvalue = '1'; 
                       this.times1 = item.forbiddenUseDate.split('^').map( (e)=> {
                            let newE = {value:e.split(',')}
                            newE.value[0] = new Date(newE.value[0]);
                            newE.value[1] = new Date(newE.value[1]);
                            return newE
                        })
                    }
                    this.checkList = weekDispose1(item.useWeek.split(',')).split(',')

                    console.log(this.checkList,"89")
                    if(item.minCost){
                        this.minPreAmount = '1';
                        this.addform.money = item.minCost;
                    }
                }

                addCondition().then(res =>{
                    this.exchangeOpction = res.content;
                })
            },
            shopList: function () {
                let data = this.qs.stringify({
                    pageNumber: '1',
                    pageSize: '10000'
                });
                getShopLists(data).then(res=>{
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else{
                            this.Objects=res.content.resultList;
                        }
                    })
            },
            //礼品显示状态变化时
            selectChange(){
                this.getGiftList(); 
            },
            //获取商品库列表
            getGiftList(){
                let data = this.qs.stringify({
                    status:this.selectvalue,
                    name:this.queryacticvename,
                    pageNumber:this.pageNumber,
                    voucherType:this.typeSelect,
                    pageSize:this.pageSize,
                });
                integralStoreList(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.tableData = res.content.result;
                           this.tableData.forEach( (e,i) =>{
                                e.index = i+1
                                return e;
                            })
                            this.totalCount = res.content.pageCount;
                            this.total = res.content.total;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //上架下架选择礼品
            plchoose(type_num){
                if(this.multipleSelection.length == 0){
                    this.$message.warning('请先选择礼品');
                    return;
                }
                this.choosedig = '1';
                if(type_num == 0){
                    //上架
                    this.upshowgift_dialog = true;
                }else if(type_num == 1){
                    //下架
                    this.soldoutgift_dialog = true;
                }
            },
            //搜索礼品
            query_gift_btn(){
                this.pageNumber = 1;
                this.getGiftList();
            },
            // 下架礼品
            soldoutgift_btn(id){
                this.choosedig = '2';
                this.soldoutgift_dialog = true;
                this.chooseafterid = id;
            },
            upshowgift_btn(id){
                this.choosedig = '2';
                this.upshowgift_dialog = true;
                this.chooseafterid = id;
            },
            //批量上架或下架
            moresolidoutgift(giftids,istype){

                //判断上下架？
                let port = {};
                if(istype == "0"){
                    port = upPutAway;
                } else if(istype == "1"){
                    port = downSoldOut
                }
                let data = this.qs.stringify({
                    productIds:giftids,
                }); 
                port(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            if(istype == 1){
                                this.$message.success('成功下架选中礼品');
                                this.soldoutgift_dialog = false;
                            }else if(istype == 0){
                                this.$message.success('成功上架选中礼品');
                                this.upshowgift_dialog = false;
                            }
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //调用接口,上架或者下架
            solidoutgift_f(istype){
                let data = this.qs.stringify({
                    id:this.chooseafterid,
                    types:istype,
                }); 
                afterGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            if(istype == 1){
                                this.$message.success('下架成功');
                                this.soldoutgift_dialog = false;
                            }else if(istype == 0){
                                this.$message.success('上架成功');
                                this.upshowgift_dialog = false;
                            }
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //下架礼品弹窗内,点击确定
            sxplay(type,isab){
                if(this.choosedig == '2'){
                    if(type == 1){
                        this.solidoutgift_f(1);
                    }else if(type == 2){
                        this.solidoutgift_f(0);
                    }
                }else if(this.choosedig == '1'){
                    let giftidlist = '';
                    for(let i = 0;i<this.multipleSelection.length;i++){
                        giftidlist = giftidlist + this.multipleSelection[i].id + ',';
                    }
                    giftidlist = giftidlist.substr(0,giftidlist.length-1);
                    if(isab == 3){
                        this.moresolidoutgift(giftidlist,1);
                    }else if(isab == 4){
                        this.moresolidoutgift(giftidlist,0);
                    }
                }
            },
            
           
            //添加礼品接口
            start_addgift(){



                let ObjectDate ={
                    //*****其他渠道*******
                    productId: this.isproductId,
                    voucherType:this.addform.typeOptionsValue,      //商品分类
                    productSource:this.addform.sourceValue,         //商品来源
                    activeId :this.ticketItemID,                    //活动id
                    itemId:this.outerId,                            //券ID
                    name:this.addform.name,                         //商品名称
                    count:this.addform.point,                       //数量  
                    logo:this.addform.logo,                         //商品图片
                    memo:'',                                        //使用说明
                    pickStartDate:this.addTimeValue[0],             //领取开始时间
                    pickEndDate:this.addTimeValue[1],               //领取结束日期
                    bindingPoint:this.integralValue,                //兑换所需积分
                    bindingMoney:this.moneyValue,                   //兑换所需金额
                    pickLimitPeriod:this.exchangeAstrictValue,      //领取限制周期 天周月 默认天 其他两个暂时没用
                    pickLimitNum:this.exchangeAstrictCount,         //领取限制周期内最多领取数量  默认9999张 就是不限制
                    showOrder:this.weightLive,                      //排序
                    useWeek:'',                                     //可使用的星期，存星期几逗号隔开 1,3,7
                    useTime:'',                                     //可使用的时间支持多个 开始结束逗号分隔，多个时间之间^分割 如：16:00:00,20:00:00^21:00:00,22:00:00
                    forbiddenUseDate:'',                            //不可使用日期：开始结束逗号分隔，多个时间之间^分割 如：2016-03-03,2016-03-08^2016-10-01,2016-10-01
                    shopInfo:'',                                    //适用门店
                    validStartDate:this.addTimeValue1[0],           //有效期开始日期
                    validEndDate:this.addTimeValue1[1],             //有效期结束日期
                    validDays:this.validDays,                       //领取后N天有效
                    validType:this.validityType,                    //券有效期类型
                    minCost:this.addform.money ,                    //满金额
                    grade:this.grade.toString(),                    //可领取级别
                    gradeCN:this.exchangeValue.toString(),          //可领取级别中文
                    goodDetails:this.addform.textarea,              //文本框输入信息
                    maxAmount:this.addform.money1,                  //最高优惠金额，折扣券有效
                    marketed:'1',                                   //上架 0否1是
                    id:this.ticketItemID


                    // discount:'',                                    //折扣力度
                    // isShare:'',                                     //是否可转赠 true 为可转赠
                    // categoryType:'',                                //行业分类
                    // exchangeWeek:'',                                //可积分兑换的星期，存星期几逗号隔开 1,3,7
                    // exchangeTime:'',                                //可积分兑换的时间支持多个 开始结束逗号分隔，多个时间之间^分割 如：16:00:00,20:00:00^21:00:00,22:00:00
                    // forbiddenExchangeDate:'',                       //不可积分兑换日期：开始结束逗号分隔，多个时间之间^分割 如：2016-03-03,2016-03-08^2016-10-01,2016-10-01
                    // amount:'',                                      //优惠券面额
                    
                }
                // 门店信息

                if(this.checkedshopstrue){
                    ObjectDate.shopInfo = this.checkedshopstrue.toString();
                }
                // ID
                if(this.addform.sourceValue == 'OUTER'){
                    ObjectDate.id =  this.outerId
                } else if(this.addform.sourceValue == 'SELF'){
                    ObjectDate.id =  this.ticketItemID
                }
                //使用说明
                
                if(this.instructions){
                    let str = [];
                    this.instructions.forEach(e => {
                        str.push(e.val)
                    })
                    ObjectDate.memo = str.toString().replace('"','')
                }
                
                //领取时间限制
                if(this.timelimitselectvalue ==1){
                    let useTime=DateLong(this.times);
                    let arrTime = useTime.split(/\^/g);
                    let newArrTime  = []
                    arrTime.forEach((e,i) =>{
                        let startTime = e.split(',')[0];
                        let endTime   = e.split(',')[1];
                       newArrTime.push({
                           startTime:startTime.substring(0,2)*3600 + startTime.substring(3,5)*60 + startTime.substring(6,),
                           endTime:endTime.substring(0,2)*3600 + endTime.substring(3,5)*60 + endTime.substring(6,)
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
                        this.$message("可用时间段不能重叠");
                        return;
                    }else{
                        ObjectDate.useTime=useTime;
                        let arrs=weekDispose(this.checkList);
                        ObjectDate.useWeek=arrs;
                    }
                }

                //不可用时间

                let startT = []
                let endT = []
                if(this.times1){
                    this.times1.forEach( e =>{
                        startT.push(new Date(e.value[0].toLocaleDateString()).getTime())
                        endT.push(new Date(e.value[1].toLocaleDateString()).getTime())
                    })
                    var allStartTime = startT.sort();
                    var allEndTime = endT.sort();
                    var result = 0;
                    for(var k=1;k<allStartTime.length;k++){
                        if (allStartTime[k] <= allEndTime[k-1]){
                            result+=1;  
                        }
                    }
                }
                // return result>0;
                if(result > 0){
                    this.$message("不可用时间段不能重叠");
                    return;
                }else{
                     this.times1.forEach(e =>{
                        let arr = []
                        arr.push(formateDate(e.value[0]).replace(/\//g,'-'))     
                        arr.push(formateDate(e.value[1]).replace(/\//g,'-'))     
                        this.forbidden_use_date.push(arr+'^')
                    })
                    if(this.detallimitselectvalue == "2"){
                        ObjectDate.forbiddenUseDate = '';
                    }else{
                        ObjectDate.forbiddenUseDate = this.forbidden_use_date.toString().replace('^,','^').slice(0,-1);
                        this.forbidden_use_date = [];

                    }
                }
                let data = this.qs.stringify(ObjectDate);
                addStiorInfo(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            if(this.shoptitle == '编辑商品'){
                               this.$message.success('修改成功');     
                            }else{
                                this.$message.success('添加成功');
                            }
                            this.addgift_dialog = false;
                            this.pageNumber = 1;
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            compilegift_btn(giftid){
                let data = this.qs.stringify({
                    id:giftid,    
                });
                selectGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.compileform = res.content;
                            this.compileform.point = res.content.point.toString();
                            this.compileform.totalNum = res.content.totalNum.toString();
                            this.imageUrltologo1 = res.content.logo;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
                this.compilegift_dialog = true;
            },
            compilegift_true_btn(){
                this.$refs['compileform'].validate((valid) => {
                    if (valid) {
                        this.start_compilegift();
                    } else {
                        return;
                    }
                });
                
            },
            start_compilegift(){
                let data = this.qs.stringify(this.compileform);
                savaGift(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.$message.success('修改成功');
                            this.compilegift_dialog = false;
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                    else if(res.errorCode == '90003'){
                        if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //删除商品,打开弹窗
            removegift_btn(giftid){
                this.removegift_dialog = true;
                this.choosegiftid = giftid;
            },
            //删除商品弹窗内,点击确定
            removegift_true_btn(){
                let data = this.qs.stringify({
                    productIds:this.choosegiftid
                });
                deleteAction(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.$message.success('删除成功');
                            this.removegift_dialog = false;
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
                
            },
            //表格页面改变时
            handleCurrentChange(val){
                this.pageNumber = val;
                this.getGiftList();
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
                this.shopid.id = user_id;
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            changeOrder(row){
                let old = this.isChangeSort
                this.isChangeSort = this.showOrder;
                if(this.isChangeSort != old){
                    let data = this.qs.stringify({
                        productId:row.id,
                        showOrder:this.showOrder,
                    });
                    sort(data).then(res => {
                        this.handleCurrentChange()
                        if(res.errorCode == '30005'){
                            this.$router.push({path: '/login'});
                        }
                        
                    })

                }
            },
            showasdasd(ss){
                this.showOrder = ss
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
            
            
            delinstructions(item,index){
                if(this.instructions.length > 1){
                    this.instructions = this.instructions.filter( (e,i) => index !==i )
                }
            },
            
            exchangeGrade(item){
                this.grade=[]
                this.exchangeOpction.forEach(e =>{
                    this.exchangeValue.forEach(k =>{
                        if(e.name == k){
                            this.grade.push(e.level)
                        }
                    })
                })

            },
            upOrLower(e){
                //判断上下架？
                let port = {};
                if(e.marketed == "0"){
                    port = upPutAway;
                } else if(e.marketed == "1"){
                    port = downSoldOut
                }
                let data = this.qs.stringify({
                    productIds:e.id,
                }); 
                port(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            if(e.marketed == 1){
                                this.$message.success('成功下架选中礼品');
                                this.soldoutgift_dialog = false;
                            }else if(e.marketed == 0){
                                this.$message.success('成功上架选中礼品');
                                this.upshowgift_dialog = false;
                            }
                            this.queryacticvename='';
                            this.getGiftList();
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            
            
            reviseMoneyValue(){
                this.moneyValue = Math.abs(this.moneyValue);
                this.moneyValue = this.moneyValue.toFixed(2)
                if(this.moneyValue == '0.00'){
                    this.moneyValue = ''
                }
            },
            
            reviseExchangeAstrictCount(){
                this.exchangeAstrictCount = Math.abs(this.exchangeAstrictCount);
                this.exchangeAstrictCount = this.exchangeAstrictCount.toFixed();
                if(this.exchangeAstrictCount == '0.00'){
                    this.exchangeAstrictCount = ''
                }

            },
            changeTimes(val){
               this.isTimes = true;
            },
            //添加商品
            addgift_btn(){

                
                this.addgift_dialog = true;

                console.log( this.addgift_dialog)
                addCondition().then(res =>{
                    this.exchangeOpction = res.content;
                })
                
                
            },

            
        }
    }
</script>
<style scoped>
    .addtable_form {
        width: 600px;
        margin: 0 auto;
    }
    .gift_table_imgbox{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .gift_table_imgbox img{
        max-width: 50px;
        max-height: 50px;
    }
    .padding_10{
        padding: 10px;
    }
    .width_150{
        width: 150px;
    }
    .width_300{
        width: 300px;
    }
    .width60{
        width: 60px;
        margin-top: 15px;
    }
    .width_70px{
        width: 70px;
    }
    .validityTypeInline{
        display: inline-block;
        vertical-align: top;
    }
    .margin_left50{
        margin-left: 50px;
    }
    .margin_bto10{
        margin-bottom: 10px;
    }
    .margin_bottom15{
        margin-bottom: 15px;
    }
    .lowerFrame{
        cursor: pointer;
        color: #20a0ff;
    }
   .width_300px{
       width: 500px !important;
   }
   .colorRed{
       color:red;
   }
   
   
   
</style>