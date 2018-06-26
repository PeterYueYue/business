<!--积分操作记录-->
<template>
    <div  class="sq_main">
        <div class="tab_header padding_t_l_r_0">
            <el-form class="form2" label-width="100px" >
                <el-form-item label="操作员手机号:">
                    <el-input class="query_input" placeholder="" size="small" v-model="pointerMobile"></el-input>
                </el-form-item>
                <el-form-item label="会员卡号:">
                    <el-input class="query_input" size="small" v-model="cardNo"></el-input>
                </el-form-item>
            </el-form>
            <el-form class="form2"  label-width="100px" >
                <el-form-item label="操作员姓名:">
                    <el-input class="query_input" size="small" v-model="pointerName"></el-input>
                </el-form-item>
                <el-form-item label="会员手机号:">
                    <el-input class="query_input" size="small" v-model="memberMobile"></el-input>
                </el-form-item>
            </el-form>
            <el-form class="form2" label-width="100px" >
                <el-form-item label="日期范围:">
                   <el-date-picker
                        v-model="times1"
                        type="daterange"
                        align="right"
                        size="small"
                        @change="changeTime"
                        placeholder="选择日期范围"
                        >
                    </el-date-picker> 
                </el-form-item>
                <el-form-item label="会员姓名:">
                    <el-input class="query_input" size="small" v-model="memberName"></el-input>
                <el-button class="query_button margin_left"  @click="query" :disabled="disabled" size="small" type="primary" >搜 索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="block">
            <el-table
                    :data="tableData2"
                    style="width: 100%">
                <el-table-column
                        prop="modifyDate"
                        label="操作时间">
                </el-table-column>
                <el-table-column
                        prop="pointerName"
                        label="操作人">
                </el-table-column>
                <el-table-column
                        prop="memberName"
                        label="会员姓名">
                </el-table-column>
                <el-table-column
                        prop="cardNo"
                        label="会员卡号">
                </el-table-column>
                <el-table-column
                        prop="point"
                        label="变更积分数">
                </el-table-column>
                <el-table-column
                        prop="memo"
                        label="备注">
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
    import {getIntegraList} from '../../../api/api';
    export default {
        data() {
            return {
                //输入框
                inputValue: '',
                disabled: false,
                //总记录数
                totalPage: 1,
                selectvalue: '1',
                memberkinds: {
                    name_true: true,
                    name_false: false
                },
                tableData1: [],
                tableData2: [],
                cardNumber:'',
                iphone:'',
                times1:[],
                pointerMobile:'',
                cardNo:'',
                pointerName:'',
                memberMobile:'',
                memberName:'',
            }
        },
        mounted: function () {
            let data = this.qs.stringify({
                pageNumber: '1',
                cardNo: '',
                memberMobile: '',
                memberName:'',
                pointerName:'',
                pointerMobile:'',
                startDate:'',
                endDate:'',
            });
            this.getList(data);
        },
        methods: {
            
            handleSizeChange(val) {
            },
            ViewDetails(index) {
            },
            handleCurrentChange(val) {

                let data = this.qs.stringify({
                    pageNumber: val,
                    name:this.inputValue,
                    cardNo:this.cardNumber,
                    mobile:this.iphone,
                });
                this.getList(data);
            },
            memberkindschange: function () {
                if (this.selectvalue == 1) {
                    var data = this.qs.stringify({
                        pageNumber: '1',
                        name:this.inputValue,
                        cardNo:this.cardNumber,
                        mobile:this.iphone,
                    });
                    this.memberkinds.name_true = true;
                    this.memberkinds.name_false = false;
                };
                if (this.selectvalue == 0) {
                    var data = this.qs.stringify({
                        pageNumber: '1',
                        name:this.inputValue,
                        cardNo:this.cardNumber,
                        mobile:this.iphone,
                    });
                    this.memberkinds.name_true = false;
                    this.memberkinds.name_false = true;
                };
                this.getList(data);
            },
            changeTime(val){
                if(val !== ''){
                    this.times= val.split(" - ");
                    this.startDate = this.times[0]+' 00:00:00';
                    this.endDate = this.times[1]+' 23:59:59';
                }else{
                    this.startDate = '';
                    this.endDate = '' ;    
                }
            },
            getList(data) {
                
                this.$store.dispatch('changeLoding')
                getIntegraList(data).then(res => {
                    console.log(res,"1212")

                    this.$store.dispatch('closeLoding')
                    this.disabled = false;
                    this.$message.closeAll();
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else {
                        if (this.selectvalue == 1) {
                            this.tableData2 = res.content.result;
                            this.totalPage = res.content.total;
                        } else {
                            this.tableData1 = res.content.result;
                            this.totalPage = res.content.total;
                        }
                    }
                })
            },
            query: function () {
                this.disabled = true;
                this.$message('搜索中...');
                let data = this.qs.stringify({
                    pageNumber: '1',
                    cardNo: this.cardNo,
                    memberMobile: this.memberMobile,
                    memberName:this.memberName,
                    pointerName:this.pointerName,
                    pointerMobile:this.pointerMobile,
                    startDate:this.startDate,
                    endDate:this.endDate,
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
    .query_input{
        width: 150px;
    }
    .form2{
        display: inline-block;
    }
    .width_200px{
        width: 200px;
    }
    .margin_left{
        margin-left: 50px;
    }
    
</style>

