// 验证表单内容，采用了失焦事件
$('#stuName').onblur = function(e){
    if(e.target.value){
        $('#validateName').innerHTML = '';

    }else{
        $('#validateName').innerHTML = '请填写学生姓名'
    }
}

$('#stuEmail').onblur = function(e){
    if(e.target.value){
        if(/^[\w\.-_]+@[\w-_]+\.com$/.test(e.target.value)){
            $('#validateEmail').innerHTML = '';
        }else{
            $('#validateEmail').innerHTML = '请按要求填写邮箱';
        }

    }else{
        $('#validateEmail').innerHTML = '请填写邮箱';
    }
}

$('#stuAge').onblur = function(e){
    var avalue = e.target.value;
    if(avalue){
       if(isNaN(avalue)){
        $('#validateAge').innerHTML = '请填写数字'
       }else{
           if(avalue < 0 || avalue >100){
            $('#validateAge').innerHTML = '填写的年龄范围不正确';
           }else{
            $('#validateAge').innerHTML = '';
           }
       }
    }else{
        $('#validateAge').innerHTML = '请填写年龄';
    }
}