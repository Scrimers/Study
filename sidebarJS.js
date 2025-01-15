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

let sidebarMain = document.getElementById('sidebarMain');
let sidebarSub = document.getElementById('sidebarSub');

//1depth 사이드바 스크롤을 2depth 사이드바가 따라오게 하기
// const sidebarDepth1 = document.getElementById('sidebarMain');
// const sidebarDepth2 = document.getElementById('sidebarSub');
sidebarMain.addEventListener('scroll', () => {
    sidebarSub.scrollTop = sidebarMain.scrollTop;
});

var mouseTarget = "";
//사이드바 영역에 커서 올렸을 때
document.querySelector('#sidebar > #sidebarMain > ul').addEventListener('mouseover', function(event) {
    const target = event.target;

    //경계선 건너뜀
    if(target.getAttribute('class') == "borderDiv") {
        return;
    }

    //사이드바 1depth 원래 위치 -20px로 이동(css로 2depth는 제어가 어려워 선언)
    sidebarMain.style.transform = 'translate(-20px, 0)';

    //기존에 mouseover한 2depth가 있을 때
    if(mouseTarget.length > 0) {        
        //on클래스 mouseleave 로직 호출
        onClassMouselaeve("beforeMouseTarget");
    }    

    //새롭게 mouseover된 요소
    mouseTarget = document.querySelectorAll('[data-groupNm="'+event.target.id+'"]');

    //요소에 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //사이드바 2depth 원래 위치 -20px로 이동(css로 2depth는 제어가 어려워 선언)
        sidebarSub.style.transform = 'translate(-20px, 0)';
        
        //mouseover한 요소의 2depth ul태그 on추가로 노출 처리
        mouseTarget[0].parentElement.parentElement.classList.add('on');

        mouseTarget.forEach(function(target, index) {    
            //li태그 영역확보(ul영역이 자식영역을 확보할 수 있도록)    
            target.parentElement.style.height = 'calc(var(--side-bar-height)* 0.082)';  //추후 고민 어차피 호버되면 ul 값이 지정되는데...흠...
            target.style.display = 'flex';
        });


        let onClass = document.querySelector('.on');
        //on된 첫번째 자식요소의 top이 2dpeth top보다 작을떄??(뭔가 기호가 반대인 느낌이지만 이게 맞다...)
        if(mouseTarget[0].getBoundingClientRect().top < sidebarSub.getBoundingClientRect().top) {
            console.log("1111111111");
            // onClass.style.top = sidebarSub.getBoundingClientRect().top + 3 + 'px';
        }        

        //on된 마지막 자식요소의 bottom이 2dpeth bottom보다 클떄??(뭔가 기호가 반대인 느낌이지만 이게 맞다...)
        if(mouseTarget[mouseTarget.length - 1].getBoundingClientRect().bottom > sidebarSub.getBoundingClientRect().bottom) {
            console.log("22222222");
            // onClass.style.bottom = sidebarSub.getBoundingClientRect().bottom + 'px';
            sidebarSub.scrollTop = mouseTarget[mouseTarget.length - 1].getBoundingClientRect().bottom - sidebarSub.getBoundingClientRect().bottom;
        }

        //addEventListener('mouseleave', sidebarMouseleave) = 함수의 참조를 전달한다. 그래서 mouseleave 이벤트가 발생할 때 sidebarMouseleave 함수가 호출된다.
        //addEventListener('mouseleave', sidebarMouseleave()) = 함수가 즉시 호출되어 그 반환값이 addEventListener에 전달된다. 
        //그래서 mouseleave 이벤트가 발생하기 전에 sidebarMouseleave 함수가 실행되고, 그 결과가 이벤트 핸들러로 등록된다. 
        //만약 sidebarMouseleave가 반환값이 없다면 undefined가 전달되므로, 이벤트가 발생해도 아무런 동작을 하지 않게 된다.
        // document.querySelector('.on').addEventListener('mouseover', sidebarMouseleave);
        // document.querySelector('.on').addEventListener('mouseleave', sidebarMouseleave);
        document.querySelector('.on').addEventListener('mouseover', onClassMouseover);
    }
});

//사이드바 영역에서 커서 벗어났을때
document.querySelector('#sidebar > #sidebarMain').addEventListener('mouseleave', function() {
    //요소에 2depth가 없을 때
    if(mouseTarget.length <= 0) {
        sidebarMain.style.transform = '';
    }
});

//on클래스 mouseover 로직
const onClassMouseover = () => {
    // mouseleave 이벤트 추가
    document.querySelector('.on').addEventListener('mouseleave', onClassMouselaeve);
};

//on클래스 mouseleave 로직
function onClassMouselaeve (type) {
    if(type == "beforeMouseTarget") {
        //2depth 닫히도록(css통해 자동으로 돌아옴)
        sidebarSub.style.transform = '';
    }
    else {
        //1depth, 2depth 닫히도록css통해 자동으로 돌아옴
        sidebarMain.style.transform = '';
        sidebarSub.style.transform = '';
    }

    let onClass = document.querySelector('.on');
    // onClass.style.top = 0;
    //기존 mouseleave 이벤트 제거
    onClass.removeEventListener('mouseleave', onClassMouselaeve);
    //기존 mouseover이벤트 제거
    onClass.removeEventListener('mouseover', onClassMouseover);
    //기존 class on 제거
    onClass.classList.remove('on');

    //2depth요소 미노출 처리
    mouseTarget.forEach(function(target, index) {
        target.parentElement.style.height = '0';
        target.style.display = 'none';
    });
    //기존 mouseover 요소 초기화
    mouseTarget = "";
};