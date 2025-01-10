/*
//사이드바 리스트 구성
let fragment = document.createDocumentFragment();
for(var i=0 ; i<jsonData.length ; i++) {
    if(jsonData[i].type == "") {
        let liTag = document.createElement('li');
        let aTag = document.createElement('a');
        aTag.id = i;
        aTag.setAttribute('class', "navA_gray");
        let aTagText = document.createTextNode(jsonData[i].title);
        let border = document.createElement('div');
        border.setAttribute('class', "borderDiv");

        aTag.appendChild(aTagText);
        liTag.appendChild(aTag);
        liTag.appendChild(border);
        fragment.appendChild(liTag);
        document.querySelector('#sidebar > ul').appendChild(fragment);
    }
    else if(jsonData[i].type == "groupStart") {
        let liTag = document.createElement('li');
        let aTag = document.createElement('a');
        aTag.setAttribute('class', "navA_gray");
        let aTagText = document.createTextNode(jsonData[i].mainTitle);
        let border = document.createElement('div');
        border.setAttribute('class', "borderDiv");

        let subUlTag = document.createElement('ul');
        subUlTag.setAttribute('class', "bg_white b_c_gray");
        let subLiTag = document.createElement('li');
        let subATag = document.createElement('a');
        subATag.id = i;
        subATag.setAttribute('class', "navA_gray");
        let subATagText = document.createTextNode(jsonData[i].title);
        let subBorder = document.createElement('div');
        subBorder.setAttribute('class', "borderDiv");

        aTag.appendChild(aTagText);
        liTag.appendChild(aTag);
        liTag.appendChild(border);

        subATag.appendChild(subATagText);
        subLiTag.appendChild(subATag);
        subUlTag.appendChild(subLiTag);
        subUlTag.appendChild(subBorder);
        liTag.appendChild(subUlTag);
        fragment.appendChild(liTag);
        document.querySelector('#sidebar > ul').appendChild(fragment);
    }
    
}
*/

//사이드바 내용물 클릭 시 해당 영역으로 이동

//사이드바 영역에 커서 올렸을 때
document.querySelector("#sidebar").onmouseover = function() {
    document.querySelector("#sidebarImg").setAttribute("src", "./image/drop_gray_left.png");
}

//사이드바 영역에 커서 나갔을 때
document.querySelector("#sidebar").onmouseout = function() {
    document.querySelector("#sidebarImg").setAttribute("src", "./image/drop_gray_right.png");
}