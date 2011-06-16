
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
	
	data = new Array();
	
	// CREATE TABLE VIEW
	win.tableview = Titanium.UI.createTableView({
		editable:true,
		backgroundColor:'transparent'
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		win.tableview.separatorColor = 'black';
	}
	
	// adding rows
	refreshTable();
	
	// create buttons
	win.edit = Titanium.UI.createButton({
		title:lang['edit']
	});
	
	win.cancel = Titanium.UI.createButton({
		title:lang['done'],
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	if (Titanium.Platform.name == 'iPhone OS') {
		win.setRightNavButton(win.edit);
	} else {
		// TODO
	}
	
	win.add(win.tableview);
}
