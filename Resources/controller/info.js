Titanium.include (Titanium.App.Properties.getString('include')+'lang/'+Titanium.App.Properties.getString('locale')+'.js');
Titanium.include (Titanium.App.Properties.getString('include')+'model/info.js');

//
// Load UI elements
//
Titanium.include (Titanium.App.Properties.getString('include')+'view/info.js');
win = Titanium.UI.currentWindow;

view_init(win);

//
// Define functions
//

win.webview.url = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?id=info&mobile=1';

