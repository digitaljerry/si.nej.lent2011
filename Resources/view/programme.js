
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
	
	// CREATE TABLE VIEW
	
	win.tableview = Titanium.UI.createTableView({
		search:Titanium.UI.createSearchBar(),
		searchHidden:true
	});
	
	// create buttons
	win.prevNavButton = Titanium.UI.createButton({
		title:'Včeraj'
	});
	win.nextNavButton = Titanium.UI.createButton({
		title:'Jutri'
	});
	win.leftNavButton = win.prevNavButton;
	win.rightNavButton = win.nextNavButton;
	
	// default date to show on start
	win.title = outputDate(date,true);
	showEventsForDay(outputDate(date));
	
	win.add(win.tableview);
}
