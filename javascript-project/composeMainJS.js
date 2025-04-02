$.ajax({
    url: "../json/"+studyType+".json",
    dataType: "json",
    async: false,
    method: "GET"
})
.done(function(data) {
    //json데이터 불러오기
    jsonData = JSON.parse(JSON.stringify(data));
    //메인 컨텐츠 그리기 호출
    composeMainContents(jsonData);
})
.fail(function() {
    console.log("main contents JSON load fail");
})

//메인 컨텐츠 그리기
function composeMainContents(jsonData) {
    var html = [];
    $.each(jsonData, function(i, item){				
        if(item.title == undefined) {
            console.log("명시되지 않은 타입 존재");
            return true;	//continue
        }

        if(item.type == "groupStart") {
            html.push('<article class="subArticle b_c_gray">');
            html.push('	<h1 class="bg_white subTitle">');
            html.push(item.mainTitle);
            html.push('	</h1>');

            html.push('	<div class="bg_white subGroup">');		
            if(item.reStudy == "y") {
                html.push('		<h3 class="bg_white b_c_gray subTitle du">');
            }else {
                html.push('		<h3 class="bg_white b_c_gray subTitle">');
            }
            html.push(item.title);
            html.push('		</h3>');

            html.push('	<div class="subGrid">');
            html.push('		<div class="bg_white b_c_gray subExplain">설명</div>');
            html.push('		<div class="bg_white b_c_gray subText">');
            if(item.explain != undefined && item.explain != "") {
                html.push(item.explain);
            }
            else {
                html.push('-');
            }
            html.push('		</div>');
            html.push('	</div>');

            if(item.howUse != undefined && item.howUse != "") {
                html.push('	<div class="subHowUse">');
                // html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
                html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법');
                html.push('		<span class="codePenReload" type="button">새로고침</span>');
                html.push('		</div>');
                html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
                html.push(item.howUse);
                html.push('		</div>');
                html.push('	</div>');
            }
            html.push('</div>');
        }
        else if(item.type == "groupIng" || item.type == "groupEnd") {
            html.push('	<div class="subGroup subGroupC">');		
            if(item.reStudy == "y") {
                html.push('		<h3 class="bg_white b_c_gray subTitle du">');
            }else {
                html.push('		<h3 class="bg_white b_c_gray subTitle">');
            }	
            html.push(item.title);
            html.push('		</h3>');

            html.push('	<div class="subGrid">');
            html.push('		<div class="bg_white b_c_gray subExplain">설명</div>');
            html.push('		<div class="bg_white b_c_gray subText">');
            if(item.explain != undefined && item.explain != "") {
                html.push(item.explain);
            }
            else {
                html.push('-');
            }
            html.push('		</div>');
            html.push('	</div>');

            if(item.howUse != undefined && item.howUse != "") {
                if(item.type == "groupIng") {
                    html.push('	<div class="subHowUse">');
                }else {
                    html.push('	<div>');
                }
                // html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
                html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법');
                html.push('		<span class="codePenReload" type="button">새로고침</span>');
                html.push('		</div>');
                html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
                html.push(item.howUse);
                html.push('		</div>');
                html.push('	</div>');
            }

            html.push('	</div>');

            if(item.type == "groupEnd") {
                html.push('</article>');
                
                if((jsonData.length-1) != i) {
                    html.push('<div class="bL_gray"></div>');
                }
            }
        }
        else {
            html.push('<article class="subArticle">');

            if(item.reStudy == "y") {
                html.push('	<h3 class="bg_white b_c_gray subTitle du">');
            }else {
                html.push('	<h3 class="bg_white b_c_gray subTitle">');
            }
            html.push(item.title);
            html.push('	</h3>');
            
            html.push('	<div class="subGrid">');
            html.push('		<div class="bg_white b_c_gray subExplain">설명</div>');
            html.push('		<div class="bg_white b_c_gray subText">');
            if(item.explain != undefined && item.explain != "") {
                html.push(item.explain);
            }
            else {
                html.push('-');
            }
            html.push('		</div>');
            html.push('	</div>');

            if(item.howUse != undefined && item.howUse != "") {
                    html.push('	<div>');
                    // html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
                    html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법');
                    html.push('		<span class="codePenReload" type="button">새로고침</span>');
                    html.push('		</div>');
                    html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
                html.push(item.howUse);
                html.push('		</div>');
                html.push('	</div>');
            }

            html.push('</article>');

            if((jsonData.length-1) != i) {
                html.push('<div class="bL_gray"></div>');
            }
        }
    });
    $('#mainSection').html(html.join(''));

    //이벤트 호출
    eventLoad();
}

//이벤트 호출
function eventLoad() {
    //코드펜 새로고침
    document.querySelectorAll('.codePenReload').forEach(function(x) {
        x.addEventListener('click', function() {
            //iframe영역
            const iframe = this.parentElement?.nextElementSibling?.querySelector('iframe');
            if (iframe) {
                //주소 변경으로 인한 새로고침
                const iframeSrc = iframe.getAttribute('src');
                iframe.setAttribute('src', iframeSrc);
            }
            else {
                console.log("reload fail");
            }
        });
    })
}
