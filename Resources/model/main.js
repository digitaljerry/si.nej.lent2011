// geo location of festival
Ti.App.location_maribor = {latitude:46.55964925,longitude:15.646033,latitudeDelta:0.013, longitudeDelta:0.013};

Ti.App.days = ["Ned","Pon","Tor","Sre","Čet","Pet","Sob","Ned"];

// stages used in multiple views
// data from:
// http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_location&tx_mnmysql2json[fields]=uid,name,street,zip,city,longitude,latitude&tx_mnmysql2json[where]=deleted=0%20AND%20hidden=0%20AND%20sys_language_uid=0
Ti.App.stages = [
{"uid":"1","name":"SNG Maribor ","street":"SNG Maribor ","zip":"2000","city":"Maribor","longitude":"15.643866","latitude":"46.5597013"},
{"uid":"2","name":"Oder Rotovž","street":"Oder Rotovž","zip":"2000","city":"Maribor","longitude":"15.6454968","latitude":"46.5581373"},
{"uid":"4","name":"Jazzlent","street":"Jazzlent","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"},
{"uid":"5","name":"Večerov oder","street":"Večerov oder","zip":"2000","city":"Maribor","longitude":"15.6435441","latitude":"46.5566618"},
{"uid":"6","name":"Jurčkov oder","street":"Jurčkov oder","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"},
{"uid":"7","name":"Sodni stolp","street":"Sodni stolp","zip":"2000","city":"Maribor","longitude":"15.6410336","latitude":"46.5568684"},
{"uid":"10","name":"Naskov dvorec","street":"Zlati Lev","zip":"2000","city":"Maribor","longitude":"15.6363344","latitude":"46.558698"},
{"uid":"11","name":"Mladinin oder","street":"Mladinin oder","zip":"2000","city":"Maribor","longitude":"15.6415486","latitude":"46.5572815"},
{"uid":"15","name":"Glavni trg ","street":"Glavni trg ","zip":"2000","city":"Maribor","longitude":"15.6459971","latitude":"46.557332"},
{"uid":"16","name":"Grajski trg ","street":"Grajski trg ","zip":"2000","city":"Maribor","longitude":"15.6478955","latitude":"46.5599862"},
{"uid":"17","name":"Kavarna Kavajo ","street":"Kavarna Kavajo ","zip":"2000","city":"Maribor","longitude":"15.6456685","latitude":"46.5535631"},
{"uid":"18","name":"Klub KGB ","street":"Klub KGB ","zip":"2000","city":"Maribor","longitude":"15.641849","latitude":"46.5577537"},
{"uid":"19","name":"KMŠ oder","street":"KMŠ oder","zip":"2000","city":"Maribor","longitude":"15.6361842","latitude":"46.5580488"},
{"uid":"20","name":" Glavni oder na Dravi","street":"Glavni oder na Dravi","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"},
{"uid":"23","name":"Sinagoga","street":"Sinagoga","zip":"2000","city":"Maribor","longitude":"15.6477284","latitude":"46.5567356"},
{"uid":"26","name":"Mestni park","street":"Mestni park","zip":"2000","city":"Maribor","longitude":"15.6471276","latitude":"46.5657354"},
{"uid":"27","name":"Trg generala Maistra ","street":"Trg generala Maistra ","zip":"2000","city":"Maribor","longitude":"15.6490588","latitude":"46.561575"},
{"uid":"28","name":"Trg Svobode ","street":"Trg Svobode","zip":"2000","city":"Maribor","longitude":"15.6491661","latitude":"46.560557"},
{"uid":"29","name":"Dvorana Union","street":"Dvorana Union","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"}
];

// categories used in multipel views
// data from:
// http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_category&tx_mnmysql2json[fields]=uid,title&tx_mnmysql2json[where]=deleted=0%20AND%20hidden=0%20AND%20sys_language_uid=0
Ti.App.categories = [
{"uid":"1","title":"Delavnice"},
{"uid":"2","title":"Razstava"},
{"uid":"3","title":"Koncert"},
{"uid":"4","title":"Stand-up"},
{"uid":"5","title":"Komedija"},
{"uid":"6","title":"Šport"},
{"uid":"7","title":"Ples"},
{"uid":"8","title":"Lutkovna predstava"},
{"uid":"9","title":"Gledališče"},
{"uid":"10","title":"Film"},
{"uid":"11","title":"Folklorni festival FOLKART"},
{"uid":"12","title":"Glasbeno-plesni projekt"},
{"uid":"13","title":"Literarni dan"},
{"uid":"14","title":"Muzikal"},
{"uid":"15","title":"Ulično gledališče"},
{"uid":"16","title":"Otroška in mladinska prireditev"},
{"uid":"17","title":"Ognjemet"},
{"uid":"18","title":"Ostalo"},
{"uid":"19","title":"Priporočamo"},
{"uid":"39","title":"Razprodano"}
];
