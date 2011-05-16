
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
		searchHidden:true,
		filterAttribute:'filter',
	});
	
	// create buttons
	win.prevNavButton = Titanium.UI.createButton({
		title:'',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	win.nextNavButton = Titanium.UI.createButton({
		title:'',
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
	});
	
	// default date to show on start
	win.title = Ti.App.DateLent.outputNiceDate(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
	
	win.add(win.tableview);
}
