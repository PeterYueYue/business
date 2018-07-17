<!--单品券列表/点击查看单品券详细信息-->
<template>
    <div>
        <div v-if="message">
            <div class="ticket_show">
                <div>
                    <img src="../../../assets/images/ticket.png" alt="">
                    <span v-if="message.amount">{{message.amount}}元</span>
                    <span v-if="message.amount">{{message.amount}}元</span>
                    <p>活动日期:{{message.pick_start_date}}至{{message.pick_end_date}}</p>
                </div>
            </div>
            <div class="ticket_rule  margin_top100">
                <span class="ticket_title_all">活动内容</span>
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item class="ticket_title" label="活动名称 :">
                        <span>{{message.voucherName}}</span>
                    </el-form-item>
                    <el-form-item class="ticket_title" label="出资人账号 :">
                        <span>{{message.fundAccount}}</span>
                    </el-form-item>
                    <el-form-item class="ticket_downtype" label="现金抵价券 :">
                        抵扣 {{message.amount}} 元
                        <!-- <div v-if="message.voucher_type === '减至券'">
                            <el-radio v-model="form.radio" label="选中">减到固定金额</el-radio>
                            <br>
                            <span>商品原价 {{message.old_price}} 元,减到 {{message.min_cost}} 元</span>
                            <span class="ticket_tip">优惠价即为用户需付款金额。例如:原价10元，优惠价2元，用户仅需付2元</span>
                        </div> -->
                        <div v-if="message.voucher_type === '代金券'">
                            <!--<el-radio v-model="form.radio" label="选中">立减</el-radio>
                            <br>-->
                            <span>立减 {{message.amount}} 元</span>
                        </div>
                    </el-form-item>
                    <el-form-item class="code_shop" label="适用门店 :">
                        <span>已选 {{shops.length}} 家门店&#X3000;</span>
                        <el-button type="text" @click="dialogVisible_shopslist = true">点击查看</el-button>
                        <el-dialog
                                title="适用门店列表"
                                v-model="dialogVisible_shopslist"
                                size="tiny"
                                top="20%">

                            <!--<div class="details_shoplist" v-for="item in shops">-->
                            <!--<p>{{item.shopName}}</p>-->
                            <!--<p v-if="item.receviedStatus == 2">拒绝</p>-->
                            <!--<p v-if="item.receviedStatus == 1">同意</p>-->
                            <!--<p v-if="item.receviedStatus == 0">未操作</p>-->
                            <!--</div>-->
                            <table class="zj-table" border="0">
                                <thead>
                                <tr>
                                    <th>门店</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in shops">
                                    <td>{{item}}</td>
                                </tr>
                                </tbody>
                            </table>
                            <span slot="footer" class="dialog-footer">
                            </span>
                        </el-dialog>
                    </el-form-item>
                    <el-form-item class="ticket_number" label="数量 :" v-if="message.quantity != 9999">
                        <span>{{message.voucherQuantity}}</span>
                    </el-form-item>
                    <el-form-item class="ticket_number" label="数量 :" v-if="message.quantity == 9999">
                        <span>不限制</span>
                    </el-form-item>
                    <el-form-item label="领券时间 :">
                        <span>{{message.publishStartTime}}至{{message.publishEndTime}}</span>
                    </el-form-item>
                    <el-form-item label="适用商品 :" v-if="tableDataLength != 0">
                        <span>已选 {{tableDataLength}} 种商品&#X3000;</span>
                        <el-button type="text" @click="clickmoregoods">点击查看</el-button>
                    </el-form-item>
                    <el-form-item class="ticket_number" label="券有效期 :">
                        <span  v-if="message.voucherDataType == 'RELATIVE'" >领取后 {{message.duration}} 日内有效</span>
                        <span v-if="message.voucherDataType == 'ABSOLUTE'">{{message.start}} 至 {{message.end}}</span>
                    </el-form-item>
                    <el-form-item class="ticket_number" label="模板ID :">
                        <span   >{{message.templateId}}</span>
                    </el-form-item>
                    <!-- <el-form-item class="ticket_number" v-if="message.min_cost == 0" label="使用条件 :">
                        <span>不限制</span>
                    </el-form-item> -->
                    <!-- <el-form-item class="ticket_number" v-if="message.min_cost != 9999 && message.min_cost != 0" label="使用条件 :">
                        <span>满 {{message.min_cost}} 元可用</span>
                    </el-form-item> -->
                    <el-dialog
                            class="dialog_goodslist"
                            title="适用商品列表"
                            v-model="dialogVisible_goodslist"
                            size="small"
                            top="15%">
                        <span class=" line_height_30 font14">门店选择 :&nbsp;</span>
                        <el-select v-model="selectvalue" placeholder="请选择" size="small" @change="clickmoregoods"
                                class=" margin_r_10">
                            <el-option
                                    v-for="item in shops"
                                    :key="item.id"
                                    :label="item"
                                    > 
                            </el-option>
                        </el-select>
                        <el-table
                                :data="tableData"
                                class="margin_t_20"
                                style="width: 100%">
                            <el-table-column
                                    type="index"
                                    label="商品序号"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsName"
                                    label="商品名称">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsClassIfy"
                                    label="商品分类">
                            </el-table-column>
                            <el-table-column
                                    prop="goodsPrice"
                                    label="商品价格">
                            </el-table-column>
                        </el-table>
                        <span slot="footer" class="dialog-footer">
                        </span>
                    </el-dialog>
                </el-form>
                <span class="ticket_title_all">规则设置</span>
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item class="ticket_title" label="最低消费 :" v-if="message.floorAmount != 9999">
                        <span>{{message.floorAmount}}</span> 元
                    </el-form-item>
                    <el-form-item class="ticket_title" label="最低消费 :" v-if="message.floorAmount == 9999">
                        <span>不限制</span>
                    </el-form-item>
                    <el-form-item class="ticket_title" label="使用说明 :">
                        <span>{{message.voucherDescription}}</span>
                    </el-form-item>
                    <el-form-item v-if="message.needExchange == '是'" label="兑换所需积分 :">
                        <span>{{message.binding_point}} 积分</span>
                    </el-form-item>
                    <!--<el-form-item v-if="form.code_radio == 2" class="setways" label="投放渠道 :">-->
                    <!--<span >{{message.publish_channels}}</span>-->
                    <!--</el-form-item>-->
                    <!-- <el-form-item  label="领券时间 :">
                        <p v-if="message.exchange_week == ''">不限制</p>
                        <p v-if="message.exchange_week != ''">无</p>
                    </el-form-item>
                    <el-form-item  label="核销时间 :">
                        <span v-if="message.use_week == ''">不限制</span>
                        <p v-if="message.use_week != ''">无</p>
                    </el-form-item> -->
                    <el-form-item v-if="message.templateStatus == '草稿'" label="完成支付 :">
                        <a target="_blank" :href="message.confirmUri">支付</a>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="bottom_button" @click="back" size="small">返 回</el-button>
                        <el-button class="bottom_button" @click="dialogVisible_xiajia = true" size="small"
                                   type="primary" v-if="offline == '草稿'">
                            下 架
                        </el-button>
                    </el-form-item>
                    <el-dialog
                            title="提示"
                            v-model="dialogVisible_xiajia"
                            size="tiny"
                            top="35%">
                        <p style="text-align: center;">下架后活动将立即结束,已发出的券在有效期内依然可以使用,是否继续?</p>
                        <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible_xiajia = false">取 消</el-button>
                      <el-button type="primary" @click="soldOut">确 定</el-button>
                  </span>
                    </el-dialog>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {getProductDetail,cashItemInfo, cashItemLower,getGoodsByShop} from '../../../api/api'

    export default {
        data() {
            return {
                selectvalue:'',
                offline:'',
                tableData: '',
                shops: [],
                dialogVisible_xiajia: false,
                dialogVisible_goodslist: false,
                dialogVisible_shopslist: false,
                form: {
                },
                message: '',
                shopsLength: '',
                tableDataLength: '',
                id: ''
            }
        },
        mounted: function () {


            let id = this.$route.query.id;
            let data = this.qs.stringify({
                id: id
            });
            this.getDetail(data);
        },
        methods: {
            clickmoregoods(){
                 this.dialogVisible_goodslist = true;
                 let data = this.qs.stringify({
                     voucherId:this.id,
                     shopId:this.selectvalue,
                })
                 getGoodsByShop(data)
                    .then(res =>{
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else if(res.errorCode == 10000){
                            this.tableData = res.content;
                        }
                    })
            },
            soldOut: function () {
                this.dialogVisible_xiajia = false;
                let data = this.qs.stringify({
                    id: this.$route.query.id,
                });
                cashItemLower(data)
                    .then(res => {
                        if (res.errorCode == 10000) {
                            this.$message.success("操作成功");
                            window.history.back();
                        } else if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }
                    })
            },
            getDetail: function (data) {
                cashItemInfo(data)
                    .then(res => {
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }
                        this.message = res.content;
                        this.shops = res.content.shopName.split(',')
                    })
            },
            back() {
                window.history.back();
            },
        },
        created: function () {
            this.id = this.$route.query.id;
            this.offline = this.$route.query.offline;
//       var curRouter = this.$router.currentRoute;
//       this.$store.commit("dealData", {
//         path: curRouter.path,
//         name: curRouter.meta.name
//       });
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .margin_t_20{
        margin-top: 20px;
    }
    table tbody {
        display: block;
        width: 115.2%;
        height: 180px;
        overflow-y: auto;
    }

    table tbody tr {
        display: flex;
        width: 100% !important;
        height: 35px;
        text-align: center;
        line-height: 35px;
        border-bottom: 1px solid #DFE6EC;
    }

    table tbody tr td:nth-child(1) {
        width: 86%;
    }

    table tbody tr td:nth-child(2) {
        width: 14%;
    }

    table thead tr {
        /*display: block;*/
        width: 100%;
        background-color: #EEF1F6;
        border: none;
    }


    table {
        border-spacing:0px;
        padding:0;
        box-sizing: content-box;
        border: 1px solid #DFE6EC;
    }

    .zj-table {
        width: 100%;
    }

    .zj-table > tbody > tr > td {
        text-align: center;
        /*outline: 1px solid red;*/
    }

    /*.zj-table > thead > tr > th {*/
    /*!*outline: 1px solid #eef1f6;*!*/
    /*}*/

    .dialog_goodslist .el-table__body-wrapper {
        height: 280px;
    }

    .refuse {
        color: red;
    }

    .margin_r_10 {
        margin-right: 10px;
    }

    .details_shoplist {
        display: flex;
        /*outline: 1px solid orange;*/
        border-bottom: 1px solid #bfcbd9;
    }

    .details_shoplist > p {
        display: inline-block;
        width: 50%;
        text-align: center;
        /*outline: 1px solid red;*/
    }
    .zj-table{
        overflow: hidden;
    }
    .margin_top100{
        margin-top: 100px;
    }

    /*.details_shoplist > p:nth-child(2) {*/
        /*text-align: right;*/
    /*}*/
</style>
