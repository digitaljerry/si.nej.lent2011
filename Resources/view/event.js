
// define the UI elements
function view_init(win) {
	
	win.backgroundColor = '#f1eddd';
	win.backgroundImage = '../images/background_window.png';
	win.barColor = '#004586';
	
	// bottom wave bar
	var view2 = Ti.UI.createView({
		backgroundImage: '../images/background_bottom.png',
		zIndex:11,
		width:'100%',
		height:9,
		bottom:0,
		left:0
	});
	win.add(view2);
	
	var upperView = Ti.UI.createView({
		top:10,
		left:10,
		height:'auto',
		width:'auto',
		layout:'vertical'
	});
	win.add(upperView);
	
	win.label_title = Titanium.UI.createLabel({
		height:30,
		left:0,
		width:'auto',
		color:'#576996',
		font:{fontSize:15,fontWeight:'bold', fontFamily:'Arial'},
		textAlign:'left'
	});
	upperView.add(win.label_title);
	
	win.label_date = Titanium.UI.createLabel({
		height:23,
		left:150,
		width:'auto',
		color:'#000000',
		font:{fontSize:17,fontWeight:'bold'},
		textAlign:'left'
	});
	upperView.add(win.label_date);
	
	win.label_time = Titanium.UI.createLabel({
		height:24,
		left:150,
		width:'auto',
		color:'#000000',
		font:{fontSize:17,fontWeight:'bold'},
		textAlign:'left'
	});
	upperView.add(win.label_time);
	
	win.label_stage = Titanium.UI.createLabel({
		height:40,
		left:150,
		width:'auto',
		color:'#000000',
		font:{fontSize:14},
		textAlign:'left'
	});
	upperView.add(win.label_stage);
	
	win.label_category = Titanium.UI.createLabel({
		height:15,
		left:150,
		width:'auto',
		color:'#000000',
		font:{fontSize:14},
		textAlign:'left'
	});
	upperView.add(win.label_category);
	
	win.nextNavButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
	});
	if ( win.disableFav != true ) {
		win.rightNavButton = win.nextNavButton;
	}
	
	// IMAGE
	win.image = Ti.UI.createImageView({
		image:'../images/default.png',
		defaultImage:'../images/default.png',
		top:35,
		left:10,
		height:100,
		width:140
	});
	win.add(win.image);
	
	//
	// CREATE MAP VIEW
	//
	win.mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: Ti.App.location_maribor,
		animate:true,
		regionFit:true,
		userLocation:true,
		bottom:0,
		height:'60%',
		zIndex:1
	});
	win.mapview.hide();
	
	win.add(win.mapview);
	
	// SCROLL VIEW
	win.scrollview = Titanium.UI.createScrollView({
		contentWidth:'auto',
		contentHeight:'auto',
		bottom:0,
		height:'60%',
		zIndex:2,
		showVerticalScrollIndicator:true
	});
	
	// tabbed bar
	win.tb1 = Titanium.UI.createTabbedBar({
		labels:[],
		top:'42%',
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:25,
		width:200,
		zIndex:99,
		index:0
	});
	win.tb1.hide();
	win.add(win.tb1);
	
	//
	// CREATE WEBVIEW
	//
	win.webView = Ti.UI.createWebView({
		top:40,
		height:'auto',
		width:'100%',
		backgroundColor:'transparent'
	});
	win.scrollview.add(win.webView);
	
	win.add(win.scrollview);
	
	// alert window
	a = Titanium.UI.createAlertDialog({
		message:'Želiš odpreti Google Maps?'
	});
	
	a_add = Titanium.UI.createAlertDialog({
		message:'Dodam me priljubljene?'
	});
}
