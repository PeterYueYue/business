<template>
    <div class="zj-main">
        <div class="zj-left">
            <span class="zj-back">
                    <div class="zj-content">
                        <img src="../../../assets/images/backgroundImg.png"
                             style="display: inline-block;position: absolute;top: 0;width: 100%;height: 80%;margin-top: 50px;"
                             alt="">
                        <span class="zj-made1" v-on:mouseenter="overFlow(1)" v-on:mouseleave="leaveFlow(1)">{{disk.name1}}</span>
                        <span class="zj-made2" v-on:mouseenter="overFlow(2)" v-on:mouseleave="leaveFlow(2)">{{disk.name2}}</span>
                        <span class="zj-made3" v-on:mouseenter="overFlow(3)" v-on:mouseleave="leaveFlow(3)">{{disk.name3}}</span>
                        <span class="zj-made4" v-on:mouseenter="overFlow(4)" v-on:mouseleave="leaveFlow(4)">{{disk.name4}}</span>
                        <span class="zj-made5" v-on:mouseenter="overFlow(5)" v-on:mouseleave="leaveFlow(5)">{{disk.name5}}</span>
                        <span class="zj-made6" v-on:mouseenter="overFlow(6)" v-on:mouseleave="leaveFlow(6)">{{disk.name6}}</span>
                        <div class="zj-div zj-xs1" v-if="flow1 == 2">
                            <p>奖项</p>
                            <p>数量:{{data.number1}}</p>
                            <p>已抽中:{{data.medium1}}</p>
                            <p>已兑换:{{data.exchange1}}</p>
                        </div>
                        <div class="zj-div zj-xs2" v-if="flow2 == 2">
                            <p>奖项</p>
                            <p>数量:{{data.number2}}</p>
                            <p>已抽中:{{data.medium2}}</p>
                            <p>已兑换:{{data.exchange2}}</p>
                        </div>
                        <div class="zj-div zj-xs3" v-if="flow3 == 2">
                            <p>奖项</p>
                            <p>数量:{{data.number3}}</p>
                            <p>已抽中:{{data.medium3}}</p>
                            <p>已兑换:{{data.exchange3}}</p>
                        </div>
                        <div class="zj-div zj-xs4" v-if="flow4 == 2">
                            <p>奖项</p>
                            <p>数量:{{data.number4}}</p>
                            <p>已抽中:{{data.medium4}}</p>
                            <p>已兑换:{{data.exchange4}}</p>
                        </div>
                        <div class="zj-div zj-xs5" v-if="flow5 == 2">
                            <p>奖项</p>
                            <p>数量:{{data.number5}}</p>
                            <p>已抽中:{{data.medium5}}</p>
                            <p>已兑换:{{data.exchange5}}</p>
                        </div>
                        <div class="zj-div zj-xs6" v-if="flow6 == 2">
                            <p>奖项</p>
                            <p>数量:{{data.number6}}</p>
                            <p>已抽中:{{data.medium6}}</p>
                            <p>已兑换:{{data.exchange6}}</p>
                        </div>
                        <div class="zj-skien">
                        </div>
                        <textarea class="zj-texts">{{data.description}}</textarea>
                        <!--<el-input-->
                        <!---->
                        <!--type="textarea"-->
                        <!--autosize-->
                        <!--resize="none"-->
                        <!--v-model="data.description">-->
                        <!--</el-input>-->
                    </div>
            </span>
        </div>
        <div class="zj-right">
            <div>
                <span></span>
                <span>奖项设置</span>
            </div>
            <p>
                <span>奖项一 :</span>
                <span>名称</span>
                <el-input class="zj-input"  @blur="reviseName1" size="small" placeholder="请输入奖项名" v-model="data.name1"
                          :disabled="shows1"></el-input>
                <el-select v-model="value1" placeholder="请选择" size="small" class="zj-selects" :disabled="disabled" :clearable="boolean"
                           @change="selectChange1">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span></span>
                <span>数量</span>
                <el-input class="zj-inputs" size="small" @blur="reviseNumber1" type="number" placeholder="请输入奖项数量" v-model="data.number1"
                          :disabled="disabled"></el-input>
            </p>
            <p>
                <span>奖项二 :</span>
                <span>名称</span>
                <el-input class="zj-input" @blur="reviseName2" size="small" placeholder="请输入奖项名"
                          v-model="data.name2" :disabled="shows2"></el-input>
                <el-select v-model="value2" placeholder="请选择" size="small" class="zj-selects" :disabled="disabled" :clearable="boolean"
                           @change="selectChange2">
                    <el-option
                            v-for="item in options"
                            :key="item.value"

                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span></span>
                <span>数量</span>
                <el-input class="zj-inputs" size="small" @blur="reviseNumber2" type="number" placeholder="请输入奖项数量" v-model="data.number2"
                          :disabled="disabled"></el-input>
            </p>
            <p>
                <span>奖项三 :</span>
                <span>名称</span>
                <el-input class="zj-input" size="small" @blur="reviseName3" placeholder="请输入奖项名" v-model="data.name3"
                          :disabled="shows3"></el-input>
                <el-select v-model="value3" placeholder="请选择" size="small" class="zj-selects" :disabled="disabled" :clearable="boolean"
                           @change="selectChange3">
                    <el-option
                            v-for="item in options"
                            :key="item.value"

                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span></span>
                <span>数量</span>
                <el-input class="zj-inputs" size="small" type="number" @blur="reviseNumber3"  placeholder="请输入奖项数量" v-model="data.number3"
                          :disabled="disabled"></el-input>
            </p>
            <p>
                <span>奖项四 :</span>
                <span>名称</span>
                <el-input class="zj-input" @blur="reviseName4" size="small" placeholder="请输入奖项名" v-model="data.name4"
                          :disabled="shows4"></el-input>
                <el-select v-model="value4" placeholder="请选择" size="small" class="zj-selects" :disabled="disabled" :clearable="boolean"
                           @change="selectChange4">
                    <el-option
                            v-for="item in options"
                            :key="item.value"

                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span></span>
                <span>数量</span>
                <el-input class="zj-inputs" size="small" @blur="reviseNumber4" type="number" placeholder="请输入奖项数量" v-model="data.number4"
                          :disabled="disabled"></el-input>
            </p>
            <p>
                <span>奖项五 :</span>
                <span>名称</span>
                <el-input class="zj-input" size="small" @blur="reviseName5" placeholder="请输入奖项名" v-model="data.name5"
                          :disabled="shows5"></el-input>
                <el-select v-model="value5" placeholder="请选择" size="small" class="zj-selects" :disabled="disabled" :clearable="boolean"
                           @change="selectChange5">
                    <el-option
                            v-for="item in options"
                            :key="item.value"

                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span></span>
                <span>数量</span>
                <el-input class="zj-inputs" size="small" type="number" @blur="reviseNumber5"  placeholder="请输入奖项数量" v-model="data.number5"
                          :disabled="disabled"></el-input>
            </p>
            <p>
                <span>奖项六 :</span>
                <span>名称</span>
                <el-input class="zj-input" size="small" @blur="reviseName6" placeholder="请输入奖项名" v-model="data.name6"
                          :disabled="shows6"></el-input>
                <el-select v-model="value6" placeholder="请选择" size="small" class="zj-selects" :disabled="disabled" :clearable="boolean"
                           @change="selectChange6">
                    <el-option
                            v-for="item in options"
                            :key="item.value"

                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p>
                <span></span>
                <span>数量</span>
                <el-input class="zj-inputs" size="small" type="number" @blur="reviseNumber6"  placeholder="请输入奖项数量" v-model="data.number6"
                          :disabled="disabled"></el-input>
            </p>
            <div class="zj-message zj-messages">
                <p>*提示：1.奖项数量越多，概率越大！</p><br>
            </div>
            <div class="zj-message zj-mess">
                <p>2.若设置奖项为空，请选择右侧未中奖提示信息</p>
            </div>
            <div class="zj-blocks">
                <span></span>
                <span>活动规则设置</span>
            </div>
            <span class="zj-text">
                <span>说明 :</span>
                <el-input
                        class="zj-text-input"
                        type="textarea"
                        :disabled="disabled"
                        placeholder="请输入内容"
                        resize="none"
                        v-model="data.description">
                </el-input>
            </span>
            <div class="zj-blocks">
                <span></span>
                <span>抽奖规则设置</span>
            </div>
            <span class="zj-line ">
                <span>抽奖所需积分 : &#X3000;</span>
                <span> 每次&nbsp;</span>
                <el-input class="zj-code" size="small" type="number" @blur="reviseCode" placeholder="积分" v-model="data.code"
                          :disabled="disabled"></el-input>
                <span>&nbsp积分</span>
            </span>
            <span class="zj-line ">
                <span>抽奖次数 :&#X3000; </span>&nbsp;
                <el-select v-model="select" placeholder="请选择" :disabled="disabled">
                    <el-option
                            v-for="item in items"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span class="zj-line cjyy" v-if="select == 2">
                <span></span>
                <el-input class="zj-code" size="small" @blur="reviseQuantity" type="number" placeholder="次数" v-model="data.quantity"
                          :disabled="disabled"></el-input>
                <span>&nbsp;次/人/天</span>
            </span>

            <span class="zj-line">
                <span>抽奖总次数 :&#X3000; </span>&nbsp;
                <el-select v-model="select1" placeholder="请选择" :disabled="disabled">
                    <el-option
                            v-for="item in items"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <span class="zj-line cjyy" v-if="select1 == 2">
                <span></span>
                <el-input class="zj-code" size="small" @blur="revisetotalLimit" type="number" placeholder="次数" v-model="data.totalLimit"
                          :disabled="disabled"></el-input>
                <span>&nbsp;次/人</span>
            </span>


            <span class="zj-line">
                <span>活动时间 :&#X3000; </span>&nbsp;
               <el-date-picker
                       v-model="values"
                       type="daterange"
                       align="right"
                       @change="dateChange"
                       placeholder="选择日期范围"
                       :editable="false"
                       :picker-options="pickerOptions2"
                       v-if="disabled ==false">
               </el-date-picker>
                <span v-if="disabled ==true" disabled="disabled">{{dateValue}}</span>
            </span>
            <span class="zj-line">
                <span>兑换截止日期 :&#X3000; </span>
                <span>活动结束后&nbsp;</span>
                <el-input class="zj-code" size="small" @blur="reviseDate" type="number" placeholder="45" v-model="data.date"
                          :disabled="disabled"></el-input>
                <span>&nbsp;天</span>
            </span>
            <el-button class="zj-button" @click="sureTo" v-if="disabled ==false">提交</el-button>
            <el-button class="zj-button" @click="open3" v-if="disabled ==true">下架</el-button>
        </div>
        <!--<el-button type="text" @click="open2">点击打开 呃呃鹅鹅鹅鹅鹅鹅鹅鹅鹅111Message Box</el-button>-->

    </div>
