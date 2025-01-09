//url get params 추출
let url = new URL(location.href);
let urlParams = url.searchParams;
let studyType = urlParams.get('studyType');

//localJson 데이터 불러오기 (CORS에러 때문에 작성)
let scriptElement = document.createElement("script");
scriptElement.id = "localJson"
scriptElement.src = "./json/local/"+studyType+".json";
scriptElement.type = "text/javascript";
document.body.appendChild(scriptElement);

//JSON 데이터 파싱 및 노출용 js 불러오기
scriptElement = document.createElement("script");
scriptElement.src = "./serverjsonLinkJS.js";
document.body.appendChild(scriptElement);

setTimeout(() => {
    // 색상 변경 js 불러오기
    scriptElement = document.createElement("script");
    scriptElement.src = "./colorModeJS.js";
    document.body.appendChild(scriptElement);
}, 150);