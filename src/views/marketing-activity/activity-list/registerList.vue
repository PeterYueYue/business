<template>
<div>
    <div class="busarea_active_main">
        <div class="pop-busarea-section" v-for="message in productList">
            <detail_iteme   @changeMessage="changemessage"   :message="message"></detail_iteme>
        </div>
    </div>
</div>
</template>
<script>
    import register from './register';
    import {getTicketList, getShopLists, getLoginStatus, getGoldList, getRegisterList} from '../../../api/api';
export default {
    data(){
        return{
            productList:'',
            shopValues:'',
            shopselectdatas: [{main_shop_name: '全部门店', id: ''}],
            shopselectvalues: '',
            statuselectdatas: [
                {value: '0', label: '全部'},
                {value: '1', label: '进行中'},
                {value: '2', label: '已结束'},
                {value: '3', label: '待进行'}
            ],
            statuselectvalues: '',
        }
    },
    mounted:function () {
        let message = this.qs.stringify({
            pageNumber: '1',
            pageSize: '10000'
        });
      
        this.statuselectvalues = this.statuselectdatas[0].value;
        let datas=this.qs.stringify({
            activityStatu:0
        });

        this.getProductLists(datas);
    },
    methods:{

        changemessage(){
            this.productQuery()
        },
        productQuery:function () {
            let data=this.qs.stringify({
                // shopId:this.shopValues,
                // activityStatu:this.statuselectvalues
                pageNumber:'1'
            });
            this.getProductLists(data);
        },
        getProductLists:function (data) {
            getRegisterList(data)
                .then(res=>{
                    console.log(res,"yueyang")


                    if (res.errorCode == 30005) {
                        this.$router.push({path: '/login'})
                    }
                    this.productList=res.content.result;
                })
        }
    },
    components: {
        detail_iteme: register
    }
}
</script>
<style>

</style>