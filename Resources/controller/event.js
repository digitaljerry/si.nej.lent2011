Titanium.include ('../model/event.js');

//
// Load UI elements
//
Titanium.include ('../view/event.js');
win = Titanium.UI.currentWindow;

view_init(win);

// shows the event with the given uid from previous view
if ( event_uid != 0 ) {
	if ( win.cached == true ) {
		
		var favoritesArray = Ti.App.Properties.getList('favoritesArray');
		for (var i = 0; i < favoritesArray.length; i++) {
			if (favoritesArray[i].uid ==  event_uid) {
				showEvent([favoritesArray[i]]);
				break;
			}
		}
		
	} else {
		getEventData(event_uid);
	}
}

//
// Define functions
//

function getEventData(uid) {
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
		
		showEvent(incomingData);
	};
	xhr.send();
}

function showEvent(incomingData) {
	
	for (var i = 0; i < incomingData.length; i++) {
		data = incomingData[i];		
		data.images = getImagesArray(incomingData[i].image);
	}
	
	/* set data in view - start */
	win.label_title.text = data.title;
	win.label_date.text = Ti.App.DateLent.outputNiceDate(Ti.App.DateLent.date2object(data.start_date));
	win.label_time.text = Ti.App.DateLent.secondsToHm(data.start_time);
	stage = Ti.App.Stages.getStageTitle(data.location_id);
	if ( stage == -1 )
		stage = data.location;
	win.label_stage.text = stage;
	win.label_category.text = Ti.App.Categories.getCategoryTitle(data.category_id);
	
	// ADDING ANNOTATION
	if ( data.location_id != 0 ) {
		stage_location = Ti.App.Stages.getStageLocation(data.location_id);
		
		plotPoint = Titanium.Map.createAnnotation({
	    	latitude: stage_location[0].latitude,
	        longitude: stage_location[0].longitude,
	        title: Ti.App.Stages.getStageTitle(data.location_id),
	        animate:true,
	        pincolor: Titanium.Map.ANNOTATION_GREEN,
	        rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
		});
		
		win.mapview.addAnnotation(plotPoint);
		win.mapview.selectAnnotation(Ti.App.Stages.getStageTitle(data.location_id),true);
	}
	
	win.webView.html = '<html><body>' + data.description + '</body></html>';
	/* set data in view - end */
	
	// image
	win.image.url = data.images[0].image;
	// add images to coverview
	win.coverView.images = data.images;
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
		win.scrollview.show();
	}
	else
	{
		win.mapview.show();
		win.scrollview.hide();
	}
});

//
// orientation change listener
//
Ti.Gesture.addEventListener('orientationchange',function(e)
{
	if (e.source.isLandscape() == true) {
		win.coverView.show();
		win.mapview.hide();
		win.scrollview.hide();
	} else if (e.source.isPortrait() == true) {
		
		if ( win.tb1.index == 0)
			win.scrollview.show();
		else
			win.mapview.show();
		
		win.coverView.hide();
	}
});

win.image.addEventListener('click', function(e) {
	Ti.App.Message.showMessage('Obrni telefon !');
});

win.mapview.addEventListener('click', function(evt) {
	// only if right button was clicked
	if ( evt.clicksource == 'rightButton' ) {
	
		a.buttonNames = ['Odpri','Prekliči'];
		a.cancel = 1;
		a.show();
		
	}
});

if ( win.disableFav != true ) {
	win.rightNavButton.addEventListener('click', function(evt) {
		// only if right button was clicked
		a_add.buttonNames = ['Dodaj','Prekliči'];
		a_add.cancel = 1;
		a_add.show();
	});
}

a.addEventListener('click', function(e) {
	if ( e.index == 0 ) {
		Ti.Platform.openURL('http://maps.google.com/maps?daddr=Current Location&daddr='+plotPoint.latitude+','+plotPoint.longitude)+'&dirflg=w';
	}
});


a_add.addEventListener('click', function(e) {
	
	if ( e.index == 0 ) {
		var exists = false;
		var favoritesArray = Ti.App.Properties.getList('favoritesArray');
		
		if ( favoritesArray == null )
			favoritesArray = Array();		
		
		for (var i = 0; i < favoritesArray.length; i++) {
			if (favoritesArray[i].uid == event_uid) {
				Titanium.UI.createAlertDialog({message:'Predstava že obstaja med priljubljenimi!'}).show();
				
				exists = true;
			}
		}
		
		// if the event is not in the array
		if ( exists == false ) {
			favoritesArray.push(data);
			Ti.App.Properties.setList('favoritesArray',favoritesArray);
			Ti.App.Message.showMessage('Dodano med priljubljene.');
			
			// fireing refreshing of favorites
			Ti.App.fireEvent('refreshFavorites');
		}
	}
});
