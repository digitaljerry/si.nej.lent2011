
// define the UI elements
function view_init(win) {
	
	win.backgroundColor = '#fff';
	
	var upperView = Ti.UI.createView({
		top:10,
		left:10,
		height:'auto',
		width:'auto',
		layout:'vertical'
	});
	win.add(upperView);
	
	win.label_title = Titanium.UI.createLabel({
		height:25,
		left:0,
		width:'auto',
		color:'#576996',
		font:{fontSize:16,fontWeight:'bold', fontFamily:'Arial'},
		textAlign:'left'
	});
	upperView.add(win.label_title);
	
	win.label_date = Titanium.UI.createLabel({
		height:25,
		left:160,
		width:'auto',
		color:'#000000',
		font:{fontSize:18,fontWeight:'bold'},
		textAlign:'left'
	});
	upperView.add(win.label_date);
	
	win.label_time = Titanium.UI.createLabel({
		height:27,
		left:160,
		width:'auto',
		color:'#000000',
		font:{fontSize:18,fontWeight:'bold'},
		textAlign:'left'
	});
	upperView.add(win.label_time);
	
	win.label_stage = Titanium.UI.createLabel({
		height:25,
		left:160,
		width:'auto',
		color:'#000000',
		font:{fontSize:14},
		textAlign:'left'
	});
	upperView.add(win.label_stage);
	
	win.label_category = Titanium.UI.createLabel({
		height:25,
		left:160,
		width:'auto',
		color:'#000000',
		font:{fontSize:14},
		textAlign:'left'
	});
	upperView.add(win.label_category);
	
	// tabbed bar
	win.tb1 = Titanium.UI.createTabbedBar({
		labels:['Opis', 'Karta'],
		top:'42%',
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
			top:15,
			left:10,
			height:140,
			width:140
		});
	
	}
	else
	{
		var image = Ti.UI.createImageView({
			image:'http://lent10.slovenija.net/typo3temp/pics/0c62b85bfc.jpg',
			defaultImage:'../images/cloud.png',
			top:15,
			left:10,
			height:140,
			width:140
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
		height:'auto',
		width:'100%'
	});
	win.scrollView.add(win.webView);
	
	win.add(win.scrollView);
}
