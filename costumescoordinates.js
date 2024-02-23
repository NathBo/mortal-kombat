function getkitcoordinates(){
    var kitcoordinates = new Map();
	kitcoordinates.set("stand1",{offx:71,width:34,offy:19,height:97,decx:0,decy:0});
	kitcoordinates.set("stand2",{offx:116,width:34,offy:19,height:97,decx:0,decy:0});
	kitcoordinates.set("stand3",{offx:161,width:33,offy:19,height:97,decx:0,decy:0});
	kitcoordinates.set("stand4",{offx:204,width:33,offy:19,height:97,decx:0,decy:0});
	kitcoordinates.set("stand5",{offx:247,width:33,offy:19,height:97,decx:0,decy:0});
	kitcoordinates.set("crouching1",{offx:483,width:37,offy:19,height:97,decx:0,decy:-1});
	kitcoordinates.set("crouching2",{offx:532,width:36,offy:19,height:97,decx:0,decy:-1});
	kitcoordinates.set("walk1",{offx:15,width:36,offy:137,height:102,decx:-8,decy:-5});
	kitcoordinates.set("walk2",{offx:62,width:36,offy:137,height:102,decx:0,decy:-5});
	kitcoordinates.set("walk3",{offx:103,width:36,offy:137,height:102,decx:0,decy:-5});
	kitcoordinates.set("walk4",{offx:143,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk5",{offx:185,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk6",{offx:226,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk7",{offx:265,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk8",{offx:308,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("jump1",{offx:365,width:36,offy:129,height:111,decx:0,decy:0});
	kitcoordinates.set("jump2",{offx:411,width:32,offy:145,height:94,decx:0,decy:0});
	kitcoordinates.set("jump3",{offx:458,width:34,offy:132,height:107,decx:0,decy:0});
	kitcoordinates.set("roll1",{offx:501,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("roll2",{offx:540,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("roll3",{offx:585,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("roll4",{offx:634,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("roll5",{offx:672,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("roll6",{offx:713,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("roll7",{offx:757,width:36,offy:188,height:52,decx:0,decy:20});
	kitcoordinates.set("lpunch1",{offx:16,width:39,offy:388,height:97,decx:0,decy:0});
	kitcoordinates.set("lpunch2",{offx:65,width:51,offy:388,height:97,decx:0,decy:0});
	kitcoordinates.set("hpunch3",{offx:125,width:59,offy:388,height:97,decx:2,decy:0});
	kitcoordinates.set("hpunch1",{offx:16,width:39,offy:388,height:97,decx:0,decy:0});
	kitcoordinates.set("hpunch2",{offx:65,width:51,offy:388,height:97,decx:0,decy:0});
	kitcoordinates.set("lpunch3",{offx:656,width:63,offy:388,height:97,decx:0,decy:0});
	kitcoordinates.set("lkick1",{offx:298,width:40,offy:607,height:98,decx:-8,decy:0});
	kitcoordinates.set("lkick2",{offx:349,width:30,offy:607,height:98,decx:12,decy:0});
	kitcoordinates.set("lkick3",{offx:390,width:36,offy:607,height:98,decx:14,decy:0});
	kitcoordinates.set("lkick4",{offx:437,width:52,offy:607,height:98,decx:14,decy:0});
	kitcoordinates.set("lkick5",{offx:498,width:61,offy:607,height:98,decx:14,decy:0});
	kitcoordinates.set("mkick1",{offx:298,width:40,offy:607,height:98,decx:-8,decy:0});
	kitcoordinates.set("mkick2",{offx:349,width:30,offy:607,height:98,decx:12,decy:0});
	kitcoordinates.set("mkick3",{offx:390,width:36,offy:607,height:98,decx:14,decy:0});
	kitcoordinates.set("mkick4",{offx:437,width:52,offy:607,height:98,decx:14,decy:0});
	kitcoordinates.set("mkick5",{offx:216,width:58,offy:607,height:98,decx:14,decy:0});
	kitcoordinates.set("hkick1",{offx:15,width:36,offy:713,height:106,decx:0,decy:0});
	kitcoordinates.set("hkick2",{offx:63,width:43,offy:713,height:106,decx:2,decy:0});
	kitcoordinates.set("hkick3",{offx:118,width:47,offy:713,height:106,decx:18,decy:0});
	kitcoordinates.set("hkick4",{offx:175,width:39,offy:713,height:106,decx:16,decy:0});
	kitcoordinates.set("hkick5",{offx:223,width:21,offy:713,height:106,decx:12,decy:0});
	kitcoordinates.set("hkick6",{offx:255,width:41,offy:713,height:106,decx:-4,decy:0});
	kitcoordinates.set("hurted1",{offx:15,width:39,offy:1051,height:92,decx:0,decy:0});
	kitcoordinates.set("hurted2",{offx:65,width:42,offy:1051,height:92,decx:0,decy:0});
	kitcoordinates.set("falling1",{offx:460,width:57,offy:1181,height:83,decx:0,decy:0});
	kitcoordinates.set("falling2",{offx:527,width:74,offy:1181,height:83,decx:0,decy:0});
	kitcoordinates.set("falling3",{offx:610,width:68,offy:1181,height:83,decx:0,decy:0});
	kitcoordinates.set("grounded1",{offx:690,width:69,offy:1222,height:42,decx:0,decy:0});
	kitcoordinates.set("grounded2",{offx:770,width:78,offy:1241,height:23,decx:0,decy:0});
	kitcoordinates.set("getup1",{offx:421,width:63,offy:1342,height:35,decx:0,decy:0});
	kitcoordinates.set("getup2",{offx:494,width:36,offy:1322,height:55,decx:0,decy:0});
	kitcoordinates.set("getup3",{offx:539,width:26,offy:1301,height:76,decx:0,decy:0});
	kitcoordinates.set("getup4",{offx:574,width:37,offy:1275,height:102,decx:0,decy:0});
	kitcoordinates.set("blocking1",{offx:300,width:33,offy:15,height:101,decx:0,decy:0});
	kitcoordinates.set("blocking2",{offx:343,width:35,offy:15,height:101,decx:0,decy:0});
	kitcoordinates.set("cblocking1",{offx:584,width:31,offy:46,height:70,decx:0,decy:0});
	kitcoordinates.set("cblocking2",{offx:625,width:35,offy:46,height:70,decx:0,decy:0});
	kitcoordinates.set("churted1",{offx:538,width:38,offy:1083,height:60,decx:0,decy:0});
	kitcoordinates.set("churted2",{offx:587,width:43,offy:1086,height:57,decx:0,decy:0});
	kitcoordinates.set("clpunch1",{offx:319,width:37,offy:877,height:62,decx:2,decy:0});
	kitcoordinates.set("clpunch2",{offx:365,width:47,offy:879,height:60,decx:2,decy:0});
	kitcoordinates.set("huppercut1",{offx:15,width:53,offy:880,height:59,decx:-14,decy:0});
	kitcoordinates.set("huppercut2",{offx:79,width:53,offy:830,height:109,decx:0,decy:0});
	kitcoordinates.set("huppercut3",{offx:143,width:58,offy:830,height:109,decx:0,decy:0});
	kitcoordinates.set("huppercut4",{offx:210,width:41,offy:830,height:109,decx:2,decy:0});
	kitcoordinates.set("huppercut5",{offx:262,width:39,offy:830,height:109,decx:-2,decy:0});
	kitcoordinates.set("clkick1",{offx:612,width:30,offy:878,height:61,decx:0,decy:-6});
	kitcoordinates.set("clkick2",{offx:654,width:55,offy:879,height:60,decx:0,decy:-9});
	kitcoordinates.set("cmkick1",{offx:612,width:30,offy:878,height:61,decx:0,decy:0});
	kitcoordinates.set("cmkick2",{offx:473,width:45,offy:879,height:60,decx:6,decy:-2});
	kitcoordinates.set("cmkick3",{offx:528,width:64,offy:878,height:61,decx:6,decy:-2});
	kitcoordinates.set("jpunch1",{offx:15,width:67,offy:991,height:47,decx:-6,decy:10});
	kitcoordinates.set("jpunch2",{offx:92,width:88,offy:985,height:53,decx:-9,decy:10});
	kitcoordinates.set("jskick1",{offx:203,width:34,offy:960,height:78,decx:0,decy:8});
	kitcoordinates.set("jskick2",{offx:246,width:46,offy:950,height:88,decx:0,decy:8});
	kitcoordinates.set("jkick1",{offx:314,width:51,offy:974,height:64,decx:0,decy:10});
	kitcoordinates.set("jkick2",{offx:375,width:64,offy:975,height:63,decx:0,decy:10});
	kitcoordinates.set("grabbing1",{offx:15,width:56,offy:494,height:105,decx:0,decy:0});
	kitcoordinates.set("grabbing2",{offx:81,width:36,offy:494,height:105,decx:-2,decy:0});
	kitcoordinates.set("grabbing3",{offx:127,width:47,offy:494,height:105,decx:-17,decy:0});
	kitcoordinates.set("grabbing4",{offx:186,width:61,offy:494,height:105,decx:-30,decy:0});
	kitcoordinates.set("grabbing5",{offx:258,width:61,offy:494,height:105,decx:-30,decy:0});
	kitcoordinates.set("grabbed1",{offx:15,width:35,offy:1282,height:95,decx:0,decy:0});
	kitcoordinates.set("grabbed2",{offx:59,width:56,offy:1282,height:95,decx:0,decy:0});
	kitcoordinates.set("grabbed3",{offx:124,width:72,offy:1282,height:95,decx:0,decy:0});
	kitcoordinates.set("grabbed4",{offx:205,width:41,offy:1282,height:95,decx:0,decy:0});
	kitcoordinates.set("victory1",{offx:15,width:22,offy:249,height:126,decx:3,decy:0});
	kitcoordinates.set("victory2",{offx:47,width:44,offy:249,height:126,decx:-9,decy:0});
	kitcoordinates.set("victory3",{offx:101,width:46,offy:249,height:126,decx:-9,decy:0});
	kitcoordinates.set("victory4",{offx:157,width:51,offy:249,height:126,decx:-12,decy:0});
	kitcoordinates.set("victory5",{offx:219,width:81,offy:249,height:126,decx:-28,decy:0});
	kitcoordinates.set("victory6",{offx:219,width:81,offy:249,height:126,decx:-28,decy:0});
	kitcoordinates.set("victory7",{offx:310,width:90,offy:249,height:126,decx:-34,decy:0});
	kitcoordinates.set("victory8",{offx:409,width:86,offy:249,height:126,decx:-30,decy:0});
	kitcoordinates.set("victory9",{offx:504,width:69,offy:249,height:126,decx:-14,decy:0});
	kitcoordinates.set("victory10",{offx:584,width:37,offy:249,height:126,decx:2,decy:0});
	kitcoordinates.set("victory11",{offx:631,width:33,offy:249,height:126,decx:2,decy:0});
	kitcoordinates.set("victory12",{offx:677,width:30,offy:249,height:126,decx:2,decy:0});
	kitcoordinates.set("fanthrow1",{offx:15,width:62,offy:1497,height:105,decx:-24,decy:0});
	kitcoordinates.set("fanthrow2",{offx:87,width:52,offy:1503,height:99,decx:-14,decy:0});
	kitcoordinates.set("fanthrow3",{offx:149,width:42,offy:1505,height:97,decx:4,decy:0});
	kitcoordinates.set("fanthrow4",{offx:200,width:29,offy:1488,height:114,decx:0,decy:0});
	kitcoordinates.set("fanswipe1",{offx:255,width:49,offy:1504,height:98,decx:-10,decy:0});
	kitcoordinates.set("fanswipe2",{offx:316,width:38,offy:1504,height:98,decx:0,decy:0});
	kitcoordinates.set("fanswipe3",{offx:365,width:77,offy:1504,height:98,decx:0,decy:0});
	kitcoordinates.set("fanswipe4",{offx:453,width:45,offy:1504,height:98,decx:0,decy:0});
	kitcoordinates.set("fanlift1",{offx:15,width:55,offy:1380,height:98,decx:-6,decy:0});
	kitcoordinates.set("fanlift2",{offx:71,width:55,offy:1380,height:98,decx:-6,decy:0});

	kitcoordinates.set("wave",{offx:553,width:32,offy:1442,height:38,decx:0,decy:0});
	

    return kitcoordinates;
}


function getbloodcoordinates(){
    var bloodcoordinates = new Map();
	bloodcoordinates.set("lblood1",{offx:4,width:15,offy:62,height:18,decx:0,decy:0});
	bloodcoordinates.set("lblood2",{offx:24,width:14,offy:58,height:20,decx:0,decy:0});
	bloodcoordinates.set("lblood3",{offx:44,width:13,offy:58,height:20,decx:0,decy:0});
	bloodcoordinates.set("lblood4",{offx:63,width:15,offy:53,height:25,decx:0,decy:0});
	bloodcoordinates.set("lblood5",{offx:83,width:13,offy:58,height:20,decx:0,decy:0});
	bloodcoordinates.set("lblood6",{offx:102,width:15,offy:60,height:18,decx:0,decy:0});
	bloodcoordinates.set("mblood1",{offx:2,width:13,offy:30,height:16,decx:0,decy:0});
	bloodcoordinates.set("mblood2",{offx:17,width:18,offy:30,height:16,decx:0,decy:0});
	bloodcoordinates.set("mblood3",{offx:40,width:22,offy:21,height:24,decx:0,decy:0});
	bloodcoordinates.set("mblood4",{offx:69,width:24,offy:10,height:35,decx:0,decy:0});
	bloodcoordinates.set("mblood5",{offx:101,width:33,offy:4,height:41,decx:0,decy:0});
	bloodcoordinates.set("mblood6",{offx:141,width:27,offy:8,height:36,decx:0,decy:0});
	bloodcoordinates.set("mblood7",{offx:174,width:27,offy:6,height:39,decx:0,decy:0});

    return bloodcoordinates;
}