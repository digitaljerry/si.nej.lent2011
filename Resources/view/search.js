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
	
	//
	// CREATE TABLE VIEW
	//
	
	win.search = Titanium.UI.createSearchBar({
		backgroundColor:'#1D327B',
		showCancel:true,
		height:50,
		top:0
	});
	win.add(win.search);
	
	win.tableview = Titanium.UI.createTableView({
		top:43,
		backgroundColor:'transparent'
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		win.tableview.separatorColor = 'black';
	}
		
	win.add(win.tableview);
	win.search.focus();
}
