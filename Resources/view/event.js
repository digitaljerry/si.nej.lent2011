var tableview;

function showEvent(uid) {
	
	// reset
	/*tableview.data = null;
	data = new Array();*/
	
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
		
		/*var prev_location_id = -1;
		for (var i = 0; i < incomingData.length; i++) {
			if ( incomingData[i].location_id != prev_location_id ) {
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true, header:getStageTitle(incomingData[i].location_id)});
				prev_location_id = incomingData[i].location_id;
			} else {
				data.push({title:incomingData[i].title, uid:incomingData[i].uid, hasChild:true});
			}
		};
	
		tableview.data = data;*/
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
	
	alert('111');
}

var win = Titanium.UI.currentWindow;