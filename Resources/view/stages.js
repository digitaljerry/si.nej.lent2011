function view_init(win) {
	
	win.title = 'Prizorišča';
	win.backgroundColor = '#fff';
	
	win.label1 = Titanium.UI.createLabel({
		color:'#999',
		text:'Nalagam...',
		font:{fontSize:20,fontFamily:'Helvetica Neue'},
		textAlign:'center',
		width:'auto'
	});
	win.add(win.label1);
	
	//
	// CREATE MAP VIEW
	//
	win.mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: Ti.App.location_maribor,
		animate:true,
		regionFit:true,
		userLocation:true
	});
	
	// adding annotations
	for (var i = 0; i < Ti.App.stages.length; i++) {
		plotPoints = Titanium.Map.createAnnotation({
        	latitude: Ti.App.stages[i].latitude,
            longitude: Ti.App.stages[i].longitude,
            title: Ti.App.stages[i].name,
            location_uid: Ti.App.stages[i].uid,
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
		});
        
		win.mapview.addAnnotation(plotPoints);
	};
	
	win.add(win.mapview);
	
	//
	// CREATE TABLE VIEW
	//
	win.tableview = Titanium.UI.createTableView({
		search:Titanium.UI.createSearchBar(),
		searchHidden:true
	});
	win.tableview.hide();
	
	var data = new Array();
	for (var i = 0; i < Ti.App.stages.length; i++){
		data.push({title:Ti.App.stages[i].name, uid:Ti.App.stages[i].uid, hasChild:true});
	}
	win.tableview.data = data;
	
	win.add(win.tableview);
	
	//
	// NAVBAR
	// 
	win.buttonSwitch = Titanium.UI.createButton({
		title:'Seznam'
	});
	win.setRightNavButton(win.buttonSwitch);
}
