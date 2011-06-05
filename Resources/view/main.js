// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#f1eddd');

// default possible orientations
var appOrientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.UPSIDE_PORTRAIT
];

// root windows
var win1 = Titanium.UI.createWindow({  
    titleImage:'images/logo_lent_navbar.png',
    backgroundColor:'#fff',
	url:'controller/programme.js',
	orientationModes: appOrientationModes
});

var win2 = Titanium.UI.createWindow({  
    title:lang['win_stages'],
    backgroundColor:'#fff',
	url:'controller/stages.js',
	orientationModes: appOrientationModes
});

var win3 = Titanium.UI.createWindow({  
    title:lang['win_news'],
    backgroundColor:'#fff',
	url:'news.js',
	orientationModes: appOrientationModes
});

var win4 = Titanium.UI.createWindow({  
    title:lang['win_favorites'],
    backgroundColor:'#fff',
	url:'controller/favorites.js',
	orientationModes: appOrientationModes
});

var win5 = Titanium.UI.createWindow({  
    title:lang['win_info'],
    backgroundColor:'#fff',
	url:'controller/info.js',
	orientationModes: appOrientationModes
});

var win6 = Titanium.UI.createWindow({  
    title:lang['win_settings'],
    backgroundColor:'#fff',
	url:'controller/settings.js',
	orientationModes: appOrientationModes
});

// create tab group
var tabGroup = Titanium.UI.createTabGroup({
	barColor: '#004586',
	editButtonTitle: 'Uredi'
});

// tabs
var tab1 = Titanium.UI.createTab({  
	icon:'tab_programme.png',
	title:lang['win_programme'],
	window:win1
});

var tab2 = Titanium.UI.createTab({  
	icon:'tab_stages.png',
	title:lang['win_stages'],
	window:win2
});

var tab3 = Titanium.UI.createTab({  
	icon:'tab_news.png',
	title:lang['win_news'],
	window:win3
});

var tab4 = Titanium.UI.createTab({  
	icon:'tab_favorites.png',
	title:lang['win_favorites'],
	window:win4
});

var tab5 = Titanium.UI.createTab({  
	icon:'tab_info.png',
	title:lang['win_info'],
	window:win5
});

var tab6 = Titanium.UI.createTab({  
	icon:'tab_settings.png',
	title:lang['win_settings'],
	window:win6
});

//
//  add tabs
//
tabGroup.addTab(tab1);
tabGroup.addTab(tab2);
tabGroup.addTab(tab3);
tabGroup.addTab(tab4);
tabGroup.addTab(tab5);
tabGroup.addTab(tab6);

// open tab group
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
});
