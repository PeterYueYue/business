<!--单品券列表的列表模板-->
<template>
    <div>
        <div class="pop-busarea-body">
            <div class="pop-end" v-if="message.templateStatus == '删除'"></div>
            <div class="pop-nopay" v-if="message.templateStatus == '草稿'"></div>
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
                  <p><span>模板ID :&nbsp;</span><span>{{message.templateId}}</span></p>
                  <!-- <p v-if="message.voucherDataType == 'RELATIVE'"><span>活动有效期 :&nbsp;</span><span>{{message.voucherQuantity}}天</span></p> -->
                  <p ><span>活动时间 :&nbsp;</span><span>{{message.publishStartTime}} 至 {{message.publishEndTime}}</span></p>
                  <p><span>活动类型 :&nbsp;</span><span>现金抵价券</span></p>
                  <p><span>适用门店 :&nbsp;</span><span>{{message.store.split().length}} 家门店</span></p>
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
                    <button @click="getWaters(message.voucher_id)">查看流水</button>
                </span>
                
                </div>
                <div class="pop-busarea-bottom" v-show="!preview">
               <span>
                 <div class="pop-busarea-ps">
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qiaquan"></use>
              </svg>券领取数: <span>{{data.receiveNum}}</span></p>
                     <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiangquanhexiao"></use>
              </svg>券核销数: <span>{{data.afterNum}}</span></p>
                     <!--<p><svg class="icon" aria-hidden="true">-->
                <!--<use xlink:href="#icon-icon01"></use>-->
              <!--</svg>营销收入:<span>100.00</span></p>-->
                    <p><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfonthaitaobi"></use>
              </svg>优惠金额: <span>{{data.voucherDiscount}}</span></p>
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
    import {getWater} from '../../../api/api'

    export default {
        props: ["message"],
        data() {
            return {
                preview: true,
                data: ''
            }
        },
        created(){
            console.log(this.message)
        },
        methods: {
            clickTo: function () {
                this.$router.push({path: "/viewdetails"});
            },
            getWaters: function (data) {
                this.preview = !this.preview;
                let message=this.qs.stringify({
                    active_id:data
                });
                getWater(message)
                    .then(res => {
                        if (res.errorCode == 30005) {
                            this.$router.push({path: '/login'});
                        }else{
                            this.data = res.content;
                        }
                    })
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
</style>
