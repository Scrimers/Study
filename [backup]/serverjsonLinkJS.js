let jsonData;

//JSON을 못 읽어오는 이슈가 있어서 일단 serTimeout을 걸긴 했는데...
//local에서는 이게 의미가 있겠지만... server에서는 어차피 동기로 읽어오는데.. 의미가 없지 않을까?
//그런데 왜 처음 서버로 들어가서 누르면 작동을 안하고 그 이후엔 작동을 하는지 모르겠다..
setTimeout(() => {
    console.log("1");
    $.ajaxSetup({ async: false });	// 전역으로 동기화 설정
    $.getJSON('./json/'+studyType+'.json', function(data){
        //서버에서 실행 시 
        jsonData = data;
    })
    .fail(function() {
        //로컬에서 실행 시 (CORS에러 때문에 작성)
        jsonData = localJson;
    })
    .always(function() {
        jsonData = JSON.parse(JSON.stringify(jsonData));
    });
    $.ajaxSetup({ async: true });	// 전역으로 비동기화 설정

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
}, 100);