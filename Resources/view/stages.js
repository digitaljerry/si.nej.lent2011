// define the UI elements
function view_init(win) {
	
	win.title = 'Prizorišča';
	win.backgroundColor = '#fff';
	
	win.label1 = Titanium.UI.createLabel({
		color:'#999',
		text:'I am Window 2',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	win.add(win.label1);
	
	//
	// CREATE MAP VIEW
	//
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: maribor,
		animate:true,
		regionFit:true,
		userLocation:true,
		annotations:appLocations
	});
	
	win.add(mapview);
	
	// CREATE TABLE VIEW
	// searchbar
	var search = Titanium.UI.createSearchBar();
	// create table view
	var tableview = Titanium.UI.createTableView({
	//	data:data,
		search:search
	});
	tableview.hide();
	win.add(tableview);
	
	//
	// NAVBAR
	// 
	var buttonSwitch = Titanium.UI.createButton({
		title:'Seznam'
	});
	
	win.setRightNavButton(buttonSwitch);
	
	//
	// EVENT (shouldn't this go to the controller?)
	//
	buttonSwitch.addEventListener('click', function(e)
	{
		if ( buttonSwitch.title == 'Seznam' ) {
			buttonSwitch.title = 'Karta';
			tableview.show();
			mapview.hide();
		} else {
			buttonSwitch.title = 'Seznam';
			mapview.show();
			tableview.hide();
		}
	});
	// map view click event listener
	mapview.addEventListener('click',function(evt)
	{
		if (evt.clicksource == 'rightButton') {
			alert('U clicked stage: ' + evt.title);
		}
	});
}

var win = Titanium.UI.currentWindow;
