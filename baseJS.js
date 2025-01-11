let studyType;
let jsonData;
let localJson;
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

    //localJson 데이터 불러오기 (CORS에러 때문에 작성)
    //json파일을 불러오기에 $.getJSON을 썼으나 정상적으로 동작하지 않음. 그래서 $.getScript 사용.
    $.getScript('./json/local/'+studyType+'.json', function() {
        console.log("local JSON load complete");
    })    
    .done(function() {
        console.log("local JSON load success");
        //JSON 데이터 파싱 및 메인 컨텐츠 구성
        $.getScript("./composeMainJS.js", function(data){
            console.log("main contents compose load complete");
        })
        .done(function() {
            console.log("main contents compose success");
            //사이드바 로드
            $('#sidebarDiv').load("sidebar.html", function() {
                //sidebarJS js 불러오기
                $.getScript("./sidebarJS.js")
                .fail(function() {
                    console.log("sidebarJS load fail");
                });
            });

            // 색상 변경 js 불러오기
            $.getScript("./colorModeJS.js")
            .fail(function() {
                console.log("colorModeJS load fail");
            });
        })
        .fail(function() {
            console.log("main contents compose fail");
        });
    })
    .fail(function() {
        console.log("local JSON load fail");
    })  
    
    
        



    /*
    $.getScript('./json/local/'+studyType+'.json', function(data){     
        //JSON 데이터 파싱 및 메인 컨텐츠 구성
        $.getScript("./composeMainJS.js", function(data){
            //사이드바 로드
            $('#sidebarDiv').load("sidebar.html", function() {
                //sidebarJS js 불러오기
                $.getScript("./sidebarJS.js");
            });

            // 색상 변경 js 불러오기
            $.getScript("./colorModeJS.js")
            .fail(function() {
                console.log("색상 변경 js 로드 실패");
            });
        })
        .fail(function() {
            console.log("메인 컨텐츠 구성 실패");
        });
    })
    .fail(function() {
        console.log("local JSON 로드 실패");
    });
    */
});