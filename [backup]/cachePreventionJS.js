var now = new Date();
var year = now.getFullYear();//연도
var month = (now.getMonth()+1).toString();//월
var date = now.getDate();//일
var day = now.getDay();//요일
var hr = now.getHours();//시간
var min = now.getMinutes();//분
var sec = now.getSeconds();//초
var nowDate = year+month+date+hr+min+sec;

//캐시 방지를 위해 pc, 모바일 버전 css파일 변수 추가
$('#styleCss').attr('href', './style.css?v='+nowDate);
$('#mobileStyleCss').attr('href', './mobileStyle.css?v='+nowDate);