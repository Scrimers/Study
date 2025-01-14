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


//메인 사이드바 스크롤을 서브 사이드바가 따라오게 하기
const aDiv = document.getElementById('sidebarMain');
const bDiv = document.getElementById('sidebarSub');
aDiv.addEventListener('scroll', () => {
    bDiv.scrollTop = aDiv.scrollTop; //a div의 스크롤 위치를 b div에 동기화
});


var mouseTarget = "";
//사이드바 영역에 커서 올렸을 때
document.querySelector('#sidebar > #sidebarMain > ul').addEventListener('mouseover', function(event) {
    console.log(1);
    const target = event.target;

    //경계선 건너뜀
    if(target.getAttribute('class') == "borderDiv") {
        return;
    }

    //사이드바 1depth 원래 위치 -20px로 이동(css로 2depth는 제어가 어려워 선언)
    document.querySelector('#sidebarMain').style.transform = 'translate(-20px, 0)';

    //기존에 mouseover한 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //사이드바 mouseleave 로직 호출
        sidebarMouseleave();
    }    

    //새롭게 mouseover된 요소
    mouseTarget = document.querySelectorAll('[data-groupNm="'+event.target.id+'"]');
    console.log("mouseTarget : ", mouseTarget);

    //요소에 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //사이드바 2depth 원래 위치 -20px로 이동(css로 2depth는 제어가 어려워 선언)
        document.querySelector('#sidebarSub').style.transform = 'translate(-20px, 0)';
        
        //mouseover한 요소의 2depth ul태그 on추가로 노출 처리
        mouseTarget[0].parentElement.parentElement.classList.add('on');

        mouseTarget.forEach(function(target, index) {    
            //li태그 영역확보(ul영역이 자식영역을 확보할 수 있도록)    
            target.parentElement.style.height = 'calc(var(--side-bar-height)* 0.082)';
            target.style.display = 'flex';
        });

        //addEventListener('mouseleave', sidebarMouseleave) = 함수의 참조를 전달한다. 그래서 mouseleave 이벤트가 발생할 때 sidebarMouseleave 함수가 호출된다.
        //addEventListener('mouseleave', sidebarMouseleave()) = 함수가 즉시 호출되어 그 반환값이 addEventListener에 전달된다. 
        //그래서 mouseleave 이벤트가 발생하기 전에 sidebarMouseleave 함수가 실행되고, 그 결과가 이벤트 핸들러로 등록된다. 
        //만약 sidebarMouseleave가 반환값이 없다면 undefined가 전달되므로, 이벤트가 발생해도 아무런 동작을 하지 않게 된다.
        document.querySelector('.on').addEventListener('mouseleave', sidebarMouseleave);
    }
});

document.querySelector('#sidebar > #sidebarMain > ul').addEventListener('mouseleave', function() {
    //요소에 2depth가 있을 때
    // if(mouseTarget.length <= 0) {
        // document.querySelector('#sidebarMain').style.transform = '';
    // }
});

//사이드바 mouseleave 로직
function sidebarMouseleave() {
    //css통해 자동으로 돌아옴
    // document.querySelector('#sidebarMain').style.transform = '';
    document.querySelector('#sidebarSub').style.transform = '';

    let onClass = document.querySelector('.on');
    //기존 mouseleave 이벤트 제거
    onClass.removeEventListener('mouseleave', sidebarMouseleave);
    //기존 class on 제거
    onClass.classList.remove('on');

    //2depth요소 미노출 처리
    mouseTarget.forEach(function(target, index) {
        target.parentElement.style.height = '0';
        target.style.display = 'none';
    });
    //기존 mouseover 요소 초기화
    mouseTarget = "";
}