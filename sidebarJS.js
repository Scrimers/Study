//사이드바 영역에 커서 올렸을 때
document.querySelector("#sidebar").onmouseover = function() {
    document.querySelector("#sidebarImg").setAttribute("src", "/image/drop_gray_left.png");
}

//사이드바 영역에 커서 나갔을 때
document.querySelector("#sidebar").onmouseout = function() {
    document.querySelector("#sidebarImg").setAttribute("src", "/image/drop_gray_right.png");
}