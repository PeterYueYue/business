<template>
    <div class="padding_16">
        <div class="tab_header padding_t_l_r_0">
            <el-button type="primary"  @click="addgift_btn">&#X3000;+新增商品&#X3000;</el-button>
            <el-button type="primary"  @click="plchoose(0)">上架已选中礼品</el-button>
            <el-button type="primary"  @click="plchoose(1)">下架已选中礼品</el-button>
            <!--<el-button type="primary"  @click="showallgifts">显示所有已上架礼品</el-button>-->
            <div class="f_r">
                <span>商品类型 : </span>
                <el-select v-model="typeSelect" placeholder="请选择" size="small" class=" margin_r_10" @change="selectChange">
                    <el-option
                    v-for="item in typeSelectData"
                    :key="item.type"
                    :label="item.text"
                    :value="item.type">
                    </el-option>
                </el-select>
                <span>商品状态 : </span>
                <el-select v-model="selectvalue" placeholder="请选择" size="small" class=" margin_r_10" @change="selectChange">
                    <el-option
                    v-for="item in selectdata"
                    :key="item.type"
                    :label="item.text"
                    :value="item.type">
                    </el-option>
                </el-select>
                <span>商品名称 : </span>
                <el-input class="width_150" size="small" v-model="queryacticvename" placeholder="请输入商品名称"></el-input>
                <el-button class="query_button" type="primary" size="small"  @click="query_gift_btn">搜 索</el-button>
            </div>
        </div>
        <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData"
                @selection-change="handleSelectionChange">
                    <el-table-column
                        type="selection"
                        width="55"> 
                    </el-table-column>
                    <el-table-column prop="index" label="序号" >
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称" >
                    </el-table-column>
                    <el-table-column label="商品图片">
                        <template scope="scope">
                            <div class="gift_table_imgbox">
                                <img :src="scope.row.logo" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column  label="商品类型">
                        <template scope="scope">
                            <p v-if="scope.row.productSource == 'SELF'">自有券</p></p>
                            <p v-if="scope.row.productSource == 'OUTER'">外部导入</p></p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="exchangePage" label="兑换条件">
                        
                    </el-table-column>
                    <el-table-column prop="count" label="数量">
                    </el-table-column>
                    <el-table-column width="60" label="位置排序码">
                        <template scope="scope">
                            <div>
                                <el-input @blur="changeOrder(scope.row)" @change="showasdasd" size="small" :value="scope.row.showOrder" ></el-input>
                                
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template scope="scope">
                            <p v-if="scope.row.marketed == '1'">已上架</p></p>
                            <p v-if="scope.row.marketed == '0'">已下架</p></p>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template scope="scope">
                            <el-button v-if="scope.row.status == 'start'" @click="soldoutgift_btn(scope.row.id)" type="text" size="small">下架</el-button>
                            <el-button v-if="scope.row.status == 'end'" @click="upshowgift_btn(scope.row.id)" type="text" size="small">上架</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="compilegift_btn(scope.row.id)" type="text" size="small">查看详情</el-button>
                            <span style="color: #ddd">|</span>
                            <el-button @click="removegift_btn(scope.row.id)" style="color:red;" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination 
                    @current-change="handleCurrentChange" 
                    :page-size="pageSize" 
                    layout="total, prev, pager, next,jumper" 
                    :total="totalCount" 
                    class="foot_nav">
                </el-pagination>
            </div>
        </div>
        <!--下架礼品-->
        <el-dialog
            title="下架礼品"
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
        <!--上架礼品-->
        <el-dialog
            title="上架礼品"
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
        <!--删除礼品-->
        <el-dialog
            title="删除礼品"
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
        <!--添加礼品-->
        <el-dialog
            title="添加商品"
            class="addgift_c"
            v-model="addgift_dialog"
            size="small"
            top="15%">
            <el-form label-width="105px" class="addtable_form" :model="addform" :rules="addrule" ref="addform">


                <el-form-item prop="typeOptionsValue" label="商品类型">
                    <el-select size="small" v-model="addform.typeOptionsValue" @change="selectType" placeholder="请选择">
                        <el-option
                        v-for="item in typeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sourceValue" label="商品来源">
                    <el-select size="small" v-model="addform.sourceValue" placeholder="请选择">
                        <el-option
                        v-for="item in sourceOpction"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="movableValue"  v-if="addform.sourceValue != 'OUTER'" label="请选择活动">
                    <el-select size="small"  v-model="addform.movableValue" @change="ticketId" placeholder="请选择">
                        <el-option
                        v-for="item in movableOpction"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 积分商城券池 -->
                <el-form-item v-if="addform.sourceValue == 'SELF'" label="券 ID : " prop="">
                    <p >{{ticketItemID}}</p>
                </el-form-item>
                <!-- 其他渠道 -->
                <el-form-item v-if="addform.sourceValue == 'OUTER'" label="券 ID : " prop="">
                    <el-input size="small" placeholder="请输入券ID" v-model="outerId"></el-input>
                </el-form-item>
                <el-form-item label="最低消费金额 : " prop="point">
                    <el-input size="small" type="number" class="width_150" placeholder="请输入最低消费金额" v-model="addform.point"></el-input>
                </el-form-item>
                <el-form-item   label="券有效期 : " >

                    <el-select v-model="validityType" class="validityTypeInline" placeholder="请选择" size="small">
                        <el-option
                        v-for="item in validityselectdata"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        class="validityTypeInline width_150"
                        v-if="validityType == '1' "
                        size="small"
                        v-model="value7"
                        type="daterange"
                        placeholder="请选择时间范围"
                        @change="timeChange1"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-if="validityType == '2' "  > 领取后 <el-input  class="width_50" placeholder="天数" type="number" size="small" ></el-input> 天内有效</span>
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


                <el-form-item class="ticket_limit" label="可用时间段 :">
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
                                        placeholder="选择时间范围">
                                    </el-time-picker>
                                    <el-button type="danger" v-if="index != 0" @click.prevent="removeDomain(time)">删除</el-button>
                                </div>
                                <el-button type="primary" v-if="times.length < 5" @click="addDomain">新增</el-button>
                        </div>
                        <span class="zj-spand">提示 : 促销时间段不可重叠,否则创建不成功!</span>
                    </div>
                </el-form-item>
                <el-form-item class="ticket_limit" label="不可用日期 :">
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

                




                <el-form-item label="商品名称 : " prop="name">
                    <el-input size="small" placeholder="请输入商品名称" v-model="addform.name"></el-input>
                </el-form-item>
                <el-form-item label="商品数量 : " prop="point">
                    <el-input size="small" type="number" placeholder="请输入商品数量" v-model="addform.point"></el-input>*小提示：商品数量请与发券数量填写一致
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
                <el-form-item label="商品详情 : " prop="textarea">
                    <el-input
                    resize="none"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="addform.textarea">
                    </el-input>

                </el-form-item>


                <el-form-item label="位置排序 : " >
                    <el-input size="small" type="number" class="width_150" placeholder="请输入位置排序码" v-model="weightLive"></el-input>
                </el-form-item>

                <el-form-item label="商品周期 : " >
                    <el-date-picker
                        v-model="value6"
                        type="daterange"
                        placeholder="请选怎时间范围"
                        @change="timeChange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>


                <el-form-item label="兑换条件">
                    <el-checkbox-group v-model="exchangeValue">
                        <el-checkbox v-for="item in exchangeOpction" :key="item.id"  :label="item.value"></el-checkbox>
                    </el-checkbox-group>
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
                    <el-input  v-if="exchangeAstrictValue != '不限制'" class="width_70px" v-model="exchangeAstrictCount" placeholder="请输入" size="small" ></el-input>

                </el-form-item>

                





            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addgift_true_btn">确 定</el-button>
                <el-button @click="addgift_dialog = false">取 消</el-button>
            </span>
        </el-dialog>
        <!--编辑礼品-->
        <el-dialog
            title="编辑礼品"
            class="addgift_c"
            v-model="compilegift_dialog"
            size="small"
            top="15%">
            <el-form label-width="480px" class="addtable_form" :model="compileform" :rules="compilerule" ref="compileform">
                <el-form-item label="礼品名称 : "  prop="name">
                    <el-input :disabled="true" size="small" placeholder="请输入名称" v-model="compileform.name"></el-input>
                </el-form-item>
                <el-form-item label="兑换所需积分 : " prop="point">
                    <el-input size="small" type="number"  placeholder="请输入积分" v-model="compileform.point"></el-input>
                </el-form-item>
                <el-form-item label="礼品库存数量 : " prop="totalNum">
                    <el-input size="small" type="number"  placeholder="请输入数量" v-model="compileform.totalNum"></el-input>
                </el-form-item>
                <el-form-item label="礼品图片 : " prop="logo">
                    <el-upload
                            class="avatar-uploader"
                            :disabled="true"
                            action="/business/file!fileUpload.action"
                            :data="shopid"
                            :show-file-list="false"
                            :on-success="logoonsuccess1"
                            :before-upload="logobeforeAvatarUpload1">
                        <img v-if="imageUrltologo1" :src="imageUrltologo1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>                   
                </el-form-item>
                <el-form-item label="是否上架 : " >
                    <el-radio-group v-model="compileform.status">
                        <el-radio label="start">是</el-radio>
                        <el-radio label="end">否</el-radio>
                    </el-radio-group>
                </el-form-item>




                




            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="compilegift_true_btn">确 定</el-button>
                <el-button @click="compilegift_dialog = false">取 消</el-button>
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
                <el-button type="primary" @click="queryshops_btn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { getShopLists,savaGift,giftLibrary,selectGift,deleteGift,afterGift,afterGifts,integralStoreList,upPutAway,downSoldOut,deleteAction,sort,addtype,ticketInfo,addStiorInfo} from '../../../api/api';
    import {formateDate,formDateSecond,formDateSecond59,formatTimestamp,weekDispose,DateLong} from '../../../api/CommonMethods'
    export default {
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
                checkList:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                checkList1:["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
                timelimitselectvalue:'',
                timelimitselectdata:[
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                detallimitselectvalue:'',
                detallimitselectdata:[
                    {value: '1', label: '限制'},
                    {value: '2', label: '不限制'},
                ],
                validityType:'1',
                validityselectdata:[
                    {value: '1', label: '指定时间'},
                    {value: '2', label: '相对时间'},
                ],

                typeSelectData:[
                    {text:'全部',type:''},
                    {text:'代金券',type:'MONEY'},
                    {text:'折扣券',type:'RATE'},
                    {text:'现金抵价券',type:'CASH'},
                ],
                typeSelect:'',
                selectdata:[
                    {text:'全部',type:''},
                    {text:'已上架',type:'up'},
                    {text:'已下架',type:'down'},
                    {text:'已结束',type:'over'},
                ],
                selectvalue:'',
                addform:{
                    name:'',
                    status:'start',
                    totalNum:'',
                    point:'',
                    // logo:'',
                    typeOptionsValue:'',
                    sourceValue:'',
                    movableValue:'',
                    textarea:''
                },
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
                    textarea:''
                },
                addrule:{
                    name:[
                        { required: true, message: '请输入礼品名称', trigger: 'blur' },
                        { max: 15, message: '礼品名称长度大于15个字符', trigger: 'blur' },
                    ],
                    totalNum:[
                        { required: true, message: '请输入礼品库存数量', trigger: 'blur' },
                        {validator: totalNumvalidate, trigger: 'blur'},
                    ],
                    point:[
                        { required: true, message: '请输入商品数量', trigger: 'blur' },
                    ],
                    logo:[
                        // { required: true, message: '请上传图片', trigger: 'blur' },
                    ],
                    typeOptionsValue:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    sourceValue:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    movableValue:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    textarea:[
                        { required: true, message: '请输入内容信息', trigger: 'blur' },
                    ]
                },
                compilerule:{
                    name:[
                        { required: true, message: '请输入礼品名称', trigger: 'blur' },
                        { max: 10, message: '长度小于10个字符', trigger: 'blur' },
                    ],
                    totalNum:[
                        { required: true, message: '请输入礼品库存数量', trigger: 'blur' },
                        {validator: totalNumvalidate, trigger: 'blur'},
                        { max: 10, message: '长度小于10个字符', trigger: 'blur' },
                    ],
                    point:[
                        { required: true, message: '请输入兑换所需积分', trigger: 'blur' },
                        {validator: pointvalidate, trigger: 'blur'},
                        { max: 10, message: '长度小于10个字符', trigger: 'blur' },
                    ],
                    logo:[
                        // { required: true, message: '请上传图片', trigger: 'blur' },
                    ],
                    typeOptionsValue:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    sourceValue:[
                        { required: true, message: '请选择类型', trigger: 'change' },
                    ],
                    movableValue:[
                       { required: true, message: '请选择类型', trigger: 'change' }, 
                    ],
                    textarea:[
                        { required: true, message: '请输入内容信息', trigger: 'blur' },
                    ]
                },
                pageSize:10,
                pageNumber:'1',
                model_test:'',
                removegift_dialog:false,
                compilegift_dialog:false,
                upshowgift_dialog:false,
                imageUrltologo: '',
                imageUrltologo1: '',
                shopid:{id:''},
                radio:'1',
                addgift_dialog:false,
                soldoutgift_dialog:false,
                totalCount:0,
                queryacticvename:'',
                choosegiftid:'',
                tableData:[],
                chooseafterid:'',
                multipleSelection:'',
                choosedig:'',
                showOrder:'',
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
                    value: 'CASH',
                    label: '现金抵换券'
                    },

                ],
                typeOptionsValue:'',
                ypeOptionsList:'',
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
                outerId:'',
                sourceValue:'',
                ticketItemID:'',
                movableOpction:[
                    {
                    value: '选项1',
                    label: '活动1' 
                    },
                    {
                    value: '选项2',
                    label: '活动2' 
                    }
                ],
                movableValue:'',
                textarea:'',
                value6:'',
                value7:'',
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
                exchangeValue:[],
                exchangeAstrictOpction:[
                    {
                        value: '不限制',
                        label: '不限制'
                    },
                    {
                        value: '天',
                        label: '每日'
                    },
                    {
                        value: '月',
                        label: '每月'
                    },
                    {
                        value: '总数',
                        label: '总数限制'
                    }
                ],
                exchangeAstrictValue:'不限制',
                integralValue:'',
                moneyValue:'',
                addTimeValue:'',
                addTimeValue1:'',
                exchangeAstrictCount:'',
                weightLive:'',
                forbidden_use_date:[],
                shopsnumber: '',
                dialogVisible_queryshops: false,
                checkedshops: [],
                isIndeterminate: true,
                checkAll: false,
                Objects:'',
                checkedShopPid:[],

            }
        },
        mounted: function() {
            this.cookie();
            this.getGiftList();
            this.shopList();
        },
        methods: {
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
            //礼品显示状态变化时
            selectChange(){
                this.getGiftList(); 
            },
            //获取礼品库列表
            getGiftList(){
                let data = this.qs.stringify({
                    status:this.selectvalue,
                    name:this.queryacticvename,
                    pageNumber:this.pageNumber,
                    voucherType:this.typeSelect,
                    pageSize:this.pageSize,
                });
                integralStoreList(data).then(res => {

                    console.log(res)
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
                            this.totalCount = res.content.totalCount;
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


                console.log(istype)    

                return
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
            //添加商品
            addgift_btn(){
                this.addgift_dialog = true;
                this.addform.name = '';
                this.addform.status = 'start';
                this.addform.totalNum = '';
                this.addform.point = '';
                // this.addform.logo = '';
                // this.imageUrltologo= '';
                this.addform.typeOptionsValue ='';
                this.addform.sourceValue ='';
                this.addform.movableValue ='';
                this.addform.textarea = '';
            },
            //添加商品弹窗内,点击确定
            addgift_true_btn(){
                

                
                this.$refs['addform'].validate((valid) => {
                    if (valid) {
                        this.start_addgift();
                    } else {
                        return;
                    }
                });
            },
            //添加礼品接口
            start_addgift(){

                let ObjectDate ={
                    voucherType:this.addform.typeOptionsValue,      //商品分类
                    productSource:this.addform.sourceValue,         //商品来源
                    activeId :this.ticketItemID,                    //活动id
                    itemId:this.outerId,                            //券ID
                    name:this.addform.name,                         // 商品名称
                    count:this.addform.point,                       //数量  
                    // logo:this.imageUrltologo,                    //商品图片
                    memo:this.addform.textarea,                     //文本框输入信息
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



                    //*****其他渠道*******
                    grade:'',                                       //可领取级别
                    gradeCN:'',                                     //可领取级别中文
                    validType:'',                                   //券有效期类型
                    validDays:'',                                   //领取后N天有效
                    validStartDate:'',                              //有效期开始日期
                    validEndDate:'',                                //有效期结束日期
                    shopInfo:'',                                    //适用门店
                    amount:'',                                      //优惠券面额
                    minCost:'',                                     //满金额
                    discount:'',                                    //折扣力度
                    maxAmount:'',                                   //最高优惠金额，折扣券有效
                    isShare:'',                                     //是否可转赠 true 为可转赠
                    categoryType:'',                                //行业分类
                    exchangeWeek:'',                                //可积分兑换的星期，存星期几逗号隔开 1,3,7
                    exchangeTime:'',                                //可积分兑换的时间支持多个 开始结束逗号分隔，多个时间之间^分割 如：16:00:00,20:00:00^21:00:00,22:00:00
                    forbiddenExchangeDate:'',                       //不可积分兑换日期：开始结束逗号分隔，多个时间之间^分割 如：2016-03-03,2016-03-08^2016-10-01,2016-10-01
                    marketed:'',                                    //上架 0否1是
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
                        ObjectDate.forbiddenUseDate = this.forbidden_use_date.toString().replace('^,','^').slice(0,-1)
                    }
                }

                console.log(ObjectDate)

                return;

                let data = this.qs.stringify(ObjectDate);
                addStiorInfo(data).then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.$message.success('添加成功');
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
            logoonsuccess(response, file, fileList) {

                if (response.error == 0) {
                    this.$message('上传LOGO图片成功!');
                    this.logoimgurl = file.url;
                    this.imageUrltologo = URL.createObjectURL(file.raw);
                    this.addform.logo = response.url;

                    console.log(this.imageUrltologo)
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
            logoonsuccess1(response, file, fileList) {
                // if (response.error == 0) {
                //     this.$message('上传LOGO图片成功!');
                //     this.logoimgurl = file.url;
                //     this.imageUrltologo1 = URL.createObjectURL(file.raw);
                //     this.compileform.logo = response.url;
                //     this.compileform.logoId = response.imageId;
                // }
                // else if(response.error == 1){
                //     this.$message(response.url);
                // }
            },
            logobeforeAvatarUpload1(file) {
                // this.$message('正在上传');
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            changeOrder(row){

                let data = this.qs.stringify({
                    productId:row.id,
                    showOrder:this.showOrder,
                    
                });
                sort(data).then(res => {
                    this.handleCurrentChange()
                    console.log(res)
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }
                    
                })

            },
            showasdasd(ss){
                this.showOrder = ss
            },
            selectType(){

                 let data = this.qs.stringify({
                    voucherType:this.addform.typeOptionsValue,
                    
                });
                addtype(data).then(res => {
                    this.ypeOptionsList = res.content;

                    this.ypeOptionsList.forEach(e =>{
                        e.value = e.id;
                        e.label = e.brandName;
                        return e
                    })
                    this.movableOpction = this.ypeOptionsList
                    console.log(this.ypeOptionsList)
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
                        console.log(res,"详情信息")
                        if(res.errorCode == '30005'){
                            this.$router.push({path: '/login'});
                        }
                        
                    })    
                }
            },
            timeChange(val){
               this.addTimeValue = val.split("至");
            },
            timeChange1(val){
               this.addTimeValue1 = val.split("至");
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
            againchooseshop() {
                this.dialogVisible_queryshops = true;
                this.checkedshops = this.checkedshopstrue;
            },
            handleCheckAllChange(event) {
                this.hhddatas2 = [];
                for (var i = 0; i < this.Objects.length; i++) {
                    this.hhddatas2.push(this.Objects[i].id);
                }
                this.checkedshops = event.target.checked ? this.hhddatas2 : [];
                this.isIndeterminate = false;
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
        }
    }
</script>
<style scoped>
    .addtable_form {
        width: 480px;
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
    .width_300{
        width: 300px;
    }
   
</style>