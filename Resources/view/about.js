
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
		top:20,
		left:25,
		height:72,
		width:72
	});
	if (Titanium.Platform.name == 'iPhone OS') {
		win.add(win.imageApp);
	}
	
	win.label_title = Titanium.UI.createLabel({
		top:30,
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
			win.label_title.top = 15;
		} else if (Titanium.Platform.displayCaps.density == 'high') {
			win.label_title.font.fontSize = 24;
			win.label_title.top = 15;
		}
	} else {
		win.label_title.left = 110;
	}
	win.add(win.label_title);
	
	win.label_author = Titanium.UI.createLabel({
		top:60,
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
			win.label_author.top = 40;
		} else if (Titanium.Platform.displayCaps.density == 'high') {
			win.label_author.font.fontSize = 20;
		}
	} else {
		win.label_author.left = 140;
	}
	win.add(win.label_author);
	
	win.imageFramework = Ti.UI.createImageView({
		image:'../images/logo_titanium.png',
		bottom:95,
		left:80,
		height:50,
		width:50
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
		bottom:85,
		right:80,
		height:65,
		width:65
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.imageOS.height = win.imageOS.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.imageOS.width = win.imageOS.width*Titanium.App.Properties.getDouble('lowResDelimiter');
		}
	}
	win.add(win.imageOS);
	
	win.imageSponsor = Ti.UI.createImageView({
		image:'../images/logo_epk.png',
		bottom:165,
		height:75,
		width:175
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.imageSponsor.height = win.imageSponsor.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.imageSponsor.width = win.imageSponsor.width*Titanium.App.Properties.getDouble('lowResDelimiter');
		}
	}
	win.add(win.imageSponsor);
	
	win.imageCompany = Ti.UI.createImageView({
		image:'../images/logo_agenda.png',
		bottom:30,
		height:48,
		width:200
	});
	if (Titanium.Platform.name != 'iPhone OS') {
		if (Titanium.Platform.displayCaps.density == 'low') {
			win.imageCompany.height = win.imageCompany.height*Titanium.App.Properties.getDouble('lowResDelimiter');
			win.imageCompany.width = win.imageCompany.width*Titanium.App.Properties.getDouble('lowResDelimiter');
		}
	}
	win.add(win.imageCompany);
	
}
