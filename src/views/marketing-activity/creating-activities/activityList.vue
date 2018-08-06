<template>
    <div class="zj-main zj-content">
        <div class="zj-header">
            <span v-if="manageType !== 'FREE'"  class="bcColor" @click="styleClick(2)" :class="{styleTabs : styleTab == 2}">代金券活动</span>
            <span v-if="manageType !== 'FREE'"  class="bcColor" @click="styleClick(6)" :class="{styleTabs : styleTab == 6}">折扣券活动</span>
            <span v-if="manageType !== 'FREE'"  class="bcColor" @click="styleClick(7)" :class="{styleTabs : styleTab == 7}">实物换购券活动</span>
            <span class="bcColor" @click="styleClick(8)" :class="{styleTabs : styleTab == 8}">现金抵价券活动</span>
            <span v-if="manageType !== 'FREE'"  @click="styleClick(1)" :class="{styleTabs : styleTab == 1}">积分促销活动</span>
            <span v-if="manageType !== 'FREE'"  @click="styleClick(4)" :class="{styleTabs : styleTab == 4}">积分抵现活动</span>
            <span v-if="manageType !== 'FREE'"  @click="styleClick(3)" :class="{styleTabs : styleTab == 3}">单品券活动</span>
            <span v-if="manageType !== 'FREE'"  @click="styleClick(5)" :class="{styleTabs : styleTab == 5}">注册送券</span>

        </div>
        <p class="zj-routerview">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </p>

    </div>
</template>
<script>
import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                styleTab: 1
            }
        },
        watch:{
			"$route":"routerChange"
        },
        computed:mapGetters({
			manageType:'type'
		}),
        mounted: function() {
            if(this.manageType == 'FREE'){ this.$router.push({ path:'/cashDuctible'})}
            this.routerChange();
        },
        methods: {
            routerChange(){
                let router = this.$route.path;
                if (router == '/integralPromotion') {
                    this.styleTab = 1;
                } else if (router == '/chitCreation') {
                    this.styleTab = 2;
                } else if (router == '/alonestamps') {
                    this.styleTab = 3;
                } else if (router == '/integralFornow') {
                    this.styleTab = 4;
                } else if (router == '/registerGiveGifts') {
                    this.styleTab =5;
                } else if (router == '/discounticket') {
                    this.styleTab = 6;
                } else if (router == '/commuteActualToTicket') {
                    this.styleTab = 7;
                } else if (router == '/cashDuctible') {
                    this.styleTab =8;
                }
            },
            styleClick: function(data) {
                if (data == 1) {
                    this.$router.push({
                        path: '/integralPromotion'
                    })
                } else if (data == 2) {
                    this.$router.push({
                        path: '/chitCreation'
                    })
                } else if (data == 3) {
                    this.$router.push({
                        path: '/alonestamps'
                    })
                } else if (data == 4) {
                    this.$router.push({
                        path: '/integralFornow'
                    })
                } else if (data == 5) {
                    this.$router.push({
                        path:'/registerGiveGifts'
                    })
                } else if (data == 6) {

                    this.$router.push({
                        path:'/discounticket'
                    })
                } else if (data == 7) {
                    this.$router.push({
                        path:'/commuteActualToTicket'
                    })
                } else if (data == 8) {
                    this.$router.push({
                        path:'/cashDuctible'
                    })
                }
                this.styleTab = data;
            }
        }
    }
</script>
<style scoped>
    .zj-main {
        display: block !important;
    }
    
    .zj-content {
        /*outline:1px solid orange;*/
        position: relative;
        overflow-y: hidden;
    }
    
    .zj-header {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #f4f4f4;
    }
    
    .zj-header>span {
        display: inline-block;
        width: 130px;
        height: 57px;
        line-height: 57px;
        text-align: center;
        color: #555;
        font-weight: 600;
        box-sizing: content-box;
        font-size: 14px;
        /*margin-bottom: 2px;*/
    }
    
    .zj-header>span:hover {
        cursor: pointer;
        border-bottom: 3px solid #20a0ff;
        color: #20a0ff;
    }
    
    .styleTabs {
        border-bottom: 3px solid #20a0ff;
        color: #20a0ff !important;
    }
    
    .zj-routerview {
        display: block;
        width: 100%;
        /*outline: 1px solid red;*/
        margin-top: 10px;
    }
    .bcColor{
        background-color: #DCDCDC   ;
    }
</style>