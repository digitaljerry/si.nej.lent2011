
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
	
	// adding rows
	refreshTable();
	
	// create buttons
	win.edit = Titanium.UI.createButton({
		title:'Uredi'
	});
	
	win.cancel = Titanium.UI.createButton({
		title:'Konec',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE
	});
	
	win.setRightNavButton(win.edit);
	
	win.add(win.tableview);
}
