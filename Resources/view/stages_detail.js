// define the UI elements
function view_init(win) {
	
	win.backgroundColor = '#fff';
	
	win.label1 = Titanium.UI.createLabel({
		color:'#999',
		text:'Nalagam...',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	win.add(win.label1);
	
	//
	// CREATE TABLE VIEW
	//
	
	win.tableview = Titanium.UI.createTableView({
		search:Titanium.UI.createSearchBar(),
		searchHidden:true
	});
		
	var data = new Array();
	// default date to show on start
	showEventsForStage(location_uid);
	
	win.add(win.tableview);
}
