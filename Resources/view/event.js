var data = [
{"uid":"1","title":"BOWLING","start_date":"20100625","end_date":"20100625","start_time":"46800","end_time":"64800","category_id":"1","location":"KOLOSEJ","location_id":"0"}
];

function showEvent(uid) {
	
	// reset
	/*tableview.data = null;
	data = new Array();*/
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=location_id&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id,description,image&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20hidden=0%20AND%20deleted=0%20AND%20uid='+uid;
	
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
		
		for (var i = 0; i < incomingData.length; i++) {
			data = incomingData[i];
		}
		
		view_init(win);
	};
	xhr.send();
}

showEvent(event_uid);

// define the UI elements
function view_init(win) {
	
	win.backgroundColor = '#fff';
	
	var upperView = Ti.UI.createView({
		top:20,
		height:'auto',
		width:'100%',
		layout:'vertical'
	});
	win.add(upperView);
	
	var label_title = Titanium.UI.createLabel({
		text:data.title,
		height:20,
		left:120,
		width:'100%',
		color:'#000000',
		font:{fontSize:15, fontStyle:'bold'},
		textAlign:'left'
	});
	upperView.add(label_title);
	
	var label_date = Titanium.UI.createLabel({
		text:data.start_date + ' ' + data.start_time,
		height:20,
		left:120,
		width:'auto',
		color:'#000000',
		font:{fontSize:12},
		textAlign:'left'
	});
	upperView.add(label_date);
	
	var label_stage = Titanium.UI.createLabel({
		text:getStageTitle(data.location_id),
		height:20,
		left:120,
		width:'auto',
		color:'#000000',
		font:{fontSize:12},
		textAlign:'left'
	});
	upperView.add(label_stage);
	
	// tabbed bar
	var tb1 = Titanium.UI.createTabbedBar({
		labels:['Opis', 'Karta'],
		top:'46%',
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:25,
		width:200,
		zIndex:2,
		index:0
	});
	
	win.add(tb1);
	
	// IMAGE
	if (Titanium.Platform.name == 'android') 
	{
		// iphone moved to a single image property - android needs to do the same
		var image = Ti.UI.createImageView({
			url:'http://lent10.slovenija.net/typo3temp/pics/0c62b85bfc.jpg',
			defaultImage:'../images/cloud.png',
			top:0,
			left:10,
			height:100,
			width:100
		});
	
	}
	else
	{
		var image = Ti.UI.createImageView({
			image:'http://lent10.slovenija.net/typo3temp/pics/0c62b85bfc.jpg',
			defaultImage:'../images/cloud.png',
			top:0,
			left:10,
			height:100,
			width:100
		});
		
	}
	win.add(image);
	
	
	//
	// CREATE MAP VIEW
	//
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: Ti.App.location_maribor,
		animate:true,
		regionFit:true,
		userLocation:true,
		bottom:0,
		height:'60%',
		zIndex:1
	});
	mapview.hide();
	
	win.add(mapview);
	
	// ADDING ANNOTATION
	if ( data.location_id != 0 ) {
		var stage_location = getStageLocation(data.location_id);
		
		plotPoint = Titanium.Map.createAnnotation({
	    	latitude: stage_location[0].latitude,
	        longitude: stage_location[0].longitude,
	        title: getStageTitle(data.location_id),
	        pincolor: Titanium.Map.ANNOTATION_GREEN
		});
		
		mapview.addAnnotation(plotPoint);
	}
	
	// SCROLL VIEW
	var scrollView = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		bottom:0,
		height:'60%',
		zIndex:2,
		showVerticalScrollIndicator:true
	});
	
	//
	// CREATE WEBVIEW
	//
	var html = '<html><body>';
	html += data.description;
	html += '</body></html>';
	
	var webView = Ti.UI.createWebView({
		top:40,
		height:'100%',
		width:'100%',
		html:html
	});
	scrollView.add(webView);
	
	win.add(scrollView);
	
	// EVENTS
	tb1.addEventListener('click', function(e)
	{
		if (e.index == 0)
		{
			mapview.hide();
			scrollView.show();
		}
		else
		{
			mapview.show();
			scrollView.hide();
		}
	});

}

var win = Titanium.UI.currentWindow;