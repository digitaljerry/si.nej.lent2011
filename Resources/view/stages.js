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
	
	stages = Ti.App.Stages.getStages();
	
	// adding annotations
	for(var i in stages) {
		plotPoints = Titanium.Map.createAnnotation({
        	latitude: stages[i].latitude,
            longitude: stages[i].longitude,
            title: stages[i].name,
            location_uid: stages[i].uid,
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
		backgroundColor:'transparent'
	});
	win.tableview.hide();
	
	var data = new Array();
	for(var i in stages) {
		data.push({title:stages[i].name, uid:stages[i].uid, hasChild:true});
	}
	win.tableview.data = data;
	
	win.add(win.tableview);
	
	//
	// NAVBAR
	// 
	win.buttonSwitch = Titanium.UI.createButton({
		title:lang['stages_list']
	});
	win.setRightNavButton(win.buttonSwitch);
}
