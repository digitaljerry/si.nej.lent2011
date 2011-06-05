Titanium.include ('lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include ('model/main.js');
Titanium.include ('view/main.js');

// set string for current language in app.js context
Ti.App.fireEvent('changeLoadingLabel',{loading:lang['loading']});
 
//
// TAB EVENTS
//

// tab group close event
tabGroup.addEventListener('close', function(e)
{
	if (Ti.Platform.osname == "iphone") {
//On iOS, when we're closing the tab group, this is a result
//of the tab group example of 'Close/Animate Tab Group' and
//we want to reopen the tab group so the user can continue with
//using Kitchen Sink. HOWEVER, on Android, this is also triggered
//when the app is being closed via back button, where reopening
//the tab group is not desired. This is purely a quirk of the tests.
		tabGroup.open();
	}
});

//
// GLOBAL EVENT LISTENERS
//

Titanium.App.addEventListener('connectivityProblem', function(eventData) {
	
	// stop the connectivity indicator
	Ti.App.ActivityIndicator.stop();
	
	if (Titanium.Network.online == false) {
		Titanium.UI.createAlertDialog({title:lang['error'], message:lang['main_connection'], buttonNames:lang['close']}).show();
	} else {
		Titanium.UI.createAlertDialog({title:lang['error'], message:lang['main_data_error']}).show();
	}

});

Titanium.App.addEventListener('restartApp', function(eventData) {
	Titanium.include ('controller/main.js');
});
