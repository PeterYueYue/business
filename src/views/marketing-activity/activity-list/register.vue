<!--积分抵现的列表模板-->
<template>
    <div>
        <div class="pop-busarea-body">
            <div class="pop-end" v-if="message.isMarketable == 1"></div>
            <div class="pop-busarea-title">
                <div class="pop-busarea-top">
                    <p class="pop-p">
                        <span>活动创建时间:</span>
                        <span>{{message.createDate}}</span>
                    </p>
                    <div class="pop-div">
                        <div class="pop-avatar pop-avatars zj-avatars">
                            <!-- <span></span> -->
                        </div>
                        <div class="pop-word pop-m-word">
                            <span>{{message.title}}</span>
                                <!-- class="pop-first-span"></span><span class="pop-two-span"></span> -->
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
                                <p><span>活动名称 :&nbsp;</span><span>{{message.name}}</span></p>
                                <p><span>券id :&nbsp;</span><span>{{message.itemId}}</span></p>
                                <p><span>活动有效期 :&nbsp;</span><span>{{message.pickStartDate}}至{{message.pickEndDate}}</span></p>
                                <p v-if="message.validEndDate && message.validStartDate "  ><span>券有效期 :&nbsp;</span><span>{{message.validStartDate}}至{{message.validEndDate}}</span></p>
                                <p  v-if="message.validDay"><span>券有效期 :&nbsp;</span><span>{{message.validStr}}</span></p>
                                <p ><span>投放渠道 :&nbsp;</span><span>{{message.channel =="REG"?"用户注册":message.channel =="FACE"?"上传照片":''}}</span></p>
                                <p><span>操作 :&nbsp;</span>
                                <el-button type="text"   class="zcsqButten" size="small" @click="open2(message.id)">点击下架</el-button>
                                
                                    <!-- <span class="pop-blue" @click="disabledQ(message.id)" >下架</span> -->
                                </p>
                                
                            </div>
                    </span>
                </div>
            </div>
        </div>
    </div>

</template> 
<script>
    import {getWater,disabledRegister} from '../../../api/api'

    export default {
        props: ["message"],
        
        data() {
            return {
                sum: '',
                preview: true,
            }
        },
        methods: {
            disabledQ(aid){

                let data=this.qs.stringify({
                    id:aid
                });
                disabledRegister(data).then(res =>{
                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    }else if(res.errorCode == 10000){
                        this.$message({
                            message: '下架成功!',
                            type: 'success'
                        });
                    this.$emit('changeMessage');
                    } else{
                        this.errorMessage = res.message;
                        this.$message(res.message);
                    }
                })

            },


            open2(aid) {
                this.$confirm('此操作将下架优惠券, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.disabledQ(aid)
                
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消下架'
                });          
                });
            },
            waterTo: function (data) {
                this.preview = !this.preview;
                let message=this.qs.stringify({
                    active_id:data
                });
                getWater(message).then(res => {

                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'});
                    } else {
                        this.sum = res.content;
                    }

                })
            }
        }
    }
</script>
<style>
    .pop-first-span {
        font-size: 26px;
        color: #f4333c;
    }

    .pop-two-span {
        font-size: 16px;
        color: #f4333c;
    }

    .pop-t {
        margin-left: 20px;
        margin-top: -8px;
    }

    .zj-avatars > span {
        width: 120px;
        height: 58px;
        background-image: url("../../../../src/assets/images/stamps.png")!important;
        background-size: 100% 100%;
    }

    .pop-m-word {
        display: inline-block;
        /*outline:1px solid red;*/
        /*margin-top: 15px;*/
    }

    .pop-download span {
        font-size: 12px !important;
        color: #05a4e6 !important;
    }

    .pop-download span:nth-child(1) {
        margin-left: 30px;
    }

    .pop-download span:nth-child(2) {
        margin-left: 20px;
    }

    .pop-download span:hover, .pop-blue:hover {
        cursor: pointer;
    }

    .pop-blue {
        color: #05a4e6;
    }
    .zcsqButten{
        margin-top: -3px;
        margin-left: -30px;
    }
</style>
