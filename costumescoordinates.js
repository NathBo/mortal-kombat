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
	kitcoordinates.set("walk3",{offx:103,width:36,offy:136,height:103,decx:0,decy:-6});
	kitcoordinates.set("walk4",{offx:143,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk5",{offx:185,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk6",{offx:226,width:36,offy:137,height:102,decx:0,decy:-3});
	kitcoordinates.set("walk7",{offx:265,width:36,offy:137,height:102,decx:-1,decy:-3});
	kitcoordinates.set("walk8",{offx:308,width:36,offy:137,height:102,decx:0,decy:-4});
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
    kitcoordinates.set("decapitated1",{offx:530,width:20,offy:1732,height:90,decx:0,decy:0});
    kitcoordinates.set("decapitated2",{offx:558,width:26,offy:1732,height:90,decx:0,decy:0});
    kitcoordinates.set("decapitated3",{offx:589,width:31,offy:1732,height:90,decx:0,decy:0});
    kitcoordinates.set("decapitated4",{offx:626,width:47,offy:1732,height:90,decx:0,decy:0});
    kitcoordinates.set("decapitated5",{offx:678,width:56,offy:1732,height:90,decx:0,decy:0});
    kitcoordinates.set("decapitated6",{offx:741,width:75,offy:1732,height:90,decx:0,decy:0});
    kitcoordinates.set("stunned1",{offx:670,width:38,offy:1276,height:101,decx:0,decy:0});
    kitcoordinates.set("stunned2",{offx:714,width:36,offy:1276,height:101,decx:-2,decy:0});
    kitcoordinates.set("stunned3",{offx:760,width:40,offy:1276,height:101,decx:-4,decy:0});
    kitcoordinates.set("stunned4",{offx:805,width:36,offy:1276,height:101,decx:0,decy:0});
    kitcoordinates.set("stunned5",{offx:846,width:35,offy:1276,height:101,decx:2,decy:0});

	kitcoordinates.set("head",{offx:852,width:18,offy:1799,height:25,decx:0,decy:0});
	kitcoordinates.set("wave",{offx:553,width:32,offy:1442,height:38,decx:0,decy:0});
	

    return kitcoordinates;
}


