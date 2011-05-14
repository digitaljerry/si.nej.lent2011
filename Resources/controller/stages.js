Titanium.include ('../model/stages.js');

//
// Load UI elements
//

Titanium.include ('../view/stages.js');
var win = Titanium.UI.currentWindow;
view_init(win);

//
// Define events
//

// map/table switching
win.buttonSwitch.addEventListener('click', function(e)
{
	if ( win.buttonSwitch.title == 'Seznam' ) {
		win.buttonSwitch.title = 'Karta';
		win.tableview.show();
		win.mapview.hide();
	} else {
		win.buttonSwitch.title = 'Seznam';
		win.mapview.show();
		win.tableview.hide();
	}
});

// detail view of stage from map click
win.mapview.addEventListener('click',function(evt)
{
	// only if right button was clicked
	if ( evt.clicksource == 'rightButton' ) {
		var winDetail = Titanium.UI.createWindow({
			url:'stages_detail.js',
			title:evt.title,
			location_uid:evt.annotation.location_uid
		});
		
		Titanium.UI.currentTab.open(winDetail,{animated:true});
	}
});

// detail view of stage from table click
win.tableview.addEventListener('click', function(e)
{
	var winDetail = Titanium.UI.createWindow({
		url:'stages_detail.js',
		title:e.rowData.title,
		location_uid:e.rowData.uid
	});
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});