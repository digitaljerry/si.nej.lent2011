// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

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
    title:'Prizoriščae',
    backgroundColor:'#fff',
	url:'controller/stages.js',
	orientationModes: appOrientationModes
});

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// tabs
var tab1 = Titanium.UI.createTab({  
	icon:'KS_nav_views.png',
	title:'Program',
	window:win1
});

var tab2 = Titanium.UI.createTab({  
	icon:'KS_nav_views.png',
	title:'Prizorišča',
	window:win2
});