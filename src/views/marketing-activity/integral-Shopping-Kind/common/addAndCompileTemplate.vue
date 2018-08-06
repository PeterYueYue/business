<template>


    <div>
        <el-dialog
            :close-on-click-modal="false"
            :title="shoptitle"
            class="addgift_c"
            v-model="templateIsShow"
            size="small"
            top="15%">
            <el-form label-width="105px" class="addtable_form" :model="addform" :rules="addrule" ref="addform">
                <el-form-item   prop="typeOptionsValue" label="商品类型">
                    <el-select  :disabled="shoptitle == '编辑商品'" size="small" v-model="addform.typeOptionsValue" @change="selectType" placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sourceValue" label="商品来源">
                    <el-select :disabled="shoptitle == '编辑商品'"  size="small" v-model="addform.sourceValue" placeholder="请选择">
                        <el-option
                        v-for="item in sourceOpction"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="movableValue"    v-if="addform.sourceValue != 'OUTER'" label="请选择活动">
                    <el-select size="small" :disabled="shoptitle == '编辑商品'" class="movableValue"  v-model="addform.movableValue" @change="ticketId" placeholder="请选择">
                        <el-option
                        v-for="item in movableOpction"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="colorRed" v-if="!enterNo">该活动已被上架为商品</span>
                </el-form-item>
                <!-- 积分商城券池 -->
                <el-form-item v-if="addform.sourceValue == 'SELF'" label="券 ID : " prop="">
                    <p >{{ticketItemID}}</p>
                </el-form-item>
                <!-- 其他渠道 -->
                <el-form-item v-if="addform.sourceValue == 'OUTER'" label="券 ID : " prop="">
                    <el-input  :disabled="shoptitle == '编辑商品'" type="number" size="small" placeholder="请输入券ID" v-model="outerId"></el-input>
                </el-form-item>
                <el-form-item 
                        v-if="addform.sourceValue == 'OUTER'" 
                        v-show="addform.typeOptionsValue == 'RATE'"
                        label="最高优惠金额 : " 
                        prop="maxPreAmount">
                    <el-select v-model="addform.maxPreAmount" class="validityTypeInline" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in maxPreAmountselect"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span v-if="addform.maxPreAmount == '1'"  >  
                        <el-input size="small"
                            type="number" class="width_50" 
                            placeholder="金额" 
                            v-model="addform.money1">
                            </el-input>元
                        
                    </span>
                </el-form-item>
                <el-form-item v-if="addform.sourceValue == 'OUTER' "  v-show="addform.typeOptionsValue!= 'EXCHANGE'"   label="最低消费金额 : " >
                    <el-select v-model="minPreAmount" class="validityTypeInline" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in minPreAmountselect"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span  v-if="minPreAmount == '1'" >
                    <el-input 
                    size="small" type="number" 
                    class="width_50" 
                    placeholder="金额" 
                    v-model="addform.money">
                    </el-input>元
                        
                    </span>
                </el-form-item>


                <el-form-item  v-if="addform.sourceValue == 'OUTER'"   label="券有效期 : " >
                    <el-select v-model="validityType" class="validityTypeInline" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in validityselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        class="validityTypeInline width_200"
                        v-if="validityType == 'FIXED' "
                        size="small"
                        v-model="value7"
                        type="daterange"
                        placeholder="请选择时间范围"
                        @change="timeChange1"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-if="validityType == 'RELATIVE' "  > 领取后 <el-input v-model="validDays"  class="width_50" placeholder="天数" type="number" size="small" ></el-input> 天内有效</span>
                </el-form-item>


                <el-form-item label="适用门店 :"  v-if="addform.sourceValue == 'OUTER'"  >
                    <div>
                        <span v-if="shopsnumber">已选择{{shopsnumber}}家门店</span>
                        <!--<el-button v-if="this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">点击查看</el-button>-->
                        <el-button v-if="this.shopsnumber" type="text" @click="againchooseshop">重新选择</el-button>
                        <el-button v-if="!this.shopsnumber" type="text" @click="dialogVisible_queryshops = true">选择门店
                        </el-button>
                    </div>
                </el-form-item>


                <el-form-item  
                    v-if="addform.sourceValue == 'OUTER'" 
                    v-show="addform.typeOptionsValue != 'CASH'"
                    class="ticket_limit" label="可用时间段 :">
                    <el-select v-model="timelimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in timelimitselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div class="bgf4f4f4" v-if="timelimitselectvalue == 1">
                        <el-checkbox-group v-model="checkList">
                        <el-checkbox label="星期一"></el-checkbox>
                        <el-checkbox label="星期二"></el-checkbox>
                        <el-checkbox label="星期三"></el-checkbox>
                        <el-checkbox label="星期四"></el-checkbox>
                        <el-checkbox label="星期五"></el-checkbox>
                        <el-checkbox label="星期六"></el-checkbox>
                        <el-checkbox label="星期日"></el-checkbox>
                        </el-checkbox-group>
                        <span class="viltop">指定时段</span>
                        <div class="neiform">
                            <div v-for="(time,index) in times"  :key="time.id" class="margin_b_20">
                                    <el-time-picker
                                        is-range
                                        v-model="time.value"
                                        @change="changeTimes"
                                        placeholder="选择时间范围">
                                    </el-time-picker>
                                    <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain(time)">删除</el-button>
                                </div>
                                <el-button type="primary" v-if="times.length < 5" @click="addDomain">新增</el-button>
                        </div>
                        <span class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</span>
                    </div>
                </el-form-item>
                <el-form-item 
                    v-if="addform.sourceValue == 'OUTER'" 
                    v-show="addform.typeOptionsValue != 'CASH'"
                    class="ticket_limit" label="不可用日期 :">
                    <el-select v-model="detallimitselectvalue" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in detallimitselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <br>
                    <div class="bgf4f4f4" v-if="detallimitselectvalue == 1">
                        <!-- <el-checkbox-group v-model="checkList1">
                        <el-checkbox label="星期一"></el-checkbox>
                        <el-checkbox label="星期二"></el-checkbox>
                        <el-checkbox label="星期三"></el-checkbox>
                        <el-checkbox label="星期四"></el-checkbox>
                        <el-checkbox label="星期五"></el-checkbox>
                        <el-checkbox label="星期六"></el-checkbox>
                        <el-checkbox label="星期日"></el-checkbox>
                        </el-checkbox-group> -->
                        <span class="viltop">指定时段</span>
                        <div class="neiform">
                            <div v-for="(time,index) in times1"  :key="time.id" class="margin_b_20">
                                    <el-date-picker
                                        v-model="time.value"
                                        type="daterange"
                                        align="right"
                                        size="small"
                                        placeholder="选择日期范围"
                                        :picker-options="pickerOptions2">
                                    </el-date-picker>
                                    <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain1(time)">删除</el-button>
                                    
                                </div>
                                    <el-button type="primary" v-if="times1.length < 5" @click="addDomain1">新增</el-button>
                            </div>
                        <span class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</span>

                    </div>
                </el-form-item>
                <el-form-item    v-if="addform.sourceValue == 'OUTER'"  label="使用说明:" >
                    <div class="margin_bto10"    v-for=" (item , i)  in instructions"  :key="item.id" >
                        <el-input class="width_300 "  v-model="item.val"   size="small"  placeholder="例如：本优惠券不可兑换现金" ></el-input>
                        <el-button  v-if="instructions.length > 1"   type="danger" size="small" @click="delinstructions(item,i)" class="margin_left50"  circle>删除</el-button>
                    </div>

                    <el-button  v-if="instructions.length <= 4"   @click="addinstructions" size="small" type="primary" round>新增</el-button>
                </el-form-item>


                <el-form-item label="商品名称 : " prop="name">
                    <el-input class="width_300" size="small" placeholder="请输入商品名称" v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item v-if="addform.sourceValue == 'OUTER'"   label="商品数量 : " prop="point">

                    <span class="color_888">
                        <el-input 
                        size="small" class="width_100" 
                        type="number" placeholder="请输入数量" 
                        v-model="addform.point">
                        </el-input>
                        *小提示：商品数量请与发券数量填写一致
                    </span>
                </el-form-item>
                
                
                <el-form-item label="商品图片 : " prop="logo">
                    <el-upload
                            class="avatar-uploader"
                            action="/business/file!fileUpload.action"
                            :data="shopid"
                            :show-file-list="false"
                            :on-success="logoonsuccess"
                            :before-upload="logobeforeAvatarUpload">
                        <img v-if="imageUrltologo" :src="imageUrltologo" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span class="ticket_tip color_888">备注 : 300KB以内,格式jpg/png; 尺寸不小于160px*160px的正方形;</span>               
                </el-form-item>
                <el-form-item  label="商品详情 : " prop="textarea">
                    <el-input
                    class="width_300"
                    resize="none"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="addform.textarea">
                    </el-input>

                </el-form-item>


                <el-form-item label="位置排序 : " >
                    <el-input size="small" type="number" class="width_150" placeholder="请输入位置排序码" @blur="reviseWeighLive"  v-model="weightLive"></el-input>
                </el-form-item>

                <el-form-item label="商品周期 : " >
                    <el-date-picker
                        v-model="value6"
                        size="small"
                        type="daterange"
                        placeholder="请选择时间范围"
                        @change="timeChange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="兑换条件">
                    <el-checkbox-group v-model="exchangeValue">
                        <el-checkbox class="margin_bottom15" v-for="item in exchangeOpction" @change="exchangeGrade(item)" :key="item.id"  :label="item.name"></el-checkbox>
                    </el-checkbox-group >
                    积分：<el-input size="small" v-model="integralValue" @blur="reviseIntegralValue" class="width_50" type="number"  >
                    </el-input> 
                        <!-- 金额：<el-input class="width_50"  @blur="reviseMoneyValue"  v-model="moneyValue" size="small" type="number"  ></el-input>
                    <span class="color_888"> *小提示：金额非必填，不填默认仅需积分兑换</span> -->
                </el-form-item>
                <el-form-item label="兑换限制">
                    <el-select size="small" v-model="exchangeAstrictValue" placeholder="请选择">
                        <el-option
                        v-for="item in exchangeAstrictOpction"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span  v-if="exchangeAstrictValue != 'N'" >
                        <el-input  
                        @blur="reviseExchangeAstrictCount"
                        type="number"
                        class="width_70px" 
                        v-model="exchangeAstrictCount" 
                        placeholder="请输入" size="small" >
                        </el-input>
                        人/张
                    </span>

                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addgift_true_btn">确 定</el-button>
                <el-button @click="$emit('changeAddgift_dialog',false)">取 消</el-button>
            </span>
            
        </el-dialog>
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
                            <el-checkbox :label="item.id"  :key="item.id">{{item.main_shop_name}}</el-checkbox>
                        </div>
                    </el-checkbox-group>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible_queryshops = false">取 消</el-button>
                <el-button type="primary" :disabled="isIndeterminate " @click="queryshops_btn">确 定</el-button>
            </span>
        </el-dialog>
    </div>


