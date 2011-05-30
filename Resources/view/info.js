
// define the UI elements
function view_init(win) {
	
	win.backgroundColor = '#f1eddd';
	win.backgroundImage = '../images/background_window.png';
	win.barColor = '#004586';
	
	// bottom wave bar
	var view2 = Ti.UI.createView({
		backgroundImage: '../images/background_bottom.png',
		zIndex:11,
		width:'100%',
		height:9,
		bottom:0,
		left:0
	});
	win.add(view2);
	
	win.infoButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.INFO_LIGHT
	});
	win.rightNavButton = win.infoButton;
	
	win.webview = Ti.UI.createWebView({height:'100%',width:'100%'});
	win.add(win.webview);
}
