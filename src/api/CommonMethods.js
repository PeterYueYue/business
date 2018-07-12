// yyyy-MM-dd
export const formateDate = (date) => {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};
//转换成毫秒
export const formatTimestamp = (date) => {
    let timestamp = Date.parse(date);
    return timestamp = timestamp / 1000;
};
//正则判断正整数
export const checkRate = (input) => {
    return /^[1-9]+[0-9]*]*$/.test(input)
};

//转换为妙
function add0(m) {
    return m < 10 ? '0' + m : m
}

export const formDateSecond = (data) => {
    let time = new Date(data);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
};
export const formDateSecond59 = (data) => {
    let time = new Date(data);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    return y + '-' + add0(m) + '-' + add0(d) + ' 23:59:59';
};
//除重
export const unique = (a) => {
    let res = [];
    for (let i = 0, len = a.length; i < len; i++) {
        let item = a[i];
        (res.indexOf(item) === -1) && res.push(item);
    }
    return res;
};
//星期处理
export const weekDispose = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] == '星期一') {
            arr.push(1)
        }
        if (data[i] == '星期二') {
            arr.push(2)
        }
        if (data[i] == '星期三') {
            arr.push(3)
        }
        if (data[i] == '星期四') {
            arr.push(4)
        }
        if (data[i] == '星期五') {
            arr.push(5)
        }
        if (data[i] == '星期六') {
            arr.push(6)
        }
        if (data[i] == '星期日') {
            arr.push(7)
        }
    }
    let arrs = '';
    return arrs = unique(arr).toString()
};
//星期处理1
export const weekDispose1 = (data) => {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i] == '1') {
            arr.push('星期一')
        }
        if (data[i] == '2') {
            arr.push('星期二')
        }
        if (data[i] == '3') {
            arr.push('星期三')
        }
        if (data[i] == '4') {
            arr.push('星期四')
        }
        if (data[i] == '5') {
            arr.push('星期五')
        }
        if (data[i] == '6') {
            arr.push('星期六')
        }
        if (data[i] == '7') {
            arr.push('星期日')
        }
    }
    let arrs = '';
    return arrs = unique(arr).toString()
};
export const DateLong = (data) => {
    Date.prototype.Format = function (fmt) { //author: meizz
        let o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    let setdata = '';
    for (let i = 0; i < data.length; i++) {
        let a = new Date(data[i].value[0]).Format('hh:mm:ss');
        let b = new Date(data[i].value[1]).Format('hh:mm:ss');
        let c = a + ',' + b;
        if (i == 0) {
            setdata = c;
        } else {
            setdata = setdata + "^" + c
        }
    }
    return setdata;
};

//文件导出开始
export const postExport = ({url, data}) =>{
    return new Promise((resolve,reject)=>{
        const iframe = document.createElement("iframe");
        iframe.setAttribute('id','iframe_display');
        iframe.setAttribute('name','iframe_display');
        iframe.setAttribute('style','display:none');
        document.querySelector('.container').appendChild(iframe);
        const form = document.createElement("form");
        form.setAttribute('id','form1123');
        form.setAttribute('target','iframe_display');
        form.setAttribute('method','post');
        form.setAttribute('action',markUrl(url,data));
        document.querySelector('.container').appendChild(form);
        form.submit();
        form.remove();
        const parent = document.querySelector('.container');
        const iframe1 = document.getElementById("iframe_display");
        setTimeout(()=>{
            resolve({code:200})
            removeElement(iframe1)
        },2000)
    })

}
function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(_element);
    }
}
function markUrl(link,data){
    if (typeof data != "undefined" && data != "") {
        var paramArr = [];
        for (var attr in  data) {
            paramArr.push(attr + '=' +  data[attr]);
        }
        link += '?' + paramArr.join('&');
    }
    return link;
}
//文件导出结束