</template>
<script>
import {addtype,ticketInfo} from '../../../../api/api'
export default {
    props:['addgift_dialog'],
    watch:{
        addgift_dialog:function(){
            if(this.addgift_dialog == false){
                this.templateIsShow = false; 
                this.cancelDoSome() 

            }else{
               this.templateIsShow = true; 
            }
        },
        templateIsShow:function(state){
            this.$emit('changeAddgift_dialog',state)
        }
    },
    data(){
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
        return{
            shoptitle:'添加商品',
            addform:{
                name:'',
                status:'start',
                totalNum:'',
                point:'',
                logo:'',
                typeOptionsValue:'',
                sourceValue:'',
                movableValue:'',
                textarea:'',
                maxPreAmount:'2'
            },
            times:[
                {
                    value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]
                }
            ],
            times1:[
                {
                    value:[new Date(),new Date()]
                }
            ],
            addrule:{
                name:[
                    { required: false, message: '请输入商品名称', trigger: 'blur' },
                    { max: 15, message: '礼品名称长度大于15个字符', trigger: 'blur' },
                ],
                totalNum:[
                    { required: false, message: '请输入礼品库存数量', trigger: 'blur' },
                    {validator: totalNumvalidate, trigger: 'blur'},
                ],
                point:[
                    { required: false, message: '请输入商品数量', trigger: 'blur' },
                ],
                maxPreAmount:[
                    { required: false, message: '请输入最高优惠金额', trigger: 'blur' },
                ],
                money:[
                    { required: false, message: '请输入最低消费金额', trigger: 'blur' },
                ],
                money1:[
                    { required: false, message: '请输入最高优惠金额', trigger: 'blur' },
                ],
                logo:[
                    { required: false, message: '请上传图片', trigger: 'blur' },
                ],
                typeOptionsValue:[
                    { required: false, message: '请选择类型', trigger: 'change' },
                ],
                sourceValue:[
                    { required: false, message: '请选择类型', trigger: 'change' },
                ],
                movableValue:[
                    { required: false, message: '请选择类型', trigger: 'change' },
                ],
                textarea:[
                    { required: false, message: '请输入内容信息', trigger: 'blur' },
                ]
            },
            typeOptions:[
                {
                value: 'MONEY',
                label: '代金券'
                },
                {
                value: 'RATE',
                label: '折扣券'
                },
                {
                label:'实物换购券',
                value:'EXCHANGE'
                },
                {
                value: 'CASH',
                label: '现金抵换券'
                },
            ],
            sourceOpction:[
                {
                value: 'SELF',
                label: '积分商城券池'     
                },
                {
                value: 'OUTER',
                label: '其他渠道'     
                },
            ],
            exchangeValue:[],
            exchangeAstrictOpction:[
                {
                    value: 'N',
                    label: '不限制'
                },
                {
                    value: 'D',
                    label: '每日'
                },
                {
                    value: 'M',
                    label: '每月'
                },
                {
                    value: 'T',
                    label: '总数限制'
                }
            ],
            exchangeAstrictValue:'N',
            movableOpction:[
            ],
            exchangeOpction:[
                {
                    value: '金卡会员',
                    label: '金卡会员'
                },
                {
                    value: 'PLUS会员',
                    label: 'PLUS会员'
                },
            ],

            enterNo:true,
            shopid:{id:''},
            imageUrltologo: '',
            imageUrltologo1: '',
            weightLive:'',
            value6:'',
            value7:'',
            integralValue:'',
            ticketItemID:'',
            outerId:'',
            sourceValue:'',
            maxPreAmountselect:[
                {value: '1', label: '限制'},
                {value: '2', label: '不限制'},
            ],
            minPreAmount:'2',
            minPreAmountselect:[
                {value: '1', label: '限制'},
                {value: '2', label: '不限制'},
            ],
            validityType:'RELATIVE',
            validityselectdata:[
                {value: 'FIXED', label: '指定时间'},
                {value: 'RELATIVE', label: '相对时间'},
            ],
            validDays:'',
            shopsnumber: '',
            timelimitselectvalue:'2',
            timelimitselectdata:[
                {value: '1', label: '限制'},
                {value: '2', label: '不限制'},
            ],
            detallimitselectvalue:'2',
            detallimitselectdata:[
                {value: '1', label: '限制'},
                {value: '2', label: '不限制'},
            ],
            instructions:[
                {
                    val:''
                }
            ],
            ypeOptionsList:'',
            dialogVisible_queryshops: false,
            checkedshops: [],
            isIndeterminate: true,
            checkAll: false,
            Objects:'',
            templateIsShow:false
            




        }
    },
    
    methods:{

         //添加商品弹窗内,点击确定
        addgift_true_btn(){
            // 其他渠道
            if(this.addform.sourceValue == 'OUTER'){
                this.instructions.forEach((e,i) => {
                    if(!e.val){
                        this.$message(`使用说明第${i+1}条不能为空`)
                        return;
                    }
                    
                })
                if(!this.outerId){
                    this.$message('请输入券ID')
                    return;
                }
                if(this.validityType == 'FIXED'){
                        if(!this.addTimeValue1){
                            this.$message('请输入券有效期')
                            return;
                        }
                } else if(this.validityType == 'RELATIVE'){
                    if(!this.validDays){
                        this.$message('请选择券有效期')
                        return;
                    }
                }
                if(!this.checkedshopstrue){
                    this.$message('门店信息不能为空')
                    return;
                }
                //代金券
                if(this.addform.typeOptionsValue == 'MONEY'){
                    if(!this.addform.money && this.minPreAmount == '1'){
                        this.$message('请输入最低消费金额')
                        return;
                    }
                }
                //折扣券
                if(this.typeSelect == 'RATE'){
                    if(!this.addform.money1 && this.addform.maxPreAmount == '1'){
                        this.$message('请输入高优惠金额')
                        return;
                    }
                    if(!this.addform.money && this.minPreAmount == '1'){
                        this.$message('请输入最低消费金额')
                        return;
                    }
                }
                //现金抵换券
                if(this.typeSelect == 'CASH'){
                    if(!this.addform.money && this.minPreAmount == '1'){
                        this.$message('请输入最低消费金额')
                        return;
                    }
                }


            }

            if(!this.addform.typeOptionsValue ){
                this.$message('请选择商品类型');
                return;
            } 
            if(!this.addform.sourceValue){
                this.$message('请选择商品来源');
                return;
            }
            // if(!this.addform.movableValue){
            //     this.$message('请选择活动');
            //     return;
            // }
            if(!this.addform.name){
                this.$message('请填写商品名称');
                return;
            }
            // if(!this.addform.logo){
            //     this.$message('请上传图片LOGO');
            //     return;
            // }
            if(!this.addform.textarea){
                this.$message('请输入商品信息');
                return;
            }
            if(!this.weightLive){
                this.$message('请填写位置排序数字等级')
                return;
            }
            if(!this.addTimeValue){
                this.$message('请选择商品周期范围')
                return;
            }
            if(this.exchangeValue.length<'1'){
                this.$message('请选择兑换条件')
                return; 
            }
            if(!this.integralValue){
                this.$message('请填写积分')
                return;  
            }
            

            

            this.$refs['addform'].validate((valid) => {
                if (valid) {
                    this.start_addgift();
                } else {
                    return;
                }
            });
        },
        selectType(){
                this.addform.movableValue= ''; 
                this.enterNo = true;
                let data = this.qs.stringify({
                voucherType:this.addform.typeOptionsValue,
                
            });
            addtype(data).then(res => {

                console.log(res)
                this.ypeOptionsList = res.content;
                this.ypeOptionsList.forEach(e =>{

                    console.log(e)
                    e.value = e.id;
                    e.label = e.brandName;
                    if(e.voucherType =='FIX_VOUCHER'){
                        e.label = e.voucherName;
                    }
                    return e
                })
                this.movableOpction = this.ypeOptionsList
                if(res.errorCode == '30005'){
                    this.$router.push({path: '/login'});
                }
                
            })   
        },
        ticketId(val){
            this.ticketItemID = val;
            if(this.ticketItemID){
                let data = this.qs.stringify({
                    voucherType:this.addform.typeOptionsValue,
                    id : this.ticketItemID
                });
                ticketInfo(data).then(res => {
                    if(res.errorCode == '该活动已被上架为商品'){
                        this.enterNo = false;
                    }
                    if(res.errorCode == '10000'){
                        this.enterNo = true;
                    }
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    
                })    
            }
        },
        timeChange(val){
            if(val){this.addTimeValue = val.split("至");}
        },
        timeChange1(val){
            if(val){this.addTimeValue1 = val.split("至");}
        },
        reviseIntegralValue(){
            this.integralValue = Math.abs(this.integralValue)
            this.integralValue = this.integralValue.toFixed()
            if(this.integralValue == "0.00"){
                this.integralValue = ''
            }
        },
        logoonsuccess(response, file, fileList) {

            if (response.error == 0) {
                this.$message('上传LOGO图片成功!');
                this.logoimgurl = file.url;
                this.imageUrltologo = URL.createObjectURL(file.raw);
                this.addform.logo = response.url;

                this.addform.logoId = response.imageId;
            }
            else if(response.error == 1){
                this.$message(response.url);
            }
        },
        logobeforeAvatarUpload(file) {
            const isLt1M = file.size / 1024 / 1024 < 0.3;
            if (!isLt1M) {
                this.$message.error('上传头像图片大小不能超过 300KB!');
            }else{
                this.$message('正在上传');
            }
            return isLt1M;
        },
        reviseWeighLive(){
            this.weightLive = Math.abs(this.weightLive);
            this.weightLive = this.weightLive.toFixed();
            
        },
        addinstructions(){

            if(this.instructions.length < 5){
                this.instructions.push({
                    val:''
                })
            }
        },
        handleCheckAllChange(event) {
            this.hhddatas2 = [];
            for (var i = 0; i < this.Objects.length; i++) {
                this.hhddatas2.push(this.Objects[i].id);
            }
            this.checkedshops = event.target.checked ? this.hhddatas2 : [];
            if(this.checkedshops.length > 0){
                this.isIndeterminate = false;
            }else{
                this.isIndeterminate = true;
            }
            
            
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
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.Objects.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.hhddatas2.length;
            if(value.length > 0 ){
                this.isIndeterminate = false; 
            }else{
                this.isIndeterminate = true; 
            }
        },
        cancelDoSome(){
            this.shoptitle = '添加商品';
            this.addgift_dialog = false;
            this.addform.typeOptionsValue = '';
            this.addform.sourceValue  ='';
            this.addform.movableValue = '';
            this.addform.textarea  ='';
            this.addform.name = '';
            this.ticketItemID = '';
            this.outerId = '';
            this.imageUrltologo = '';
            this.weightLive = '';
            this.exchangeOpction = []
            this.exchangeValue = [];
            this.integralValue = '';
            this.value6 ='';
            this.exchangeAstrictValue = 'N';
            this.exchangeAstrictCount = '';
            this.integralValue = '';
            this.addTimeValue = "";
            this.addform.point = '';
            this.instructions =  '';
            this.moneyValue = '';
            this.checkedshopstrue='';
            this.checkedshops = '';
            this.shopsnumber = ''; 
            this.validDays = '';
            this.value7 = '';
            this.addTimeValue1 = '';
            this.timelimitselectvalue = '2';
            this.times = [{value:[new Date(2017, 9, 10, 0,0,0), new Date(2017, 9, 10, 23,59,59)]}];
            this.detallimitselectvalue = '2';
            this.times1 = [{value:[new Date(),new Date()]}];
            this.exchangeOpction = '';
            this.forbiddenUseDate = '';
            this.validityType = 'RELATIVE';
        },
    }


}
</script>

