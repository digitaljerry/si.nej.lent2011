
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
	
	win.imageApp = Ti.UI.createImageView({
		image:'../images/logo_lent2011.png',
		top:30,
		left:15,
		height:80,
		width:80
	});
	win.add(win.imageApp);
	
	win.label_title = Titanium.UI.createLabel({
		top:40,
		height:30,
		left:110,
		width:'auto',
		color:'#576996',
		font:{fontSize:20,fontWeight:'bold', fontFamily:'Arial'},
		textAlign:'left',
		text:lang['festival_lent']
	});
	win.add(win.label_title);
	
	win.label_author = Titanium.UI.createLabel({
		top:70,
		height:30,
		left:110,
		width:'auto',
		font:{fontSize:16,fontFamily:'Arial'},
		textAlign:'left',
		text:lang['info_author']
	});
	win.add(win.label_author);
	
	win.label_desc = Titanium.UI.createLabel({
		top:130,
		height:50,
		left:30,
		width:'auto',
		font:{fontSize:14,fontFamily:'Arial'},
		textAlign:'left',
		text:lang['info_description']
	});
	win.add(win.label_desc);
	
	win.imageFramework = Ti.UI.createImageView({
		image:'../images/logo_titanium.png',
		bottom:110,
		left:40,
		height:90,
		width:90
	});
	win.add(win.imageFramework);
	
	win.imageOS = Ti.UI.createImageView({
		image:'../images/logo_os.png',
		bottom:100,
		right:40,
		height:110,
		width:110
	});
	win.add(win.imageOS);
	
	win.imageCompany = Ti.UI.createImageView({
		image:'../images/logo_agenda.png',
		bottom:40,
		height:48,
		width:250
	});
	win.add(win.imageCompany);
	
}
