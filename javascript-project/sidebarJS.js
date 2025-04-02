//사이드바 리스트 구성
let fragment = document.createDocumentFragment();
let groupStartId;
let mainCnt = 0;
let subCnt = 0;

for(var i=0 ; i<jsonData.length ; i++) {
    //2depth가 없을때
    if(jsonData[i].type == "") {
        //1depth 구성 시작
        fragment = document.createDocumentFragment();               //fragment 초기화
        let aTagText = document.createTextNode(textReplace(jsonData[i].title));  //1depth 제목
        let aTag = document.createElement('a');                     //1depth a태그
        aTag.id = 'side_m_'+mainCnt;
        aTag.classList.add('navA_gray');
        let border = document.createElement('div');                 //1dpeth 하단 경계선
        border.classList.add("borderDiv");
        let liTag = document.createElement('li');
        
        aTag.appendChild(aTagText);
        liTag.appendChild(aTag);
        liTag.appendChild(border);
        fragment.appendChild(liTag);
        document.querySelector('#sidebar > #sidebarMain > ul').appendChild(fragment);
        mainCnt++;
        //1depth 구성 끝

        //2depth 구성 시작
        fragment = document.createDocumentFragment();               //fragment 초기화
        fragment.appendChild(document.createElement('ul'));         //2depth 껍데기 ul
        document.querySelector('#sidebarSub').appendChild(fragment);
        //2depth 구성 끝
    }
    //2depth가 있을때
    else {
        //그룹 시작 시 
        if(jsonData[i].type == "groupStart") {
            //1depth 구성 시작
            fragment = document.createDocumentFragment();               //fragment 초기화
            let aTagText = document.createTextNode(textReplace(jsonData[i].mainTitle));  //1depth 제목
            let aTag = document.createElement('a');                     //1depth a태그
            aTag.id = 'side_m_'+mainCnt;
            aTag.classList.add('navA_gray');
            groupStartId = aTag.id;
            let border = document.createElement('div');                 //1dpeth 하단 경계선
            border.classList.add("borderDiv");
            let liTag = document.createElement('li');
            liTag.setAttribute("group" ,'');
            
            aTag.appendChild(aTagText);
            liTag.appendChild(aTag);
            liTag.appendChild(border);
            fragment.appendChild(liTag);
            document.querySelector('#sidebar > #sidebarMain > ul').appendChild(fragment);
            mainCnt++;
            subCnt = 0;
            //1depth 구성 끝
        }

        //2depth 구성 시작
        fragment = document.createDocumentFragment();                   //fragment 초기화
        let subATagText = document.createTextNode(textReplace(jsonData[i].title));   //2depth 제목
        let subATag = document.createElement('a');                      //2depth a태그
        subATag.id = 'side_s_'+subCnt;
        if(jsonData[i].type == "groupStart") {
            subATag.classList.add('groupStart', 'navA_gray', 'bg_white', 'b_c_gray');
        }
        else if(jsonData[i].type == "groupIng") {
            subATag.classList.add('navA_gray', 'bg_white', 'b_c_gray');
        }
        if(jsonData[i].type == "groupEnd") {
            subATag.classList.add('groupEnd', 'navA_gray', 'bg_white', 'b_c_gray');
        }
        subATag.setAttribute("data-groupNm", groupStartId);
        let subLiTag = document.createElement('li');                        //2depth li태그

        subATag.appendChild(subATagText);
        subLiTag.appendChild(subATag);

        if(jsonData[i].type == "groupStart") {
            let subUlTag = document.createElement('ul');                        //2depth ul태그
            subUlTag.appendChild(subLiTag);
            fragment.appendChild(subUlTag);         
            document.querySelector('#sidebarSub').appendChild(fragment);
        }
        else {
            var appendTarget = document.querySelectorAll('#sidebarSub > ul');
            fragment.appendChild(subLiTag);         
            appendTarget[appendTarget.length - 1].appendChild(fragment);
        }
        subCnt++;
        //2depth 구성 끝
    }
}

//글자 길이 조절
function textReplace(text) {
    if(text.length > 15) {
        text = text.slice(0, 14).trim() + '...';
    }
    return text;
}

