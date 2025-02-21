//드롭다운 영역에 커서 올렸을 때
document.querySelector(".dropdown").onmouseover = function() {
    switch(this.id) {
        case "DevelopmentDropdown" :
            document.querySelector("#DevelopmentDropdownImg").setAttribute("src", "./image/drop_gray_down.png");
            break;
    }
}

//드롭다운 영역에 커서 나갔을 때
document.querySelector(".dropdown").onmouseout = function() {
    document.querySelectorAll("img").forEach(img => {
        img.setAttribute("src", "./image/drop_gray_right.png");
    });
}