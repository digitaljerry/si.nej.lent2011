Titanium.include ('../model/programme.js');
 
// Load UI elements

Titanium.include ('../view/programme.js');
var win = Titanium.UI.currentWindow;
view_init(win);
 
// Define events
 
/*win1.b1.addEventListener('click', function () {
    var w = Titanium.UI.createWindow({
        fullscreen:false,
        url:'path/to/next_controller.js'});
    w.open();
});*/