const storageColorMode = localStorage.getItem('colorMode');
if(storageColorMode != null) {
    setColorMode(storageColorMode);
}

//색상 변경 영역 클릭 시
$('.indexTitleColorGrid').click(function() {    
    let colorMode = $(this).attr('id');
    localStorage.setItem('colorMode', colorMode);
    setColorMode(colorMode);
});

function setColorMode(colorMode) {
    console.log("2");
    let tarBgColor, tarBCColor, tarnavAColor, tarRBColor, tarMarkColor, tarBLColor;
    let chBgColor, chBCColor, chNavAColor, chRBColor, chMarkColor, chBLColor;

    switch(colorMode) {
        case "wGMode" :
            tarBgColor = "bg_black";
            tarBCColor = "b_c_green";
            tarnavAColor = "navA_green";
            tarRBColor = "rightB_green";
            tarMarkColor = "green";
            tarBLColor = "bL_green";
            chBgColor = "bg_white";
            chBCColor = "b_c_gray";
            chNavAColor = "navA_gray";
            chRBColor = "rightB_gray";
            chMarkColor = "gray";
            chBLColor = "bL_gray";
            break;
        case "wGrMode" :
            tarBgColor = "bg_black";
            tarBCColor = "b_c_gray";
            tarnavAColor = "navA_gray";
            tarRBColor = "rightB_gray";
            tarMarkColor = "gray";
            tarBLColor = "bL_gray";
            chBgColor = "bg_white";
            chBCColor = "b_c_green";
            chNavAColor = "navA_green";
            chRBColor = "rightB_green";
            chMarkColor = "green";
            chBLColor = "bL_green";
            break;
        case "bGMode" :
            tarBgColor = "bg_white";
            tarBCColor = "b_c_green";
            tarnavAColor = "navA_green";
            tarRBColor = "rightB_green";
            tarMarkColor = "green";
            tarBLColor = "bL_green";
            chBgColor = "bg_black";
            chBCColor = "b_c_gray";
            chNavAColor = "navA_gray";
            chRBColor = "rightB_gray";
            chMarkColor = "gray";
            chBLColor = "bL_gray";
            break;
        case "bGrMode" :
            tarBgColor = "bg_white";
            tarBCColor = "b_c_gray";
            tarnavAColor = "navA_gray";
            tarRBColor = "rightB_gray";
            tarMarkColor = "gray";
            tarBLColor = "bL_gray";
            chBgColor = "bg_black";
            chBCColor = "b_c_green";
            chNavAColor = "navA_green";
            chRBColor = "rightB_green";
            chMarkColor = "green";
            chBLColor = "bL_green";
            break;
    }

    var bgColor = $('.'+tarBgColor).not('.indexTitleSubGrid *');
    for(var i=0; i<bgColor.length ; i++) {
        $(bgColor[i]).removeClass(tarBgColor).addClass(chBgColor);
    }

    var bCColor = $('.'+tarBCColor).not('.indexTitleSubGrid *');
    for(var i=0; i<bCColor.length ; i++) {
        $(bCColor[i]).removeClass(tarBCColor).addClass(chBCColor);
    }

    var navAColor = $('.'+tarnavAColor).not('.indexTitleSubGrid *');
    for(var i=0; i<navAColor.length ; i++) {
        $(navAColor[i]).removeClass(tarnavAColor).addClass(chNavAColor);
    }

    var rightBColor = $('.'+tarRBColor).not('.indexTitleSubGrid *');
    for(var i=0; i<rightBColor.length ; i++) {
        $(rightBColor[i]).removeClass(tarRBColor).addClass(chRBColor);
    }

    var markColor = $('.'+tarMarkColor).not('.indexTitleSubGrid *');
    for(var i=0; i<markColor.length ; i++) {
        $(markColor[i]).removeClass(tarMarkColor).addClass(chMarkColor);
    }

    var bLColor = $('.'+tarBLColor).not('.indexTitleSubGrid *');
    for(var i=0; i<bLColor.length ; i++) {
        $(bLColor[i]).removeClass(tarBLColor).addClass(chBLColor);
    }
}