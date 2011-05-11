// define the UI elements
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
	var mapview = Titanium.Map.createView({
		mapType: Titanium.Map.STANDARD_TYPE,
		region: maribor,
		animate:true,
		regionFit:true,
		userLocation:true
	});
	
	// adding annotations
	for (var i = 0; i < stages.length; i++) {
		plotPoints = Titanium.Map.createAnnotation({
        	latitude: stages[i].latitude,
            longitude: stages[i].longitude,
            title: stages[i].name,
            location_uid: stages[i].uid,
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE
		});
        
		mapview.addAnnotation(plotPoints);
	};
	
	win.add(mapview);
	
	// CREATE TABLE VIEW
	// searchbar
	var search = Titanium.UI.createSearchBar();
	
	// create table view
	var tableview = Titanium.UI.createTableView({
	//	data:data,
		search:search,
		searchHidden:true
	});
	tableview.hide();
	
	var data = new Array();
	for (var i = 0; i < stages.length; i++){
		data.push({title:stages[i].name, uid:stages[i].uid, hasChild:true});
	}
	tableview.data = data;
	win.add(tableview);
	
	//
	// NAVBAR
	// 
	var buttonSwitch = Titanium.UI.createButton({
		title:'Seznam'
	});
	
	win.setRightNavButton(buttonSwitch);
	
	//
	// EVENT (shouldn't this go to the controller?)
	//
	buttonSwitch.addEventListener('click', function(e)
	{
		if ( buttonSwitch.title == 'Seznam' ) {
			buttonSwitch.title = 'Karta';
			tableview.show();
			mapview.hide();
		} else {
			buttonSwitch.title = 'Seznam';
			mapview.show();
			tableview.hide();
		}
	});
	// map view click event listener
	mapview.addEventListener('click',function(evt)
	{
		// only if right button was clicked
		if ( evt.clicksource == 'rightButton' ) {
			var winDetail = Titanium.UI.createWindow({
				url:'stages_detail.js',
				title:evt.title,
				location_uid:evt.annotation.location_uid
			});
			
			Titanium.UI.currentTab.open(winDetail,{animated:true});
		}
	});
	
	// create table view event listener
	tableview.addEventListener('click', function(e)
	{
		var winDetail = Titanium.UI.createWindow({
			url:'stages_detail.js',
			title:e.rowData.title
		});
		
		// passing the location uid
		winDetail.location_uid = e.rowData.uid;
		 
		Titanium.UI.currentTab.open(winDetail,{animated:true});
	});
}

var win = Titanium.UI.currentWindow;
