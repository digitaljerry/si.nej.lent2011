Titanium.include ('model/main.js');
Titanium.include ('view/main.js');
 
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
