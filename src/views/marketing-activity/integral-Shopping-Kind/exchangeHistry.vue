<template>
    <div class="padding_16">
        <div class="tab_header  duihuanjifen padding_t_l_r_0">

            选择日期：
            <el-date-picker
            class="marginLeft20px inputWidth"
            size="small"
            v-model="value7"
            type="daterange"
            align="right"
            @change="changeTime"
            unlink-panels
            placeholder="请选择时间范围"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
            </el-date-picker>
            活动类型：
            <el-select  class="marginLeft "  size="small" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> <br/>
            商品名称：
            <el-input size="small" class="marginTop10px inputWidth marginLeft20px" v-model="name" placeholder="请输入商品名称"></el-input>
            会员手机号：
            <el-input size="small" class="marginTop10px inputWidth marginLeft20px" v-model="mobile" placeholder="请输入会员手机号"></el-input>
            会员卡号：
            <el-input size="small" class="marginTop10px inputWidth marginLeft20px" v-model="carCode" placeholder="请输入会员卡号"></el-input>
            <el-button class="query_button marginLeft20px" type="primary" size="small"  @click="query_btn">搜 索</el-button>
        </div>
        <ul class="dataBoard">
            <li class="boardList boardItemColeA">
                <div class="dataTitle">累计兑换人数</div>
                <div class="dataInfo">{{statisticsData.countMember}}</div>
            </li>
            <li class="boardList boardItemColeB">
                <div class="dataTitle">累计兑换次数</div>
                <div class="dataInfo">{{statisticsData.countTime}}</div>
            </li>
            <li class="boardList boardItemColeC">
                <div class="dataTitle">累计消耗积分</div>
                <div class="dataInfo">{{statisticsData.countPoint}}</div>
            </li>
            <li class="boardList boardItemColeD">
                <div class="dataTitle">累计收益金额</div>
                <div class="dataInfo">{{statisticsData.countMoney}}</div>
            </li>
        </ul>
        <div class="tab_list">
            <div class="block">
                <el-table
                :data="tableData">
                    <el-table-column prop="memberName" label="会员姓名">
                    </el-table-column>
                    <el-table-column prop="cardNo" label="会员卡号">
                    </el-table-column>
                    <el-table-column prop="name" label="商品名称">
                    </el-table-column>
                    <el-table-column prop="productType" label="商品分类">
                    </el-table-column>
                    <el-table-column prop="point" label="消耗积分">
                    </el-table-column>
                     <el-table-column prop="money" label="支付金额">
                    </el-table-column>
                    <el-table-column prop="createDate" label="兑换日期">
                    </el-table-column>
                    
                    <!-- <el-table-column prop="exchangeDate" label="兑换时间">
                    </el-table-column>
                    <el-table-column label="领取时间">
                        <template slot-scope="scope">
                            <p v-if="scope.row.status == 'not_recevied'">未领取</p></p>
                            <p v-if="scope.row.status == 'already_recevied'">{{scope.row.receiveDate}}</p></p>
                        </template>
                    </el-table-column> -->
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
    </div>
</template>
<script>
import {formateDate,formDateSecond,formDateSecond59,formatTimestamp,weekDispose,DateLong} from '../../../api/CommonMethods'
    import {exchangehistryList} from '../../../api/api';
    export default {
        data() {
            return {
                pageSize:10,
                pageNumber:1,
                searchText:'',
                totalCount:10,
                tableData:[],
                pickerOptions2:{
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
                value6: '',
                value7: '',
                options: [{
                value: '',
                label: '全部'
                }, {
                value: 'MONEY',
                label: '代金券'
                }, {
                value: 'RATE',
                label: '折扣券'
                }],
                value: '',
                name:'',
                carCode:'',
                mobile:'',
                statisticsData:'',
                timeST:'',
                timeED:'',
            }
        },
        mounted: function() {
            this.query_btn();
        },
        methods: {
            //搜索
            query_btn(){
                let data = this.qs.stringify({
                    pageNumber: this.pageNumber,
                    name:this.name,
                    cardNo:this.carCode,
                    mobile:this.mobile,
                    startDate: this.timeST,
                    endDate: this.timeED,
                    productType:this.value,
                });
                exchangehistryList(data)
                .then(res => {
                    if(res.errorCode == '30005'){
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == '10000'){
                        if(res.status == 'success'){
                            this.tableData = res.content.result;
                            this.tableData.forEach(e =>{
                                if(e.productType == 'CASH'){
                                    e.productType = '现金抵价券'    
                                } else if(e.productType == 'MONEY'){
                                    e.productType = '代金券' 
                                } else if(e.productType == 'RATE'){
                                    e.productType = '折扣券' 
                                } else if(e.productType == 'EXCHANGE'){
                                    e.productType = '兑换券' 
                                }
                                return e;
                            })
                            this.totalCount = res.content.totalCount;
                            this.statisticsData = res.content;
                        }else if(res.status == 'error'){
                            this.$message.error(res.message);
                        }
                    }
                })
            },
            //页面改变时
            handleCurrentChange(val){
                this.pageNumber = val;
                this.query_btn();
            },
            changeTime(){
                    this.timeST = ''
                    this.timeED = ''
                if(this.value7[0] && this.value7[1]){
                    this.timeST = formateDate(this.value7[0]) + " "+"00:00:00"
                    this.timeED = formateDate(this.value7[1]) + " "+"23:59:59"
                }
            }

                
        }
    }
</script>
<style>

.tab_header{
    font-size: 12px;
}
.marginTop10px{
    margin-top: 20px;
}
.marginLeft20px{
    margin-right: 20px;
}
.marginLeft{
    margin-left: 11px;
}
.duihuanjifen .inputWidth{
    width: 150px !important;
}
.dataBoard{
    text-align: center;
    margin: 15px 0;
    display: flex;
    justify-content: space-between;

}
.dataBoard .boardList{
    text-align: center;
    width: 23%;
    height: 90px;
    border-radius: 5px;
    overflow: hidden;
    vertical-align: top;
    font-size:14px; 
    color: #ffffff;
    font-weight: 700;
}
.boardItemColeA{background-color: #39a839;}
.boardItemColeB{background-color: #f40850;}
.boardItemColeC{background-color: #f7aa25;}
.boardItemColeD{background-color: #2595ec;}

.dataBoard .dataTitle{
    line-height: 30px;
    background-color: rgba(0, 0, 0, .15)
}
.dataBoard .dataInfo{
    margin-top: 20px;
    font-size:16px; 
    font-family: Arial, Helvetica, sans-serif;

}
.duihuanjifen .el-input--small{
    width: 150px;
}
</style>