//1depth 영역 버튼
const sidebarMainBtns = document.querySelectorAll('#sidebarMain > ul > li');
sidebarMainBtns.forEach(btn => {
    //2depth가 있으면 건너뜀
    if (btn.hasAttribute('group')) {
        return;
    } 

    //2depth 없으면 클릭 이벤트 추가
    btn.addEventListener('click', function() {
        let aTagId = btn.children[0].id.split('_');
        let targetElement = document.querySelectorAll('#mainSection > article')[aTagId[aTagId.length - 1]].children[0];

        // 요소가 뷰포트에 보이도록 스크롤 이동
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

//2depth 영역 버튼
const sidebarSubBtns = document.querySelectorAll('#sidebarSub > ul > li');
sidebarSubBtns.forEach(btn => {
    //클릭 이벤트 추가
    btn.addEventListener('click', function() {
        let groupnm = btn.children[0].dataset.groupnm.split('_');
        let aTagId = btn.children[0].id.split('_');
        let groupIndex = groupnm[groupnm.length - 1];
        let aTagIdIndex = Number(aTagId[aTagId.length - 1]);
        
        let targetElement = document.querySelectorAll('#mainSection > article')[groupIndex].children[aTagIdIndex + 1].children[0];

        // 요소가 뷰포트에 보이도록 스크롤 이동
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});

let sidebarMain = document.getElementById('sidebarMain');
let sidebarSub = document.getElementById('sidebarSub');

//스크롤 동기화 호출
sidebarMain.addEventListener('scroll', syncScroll);
//스크롤 동기화
function syncScroll() {
    //1depth 사이드바 스크롤을 2depth 사이드바가 따라오게 하기
    sidebarSub.scrollTop = sidebarMain.scrollTop;
}

var mouseTarget = "";
//사이드바 영역에 커서 올렸을 때
document.querySelector('#sidebar > #sidebarMain > ul').addEventListener('mouseover', function(event) {
    const target = event.target;

    //경계선 건너뜀
    if(target.getAttribute('class') == "borderDiv") {
        return;
    }

    //사이드바 1depth 원래 위치로 이동(css로 2depth는 제어가 어려워 선언)
    sidebarMain.style.transform = 'translate(0, 0)';

    //기존에 mouseover한 2depth가 있을 때
    if(mouseTarget.length > 0) {        
        //on클래스 mouseleave 로직 호출
        onClassMouselaeve("beforeMouseTarget");
    }    

    //새롭게 mouseover된 요소
    mouseTarget = document.querySelectorAll('[data-groupNm="'+event.target.id+'"]');

    //요소에 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //사이드바 2depth 원래 위치로 이동(css로 2depth는 제어가 어려워 선언)
        sidebarSub.style.transform = 'translate(0, 0)';
        
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
            sidebarSub.scrollTop -= sidebarSub.getBoundingClientRect().top - mouseTarget[0].getBoundingClientRect().top;
        }        

        //on된 마지막 자식요소의 bottom이 2dpeth bottom보다 클떄??(뭔가 기호가 반대인 느낌이지만 이게 맞다...)
        if(mouseTarget[mouseTarget.length - 1].getBoundingClientRect().bottom > sidebarSub.getBoundingClientRect().bottom) {
            sidebarSub.scrollTop += mouseTarget[mouseTarget.length - 1].getBoundingClientRect().bottom - sidebarSub.getBoundingClientRect().bottom;
        }

        //addEventListener('mouseleave', sidebarMouseleave) = 함수의 참조를 전달한다. 그래서 mouseleave 이벤트가 발생할 때 sidebarMouseleave 함수가 호출된다.
        //addEventListener('mouseleave', sidebarMouseleave()) = 함수가 즉시 호출되어 그 반환값이 addEventListener에 전달된다. 
        //그래서 mouseleave 이벤트가 발생하기 전에 sidebarMouseleave 함수가 실행되고, 그 결과가 이벤트 핸들러로 등록된다. 
        //만약 sidebarMouseleave가 반환값이 없다면 undefined가 전달되므로, 이벤트가 발생해도 아무런 동작을 하지 않게 된다.
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
    //2depth에 마우스 올라가도 기존 1depth 배경색 유지
    document.getElementById(mouseTarget[0].dataset.groupnm).style.background = '#555';
    // mouseleave 이벤트 추가
    document.querySelector('.on').addEventListener('mouseleave', onClassMouselaeve);
};

//on클래스 mouseleave 로직
function onClassMouselaeve (type) {
    //스크롤 동기화 호출
    syncScroll();

    //2depth에 마우스 벗어나면 기존 1depth 배경색 제거
    document.getElementById(mouseTarget[0].dataset.groupnm).style.background = '';

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