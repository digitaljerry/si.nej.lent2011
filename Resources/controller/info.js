Titanium.include ('../lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include ('../model/info.js');

//
// Load UI elements
//
Titanium.include ('../view/info.js');
win = Titanium.UI.currentWindow;

view_init(win);

//
// Define functions
//

function showInfo() {
	
	win.webview.url = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?id=info&mobile=1';
	
}

showInfo();

//
// define event listeners
//

win.infoButton.addEventListener('click',function(e)
{
	var w = Ti.UI.createWindow({
		backgroundColor: '#f1eddd',
		backgroundImage: '../images/background_window.png'
	});
	
	w.imageApp = Ti.UI.createImageView({
		image:'../images/logo_lent2011.png',
		top:30,
		left:15,
		height:80,
		width:80
	});
	w.add(w.imageApp);
	
	w.label_title = Titanium.UI.createLabel({
		top:40,
		height:30,
		left:110,
		width:'auto',
		color:'#576996',
		font:{fontSize:20,fontWeight:'bold', fontFamily:'Arial'},
		textAlign:'left',
		text:lang['festival_lent']
	});
	w.add(w.label_title);
	
	w.label_author = Titanium.UI.createLabel({
		top:70,
		height:30,
		left:120,
		width:'auto',
		font:{fontSize:16,fontFamily:'Arial'},
		textAlign:'left',
		text:lang['info_author']
	});
	w.add(w.label_author);
	
	w.label_desc = Titanium.UI.createLabel({
		top:130,
		height:50,
		left:30,
		width:'auto',
		font:{fontSize:14,fontFamily:'Arial'},
		textAlign:'left',
		text:lang['info_description']
	});
	w.add(w.label_desc);
	
	w.imageCompany = Ti.UI.createImageView({
		image:'../images/logo_agenda.png',
		bottom:40,
		height:150,
		width:250
	});
	w.add(w.imageCompany);
	
	w.imageFramework = Ti.UI.createImageView({
		image:'../images/logo_titanium.png',
		bottom:160,
		left:40,
		height:90,
		width:90
	});
	w.add(w.imageFramework);
	
	w.imageOS = Ti.UI.createImageView({
		image:'../images/logo_os.png',
		bottom:150,
		right:40,
		height:110,
		width:110
	});
	w.add(w.imageOS);
	
	var b = Ti.UI.createButton({
		title:lang['close'],
		width:'80%',
		height:30,
		bottom:30
	});
	
	
	// buttons
	
	b.addEventListener('click',function()
	{
		w.close();
	});
	w.add(b);
	
	w.imageCompany.addEventListener('click', function() {
		var a = Titanium.UI.createAlertDialog({
			message:lang['info_agenda'],
			buttonNames: [lang['visit'],lang['cancel']],
			cancel:1
		});
		a.show();
	});
	
	w.label_author.addEventListener('click', function() {
		var a = Titanium.UI.createAlertDialog({
			message:'Vas zanimajo podrobnosti?',
			buttonNames: [lang['email'],lang['cancel']],
			cancel:1
		});
		a.show();
	});
	
	w.imageFramework.addEventListener('click', function() {
		var a = Titanium.UI.createAlertDialog({
			message:lang['info_titanium'],
			buttonNames: [lang['visit'],lang['cancel']],
			cancel:1
		});
		a.show();
	});
	
	w.imageOS.addEventListener('click', function() {
		var a = Titanium.UI.createAlertDialog({
			message:lang['info_opensource'],
			buttonNames: [lang['fork'],lang['cancel']],
			cancel:1
		});
		a.show();
	});
	
	// open modal window
	w.open({
		modal:true,
		modalTransitionStyle:Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
		modalStyle:Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
		navBarHidden:true}
	);
});
