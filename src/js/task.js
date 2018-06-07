function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "pbl__nav-menu") {
        x.className += " pbl__nav-menu__mobile";
    } else {
        x.className = "pbl__nav-menu";
    }
    var y = document.getElementById('firstItem');
    if (y.className === "pbl__nav-menu_item pbl__nav-menu_item-first") {
        y.className += " pbl__nav-menu_item-first-active";
    }
    else {
        y.className = "pbl__nav-menu_item pbl__nav-menu_item-first";
    }
}