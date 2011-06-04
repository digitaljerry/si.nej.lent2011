
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
		left:15,
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
		right:15,
		height:50,
		width:22
	});
	win.add(win.imageNext);
	
	// picker
	
	win.pickerBackground = Ti.UI.createView({
		backgroundColor:'#000000',
		width:'100%',
		height:'100%',
		top:0,
		name:"picker bg"
	});
	win.pickerBackground.hide();
	win.add(win.pickerBackground);

	var minDate = new Date();
	minDate.setFullYear(Titanium.App.Properties.getInt('lentStartYear'));
	minDate.setMonth(Titanium.App.Properties.getInt('lentStartMonth')-1);
	minDate.setDate(Titanium.App.Properties.getInt('lentStartDay'));
	
	var maxDate = new Date();
	maxDate.setFullYear(Titanium.App.Properties.getInt('lentEndYear'));
	maxDate.setMonth(Titanium.App.Properties.getInt('lentEndMonth')-1);
	maxDate.setDate(Titanium.App.Properties.getInt('lentEndDay'));
	
	win.picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:minDate,
		maxDate:maxDate,
		value:datum,
		zIndex:1000
	});
	win.picker.hide();
	win.add(win.picker);
	
	win.b = Ti.UI.createButton({
		title:'Izberi',
		width:'80%',
		height:30,
		bottom:30
	});
	win.b.hide();
	win.add(win.b);
	
	// CREATE TABLE VIEW
	win.tableview = Titanium.UI.createTableView({
		backgroundColor:'transparent',
		top:50
	});
	
	// create buttons
	win.searchNavButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.SEARCH
	});
	win.rightNavButton = win.searchNavButton;
	
	// default date to show on start
	win.labelDate.text = getTitle(datum);
	showEventsForDay(Ti.App.DateLent.outputDate(datum));
	
	win.add(win.tableview);
}
