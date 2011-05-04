// define the UI elements
function view_init(win) {
	
	win.title = 'Prizorišča';
	win.backgroundColor = '#fff';
	
	win.label1 = Titanium.UI.createLabel({
		color:'#999',
		text:'I am Window 2',
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
		userLocation:true,
		annotations:appLocations
	});
	
	win.add(mapview);
	
	// switch
	var bb1 = Titanium.UI.createButtonBar({
		labels:['Karta', 'Seznam'],
		//backgroundColor:'#336699',
		top:30,
		style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
		height:25,
		width:200
	});

	win.add(bb1);
	
	//
	// NAVBAR
	// 
	var bb3 = Titanium.UI.createButton({
		title:'Seznam'
	});
	
	win.setRightNavButton(bb3);
	
	//
	// EVENT (shouldn't this go to the controller?)
	//
	bb3.addEventListener('click', function(e)
	{
		if ( bb3.title == 'Seznam' )
			bb3.title = 'Karta';
		else
			bb3.title = 'Seznam';
	});
}

var win = Titanium.UI.currentWindow;