function getraicoordinates(){
    var raicoordinates = new Map();
	raicoordinates.set("stand1",{offx:72,width:37,offy:14,height:107,decx:0,decy:0});
	raicoordinates.set("stand2",{offx:118,width:40,offy:14,height:107,decx:-2,decy:0});
	raicoordinates.set("stand3",{offx:163,width:44,offy:14,height:107,decx:-4,decy:0});
	raicoordinates.set("stand4",{offx:213,width:42,offy:14,height:107,decx:-2,decy:0});
	raicoordinates.set("stand5",{offx:260,width:45,offy:14,height:107,decx:-3,decy:0});
	raicoordinates.set("stand6",{offx:308,width:42,offy:14,height:107,decx:-2,decy:0});
	raicoordinates.set("stand7",{offx:357,width:42,offy:14,height:107,decx:-2,decy:0});
	raicoordinates.set("stand8",{offx:404,width:41,offy:14,height:107,decx:-3,decy:0});
	raicoordinates.set("crouching1",{offx:664,width:44,offy:45,height:76,decx:0,decy:-1});
	raicoordinates.set("crouching2",{offx:715,width:40,offy:63,height:58,decx:0,decy:-1});
	raicoordinates.set("walk1",{offx:14,width:40,offy:133,height:111,decx:0,decy:-3});
	raicoordinates.set("walk2",{offx:61,width:40,offy:133,height:111,decx:0,decy:-3});
	raicoordinates.set("walk3",{offx:107,width:40,offy:133,height:111,decx:0,decy:-2});
	raicoordinates.set("walk4",{offx:153,width:40,offy:133,height:111,decx:0,decy:-2});
	raicoordinates.set("walk5",{offx:199,width:42,offy:133,height:111,decx:0,decy:-1});
	raicoordinates.set("walk6",{offx:247,width:40,offy:133,height:111,decx:0,decy:-2});
	raicoordinates.set("walk7",{offx:294,width:40,offy:133,height:111,decx:0,decy:-3});
	raicoordinates.set("walk8",{offx:342,width:40,offy:133,height:111,decx:0,decy:-1});
	raicoordinates.set("jump1",{offx:403,width:46,offy:128,height:116,decx:0,decy:0});
	raicoordinates.set("jump2",{offx:455,width:48,offy:162,height:83,decx:0,decy:0});
	raicoordinates.set("jump3",{offx:517,width:48,offy:134,height:110,decx:0,decy:0});
	raicoordinates.set("roll1",{offx:570,width:37,offy:181,height:67,decx:0,decy:20});
	raicoordinates.set("roll2",{offx:611,width:45,offy:188,height:67,decx:0,decy:20});
	raicoordinates.set("roll3",{offx:661,width:53,offy:181,height:67,decx:0,decy:20});
	raicoordinates.set("roll4",{offx:719,width:37,offy:181,height:67,decx:0,decy:20});
	raicoordinates.set("roll5",{offx:761,width:44,offy:181,height:67,decx:0,decy:20});
	raicoordinates.set("roll6",{offx:813,width:50,offy:181,height:67,decx:0,decy:20});
	raicoordinates.set("roll7",{offx:869,width:43,offy:181,height:67,decx:0,decy:20});
	raicoordinates.set("lpunch1",{offx:13,width:38,offy:454,height:107,decx:0,decy:0});
	raicoordinates.set("lpunch2",{offx:57,width:45,offy:454,height:107,decx:0,decy:0});
	raicoordinates.set("lpunch3",{offx:109,width:63,offy:454,height:107,decx:2,decy:0});
	raicoordinates.set("hpunch1",{offx:13,width:38,offy:454,height:107,decx:0,decy:0});
	raicoordinates.set("hpunch2",{offx:690,width:43,offy:454,height:107,decx:0,decy:0});
	raicoordinates.set("hpunch3",{offx:739,width:66,offy:454,height:107,decx:2,decy:0});
	raicoordinates.set("lkick1",{offx:326,width:43,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("lkick2",{offx:374,width:43,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("lkick3",{offx:423,width:50,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("lkick4",{offx:478,width:59,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("lkick5",{offx:543,width:75,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("mkick1",{offx:326,width:43,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("mkick2",{offx:374,width:43,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("mkick3",{offx:423,width:50,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("mkick4",{offx:478,width:59,offy:695,height:107,decx:-8,decy:0});
	raicoordinates.set("mkick5",{offx:229,width:76,offy:695,height:107,decx:-10,decy:0});
	raicoordinates.set("hkick1",{offx:10,width:45,offy:827,height:89,decx:0,decy:0});
	raicoordinates.set("hkick2",{offx:59,width:57,offy:827,height:89,decx:0,decy:0});
	raicoordinates.set("hkick3",{offx:119,width:68,offy:827,height:89,decx:0,decy:0});
	raicoordinates.set("hkick4",{offx:194,width:65,offy:812,height:104,decx:0,decy:0});
	raicoordinates.set("hkick5",{offx:264,width:49,offy:812,height:104,decx:0,decy:0});
	raicoordinates.set("hkick6",{offx:319,width:33,offy:812,height:104,decx:0,decy:0});
	raicoordinates.set("hkick7",{offx:360,width:44,offy:812,height:104,decx:0,decy:0});
	raicoordinates.set("hurted1",{offx:10,width:49,offy:1121,height:105,decx:0,decy:0});
	raicoordinates.set("hurted2",{offx:60,width:44,offy:1121,height:105,decx:0,decy:0});
	raicoordinates.set("falling1",{offx:420,width:49,offy:1236,height:98,decx:0,decy:0});
	raicoordinates.set("falling2",{offx:474,width:84,offy:1236,height:98,decx:0,decy:0});
	raicoordinates.set("falling3",{offx:561,width:68,offy:1236,height:98,decx:0,decy:0});
	raicoordinates.set("grounded1",{offx:637,width:79,offy:1236,height:98,decx:0,decy:0});
	raicoordinates.set("grounded2",{offx:724,width:88,offy:1236,height:98,decx:0,decy:0});
	raicoordinates.set("getup1",{offx:442,width:41,offy:1342,height:107,decx:0,decy:0});
	raicoordinates.set("getup2",{offx:488,width:43,offy:1342,height:107,decx:0,decy:0});
	raicoordinates.set("getup3",{offx:537,width:42,offy:1342,height:107,decx:0,decy:0});
	raicoordinates.set("getup4",{offx:584,width:44,offy:1342,height:107,decx:0,decy:0});
	raicoordinates.set("blocking1",{offx:466,width:39,offy:15,height:106,decx:0,decy:0});
	raicoordinates.set("blocking2",{offx:510,width:42,offy:15,height:106,decx:0,decy:0});
	raicoordinates.set("cblocking1",{offx:773,width:40,offy:45,height:76,decx:0,decy:0});
	raicoordinates.set("cblocking2",{offx:818,width:44,offy:45,height:76,decx:0,decy:0});
	raicoordinates.set("churted1",{offx:672,width:50,offy:1155,height:71,decx:0,decy:0});
	raicoordinates.set("churted2",{offx:727,width:50,offy:1155,height:71,decx:0,decy:0});
	raicoordinates.set("clpunch1",{offx:355,width:46,offy:958,height:78,decx:0,decy:0});
	raicoordinates.set("clpunch2",{offx:405,width:62,offy:958,height:78,decx:0,decy:0});
	raicoordinates.set("huppercut1",{offx:14,width:40,offy:922,height:114,decx:0,decy:0});
	raicoordinates.set("huppercut2",{offx:61,width:62,offy:922,height:114,decx:0,decy:0});
	raicoordinates.set("huppercut3",{offx:129,width:57,offy:922,height:114,decx:0,decy:0});
	raicoordinates.set("huppercut4",{offx:190,width:49,offy:922,height:114,decx:0,decy:0});
	raicoordinates.set("huppercut5",{offx:292,width:41,offy:922,height:114,decx:0,decy:0});
	raicoordinates.set("clkick1",{offx:623,width:46,offy:983,height:52,decx:0,decy:0});
	raicoordinates.set("clkick2",{offx:674,width:64,offy:983,height:52,decx:0,decy:0});
	raicoordinates.set("cmkick1",{offx:623,width:46,offy:983,height:52,decx:0,decy:0});
	raicoordinates.set("cmkick2",{offx:623,width:46,offy:983,height:52,decx:0,decy:0});
	raicoordinates.set("cmkick3",{offx:674,width:64,offy:983,height:52,decx:0,decy:0});
	//raicoordinates.set("cmkick3",{offx:539,width:62,offy:965,height:71,decx:6,decy:-2});
	raicoordinates.set("jpunch1",{offx:13,width:69,offy:1044,height:70,decx:-6,decy:10});
	raicoordinates.set("jpunch2",{offx:88,width:93,offy:1043,height:72,decx:-9,decy:10});
	raicoordinates.set("jskick1",{offx:201,width:67,offy:1043,height:72,decx:0,decy:8});
	raicoordinates.set("jskick2",{offx:274,width:79,offy:1043,height:72,decx:0,decy:8});
	raicoordinates.set("jkick1",{offx:376,width:58,offy:1046,height:68,decx:0,decy:10});
	raicoordinates.set("jkick2",{offx:440,width:68,offy:1046,height:68,decx:0,decy:10});
	raicoordinates.set("grabbing1",{offx:61,width:69,offy:567,height:123,decx:0,decy:0});
	raicoordinates.set("grabbing2",{offx:135,width:60,offy:567,height:123,decx:0,decy:0});
	raicoordinates.set("grabbing3",{offx:202,width:40,offy:567,height:123,decx:0,decy:0});
	raicoordinates.set("grabbing4",{offx:249,width:45,offy:567,height:123,decx:0,decy:0});
	raicoordinates.set("grabbing5",{offx:300,width:47,offy:567,height:123,decx:0,decy:0});
	raicoordinates.set("grabbed1",{offx:13,width:41,offy:1350,height:98,decx:0,decy:0});
	raicoordinates.set("grabbed2",{offx:57,width:56,offy:1350,height:98,decx:0,decy:0});
	raicoordinates.set("grabbed3",{offx:117,width:60,offy:1350,height:98,decx:0,decy:0});
	raicoordinates.set("grabbed4",{offx:183,width:52,offy:1350,height:98,decx:0,decy:0});
	raicoordinates.set("victory1",{offx:14,width:62,offy:252,height:118,decx:-12,decy:0});
	raicoordinates.set("victory2",{offx:83,width:39,offy:252,height:118,decx:0,decy:0});
	raicoordinates.set("victory3",{offx:129,width:39,offy:252,height:118,decx:0,decy:0});
	raicoordinates.set("victory4",{offx:175,width:40,offy:252,height:118,decx:0,decy:0});
	raicoordinates.set("victory5",{offx:223,width:59,offy:252,height:118,decx:-10,decy:0});
	raicoordinates.set("victory6",{offx:292,width:59,offy:252,height:118,decx:-10,decy:0});
    raicoordinates.set("decapitated1",{offx:623,width:24,offy:1808,height:97,decx:0,decy:0});
    raicoordinates.set("decapitated2",{offx:649,width:29,offy:1808,height:97,decx:0,decy:0});
    raicoordinates.set("decapitated3",{offx:684,width:31,offy:1808,height:97,decx:0,decy:0});
    raicoordinates.set("decapitated4",{offx:721,width:37,offy:1808,height:97,decx:0,decy:0});
    raicoordinates.set("decapitated5",{offx:764,width:47,offy:1808,height:97,decx:0,decy:0});
    raicoordinates.set("decapitated6",{offx:818,width:81,offy:1808,height:97,decx:0,decy:0});
    raicoordinates.set("stunned1",{offx:781,width:41,offy:1342,height:107,decx:0,decy:0});
    raicoordinates.set("stunned2",{offx:827,width:38,offy:1342,height:107,decx:0,decy:0});
    raicoordinates.set("stunned3",{offx:871,width:38,offy:1342,height:107,decx:0,decy:0});
    raicoordinates.set("stunned4",{offx:915,width:38,offy:1342,height:107,decx:0,decy:0});
    raicoordinates.set("stunned5",{offx:959,width:43,offy:1342,height:107,decx:0,decy:0});
	raicoordinates.set("stunned6",{offx:1008,width:46,offy:1342,height:107,decx:0,decy:0});
	raicoordinates.set("boltthrow1",{offx:447,width:43,offy:1457,height:104,decx:0,decy:0});
    raicoordinates.set("boltthrow2",{offx:497,width:50,offy:1457,height:104,decx:0,decy:0});
	raicoordinates.set("bolt1",{offx:263,width:45,offy:1645,height:17,decx:0,decy:0});
	raicoordinates.set("bolt2",{offx:314,width:45,offy:1645,height:17,decx:0,decy:0});
	raicoordinates.set("bolt3",{offx:365,width:45,offy:1645,height:17,decx:0,decy:0});
	raicoordinates.set("bolt4",{offx:415,width:45,offy:1645,height:17,decx:0,decy:0});
	raicoordinates.set("thundergod1",{offx:166,width:57,offy:1467,height:95,decx:0,decy:0});
	raicoordinates.set("thundergod2",{offx:228,width:87,offy:1467,height:95,decx:0,decy:0});
	raicoordinates.set("thundergod3",{offx:320,width:106,offy:1467,height:95,decx:0,decy:50});
	raicoordinates.set("elecgrab1",{offx:12,width:62,offy:1455,height:106,decx:0,decy:0});
	raicoordinates.set("elecgrab2",{offx:80,width:59,offy:1455,height:106,decx:0,decy:0});

	raicoordinates.set("head",{offx:908,width:22,offy:1885,height:21,decx:0,decy:0});
	

    return raicoordinates;
}


function getscocoordinates(){
    var scocoordinates = new Map();
	scocoordinates.set("stand1",{offx:83,width:43,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("stand2",{offx:135,width:44,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("stand3",{offx:189,width:43,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("stand4",{offx:241,width:43,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("stand5",{offx:294,width:43,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("stand6",{offx:346,width:43,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("crouching1",{offx:629,width:39,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("crouching2",{offx:690,width:39,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("walk1",{offx:14,width:42,offy:129,height:110,decx:0,decy:-3});
	scocoordinates.set("walk2",{offx:64,width:42,offy:129,height:110,decx:0,decy:-4});
	scocoordinates.set("walk3",{offx:115,width:41,offy:129,height:110,decx:0,decy:-6});
	scocoordinates.set("walk4",{offx:164,width:41,offy:129,height:110,decx:0,decy:-2});
	scocoordinates.set("walk5",{offx:214,width:41,offy:129,height:110,decx:0,decy:-1});
	scocoordinates.set("walk6",{offx:264,width:41,offy:129,height:110,decx:0,decy:-2});
	scocoordinates.set("walk7",{offx:314,width:41,offy:129,height:110,decx:0,decy:-3});
	scocoordinates.set("walk8",{offx:363,width:41,offy:129,height:110,decx:0,decy:-3});
	scocoordinates.set("walk9",{offx:412,width:49,offy:129,height:110,decx:0,decy:-2});
	scocoordinates.set("jump1",{offx:485,width:45,offy:129,height:110,decx:0,decy:0});
	scocoordinates.set("jump2",{offx:539,width:47,offy:161,height:78,decx:0,decy:0});
	scocoordinates.set("jump3",{offx:610,width:36,offy:130,height:109,decx:0,decy:0});
	scocoordinates.set("roll1",{offx:653,width:39,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("roll2",{offx:698,width:38,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("roll3",{offx:743,width:47,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("roll4",{offx:793,width:37,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("roll5",{offx:834,width:38,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("roll6",{offx:877,width:38,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("roll7",{offx:920,width:43,offy:186,height:53,decx:0,decy:20});
	scocoordinates.set("lpunch1",{offx:15,width:35,offy:251,height:104,decx:4,decy:0});
	scocoordinates.set("lpunch2",{offx:58,width:42,offy:250,height:105,decx:4,decy:0});
	scocoordinates.set("lpunch3",{offx:107,width:62,offy:251,height:105,decx:6,decy:0});
	scocoordinates.set("hpunch1",{offx:618,width:35,offy:249,height:106,decx:0,decy:0});
	scocoordinates.set("hpunch2",{offx:661,width:48,offy:249,height:106,decx:0,decy:0});
	scocoordinates.set("hpunch3",{offx:717,width:62,offy:249,height:106,decx:1,decy:0});
	scocoordinates.set("lkick1",{offx:15,width:40,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("lkick2",{offx:62,width:44,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("lkick3",{offx:113,width:38,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("lkick4",{offx:459,width:76,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("mkick1",{offx:15,width:40,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("mkick2",{offx:62,width:44,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("mkick3",{offx:113,width:38,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("mkick4",{offx:159,width:72,offy:468,height:106,decx:-14,decy:0});
	scocoordinates.set("hkick1",{offx:15,width:31,offy:583,height:95,decx:0,decy:0});
	scocoordinates.set("hkick2",{offx:53,width:41,offy:583,height:95,decx:0,decy:0});
	scocoordinates.set("hkick3",{offx:102,width:56,offy:583,height:95,decx:0,decy:0});
	scocoordinates.set("hkick4",{offx:165,width:65,offy:583,height:95,decx:0,decy:0});
	scocoordinates.set("hkick5",{offx:237,width:53,offy:583,height:95,decx:0,decy:0});
	scocoordinates.set("hkick6",{offx:298,width:37,offy:581,height:97,decx:0,decy:0});
	scocoordinates.set("hurted1",{offx:15,width:45,offy:918,height:98,decx:0,decy:0});
	scocoordinates.set("hurted2",{offx:68,width:47,offy:918,height:98,decx:0,decy:0});
	scocoordinates.set("falling1",{offx:14,width:38,offy:1030,height:95,decx:0,decy:0});
	scocoordinates.set("falling2",{offx:60,width:60,offy:1030,height:95,decx:0,decy:12});
	scocoordinates.set("falling3",{offx:128,width:50,offy:1030,height:95,decx:0,decy:0});
	scocoordinates.set("grounded1",{offx:186,width:73,offy:1065,height:58,decx:0,decy:-15});
	scocoordinates.set("grounded2",{offx:267,width:83,offy:1065,height:58,decx:0,decy:-8});
	scocoordinates.set("getup1",{offx:760,width:41,offy:1047,height:78,decx:0,decy:0});
	scocoordinates.set("getup2",{offx:810,width:72,offy:1047,height:78,decx:0,decy:0});
	scocoordinates.set("getup3",{offx:891,width:63,offy:1047,height:78,decx:0,decy:0});
	scocoordinates.set("getup4",{offx:964,width:32,offy:1047,height:78,decx:0,decy:0});
	scocoordinates.set("blocking1",{offx:416,width:36,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("blocking2",{offx:461,width:36,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("cblocking1",{offx:753,width:37,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("cblocking2",{offx:799,width:40,offy:17,height:103,decx:0,decy:0});
	scocoordinates.set("churted1",{offx:510,width:43,offy:946,height:71,decx:0,decy:0});
	scocoordinates.set("churted2",{offx:562,width:46,offy:946,height:71,decx:0,decy:0});
	scocoordinates.set("clpunch1",{offx:347,width:55,offy:736,height:73,decx:0,decy:0});
	scocoordinates.set("clpunch2",{offx:411,width:61,offy:736,height:73,decx:0,decy:0});
	scocoordinates.set("huppercut1",{offx:15,width:36,offy:687,height:122,decx:0,decy:0});
	scocoordinates.set("huppercut2",{offx:58,width:70,offy:687,height:122,decx:0,decy:0});
	scocoordinates.set("huppercut3",{offx:138,width:53,offy:687,height:122,decx:0,decy:0});
	scocoordinates.set("huppercut4",{offx:198,width:36,offy:687,height:122,decx:0,decy:0});
	scocoordinates.set("huppercut5",{offx:293,width:35,offy:687,height:122,decx:0,decy:0});
	scocoordinates.set("clkick1",{offx:838,width:49,offy:752,height:57,decx:0,decy:0});
	scocoordinates.set("clkick2",{offx:896,width:67,offy:752,height:57,decx:0,decy:0});
	scocoordinates.set("cmkick1",{offx:502,width:38,offy:752,height:57,decx:0,decy:0});
	scocoordinates.set("cmkick2",{offx:549,width:61,offy:752,height:57,decx:0,decy:0});
	scocoordinates.set("cmkick3",{offx:618,width:67,offy:733,height:76,decx:0,decy:0});
	//scocoordinates.set("cmkick3",{offx:539,width:62,offy:965,height:71,decx:6,decy:-2});
	scocoordinates.set("jpunch1",{offx:15,width:60,offy:840,height:64,decx:-6,decy:10});
	scocoordinates.set("jpunch2",{offx:84,width:89,offy:838,height:66,decx:-14,decy:10});
	scocoordinates.set("jskick1",{offx:201,width:47,offy:823,height:81,decx:0,decy:8});
	scocoordinates.set("jskick2",{offx:257,width:62,offy:818,height:86,decx:0,decy:8});
	scocoordinates.set("jkick1",{offx:353,width:55,offy:828,height:76,decx:0,decy:10});
	scocoordinates.set("jkick2",{offx:416,width:77,offy:828,height:76,decx:0,decy:10});
	scocoordinates.set("grabbing1",{offx:14,width:48,offy:365,height:95,decx:0,decy:0});
	scocoordinates.set("grabbing2",{offx:70,width:50,offy:365,height:95,decx:0,decy:0});
	scocoordinates.set("grabbing3",{offx:128,width:45,offy:365,height:95,decx:0,decy:0});
	scocoordinates.set("grabbing4",{offx:181,width:49,offy:365,height:95,decx:0,decy:0});
	scocoordinates.set("grabbing5",{offx:238,width:49,offy:365,height:95,decx:0,decy:0});
	scocoordinates.set("grabbed1",{offx:376,width:35,offy:1025,height:99,decx:0,decy:0});
	scocoordinates.set("grabbed2",{offx:418,width:34,offy:1025,height:99,decx:0,decy:0});
	scocoordinates.set("grabbed3",{offx:459,width:46,offy:1025,height:99,decx:0,decy:0});
	scocoordinates.set("grabbed4",{offx:513,width:46,offy:1025,height:99,decx:0,decy:0});
	scocoordinates.set("victory1",{offx:986,width:44,offy:134,height:105,decx:0,decy:0});
	scocoordinates.set("victory2",{offx:1039,width:41,offy:134,height:105,decx:0,decy:0});
    scocoordinates.set("decapitated1",{offx:15,width:15,offy:1716,height:92,decx:0,decy:0});
    scocoordinates.set("decapitated2",{offx:38,width:24,offy:1716,height:92,decx:0,decy:0});
    scocoordinates.set("decapitated3",{offx:68,width:25,offy:1716,height:92,decx:0,decy:0});
    scocoordinates.set("decapitated4",{offx:100,width:31,offy:1716,height:92,decx:0,decy:0});
    scocoordinates.set("decapitated5",{offx:138,width:69,offy:1716,height:92,decx:0,decy:0});
    scocoordinates.set("decapitated6",{offx:214,width:74,offy:1716,height:92,decx:0,decy:0});
    scocoordinates.set("stunned1",{offx:138,width:35,offy:1136,height:99,decx:-3,decy:0});
    scocoordinates.set("stunned2",{offx:183,width:36,offy:1136,height:99,decx:-3,decy:0});
    scocoordinates.set("stunned3",{offx:227,width:32,offy:1136,height:99,decx:0,decy:0});
    scocoordinates.set("stunned4",{offx:269,width:33,offy:1134,height:101,decx:1,decy:0});
    scocoordinates.set("stunned5",{offx:310,width:44,offy:1134,height:101,decx:0,decy:0});
	scocoordinates.set("spear_throw1",{offx:15,width:52,offy:1245,height:101,decx:0,decy:0});
	scocoordinates.set("spear_throw2",{offx:76,width:54,offy:1245,height:101,decx:0,decy:0});
	scocoordinates.set("spear_throw3",{offx:138,width:76,offy:1245,height:101,decx:0,decy:0});
	scocoordinates.set("spear_throw4",{offx:221,width:60,offy:1245,height:101,decx:0,decy:0});
	scocoordinates.set("spear_throw5",{offx:289,width:41,offy:1244,height:102,decx:0,decy:0});
	scocoordinates.set("spear_throw6",{offx:338,width:48,offy:1245,height:101,decx:0,decy:0});
	scocoordinates.set("spear",{offx:396,width:27,offy:1276,height:8,decx:0,decy:0});
	scocoordinates.set("spear_nohead",{offx:516,width:21,offy:1309,height:8,decx:0,decy:0});

	scocoordinates.set("head",{offx:296,width:14,offy:1791,height:17,decx:0,decy:0});
	

    return scocoordinates;
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
	bloodcoordinates.set("hblood1",{offx:2,width:23,offy:178,height:19,decx:0,decy:-15});
	bloodcoordinates.set("hblood2",{offx:35,width:39,offy:171,height:25,decx:0,decy:-15});
	bloodcoordinates.set("hblood3",{offx:85,width:60,offy:157,height:39,decx:0,decy:-15});
	bloodcoordinates.set("hblood4",{offx:162,width:82,offy:143,height:54,decx:0,decy:-15});
	bloodcoordinates.set("hblood5",{offx:260,width:94,offy:133,height:64,decx:0,decy:-15});
	bloodcoordinates.set("hblood6",{offx:374,width:117,offy:120,height:77,decx:0,decy:-15});
	bloodcoordinates.set("organ1",{offx:55,width:19,offy:366,height:18,decx:0,decy:0});
	bloodcoordinates.set("organ2",{offx:89,width:17,offy:366,height:18,decx:0,decy:0});
	bloodcoordinates.set("organ3",{offx:293,width:11,offy:359,height:25,decx:0,decy:0});
	bloodcoordinates.set("organ4",{offx:5,width:15,offy:402,height:19,decx:0,decy:0});
	bloodcoordinates.set("organ5",{offx:201,width:11,offy:411,height:10,decx:0,decy:0});
	bloodcoordinates.set("organ6",{offx:351,width:16,offy:403,height:18,decx:0,decy:0});

    return bloodcoordinates;
}