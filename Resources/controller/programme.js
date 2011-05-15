Titanium.include ('../model/programme.js');

//
// Load UI elements
//

Titanium.include ('../view/programme.js');
var win = Titanium.UI.currentWindow;
view_init(win);

//
// Define functions
//

function showEventsForDay(showDate) {
	
	// reset
	win.tableview.data = null;
	data = new Array();
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=location_id&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id&&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20hidden=0%20AND%20deleted=0%20AND%20start_date='+showDate;
	
	xhr.setTimeout(20000);
	xhr.open('GET', geturl, false);
	xhr.onerror = function(e)
	{
		Titanium.UI.createAlertDialog({title:'Error', message:e.error}).show();
		Titanium.API.info('IN ERROR' + e.error);
	};
	
	xhr.onload = function(){
		incomingData = null;
		incomingData = JSON.parse(this.responseText);
		
		var prev_location_id = -1;
		for (var i = 0; i < incomingData.length; i++) {
			if ( incomingData[i].location_id != prev_location_id ) {
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true, header:Ti.App.Stages.getStageTitle(incomingData[i].location_id)});
				prev_location_id = incomingData[i].location_id;
			} else {
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true});
			}
		};
		
		win.tableview.data = data;
	};
	xhr.send();
}

//
// Define events
//

// create table view event listener
win.tableview.addEventListener('click', function(e)
{
	var winDetail = Titanium.UI.createWindow({
		url:'event.js',
		title:e.rowData.title
	});
	
	// passing the event uid
	winDetail.event_uid = e.rowData.uid;
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});

// events for buttons
win.prevNavButton.addEventListener('click', function()
{
	date.setDate(date.getDate()-1);
	win.title = Ti.App.DateLent.outputDate(date,true);
	showEventsForDay(Ti.App.DateLent.outputDate(date));
});
win.nextNavButton.addEventListener('click', function()
{	
	date.setDate(date.getDate()+1);
	win.title = Ti.App.DateLent.outputDate(date,true);
	win.tableview.data = null;
	win.tableview.index = null;
	showEventsForDay(Ti.App.DateLent.outputDate(date));
});
