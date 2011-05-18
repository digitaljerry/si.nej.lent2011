// geo location of festival
Ti.App.location_maribor = {latitude:46.55964925,longitude:15.646033,latitudeDelta:0.013, longitudeDelta:0.013};

Ti.App.days = ["Ned","Pon","Tor","Sre","Čet","Pet","Sob","Ned"];

// stages used in multiple views
// data from:
// http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_location&tx_mnmysql2json[fields]=uid,name,street,zip,city,longitude,latitude&tx_mnmysql2json[where]=deleted=0%20AND%20hidden=0%20AND%20sys_language_uid=0

stages = Array();
stages[1] = {"uid":"1","name":"SNG Maribor ","street":"SNG Maribor ","zip":"2000","city":"Maribor","longitude":"15.643866","latitude":"46.5597013"};
stages[2] = {"uid":"2","name":"Oder Rotovž","street":"Oder Rotovž","zip":"2000","city":"Maribor","longitude":"15.6454968","latitude":"46.5581373"};
stages[4] = {"uid":"4","name":"Jazzlent","street":"Jazzlent","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"};
stages[5] = {"uid":"5","name":"Večerov oder","street":"Večerov oder","zip":"2000","city":"Maribor","longitude":"15.6435441","latitude":"46.5566618"};
stages[6] = {"uid":"6","name":"Jurčkov oder","street":"Jurčkov oder","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"};
stages[7] = {"uid":"7","name":"Sodni stolp","street":"Sodni stolp","zip":"2000","city":"Maribor","longitude":"15.6410336","latitude":"46.5568684"};
stages[10] = {"uid":"10","name":"Naskov dvorec","street":"Zlati Lev","zip":"2000","city":"Maribor","longitude":"15.6363344","latitude":"46.558698"};
stages[11] = {"uid":"11","name":"Mladinin oder","street":"Mladinin oder","zip":"2000","city":"Maribor","longitude":"15.6415486","latitude":"46.5572815"};
stages[15] = {"uid":"15","name":"Glavni trg ","street":"Glavni trg ","zip":"2000","city":"Maribor","longitude":"15.6459971","latitude":"46.557332"};
stages[16] = {"uid":"16","name":"Grajski trg ","street":"Grajski trg ","zip":"2000","city":"Maribor","longitude":"15.6478955","latitude":"46.5599862"};
stages[17] = {"uid":"17","name":"Kavarna Kavajo ","street":"Kavarna Kavajo ","zip":"2000","city":"Maribor","longitude":"15.6456685","latitude":"46.5535631"};
stages[18] = {"uid":"18","name":"Klub KGB ","street":"Klub KGB ","zip":"2000","city":"Maribor","longitude":"15.641849","latitude":"46.5577537"};
stages[19] = {"uid":"19","name":"KMŠ oder","street":"KMŠ oder","zip":"2000","city":"Maribor","longitude":"15.6361842","latitude":"46.5580488"};
stages[20] = {"uid":"20","name":" Glavni oder na Dravi","street":"Glavni oder na Dravi","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"};
stages[23] = {"uid":"23","name":"Sinagoga","street":"Sinagoga","zip":"2000","city":"Maribor","longitude":"15.6477284","latitude":"46.5567356"};
stages[26] = {"uid":"26","name":"Mestni park","street":"Mestni park","zip":"2000","city":"Maribor","longitude":"15.6471276","latitude":"46.5657354"};
stages[27] = {"uid":"27","name":"Trg generala Maistra ","street":"Trg generala Maistra ","zip":"2000","city":"Maribor","longitude":"15.6490588","latitude":"46.561575"};
stages[28] = {"uid":"28","name":"Trg Svobode ","street":"Trg Svobode","zip":"2000","city":"Maribor","longitude":"15.6491661","latitude":"46.560557"};
stages[29] = {"uid":"29","name":"Dvorana Union","street":"Dvorana Union","zip":"2000","city":"Maribor","longitude":"15.6532024","latitude":"46.536221"};

// categories used in multipel views
// data from:
// http://lent10.slovenija.net/index.php?eID=tx_mnmysql2json_Table&tx_mnmysql2json[action]=getTable&tx_mnmysql2json[tableName]=tx_cal_category&tx_mnmysql2json[fields]=uid,title&tx_mnmysql2json[where]=deleted=0%20AND%20hidden=0%20AND%20sys_language_uid=0
categories = Array();
categories[1] = {"uid":"1","title":"Delavnice"};
categories[2] = {"uid":"2","title":"Razstava"};
categories[3] = {"uid":"3","title":"Koncert"};
categories[4] = {"uid":"4","title":"Stand-up"};
categories[5] = {"uid":"5","title":"Komedija"};
categories[6] = {"uid":"6","title":"Šport"};
categories[7] = {"uid":"7","title":"Ples"};
categories[8] = {"uid":"8","title":"Lutkovna predstava"};
categories[9] = {"uid":"9","title":"Gledališče"};
categories[10] = {"uid":"10","title":"Film"};
categories[11] = {"uid":"11","title":"Folklorni festival FOLKART"};
categories[12] = {"uid":"12","title":"Glasbeno-plesni projekt"};
categories[13] = {"uid":"13","title":"Literarni dan"};
categories[14] = {"uid":"14","title":"Muzikal"};
categories[15] = {"uid":"15","title":"Ulično gledališče"};
categories[16] = {"uid":"16","title":"Otroška in mladinska prireditev"};
categories[17] = {"uid":"17","title":"Ognjemet"};
categories[18] = {"uid":"18","title":"Ostalo"};
categories[19] = {"uid":"19","title":"Priporočamo"};
categories[39] = {"uid":"39","title":"Razprodano"};
