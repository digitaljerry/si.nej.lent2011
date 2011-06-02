// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#f1eddd');

// default possible orientations
var appOrientationModes = [
    Titanium.UI.PORTRAIT,
    Titanium.UI.UPSIDE_PORTRAIT,
    Titanium.UI.LANDSCAPE_LEFT,
    Titanium.UI.LANDSCAPE_RIGHT
];

// root windows
var win1 = Titanium.UI.createWindow({  
    title:'Program',
    backgroundColor:'#fff',
	url:'controller/programme.js',
	orientationModes: appOrientationModes
});

var win2 = Titanium.UI.createWindow({  
    title:'Prizorišča',
    backgroundColor:'#fff',
	url:'controller/stages.js',
	orientationModes: appOrientationModes
});

var win3 = Titanium.UI.createWindow({  
    title:'Novice',
    backgroundColor:'#fff',
	url:'news.js',
	orientationModes: appOrientationModes
});

var win4 = Titanium.UI.createWindow({  
    title:'Priljubljene',
    backgroundColor:'#fff',
	url:'controller/favorites.js',
	orientationModes: appOrientationModes
});

var win5 = Titanium.UI.createWindow({  
    title:'Info',
    backgroundColor:'#fff',
	url:'controller/info.js',
	orientationModes: appOrientationModes
});

var win6 = Titanium.UI.createWindow({  
    title:'Iskanje',
    backgroundColor:'#fff',
	url:'controller/search.js',
	orientationModes: appOrientationModes
});

var win7 = Titanium.UI.createWindow({  
    title:'Nastavitve',
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
	title:'Program',
	window:win1
});

var tab2 = Titanium.UI.createTab({  
	icon:'tab_stages.png',
	title:'Prizorišča',
	window:win2
});

var tab3 = Titanium.UI.createTab({  
	icon:'tab_news.png',
	title:'Novice',
	window:win3
});

var tab4 = Titanium.UI.createTab({  
	icon:'tab_favorites.png',
	title:'Priljubljene',
	window:win4
});

var tab5 = Titanium.UI.createTab({  
	icon:'tab_info.png',
	title:'Info',
	window:win5
});

var tab6 = Titanium.UI.createTab({  
	icon:'tab_search.png',
	title:'Iskanje',
	window:win6
});

var tab7 = Titanium.UI.createTab({  
	icon:'tab_settings.png',
	title:'Nastavitve',
	window:win7
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
tabGroup.addTab(tab7);

// open tab group
tabGroup.open({
	transition:Titanium.UI.iPhone.AnimationStyle.CURL_UP
});
