<!--单品券列表的列表模板-->
<template>
    <div>
        <div class="pop-busarea-body">
            <div class="pop-end" v-if="message.templateStatus == '删除' || new Date().getTime() > new Date(this.message.publishEndTime).getTime() "></div>
            <div class="pop-nopay" v-if="message.templateStatus == '草稿' && new Date().getTime() < new Date(this.message.publishEndTime).getTime()"></div>
            <div class="pop-busarea-title">
                <div class="pop-busarea-top">
                    <p class="pop-p">
                        <span>活动创建时间:</span>
                        <span>{{message.createDate}}</span>
                    </p>

                    <div class="pop-div">
                        <div class="pop-avatar">
                            <span></span>
                        </div>
                        <div class="pop-word pop-m-word">
                            <span>{{message.amount}}</span><span> 元&#160;现金抵价券</span>
                            <!--<p class="pop-download"><span>二维码</span><span>下载</span></p>-->
                        </div>
                    </div>
                </div>
            </div>
            <div class="pop-busarea-main">
                <div class="pop-busarea-tops" v-show="preview">
               <span>
                <div class="pop-busarea-p">
                  <p><span></span></p>
                  <p><span>活动名称 :&nbsp;</span><span>{{message.voucherName}}</span></p>
                  <!-- <p v-if="message.voucherDataType == 'RELATIVE'"><span>活动有效期 :&nbsp;</span><span>{{message.voucherQuantity}}天</span></p> -->
                  <p ><span>活动时间 :&nbsp;</span><span>{{message.publishStartTime}} 至 {{message.publishEndTime}}</span></p>
                  <p><span>活动类型 :&nbsp;</span><span>现金抵价券</span></p>
                  <p><span>适用门店 :&nbsp;</span><span>{{shopLenth}} 家门店</span></p>
                    <!--<p><span>隶属商圈 :</span><span>{{message.four}}</span></p>-->
                  <p><span>操作 :&nbsp;</span>
                  <router-link tag="span" class="pop-blue"
                               :to="{path:'cashViewdetails',query:{id:message.id,offline:message.templateStatus}}">
                          点击设置
                      </router-link>
                  </p>
                </div>
              </span>
                <span>

                    <button class="exportButton"   @click="exportWaterAction(message.templateId)">导出明细</button>
                    <button  @click="getWaters(message.templateId)">查看详情</button>
                </span>
                
                </div>
                <div class="pop-busarea-bottom" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                    <p><svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-qiaquan"></use>
                    </svg>已发放张数: <span>{{data.publishCount}}</span></p>
                            <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-jiangquanhexiao"></use>
                    </svg>已发放总金额: <span>{{data.publishAmount}}</span></p>
                            <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-icon01"></use>
                    </svg>已使用张数:<span>{{data.usedCount}}</span></p>
                            <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfonthaitaobi"></use>
                    </svg>已使用总金额: <span>{{data.usedAmount }}</span></p>
                    <p><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-iconfonthaitaobi"></use>
                    </svg>退回金额: <span>{{data.recycleAmount  }}</span></p>
                 </div>
              </span>
                    <span>
                <button @click="preview = !preview">返回</button>
              </span>
                </div>
            </div>
            <div class="pop-busarea-mains">

            </div>
        </div>
    </div>
</template>

<script>
    import {getWater,lookFlows} from '../../../api/api'
    export default {
        props: ["message"],
        data() {
            return {
                preview: true,
                data: '',
                shopLenth:''
            }
        },
        mounted(){
            if(this.message.store){
                this.shopLenth = this.message.store.split(',').length;
            }
        },
        methods: {
            clickTo: function () {
                this.$router.push({path: "/viewdetails"});
            },
            getWaters: function (data) {
                    this.preview = !this.preview;
                    let message=this.qs.stringify({
                        templateId:data
                    });
                    lookFlows(message)
                        .then(res => {
                            if (res.errorCode == 30005) {
                                this.$router.push({path: '/login'});
                            }else{
                                this.data = res.content;
                            }
                        })
            },
            exportWaterAction(data){
                window.location.href = 'http://b.tingzhijun.com/business/business_product_log!exportCashLog.action?itemId='+data+''
                // if(this.message.templateStatus == '生效'){
                //     window.location.href = 'http://b.tingzhijun.com/business/business_product_log!exportCashLog.action?itemId='+data+''
                // }
            }
        }
    }
</script>
<style>
    .pop-m-word {
        display: inline-block;
        /*outline:1px solid red;*/
        /*margin-top: 15px;*/
    }
    .exportButton{
        top: 30px;
    }
</style>
