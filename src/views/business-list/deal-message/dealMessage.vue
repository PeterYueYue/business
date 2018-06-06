<!--会员列表-->
<template>
    <div class="sq_main">
        <div class="tab_header padding_t_l_r_0">
            <span class="title">店铺名:</span>
            <el-input class="query_input  chnageWidth" size="small" @keyup.enter.native="query" v-model="shopName" placeholder="请输入店铺名"></el-input>
            <span class="title">会员卡号:</span>
            <el-input class="query_input  chnageWidth" size="small" type="number" @keyup.enter.native="query" v-model="targetCardNo" placeholder="请输入会员卡号"></el-input>
            <span class="title">手机号:</span>
            <el-input class="query_input  chnageWidth" size="small"  type="number" @keyup.enter.native="query" v-model="mobile" placeholder="请输入手机号"></el-input>
            <span class="title">日期:</span>
            <!-- <el-date-picker
            size="small"
            v-model="times"
            placeholder="请选择时间范围"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">

            </el-date-picker> -->



            <el-date-picker
            v-model="times"
            placeholder="请选择时间范围"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
            </el-date-picker>
            <el-button class="query_button" :disabled="disabled" size="small" type="primary" @click="query">搜 索</el-button>
        </div>
        <div class="block">
            <el-table
                    :data="tableData2"
                    style="width: 100%">
                <el-table-column
                        
                        prop="externalCardNo"
                        width="150"
                        label="会员卡卡号">
                </el-table-column>
                <el-table-column
                        prop="shopName"
                        label="店铺名称">
                </el-table-column>
                
                <el-table-column
                        prop="mobile"
                        label="手机号">
                        <template slot-scope="scope">
                            <span>{{ scope.row.mobile}} </span>
                            <img :class="{isshowicon:scope.row.isallphone}" @click="check_phone_f(scope.$index,scope.row.id)" class="check_phone_icon" src="../../../assets/images/check_phone.png" alt="">
                        </template>
                </el-table-column>
                <el-table-column
                        prop="gmtPayment"
                        label="付款时间">
                </el-table-column>
                <el-table-column
                        width="60"
                        prop="totalAmount"
                        label="总金额">
                </el-table-column>
                <el-table-column
                        width="60"
                        prop="buyerPayAmount"
                        label="实付金额">
                </el-table-column>
                <el-table-column
                        prop="gmtRefund"
                        label="退款时间">
                </el-table-column>
                <el-table-column
                        prop="buyerRefundAmount"
                        label="退款金额">
                </el-table-column>
                <el-table-column
                        width="100"
                        prop="pointShow"
                        label="变动积分">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="10"
                    layout="total, prev, pager, next,jumper"
                    :total="totalPage"
                    class="foot_nav">
            </el-pagination>
        </div>
    </div>
</template>

<script>


    import {getDealMessage,gettruephone} from '../../../api/api';

    export default {
        data() {
            return {

                //输入框
                targetCardNo: '',
                shopName:'',
                mobile:'',
                times:'',
                disabled: false,
                //总记录数
                totalPage: 1,
                memberkinds: {
                    name_true: true,
                    name_false: false
                },
                tableData2: [],
                pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value5: ''
                    }
        },
        mounted: function () {
            // let data = this.qs.stringify({
            //     pageNumber: '1',
            // });
            // this.getList(data);
        },
        methods: {
            
            handleSizeChange(val) {
            },
            ViewDetails(index) {
            },
            handleCurrentChange(val) {
                let data = this.qs.stringify({
                    pageNumber: val,
                    count: '10',
                    targetCardNo: this.targetCardNo,
                    shopName: this.shopName,
                    mobile:this.mobile,
                    times:this.times
                    
                });

                console.log(data)
                this.getList(data);
            },
            memberkindschange: function () {

                var data = this.qs.stringify({
                    page: '1',
                    count: '10',
                    targetCardNo: this.targetCardNo,
                    shopName: this.shopName,
                    mobile:this.mobile,
                    times:this.times
                });
                this.getList(data);
            },
            getList(data) {
                getDealMessage(data).then(res => {

                    this.tableData2 = res.content.result
                    this.totalPage = res.content.total
                    this.disabled = false;
                })
            },
            query: function () {
                var sT = ""
                var eT = ""
                if(this.times[0]&&this.times[1]){
                    var sT = this.times[0].toLocaleDateString().replace(/\//g,"-").replace(/上午|下午/g,"");
                    var eT = this.times[1].toLocaleDateString().replace(/\//g,"-").replace(/上午|下午/g,"");
                }
                this.disabled = true;
                this.$message('搜索中...');
                let data = this.qs.stringify({
                    page: '1',
                    count: '10',
                    targetCardNo: this.targetCardNo,
                    shopName: this.shopName,
                    mobile:this.mobile,
                    gmtPaymentStart:sT,
                    gmtPaymentEnd:eT
                });
                this.getList(data);
            }
        }
    }
</script>
<style scoped>
    .check_phone_icon{
        width: 20px;
        position: relative;
        top: 5px;
        display: none;
        cursor: pointer;
    }
    .cell:hover>.check_phone_icon{
        display: inline-block;
    }
    .isshowicon{
        display: none !important;
    }
    .el-date-editor{
        width: 304px;
    }
    .el-input__inner{
        height: 30px;
        
    }
    .selectInput{
        width: 400px;
    }
    .el-picker-panel{
        left: 262px !important;
    }
    .query_input{
        width: 150px;
        margin-right: 15px;
    }
    .tab_header .title{
        font-size: 12px;
        color: black
    }
    .el-date-editor--daterange{
        width:260px;
    }

@media screen and (max-width: 1425px) {
    .el-date-editor--daterange{
        width:200px !important;
    }
}
@media screen and (max-width: 1330px) {
    .chnageWidth{
        width:120px !important;
    }
}
@media screen and (max-width: 1260px) {
    .chnageWidth{
        width:110px !important;
    }
}  
@media screen and (max-width: 1220px) {
    .chnageWidth{
        width:100px !important;
    }
}    
</style>
