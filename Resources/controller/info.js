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

win.webview.url = 'http://' + Titanium.App.Properties.getString('domain') + '/index.php?id=info&mobile=1';

