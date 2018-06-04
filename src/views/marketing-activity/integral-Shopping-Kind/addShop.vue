<template>
    <el-dialog
        title="添加商品"
        class="addgift_c"
        v-model="addgift_dialog"
        size="small"
        top="15%">
        <el-form label-width="100px" class="addtable_form" :model="addform" :rules="addrule" ref="addform">


            <el-form-item label="请选择商品类型">
                <el-select size="small" v-model="typeOptionsValue" placeholder="请选择">
                    <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请选择商品来源">
                <el-select size="small" v-model="sourceValue" placeholder="请选择">
                    <el-option
                    v-for="item in sourceOpction"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="请选择活动">
                <el-select size="small" v-model="movableValue" placeholder="请选择">
                    <el-option
                    v-for="item in movableOpction"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="券 ID : " prop="">
                <p>23123123123123123123131231  <a href="">查看券详情</a></p>
            </el-form-item>
            <el-form-item label="商品名称名称 : " prop="name">
                <el-input size="small" placeholder="请输入商品名称" v-model="addform.name"></el-input>
            </el-form-item>
            <el-form-item label="商品数量 : " prop="point">
                <el-input size="small" type="number" placeholder="请输入商品数量" v-model="addform.point"></el-input>*小提示：商品数量请与发券数量填写一致
            </el-form-item>
            <el-form-item label="礼品图片 : " prop="logo">
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
            <el-form-item label="商品详情 : " prop="totalNum">
                <el-input
                resize="none"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="textarea">
                </el-input>

            </el-form-item>

            <el-form-item label="商品周期 : " >
                <el-date-picker
                    v-model="value6"
                    type="daterange"
                    placeholder="请选怎时间范围"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>


            <el-form-item label="兑换条件">
                <el-select size="small" v-model="exchangeValue" placeholder="请选择">
                    <el-option
                    v-for="item in exchangeOpction"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                
                <p>积分:<el-input class="width60" size="small" ></el-input> </p>
                <p>金额:<el-input class="width60" size="small" ></el-input> *小提示：上下架时间必须在券活动时间之内</p>
                

                
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
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addgift_true_btn">确 定</el-button>
            <el-button @click="addgift_dialog = false">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data(){
        return{

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
                sourceOpction:[
                    {
                    value: '选项1',
                    label: '积分商城券池'     
                    },
                    {
                    value: '选项2',
                    label: '其他渠道'     
                    },
                ],
                sourceValue:'',
                movableOpction:[
                    {
                    value: '选项2',
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
                exchangeOpction:[
                    {
                        value: '选项1',
                        label: '金卡会员'
                    },
                    {
                        value: '选项2',
                        label: 'PLUS会员'
                    },
                ],
                exchangeValue:'',
                exchangeAstrictOpction:[
                    {
                        value: '选项1',
                        label: '不限制'
                    },
                    {
                        value: '选项2',
                        label: '每日'
                    },
                    {
                        value: '选项2',
                        label: '每月'
                    },
                    {
                        value: '选项2',
                        label: '总数限制'
                    }
                ],
                exchangeAstrictValue:'',

        }
    },
    methods:{




        
    }
}
</script>

