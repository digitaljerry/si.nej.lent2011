
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
	
	// DATE SELECTOR
	win.dateBackground = Ti.UI.createView({
		backgroundColor:'#1D327B',
		width:'100%',
		height:50,
		top:0,
		name:"date bg"
	});
	win.add(win.dateBackground);
	
	win.imagePrev = Ti.UI.createImageView({
		image:'../images/arrow_left.png',
		top:0,
		left:10,
		height:50,
		width:22
	});
	win.add(win.imagePrev);
	
	win.labelDate = Titanium.UI.createLabel({
		height:50,
		top:0,
		width:'60%',
		color:'#D3D5D6',
		font:{fontSize:19,fontWeight:'bold'},
		textAlign:'center',
		text:'Danes'
	});
	win.add(win.labelDate);
	
	win.imageNext = Ti.UI.createImageView({
		image:'../images/arrow_right.png',
		top:0,
		right:10,
		height:50,
		width:22
	});
	win.add(win.imageNext);
	// CREATE TABLE VIEW
	win.tableview = Titanium.UI.createTableView({
		backgroundColor:'transparent',
		top:50
	});
	
	// create buttons
	});
	
	// default date to show on start
	win.labelDate.text = getTitle(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
	
	win.add(win.tableview);
}
