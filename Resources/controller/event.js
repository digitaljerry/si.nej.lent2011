Titanium.include ('../lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include ('../model/event.js');

//
// Load UI elements
//
Titanium.include ('../view/event.js');
win = Titanium.UI.currentWindow;

view_init(win);

//
// Define functions
//

function getEventData(uid) {
	
	if (Titanium.Network.online == false) {
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem');
		return;
	}
	
	win.services.activityIndicator.start();
	
	xhr = Titanium.Network.createHTTPClient();
	var geturl = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?eID=ag_lent_webservice&ag_lent_webservice[lang]='+lang['name']+'&ag_lent_webservice[action]=getEvent&ag_lent_webservice[id]='+uid;
	
	xhr.setTimeout(20000);
	xhr.open('GET', geturl, true);
	xhr.onerror = function(e)
	{
		// fire connectivty problem event
		Ti.App.fireEvent('connectivityProblem', {error:e});
	};
	
	xhr.onload = function(){
		incomingData = null;
		incomingData = JSON.parse(this.responseText);
		
		showEvent(incomingData);
		
		win.services.activityIndicator.stop();
	};
	xhr.send();
}

function showEvent(incomingData) {
	
	for (var i = 0; i < incomingData.length; i++) {
		data = incomingData[i];
		
		if (Titanium.App.Properties.getString('showImages') == '1') {
			data.images = getImagesArray(incomingData[i].image);
		}
	}
	
	/* set data in view - start */
	win.label_title.text = data.title;
	win.label_date.text = win.services.dateLent.outputNiceDate(win.services.dateLent.date2object(data.start_date));
	win.label_time.text = win.services.dateLent.secondsToHm(data.start_time);
	stage = win.services.stages.getStageTitle(data.location_id);
	if ( stage == -1 )
		stage = data.location;
	win.label_stage.text = stage;
	
	win.label_category.text = win.services.categories.getCategoryTitle(data.category_id);
	if ( win.label_category.text == -1 )
		win.label_category.text = '';
	
	// data details view
	data.details = Array();
	
	// descriptions
	if ( data.description != '' ) {
		win.webView.html = '<html><body>' + data.description + '</body></html>';
		
		if (Titanium.Platform.name == 'iPhone OS') {
			win.tb1.labels = [lang['programme_description']];
		} else {
			// TODO
			// dodaj description v spodnji menu
		}
		
		// add show id to array
		data.details.push('1');	
	}
	
	// ADDING ANNOTATION
	if (Titanium.Platform.name == 'iPhone OS') {
		if ( data.location_id != 0 ) {
			stage_location = win.services.stages.getStageLocation(data.location_id);
			
			if ( stage_location != -1 && stage_location[0].longitude != '0') {
				plotPoint = Titanium.Map.createAnnotation({
			    	latitude: stage_location[0].latitude,
			        longitude: stage_location[0].longitude,
			        title: win.services.stages.getStageTitle(data.location_id),
			        animate:true,
			        pincolor: Titanium.Map.ANNOTATION_GREEN,
			        rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
				});
				
				win.mapview.addAnnotation(plotPoint);
				win.mapview.selectAnnotation(win.services.stages.getStageTitle(data.location_id),true);
				win.mapview.setLocation(Ti.App.location_maribor);
				
				if (Titanium.Platform.name == 'iPhone OS') {
					if ( data.details.length == 0 )
						win.tb1.labels = [lang['programme_map']];
					else
						win.tb1.labels = [lang['programme_description'],lang['programme_map']];
				} else {
					// TODO
					// dodaj map v spodnji menu
				}
				
				// add show id to array
				data.details.push('2');
			}
		}
	
		win.tb1.show();
	}
	/* set data in view - end */
	
	// show first tab that is avaible
	showTab(data.details[0]);
	
	// image
	if (Titanium.App.Properties.getString('showImages') == '1') {
		win.image.url = data.images[0].image;
	}
}

// prepares images for coverflow view
function getImagesArray(data) {
	var images = data.split(',');
	for (var c=0;c<images.length;c++) {
		if (images[c] != '' ) {
			var name = image_path + images[c]; 
			images[c]= {image:name, width:225, height:225};
		}
	}
	return images;
}

function showTab(s) {
	if (s == 1)
	{
		if (Titanium.Platform.name == 'iPhone OS')
			win.mapview.hide();
		
		win.scrollview.show();
	}
	else if (s == 2)
	{
		if (Titanium.Platform.name == 'iPhone OS')
			win.mapview.show();
		
		win.scrollview.hide();
	}
}

//
// Define events
//

// event to switch between description and map tab
if (Titanium.Platform.name == 'iPhone OS') {
	win.tb1.addEventListener('click', function(e)
	{
		var show = data.details[e.index];
		showTab(show);
	});
	
	win.addEventListener('close', function(e)
	{
		xhr.abort();
	});
} else {
	// TODO
	// move event listener from view to controller
}

var scaledImage = false;
if (Titanium.Platform.name == 'iPhone OS') {
	win.image.addEventListener('click', function(e) {
		
		if (win.image.url == undefined)
			return;
		
		var t = Titanium.UI.create2DMatrix();
	
		if (!scaledImage)
		{
			t = t.scale(2.0);
			center1 = win.image.center;
			
			win.tb1.hide();
			win.scrollview.hide();
			win.mapview.hide();
			
			win.image.animate({transform:t,center:win.center,zIndex:1000,duration:500});
			scaledImage = true;
		}
		else
		{
			win.image.animate({transform:t,center:center1,zIndex:1,duration:500});
			setTimeout(function()
	        {
	        	//if (Titanium.UI.orientation == Titanium.UI.PORTRAIT || Titanium.UI.orientation == Titanium.UI.UPSIDE_PORTRAIT) {
	        		win.tb1.show();
	        		showTab(data.details[win.tb1.index]);
	        	//}
	        },400);
			scaledImage = false;
		}
	});
}

if (Titanium.Platform.name == 'iPhone OS') {
	win.mapview.addEventListener('click', function(evt) {
		// only if right button was clicked
		if ( evt.clicksource == 'rightButton' ) {
		
			a.buttonNames = [lang['open'],lang['cancel']];
			a.cancel = 1;
			a.show();
			
		}
	});
}

if ( win.disableFav != true ) {
	if (Titanium.Platform.name == 'iPhone OS') {
		win.nextNavButton.addEventListener('click', function(evt) {
			// only if right button was clicked
			a_add.buttonNames = [lang['add'],lang['cancel']];
			a_add.cancel = 1;
			a_add.show();
		});
	}
} else {
	if (Titanium.Platform.name != 'iPhone OS') {
		activity = Ti.Android.currentActivity;
		activity.onCreateOptionsMenu = function(e) {
		    var menu = e.menu;
		    var menuItem_refresh = menu.add({ title: lang['programme_favorites'] });
		    menuItem_refresh.addEventListener("click", function(e) {
		    	// only if right button was clicked
		    	a_remove.buttonNames = [lang['remove'],lang['cancel']];
				a_remove.cancel = 1;
				a_remove.show();
		    });
		};
	}
}

a.addEventListener('click', function(e) {
	if ( e.index == 0 ) {
		Ti.Platform.openURL('http://maps.google.com/maps?q='+plotPoint.latitude+','+plotPoint.longitude);
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
				Titanium.UI.createAlertDialog({message:lang['programme_favorites_already_exists'],buttonNames:[lang['close']]}).show();
				
				exists = true;
			}
		}
		
		// if the event is not in the array
		if ( exists == false ) {
			favoritesArray.push(data);
			Ti.App.Properties.setList('favoritesArray',favoritesArray);
			win.services.message.showMessage(lang['programme_favorites_added']);
			
			// fireing refreshing of favorites
			Ti.App.fireEvent('refreshFavorites');
		}
	}
});

a_remove.addEventListener('click', function(e) {
	
	if ( e.index == 0 ) {
		Ti.App.fireEvent('removeFavoriteEvent', {
			id:event_uid
		});
	}
});

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
