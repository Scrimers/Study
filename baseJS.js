let studyType;
let jsonData;

// DOMContentLoaded 이벤트를 사용하여 DOM이 완전히 로드된 후에 실행
document.addEventListener("DOMContentLoaded", function() {
    //url get params 추출
    let url = new URL(location.href);
    let urlParams = url.searchParams;
    studyType = urlParams.get('studyType');

    //네비게이션 로드
    $('#navigationDiv').load("./navigation.html", function() {
        //dropdown js 불러오기
        $.getScript("./dropdownJS.js");
    });

    //JSON 데이터 파싱 및 메인 컨텐츠 구성
    $.getScript("./composeMainJS.js")
    .done(function() {
        if(studyType != null) {
            //사이드바 로드
            $('#sidebarDiv').load("sidebar.html", function() {
                //sidebarJS js 불러오기
                $.getScript("./sidebarJS.js")
                .fail(function() {
                    console.log("sidebarJS load fail");
                });
            });
        }

        // 색상 변경 js 불러오기
        $.getScript("./colorModeJS.js")
        .fail(function() {
            console.log("colorModeJS load fail");
        });
    })
    .fail(function() {
        console.log("main contents compose fail");
    });
});