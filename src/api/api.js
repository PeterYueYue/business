import axios from 'axios';

// only run one 

// npm run build 需要修改

//测试环境部署打包
// let base = 'http://139.196.177.162:80';
// let base = 'http://192.168.1.179:8080';
// let base = 'http://192.168.1.158:8080';

//正式服务器环境部署打包
let base = 'http://b.tingzhijun.com';

//本地运行
// let base = '';  

//登录接口
export const requestLogin = params => {
    return axios.post(`${base}/business/business_circle!login.action`, params).then(res => res.data);
};
//会员列表
export const menberList = params => {
    return axios.post(`${base}/business/business_circle!businessMemberList.action`, params).then(res => res.data);
};
//获取授权情况
export const queryAccredit = () => {
    return axios.get(`${base}/business/business_circle!verifyAuthStatus.action`).then(res => res.data);
};
//获取门店列表
export const getShopLists = params => {
    return axios.post(`${base}/business/business_shop_info!list.action`, params).then(res => res.data);
};
//获取会员积分设置
export const getMemberPoints = () => {
    return axios.get(`${base}/business/business_conver_rate!getRateByCircle.action`).then(res => res.data);
};
//会员积分设置保存
export const saveMember = params => {
    return axios.post(`${base}/business/business_conver_rate!saveRateByCircle.action`, params).then(res => res.data);
};
//积分抵现提交
export const integralNow = params => {
    return axios.post(`${base}/business/business_circle_point!saveCirclePoint.action`, params).then(res => res.data);
};
//活动列表
export const getTicketList = params => {
    return axios.post(`${base}/business/business_circle_point!getCirclePointList.action`, params).then(res => res.data);
};
//查看流水
export const getActiveWater = params => {
    return axios.post(`${base}/business/business_circle_point!getActivityWater.action`, params).then(res => res.data);
};
//积分活动查看详情
export const getActiveDetail = params => {
    return axios.post(`${base}/business/business_circle_point!getActivityDetails.action`, params).then(res => res.data);
};
//获取商户登录状态
export const getLoginStatus = () => {
    return axios.post(`${base}/business/business_circle!ajaxBusinessVerify.action`).then(res => res.data)
};
//获取门店中文名称
export const getChineseName = params => {
    return axios.post(`${base}/business/business_shop_info!getShopList.action`, params).then(res => res.data);
};
//门店查分类
export const getShopClassify = params => {
    return axios.post(`${base}/business/business_shop_info!getCategoryList.action`, params).then(res => res.data)
};
//分类查商品
export const getShopDetail = params => {
    return axios.post(`${base}/business/business_shop_info!goodsList.action`, params).then(res => res.data)
};
//保存单品券信息
export const saveAloneMesssage = params => {
    return axios.post(`${base}/business/business_inner_voucher!saveInnerVoucher.action`, params).then(res => res.data)
};
//获取代金券列表
export const getGoldList = params => {
    return axios.post(`${base}/business/business_inner_voucher!getAllVoucherList.action`, params).then(res => res.data)
};
//单品券列表
export const getProductList = params => {
    return axios.post(`${base}/business/business_inner_voucher!voucherList.action`, params).then(res => res.data)
};
//单品券详情
export const getProductDetail = params => {
    return axios.post(`${base}/business/business_inner_voucher!getVoucherDetail.action`, params).then(res => res.data)
};
//单品券下架
export const productSoldOut = params => {
    return axios.post(`${base}/business/business_inner_voucher!offlineActive.action`, params).then(res => res.data)
};
//代金券创建
export const saveProduct = params => {
    return axios.post(`${base}/business/business_inner_voucher!saveInnerVoucher.action`, params).then(res => res.data)
};
//积分促销创建
export const pointBased = params => {
    return axios.post(`${base}/business/business_point_promotion!savePointPromotion.action`, params).then(res => res.data)
};
//积分促销列表
export const getPointList = params => {
    return axios.post(`${base}/business/business_point_promotion!pointPromotionList.action`, params).then(res => res.data)
};
//积分促销详情
export const getPointPromotion = params => {
    return axios.post(`${base}/business/business_point_promotion!getPointPromotionById.action`, params).then(res => res.data)
};
//积分促销下架
export const pointSoldOut = params => {
    return axios.post(`${base}/business/business_point_promotion!offline.action`, params).then(res => res.data)
};
//创建活动
export const makeActive = params => {
    return axios.post(`${base}/business/reward!saveTurntableReward.action`, params).then(res => res.data);
};
//进入页面请求数据
export const getActive = params => {
    return axios.post(`${base}/business/reward!showTurntable.action`, params).then(res => res.data);
};
//兑换
export const exchange = params => {
    return axios.post(`${base}/business/reward!exchange.action`, params).then(res => res.data);
};
//确认兑换
export const sureExchange = params => {
    return axios.post(`${base}/business/reward!certaintExchange.action`, params).then(res => res.data);
};
//下架按钮
export const underpants = params => {
    return axios.post(`${base}/business/reward!afterActivity.action`, params).then(res => res.data);
};
//核销接口
export const nuclear = () => {
    return axios.post(`${base}/business/reward!afterAward.action`).then(res => res.data);
};
//支付宝红包创建接口
export const getAlipy = params => {
    return axios.post(`${base}/business/ali_cash_activity!saveAliCashActivity.action`, params).then(res => res.data);
};
//支付宝红包列表
export const getAlipyList = params => {
    return axios.post(`${base}/business/ali_cash_activity!getAliCashActivityPager.action`, params).then(res => res.data)
};
//支付宝下架
export const alipyEnd = params => {
    return axios.post(`${base}/business/ali_cash_activity!changeActivityStatus.action`, params).then(res => res.data)
};
//支付宝红包列表详情
export const alipyPointList = params => {
    return axios.post(`${base}/business/ali_cash_activity!getAliCashLogPager.action`, params).then(res => res.data)
};
//支付宝活动详情
export const alipyDetail = params => {
    return axios.post(`${base}/business/ali_cash_activity!getAliCashActivityById.action`, params).then(res => res.data)
};
//加上这个以免报错
export const alipyRefresh = params => {
    return false
    // return axios.post(`${base}/business/ali_cash_activity!getAliCashActivityById.action`, params).then(res => res.data)
};


