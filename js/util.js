// 封装两个获取dom元素的函数

function $(selecter){
    return document.querySelector(selecter);
}
function $$(selecter){
    return document.querySelectorAll(selecter);
}

// 封装生成li的函数

function ceateLi (center, startLi, endLi, curentLi){
    for(var i = startLi; i <= endLi; i++){
        if(curentLi === i){
            center += `<li class='pageNum currentPage'>${i}</li>`;
        } else {
            center += `<li class='pageNum'>${i}</li>`;
        }
    }
    return center;
}