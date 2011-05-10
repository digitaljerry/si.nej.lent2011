function showEventsForStage(location_uid) {
	
	// reset
	tableview.data = null;
	data = new Array();
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=start_date&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id&&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20hidden=0%20AND%20deleted=0%20AND%20location_id='+location_uid;
	
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
		
		var prev_start_date = 'long time ago';
		for (var i = 0; i < incomingData.length; i++){
			if ( incomingData[i].start_date != prev_start_date ) {
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true, header:incomingData[i].start_date});
				prev_start_date = incomingData[i].start_date;
			} else {
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true});
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
	search.hide();
	// create table view
	tableview = Titanium.UI.createTableView({
	//	data:data,
		search:search,
		searchHidden:true
	});
		
	var data = new Array();
	/*for (var i = 0; i < stages.length; i++){
		data.push({title:stages[i].name, hasChild:true});
	}
	tableview.data = data;*/
	
	// default date to show on start
	showEventsForStage(location_uid);
	
	win.add(tableview);
	
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		var winDetail = Titanium.UI.createWindow({
			url:'stages_detail.js',
			title:e.rowData.title
		});
		
		// passing the event uid
		winDetail.event_uid = e.rowData.uid;
		
		Titanium.UI.currentTab.open(winDetail,{animated:true});
	});
}

var win = Titanium.UI.currentWindow;