// ----------------------------分割线-----------------------------------------------------
//获取商户列表
export const getShopList = params => {
    return axios.post(`${base}/business/business_shop_info!list.action`, params).then(res => res.data);
};
//获取最新商户数据
export const getNewShopList = () => {
    return axios.post(`${base}/business/business_shop_info!refreshShopInfo.action`).then(res => res.data);
};
//改变商户每人日积分获得上限
export const changeCode = params => {
    return axios.post(`${base}/business/business_shop_info!updateIntegral.action`, params).then(res => res.data);
};
//获取商圈账单汇总列表
export const getbillList = params => {
    return axios.post(`${base}/business/payment!billSummary.action`, params).then(res => res.data);
};
//获取商圈下活动流水
export const getactiveList = params => {
    return axios.post(`${base}/business/payment!activity.action`, params).then(res => res.data);
};
//获取商圈会员卡模板
export const getmembercade = () => {
    return axios.post(`${base}/business/business_card_template!getCardTemplateByCircle.action`).then(res => res.data);
};
export const sentmembercard = params => {
    return axios.post(`${base}/business/business_card_template!saveCardTemplateByCircle.action`, params).then(res => res.data);
};
//活动列表活动下架
export const downactive = params => {
    return axios.post(`${base}/business/business_circle_point!unableCirclePoint.action`, params).then(res => res.data);
};
//查看流水
export const getWater = params => {
    return axios.post(`${base}/business/business_inner_voucher!selectCircleVoucherDetails.action`, params).then(res => res.data);
};
export const getWaterd = params => {
    return axios.post(`${base}/business/business_inner_voucher!selectVoucherDetails.action`, params).then(res => res.data);
};
//大转盘活动记录列表
export const getActivityList = params => {
    return axios.post(`${base}/business/reward!getActivityList.action`, params).then(res => res.data);
}
//通过抽奖活动获取奖项信息
export const getRewardByActivity = params => {
    return axios.post(`${base}/business/reward!getRewardByActivity.action`, params).then(res => res.data);
}
//查看抽奖活动中奖会员信息
export const getRewardLog = params => {
    return axios.post(`${base}/business/reward!getRewardLog.action`, params).then(res => res.data);
}
//提交招商工具集参数创建活动
export const createVoucher = params => {
    return axios.post(`${base}/business/investment!createVoucher.action`, params).then(res => res.data);
}
//获取口碑招商工具集活动列表
export const getInvestmentPager = params => {
    return axios.post(`${base}/business/investment!getInvestmentPager.action`, params).then(res => res.data);
}
//口碑招商工具集活动下架
export const activeoffline = params => {
    return axios.post(`${base}/business/investment!offline.action`, params).then(res => res.data);
}
//口碑招商工具集活动查看详情
export const getVoucher = params => {
    return axios.post(`${base}/business/investment!getVoucher.action`, params).then(res => res.data);
}
//口碑招商工具集活动列表获取子表列表
export const getSonVoucher = params => {
    return axios.post(`${base}/business/investment!getSonVoucher.action`, params).then(res => res.data);
}
//单品券活动详情根据店铺查看不同商品
export const getGoodsByShop = params => {
    return axios.post(`${base}/business/business_inner_voucher!getGoodsByShop.action`, params).then(res => res.data);
}
//查询礼品兑换记录列表
export const GiftListLog = params =>{
    return axios.post(`${base}/business/gift/listLog.jhtml`, params).then(res => res.data);
}
//根据兑换码显示礼品
export const GiftShowByCode = params =>{
    return axios.post(`${base}/business/gift/showGiftByCode.jhtml`, params).then(res => res.data);
}
//领取礼品
export const receiveGift = params =>{
    return axios.post(`${base}/business/gift/receiveGift.jhtml`, params).then(res => res.data);
}
//新增、编辑礼品
export const savaGift = params =>{
    return axios.post(`${base}/business/gift/savaGift.jhtml`, params).then(res => res.data);
}
//礼品库列表
export const giftLibrary = params =>{
    return axios.post(`${base}/business/gift/giftLibrary.jhtml`, params).then(res => res.data);
}
//查看商品详情
export const selectGift = params =>{
    return axios.post(`${base}/business/gift/selectGift.jhtml`, params).then(res => res.data);
}
//删除商品 
export const deleteGift = params =>{
    return axios.post(`${base}/business/gift/deleteGift.jhtml`, params).then(res => res.data);
}
//上下架商品  
export const afterGift = params =>{
    return axios.post(`${base}/business/gift/afterGift.jhtml`, params).then(res => res.data);
}
//批量上下架商品  
export const afterGifts = params =>{
    return axios.post(`${base}/business/gift/afterGifts.jhtml`, params).then(res => res.data);
}
//获取完整的号码
export const gettruephone = params =>{
    return axios.post(`${base}/business/business_member!getMobile.action`, params).then(res => res.data);
}
//获取商圈行业积分比例
export const getRateByCircle = params =>{
    return axios.post(`${base}/business/business_circle!members.action`, params).then(res => res.data);
}
//获取支付宝交易通知
export const getDealMessage = params =>{
    return axios.post(`${base}/business/business_point_notify!pointNotifyList.action`, params).then(res => res.data);
}
//注册送券活动创建
export const submitRegister = params =>{
    return axios.post(`${base}/business/business_circle_voucher!saveCircleVoucher.action`,params).then(res => res.data);
}
//注册送券活动列表
export const getRegisterList = params =>{
    return axios.post(`${base}/business/business_circle_voucher!getListByBusiness.action`,params).then(res => res.data);
}
//下架注册送券
export const disabledRegister = params =>{
    return axios.post(`${base}/business/business_circle_voucher!offLine.action`,params).then(res => res.data);
}