</template>
<script>
    import {formateDate} from '../../../api/CommonMethods'
    import {makeActive, getActive, underpants,getVoucherName} from '../../../api/api'

    export default {
        data() {
            return {
                boolean:true,
                rows: "7",
                shows1: false,
                shows2: false,
                shows3: false,
                shows4: false,
                shows5: false,
                shows6: false,
                dateValue: '',
                activityId: '',
                disabled: false,
                flow1: '1',
                flow2: '1',
                flow3: '1',
                flow4: '1',
                flow5: '1',
                flow6: '1',
                select: 2,
                select1: 1,
                items: [{
                    value: 1,
                    label: '不限制'
                },{
                    value: 2,
                    label: '限制'
                    }],
                data: {
                    name1: '',
                    name2: '',
                    name3: '',
                    name4: '',
                    name5: '',
                    name6: '',
                    number1: '',
                    number2: '',
                    number3: '',
                    number4: '',
                    number5: '',
                    number6: '',
                    medium1: '',
                    medium2: '',
                    medium3: '',
                    medium4: '',
                    medium5: '',
                    medium6: '',
                    exchange1: '',
                    exchange2: '',
                    exchange3: '',
                    exchange4: '',
                    exchange5: '',
                    exchange6: '',
                    description: '',
                    code: '',
                    quantity: '',
                    date: '45',
                    totalLimit:''
                },
                isRewardName:[],
                disk:{
                    name1:'',
                    name2:'',
                    name3:'',
                    name4:'',
                    name5:'',
                    name6:'',
                },
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                value5: '',
                value6: '',
                options: [{
                    value: '1',
                    label: '谢谢惠顾'
                }, {
                    value: '2',
                    label: '好可惜，再接再厉'
                }, {
                    value: '3',
                    label: '未中奖'
                }],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            end.setTime(end.getTime() + 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                values: '',
                startTime: '',
                endTime: ''
            };
        },
        mounted: function () {
            this.select = this.items[0].value;
            this.queryMessage()
        },
       
        methods: {
            reviseDate(){
                this.data.date = Math.abs(this.data.date);
                this.data.date = parseInt(this.data.date);
                if(this.data.date == "0.00" || this.data.date.toString().length > 8){
                    this.data.date = ''
                }
            },
            reviseQuantity(){
                this.data.quantity = Math.abs(this.data.quantity);
                this.data.quantity = parseInt(this.data.quantity);
                if(this.data.quantity == "0.00" || this.data.quantity.toString().length > 8){
                    this.data.quantity = ''
                }
            },
            revisetotalLimit(){
                this.data.totalLimit = Math.abs(this.data.totalLimit);
                this.data.totalLimit = parseInt(this.data.totalLimit);
                if(this.data.totalLimit == "0.00" || this.data.totalLimit.toString().length > 8){
                    this.data.totalLimit = ''
                }
            },
            reviseCode(){
                this.data.code = Math.abs(this.data.code);
                this.data.code = parseInt(this.data.code);
                if( this.data.code.toString().length > 8){
                    this.data.code = ''
                }
                if(this.data.code == '0.00'){
                    this.data.code = "0"
                }
            },
            reviseNumber6(){
                this.data.number6 = Math.abs(this.data.number6);
                this.data.number6 = parseInt(this.data.number6);
                if(this.data.number6 == "0.00" || this.data.number6.toString().length > 8){
                    this.data.number6 = ''
                }
            },
            reviseName6(){
                if(this.data.name6.length > '35'){
                    this.data.name6 = "";
                    this.$message({
                        type: 'warning',
                        message: '内容过长，请从新输入!'
                    });
                    return
                }
                // 通过id获取券名称
                if(this.data.name6){
                    let data = this.qs.stringify({
                        rewardName: this.data.name6
                    });
                    getVoucherName(data).then(res => {
                        if(!res){
                            this.isRewardName[5] = '';
                            this.$message({
                                type: 'warning',
                                message: '有资券不存在，或未开始、已结束、未支付。'
                            }); 
                        }else{
                            this.isRewardName[5] = res;
                            this.disk.name6 = res;
                        }
                    })
                }else{
                    this.disk.name6 = ''; 
                }
            },
            reviseNumber5(){
                this.data.number5 = Math.abs(this.data.number5);
                this.data.number5 = parseInt(this.data.number5);
                if(this.data.number5 == "0.00" || this.data.number5.toString().length > 8){
                    this.data.number5 = ''
                }
            },
            reviseName5(){
                if(this.data.name5.length > '35'){
                    this.data.name5 = "";
                    this.$message({
                        type: 'warning',
                        message: '内容过长，请从新输入!'
                    });
                    return
                }
                 // 通过id获取券名称
                 if(this.data.name5){
                     let data = this.qs.stringify({
                        rewardName: this.data.name5
                    });
                    getVoucherName(data).then(res => {
                        if(!res){
                            this.isRewardName[4] = '';
                            this.$message({
                                type: 'warning',
                                message: '有资券不存在，或未开始、已结束、未支付。'
                            }); 
                        }else{
                            this.isRewardName[4] = res;
                            this.disk.name5 = res; 
                        }
                    })
                 }else{
                    this.disk.name5 = '';
                 }
                
            },
            reviseNumber4(){
                this.data.number4 = Math.abs(this.data.number4);
                this.data.number4 = parseInt(this.data.number4);
                if(this.data.number4 == "0.00" || this.data.number4.toString().length > 8){
                    this.data.number4 = ''
                }
            },
            reviseName4(){
                if(this.data.name4.length > '35'){
                    this.data.name4 = "";
                    this.$message({
                        type: 'warning',
                        message: '内容过长，请从新输入!'
                    });
                    return;
                }
                // 通过id获取券名称
                if(this.data.name4){
                    let data = this.qs.stringify({
                        rewardName: this.data.name4
                    });
                    getVoucherName(data).then(res => {
                        if(!res){
                            this.isRewardName[3] = '';
                            this.$message({
                                type: 'warning',
                                message: '有资券不存在，或未开始、已结束、未支付。'
                            }); 
                        }else{
                            this.isRewardName[3] = res;
                            this.disk.name4 = res; 
                        }
                    })
                }else{
                    this.disk.name4 = '';
                }
                
            },
            reviseNumber3(){
                this.data.number3 = Math.abs(this.data.number3);
                this.data.number3 = parseInt(this.data.number3);
                if(this.data.number3 == "0.00" || this.data.number3.toString().length > 8){
                    this.data.number3 = ''
                }
            },
            reviseName3(){
                if(this.data.name3.length > '35'){
                    this.data.name3 = "";
                    this.$message({
                        type: 'warning',
                        message: '内容过长，请从新输入!'
                    });
                    return;
                }
                // 通过id获取券名称
                if(this.data.name3){
                    let data = this.qs.stringify({
                        rewardName: this.data.name3
                    });
                    getVoucherName(data).then(res => {
                        if(!res){
                            this.isRewardName[2] = '' ;
                            this.$message({
                                type: 'warning',
                                message: '有资券不存在，或未开始、已结束、未支付。'
                            }); 
                        }else{
                            this.isRewardName[2] = res;
                            this.disk.name3 = res; 
                        }
                    })
                }else{
                    this.disk.name3 = '';
                }
                
            },
            reviseNumber2(){
                this.data.number2 = Math.abs(this.data.number2);
                this.data.number2 = parseInt(this.data.number2);
                if(this.data.number2 == "0.00" || this.data.number2.toString().length > 8){
                    this.data.number2 = ''
                }
            },
            reviseName2(){
                if(this.data.name2.length > '35'){
                    this.data.name2 = "";
                    this.$message({
                        type: 'warning',
                        message: '内容过长，请从新输入!'
                    });
                    return;
                }
                // 通过id获取券名称
                if(this.data.name2){
                    let data = this.qs.stringify({
                        rewardName: this.data.name2
                    });
                    getVoucherName(data).then(res => {
                        if(!res){
                            this.isRewardName[1] = '';
                            this.$message({
                                type: 'warning',
                                message: '有资券不存在，或未开始、已结束、未支付。'
                            }); 
                        }else{
                            this.isRewardName[1] = res;
                            this.disk.name2 = res;
                        }
                    })
                }else{
                    this.disk.name2 = '';
                }
                
            },
            reviseNumber1(){
                this.data.number1 = Math.abs(this.data.number1);
                this.data.number1 = parseInt(this.data.number1);
                if(this.data.number1 == "0.00" || this.data.number1.toString().length > 8){
                    this.data.number1 = ''
                }
            },
            reviseName1(){
                if(this.data.name1.length > '35'){
                    this.data.name1 = "";
                    this.$message({
                        type: 'warning',
                        message: '内容过长，请从新输入!'
                    });
                    return;
                }
                // 通过id获取券名称
                if(this.data.name1){
                    let data = this.qs.stringify({rewardName: this.data.name1});
                    getVoucherName(data).then(res => {
                        if(!res){
                            this.isRewardName[0] = '';
                            this.$message({
                                type: 'warning',
                                message: '有资券不存在，或未开始、已结束、未支付。'
                            }); 
                        }else{
                          this.isRewardName[0] = res;
                          this.disk.name1 = res;
                        }
                    })
                }else{
                    this.disk.name1 = '';
                }
            },
            open2() {
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {


                    
                    this.sureTo();
//                    this.$message({
//                        type: 'success',
//                        message: '提交成功!'
//                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交!'
                    });
                });
            },
            open3() {
                this.$confirm('确认下架?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let newDate = {};
                    let newDisk = {};
                    for(var e in this.data){
                        newDate[e]=''
                    }
                    for(var e in this.disk){
                        newDisk[e]=''
                    }
                    this.startTime= '';
                    this.endTime= '';
                    this.values='';
                    this.disk = newDisk;
                    this.data = newDate;
                    this.data.date = '45';
                    this.select =  2;
                    this.select1= 1;
                    this.underpant();
                     
//                    this.$message({
//                        type: 'success',
//                        message: '提交成功!'
//                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下架!'
                    });
                });

                
            },
            queryMessage: function () {
                getActive().then(res => {

                    console.log(res,"213")
                    if (res.errorCode == 10000 ) {
                        if (res.content.RewardList.length > 0) {
                            this.disabled = true;
                            this.shows1 = true;
                            this.shows2 = true;
                            this.shows3 = true;
                            this.shows4 = true;
                            this.shows5 = true;
                            this.shows6 = true;
                            this.activityId = res.content.activityId;

                            this.data.name1 = res.content.RewardList[0].rewardName;
                            this.data.name2 = res.content.RewardList[1].rewardName;
                            this.data.name3 = res.content.RewardList[2].rewardName;
                            this.data.name4 = res.content.RewardList[3].rewardName;
                            this.data.name5 = res.content.RewardList[4].rewardName;
                            this.data.name6 = res.content.RewardList[5].rewardName;

                            this.data.number1 = res.content.RewardList[0].rewardResidueNum;
                            this.data.number2 = res.content.RewardList[1].rewardResidueNum;
                            this.data.number3 = res.content.RewardList[2].rewardResidueNum;
                            this.data.number4 = res.content.RewardList[3].rewardResidueNum;
                            this.data.number5 = res.content.RewardList[4].rewardResidueNum;
                            this.data.number6 = res.content.RewardList[5].rewardResidueNum;

                            this.data.medium1 = res.content.RewardList[0].rewardSurplusNum;
                            this.data.medium2 = res.content.RewardList[1].rewardSurplusNum;
                            this.data.medium3 = res.content.RewardList[2].rewardSurplusNum;
                            this.data.medium4 = res.content.RewardList[3].rewardSurplusNum;
                            this.data.medium5 = res.content.RewardList[4].rewardSurplusNum;
                            this.data.medium6 = res.content.RewardList[5].rewardSurplusNum;

                            this.data.exchange1 = res.content.RewardList[0].rewardExchangeNum;
                            this.data.exchange2 = res.content.RewardList[1].rewardExchangeNum;
                            this.data.exchange3 = res.content.RewardList[2].rewardExchangeNum;
                            this.data.exchange4 = res.content.RewardList[3].rewardExchangeNum;
                            this.data.exchange5 = res.content.RewardList[4].rewardExchangeNum;
                            this.data.exchange6 = res.content.RewardList[5].rewardExchangeNum;

                            this.data.description = res.content.description;
                            this.data.code = res.content.bindingPoint;
                            //时间
                            //this.values=2017-7-1;
                            this.dateValue = res.content.startDate + ' 00:00:00 至 ' + res.content.end_date + ' 23:59:59';
                            this.data.date = res.content.pickLimitPeriod;
                            if(res.content.quantity == '9999'){
                                this.select = 1;
                            }else{
                                this.select = 2;
                                this.data.quantity = res.content.quantity;
                            }
                        }
                    }else if(res.errorCode == 70001){
                        this.disabled = false;
                        this.shows1 = false;
                        this.shows2 = false;
                        this.shows3 = false;
                        this.shows4 = false;
                        this.shows5 = false;
                        this.shows6 = false;
                    }
                })
            },
            //下架
            underpant: function () {
                const that = this;
                let data = this.qs.stringify({
                    activityId: this.activityId
                });
                underpants(data,that)
                    .then(res => {
                        if (res.errorCode == 10000) {
                            this.$message({
                                message: '下架成功!',
                                type: 'success'
                            });
                            this.queryMessage();
                        }
                    })
            },
            sureTo: function () {    
                let isGo = true;
                for(let i=0; i<this.isRewardName.length;i++){
                    if(this.isRewardName[i]==''){
                        isGo = false;
                        break;
                    }
                }
                if(!isGo){ return}
                let rewardType = [];
                let numbersRe = /^(?!00)(?:[0-9]{1,5}|100000)$/
                if(this.data.name1.length > 0 && this.data.name1.length < 35){
                    if(numbersRe.test(this.data.number1)){
                        rewardType.push({
                            rewardClass: 1,
                            rewardName: this.data.name1,
                            rewardResidueNum: this.data.number1,
                            rewardType: this.value1,
                            voucherName:this.isRewardName[0]

                        })
                    }else{
                        this.$message("奖项一的数量输入格式不正确");
                        return;  
                    }       
                }else{
                    this.$message("奖项一的名称不能为空且长度小于35个字符");
                    return; 
                }
                if(this.data.name2.length > 0 && this.data.name2.length < 35){
                    if(numbersRe.test(this.data.number2)){
                        rewardType.push({
                            rewardClass: 2,
                            rewardName: this.data.name2,
                            rewardResidueNum: this.data.number2,
                            rewardType: this.value2,
                            voucherName:this.isRewardName[1]
                        })
                    }else{
                        this.$message("奖项二的数量输入格式不正确");
                        return;  
                    }       
                }else{
                    this.$message("奖项二的名称不能为空且长度小于35个字符");
                    return; 

                }
                if(this.data.name3.length > 0 && this.data.name3.length < 35){
                    if(numbersRe.test(this.data.number3)){
                        rewardType.push({
                            rewardClass: 3,
                            rewardName: this.data.name3,
                            rewardResidueNum: this.data.number3,
                            rewardType: this.value3,
                            voucherName:this.isRewardName[2]
                        })
                    }else{
                        this.$message("奖项三的数量输入格式不正确");
                        return;  
                    }       
                }else{
                    this.$message("奖项三的名称不能为空且长度小于35个字符");
                    return; 

                }
                if(this.data.name4.length > 0 && this.data.name4.length < 35){
                    if(numbersRe.test(this.data.number4)){
                        rewardType.push({
                            rewardClass: 4,
                            rewardName: this.data.name4,
                            rewardResidueNum: this.data.number4,
                            rewardType: this.value4,
                            voucherName:this.isRewardName[3]
                        })
                    }else{
                        this.$message("奖项四的数量输入格式不正确");
                        return;  
                    }       
                }else{
                    this.$message("奖项四的名称不能为空且长度小于35个字符");
                    return; 

                }
                if(this.data.name5.length > 0 && this.data.name5.length < 35){
                    if(numbersRe.test(this.data.number5)){
                        rewardType.push({
                            rewardClass: 5,
                            rewardName: this.data.name5,
                            rewardResidueNum: this.data.number5,
                            rewardType: this.value5,
                            voucherName:this.isRewardName[4]
                        })
                    }else{
                        this.$message("奖项五的数量输入格式不正确");
                        return;  
                    }       
                }else{
                    this.$message("奖项五的名称不能为空且长度小于35个字符");
                    return; 

                }
                if(this.data.name6.length > 0 && this.data.name6.length < 35){
                    if(numbersRe.test(this.data.number6)){
                        rewardType.push({
                            rewardClass: 6,
                            rewardName: this.data.name6,
                            rewardResidueNum: this.data.number6,
                            rewardType: this.value6,
                            voucherName:this.isRewardName[5]
                        })
                    }else{
                        this.$message("奖项六的数量输入格式不正确");
                        return;  
                    }       
                }else{
                    this.$message("奖项六的名称不能为空且长度小于35个字符");
                    return; 
                }               
                let type = JSON.stringify(rewardType);
                let message = {};
                message.activityId      = '';
                message.activityRewards = type;

                if(this.data.description){
                    message.description     = this.data.description;
                }else{
                    this.$message("请填写奖项描述");
                    return;
                }
                message.bindingPoint    = this.data.code?this.data.code:'0';
                // if(numbersRe.test(this.data.code)){
                    
                // }else{
                //     this.$message("抽奖所需积分输入格式不正确");
                //     return;
                // }
                // 抽奖次数
                if(this.select == 2){
                    if(numbersRe.test(this.data.quantity)){
                        message.quantity = this.data.quantity;
                    }else{
                        this.$message("抽奖次数输入格式不正确");
                        return;
                    }
                }else{
                    message.quantity = '999999'
                }  
                // 抽奖总次数
                if(this.select1 == 2){
                    if(numbersRe.test(this.data.totalLimit)){
                        message.totalLimit = this.data.totalLimit;
                    }else{
                        this.$message("抽奖次数输入格式不正确");
                        return;
                    }
                }else{
                    message.totalLimit = '999999'
                } 
                //处理时间选择是否正确
                let date1 = new Date(this.startTime).getTime();
                let nowTime = new Date().getTime();
                if(date1 + 86400000 > nowTime){
                    message.startDate       = this.startTime;
                    message.endDate         = this.endTime;
                }else{
                    this.$message("请选择正确的时间格式");
                    return;
                }
                if(numbersRe.test(this.data.date)){
                    message.pickLimitPeriod = this.data.date;
                }else{
                    this.$message("兑换截止日期输入格式不正确");
                    return;
                }
                let datas = this.qs.stringify(message);
                this.$confirm('是否提交?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    makeActive(datas)
                    .then(res => {

                        console.log(res,"dddd")
                        if (res.errorCode == 10000) {
                            this.$message({
                                message: '创建成功!',
                                type: 'success'
                            });
                            this.queryMessage()
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消提交!'
                    });
                });
            },
            dateChange: function () {
                this.startTime = formateDate(this.values[0]);
                this.endTime = formateDate(this.values[1]);
            },
            overFlow: function (data) {
                if (data == 1) {
                    this.flow1 = 2;
                } else if (data == 2) {
                    this.flow2 = 2;
                } else if (data == 3) {
                    this.flow3 = 2;
                } else if (data == 4) {
                    this.flow4 = 2;
                } else if (data == 5) {
                    this.flow5 = 2;
                } else if (data == 6) {
                    this.flow6 = 2;
                }
            },
            leaveFlow: function (data) {
                if (data == 1) {
                    this.flow1 = 1;
                } else if (data == 2) {
                    this.flow2 = 1;
                } else if (data == 3) {
                    this.flow3 = 1;
                } else if (data == 4) {
                    this.flow4 = 1;
                } else if (data == 5) {
                    this.flow5 = 1;
                } else if (data == 6) {
                    this.flow6 = 1;
                }
            },
            selectChange1: function () {
                if(this.value1 == ''){
                    this.shows1 = false;
                    this.data.name1=''
                }else{
                    this.shows1 = true;
                    if (this.value1 == 1) {
                        this.data.name1 = '谢谢惠顾'
                    } else if (this.value1 == 2) {
                        this.data.name1 = '好可惜,再接再厉'
                    } else if (this.value1 == 3) {
                        this.data.name1 = '未中奖'
                    }
                }

            },
            selectChange2: function () {
                if(this.value2 == ''){
                    this.shows2 = false;
                    this.data.name2=''
                }else{
                this.shows2 = true;
                if (this.value2 == 1) {
                    this.data.name2 = '谢谢惠顾'
                } else if (this.value2 == 2) {
                    this.data.name2 = '好可惜,再接再厉'
                } else if (this.value2 == 3) {
                    this.data.name2 = '未中奖'
                }
                }

            },
            selectChange3: function () {
                if(this.value3 == ''){
                    this.shows3 = false;
                    this.data.name3=''
                }else{
                this.shows3 = true;
                if (this.value3 == 1) {
                    this.data.name3 = '谢谢惠顾'
                } else if (this.value3 == 2) {
                    this.data.name3 = '好可惜,再接再厉'
                } else if (this.value3 == 3) {
                    this.data.name3 = '未中奖'
                }
                }

            },
            selectChange4: function () {
                if(this.value4 == ''){
                    this.shows4 = false;
                    this.data.name4=''
                }else {
                    this.shows4 = true;
                    if (this.value4 == 1) {
                        this.data.name4 = '谢谢惠顾'
                    } else if (this.value4 == 2) {
                        this.data.name4 = '好可惜,再接再厉'
                    } else if (this.value4 == 3) {
                        this.data.name4 = '未中奖'
                    }
                }
            },
            selectChange5: function () {
                if(this.value5 == ''){
                    this.shows5 = false;
                    this.data.name5=''
                }else {
                    this.shows5 = true;
                    if (this.value5 == 1) {
                        this.data.name5 = '谢谢惠顾'
                    } else if (this.value5 == 2) {
                        this.data.name5 = '好可惜,再接再厉'
                    } else if (this.value5 == 3) {
                        this.data.name5 = '未中奖'
                    }
                }
            },
            selectChange6: function () {
                if(this.value6 == ''){
                    this.shows6 = false;
                    this.data.name6=''
                }else {
                    this.shows6 = true;
                    if (this.value6 == 1) {
                        this.data.name6 = '谢谢惠顾'
                    } else if (this.value6 == 2) {
                        this.data.name6 = '好可惜,再接再厉'
                    } else if (this.value6 == 3) {
                        this.data.name6 = '未中奖'
                    }
                }
            },
        }
    };
