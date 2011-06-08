Titanium.include (Titanium.App.Properties.getString('include')+'lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include (Titanium.App.Properties.getString('include')+'model/about.js');

//
// Load UI elements
//
Titanium.include (Titanium.App.Properties.getString('include')+'view/about.js');
win = Titanium.UI.currentWindow;

view_init(win);

//
// Define functions
//

function email() {
	win.emailDialog = Titanium.UI.createEmailDialog();
	if (!win.emailDialog.isSupported()) {
		Ti.UI.createAlertDialog({
			title:lang['error'],
			message:lang['about_email_not_available']
		}).show();
		return;
	}
	win.emailDialog.setSubject(lang['about_subject']);
	win.emailDialog.setToRecipients(['info@agenda.si']);
	
	win.emailDialog.addEventListener('complete',function(e)
	{
	    if (e.result == win.emailDialog.SENT)
	    {
	        if (Ti.Platform.osname != 'android') {
	            // android doesn't give us useful result codes.
	            // it anyway shows a toast.
	            Titanium.UI.createAlertDialog({message:lang['about_sent']});
	        }
	    }
	    else
	    {
	    	Titanium.UI.createAlertDialog({message:lang['about_not_sent']});
	    }
	});
	win.emailDialog.open();
}

//
// Define event listeners
//

win.imageCompany.addEventListener('click', function() {
	a = Titanium.UI.createAlertDialog({
		message:lang['info_agenda'],
		buttonNames: [lang['visit'],lang['cancel']],
		cancel:1
	});
	
	a.addEventListener('click', function(e) {
		if ( e.index == 0 ) {
			Ti.Platform.openURL('http://www.agenda.si');
		}
	});
	
	a.show();
});

win.label_author.addEventListener('click', function() {
	a = Titanium.UI.createAlertDialog({
		message:lang['info_details'],
		buttonNames: [lang['email'],lang['cancel']],
		cancel:1
	});
	
	a.addEventListener('click', function(e) {
		if ( e.index == 0 ) {
			email();
		}
	});
	
	a.show();
});

win.imageFramework.addEventListener('click', function() {
	a = Titanium.UI.createAlertDialog({
		message:lang['info_titanium'],
		buttonNames: [lang['visit'],lang['cancel']],
		cancel:1
	});
	
	a.addEventListener('click', function(e) {
		if ( e.index == 0 ) {
			Ti.Platform.openURL('http://www.appcelerator.com');
		}
	});
	
	a.show();
});

win.imageOS.addEventListener('click', function() {
	a = Titanium.UI.createAlertDialog({
		message:lang['info_opensource'],
		buttonNames: [lang['fork'],lang['cancel']],
		cancel:1
	});
	
	a.addEventListener('click', function(e) {
		if ( e.index == 0 ) {
			Ti.Platform.openURL('http://github.com/nej/si.nej.lent2011');
		}
	});
	
	a.show();
});