//上传Logo
export const upImages = params =>{
    return axios.post(`${base}/business/business/file!fileUpload.action`,params).then(res => res.data);
}

//积分管理员列表
export const getintegralManagelist = params =>{
    return axios.post(`${base}/business/business_pointer!pointerList.action`,params).then(res => res.data);
}
//积分管理列表 状态启用
export const enablePointer = params =>{
    return axios.post(`${base}/business/business_pointer!enablePointer.action`,params).then(res => res.data);
}

//积分管理列表 状态禁用
export const disablePointer = params =>{
    return axios.post(`${base}/business/business_pointer!disablePointer.action`,params).then(res => res.data);
}
// 积分管理员列表 新增
export const addvipUser = params =>{
    return axios.post(`${base}/business/business_pointer!savePointer.action`,params).then(res => res.data);
}
// 积分管理员列表 删除
export const deletevipUser = params =>{
    return axios.post(`${base}/business/business_pointer!delPointer.action`,params).then(res => res.data);
}
//积分管理员表 编辑
export const redactUser = params =>{
    return axios.post(`${base}/business/business_pointer!updatePointer.action`,params).then(res => res.data)
}
//积分操作记录 列表
export const getIntegraList = params =>{
    return axios.post(`${base}/business/business_pointer_log!pointerLogList.action`,params).then(res => res.data)
}

