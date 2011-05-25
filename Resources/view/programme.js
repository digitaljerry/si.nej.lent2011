
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
	
	// CREATE TABLE VIEW
	win.tableview = Titanium.UI.createTableView({
		search:Titanium.UI.createSearchBar({opacity:0.8}),
		searchHidden:true,
		filterAttribute:'filter',
		backgroundColor:'transparent'
	});
	
	// create buttons
	win.prevNavButton = Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	win.nextNavButton = Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	// default date to show on start
	win.title = getTitle(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
	
	win.add(win.tableview);
}
