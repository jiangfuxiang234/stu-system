var curPage = 1;
var eachPage = 5; //每一页显示多少条学生数据
var editstuId = null;

// 初始化学生数据
var stuData = [
    { "stuId": 1, "stuName": "谢杰", "stuGender": "男", "stuEmail": "123@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "成都" },
    { "stuId": 2, "stuName": "张三", "stuGender": "男", "stuEmail": "234@qq.com", "stuAge": 19, "stuTel": 13112341234, "stuAddr": "北京" },
    { "stuId": 3, "stuName": "李四", "stuGender": "女", "stuEmail": "789@qq.com", "stuAge": 18, "stuTel": 13112341234, "stuAddr": "哈尔滨" },
];


// 导航栏切换

function changestulist() {
    $('.leftMenuItem').classList.add('itemActive');
    $$('.leftMenuItem')[1].classList.remove('itemActive');
    $('.rightContent>div').classList.remove('notShow');
    $$('.rightContent>div')[1].classList.add('notShow');
}


console.log($('.leftMenu'));
function changeItem() {
    $('.leftMenu').onclick = function (e) {

        if (e.target.innerHTML === '学生列表') {
            changestulist()
        }
        if (e.target.innerHTML === '新增学生') {
            addstudata()
        }
    }
}
function addstudata(id) {
    if (id) { //有id说明是编辑学生，要进行表单回填
        var editstu = stuData.filter(function (elem) {
            return elem.stuId === parseInt(id);
        })[0]//返回的是数组，而且只有一位，而我们要对里面的对象进行操作，所以要加[0]进行取值

        $('#stuName').value = editstu.stuName;
        $('#stuEmail').value = editstu.stuEmail;
        $('#stuAge').value = editstu.stuAge;
        $('#stuTel').value = editstu.stuTel;
        $('#stuAddr').value = editstu.stuAddr;
        if (editstu.stuGender === '男') {
            $('.gender').value = true;
        } else {
            $$('.gender')[1].value = true;
        }
        editstuId = editstu.stuId;
        $('#addStuBtn').value = '确认修改';
    }
    $('.leftMenuItem').classList.remove('itemActive');
    $$('.leftMenuItem')[1].classList.add('itemActive');
    $('.rightContent>div').classList.add('notShow');
    $$('.rightContent>div')[1].classList.remove('notShow');
}


// 渲染表格内容
function changeContent(arr) {
    rendenPage(arr);
    $('#stuTable').innerHTML = '';
    arr = arr.slice((curPage - 1) * eachPage, curPage * eachPage);
    var thead = `
     <thead>
     <tr>
    <th>学号</th>
    <th>姓名</th>
    <th>性别</th>
    <th>邮箱</th>
    <th>年龄</th>
    <th>手机号</th>
    <th>住址</th>
    <th>操作</th>
     </tr>
      </thead>
    `

    var tbody = arr.map(function (elem) {
        return `
        <tr>
    <td>${elem.stuId}</td>
    <td>${elem.stuName}</td>
    <td>${elem.stuGender}</td>
    <td>${elem.stuEmail}</td>
    <td>${elem.stuAge}</td>
    <td>${elem.stuTel}</td>
    <td>${elem.stuAddr}</td>
    <td>
    <button data-id = ${elem.stuId} class = "operationBtn editBtn">编辑</button>
    <button data-id = ${elem.stuId} class = "operationBtn delBtn">删除</button>
    </td>
    </tr>
    `
    }).join('');
    $('#stuTable').innerHTML = thead + '<tbody>' + tbody + '</tbody>';

}
// 随机新增
$('#addStuRandom').onclick = function () {
    var randomArr = {
        'stuName': randomContent(lastName, 1) + (Math.random() > 0.5 ? randomContent(firstName, 1) : randomContent(firstName, 2)),
        'stuGender': Math.random() > 0.5 ? '男' : '女',
        'stuEmail': randomContent(charArr, Math.floor(Math.random() * 5 + 4)) + '@' + randomContent(charArr, 2) + '.com',
        'stuAge': Math.floor(Math.random() * 11 + 20),
        'stuTel': '1' + randomContent(numArr, 10),
        'stuAddr': randomContent(cityName, 1)
    }
    randomArr.stuId = stuData[stuData.length - 1].stuId + 1;
    curPage = Math.ceil(stuData.length / eachPage);
    stuData.push(randomArr);
    changeContent(stuData);
}

//搜索功能

$('#searchBtn').onclick = function () {
    var searchType = $("#selectSearchItem").value;
    var searchContent = $('#searchStu').value;
    if (searchContent) {
        switch (searchType) {
            case 'stuId': var searchFilter = stuData.filter(function (elem) {
                return elem.stuId === parseInt(searchContent);//搜索框里面获取的内容是字符串类型的，而stuData数组里的stuId是数字数字number类型的，所以要转换
            });
                console.log(searchFilter);
                break;
            case 'stuName': var searchFilter = stuData.filter(function (elem) {
                return elem.stuName === searchContent;
            });
                break;


        }
        changeContent(searchFilter);
        curPage = 1;

    } else {
        window.alert('请输入搜索内容')
    }
}
//返回功能
$('#backBtn').onclick = function () {
    $('#searchBtn').value = '';
    changeContent(stuData);
}

// 编辑和删除功能
$('#stuTable').onclick = function (e) {
    if (e.target.classList.contains('editBtn')) {
        addstudata(e.target.dataset.id);

    }
    if (e.target.classList.contains('delBtn')) {
        if (window.confirm('确定删除该信息？')) {
            for (var i = 0; i < stuData.length; i++) {
                if (stuData[i].stuId === parseInt(e.target.dataset.id)) {
                    console.log(1);
                    stuData.splice(i, 1);
                }
            }
        }
        var taltPage = stuData.length / eachPage;
        if (curPage > taltPage) {
            curPage = taltPage;
        }
        changeContent(stuData);

    }

}
// 渲染分页
function rendenPage(arr) {
    $('#page').innerHTML = '';
    var center = '';

    var taltPage = Math.ceil(arr.length / eachPage);
    if (taltPage < 8) {
        center = ceateLi(center, 1, taltPage, curPage);
        console.log(1);
    } else {
        if (curPage <= 3) {
            center = ceateLi(center, 1, 3, curPage);
            center += `...<li class = 'pageNum'>${taltPage}</li>`
        } else if (curPage > taltPage - 3) {
            center = `<li class = 'pageNum'>1</li>...`;
            center = ceateLi(center, taltPage - 3, taltPage, curPage)

        } else {
            center += `<li class = 'pageNum'>1</li>...`;
            center = ceateLi(center, curPage - 2, curPage + 2, curPage);
            center += `...<li class = 'pageNum'>${taltPage}</li>`;
        }
    }
    $('#page').innerHTML = $("#page").innerHTML = `
        <ul id="pageSelect" class="pagination">
            <li class="prevPage">&lt;</li>
            ${center}
            <li class="nextPage">&gt;</li>
        </ul>
    `
}
$('#page').onclick = function (e) {
    var taltPage = Math.ceil(stuData.length / eachPage);
    if (e.target.classList.contains('prevPage')) {
        curPage--;
        if (!curPage) {
            window.alert('已经是第一页了')
            curPage = 1;
            return
        }
        changeContent(stuData);
    }
    if (e.target.classList.contains('pageNum')) {
        curPage = parseInt(e.target.innerText);
        changeContent(stuData);
    }
    if (e.target.classList.contains('nextPage')) {
       
        curPage++;
        if (curPage > taltPage) {
            window.alert('已经是最后一页了');
            curPage = taltPage;
            return;


        }
        changeContent(stuData);
    }
}
// cleaForm清空表单内容，用于提交表单或者未全部填完表单内容而点返回操作，以此来清空表单内容，以免下次再填写时还有之前填写的内容
function cleaForm() {
    $('#addStuForm').reset();
   var regArr = [...$$('.regValidate')];//这是es6语法，拿的是所含该类的所有元素，而不是该元素里面的内容
   for(var i = 0; i < regArr.length; i++){
       regArr[i].innerHTML = '';
   }
   $('#addStuBtn').value = '提交';
}
// 自定义新增
$('#addStuBtnByForm').onclick = function () {
    addstudata();
}
$('#addStuBtn').onclick = function (e) {
    var retArr = [$('#stuName').value,
    $('.gender').checked ? '男' : '女',
    $('#stuEmail').value,
    $('#stuAge').value,
    $('#stuTel').value,
    $('#stuAddr').value];
    if (retArr.every(function (elem, index) {
        return elem !== '';
    })) {
        var valedateArr = [...$$('.regValidate')];
        if (valedateArr.every(function (elem) {
            return elem.innerHTML === ''
        })) {// 说明符合填写要求可以提交，然后要判断是新增还是修改
            var newArr = { //retArr拿的是数组，要把他变成对象才好放进stuData数组里
                'stuName' : retArr[0],
                'stuGender' : retArr[1],
                'stuEmail' : retArr[2],
                'stuAge' : retArr[3],
                'stuTel' : retArr[4],
                'stuAddr' : retArr[5],
            }
            if (e.target.value === '提交') {
                console.log(888);
                newArr.stuId = stuData[stuData.length - 1].stuId + 1;
                stuData.push(newArr);
                curPage = Math.ceil(stuData.length / eachPage);


            } else {

                for (var i = 0; i < stuData.length; i++) {
                    if (stuData[i].stuId === editstuId) {
                        newArr.stuId = editstuId;
                        stuData.splice(i, 1, newArr);
                    }
                }
            }
            changeContent(stuData);
            changestulist();
            cleaForm();

        } else {
            window.alert('请按要求填写每一项')
        }

    } else {
        window.alert('请填写表单每一项，目前有空项');
    }
}
$('#backStuList').onclick = function () {
    changestulist();
    cleaForm();
}

// 主函数入口
function main() {
    changeItem();
    changeContent(stuData);
}
main();