/////////////
// 营销活动 现金抵价券 创建
export const creatCashDuctible = params =>{
    return axios.post(`${base}/business/cash/voucher.jhtml`,params).then(res => res.data);
}
// 营销活动 现金抵价券 门店列表
export const getstorelist = params =>{
    return axios.post(`${base}/business/get/shop_info.jhtml`,params).then(res => res.data);
}
// 营销活动 现金抵价券  活动列表
export const cashDuctibleList = params =>{
    return axios.post(`${base}/business/get/template/list.jhtml`,params).then(res => res.data);
}
// 营销活动 现金抵价券  详情页
export const cashItemInfo = params =>{
    return axios.post(`${base}/business/get/template/one.jhtml`,params).then(res => res.data);
}
// 营销活动 现金抵价券  券下架
export const cashItemLower = params =>{
    return axios.post(`${base}/business/get/template/lower.jhtml`,params).then(res => res.data);
}
//////////////

// 营销活动-积分商城- 积分操作记录
export const exchangehistryList = params =>{
    return axios.post(`${base}/business/business_product_log!getProductLogList.action`,params).then(res => res.data);
}
// 营销活动-积分商城-列表
export const integralStoreList = params =>{
    return axios.post(`${base}/business/business_product!getProductList.action`,params).then(res => res.data);
}
//营销活动-积分商城-商品上架
export const upPutAway = params => {
    return axios.post(`${base}/business/business_product!productUpBatch.action`,params).then(res => res.data);
}
//营销活动-积分商城-商品下架
export const downSoldOut = params => {
    return axios.post(`${base}/business/business_product!productDownBatch.action`,params).then(res => res.data);
}
//营销活动-积分商城-商品下架
export const deleteAction= params => {
    return axios.post(`${base}/business/business_product!productDelBatch.action`,params).then(res => res.data);
}
//营销活动-积分商城-位置排序码
export const sort= params => {
    return axios.post(`${base}/business/business_product!productShowOrder.action`,params).then(res => res.data);
}
//营销活动-积分商城-新增商品-券分类
export const addtype= params => {
    return axios.post(`${base}/business/business_product!getInnerVoucherListByType.action`,params).then(res => res.data);
}
//营销活动-积分商城-新增商品-券详情
export const ticketInfo= params => {
    return axios.post(`${base}/business/business_product!getInnerVoucherByItemId.action`,params).then(res => res.data);
}
//营销活动-积分商城-新增商品-添加
export const addStiorInfo= params => {
    return axios.post(`${base}/business/business_product!insertProduct.action`,params).then(res => res.data);
}
//营销活动-积分商城-新增商品-兑换条件单独
export const addCondition= params => {
    return axios.post(`${base}/business/business_product!getCardTemplateLevel.action`,params).then(res => res.data);
}
//活动列表-查看流水
export const lookFlows = params =>{
    return axios.post(`${base}/business/get/template/water.jhtml`,params).then(res => res.data)
}
//会员管理-列表-查询
export const getCircleMemberList = params =>{
    return axios.post(`${base}/business/business_member!getCircleMemberList.action`,params).then(res =>res.data)
}
//营销活动-积分操作记录-导出
export const exportWater = params =>{
    return axios.post(`${base}/business/business_product_log!exportCashLog.action`,params).then(res =>res.data)
}
//商圈设置 获取商圈参数
export const getCircleSet = params =>{
    return axios.post(`${base}/business/business_circle_set!getCircleSet.action`,params).then(res => res.data)
}
//商圈设置 商圈参数设置
export const setCircleSet = params =>{
    return axios.post(`${base}/business/business_circle_set!setCircleSet.action`,params).then(res => res.data)
}
// 商圈 免登录
export const freeLogin = params =>{
    return axios.post(`${base}/business/business_circle!freeLogin.action`,params).then(res => res.data)
}
// 代金券 获取银行信息
export const getBankName = params =>{
    return axios.post(`${base}/business/cash/banks.jhtml`,params).then(res => res.data)
}
