Titanium.include ('../model/event.js');

//
// Load UI elements
//
Titanium.include ('../view/event.js');
win = Titanium.UI.currentWindow;
view_init(win);

// shows the event with the given uid from previous view
if ( event_uid != 0 ) {
	showEvent(event_uid);
}

//
// Define functions
//

function showEvent(uid) {
	
	var xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_event&tx_mnmysql2json[orderBy]=location_id&tx_mnmysql2json[fields]=uid,title,start_date,end_date,start_time,end_time,category_id,location,location_id,description,image&tx_mnmysql2json[where]=sys_language_uid=0%20AND%20hidden=0%20AND%20deleted=0%20AND%20uid='+uid;
	
	xhr.setTimeout(20000);
	xhr.open('GET', geturl, false);
	xhr.onerror = function(e)
	{
		Titanium.UI.createAlertDialog({title:'Error', message:e.error}).show();
		Titanium.API.info('IN ERROR' + e.error);
		alert('error');
	};
	
	xhr.onload = function(){
		incomingData = null;
		incomingData = JSON.parse(this.responseText);
		
		for (var i = 0; i < incomingData.length; i++) {
			data = incomingData[i];
			
			data.images = getImagesArray(incomingData[i].image);
			win.coverView.images = data.images;
		}
		
		/* set data in view - start */
		win.label_title.text = data.title;
		win.label_date.text = Ti.App.DateLent.outputNiceDate(Ti.App.DateLent.date2object(data.start_date));
		win.label_time.text = Ti.App.DateLent.secondsToHm(data.start_time);
		var stage = Ti.App.Stages.getStageTitle(data.location_id);
		if ( stage == -1 )
			stage = data.location;
		win.label_stage.text = stage;
		win.label_category.text = Ti.App.Categories.getCategoryTitle(data.category_id);
		
		// image
		win.image.url = data.images[0].image;
		
		// ADDING ANNOTATION
		if ( data.location_id != 0 ) {
			var stage_location = Ti.App.Stages.getStageLocation(data.location_id);
			
			plotPoint = Titanium.Map.createAnnotation({
		    	latitude: stage_location[0].latitude,
		        longitude: stage_location[0].longitude,
		        title: Ti.App.Stages.getStageTitle(data.location_id),
		        pincolor: Titanium.Map.ANNOTATION_GREEN
			});
			
			win.mapview.addAnnotation(plotPoint);
		}
		
		win.webView.html = '<html><body>' + data.description + '</body></html>';
		/* set data in view - end */
	};
	xhr.send();
}

// prepares images for coverflow view
function getImagesArray(data) {
	var images = data.split(',');
	for (var c=0;c<images.length;c++) {
		var name = image_path + images[c]; 
		images[c]= {image:name, width:225, height:225};
	}
	return images;
}

//
// Define events
//

// event to switch between description and map tab
win.tb1.addEventListener('click', function(e)
{
	if (e.index == 0)
	{
		win.mapview.hide();
		win.scrollView.show();
	}
	else
	{
		win.mapview.show();
		win.scrollView.hide();
	}
});

//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{
	if (e.source.isLandscape() == true) {
		win.coverView.show();
	} else if (e.source.isPortrait() == true) {
		win.coverView.hide();
	}
});

win.image.addEventListener('click', function(e) {
	Ti.App.Message.showMessage('Obrni telefon !');
});
