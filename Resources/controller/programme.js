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

function getStageTitle(uid) {
	for (var i = 0; i < Ti.App.stages.length; i++) {
		if ( Ti.App.stages[i].uid == uid )
			return Ti.App.stages[i].name;
	}
	return 'Ostala prizorišča';
}

function outputDate(date,nice) {
	year = date.getFullYear().toString();
	month = date.getMonth().toString();
	day = date.getDate().toString();
	
	if (month.length < 2)
		month = '0'+month;
	if (day.length == 1)
		day = '0'+day;
	
	if (nice == true)
		return day+'.'+month+'.'+year;
	else
		return year+month+day;
}

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
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true, header:getStageTitle(incomingData[i].location_id)});
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
	win.title = outputDate(date,true);
	showEventsForDay(outputDate(date));
});
win.nextNavButton.addEventListener('click', function()
{	
	date.setDate(date.getDate()+1);
	win.title = outputDate(date,true);
	win.tableview.data = null;
	win.tableview.index = null;
	showEventsForDay(outputDate(date));
});
