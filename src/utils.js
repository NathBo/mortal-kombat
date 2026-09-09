var end_mini_game = false;
var mini_game_score = 0;

var sounds_eff = new Map();

var musiqueon = true; var soundeffon = true;

function play_sound_eff(s,volume = 1.){
		if(!soundeffon){return;}
		let l = sounds_eff.get(s);
		let n = Math.floor(Math.random()*l.length);
		l[n].volume = volume;
		l[n].currentTime = 0; l[n].play();
	}