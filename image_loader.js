var lifebarpng=new Image();lifebarpng.src = 'ressource/ui/barlife.png';

	var kitpng=new Image();kitpng.src = 'ressource/characters/kitana.png';
	var kit2png=new Image();kit2png.src = 'ressource/characters/kitana2.png';
	var kitskins = [kitpng,kit2png];
	var raipng = new Image();raipng.src = 'ressource/characters/raiden.png';
	var rai2png = new Image();rai2png.src = 'ressource/characters/raiden2.png';
	var raiskins = [raipng,rai2png];
    var scopng = new Image();scopng.src = 'ressource/characters/scorpion.png';
	var sco2png = new Image();sco2png.src = 'ressource/characters/scorpion2.png';
	var scoskins = [scopng,sco2png];
	var subpng = new Image();subpng.src = 'ressource/characters/subzero.png';
	var sub2png = new Image();sub2png.src = 'ressource/characters/subzero2.png';
    var subskins = [subpng,sub2png];

	var fanpng=new Image();fanpng.src = 'ressource/characters/fan.png';
	var fatalitypng=new Image();fatalitypng.src = 'ressource/icons/fatality.png';
	var roundwoniconpng=new Image();roundwoniconpng.src = 'ressource/icons/round_won_icon.png';
	var fightrediconpng=new Image();fightrediconpng.src = 'ressource/icons/fightred.png';
	var fightyellowiconpng=new Image();fightyellowiconpng.src = 'ressource/icons/fightyellow.png';
	var finishherredpng=new Image();finishherredpng.src = 'ressource/icons/finishherred.png';
	var finishheryellowpng=new Image();finishheryellowpng.src = 'ressource/icons/finishheryellow.png';
	var finishhimredpng=new Image();finishhimredpng.src = 'ressource/icons/finishhimred.png';
	var finishhimyellowpng=new Image();finishhimyellowpng.src = 'ressource/icons/finishhimyellow.png';
	var fanthrowiconpng=new Image();fanthrowiconpng.src = 'ressource/icons/fanthrow_icon.png';
	var fanswipeiconpng=new Image();fanswipeiconpng.src = 'ressource/icons/fanswipe_icon.png';
	var fanlifticonpng=new Image();fanlifticonpng.src = 'ressource/icons/fanlift_icon.png';
	var squarepunchiconpng=new Image();squarepunchiconpng.src = 'ressource/icons/squarepunch_icon.png';
	var teleporticonpng=new Image();teleporticonpng.src = 'ressource/icons/teleport_icon.png';
	var boltthrowiconpng=new Image();boltthrowiconpng.src = 'ressource/icons/boltthrow_icon.png';
	var thundergodiconpng=new Image();thundergodiconpng.src = 'ressource/icons/thundergod_icon.png';
	var elecgrabiconpng=new Image();elecgrabiconpng.src = 'ressource/icons/elecgrab_icon.png';
	var hellgatesiconpng=new Image();hellgatesiconpng.src = 'ressource/icons/hell_gates_icon.png';
	var spearthrowiconpng=new Image();spearthrowiconpng.src = 'ressource/icons/spear_throw_icon.png';
	var legtakedowniconpng=new Image();legtakedowniconpng.src = 'ressource/icons/leg_takedown_icon.png';
	var slideiconpng=new Image();slideiconpng.src = 'ressource/icons/slide_icon.png';
	var iceballiconpng=new Image();iceballiconpng.src = 'ressource/icons/iceball_icon.png';
	var iceflaskiconpng=new Image();iceflaskiconpng.src = 'ressource/icons/iceflask_icon.png';

	var bloodpng = new Image();bloodpng.src = 'ressource/visual_effects/blood.png';

	var towergroundpng = new Image();towergroundpng.src = 'ressource/stages/towerground.png';
	var towerbackgroundpng = new Image();towerbackgroundpng.src = 'ressource/stages/towerbackground.png';
	var towerstructurepng = new Image();towerstructurepng.src = 'ressource/stages/towerstructure.png';
	var deadpoolpng = new Image();deadpoolpng.src = 'ressource/stages/deadpool.png';
	var wastegroundpng = new Image();wastegroundpng.src = 'ressource/stages/wasteground.png';
	var wastebackgroundpng = new Image();wastebackgroundpng.src = 'ressource/stages/wastebackground.png';
	var wastestructurepng = new Image();wastestructurepng.src = 'ressource/stages/wastestructure.png';
	var forestgroundpng = new Image();forestgroundpng.src = 'ressource/stages/livingforestground.png';
	var forestbackgroundpng = new Image();forestbackgroundpng.src = 'ressource/stages/livingforestbackground.png';
	var gorobackgroundpng = new Image();gorobackgroundpng.src = 'ressource/stages/gorobackground.png';
	var gorostructurepng = new Image();gorostructurepng.src = 'ressource/stages/gorostructure.png';
	var stagesstruct = [towerstructurepng, deadpoolpng, wastestructurepng, forestgroundpng, gorostructurepng];
	var stagesground = [towergroundpng, null, wastegroundpng, null, null];
	var stagesbackground = [towerbackgroundpng, null, wastebackgroundpng, forestbackgroundpng, gorobackgroundpng];
	var grounds = [240, 220, 240, 240, 230];
	var stagesizes = [720,670, 720,760, 735];
	var backgroundscroll = [0.2,0,0,0.2, 0.5];

	var characterscreenpng = new Image();characterscreenpng.src = 'ressource/stages/character_screen.png';
	var raideniconpng=new Image();raideniconpng.src = 'ressource/icons/raiden.png';
	var kitanaiconpng=new Image();kitanaiconpng.src = 'ressource/icons/kitana.png';
	var scorpioniconpng=new Image();scorpioniconpng.src = 'ressource/icons/scorpion.png';
	var boticonpng=new Image();boticonpng.src = 'ressource/icons/bot.png';
	var playericonpng=new Image();playericonpng.src = 'ressource/icons/player.png';
	var logopng=new Image();logopng.src = 'ressource/ui/logo.png';


    var kitcoordinates = getkitcoordinates();
	var raicoordinates = getraicoordinates();
    var scocoordinates = getscocoordinates();
	var subcoordinates = getsubcoordinates();

	var bloodcoordinates = getbloodcoordinates();

	

	