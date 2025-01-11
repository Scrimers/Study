$.getJSON('./json/'+studyType+'.json')
.done(function(data) {
    console.log("=server active=");
     //서버에서 실행 시 
     jsonData = data;
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("=local active=");
     //로컬에서 실행 시 (CORS에러 때문에 작성)
     jsonData = localJson;
})
.always(function() {
    jsonData = JSON.parse(JSON.stringify(jsonData));
    //메인 컨텐츠 그리기 호출
    composeMainContents(jsonData);
});

//메인 컨텐츠 그리기
function composeMainContents(jsonData) {
    var html = [];
    $.each(jsonData, function(i, item){				
        if(item.title == undefined) {
            console.log("명시되지 않은 타입 존재");
            return true;	//continue
        }

        if(item.type == "groupStart") {
            html.push('<article class="subArticle">');
            html.push('	<h1 class="bg_white b_c_gray subTitle">');
            html.push(item.mainTitle);
            html.push('	</h1>');

            html.push('	<div class="bg_white b_c_gray subGroup">');		
            if(item.reStudy == "y") {
                html.push('		<h3 class="bg_white b_c_gray subTitle du">');
            }else {
                html.push('		<h3 class="bg_white b_c_gray subTitle">');
            }
            html.push(item.title);
            html.push('		</h3>');

            html.push('	<div class="subGrid">');
            html.push('		<div class="bg_white b_c_gray subTitle">설명</div>');
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
                html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
                html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
                html.push(item.howUse);
                html.push('		</div>');
                html.push('	</div>');
            }
        }
        else if(item.type == "groupIng" || item.type == "groupEnd") {
            html.push('	<div class="subGroupC">');		
            if(item.reStudy == "y") {
                html.push('		<h3 class="bg_white b_c_gray subTitle du">');
            }else {
                html.push('		<h3 class="bg_white b_c_gray subTitle">');
            }	
            html.push(item.title);
            html.push('		</h3>');

            html.push('	<div class="subGrid">');
            html.push('		<div class="bg_white b_c_gray subTitle">설명</div>');
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
                html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
                html.push('		<div class="bg_white b_c_gray bg_white b_c_gray subTextHowUse">');
                html.push(item.howUse);
                html.push('		</div>');
                html.push('	</div>');
            }

            if(item.type == "groupEnd") {
                html.push('	</div>');
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
            html.push('		<div class="bg_white b_c_gray subTitle">설명</div>');
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
                    html.push('		<div class="bg_white b_c_gray subTitleHowUse">사용법</div>');
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
}