</script>
<style scoped>
    *{
        font-size: 12px;
    }
    .zj-text-input {
        width: 400px;
        height: 100px;
    }

    .zj-mess p {
        text-align: match-parent;
        line-height: 1px;
        margin-bottom: 25px;
        padding-left: 42px;
    }

    .zj-messages {
        margin-top: 10px;
    }

    .zj-message {
        margin-left: 100px;
        width: 400px;
        height:20px;
    }

    .zj-message p {
        line-height: 0px !important;
        margin:0;
        font-size: 12px;
        color: red;
        line-height: 10px;
    }

    .zj-texts {
        position: absolute;
        width: 346px;
        resize: none;
        height: 150px;
        padding: 5px 5px;
        word-wrap: break-word;
        top: 670px;
        border-radius: 8px;
        overflow: auto;
        left: 23px;
    }

    .zj-skien {
        position: absolute;
        width: 345px;
        height: 150px;
        padding: 5px 5px;
        top: 670px;
        left:22px;
        border-radius: 8px;
        z-index: 999;
        /*background-color: red;*/
    }

    .zj-xs1 {
        position: absolute;
        top: 216px;
        left: 100px;
    }

    .zj-xs2 {
        position: absolute;
        top: 260px;
        left:300px;
    }

    .zj-xs3 {
        position: absolute;
        top: 460px;
        left: 300px;
    }

    .zj-xs4 {
        position: absolute;
        top: 540px;
        left: 150px;
    }

    .zj-xs5 {
        position: absolute;
        top: 480px;
        left: 5px;
    }

    .zj-xs6 {
        position: absolute;
        top: 280px;
        left: 0px;
    }

    .zj-div {
        width: 120px;
        height: 74px;
        font-size: 14px;
        color: #333;
        /*outline: 1px solid red;*/
        padding: 4px 4px;
        background-color: darkorange;
        border-radius: 5px;
    }

    .zj-div p:nth-child(1) {
        text-align: center;
    }

    .zj-made1 {
        position: absolute;
        width: 100px;
        /* background-color: #00a0e8; */
        top: 300px;
        left: 155px;
        text-align: center;
    }

    .zj-made2 {
        position: absolute;
        width: 100px;
        /* background-color: green; */
        top: 350px;
        left: 240px;
        transform: rotate(60deg);
        text-align: center;
    }

    .zj-made3 {
        position: absolute;
        width: 100px;
        /* background-color: blue; */
        top: 455px;
        left: 240px;
        transform: rotate(120deg);
        text-align: center;
    }

    .zj-made4 {
        position: absolute;
        width: 100px;
        /* background-color: #00a0e8; */
        top: 510px;
        left: 158px;
        text-align: center;
        transform: rotate(180deg);

    }

    .zj-made5 {
        position: absolute;
        text-align: center;
        width: 100px;
        /* background-color: greenyellow; */
        top: 456px;
        left: 80px;
        transform: rotate(-120deg);

    }

    .zj-made6 {
        position: absolute;
        text-align: center;
        width: 100px;
        /* background-color: greenyellow; */
        top: 355px;
        left: 80px;
        transform: rotate(-60deg);

    }

    .zj-content {
        width: 100%;
        height: 80%;
    }
    .zj-back {
        display: inline-block;
        position: absolute;
        top: 0;
        width: 100%;
        height: 1000px;        
        /*background: url("../../../assets/images/backgroundImg.jpg") no-repeat;*/
        background-size: contain;
    }

    .zj-selects {
        margin-left: 5px;
    }

    .zj-button {
        width: 100px;
        margin-top: 20px;
        margin-left: 200px;
        margin-bottom: 50px;
        color: #20a0ff;
        border: 1px solid #20a0ff;
    }

    /*<!--规则设置-->*/
    .zj-line {
        display: flex;
        margin-left: 50px;
        margin-top: 10px;
        line-height: 30px;
    }

    .zj-line span:nth-of-type(1) {
        width: 118px;
        text-align: right;
    }

    .zj-code {
        width: 80px;
    }

    /*<!--说明设置-->*/
    .zj-text {
        display: flex;
        margin-top: 10px;
    }

    .zj-text span {
        width: 50px;
        line-height: 20px;
        margin-left: 40px;
    }

    .zj-text-textarea {
        width: 400px;
        height: 300px;
        resize: none;
        padding: 4px 4px;
        border: 1px solid darkgray;
        border-radius: 5px;
    }

    .zj-blocks {
        display: flex;
        margin-top: 10px;
    }

    .zj-blocks span:nth-of-type(1) {
        float: left;
        width: 8px;
        height: 25px!important;
        background-color: #20a0ff;
    }

    .zj-main {
        height: 100%;
        /*outline: 1px solid red;*/
        display: flex;
    }

    .zj-left {
        display: inline-block;
        min-width: 400px;
        height: 600px;
        /*outline: 1px solid green;*/
        position: relative;
        top: 40px;
        margin-left: 2%;
    }

    .zj-right {
        width: 600px;
        font-size: 12px;
        color: #333;
        /*color: red;*/
        padding-top: 20px;
        /*height:800px;*/
        display: inline-block;
        width: 600px;
        margin-left: 3%;
    }

    .zj-right div {
        display: inline-block;
    }

    .zj-right div span:nth-of-type(1) {
        float: left;
        width: 8px;
        height: 25px;
        background-color: #20a0ff;
    }

    .zj-right div span:nth-of-type(2) {
        float: left;
        line-height: 25px;
        font-size: 14px;
        color: #333!important;
        margin-left: 10px;
        /*outline:1px solid red;*/
    }

    .zj-right p {
        display: flex;
        line-height: 30px;
        margin-top: 10px;
        margin-left: 20px;
    }

    .zj-right p span:nth-of-type(1) {
        display: inline-block;
        width: 56px;
    }

    .zj-right p span:nth-of-type(2) {
        width: 40px;
        text-align: center;
    }

    .zj-input {
        width: 200px;
    }

    .zj-inputs {
        width: 120px;
    }
    .zj-main{
        justify-content: space-around;
    }
    .cjyy .zj-code{
        margin-left: 5px;
    }
</style>