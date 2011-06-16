
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
		left:25,
		height:72,
		width:72
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		win.imageApp.hide();
	}
	win.add(win.imageApp);
	
	win.label_title = Titanium.UI.createLabel({
		top:40,
		height:30,
		width:'auto',
		color:'#576996',
		font:{fontSize:20,fontWeight:'bold', fontFamily:'Arial'},
		textAlign:'center',
		text:lang['festival_lent']
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.label_title.height = win.label_title.height*Titanium.App.Properties.getDouble('lowResDelimiter')+5;
			win.label_title.font.fontSize = 18;
			win.label_title.top = 25;
		} else if (Titanium.Platform.displayCaps.density == 'high') {
			win.label_title.font.fontSize = 24;
			win.label_title.top = 25;
		}
	} else {
		win.label_title.left = 110;
	}
	win.add(win.label_title);
	
	win.label_author = Titanium.UI.createLabel({
		top:70,
		height:30,
		width:'auto',
		font:{fontSize:16,fontFamily:'Arial'},
		textAlign:'center',
		text:lang['info_author']
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.label_author.height = win.label_author.height*Titanium.App.Properties.getDouble('lowResDelimiter')+3;
			win.label_author.font.fontSize = 14;
			win.label_author.top = 50;
		} else if (Titanium.Platform.displayCaps.density == 'high') {
			win.label_author.font.fontSize = 20;
		}
	} else {
		win.label_author.left = 140;
	}
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
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.label_desc.height = win.label_desc.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.label_desc.font.fontSize = 12;
		}
	}
	win.add(win.label_desc);
	
	win.imageFramework = Ti.UI.createImageView({
		image:'../images/logo_titanium.png',
		bottom:110,
		left:40,
		height:90,
		width:90
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.imageFramework.height = win.imageFramework.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.imageFramework.width = win.imageFramework.width*Titanium.App.Properties.getDouble('lowResDelimiter');
		}
	}
	win.add(win.imageFramework);
	
	win.imageOS = Ti.UI.createImageView({
		image:'../images/logo_OS.png',
		bottom:100,
		right:40,
		height:110,
		width:110
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.imageOS.height = win.imageOS.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.imageOS.width = win.imageOS.width*Titanium.App.Properties.getDouble('lowResDelimiter');
		}
	}
	win.add(win.imageOS);
	
	win.imageCompany = Ti.UI.createImageView({
		image:'../images/logo_agenda.png',
		bottom:30,
		height:60,
		width:250
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.imageCompany.height = win.imageCompany.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.imageCompany.width = win.imageCompany.width*Titanium.App.Properties.getDouble('lowResDelimiter');
		}
	}
	win.add(win.imageCompany);
	
}
