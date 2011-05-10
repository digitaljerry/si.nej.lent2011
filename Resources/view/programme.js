var tableview;

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
	tableview.data = null;
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
				data.push({title:incomingData[i].title, hasChild:true, header:getStageTitle(incomingData[i].location_id)});
				prev_location_id = incomingData[i].location_id;
			} else {
				data.push({title:incomingData[i].title, hasChild:true});
			}
		};
	
		tableview.data = data;
	};
	xhr.send();
}

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
	// searchbar
	var search = Titanium.UI.createSearchBar();
	// create table view
	tableview = Titanium.UI.createTableView({
		search:search,
		searchHidden:true
	});
	
	// create buttons
	prevNavButton = Titanium.UI.createButton({
		//style:Titanium.UI.SystemButtonStyle.BORDERED,
		title:'Včeraj'
	});
	nextNavButton = Titanium.UI.createButton({
		//style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
		title:'Jutri'
	});
	win.leftNavButton = prevNavButton;
	win.rightNavButton = nextNavButton;
		
	var data = new Array();
	/*for (var i = 0; i < events.length; i++){
		data.push({title:events[i].title, hasChild:true});
	}*
	tableview.data = data;*/
	
	// default date to show on start
	win.title = outputDate(date,true);
	showEventsForDay(outputDate(date));
	
	win.add(tableview);
	
	// EVENTS
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		var winDetail = Titanium.UI.createWindow({
			url:'programme_detail.js',
			title:e.rowData.title
		});
		Titanium.UI.currentTab.open(winDetail,{animated:true});
	});
	// events for buttons
	prevNavButton.addEventListener('click', function()
	{
		date.setDate(date.getDate()-1);
		win.title = outputDate(date,true);
		showEventsForDay(outputDate(date));
	});
	nextNavButton.addEventListener('click', function()
	{	
		date.setDate(date.getDate()+1);
		win.title = outputDate(date,true);
		tableview.data = null;
		tableview.index = null;
		showEventsForDay(outputDate(date));
	});
}

var win = Titanium.UI.currentWindow;