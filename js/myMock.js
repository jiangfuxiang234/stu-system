// 该文件用来模拟 MockJS 库

// 姓
var lastName = ["赵", '钱', "孙", "李", '周', '吴', '郑', '王', '谢', '张'];
// 名
var firstName = ['杰', '梅', '丽', '虎', '进', '兵', '成', '皓', '立', '文', '静'];
// 城市
var cityName = ['成都', '北京', '长沙', '郑州', '内蒙古', '重庆', '甘肃', '河北', '漯河', '驻马店', '江西'];
// 随机的字符
var charArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// 随机的数字
var numArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

function randomContent(arr, num){
    var str = '';
    for(var i = 0; i < num; i++){
        str += arr[Math.floor(Math.random() * arr.length)]
    }
    return str;
}