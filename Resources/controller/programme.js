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
	var geturl = 'http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=start_date,start_time&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id&&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20hidden=0%20AND%20deleted=0%20AND%20start_date='+showDate;
	
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
		
		updateNavButtons();
		
		var prev_location_id = -1;
		for (var i = 0; i < incomingData.length; i++) {
			
			var row = Ti.UI.createTableViewRow();
			row.selectedBackgroundColor = '#fff';
			row.height = 50;
			row.className = 'datarow';
			row.clickName = 'row';
			
			var title = Ti.UI.createLabel({
				color:'#576996',
				font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
				left:10,
				top:2,
				height:30,
				width:'70%',
				event_uid:incomingData[i].uid,
				text:incomingData[i].title,
				title:incomingData[i].title
			});
			row.filter = title.text;
			row.add(title);
			
			var stage = Ti.App.Stages.getStageTitle(incomingData[i].location_id);
			if ( stage == -1 )
				stage = incomingData[i].location;
			var desc = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
				left:10,
				top:25,
				height:25,
				width:'70%',
				event_uid:incomingData[i].uid,
				title:incomingData[i].title,
				text:stage+', '+ Ti.App.Categories.getCategoryTitle(incomingData[i].category_id)
			});
			row.add(desc);
			
			var begin_time = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:18,fontWeight:'bold', fontFamily:'Arial'},
				right:10,
				top:2,
				height:25,
				width:50,
				event_uid:incomingData[i].uid,
				title:incomingData[i].title,
				text:Ti.App.DateLent.secondsToHm(incomingData[i].start_time)
			});
			row.add(begin_time);
			var begin_date = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
				right:10,
				top:25,
				height:25,
				width:43,
				event_uid:incomingData[i].uid,
				title:incomingData[i].title,
				text:Ti.App.DateLent.outputShortDate(Ti.App.DateLent.date2object(incomingData[i].start_date))
			});
			row.add(begin_date);
			
			data.push(row);
		};
		
		win.tableview.data = data;
	};
	xhr.send();
}

function getPrevDay(oldDate) {
	return new Date(oldDate.getTime() - (1000 * 60 * 60 * 24));
}

function getNextDay(oldDate) {
	return new Date(oldDate.getTime() + (1000 * 60 * 60 * 24));
}

function updateNavButtons() {
	
	var prevDate = getPrevDay(datum);
	var nextDate = getNextDay(datum);
	
	if ( prevDate < startDate ) {
		win.leftNavButton = null;
	} else {
		win.leftNavButton = win.prevNavButton;
		win.prevNavButton.title = Ti.App.days[prevDate.getDay()];
	}
		
	if ( nextDate > endDate ) {
		win.rightNavButton = null;
	} else {
		win.rightNavButton = win.nextNavButton;
		win.nextNavButton.title = Ti.App.days[nextDate.getDay()];
	}
}

//
// Define events
//

// create table view event listener
win.tableview.addEventListener('click', function(e)
{
	var winDetail = Titanium.UI.createWindow({
		url:'event.js',
		title:e.source.title
	});
	
	// passing the event uid
	winDetail.event_uid = e.source.event_uid;
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});

// events for buttons
win.prevNavButton.addEventListener('click', function()
{
	datum = getPrevDay(datum);
	win.title = Ti.App.DateLent.outputNiceDate(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
});
win.nextNavButton.addEventListener('click', function()
{	
	datum = getNextDay(datum);
	win.title = Ti.App.DateLent.outputNiceDate(datum);
	win.tableview.data = null;
	win.tableview.index = null;
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
});

