
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
	
	win.label_title = Titanium.UI.createLabel({
		height:20,
		left:120,
		width:'100%',
		color:'#000000',
		font:{fontSize:15, fontStyle:'bold'},
		textAlign:'left'
	});
	upperView.add(win.label_title);
	
	win.label_date = Titanium.UI.createLabel({
		height:20,
		left:120,
		width:'auto',
		color:'#000000',
		font:{fontSize:12},
		textAlign:'left'
	});
	upperView.add(win.label_date);
	
	win.label_stage = Titanium.UI.createLabel({
		height:20,
		left:120,
		width:'auto',
		color:'#000000',
		font:{fontSize:12},
		textAlign:'left'
	});
	upperView.add(win.label_stage);
	
	// tabbed bar
	win.tb1 = Titanium.UI.createTabbedBar({
		labels:['Opis', 'Karta'],
		top:'46%',
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:25,
		width:200,
		zIndex:2,
		index:0
	});
	win.add(win.tb1);
	
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
	win.scrollView = Titanium.UI.createScrollView({
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
	win.webView = Ti.UI.createWebView({
		top:40,
		height:'100%',
		width:'100%'
	});
	win.scrollView.add(win.webView);
	
	win.add(win.scrollView);
}
