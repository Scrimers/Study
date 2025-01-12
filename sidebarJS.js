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

/* 추후 수정후 복구
//사이드바 영역에 커서 올렸을 때
document.querySelector("#sidebar").onmouseover = function() {
    document.querySelector("#sidebarImg").setAttribute("src", "./image/drop_gray_left.png");
    // document.body.style.overflowY = 'hidden';
}

//사이드바 영역에 커서 나갔을 때
document.querySelector("#sidebar").onmouseout = function() {
    document.querySelector("#sidebarImg").setAttribute("src", "./image/drop_gray_right.png");
    // document.body.style.overflowY = 'auto';
}
*/



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
        //기존 mouseleave 이벤트 제거
    // document.querySelector('.on').removeEventListener('mouseleave', sidebarMouseleave);
    }    

    //새롭게 mouseover된 요소
    mouseTarget = document.querySelectorAll('[aria-describedby="'+event.target.id+'"]');

    //요소에 2depth가 있을 때
    if(mouseTarget.length > 0) {
        //mouseleave 체크를 위해 class on 추가
        mouseTarget[0].parentElement.parentElement.setAttribute('class', 'on');
        //2depth요소 노출 처리
        mouseTarget.forEach(function(target, index) {        
            target.style.display = 'block';
        });

        //sidebarMouseleave = 함수의 참조를 전달한다. 그래서 mouseleave 이벤트가 발생할 때 handleMouseLeave 함수가 호출된다.
        //sidebarMouseleave() = 함수가 즉시 호출되어 그 반환값이 addEventListener에 전달된다. 
        //그래서 mouseleave 이벤트가 발생하기 전에 handleMouseLeave 함수가 실행되고, 그 결과가 이벤트 핸들러로 등록됩니다. 
        //만약 handleMouseLeave가 반환값이 없다면 undefined가 전달되므로, 이벤트가 발생해도 아무런 동작을 하지 않게 됩니다.
        document.querySelector('.on').addEventListener('mouseleave', sidebarMouseleave);
        /*
        //class on 영역에서 커서 벗어날 시
        document.querySelector('.on').addEventListener('mouseleave', function(event) {  
            
            // //기존 class on 제거
            // document.querySelector('.on').setAttribute('class', '');
            // //2depth요소 미노출 처리
            // mouseTarget.forEach(function(target, index) {
            //     target.style.display = 'none';
            // });
            // //기존 mouseleave 이벤트 제거
            // document.querySelector('.on').removeEventListener('mouseleave', function(event) {});
        });
        */
    }
});

function sidebarMouseleave() {
    console.log(1);
    //기존 mouseleave 이벤트 제거
    document.querySelector('.on').removeEventListener('mouseleave', sidebarMouseleave);
    console.log(2);
    //기존 class on 제거
    document.querySelector('.on').setAttribute('class', '');
    console.log(3);
    //2depth요소 미노출 처리
    mouseTarget.forEach(function(target, index) {
        console.log(4);
        target.style.display = 'none';
    });
    console.log(5);
}

// document.querySelector('.on').addEventListener('mouseleave', function(event) {
//     console.log("나감 : ",event.target);
//     // if(mouseTarget != "") {
//     //     mouseTarget.forEach(function(target, index) {
//     //         target.style.display = 'none';
//     //     });
//     // }
// });

// document.querySelector('#sidebarDiv').addEventListener('mouseleave', function(event) {
//     console.log("완전히 나감 : ",event.target);
// });
