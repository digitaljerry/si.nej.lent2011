Titanium.include ('../model/search.js');

//
// Load UI elements
//
Titanium.include ('../view/search.js');
var win = Titanium.UI.currentWindow;
view_init(win);

//
// Define functions
//

// shows events for certain stage in the tableview of current win
function searchEvents(query) {
	
	// reset
	win.tableview.data = null;
	data = new Array();
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=start_date&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id&&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20title%20LIKE%20SSS%25'+query+'%25SSS&tx_mnmysql2json[limit]=50';
	
	xhr.setTimeout(20000);
	xhr.open('GET', geturl, true);
	xhr.onerror = function(e)
	{
		Titanium.UI.createAlertDialog({title:'Error', message:e.error}).show();
		Titanium.API.info('IN ERROR' + e.error);
	};
	
	xhr.onload = function(){
		incomingData = null;
		incomingData = JSON.parse(this.responseText);
		
		var prev_start_date = 'a long time ago';
		for (var i = 0; i < incomingData.length; i++){
			
			var row = Ti.UI.createTableViewRow();
			row.selectedBackgroundColor = '#e9ddc2';
			row.height = 50;
			row.className = 'datarow';
			row.clickName = 'row';
			row.event_uid = incomingData[i].uid;
			row.row_title = incomingData[i].title;
			
			var title = Ti.UI.createLabel({
				color:'#576996',
				font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
				left:10,
				top:2,
				height:30,
				width:'70%',
				text:incomingData[i].title
			});
			row.filter = title.text;
			row.add(title);
			
			var stage = incomingData[i].location;
			
			var desc = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:14,fontWeight:'normal', fontFamily:'Arial'},
				left:10,
				top:25,
				height:25,
				width:'70%',
				text:stage
			});
			
			if ( Ti.App.Categories.getCategoryTitle(incomingData[i].category_id) != -1 ) {
				if ( stage != '' )
					desc.text = stage + ', ' + Ti.App.Categories.getCategoryTitle(incomingData[i].category_id);
				else
					desc.text = Ti.App.Categories.getCategoryTitle(incomingData[i].category_id);
			}
			
			row.add(desc);
			
			var begin_time = Ti.UI.createLabel({
				color:'#222',
				font:{fontSize:19,fontWeight:'bold', fontFamily:'Arial'},
				right:10,
				top:11,
				height:30,
				width:50,
				text:Ti.App.DateLent.secondsToHm(incomingData[i].start_time)
			});
			row.add(begin_time);
			
			if ( incomingData[i].start_date != prev_start_date ) {
				row.header = Ti.App.DateLent.outputNiceDate(Ti.App.DateLent.date2object(incomingData[i].start_date));
				prev_start_date = incomingData[i].start_date;
			}
			
			row.hasChild = true;
			
			data.push(row);
		};
	
		win.tableview.data = data;
	};
	xhr.send();
}


//
// Define events
//

// opening the event detail view
win.tableview.addEventListener('click', function(e)
{
	if (e.rowData.event_uid == null)
		return;
	
	var winDetail = Titanium.UI.createWindow({
		url:'event.js'
	});
	
	// passing the event uid
	winDetail.event_uid = e.rowData.event_uid;
	
	Titanium.UI.currentTab.open(winDetail,{animated:true});
});

win.search.addEventListener('return', function (e)
{
	if(e.value.length < 3) {
		alert('Vpiši vsaj 3 znake.');
	} else {
		searchEvents(e.value);
		win.search.blur();
	}
});

win.search.addEventListener('cancel', function(e)
{
	win.search.blur();
});
