Titanium.include ('../model/info.js');

//
// Load UI elements
//
Titanium.include ('../view/info.js');
win = Titanium.UI.currentWindow;

view_init(win);

//
// Define functions
//

function showInfo() {
	
	win.webview.url = 'http://lent10.slovenija.net/index.php?id=7&mobile=1';
	
}

showInfo();

//
// define event listeners
//

win.infoButton.addEventListener('click',function(e)
{
	var w = Ti.UI.createWindow({
		backgroundColor: '#f1eddd',
		backgroundImage: '../images/background_window.png'
	});
	var b = Ti.UI.createButton({
		title:'Close',
		width:100,
		height:30
	});
	b.addEventListener('click',function()
	{
		w.close();
	});
	w.add(b);
	w.open({
		modal:true,
		modalTransitionStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
		modalStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		navBarHidden:true}
	);
});
