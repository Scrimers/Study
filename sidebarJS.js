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

// //사이드바 영역에 커서 올렸을 때
// document.querySelector("#sidebar").onmouseover = function() {
//     document.querySelector("#sidebarImg").setAttribute("src", "./image/drop_gray_left.png");
// }

// //사이드바 영역에 커서 나갔을 때
// document.querySelector("#sidebar").onmouseout = function() {
//     document.querySelector("#sidebarImg").setAttribute("src", "./image/drop_gray_right.png");
// }



//사이드바 영역에 커서 올렸을 때
// document.querySelector("#sidebar > #sidebarMain > ul  li").onmouseover = function() {
//     console.log(this);
// }

var mouseTarget = "";
//사이드바 영역에 커서 올렸을 때
document.querySelector('#sidebar > #sidebarMain > ul').addEventListener('mouseover', function(event) {
    const target = event.target;

    //경계선 건너뜀
    if(target.getAttribute('class') == "borderDiv") {
        return;
    }

    //기존에 mouseover한 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //사이드바 mouseleave 로직 호출
        sidebarMouseleave();
    }    

    //새롭게 mouseover된 요소
    mouseTarget = document.querySelectorAll('[data-groupNm="'+event.target.id+'"]');

    //요소에 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //mouseleave 체크를 위해 class on 추가
        mouseTarget[0].parentElement.parentElement.setAttribute('class', 'on');
        //2depth요소 노출 처리
        mouseTarget.forEach(function(target, index) {        
            target.style.display = 'block';
        });

        //addEventListener('mouseleave', sidebarMouseleave) = 함수의 참조를 전달한다. 그래서 mouseleave 이벤트가 발생할 때 sidebarMouseleave 함수가 호출된다.
        //addEventListener('mouseleave', sidebarMouseleave()) = 함수가 즉시 호출되어 그 반환값이 addEventListener에 전달된다. 
        //그래서 mouseleave 이벤트가 발생하기 전에 sidebarMouseleave 함수가 실행되고, 그 결과가 이벤트 핸들러로 등록된다. 
        //만약 sidebarMouseleave가 반환값이 없다면 undefined가 전달되므로, 이벤트가 발생해도 아무런 동작을 하지 않게 된다.
        document.querySelector('.on').addEventListener('mouseleave', sidebarMouseleave);
    }
});

//메인 사이드바 스크롤을 서브 사이드바가 따라오게 하기
const aDiv = document.getElementById('sidebarMain');
const bDiv = document.getElementById('sidebarSub');
aDiv.addEventListener('scroll', () => {
    bDiv.scrollTop = aDiv.scrollTop; //a div의 스크롤 위치를 b div에 동기화
});

//사이드바 mouseleave 로직
function sidebarMouseleave() {
    let onClass = document.querySelector('.on');
    
    //기존 mouseleave 이벤트 제거
    onClass.removeEventListener('mouseleave', sidebarMouseleave);
    //기존 class on 제거
    onClass.setAttribute('class', '');
    //2depth요소 미노출 처리
    mouseTarget.forEach(function(target, index) {
        target.style.display = 'none';
    });
    //기존 mouseover 요소 초기화
    mouseTarget = "";
}