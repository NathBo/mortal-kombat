function entre(a,b,c){
	return (a>=b && a<=c)
}

function distance(a,b){
	if (a<b){return b-a;}
	return a-b
}

function signe(a){
	if(a<0){return -1}
	else if(a==0){return 0}
	else{return 1}
}

function mod(a,n){
	if(a<0){return (a%n)+n}
	else{return a%n}
}

function minvalabs(a,b){
	if(Math.abs(a)<Math.abs(b)){return a}
	else{return Math.abs(b)*signe(a)}
}

function sum(a){
	var rep = 0;
	for(var i=0;i<a.length;i++){
		rep+=a[i];
	}
	return rep;
}

function randomInt(mini, maxi)
{
     var nb = mini + (maxi+1-mini)*Math.random();
     return Math.floor(nb);
}

Array.prototype.shuffle = function(n)
{
     if(!n)
          n = this.length;
     if(n > 1)
     {
          var i = randomInt(0, n-1);
          var tmp = this[i];
          this[i] = this[n-1];
          this[n-1] = tmp;
          this.shuffle(n-1);
     }
}

function getrandomwithcoeff(a){
	var cb = Math.random()*sum(a);
	for(var i=0;i<a.length;i++){
		if(cb<=a[i]){return i;}
		cb-=a[i];
	}
}


function printAtWordWrap( context , text, x, y, lineHeight, fitWidth)
{
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0)
    {
        context.fillText( text, x, y );
        return;
    }
    var words = text.split(' ');
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length)
    {
        var str = words.slice(0,idx).join(' ');
        var w = context.measureText(str).width;
        if ( w > fitWidth )
        {
            if (idx==1)
            {
                idx=2;
            }
            context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        }
        else
        {idx++;}
    }
    if  (idx > 0)
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
}


function main(){
	function resizecanvas(){
		Width= window.innerWidth;
		Height=window.innerHeight;
		  if(Height>Width*500/1024){Height=Width*500/1024;canvas.style.left = "0px";canvas.style.top = (window.innerHeight-Height)/2+"px";decalage=0;wdecalagey=(window.innerHeight-Height)/2;}
		  else if(Width*500/1024>Height){Width=Height/500*1024;canvas.style.left = (window.innerWidth-Width)/2+"px";decalage=(window.innerWidth-Width)/2; canvas.style.top = "0px";wdecalagey=0;}
		  canvas.style.width  = Width+'px';
		  canvas.style.height  = Height+'px';
	}

	function lag_game(n){
		gamefreeze = n;
		still_draw = true;
	}

	class Blood
	{
		constructor(x,y,orientation,bloodtype){
			this.x = x; this.y = y; this.orientation = orientation;
			this.bloodtype = bloodtype;
			if(this.bloodtype=="lblood"){this.totdur = 18;this.nframes = 6;this.vitesse=0.8;}
			else if(this.bloodtype=="mblood"){this.totdur = 28;this.nframes = 7;this.vitesse=0.1;}
			else if(this.bloodtype=="hblood"){this.totdur = 20;this.nframes = 6;this.vitesse=0;}
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = false;
		}

		loop(){}

		afficher(){
			if(this.dur==0){this.delete();return;}
			let n = Math.floor((this.totdur - this.dur)/this.totdur*this.nframes)+1;
			let cost = this.bloodtype+n;
			let coords = bloodcoordinates.get(cost);
			ctx.scale(2*this.orientation,2);
			ctx.drawImage(bloodpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*coords.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			this.dur--;
			this.x-=this.vitesse*this.orientation;
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class Fan{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=22;
			this.height=44;
			this.totdur = 60;this.vitesse=6;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.rotation = 0; this.rotationspeed = 16;
			this.dangerous = true;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3*(other.crouching<=3),this.height/2+other.charac.height/3)){other.hurt(this,stats);this.dur=1;}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){other.hurt(this,stats);this.dur=1;}
				}
			}
		}

		afficher(){
			this.rotation = (this.rotation+this.rotationspeed)%360;
			ctx.save();
			var x = (this.x+decalagex-camerax-this.orientation*this.width/2+shakex)*this.orientation;
			var y = ground-this.y+shakey-45;
			ctx.scale(2*this.orientation,2);
			ctx.translate(x+10,y+22);
			ctx.rotate(Math.PI*this.rotation/180);
			ctx.drawImage(fanpng,-10,-22);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			ctx.restore();
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}


	class Bolt{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=40;
			this.height=17;
			this.totdur = 40;this.vitesse=8;
			this.costcpt = 0;
			this.framepercost = 3;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(other.crouching<=3 && entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3,this.height/2+other.charac.height/3)){other.hurt(this,stats);this.dur=1;}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){other.hurt(this,stats);this.dur=1;}
				}
			}
		}

		afficher(){
			this.costcpt = (this.costcpt+1)%(4*this.framepercost);
			this.costume = "bolt"+(Math.floor(this.costcpt/this.framepercost)+1);
			this.rotation = (this.rotation+this.rotationspeed)%360;
			ctx.scale(2*this.orientation,2);
			var coords = raicoordinates.get(this.costume);
			ctx.drawImage(raipng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class Knife{
		constructor(x,y,orientation,other,stats, vitesse = 6){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=40;
			this.height=17;
			this.totdur = 40;this.vitesse=vitesse;
			this.costcpt = 0;
			this.framepercost = 3;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			knife_stats.hurty = this.vitesse-2; var other = this.other;
			knife_stats.degats = Math.floor(this.vitesse);
			if(other.invincibilite==0 &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(other.crouching<=3 && entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3,this.height/2+other.charac.height/3)){other.hurt(this,knife_stats);this.dur=1;}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){other.hurt(this,knife_stats);this.dur=1;}
				}
			}
		}

		afficher(){
			this.costcpt = (this.costcpt+1)%(4*this.framepercost);
			this.costume = "knife"
			this.rotation = (this.rotation+this.rotationspeed)%360;
			ctx.scale(2*this.orientation,2);
			var coords = milcoordinates.get(this.costume);
			ctx.drawImage(milpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class HomingKnife{
		constructor(x,y,orientation,other,stats, vitesse = 4){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=40;
			this.height=19;
			this.totdur = 80;this.vitesse=vitesse; this.vitessey = 1;
			this.costcpt = 0;
			this.framepercost = 3;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			var stats = this.stats; var other = this.other;
			if(Math.abs(other.y-this.y)>10){
				this.y+=this.vitessey*signe(other.y-this.y);
			}
			if(other.invincibilite==0 &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3*(other.crouching<=3),this.height/2+other.charac.height/3)){other.hurt(this,stats);this.dur=1;}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){other.hurt(this,stats);this.dur=1;}
				}
			}
		}

		afficher(){
			this.costcpt = (this.costcpt+1)%(4*this.framepercost);
			this.costume = "knife"
			this.rotation = (this.rotation+this.rotationspeed)%360;
			ctx.scale(2*this.orientation,2);
			var coords = milcoordinates.get(this.costume);
			ctx.drawImage(milpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}




	class Iceball{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=60;
			this.height=20;
			this.totdur = 50;this.vitesse=5;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(other.crouching<=3 && entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3,this.height/2+other.charac.height/3)){other.hurt(this,stats);this.dur=1;}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){other.hurt(this,stats);this.dur=1;}
				}
			}
		}

		afficher(){
			this.costume = "iceball";
			ctx.scale(2*this.orientation,2);
			var coords = subcoordinates.get(this.costume);
			ctx.drawImage(subpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class Fireball{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=30;
			this.height=16;
			this.totdur = 50;this.vitesse=7;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(other.crouching<=3 && entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3,this.height/2+other.charac.height/3)){other.hurt(this,stats);this.dur=1;}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){other.hurt(this,stats);this.dur=1;}
				}
			}
		}

		afficher(){
			this.costume = "fireball";
			ctx.scale(2*this.orientation,2);
			var coords = liucoordinates.get(this.costume);
			ctx.drawImage(liupng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}


	class IceFlask{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=64;
			this.height=20;
			this.totdur = 120;this.vitesse=0;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 && this.dangerous &&entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					other.hurt(this,stats);this.dur=20;
				}
			}
		}

		afficher(){
			if(this.dur<=3){
				this.costume = "oiceflask3";
			}
			if(this.dur<=6){
				this.dangerous=false;
				this.costume = "oiceflask2";
			}
			else{
				this.costume = "oiceflask1";
			}
			ctx.scale(2*this.orientation,2);
			var coords = subcoordinates.get(this.costume);
			ctx.drawImage(subpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class IceGrenade{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=18;
			this.height=30;
			this.totdur = 70;this.vitesse=7;
			this.costcpt = 0;
			this.framepercost = 3;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = false;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			var other = this.other;
			if(entre((other.x-this.x)*this.orientation,-this.width/2-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3,this.height/2+other.charac.height/3)){this.dur=-20;shake_screen(10,6);}
			}
		}

		afficher(){
			if(this.dur>0){
				this.costcpt = (this.costcpt+1)%(2*this.framepercost);
				this.costume = "oicegrenade"+(Math.floor(this.costcpt/this.framepercost)+1);
				ctx.scale(2*this.orientation,2);
				var coords = subcoordinates.get(this.costume);
				ctx.drawImage(subpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(1,1);
				if(gamefreeze==0){this.dur--;}
				if(this.dur==0){this.delete();return;}
			}
			else{
				if(gamefreeze==0){this.dur++;}
				if(this.dur==0){this.other.explode();this.delete();return;}
			}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}


	class Spear{
		constructor(x,y,orientation,other,stats,owner){
			this.x = x; this.y = y; this.orientation = orientation; this.owner = owner;
			this.other = other;
			this.width=25;
			this.height=8;
			this.totdur = 60;this.vitesse=8;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.dangerous = true;
			
		}

		loop(){
			if(this.dangerous){this.x += this.orientation*this.vitesse;}
			else{this.x -= this.orientation*this.vitesse;}
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 && this.dangerous &&entre((other.x-this.x)*this.orientation,-other.charac.width/2,this.width/2+other.charac.width/2)){
				if(other.y==0){
					if(entre((other.y+other.charac.height/2-this.y),-this.height/2-other.charac.height/3*(other.crouching<=3),this.height/2+other.charac.height/3)){
						if(this.owner.mov == "spear_throw"){spear_stats.hitstun = this.totdur-this.dur + 25;this.owner.movlag = stats.elag-40;other.hurt(this,spear_stats);this.dur=Math.max(this.totdur-10-this.dur,1);this.x=other.x-this.orientation*16;this.dangerous=false;}
						else{other.hurt(this,stats);this.dur=1;}
					}
				}
				else{
					if(entre((other.y+other.charac.height/3-this.y),-this.height/2-other.charac.height/6,this.height/2+other.charac.height/6)){
						if(this.owner.mov == "spear_throw"){spear_stats.hitstun = this.totdur-this.dur + 25;this.owner.movlag = stats.elag-40;other.hurt(this,spear_stats);this.dur=Math.max(this.totdur-10-this.dur,1);this.x=other.x-this.orientation*16;this.dangerous=false;}
						else{other.hurt(this,stats);this.dur=1;}
					}
				}
			}
		}

		afficher(){
			this.costcpt = (this.costcpt+1)%(4*this.framepercost);
			if(this.dangerous){this.costume = "spear";}
			else{this.costume = "spear_nohead";}
			this.rotation = (this.rotation+this.rotationspeed)%360;
			ctx.scale(2*this.orientation,2);
			var coords = scocoordinates.get(this.costume);
			if(this.owner.mov == "spear_throw"){
				ctx.fillStyle = "rgb(230,170,140)";
				ctx.fillRect((this.owner.x+this.owner.orientation*(45+10*this.dangerous)+decalagex-camerax)*this.orientation,ground-this.y-5,Math.abs(this.x-this.owner.x)-50-10*this.dangerous,1);
				ctx.fillStyle = "rgb(140,114,82)";
				ctx.fillRect(this.owner.x+this.owner.orientation*(45+10*this.dangerous)+decalagex-camerax,ground-this.y-4,Math.abs(this.x-this.owner.x)-50-10*this.dangerous,1);	
			}
			ctx.drawImage(scopng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur<=0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class ScorpionFlame{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=22;
			this.height=44;
			this.totdur = 31;this.vitesse=6;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.rotation = 0; this.rotationspeed = 16;
			this.dangerous = false;
			this.explosion = 0;
			
		}

		loop(){
			if(this.y>0){this.y -= this.vitesse;this.x += this.orientation*this.vitesse;}
			else {this.y=0;this.explosion++;this.dur--;this.x = this.other.x;}
		}

		afficher(){
			ctx.scale(2*this.orientation,2);
			if(this.explosion==1){this.other.burn();}
			if(this.explosion==0){this.costume = "flame";this.width=14;}
			else{this.costume = "flame_explosion"+(Math.floor(this.explosion/4)+1).toString();this.width=50;}
			var coords = scocoordinates.get(this.costume);
			ctx.drawImage(scopng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}


	class Wave{
		constructor(x,y,orientation,other,stats){
			this.x = x; this.y = y; this.orientation = orientation;
			this.other = other;
			this.width=22;
			this.height=44;
			this.totdur = 60;this.vitesse=6;
			this.width=32;this.height = 38;
			this.stats = stats;
			this.dur = this.totdur;
			this.num = cpt;
			this.rotation = 0; this.rotationspeed = 16;
			this.dangerous = false;
			
		}

		loop(){
			this.x += this.orientation*this.vitesse;
			this.y += this.vitesse;
			var stats = this.stats; var other = this.other;
			if(other.invincibilite==0 && other.y>0 &&entre((other.x-this.x)*this.orientation,stats.hitboxxs-other.charac.width/2,stats.hitboxxe+other.charac.width/2+stats.hitboxxeyscaling*(other.y-(this.y+stats.hitboxys)))){
				if(entre((other.y+other.charac.height/3-this.y),stats.hitboxys-other.charac.height/6,stats.hitboxxe+other.charac.height/6)){other.hurt(this,stats);this.dur=1;}
			}
		}

		afficher(){
			this.costume = "wave";
			this.rotation = (this.rotation+this.rotationspeed)%360;
			ctx.scale(2*this.orientation,2);
			var coords = kitcoordinates.get(this.costume);
			ctx.drawImage(kitpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(gamefreeze==0){this.dur--;}
			if(this.dur==0){this.delete();return;}
		}

		delete(){
			objects_to_loop.delete(this.num);
		}
	}

	class Head{
		constructor(x,y,orientation,skin,coords, power=2){
			this.x = x; this.y = y; this.orientation = orientation; this.skin = skin; this.coords = coords;
			this.width=22;
			this.height=44;
			this.width=18;this.height = 25;
			this.num = cpt;
			this.rotation = 0; this.rotationspeed = 16;
			this.gravity = 0.15;
			this.tb=Math.random()*2+power;
			this.vitesse = -1-Math.random();
			this.dangerous = false;
			
		}

		loop(){
			this.y+=this.tb;
			this.tb-=this.gravity;
			if(this.y<0){this.y=0;this.tb=0;this.rotationspeed = Math.max(this.rotationspeed-1,0);this.vitesse = Math.max(this.vitesse-0.1,0);}
			this.rotation = (this.rotation+this.rotationspeed)%360;
			this.x+=this.orientation*this.vitesse;
		}

		afficher(){
			this.costume = "head";
			var coords = this.coords.get(this.costume);
			var x = (this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation;
			var y = ground-this.y-coords.height-coords.decy+shakey;
			ctx.scale(2*this.orientation,2);
			ctx.translate(x+coords.width/2,y+coords.height/2);
			ctx.rotate(Math.PI*this.rotation/180);
			ctx.drawImage(this.skin,coords.offx,coords.offy,coords.width,coords.height,-coords.width/2,-coords.height/2,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			ctx.restore();
		}

	}

	class Organ{
		constructor(x,y,orientation, burning=false){
			this.x = x; this.y = y; this.orientation = orientation;
			if(burning){this.coords = bloodcoordinates.get("burningorgan"+(Math.floor(Math.random()*3)+1));}
			else{this.coords = bloodcoordinates.get("organ"+(Math.floor(Math.random()*6)+1));}
			this.width=this.coords.width;
			this.height=this.coords.height;
			this.num = cpt;
			this.rotation = 0; this.rotationspeed = 16;
			this.gravity = 0.2;
			this.tb=Math.random()*4.5+3.5;
			this.vitesse = -2+Math.random()*4;
			this.dangerous = false;
			
		}

		loop(){
			this.y+=this.tb;
			this.tb-=this.gravity;
			if(this.y<0){this.y=0;this.tb=0;this.rotationspeed = Math.max(this.rotationspeed-1,0);this.vitesse = Math.max(this.vitesse-0.1,0);}
			this.rotation = (this.rotation+this.rotationspeed)%360;
			this.x+=this.orientation*this.vitesse;
		}

		afficher(){
			var coords = this.coords;
			var x = (this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.width/2+shakex)*this.orientation;
			var y = ground-this.y-coords.height-coords.decy+shakey;
			ctx.scale(2*this.orientation,2);
			ctx.translate(x+coords.width/2,y+coords.height/2);
			ctx.rotate(Math.PI*this.rotation/180);
			ctx.drawImage(bloodpng,coords.offx,coords.offy,coords.width,coords.height,-coords.width/2,-coords.height/2,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			ctx.restore();
		}

	}



	function add_to_objects_set(obj){
		objects_to_loop.set(cpt,obj);
		cpt++;
	}


	class AI
	{
		constructor(me,other,difficulty){
			this.me = me; this.other = other; this.difficulty = difficulty;
			this.attacking = 0; this.idealrange = 120; this.rangescaling = 9;
			this.enviedetaperenbas = 4+Math.floor(Math.random()*5);
			this.currisking = 0;
			this.enviedegrab = Math.floor(Math.random()*5);
			this.hascommited = 0;
			this.wanttojump = 0-2*(other.perso=="raiden"); this.enviedantiair = 0;
			this.optionssonoki = [1.25,0.2,0.35,0.5]; //crouch, stand block, crouch block, jump
			this.chosenoptiononoki = 0;
			this.eviterprochainprojo = true;
			this.foptiononoki = 0;
			this.timesinceoki=0;
			this.lastmovehitonoki = "";
			this.lastmovehitby = "lpunch";
			this.wanttowavedash=false;
			var grade = new Map();
			function aux(val,key,_){
				grade.set(key,Math.floor(Math.random()*5));
			}
			me.charac.coups.forEach(aux);
			this.grade=grade;
			switch(this.difficulty){
				case 0:
					this.donothingchance = 0.7;
					this.dontattackchance = 0.9;
					this.agressivite = -Math.random()*0.05;
					this.baserisk = 80+Math.floor(Math.random()*15);
					this.inconsistency = 10;
					this.cancelcombodelay = 7;
					this.cancelnormaldelay = 15;
					this.commitmentonwalk = 5;
					this.optionssonoki[Math.floor(Math.random()*4)]+=1;
					this.fduroptiononoki = 15;
					this.reaction_time = 20;
					this.chanceeviterprojo = 0.6;
					this.distancetowavedash = 500;
					this.parryrate = 0.2;
					break;
				
				case 1:
					this.donothingchance = 0.5;
					this.dontattackchance = 0.9;
					this.agressivite = 0.0005;
					this.baserisk = 70+Math.floor(Math.random()*10);
					this.inconsistency = 8;
					this.cancelcombodelay = 3;
					this.cancelnormaldelay = 10;
					this.commitmentonwalk = 5;
					this.optionssonoki[Math.floor(Math.random()*4)]+=1;
					this.fduroptiononoki = 0;
					this.reaction_time = 15;
					this.chanceeviterprojo = 0.9;
					this.distancetowavedash = 500;
					this.parryrate = 0.5;
					break;

				case 2:
					this.donothingchance = 0;
					this.dontattackchance = 0.4;
					this.agressivite = 0.002;
					this.baserisk = 60+Math.floor(Math.random()*10);
					this.inconsistency = 8;
					this.cancelcombodelay = 3;
					this.cancelnormaldelay = 6;
					this.commitmentonwalk = 5;
					this.optionssonoki[Math.floor(Math.random()*4)]+=0.8;
					this.fduroptiononoki = 0;
					this.reaction_time = 12;
					this.chanceeviterprojo = 0.95;
					this.distancetowavedash = 200;
					this.parryrate = 0.9;
					break;

				case 3:
					this.donothingchance = 0;
					this.dontattackchance = 0;
					this.agressivite = 0.004;
					this.baserisk = 60;
					this.inconsistency = 5;
					this.cancelcombodelay = 1;
					this.cancelnormaldelay = 3;
					this.commitmentonwalk = 3;
					this.fduroptiononoki = 0;
					this.reaction_time = 8;
					this.chanceeviterprojo = 1;
					this.distancetowavedash = 90;
					this.parryrate = 1;
					break;
				default:
					this.donothingchance = 0;
					this.dontattackchance = 0;
					this.agressivite = 0.01;
					this.baserisk = 50;
					this.inconsistency = 2;
					this.cancelcombodelay = 1;
					this.cancelnormaldelay = 1;
					this.commitmentonwalk = 1;
					this.fduroptiononoki = 0;
					this.reaction_time = 4;
					this.chanceeviterprojo = 1;
					this.distancetowavedash = 60;
					this.parryrate = 1;
					break;
			}
			if(difficulte>=1 && me.perso=="scorpion"){this.agressivite+=0.002}
			if(me.perso=="shao_kahn"){this.wanttojump-=20;}
			if(me.perso=="kitana"){this.idealrange=150;}
			if(me.perso=="raiden"){this.enviedantiair+=2;}
			if(me.perso=="liukang"){this.idealrange=90;}
			//if(youareintutorial && !me.allowedmoves.includes("block")){this.agressivite+=0.01;}	//pour l'instant ca ferait ca tout le temps
		}

		pressforward(force=false){
			if(this.hascommited && !force){return;}
			this.hascommited = this.commitmentonwalk;
			var me = this.me;
			var other = this.other;
			if(me.x<other.x){me.droite=1;me.gauche=0;}
			else{me.gauche=1;me.droite=0;}
		}

		pressbackward(){
			if(this.hascommited){return;}
			this.hascommited = this.commitmentonwalk;
			var me = this.me;
			var other = this.other;
			if(me.x<other.x){me.gauche=1;me.droite=0}
			else{me.droite=1;me.gauche=0}
		}

		eviterprojectiles(){
			var me = this.me;
			for(let value of objects_to_loop.values()){
				if(value.dangerous && value.other===me){
					if(this.me.perso == "shao_kahn" && this.me.cooldowns[1]==0 && Math.abs(this.me.x-(value.x+5*value.vitesse*value.orientation))<=value.stats.hitboxxe+30+this.me.charac.width/2 && this.me.y==0 && this.me.mov!="jumpsquat"){this.begincoup("charge");return true;}
					if(Math.abs(this.me.x-(value.x+5*value.vitesse*value.orientation))<=value.stats.hitboxxe+30+this.me.charac.width/2 && this.me.y==0 && this.me.mov!="jumpsquat"){this.pressbackward();if(value.vitesse>0){this.me.bas=1;}return true;}
					if((this.me.y==0 && (signe(this.me.x-value.x)==signe(value.vitesse)) && Math.abs(this.me.x-(value.x+5*value.vitesse*value.orientation))>=value.stats.hitboxxe+90+this.me.charac.width/2-this.wanttojump*6 && value.y+value.stats.hitboxye<=70) || this.me.mov=="jumpsquat"){this.me.haut=1;this.pressforward(true);return true;}
				}
			}
			return false;
		}

		movesinrange(d){
			var coups = this.me.charac.coups;
			var me = this.me;
			var other = this.other;
			var thiis = this;
			var rep = new Set();
			var width = this.other.charac.width;
			var prio = movpriority.get(me.mov);
			function aux(val,key,_){
				var newd = d-other.orientation*(other.xspeed+Math.max(other.xspeed-other.charac.friction*val.slag,0))/2*val.slag;
				newd -= val.movx**2/other.charac.friction/3;
				if((other.y>0 || other.mov == "jumpsquat") && me.y==0){
					newd = d-other.orientation*other.xspeed*val.slag;
					if(other.tb>=0 || other.y+(other.tb+other.tb-other.charac.gravity*val.slag/2)/2*val.slag>val.hitboxye-10 || newd<0){return;}
				}
				if(key=="jskick" && me.xspeed!=0){return;}
				if(key == "squarepunch"){return;}
				var newprio = movpriority.get(key);
				//if (key=="lpunch" || key == "clpunch"){newprio++;}
				if(me.y==0 && val.disponibility == "air"){}
				else if(youareintutorial && !me.allowedmoves.includes(key)){}
				else if(cd_dependance.get(key) != -1 && me.cooldowns[cd_dependance.get(key)]){}
				else if((newprio<=prio || (movpriority.get(key)==100) && me.mov != "")&&thiis.difficulty<4){}
				else if(other.crouching && val.hitboxys>=0 && (val.hiteffect != "grab" || thiis.enviedegrab<10)){}
				else if((me.movlag || me.y>0) && val.disponibility=="crouch"){}
				else if(!(me.crouching<=3 && me.y==0) && val.disponibility=="stand"){}
				else if(val.hitboxxe+width/2>=newd && d>=val.hitboxxs-width/2 && val.hiteffect != "projectile" && (other.y==0 || me.y>0)){rep.add(key);}
				else if(other.y>0 && me.y==0 && val.hitboxxe+width/2>=newd+10){rep.add(key);}
			}
			coups.forEach(aux);
			return rep;
		}

		begincoup(m){
			this.me.begincoup(m,this.other);
			//this.me.movlag+=1;
		}

		ugothit(){
			var me = this.me;
			var other = this.other;
			this.wanttowavedash=false;
			this.grade.set(me.mov,this.grade.get(me.mov)-8);
			if(me.hurted==0){this.lastmovehitby = other.mov;}
			if(this.timesinceoki){this.lastmovehitonoki=other.mov;}
			if(other.crouching&&me.charac.coups.has(me.mov) && me.charac.coups.get(me.mov).hitboxys>=0){this.enviedetaperenbas += 8;}
			if(other.crouching){this.wanttojump+=1;}
			if(me.y>0){this.wanttojump-=2;}
			if(other.y>0 && me.y==0){this.enviedantiair-=3;}
			if(this.foptiononoki){this.optionssonoki[this.chosenoptiononoki]-=0.1}
			this.eviterprochainprojo = (Math.random()<=this.chanceeviterprojo);
		}

		ugotahit(){
			var me = this.me;
			var other = this.other;
			this.grade.set(me.mov,this.grade.get(me.mov)+8);
			this.enviedegrab = Math.max(this.enviedegrab-2,-10);
			if(other.crouching&&me.charac.coups.has(me.mov) && me.charac.coups.get(me.mov).hitboxys>=0){this.enviedetaperenbas -= 8;}
			if(me.y>0){this.wanttojump+=2;}
			if(other.y>0 && me.y==0){this.enviedantiair+=3;}
		}

		

		ugotblocked(){
			this.enviedegrab = Math.min(this.enviedegrab+1,10);
			this.attacking-=1;
			if(this.other.crouching>3){this.wanttojump += 1;}
		}

		ugothitorblockedaprojectile(){
			this.agressivite+=0.005;
		}

		beginwavedash(){
			this.me.haut=1;
			this.wanttowavedash=true;
		}

		thereisaprojo(){
			var me = this.me;
			for(let value of objects_to_loop.values()){
				if(value.dangerous && value.other===me){
					if(Math.abs(this.me.x-(value.x+5*value.vitesse*value.orientation))<=value.stats.hitboxxe+60+this.me.charac.width/2 && this.me.y==0 && this.me.mov!="jumpsquat"){return true;}
					if((this.me.y==0 && (signe(this.me.x-value.x)==signe(value.vitesse)) && Math.abs(this.me.x-(value.x+5*value.vitesse*value.orientation))>=value.stats.hitboxxe+90+this.me.charac.width/2-this.wanttojump*6 && value.y+value.stats.hitboxye<=70) || this.me.mov=="jumpsquat"){return true;}
				}
			}
			return false;
		}

		attack(moves){
			var me = this.me;
			var other = this.other;
			var coups = me.charac.coups;
			var mywidth = this.other.charac.width;
			var thiis = this;
			var reaction_time = this.reaction_time;
			if(other.mov == this.lastmovehitby && !youareintutorial){reaction_time=0;}
			
			var movtodo = "";
			var limiteup = Math.max(Math.max(other.hurted,other.freeze),this.baserisk+this.currisking+me.pv/10);
			var c = other.charac.coups.get(other.mov);
			if(other.charac.coups.has(other.mov) && other.movlag<=c.slag+c.fdur+c.elag-reaction_time && Math.abs(me.x-other.x)<=c.hitboxxe+mywidth/2 && other.movlag>=c.elag-1){
				limiteup = other.movlag-2-other.charac.coups.get(other.mov).fdur - other.charac.coups.get(other.mov).elag;
			}
			if(other.mov == "thundergod" && other.movlag<=c.slag+c.fdur+c.elag-reaction_time && Math.abs(me.x-other.x)<=220 && me.y==0){limiteup= (Math.abs(me.x-other.x)-60)/6;}
			function aux(m){
				var conviction = coups.get(m).slag;
				conviction += (coups.get(m).hitboxys>=0)*thiis.enviedetaperenbas;
				conviction += coups.get(m).slag+coups.get(m).elag/2+coups.get(m).fdur/4;
				conviction += (coups.get(m).hiteffect != "grab")*thiis.enviedegrab;
				if(other.y>0 && me.y==0){conviction-=thiis.enviedantiair;}
				if(coups.get(m).slag<=other.hurted){conviction = -100+movpriority.get(m); conviction -= coups.get(m).degats/2;}
				if(m=="huppercut" && other.y>0){conviction -= 0;}
				if(me.y>0 && me.tb<0){conviction-=40;}
				conviction += thiis.inconsistency*Math.random();
				conviction-=thiis.grade.get(m);

				if(conviction<=limiteup){movtodo = m;limiteup = conviction;}
			}
			moves.forEach(aux);
			if(me.mov != ""){var stats = coups.get(me.mov)}
			var canceldelay = 1;
			if(other.hurted){canceldelay = this.cancelcombodelay;}
			else{canceldelay = this.cancelnormaldelay;}
			if((!coups.has(me.mov) || me.movlag <= stats.elag+stats.fdur-canceldelay) && movtodo != ""){
				this.begincoup(movtodo);
			}
		}

		decide(){
			var me = this.me;
			if(end_of_round_countdown || me.pv<=0){me.droite = 0;me.gauche = 0;me.bas = 0;return;}
			if(this.hascommited){this.hascommited--;}
			else{me.droite = 0;me.gauche = 0;}
			if(this.eviterprochainprojo){if(this.eviterprojectiles()){return;}}
			if(me.gettingup){
				this.timesinceoki=5;
				if(me.gettingup==1){this.chosenoptiononoki = getrandomwithcoeff(this.optionssonoki);this.foptiononoki = this.fduroptiononoki;}
			}
			else if(this.timesinceoki){
				this.timesinceoki--;
			}
			if(this.foptiononoki){
				me.bas = 0; me.haut = 0; me.poing = 0; me.jambe = 0; me.dodge = 0; me.special = 0;
				switch (this.chosenoptiononoki){
					case 0:
						me.bas=1;
						break;
					case 1:
						this.pressbackward();
						break;
					case 2:
						me.bas=1;
						this.pressbackward();
						break;
					case 3:
						me.haut=1;
						if(this.attacking>=0){this.pressforward();}
						else{this.pressbackward();}
						if(Math.random()<=0.5){this.bas = 1;}
				}
				if(me.gettingup==0){this.foptiononoki--;}
				return;
			}
			var other = this.other;
			var c = other.charac.coups.get(other.mov);
			if(this.wanttowavedash && me.y>0){
				if(Math.abs(me.x-other.x)-this.idealrange>0){this.pressforward();}
				else{this.pressbackward();}
				me.bas=1; me.dodge=1;
				this.wanttowavedash=false;
				return;
			}
			if(Math.random()<this.donothingchance){return;}
			me.bas = 0; me.haut = 0; me.poing = 0; me.jambe = 0; me.dodge = 0; me.special = 0;
			this.attacking = minvalabs(this.attacking-1+Math.random()*2+this.agressivite+(other.hurted>0)*0.2+(other.freeze>0)*0.5-(me.hurted>0)*0.2,10);
			this.currisking = minvalabs(this.currisking-1+Math.random()*2,10);
			if(Math.random()>this.dontattackchance){
				var moves = this.movesinrange(me.orientation*(other.x-me.x));
				this.attack(moves);
			}
			var reaction_time = this.reaction_time;
			if(other.mov == this.lastmovehitby){reaction_time=0;}
			if(this.timesinceoki && other.mov == this.lastmovehitonoki){reaction_time=0;}
			if(!me.charac.coups.has(me.mov)){
				if(other.charac.coups.has(other.mov) && other.movlag<=c.slag+c.fdur+c.elag-reaction_time && Math.abs(me.x-other.x)<=c.hitboxxe+me.charac.width/2+me.charac.vitesse*this.commitmentonwalk+5 && other.movlag>=c.elag-1){
					if(me.perso=="subzero" && other.movlag>c.elag+c.fdur+3 && me.y==0){this.begincoup("icebody");}
					if(me.perso=="liukang" && other.movlag>c.elag+c.fdur+1 && me.y==0){this.begincoup("cycle");}
					this.pressbackward();
					if(other.charac.coups.get(other.mov).hitboxys<0 && other.y==0){me.bas = 1;}
					if(other.charac.coups.get(other.mov).hiteffect=="grab" && me.perso!="shao_kahn"){me.haut=1;}
					return;
				}
				
				else if(other.charac.coups.has(other.mov) && other.charac.coups.get(other.mov).hitboxye<=0 && other.y==0 && Math.random()*20*difficulte<=this.wanttojump+5){
					me.haut = 1;this.pressforward;
				}
				if(Math.random()*100*(difficulte+1)<this.wanttojump+3){me.haut = 1;}
			}

			if(me.perso=="kitana" && me.y==0 && other.y>0 && me.crouching==0 && entre(Math.abs(me.x-other.x),100,150) && me.orientation*other.xspeed<=-2.5 && other.tb>0){this.begincoup("fanlift");}
			if(Math.abs(this.attacking*this.rangescaling+Math.abs(me.x-other.x)-this.idealrange)<=me.charac.vitesse*2+other.movlag*3 && me.y==0 && movpriority.get(me.mov)<70 && !(other.mov == "thundergod" || other.mov == "boltthrow" || other.mov == "fanthrow" || other.mov=="hell_gates" || other.mov == "spear_throw" || other.mov == "slide" || other.mov == "iceball" || other.mov == "fireball" || other.mov == "flying_kick" || other.mov == "knife_throw" || other.mov == "teleport_drop")){
				if(me.perso=="kitana"){if(Math.abs(me.x-other.x)>100&&me.y==0){this.begincoup("fanthrow");}}
				if(me.perso=="mileena"){if(Math.abs(me.x-other.x)>200&&me.y==0){this.begincoup("homing_knife");}else if(Math.abs(me.x-other.x)>70&&me.y==0 && other.crouching==0){this.begincoup("knifethrow");}}
				if(me.perso=="raiden"){if(Math.abs(me.x-other.x)>100&&me.y==0){this.begincoup("boltthrow");}}
				if(me.perso=="scorpion" && this.currisking+me.pv/10>=2){if(Math.abs(me.x-other.x)>100&&me.y==0){this.begincoup("spear_throw");}}
				if(me.perso=="subzero"){if(Math.abs(me.x-other.x)>100&&me.y==0){this.begincoup("iceball");}}
				if(me.perso=="liukang" && this.currisking-me.pv/10>=2){if(Math.abs(me.x-other.x)>100&&me.y==0){this.begincoup("fireball");}}
			}

			if(me.perso=="raiden" && this.currisking+me.pv/10>=0.5 && Math.abs(Math.abs(me.x-other.x-other.xspeed*10)-120)<=40 && me.y==0 && other.y>0 && me.crouching==0 && movpriority.get(me.mov)<70 && other.tb<0)
				{this.begincoup("thundergod");}

			else if(me.perso=="shao_kahn" && this.currisking>=-5 && ((Math.abs(Math.abs(me.x-other.x-other.xspeed*10)-120)<=40 && me.y==0 && other.y>0 && me.crouching==0 && movpriority.get(me.mov)<70 && other.tb<=0) || (other.crouching>=4 && Math.abs(me.x-other.x)<=120 && me.y==0)))
				{this.begincoup("charge");}

			else if(me.perso=="scorpion" && this.currisking-me.pv/20>=-2 && Math.abs(me.x-other.x-other.xspeed*10)>=80 && me.y==0 && me.crouching==0 && movpriority.get(me.mov)<70 && other.tb<=0 && me.y==0 && Math.abs(me.x-me.orientation*180-camerax)>=decalagex && me.cooldowns[2]==0)
				{this.begincoup("hell_gates");}

			else if(me.perso=="subzero" && me.y==0 && other.y==0 && other.gettingup && other.gettingup<=other.charac.getupfdur-28 && Math.abs(me.x-other.x)<=100 && movpriority.get(me.mov)<70 && !this.thereisaprojo())
				{this.begincoup("iceflask");}
			else if(me.perso=="subzero" && me.y==0 && other.y==0 && Math.abs(-stage_size/2*other.orientation-other.x)<=200 && entre(Math.abs(me.x-other.x),100,150) && movpriority.get(me.mov)<70 && !this.thereisaprojo() && me.cooldowns[2]==0)
				{this.begincoup("iceflask");this.attacking+=2;}

			else if(me.perso=="subzero" && me.y==0 && other.y==0 && Math.abs(Math.abs(me.x-other.x)-this.idealrange)>=60 && Math.abs(me.x-other.x)<=120 && movpriority.get(me.mov)<70 && !this.thereisaprojo())
				{this.begincoup("slide");}

			else if(me.perso=="mileena" && me.y==0 && other.y==0 && Math.abs(Math.abs(me.x-other.x)-this.idealrange)>=40 && Math.abs(me.x-other.x)<=80 && movpriority.get(me.mov)<70 && !this.thereisaprojo())
				{this.begincoup("ball");}

			else if(me.perso=="scorpion" && Math.abs(me.x-other.x)>=60 && Math.abs(-stage_size/2*me.orientation-me.x)<=180 && me.y==0 && me.crouching==0 && movpriority.get(me.mov)<70 && Math.abs(me.x-me.orientation*180-camerax)>=decalagex && me.cooldowns[2]<=10)
				{this.begincoup("hell_gates");}
			
			else if(me.perso=="kitana" && me.y==0 && Math.abs(me.x-other.x)<=100 && other.movlag>=20 && Math.abs(-stage_size/2*me.orientation-me.x)<=150 && me.cooldowns[3]<=5 && movpriority.get(me.mov)<70)
				{this.begincoup("squarepunch");}

			else if(me.perso=="raiden" && me.y==0 && Math.abs(me.x-other.x)>=60 && Math.abs(-stage_size/2*me.orientation-me.x)<=130 && other.y>=40 && me.cooldowns[3]<=5 && movpriority.get(me.mov)<70)
				{this.begincoup("teleport");}

			else if(me.perso=="mileena" && me.y==0 && Math.abs(me.x-other.x)>=60 && Math.abs(-stage_size/2*me.orientation-me.x)-other.y/2<=130 && me.cooldowns[3]<=5 && movpriority.get(me.mov)<70)
				{this.begincoup("teleport_drop");}

			else if(Math.abs(Math.abs(me.x-other.x)-this.idealrange)>=this.distancetowavedash && !this.thereisaprojo()){this.beginwavedash();}
			
			else if(this.attacking*this.rangescaling+Math.abs(me.x-other.x) + Math.max(0,200-Math.abs(-stage_size/2*me.orientation-me.x))>=this.idealrange){this.pressforward();}
			else{this.pressbackward();}
		}
	}


	class Joueur
	{
		constructor()
		{
			
		}
		reinit(x,y,perso,n,skin,other,reset_ai=true, allowedmoves = []){
			this.charac = characteristics.get(perso);
			this.x = x; this.y = y; this.perso = perso; this.n = n; this.skin = this.charac.png[skin]; this.coordinates = this.charac.coordinates;
			this.allowedmoves = allowedmoves; this.xinit = x; this.other = other;
			this.droite=0;this.gauche=0;this.haut=0;this.bas=0;this.poing=0;this.jambe=0;this.special=0;this.dodge=0; this.jump=0;
			this.forward = 0;this.back = 0;
			if (this.n == 0){this.orientation = 1}else{this.orientation = -1}
			this.costume = "stand1";
			this.standing = 0;this.walking = 0;this.jumping=0;
			this.movlag = 0;
			this.mov = "";
			this.tb = 0; this.xspeed = 0; this.crouching = 0;
			this.memoryslot = 0; this.perfectblock = 0; this.parrying = 0; this.ressource = 3; this.max_ressource = 3;
			this.hurted = 0; this.hurtx = 0; this.invincibilite = 0; this.freeze = 0; this.canthurt = false;
			this.pv = this.charac.pv; this.pvmax = this.charac.pv; this.pvaff = this.charac.pv;
			this.pushed = 0;this.pushx = 0;
			this.blocking = 0; this.falling = 0; this.gettingup = 0; this.grabbing = 0; this.grabbed = 0;
			this.comboscaling = 1;
			this.vicpose = 0;
			this.cooldowns = [0,0,0,0];
			this.fatality = 0; this.decapitated = 0; this.electrocuted = 0; this.hide = 0; this.burning = 0;
			if(!secondplayerishuman && this.n==1 && reset_ai){this.ai = new AI(this,other,difficulte);}
		}

		begincoup(s,other){
			var stats = this.charac.coups.get(s);
			this.reoriente(other);
			if(this.hurted || this.falling || this.gettingup || this.blocking){return;}
			if(youareintutorial && !this.allowedmoves.includes(s)){return;}
			if(["clpunch","clkick","cmkick"].includes(s)){this.crouching = Math.max(this.crouching,4);}
			if(s == "jkick"){if(this.x<other.x){this.orientation = 1;}else{this.orientation = -1;}}
			var cd = cd_dependance.get(s);
			if(this.cooldowns[cd]){if(this.cooldowns[cd]>bufferwindow){this.special=2;}return;}
			else if(cd != -1){this.special=2;}
			if(movpriority.get(s)==70 && movpriority.get(this.mov)>=70){return;}
			if(s == "hell_gates"){this.orientation*=-1;}
			if(s == "squarepunch"){this.invincibilite=15;this.y=1;this.tb=9;}
			if(s == "icebody"){this.crouching = 0;}
			if(s == "flying_kick" && this.y==0){this.y=20;}
			if(s == "bicycle" && this.y==0){this.y=40;}
			if(s == "knifethrow"){this.memoryslot=0;}
			if(s == "cycle" && this.y==0){this.invincibilite=23;}
			if(s == "teleport_drop"){this.invincibilite=12;}
			if(s == "ball"){this.crouching=6;}
			if(s == "knifethrow" || s == "homing_knife"){
				if(this.ressource){this.ressource--;console.log(this.ressource)}
				else{return;}
			}
			play_sound_eff(this.charac.voiceactor+stats.voiceline);
			if(stats.coupwav != ""){play_sound_eff(stats.coupwav);}
			this.cooldowns[cd] = this.charac.cds[cd];
			this.mov = s;
			this.xspeed += stats.movx*this.orientation;
			this.movlag = stats.slag+stats.fdur+stats.elag;
			this.canthurt = false;
		}

		reoriente(other){
			if(this.movlag == 0&&this.y==0){if(this.x<other.x){this.orientation = 1;}else{this.orientation = -1;}}
			
		}

		getup(){
			this.falling = 0;this.hurted =0; this.gettingup = 1;this.invincibilite = this.charac.getupfdur; this.y = 0;
		}

		begin_grab(other){
			this.grabbing = 1;
			this.movlag = 0;
			this.mov = "";
			this.xspeed=0;
			other.movlag = 0;
			other.mov = "";
			other.tb = 0;
			other.grabbed = 1;
		}

		end_grab(other){
			this.grabbing = 0;
			this.invincibilite = 0;
			other.grabbed = 0;
		}

		end_of_combo(){
			this.comboscaling=1;
				if(this.n==1 && (secondplayerisdummy || (youareintutorial && currentuto.regenerate && this.pv>0))){
					this.pv = this.pvmax; this.pvaff = this.pvmax;
					if(difficulte==-1){this.x=this.xinit;}
				}
		}

		miseajour(other){
			if(this.perso=="shao_kahn"){this.crouching=0;}
			if(this.movlag===undefined){this.movlag=0;}
			if(this.crouching===undefined){this.crouching=0;}
			if(this.perfectblock>1){this.perfectblock--;}
			else if(this.perfectblock==1){if(this.back==0){this.perfectblock=0;}}
			else if(this.back){this.perfectblock = framesforperfectblock + perfectblockcd}
			if(this.parrying){this.parrying=0;}
			if(this.freeze){
				this.freeze--;
				this.movlag=0;
				this.mov="";
				if(this.invincibilite>0){this.invincibilite--;}
				return;
			}
			if(this.fatality){
				this.fatality--;
				if(this.fatality==0){
					end_of_round_countdown=180;
				}
				return;
			}
			if(other.fatality){return;}
			if(fightstartcountdown){return;}
			if(this.mov == ""){this.movlag = 0;}
			if(!secondplayerishuman && this.n==1 && difficulte>=0){this.ai.decide();}
			if(this.orientation==1){
				this.forward=this.droite;if(this.forward==0){this.back=this.gauche;}else{this.back=0;}
			}
			else{
				this.orientation = -1;this.forward=this.gauche;if(this.forward==0){this.back=this.droite;}else{this.back = 0;}
			}
			var c = this.charac;
			for(var i=0;i<this.cooldowns.length;i++){
				if(this.cooldowns[i]>0){this.cooldowns[i]--;}
			}
			if(this.perso=="mileena"){
				if(this.cooldowns[0]==1){this.ressource++;}
				else if(this.cooldowns[0]==0 && this.ressource<this.max_ressource){this.cooldowns[0] = this.charac.cds[0];}
			}
			if(this.vicpose){return;}
			if(this.grabbing&&this.hurted==0&&this.grabbed==0){
				this.invincibilite = 1;
				this.grabbing++;
				if(this.grabbing==this.charac.grabfdur){this.end_grab(other);}
				else if(this.grabbing == Math.floor(this.charac.grabfdur*5/7)){
					other.grabbed=0;
					other.falling=10;
					if(c.grabtype == "launch"){
						var stats = this.charac.coups.get("grab");
						other.y = this.y+30;
						other.hurted = stats.hitstun;
						other.xspeed = -stats.hurtx*this.orientation;
						other.tb = stats.hurty;
						//play_sound_eff("mhit");
						other.pv -= this.charac.grabdeg;
						//other.orientation*=-1;
						if(other.pv<=0){other.killanim();}
						this.falling=1;
						this.hurted=1;
					}
					else{
						other.y = 0;
						other.hurted = 15;
						other.x = this.x - this.orientation*(this.charac.width+other.charac.width)/1.4;
						other.xspeed = -0.2*this.orientation;
						lag_game(8);
						shake_screen(10,3);
						play_sound_eff("mhit");
						other.pv -= this.charac.grabdeg;
						if(other.pv<=0){other.killanim();}
					}
				}
				return;
			}
			else if(this.grabbing && this.grabbed){
				this.end_grab(other);other.end_grab(this);
				this.pushed = 5;this.pushx = -4*this.orientation;
				other.pushed = 5;other.pushx = -4*other.orientation;
			}
			else if(this.grabbing && this.hurted){
				this.end_grab(other);
			}
			if(this.grabbed){
				this.movlag = 0;this.mov = "";
				return;
			}
			if(this.invincibilite>0){this.invincibilite--;}
			if(this.gettingup){
				this.end_of_combo();
				this.xspeed = signe(this.xspeed)*Math.max(0,Math.abs(this.xspeed) -c.friction);
				this.gettingup++;
				if(this.gettingup == this.charac.getupfdur || (this.gettingup>=this.charac.getupfdur*5/6 && (this.haut || this.jump))){
					this.gettingup = 0; this.invincibilite = 1;
					if(this.haut==0 && this.jump==0 && this.bas){this.crouching = 6;}
				}
			}
			else if(finishhim && this.pv<=0 && this.falling==0){}
			else if(this.blocking){
				this.blocking--;
				this.movlag = 0;this.mov = "";
				this.x += this.xspeed;
				if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.x = signe(this.x-camerax)*(decalagex+signe(this.x-camerax)*camerax-this.charac.width/2);}
			}
			else if(this.hurted==0){
				if(this.falling==0){
					this.reoriente(other);
					this.end_of_combo();
				}
			
				if(this.y<=0){
					if(this.y<0){
						this.reoriente(other);
						if(this.mov == "air_dodge"){this.y=0;this.tb=0;this.movlag = c.landinglag;this.mov = "landing_lag";this.crouching=1;}
						else if(this.mov == "free_fall"){this.y=0;this.tb=0;this.movlag = c.landinglag;this.mov = "landing_lag";this.xspeed /=2;}
						else if(this.charac.coups.has(this.mov)){
							this.y=0;this.tb=0;this.movlag = this.charac.coups.get(this.mov).landinglag;this.mov = "landing_lag";
						}
						else{this.y = 0;this.tb=0;this.xspeed = 0;this.movlag = 0;this.mov = "";}
						
					}
					if (this.bas&&this.movlag == 0 &&!(youareintutorial && !this.allowedmoves.includes("crouch"))){this.crouching = Math.min(this.crouching+1,6);}
					else if(this.bas==0&&this.crouching>0&&this.movlag==0){this.crouching--;}
					if((this.haut==1 || this.jump==1)&&movpriority.get(this.mov)<20&&end_of_round_countdown==0 &&!(youareintutorial && !this.allowedmoves.includes("jump"))){
						this.mov = "jumpsquat";this.movlag = c.jumpsquat;
						play_sound_eff(this.charac.voiceactor+"lmov");
						this.crouching = 0;
						if(this.haut==1){this.haut = 2;}else{this.jump=2;}
						if(this.xspeed==0){
							if(this.droite >= 1){this.xspeed = c.jumpxspeed;}
							else if(this.gauche>=1){this.xspeed = - c.jumpxspeed*c.backmovnerf}
						}
					}
					else if(this.poing==1&&this.forward+this.back==0&&movpriority.get(this.mov)<30&&this.crouching==0&&this.bas==0&&end_of_round_countdown==0){
						this.begincoup("lpunch",other);
						this.poing = 2;
					}
					else if(this.poing==1&&this.forward+this.back>=1&&movpriority.get(this.mov)<40&&this.crouching==0&&this.bas==0&&end_of_round_countdown==0){
						this.begincoup("hpunch",other);
						this.poing = 2;
					}
					else if(this.jambe==1&&this.back>=1&&movpriority.get(this.mov)<40&&this.crouching==0&&this.bas==0&&end_of_round_countdown==0){
						this.begincoup("mkick",other);
						this.jambe = 2;
					}
					else if(this.jambe==1&&this.forward+this.back==0&&movpriority.get(this.mov)<30&&this.crouching==0&&this.bas==0&&end_of_round_countdown==0){
						this.begincoup("lkick",other);
						this.jambe = 2;
					}
					else if(this.jambe==1&&this.forward>=1&&movpriority.get(this.mov)<50&&this.crouching==0&&this.bas==0&&end_of_round_countdown==0){
						this.begincoup("hkick",other);
						this.jambe = 2;
					}
					else if(this.poing==1&&this.forward+this.back==0&&movpriority.get(this.mov)<30&&this.bas==1&&this.crouching>3&&end_of_round_countdown==0){
						this.begincoup("clpunch",other);
						this.poing = 2;
					}
					else if(this.poing==1&&this.forward+this.back>0&&movpriority.get(this.mov)<50&&this.bas==1&&this.crouching>3&&end_of_round_countdown==0){
						this.begincoup("huppercut",other);
						this.poing = 2;
						this.crouching = 0;
					}
					else if(this.jambe==1&&this.forward+this.back==0&&movpriority.get(this.mov)<30&&this.bas==1&&this.crouching>3&&end_of_round_countdown==0){
						this.begincoup("clkick",other);
						this.jambe = 2;
					}
					else if(this.jambe==1&&this.forward+this.back>0&&movpriority.get(this.mov)<40&&this.bas==1&&this.crouching>3&&end_of_round_countdown==0){
						this.begincoup("cmkick",other);
						this.jambe = 2;
					}
					else if(this.dodge==1&&this.movlag==0&&this.crouching==0&&end_of_round_countdown==0){
						this.begincoup("grab",other);
						this.dodge = 2;
					}
					else if(this.perso == "kitana" && this.forward+this.back==0 && this.bas==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.crouching==0){
						this.begincoup("fanthrow",other);
					}
					else if(this.perso == "kitana" && this.forward>=1 && this.special==1 && finishhim && Math.abs(this.x-other.x)<=80 && other.falling==0 && other.gettingup==0){
						this.fatality = 90;
						other.y=0;
						play_sound_eff("fatal1");
						this.special=2;
						finishhim = 0;
						other.invincibilite=1000;
						fatalitywasdone = true;
						this.mov = ""; this.movlag=0;
						if(this.x<other.x){other.orientation = -1;}else{other.orientation = 1;}
					}
					else if(this.perso == "raiden" && this.forward+this.back==0 && this.special==1 && finishhim && Math.abs(this.x-other.x)<=60 && other.gettingup==0 && other.y<=30){
						this.fatality = 110;
						other.falling=0;
						other.y=0;
						play_sound_eff("fatal1");
						this.special=2;
						other.x = this.x + 39*this.orientation;
						finishhim = 0;
						other.invincibilite=1000;
						fatalitywasdone = true;
						this.mov = ""; this.movlag=0;
						if(this.x<other.x){other.orientation = -1;}else{other.orientation = 1;}
					}
					else if(this.perso == "scorpion" && this.forward && this.special==1 && finishhim && entre(Math.abs(this.x-other.x),75,125) && other.gettingup==0 && other.y<=30){
						this.fatality = 180;
						other.falling=0;
						other.y=0;
						play_sound_eff("fatal1");
						this.special=2;
						other.x = this.x + 100*this.orientation;
						finishhim = 0;
						other.invincibilite=1000;
						fatalitywasdone = true;
						this.mov = ""; this.movlag=0;
						if(this.x<other.x){other.orientation = -1;}else{other.orientation = 1;}
					}
					else if(this.perso == "subzero" && this.forward+this.back==0 && this.special==1 && finishhim && Math.abs(this.x-other.x)>=200 && other.y<=80 && other.gettingup==0){
						this.fatality = 100;
						play_sound_eff("fatal1");
						this.special=2;
						finishhim = 0;
						other.invincibilite=1000;
						fatalitywasdone = true;
						this.mov = ""; this.movlag=0;
						if(this.x<other.x){other.orientation = -1;}else{other.orientation = 1;}
					}
					else if(this.perso == "liukang" && this.bas && this.special==1 && finishhim && entre(Math.abs(this.x-other.x),130,190) && other.gettingup==0 && other.y<=30){
						this.fatality = 99;
						other.falling=0;
						other.y=0;
						this.canthurt=false;
						play_sound_eff("fatal1");
						this.special=2;
						other.x = this.x + 160*this.orientation;
						finishhim = 0;
						other.invincibilite=1000;
						fatalitywasdone = true;
						this.mov = ""; this.movlag=0;
						if(this.x<other.x){other.orientation = -1;}else{other.orientation = 1;}
					}
					else if(this.perso == "kitana" && this.forward>=1 && this.special==1 && this.bas==0 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.crouching==0){
						this.begincoup("fanswipe",other);
					}
					else if(this.perso == "kitana" && this.back>=1 && this.special==1 && this.bas==0 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.cooldowns[2]==0 && this.crouching==0){
						this.begincoup("fanlift",other);
					}
					else if(this.perso == "kitana" && this.bas>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("squarepunch",other);
					}
					else if(this.perso == "raiden" && this.bas>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("teleport",other);
					}
					else if(this.perso == "raiden" && this.back>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("boltthrow",other);
					}
					else if(this.perso == "raiden" && this.forward>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("thundergod",other);
					}
					else if(this.perso == "raiden" && this.forward+this.back==0 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("elecgrab",other);
					}
					else if(this.perso == "scorpion" && this.back>=1 && this.special==1 && this.bas==0 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.crouching==0){
						this.begincoup("hell_gates",other);
					}
					else if(this.perso == "scorpion" && this.back==0 && this.forward==0 && this.special==1 && this.bas==0 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.crouching==0){
						this.begincoup("spear_throw",other);
					}
					else if(this.perso == "scorpion" && this.crouching>=4 && this.bas>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("leg_takedown",other);
					}
					else if(this.perso == "subzero" && this.forward>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("slide",other);
					}
					else if(this.perso == "subzero" && this.back==0 && this.crouching==0 && this.bas==0 && this.forward==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("iceball",other);
					}
					else if(this.perso == "subzero" && this.back>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("iceflask",other);
					}
					else if(this.perso == "subzero" && this.bas>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("icebody",other);
					}
					else if(this.perso == "liukang" && this.bas>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("cycle",other);
					}
					else if(this.perso == "liukang" && this.forward>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("flying_kick",other);
					}
					else if(this.perso == "liukang" && this.back==0 && this.crouching==0 && this.bas==0 && this.forward==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("fireball",other);
					}
					else if(this.perso == "liukang" && this.back>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("bicycle",other);
					}
					else if(this.perso == "shao_kahn" && this.forward>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("charge",other);
					}
					else if(this.perso == "mileena" && this.bas>=1 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("teleport_drop",other);
					}
					else if(this.perso == "mileena" && this.back==0 && this.crouching==0 && this.bas==0 && this.forward==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("knifethrow",other);
					}
					else if(this.perso == "mileena" && this.forward>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("ball",other);
					}
					else if(this.perso == "mileena" && this.back>=1 && this.crouching==0 && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("homing_knife",other);
					}
					else if(this.forward>=1&&movpriority.get(this.mov)<=0&&this.crouching==0&&this.xspeed*this.orientation<c.vitesse){
						this.x+=this.charac.vitesse*this.orientation;this.xspeed = 0;
						let d = (this.charac.width+other.charac.width)/3;
						if(Math.abs(this.x-other.x)<d && this.y==0 && other.y==0){this.x-=this.charac.vitesse*this.orientation;}
					}
					else if(this.back>=1&&movpriority.get(this.mov)<=0&&this.crouching==0&&-this.xspeed*this.orientation<c.vitesse){
						this.x-=this.charac.vitesse*this.orientation*c.backmovnerf;this.xspeed = 0;
					}
					if(this.mov != "forwardash" && this.mov != "backdash"){this.xspeed = signe(this.xspeed)*Math.max(0,Math.abs(this.xspeed) -c.friction);}
					
				}
				else{
					if(this.dodge==1&&this.movlag==0 && end_of_round_countdown==0)
					{
						this.dodge=2;this.movlag = c.airdodgefdur;this.mov = "air_dodge";
						this.falling = 0;
						if(this.bas>=1){this.tb = -c.airdodgespeed;}
						else{this.tb = 0;}
						if(this.droite>=1){this.xspeed = c.airdodgespeed;if(this.orientation==-1){this.xspeed*=(1+this.charac.backmovnerf)/2;}}
						else if(this.gauche){this.xspeed = -c.airdodgespeed;if(this.orientation==1){this.xspeed*=(1+this.charac.backmovnerf)/2;}}
						else{this.xspeed = 0;}
					}
					else if(this.poing==1&&movpriority.get(this.mov)<40&&this.falling==0&&end_of_round_countdown==0){
						this.poing=2;
						this.begincoup("jpunch",other);
					}
					else if(this.jambe==1&&movpriority.get(this.mov)<40&&this.xspeed == 0 && this.back+this.forward==0 &&this.falling==0&&end_of_round_countdown==0){
						this.jambe=2;
						this.begincoup("jskick",other);
					}
					else if(this.jambe==1&&movpriority.get(this.mov)<40&&this.xspeed != 0&&this.falling==0&&end_of_round_countdown==0){
						this.jambe=2;
						this.begincoup("jkick",other);
					}
					else if(this.perso == "kitana" && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.cooldowns[0]==0){
						this.begincoup("fanthrow",other);
						var stats = this.charac.coups.get(this.mov);
						this.cooldowns[0] = this.charac.cds[0];
						this.movlag=stats.elag+6;
						this.special = 2;
						this.xspeed/=2;
					}
					else if(this.perso == "scorpion" && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0 && this.cooldowns[1]==0){
						this.begincoup("airgrab",other);
					}
					else if(this.perso == "liukang" && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("flying_kick",other);
					}
					else if(this.perso == "mileena" && this.special==1 && movpriority.get(this.mov)<70&&end_of_round_countdown==0){
						this.begincoup("knifethrow",other);
					}
					this.y+=this.tb;
					if(this.droite&&this.xspeed<c.airmaxspeed){this.xspeed+=c.airdrift}else if(this.gauche && this.xspeed>-c.airmaxspeed){this.xspeed-=c.airdrift}
					if(this.mov != "air_dodge"){if(Math.abs(this.tb)<1){this.tb -= c.gravity/2;}else{this.tb -= c.gravity;}}
					if(this.falling&&this.y<=0){this.getup();}
				}
			if(this.movlag!=0){
				switch (this.mov)
				{
					case "forward_dash":
						if(entre(this.movlag,c.fdashelag,c.fdashelag + c.fdashfdur)){this.xspeed = c.fdashspeed*this.orientation;}
						else{this.xspeed = 0;}
						break;

					case "back_dash":
						if(entre(this.movlag,c.bdashelag,c.bdashelag + c.bdashfdur)){this.xspeed = -c.bdashspeed*this.orientation;}
						else{this.xspeed = 0;}
						break;


					case "fanthrow":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==stats.elag){
							add_to_objects_set(new Fan(this.x+20*this.orientation,this.y+35,this.orientation,other,stats));
							if(this.y>0){this.xspeed -= 2*this.orientation;}
						}
						else if(this.movlag==stats.elag+Math.floor(stats.slag/2)){
							this.xspeed -= 2*this.orientation;
						}
						break;

					case "fanlift":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==stats.elag+Math.floor(stats.fdur/2)){
							add_to_objects_set(new Wave(this.x+20*this.orientation,this.y+55,this.orientation,other,stats));
						}
						break;

					case "squarepunch":
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.tb=0;this.xspeed=8*this.orientation;}
						if(this.movlag<=stats.elag){this.xspeed=0;}
						break;

					case "teleport":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==stats.elag+7){this.invincibilite=14;}
						if(this.movlag==stats.elag){
							var x = other.x+this.orientation*(this.charac.width/2+other.charac.width/2+10);
							if(Math.abs(x-camerax)>decalagex-this.charac.width/2){x = other.x-this.orientation*(this.charac.width/2+other.charac.width/2+10);}
							this.x = x;
						}
						break;

					case "boltthrow":
						var stats = this.charac.coups.get(this.mov);
						this.crouching=0;
						if(this.movlag==stats.elag){
							add_to_objects_set(new Bolt(this.x+20*this.orientation,this.y+60,this.orientation,other,stats));
						}
						break;
					case "thundergod":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag<=stats.elag+stats.fdur){this.x += 6*this.orientation;if(this.movlag==2){this.movlag++;}}
						if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.movlag=0;this.mov="";this.tb=7;this.xspeed = -this.orientation;this.y=0.1;}
						break;
					case "hell_gates":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==stats.elag+stats.fdur){this.tb=6;this.y+=1;fixcamera=30;}
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.xspeed=9*this.orientation;}
						if(Math.abs(this.x+this.xspeed-camerax)>decalagex-this.charac.width/2){
							this.x += (2*decalagex+60)*signe(camerax-this.x);
							this.mov = "";this.movlag=0;
							if(this.jambe==1){this.mov= "jkick";this.movlag=29;}
							this.xspeed = 6*this.orientation;
						}
						break;
					case "spear_throw" :
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==stats.elag){
							add_to_objects_set(new Spear(this.x+20*this.orientation,this.y+73,this.orientation,other,stats,this));
						}
						else if(this.movlag == stats.elag-40+1){this.movlag=0;this.mov="";}
						break;
					case "slide":
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){this.xspeed=6*this.orientation;}
						break;
					case "charge":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==stats.elag+stats.fdur+stats.elag-1){this.invincibilite=stats.fdur;}
						if(this.movlag==stats.elag){this.invincibilite=this.xspeed=0;}
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){this.xspeed=7*this.orientation;}
						break;
					case "iceball":
						var stats = this.charac.coups.get(this.mov);
						this.crouching=0;
						if(this.movlag==stats.elag){
							add_to_objects_set(new Iceball(this.x+20*this.orientation,this.y+60,this.orientation,other,stats));
						}
						break;
					case "iceflask" :
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag==1){
							add_to_objects_set(new IceFlask(this.x+60*this.orientation,this.y-5,this.orientation,other,stats));
						}
						break;
					case "flying_kick":
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){this.x += 8*this.orientation;this.xspeed=0;}
						if(this.movlag>stats.elag){this.tb=0;}
						break;
					case "bicycle":
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){
							this.x += 3*this.orientation;this.xspeed=0;
							if((stats.elag+stats.fdur-this.movlag)%6==0){this.canthurt=false;}
						}
						this.tb=0;
						break;
					case "fireball":
						var stats = this.charac.coups.get(this.mov);
						this.crouching=0;
						if(this.movlag==stats.elag){
							add_to_objects_set(new Fireball(this.x+25*this.orientation,this.y+70,this.orientation,other,stats));
						}
						break;
					case "cycle":
						var stats = this.charac.coups.get(this.mov);
						this.x -= 4.5*this.orientation;this.xspeed=0;
						break;
					case "knifethrow":
						var stats = this.charac.coups.get(this.mov);
						this.crouching=0;
						if(this.movlag==stats.elag){
							add_to_objects_set(new Knife(this.x+20*this.orientation,this.y+60,this.orientation,other,stats, 6+this.memoryslot*0.2));
						}
						else if(this.movlag==stats.elag+6){
							if(this.special && this.memoryslot<20){this.memoryslot++;this.movlag++;}
						}
						break;
					case "homing_knife":
						var stats = this.charac.coups.get(this.mov);
						this.crouching=0;
						if(this.movlag==stats.elag){
							add_to_objects_set(new HomingKnife(this.x+20*this.orientation,this.y+60,this.orientation,other,stats));
						}
						break;
					case "ball":
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){this.xspeed=6*this.orientation;}
						break;
					}
				this.movlag--;
				if(this.movlag == 0){
					if(this.mov=="teleport_drop"){
						this.mov = "";
						var x = other.x+this.orientation*(this.charac.width/2+other.charac.width/2+10);
						if(Math.abs(x-camerax)>decalagex-this.charac.width/2){x = other.x-this.orientation*(this.charac.width/2+other.charac.width/2+10);}
						else{this.orientation*=-1;}
						this.x = x;
						this.y = 150; this.tb=-4; this.xspeed = 0;
						if(this.jambe==1 && (this.back || this.forward)){this.mov= "jkick";this.movlag=29;}
					}
					else if(this.mov == "jumpsquat"){this.mov = "";if((this.haut || this.jump) && this.bas == 0){this.tb = c.jumpforce;this.y = c.jumpforce;}else{this.tb = c.shorthop;this.y = c.shorthop;}}
					else if(this.mov == "air_dodge"){this.movlag = 100;this.mov = "free_fall";this.xspeed /=4;}
					else if(this.mov == "fanthrow" && this.y>0){this.movlag = 100;this.mov = "free_fall";}
					else if(this.mov == "squarepunch"){this.movlag = 100;this.mov = "free_fall";}
					else{this.mov = "";}
				}
			}
			this.x += this.xspeed;
			if(this.pushed>0){this.pushed--;this.x+=this.pushx;}
			let d = (this.charac.width+other.charac.width)/3;
			if(Math.abs(this.x-other.x)<d && this.y==0 && other.y==0){
				this.x=(this.x+other.x)/2+signe(this.x-other.x)*d;
				this.xspeed=0;
			}
			if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.x = signe(this.x-camerax)*(decalagex+signe(this.x-camerax)*camerax-this.charac.width/2)}
		}
		else
		{
			this.hurted--;
			this.movlag = 0;this.mov = "";
			this.x += this.xspeed*(1-(this.forward!=0 && this.y>0)*c.hurtcontrol+(this.back!=0 && this.y>0)*c.hurtcontrol);
			let d = (this.charac.width+other.charac.width)/3;
			if(Math.abs(this.x-other.x)<d && this.y==0 && other.y==0){
				this.x=(this.x+other.x)/2+signe(this.x-other.x)*d;
				this.xspeed=0;
			}
			if(this.y>0 || this.tb>0){this.y+=this.tb;this.tb-=c.gravity;}
			else if(this.y<0 && this.tb<=0){this.y=0;this.tb=0;}
			if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.x = signe(this.x-camerax)*(decalagex+signe(this.x-camerax)*camerax-this.charac.width/2);}
			if(this.y<=0 && this.falling){this.getup();}
			if(this.pushed>0){this.pushed--;this.x+=this.pushx;}
		}
		
		}

		loop(other)
		{
			if(this.canthurt){return;}
			if(this.charac.coups.has(this.mov)){
				var stats = this.charac.coups.get(this.mov);
				if(this.y==0 && other.y>0 && stats.hitboxys<0 && this.mov != "slide" && this.mov != "ball"){return;}
				if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){
					var hitboxxe = stats.hitboxxe;
					if(other.charac.coups.has(other.mov)){
						var stats2 = other.charac.coups.get(other.mov)
						if(entre(other.movlag,stats2.elag+1,stats2.elag+stats2.fdur)){hitboxxe+=stats2.hitboxxouv;}
					}
					if(entre((other.x-this.x)*this.orientation,stats.hitboxxs-other.charac.width/2-10*(other.falling!=0),hitboxxe+other.charac.width/2+10*(other.falling!=0)+stats.hitboxxeyscaling*(other.y-(this.y+stats.hitboxys)))){
						if(other.crouching>3){
							if((stats.hitboxys<=0 || this.y>0)  && entre((other.y-this.y),stats.hitboxys,stats.hitboxxe+other.charac.height/3)){other.hurt(this,stats);}
						}
						else if(other.y==0){
							if(entre((other.y-this.y),stats.hitboxys-2,stats.hitboxye+other.charac.height/3)){other.hurt(this,stats);}
						}
						else{
							if(entre((other.y-this.y),stats.hitboxys-other.charac.height/6,stats.hitboxye+other.charac.height/6-10*(other.falling!=0))){other.hurt(this,stats);}
						}
					}
				}
			}
		}


		losepv(n){
			this.pv-=n;
			if(this.pv<=0){
				this.killanim();
			}
		}

		hurt(other,stats){
			if(stats.hiteffect==""){return;}
			if(this.perso=="shao_kahn" && stats.hiteffect=="grab"){return;}
			if(this.mov=="jumpsquat" && stats.hiteffect=="grab"){return;}
			if(other.mov=="thundergod"){other.movlag=1;other.tb=8;other.xspeed = -1;other.y=0.1;}
			if(other.mov=="squarepunch"){other.movlag=1;other.tb=0;other.xspeed = -1;}
			if(this.invincibilite || end_of_round_countdown){return;}
			if(other.mov=="thundergod"){other.y=0;}
			if(other.mov=="charge"){other.movlag=8;other.xspeed=0;}
			if(other.mov=="flying_kick"){other.movlag=13;other.xspeed=0;}
			var parrywasdone = false;
			if(this.mov == "icebody"){
				var s = this.charac.coups.get("icebody");
				if(entre(this.movlag, s.elag+1, s.elag + s.fdur)){this.other.afficher(this);other.freeze=60;other.movlag=0;other.mov="";play_sound_eff("freeze");return;}
			}
			if(this.n==1 && !secondplayerishuman && (stats.hiteffect=="projectile" || stats.hiteffect=="spear")){this.ai.ugothitorblockedaprojectile();}
			if(this.blocking && this.bas && this.back){this.crouching=6;}
			if(this.movlag==0&&this.hurted==0&&this.back>=1&&this.y==0 && stats.hiteffect != "iceflask" && this.freeze==0 &&stats.hiteffect != "grab" && this.pv>0 && ((this.crouching<=3 && (other.y>0 || stats.hitboxys>=0) || (this.crouching>3 && other.y==0)) || stats.hiteffect=="projectile" || stats.hiteffect == "projectile_fall") && !(youareintutorial && !this.allowedmoves.includes("block"))){
				if(stats.hiteffect=="guard_break"){
					this.hurted = stats.blockstun;
					this.crouching=0;
				}
				else if(this.perfectblock>perfectblockcd && !(this.n==1 && !secondplayerishuman && Math.random()>this.ai.parryrate)){
					this.blocking = Math.ceil(stats.blockstun/3);
					play_sound_eff("parry");
					parrywasdone = true;
					this.perfectblock=1;
					this.parrying=1;
				}
				else{
					this.blocking = stats.blockstun;
				}
				if(!parrywasdone){this.pv-=stats.damageonblock;}
				if(this.pv<=0){this.pv = 1;}
				this.xspeed = -stats.blockx*this.orientation;
				if(parrywasdone){lag_game(11);}
				else{lag_game(Math.floor(stats.hitlag/0.8));}
				if(other.mov=="ball"){other.movlag=1;other.tb=6;other.xspeed = -1;other.y=0.1;other.falling=1;other.hurted=20;gamefreeze=0;}
				if(this.n==0 && !secondplayerishuman && stats.hiteffect!="projectile" && stats.hiteffect != "spear" && stats.hiteffect != "freeze"  && stats.hiteffect != "iceflask" && stats.hiteffect != "projectile_fall"){
					other.ai.ugotblocked();
				}
			}
			else{
				this.freeze=0;
				switch (stats.hiteffect){
					case "fall" :
					case "iceflask" :
					case "guard_break" :
						if(this.falling==0){this.falling = 1;}
						this.crouching = 0;
						play_sound_eff(this.charac.voiceactor+"hurted");
						if(Math.random()<stats.degats/25){play_sound_eff("compliment");}
						break;
					case "grab" :
						if(this.n==1 && !secondplayerishuman){this.ai.ugothit();}
						other.begin_grab(this);
						return;
					case "projectile" :
						slow_game(stats.hitlag*2,1.5);
						break;
					case "projectile_fall" :
						slow_game(stats.hitlag*2,1.5);
						if(this.falling==0){this.falling = 1;}
						this.crouching = 0;
						break;
					case "spear" :
						this.falling=0;
						this.y=0;
				}
				if(this.n==1 && !secondplayerishuman && stats.hiteffect != "projectile" && stats.hiteffect != "spear"&& stats.hiteffect != "freeze" && stats.hiteffect != "iceflask" && stats.hiteffect != "projectile_fall"){
					this.ai.ugothit();
				}
				if(this.n==0 && !secondplayerishuman && stats.hiteffect != "projectile" && stats.hiteffect != "spear" && stats.hiteffect != "freeze" && stats.hiteffect != "iceflask" && stats.hiteffect != "projectile_fall"){
					other.ai.ugotahit();
				}
					this.hurted = stats.hitstun;
				this.xspeed = stats.hurtx*other.orientation;
				this.tb = stats.hurty;
				this.pv -= Math.ceil(stats.degats*this.comboscaling);
				if(this.n==1 && secondplayerisdummy && this.pv<=0){this.pv=1;}
				if(stats.hiteffect=="spear" || stats.hiteffect=="freeze"){this.comboscaling-=0.2;}
				else{this.comboscaling -= 0.05;}
				if(this.comboscaling<=minimumcomboscaling){this.comboscaling=minimumcomboscaling;}
				if(stats.hiteffect != "projectile"  && stats.hiteffect != "projectile_fall"){lag_game(stats.hitlag);}
				play_sound_eff(stats.hitsound);
				shake_screen(stats.hitlag+2,stats.degats/4);
				if(stats.hiteffect=="freeze"){this.hurted=0;this.freeze=stats.hitstun;}
				else if(stats.blood=="electrocute"){this.electrocuted = 10;}
				else if(this.y==0 && this.crouching<=3 && (other.y>0 || stats.hitboxys >=0)){add_to_objects_set(new Blood(this.x,this.charac.height-20+stats.blood_height,-this.orientation,stats.blood));}
				else if((this.y==0 && stats.hitboxys<0) || this.crouching){add_to_objects_set(new Blood(this.x+10*this.orientation,this.charac.height/2+stats.hitboxys,-this.orientation,stats.blood));}
				else if(this.y>0 && other.y>0){add_to_objects_set(new Blood(this.x+10*this.orientation,this.y+this.charac.height/2+(other.y-this.y)/4,-this.orientation,stats.blood));}
				else if(this.y>0 && other.y==0){add_to_objects_set(new Blood(this.x+5*this.orientation,stats.hitboxye,-this.orientation,stats.blood));}
			}
			if(this.y>0 && other.y>0 && stats.hiteffect != "projectile" && stats.hiteffect != "freeze" && stats.hiteffect != "projectile_fall"){this.xspeed+=other.xspeed*2/3;this.hurted+=4;}
			if(Math.abs(this.x+this.xspeed*Math.abs(this.xspeed)/2/this.charac.friction-camerax)>decalagex-this.charac.width/2){other.pushed = Math.min(20,Math.floor((8+stats.hitstun)/2));other.pushx = - this.xspeed * 1.2; if(signe(other.xspeed)==signe(other.orientation)){other.xspeed=0;}}
			other.canthurt = true;
			if(stats.hiteffect == "iceflask"){this.invincibilite=60;}
			if(this.pv<=0){
				this.killanim();
			}
			if(other.mov=="thundergod"){other.y=0.1;}
		}

		killanim(){
			this.pv = 0;
			this.falling = 4;
			this.crouching=0;
			this.tb = Math.max(7,this.tb);
			this.y+=0.1;
			this.xspeed = signe(this.xspeed)*Math.max(Math.abs(this.xspeed),3);
			this.invincibilite = 150;
			if(this.perso=="shao_kahn" && roundwonsj1>=1){this.explode();}
			else{
				play_sound_eff(this.charac.voiceactor+"bighurted")
				slow_game(60,2);
				shake_screen(25,6);
				lag_game(20);
			}
			musiques[chosenstage].pause();
			roundover_musiques[chosenstage].play();
			if(finishhim){end_of_round_countdown=180;finishhim=0;}
		}

		afficher(other){
			if(this.grabbed&&other.grabbed==0){
				return;
			}
			if(this.freeze){}
			else if(this.fatality){
				if(this.perso=="kitana"){
					if(this.fatality>=70){this.costume = "fanswipe1"}
					else if(this.fatality>=65){this.costume = "fanswipe2"}
					else if(this.fatality>=60){this.costume = "fanswipe3"}
					else {this.costume = "fanswipe4"}
					if(this.fatality==64){other.decapitate();play_sound_eff("fan");}
				}
				else if(this.perso=="raiden"){
					if(this.fatality==110){other.y=20;}
					if(this.fatality>=40){
						this.costume = "elecgrab"+(Math.floor(this.fatality/4)%2+1);
						if(this.fatality%8==0){other.electrocuted=4;}
						if(this.fatality%20==0){play_sound_eff("electrocute");shake_screen(20,4);}
					}
					if(this.fatality==40){other.explode();}
				}
				else if(this.perso=="scorpion"){
					var n = 1;
					if(this.fatality>=176){n=1;}
					else if(this.fatality>=172){n=2;}
					else if (this.fatality>=168){n=3;}
					else if(this.fatality>=138){n=4;}
					else if(this.fatality>=132){n=5;}
					else if(this.fatality>=70){n=6;}
					else if(this.fatality>=64){n=5;}
					else if(this.fatality>=24){n=4;}
					else if(this.fatality>=16){n=3;}
					else if(this.fatality>=8){n=2;}
					if(this.fatality==130){add_to_objects_set(new ScorpionFlame(this.x+22*this.orientation,this.y+71,this.orientation,other,stats,this));}
					if(this.fatality==4){other.explode();}
					if(this.fatality==40){play_sound_eff("toasty");}
					this.costume = "flaming_skull"+n.toString();
				}
				else if(this.perso=="subzero"){
					var n = 1;
					if(this.fatality>=90){n=1;}
					else if(this.fatality>=75){n=3-Math.floor(this.fatality/3)%2;}
					else if(this.fatality>=72){n=4;}
					else if(this.fatality>=69){n=5;}
					else if(this.fatality>=66){n=6;}
					else if(this.fatality>=53){n=7;}
					else if(this.fatality>=50){n=8;}
					else if(this.fatality>=47){n=9;}
					else if(this.fatality>0){n=10;}
					if(this.fatality==46){add_to_objects_set(new IceGrenade(this.x+22*this.orientation,this.y+71,this.orientation,other,stats,this));}
					this.costume = "icegrenade"+n.toString();
				}
				else if(this.perso=="liukang"){
					if(this.poing==1){
						this.memoryslot++;
						this.poing=2;
					}
					if(this.fatality>=70){
						var n = 9;

						var a = 9-Math.floor((this.fatality-70)/30*(n));
						this.costume = "cycle"+a;
						this.x+=3.5*this.orientation;
					}
					else if(this.fatality>=56){
						this.x+=0.5*this.orientation;
						this.costume = "huppercut1"
					}
					else if(this.fatality>=53){
						this.costume = "huppercut2"
					}
					else if(this.fatality>=50){
						this.costume = "huppercut3"
					}
					else if(this.fatality>=10 || gamefreeze){
						this.costume = "huppercut4"
					}
					else{
						this.costume = "huppercut5"
					}
					if(this.fatality==49){
						if(this.memoryslot>=4){
							other.decapitate(2+this.memoryslot*0.4);this.poing=2;
							play_sound_eff("hhit");
							lag_game(10);
							shake_screen(12,6);
							this.fatality--;
						}
						else if(!this.canthurt){other.invincibilite=0;other.hurt(this,this.charac.coups.get("huppercut"));this.fatality=1;}
					}
					if(this.fatality==99){play_sound_eff("liummov");}
					if(this.fatality==58){play_sound_eff("liuhmov");}
				}
			}
			else if(this.decapitated){
				if(this.decapitated>=2){this.decapitated--;}
				if(this.decapitated>=80){this.costume = "decapitated1";}
				else if(this.decapitated>=75){this.costume = "decapitated2";}
				else if(this.decapitated>=70){this.costume = "decapitated3";}
				else if(this.decapitated>=65){this.costume = "decapitated4";}
				else if(this.decapitated>=60){this.costume = "decapitated5";}
				else {this.costume = "decapitated6";}
			}
			else if(this.vicpose){
				let n = Math.min(Math.ceil(this.vicpose/(this.charac.vicposfdur/this.charac.vicposframes)),this.charac.vicposframes);
				if(this.perso=="raiden" && n>=5){n=5+Math.floor((this.vicpose%6)/3)}
				this.costume = "victory" + n;
				this.vicpose++;
				//alert(this.costume);
			}
			else if(gamefreeze && !still_draw){}
			else if(this.grabbing){
				if(this.grabbing<=this.charac.grabfdur*1/7){this.costume = "grabbing1";}
				else if(this.grabbing<=this.charac.grabfdur*2/7){this.costume = "grabbing2";}
				else if(this.grabbing<=this.charac.grabfdur*3/7){this.costume = "grabbing3";}
				else if(this.grabbing<=this.charac.grabfdur*4/7){this.costume = "grabbing4";}
				else if(this.grabbing<=this.charac.grabfdur*5/7){this.costume = "grabbing5";}
				else if(this.grabbing<=this.charac.grabfdur*6/7){this.costume = "grabbing4";}
				else {this.costume = "grabbing3";}
			}
			else if(this.falling){
				if(this.falling<=5){this.costume = "hurted2";}
				else if(this.falling<=14){this.costume = "falling1";}
				else if(this.falling<=23){this.costume = "falling2";}
				else {this.costume = "falling3";}
				this.falling++;
			}
			else if(this.hurted){
				if(this.crouching>3){
					if(this.hurted>=15){this.costume = "churted2";}
					else{this.costume = "churted1";}
				}
				else{
					if(this.hurted>=15){this.costume = "hurted2";}
					else{this.costume = "hurted1";}
				}
			}
			else if(this.gettingup){
				if(this.gettingup<=this.charac.getupfdur/6){this.costume = "grounded1"}
				else if(this.gettingup<=this.charac.getupfdur*2/6){this.costume = "grounded2";if(this.pv<=0 && finishhim==0){this.gettingup--;this.invincibilite++;}}
				else if(this.gettingup<=this.charac.getupfdur*3/6){this.costume = "getup1"}
				else if(this.gettingup<=this.charac.getupfdur*4/6){this.costume = "getup2"}
				else if(this.gettingup<=this.charac.getupfdur*5/6){this.costume = "getup3"}
				else {this.costume = "getup4"}
				//alert(this.costume);
			}
			else if((finishhim || other.fatality || fatalitywasdone) && this.pv<=0){
				var a = Math.floor((finishhim+other.fatality)/7)%this.charac.stunnframes+1;
				this.costume = "stunned"+a;
				//alert(this.costume);
			}
			else if(this.blocking){
				if(this.crouching>3){
					if(this.blocking>4){this.costume = "cblocking2";}
					else{this.costume = "cblocking1";}
				}
				else{
					if(this.blocking>4){this.costume = "blocking2";}
					else{this.costume = "blocking1";}
				}
			}
			else if(this.movlag>=1){
				switch(this.mov)
				{
					case "free_fall" :
						this.costume = "jump2";
						break;
					case "jumpsquat" :
						if(this.xspeed==0){this.costume = "jump1";}else{this.costume = "jump3";}
						this.jumping = -7;
						break;
					case "forward_dash" :
					case "back_dash" :
					case "air_dodge" :
						this.costume = "jump2";
						break;
					case "landing_lag" :
						this.costume = "crouching1";
						break;
					case "lpunch" :
					case "hpunch" :
					case "cmkick" :
					case "thundergod" :
					case "leg_takedown" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+"3"}
						else if(entre(this.movlag,0,stats.elag/2)||entre(this.movlag,stats.elag+stats.fdur+stats.slag/2,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"1"}
						else{this.costume = this.mov+"2";}
						break;

					case "lkick" :
					case "mkick" :
						var nframes = this.charac.kicknframe;
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+nframes.toString()}
						else if (this.movlag<stats.elag){
							var a = Math.floor(this.movlag/stats.elag*(nframes-1))+1;
							this.costume = this.mov+a.toString();
						}
						else{
							var a = nframes-1-Math.floor((this.movlag-stats.elag-stats.fdur)/stats.slag*(nframes-1));
							this.costume = this.mov+a.toString();
						}
						break;

					case "hkick" :
						var stats = this.charac.coups.get(this.mov);
						var n = this.charac.hkickstartnframe;
						var nframes = this.charac.hkickendnframe;
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+(n+1)}
						else if(this.movlag>=stats.elag+stats.fdur){
							var a = n-Math.floor(((this.movlag-(stats.elag+stats.fdur))/stats.slag)*n)
							this.costume = this.mov+a;
						}
						else{
							var a = nframes+n+1-Math.floor(this.movlag/stats.elag*(nframes));
							this.costume = this.mov+a;
						}
						break;

					case "cycle" :
						var stats = this.charac.coups.get(this.mov);
						var n = 9;

						var a = 1+Math.floor(this.movlag/stats.elag*(n));
						this.costume = this.mov+a;
						
						break;

					case "clpunch" :
					case "clkick" :
					case "jkick" :
					case "jskick" :
					case "jpunch" :
					case "fanlift" :
					case "elecgrab" :
					case "slide" :
					case "icebody" :
					case "charge" :
					case "flying_kick" :
					case "teleport_drop" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){this.costume = this.mov+"2"}
						else{this.costume = this.mov+"1";}
						break;

					case "bicycle" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){
							var n = Math.floor((stats.elag+stats.fdur-this.movlag)/2)%6+1;
							this.costume = this.mov+n.toString()
						}
						else{this.costume = this.mov+"1";}
						break;

					case "huppercut" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag/3,stats.elag+stats.fdur)){this.costume = this.mov+"4"}
						else if(this.movlag>=stats.elag+stats.fdur+stats.slag*2/3){this.costume = this.mov+"1"}
						else if(this.movlag>=stats.elag+stats.fdur+stats.slag/3){this.costume = this.mov+"2"}
						else if(this.movlag>=stats.elag+stats.fdur){this.costume = this.mov+"3"}
						else {this.costume = this.mov+"5"}
						break;

					case "knifethrow" :
					case "homing_knife" :
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag>=stats.elag+stats.fdur+stats.slag*3/4){this.costume = "knifethrow"+"2"}
						else if(this.movlag>=stats.elag+stats.fdur+stats.slag/2){this.costume = "knifethrow"+"1"}
						else if(this.movlag>=stats.elag+stats.fdur){this.costume = "knifethrow"+"2"}
						else {this.costume = "knifethrow"+"3"}
						break;

					case "grab" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag/2,stats.elag+stats.fdur)){this.costume = "lpunch2"}
						else{this.costume ="lpunch1";}
						break;

					case "fanthrow" :
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag<=stats.elag/4&&this.y==0){this.costume = "huppercut5";}
						else if(this.movlag<=stats.elag){this.costume = "fanthrow4";}
						else if(this.movlag<=stats.elag+stats.slag/4){this.costume = "fanthrow3";}
						else if(this.movlag<=stats.elag+stats.slag*2/4){this.costume = "fanthrow2";}
						else{this.costume = "fanthrow1";}

					case "fanswipe" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+"3"}
						else if(entre(this.movlag,stats.elag+stats.fdur+stats.slag/2,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"1"}
						else if(this.movlag>=stats.elag){this.costume = this.mov+"2"}
						else {this.costume = this.mov+"4"}
						break;
					
					case "teleport" :
						var stats = this.charac.coups.get(this.mov);
						var n = 4-Math.floor(Math.abs(this.movlag-12)/3)
						this.costume = "getup"+n;
						break;

					case "boltthrow" :
					case "fireball" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.slag,stats.slag+stats.fdur+stats.elag-10)){this.costume = this.mov+"2"}
						else{this.costume = this.mov+"1";}
						break;
					case "iceball" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.slag,stats.slag+stats.fdur+stats.elag-10)){this.costume = this.mov+"3"}
						else if(entre(this.movlag,stats.slag-5,stats.slag+stats.fdur+stats.elag-5)){this.costume = this.mov+"2"}
						else{this.costume = this.mov+"1";}
						break;
					case "squarepunch" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,0,stats.elag+stats.fdur)){this.costume = "jpunch2";}
						else if(entre(this.movlag,stats.elag+stats.fdur,stats.elag+stats.fdur+2)){this.costume = "jpunch1";}
						else{this.costume = "jump2";}
						break;

					case "hell_gates" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume="jump2"}
						break;
					
					case "spear_throw" :
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag>stats.elag+stats.fdur){
							var a = 2-Math.floor(((this.movlag-(stats.elag+stats.fdur))/stats.slag)*2)
							this.costume = this.mov+a;
						}
						else if(this.movlag>stats.elag-40){this.costume = "spear_throw3";}
						else if(this.movlag>stats.elag-43){this.costume = "spear_throw4";}
						else if(this.movlag>stats.elag-46){this.costume = "spear_throw5";}
						else{this.costume = "spear_throw6";}
						break;

					case "iceflask" :
						var stats = this.charac.coups.get(this.mov);
						var a = 7-Math.floor(this.movlag/stats.slag*(7));
						this.costume = "iceflask" + a.toString();
						break;

					case "ball" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag+1,stats.elag+stats.fdur)){this.costume = "roll"+(Math.floor((this.movlag-6)/this.charac.rollspeed)+1).toString()}
						else{this.costume = "crouching2";}
						break;

				}
			}
			else if (this.y>0 && !is_in_charc_screen){
				if(this.xspeed == 0){this.costume = "jump2";}
				else{
					
					if(this.jumping<0){this.costume = "jump3";this.jumping+=1;}
					else {this.jumping = mod(this.jumping+signe(this.xspeed*this.orientation),7*this.charac.rollspeed);
						let a = Math.floor(this.jumping/this.charac.rollspeed)+1;
						this.costume = "roll"+a;	
					}
				}
			}
			else if(this.crouching>=1){
				if(this.crouching<=3){this.costume = "crouching1";}
				else{this.costume = "crouching2";}
			}
			else if(this.forward==0 && this.back==0)
			{
				this.standing = (this.standing+1)%(5*this.charac.standnframes);
				let a = Math.floor(this.standing/5)+1
				this.costume = "stand"+a;
				this.walking=0;
				//alert(this.costume);
			}
			else{this.standing=0;
				if(this.forward>=1 || this.back>=1){
					var a = 5*this.charac.walknframes;
					if(this.forward>=1){this.walking=(this.walking+1)%a;}else{this.walking=(this.walking+a-1)%a;}
					if(this.walking<5){this.costume="walk1"}
					else if(this.walking<10){this.costume="walk2"}
					else if(this.walking<15){this.costume="walk3"}
					else if(this.walking<20){this.costume="walk4"}
					else if(this.walking<25){this.costume="walk5"}
					else if(this.walking<30){this.costume="walk6"}
					else if(this.walking<35){this.costume="walk7"}
					else if(this.walking<40){this.costume="walk8"}
					else {this.costume="walk9"}
					//alert(this.costume);
				}
			}

			if(other.grabbed && this.grabbed==0){
				var angletot = Math.PI;
				if(this.charac.grabtype == "launch"){
					angletot = Math.PI*1/2;
				}
				if(this.grabbing<=this.charac.grabfdur*1/7){var othercost = "grabbed1";}
				else if(this.grabbing<=this.charac.grabfdur*2/7){var othercost = "grabbed2";}
				else if(this.grabbing<=this.charac.grabfdur*3/7){var othercost = "grabbed3";}
				else {var othercost = "grabbed4";}
				var angle = this.grabbing*7/5/this.charac.grabfdur*angletot;
				var x = this.orientation*this.charac.grabxdist*Math.cos(angle)+this.x;
				var y = this.charac.grabydist*Math.sin(angle)+this.y;
				other.x = x;		//pour la camera
				ctx.scale(2*other.orientation,2);
				var coords = other.coordinates.get(othercost);
				ctx.drawImage(other.skin,coords.offx,coords.offy,coords.width,coords.height,(x+decalagex-camerax+coords.decx*this.orientation-other.orientation*other.charac.width/2+shakex)*other.orientation,ground-y-coords.height-coords.decy+shakey,coords.width,coords.height);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(1,1);
				other.drawLife();
			}

			
			if(this.burning && !this.hide){
				this.costume = "burning"+(Math.floor(this.burning/4)+1).toString();
				this.burning = (this.burning+1)%19+1;
				ctx.scale(2*this.orientation,2);
				var coords = bloodcoordinates.get(this.costume);
				ctx.drawImage(bloodpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.charac.width/2+shakex)*this.orientation,ground-this.y-coords.height-coords.decy+shakey,coords.width,coords.height);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(1,1);
			}
			else if(this.hide==0){
				var y = this.y;
				if(this.mov == "teleport_drop"){y = -8*(12-this.movlag)}
				else if(this.mov == "ball"){y = -10;}
				if(this.electrocuted){
					this.electrocuted--;
					ctx.filter = 'brightness(1.8)';
				}
				if(this.freeze){
					ctx.filter = 'brightness(1.2) saturate(0.5)';
				}
				if(this.parrying){
					ctx.filter = 'brightness(1.5) saturate(1.5)';
				}
				ctx.scale(2*this.orientation,2);
				var coords = this.coordinates.get(this.costume);
				ctx.drawImage(this.skin,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.charac.width/2+shakex)*this.orientation,ground-y-coords.height-coords.decy+shakey,coords.width,coords.height);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(1,1);

				ctx.filter = 'none';
			}

			if(!is_in_charc_screen){this.drawLife();}


		
		}

		drawLife() {
			let shake_x = 0;let shake_y = 0;
			if(this.pvaff>this.pv){
				this.pvaff -= 1;
				let sh_f = (this.pvaff-this.pv)*0.8;
				shake_x = Math.random()*2*sh_f-sh_f;shake_y = Math.random()*2*sh_f-sh_f;
			}
			ctx.fillStyle='rgb(148,16,16)';ctx.fillRect(126+this.n*475+shake_x,30+shake_y,288,30);
			ctx.fillStyle='rgb(107,189,33)';
			if(this.n==0){ctx.fillRect(126+shake_x,30+shake_y,this.pvaff/this.pvmax*288,30);}
			else{ctx.fillRect(120+475+288+6-this.pvaff/this.pvmax*288+shake_x,30+shake_y,this.pvaff/this.pvmax*288,30);}
			ctx.drawImage(lifebarpng,120+this.n*475+shake_x,25+shake_y);
			for(var i=0;i<4;i++){
				if(this.perso=="mileena" && i==0){
					for(var j=0; j<this.ressource; j++){
						ctx.fillStyle = "white";
						ctx.fillRect(140+this.n*730+(60-120*this.n)*i, 120-20*j, 10, 10);
					}
					ctx.drawImage(this.charac.icons[i],120+this.n*730+(60-120*this.n)*i,88);
				}
				else if(this.cooldowns[i]>0){ctx.drawImage(this.charac.icons[i],0,0,50,50*this.cooldowns[i]/this.charac.cds[i],120+this.n*730+(60-120*this.n)*i,80,50,50*this.cooldowns[i]/this.charac.cds[i]);}
			}
			ctx.scale(2,2);
			if(this.n==0){
				if(roundwonsj1>=1){ctx.drawImage(roundwoniconpng,7,13);}
				if(roundwonsj1>=2){ctx.drawImage(roundwoniconpng,24,13);}
			}
			else{
				if(roundwonsj2>=1){ctx.drawImage(roundwoniconpng,490,13);}
				if(roundwonsj2>=2){ctx.drawImage(roundwoniconpng,473,13);}
			}
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			ctx.fillStyle = "red";
			ctx.font = "50px Luminari";
			ctx.fillText(Math.max(Math.round(timer/60),0).toString(),485,60);
			
		}

		declencher_vicpose(){
			if(this.pv>0&&end_of_round_countdown==pause_after_vicpose+Math.max(this.charac.vicposfdur,35)){this.vicpose = 1;}
		}

		decapitate(power = 2){
			this.decapitated = 100;
			add_to_objects_set(new Head(this.x,this.y+this.charac.height,this.orientation,this.skin,this.coordinates, power));
			add_to_objects_set(new Blood(this.x,this.y+this.charac.height-5,this.orientation,"hblood"));
		}

		explode(){
			this.hide=1;
			for(var i=0;i<25;i++){
				add_to_objects_set(new Organ(this.x,this.y+this.charac.height/2,this.orientation, (this.burning!=0)));
			}
			if(this.perso!="shao_kahn"){
				if(!this.burning){add_to_objects_set(new Head(this.x,this.y+this.charac.height,this.orientation,this.skin,this.coordinates,5.5));}
				shake_screen(30,10);
			}
			else{
				shake_screen(40,15);
				slow_game(40,2);
			}
			play_sound_eff("explosion");
		}

		burn(){
			this.burning=1;
			play_sound_eff(this.charac.voiceactor+"bighurted");
		}

	}


	function shake_loop(){
		if(shakeframe > 0){
			shakeframe --;
			if(shakeframe<=3){shakeforce*=0.8;}
			shakex = -shakeforce + 2*Math.random()*shakeforce;
			shakey = -shakeforce + 2*Math.random()*shakeforce;
		}
		else{
			shakex = 0; shakey = 0;
		}
	}

	function drawStage(){
		if(fatalitywasdone || fatalitysreen){ctx.filter = 'brightness(0.5)';}
		ctx.scale(2,2);
		if(stagesbackground[chosenstage] != null){ctx.drawImage(stagesbackground[chosenstage],-90*backgroundscroll[chosenstage]-camerax*backgroundscroll[chosenstage],0);}
		if(stagesstruct[chosenstage] != null){ctx.drawImage(stagesstruct[chosenstage],-camerax+238-stage_size/2+shakex,shakey);}
		if(stagesground[chosenstage] != null){ctx.drawImage(stagesground[chosenstage],-camerax+256-stage_size/2+shakex,178+shakey);}
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(1,1);
		ctx.filter = 'none';
	}


	function affichtt(){
		shake_loop();
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,1024,576);
		var idealcamerax = (j1.x+j2.x)/2;
		if(fixcamera){fixcamera--;}
		else{
			if(Math.abs(camerax-idealcamerax)<=vitcamera){camerax = idealcamerax;}
			else{camerax+=signe(idealcamerax-camerax)*vitcamera;}
		}
		let m = stage_size/2-256;
		if(camerax<-m){camerax=-m}
		if(camerax>m){camerax=m}
		drawStage();
		if(fightstartcountdown>=60){
			if(fightstartcountdown==129){roundswav[roundwonsj1+roundwonsj2].play();}
			ctx.fillStyle = "yellow";
			ctx.font = "50px Luminari";
			ctx.fillText("Round "+((roundwonsj1+roundwonsj2+1).toString()),425,220);
		}
		else if(fightstartcountdown){
			if(fightstartcountdown==50){fightwav.play();}
			else if(fightstartcountdown==1 && musiqueon){musiques[chosenstage].currentTime=0;musiques[chosenstage].play();}
			ctx.scale(3,3);
			if(fightstartcountdown%6>=3){ctx.drawImage(fightrediconpng,122,50);}
			else{ctx.drawImage(fightyellowiconpng,122,50);}
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
		}
		for(let value of objects_to_loop.values()){
			if(value.vitesse==0){value.afficher();}
		}
		if(j2.hurted || j2.pv<=0){
			j2.afficher(j1);
			j1.afficher(j2);
		}
		else{
			j1.afficher(j2);
			j2.afficher(j1);
		}
		if(finishhim && finishhim<=270){
			var s = "m";
			if((j1.pv==0 && j1.charac.sex == "f") || (j2.pv==0 && j2.charac.sex == "f")){s = "f";}
			ctx.scale(3,3);
			if(finishhim%6>=3){
				if(s=="f"){ctx.drawImage(finishherredpng,85,50);}
				else{ctx.drawImage(finishhimredpng,85,50);}
			}
			else{
				if(s=="f"){ctx.drawImage(finishheryellowpng,85,50);}
				else{ctx.drawImage(finishhimyellowpng,85,50);}
			}
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
		}
		if(finishhim==270){
			if((j1.pv==0 && j1.charac.sex == "f") || (j2.pv==0 && j2.charac.sex == "f")){play_sound_eff("finishher");}
			else{play_sound_eff("finishhim");}
		}
		if(fatalitysreen){
			ctx.scale(4,4);
			ctx.drawImage(fatalitypng,75,40);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);
			if(fatalitysreen==40){play_sound_eff("fatal2");}
		}
		for(let value of objects_to_loop.values()){
			if(value.vitesse!=0){value.afficher();}
		}

		still_draw = false;
	}

	function checkforend(){
		if(j1.pv<=0){
			musiques[chosenstage].pause();
			j1.pv=0;
			if(j2.pv>0){roundwonsj2 ++;}
			if(roundwonsj2>=2 && finishhim==0){
				finishhim = 300;
			}
			else{
				end_of_round_countdown = 180;
				finishhim=0;
			}
		}
		if(j2.pv<=0){
			musiques[chosenstage].pause();
			j2.pv=0;
			if(j1.pv>0){roundwonsj1 ++;}
			if(roundwonsj1>=2 && finishhim==0 && j2.perso!="shao_kahn"){
				finishhim = 300;
			}
			else{
				end_of_round_countdown = 180;
				finishhim=0;
			}
		}
	}

	function reset_game(reset_ai=true){
		timer = timer_init;
		gamepaused = false;
		if(reset_ai){roundwonsj1=0;roundwonsj2=0;}
		j1.reinit(-150,0,persoschoisis[0],0,skinschoisis[0],j2,reset_ai);j2.reinit(150,0,persoschoisis[1],1,skinschoisis[1],j1,reset_ai);frame_delay = base_frame_delay;
		cpt = 0; objects_to_loop.clear();
		end_of_round_countdown=0;
		if(introon && !secondplayerisdummy){fightstartcountdown = 130;}else{fightstartcountdown=1;}
		fatalitywasdone = false; fatalitysreen = 0;
	}

	function gobacktotitlescreen(){
		persolocked = [0,0]; skinschoisis = [0,0];arcadelevel=-1;functiontoexecute = titlescreen;
		roundwonsj1 = 0; roundwonsj2 = 0; camerax = 0;
		if(difficulte<0){difficulte=0;}
		is_in_charc_screen = true; secondplayerchosescharac=true; secondplayerisdummy=false; youareintutorial = false;
		reset_game(true);
		reset_for_charac_screen(0);
		reset_for_charac_screen(1);
		return;
	}

	function choserandomstage(){
		chosenstage = Math.floor(Math.random()*numberofstages);
		if(arcadelevel>=0){chosenstage = arcadestagesorder[arcadelevel];}
		ground = grounds[chosenstage];
		stage_size = stagesizes[chosenstage];
	}


	function loop(){
		resizecanvas();
		if(gamepaused){
			if(pausepressed==1){pausepressed=2;gamepaused=false;musiques[chosenstage].play();}
			ctx.fillStyle = "gray";
			ctx.fillRect(412,150,200,60);
			ctx.fillRect(412,250,200,60);
			ctx.font = "40px serif";
			ctx.fillStyle = "white";
			ctx.fillText("Reset",465,190);
			ctx.fillText("Quit",475,290);
			if(click==1 && entre(clickx,412/1024,612/1024) && entre(clicky,150/500,210/500)){
				click=2;if(youareintutorial){launchtutorial(currentuto);}else{reset_game(true);}
			}
			else if(click==1 && entre(clickx,412/1024,612/1024) && entre(clicky,250/500,310/500)){click=2;reset_game(true);gobacktotitlescreen();}
			return;
		}
		else{
			if(pausepressed==1){pausepressed=2;if(j1.pv>0 && j2.pv>0){gamepaused=true;musiques[chosenstage].pause();}}
		}
		if(gamefreeze){gamefreeze--;}
		else{
			j1.miseajour(j2);
			j2.miseajour(j1);
			j1.loop(j2);
			j2.loop(j1);
			for(let value of objects_to_loop.values()){
				value.loop();
			}
		}
		affichtt();
		if(end_of_round_countdown==0 && finishhim==0 && j1.fatality==0 && j2.fatality==0){
			checkforend();
			if(fightstartcountdown==0){
				if(!secondplayerisdummy && !youareintutorial){timer--;}
				if(timer<0 && timer%20==0){j1.losepv(1);j2.losepv(1);}
			}
		}
		else if(end_of_round_countdown==1){
			if(youareintutorial){
				if(j1.pv>0){tutorialscenenumber++;}
				if(tutorialscenenumber>=currenttutoline.length){gobacktotitlescreen();}
				else{launchtutorial(currenttutoline[tutorialscenenumber]);}
			}
			else if(fatalitywasdone){
				fatalitywasdone = 0;
				fatalitysreen = 100;
				play_sound_eff("fatality");
			}
			else if(fatalitysreen){
				fatalitysreen--;
			}
			else {
				if(roundwonsj1>=2 || roundwonsj2>=2){
					if(roundwonsj1>=2 && arcadelevel>=0){
						arcadelevel+=1;
						if(arcadelevel>liste_persos.length){
							reset_game(true);
							gobacktotitlescreen();
							return;
						}
						roundwonsj1 = 0; roundwonsj2 = 0; camerax = 0;
						persolocked = [0,0];
						if(arcadelevel==liste_persos.length){persoschoisis[1] = "shao_kahn"}
						else{persoschoisis[1] = arcadeorder[arcadelevel];}
						skinschoisis[1] = randomInt(0,1);
						choserandomstage();
						if(persoschoisis[1]==persoschoisis[0]){skinschoisis[1]=(skinschoisis[0]+1)%2;}
						reset_game(true);
						return;
					}
					roundwonsj1 = 0; roundwonsj2 = 0; camerax = 0;
					persolocked = [0,0];
					skinschoisis = [0,0];
					is_in_charc_screen = true;
					reset_for_charac_screen(0);
					reset_for_charac_screen(1);
					lockincountdown=0;
					functiontoexecute = menupersos;
					return;
				}
			
				else{reset_game(false);}
			}
		}
		else if(end_of_round_countdown){
			end_of_round_countdown--;
			if(j1.pv<=0 && j2.perso=="shao_kahn" && j2.pv>0){
				if(end_of_round_countdown==100){play_sound_eff("shaowinquote");}
			}
			else{
				if(end_of_round_countdown==110 && j1.pv>0){characteristics.get(persoschoisis[0]).namewav.play();}
				if(end_of_round_countdown==110 && j2.pv>0){characteristics.get(persoschoisis[1]).namewav.play();}
				if(end_of_round_countdown==60 && (j1.pv>0 || j2.pv>0)){play_sound_eff("wins");}
			}
			j1.declencher_vicpose();
			j2.declencher_vicpose();
		}
		else if(finishhim){
			finishhim--;
			if(finishhim==0){
				if(j1.pv<=0){
					j1.falling=1;
					j1.y=1;
				}
				if(j2.pv<=0){
					j2.falling=1;
					j2.y=1;
				}
				end_of_round_countdown=180;
			}
		}
		if(fightstartcountdown){
			if(youareintutorial){
				ctx.fillStyle = "gray";
				ctx.fillRect(312,100,400,300);
				ctx.fillStyle = "white";
				ctx.font = "20px serif";
				printAtWordWrap(ctx,currentuto.msg, 332, 140, 22, 360);
				if(j1.poing==1){j1.poing=2;fightstartcountdown=0;musiques[chosenstage].play();}
			}
			else {fightstartcountdown--;}
		}
		if(slowmodur){slowmodur--;}
		else{frame_delay = base_frame_delay;}
	}

	function reset_for_charac_screen(n){
		if(n==0){j1.reinit(-210,60,liste_persos[persosovered[0]],0,skinschoisis[0],j2,true);}
		else{j2.reinit(210,60,liste_persos[persosovered[1]],1,skinschoisis[1],j1,true);}
	}


	function launchtutorial(tuto){
		persoschoisis = tuto.char;
		currentuto = tuto;
		skinschoisis = [0,1];
		is_in_charc_screen = false;
		difficulte = tuto.ai;
		reset_game(true);
		j1.pvmax = tuto.pv[0]; j1.pv = tuto.pv[0]; j1.pvaff = tuto.pv[0];
		j2.pvmax = tuto.pv[1]; j2.pv = tuto.pv[1]; j2.pvaff = tuto.pv[1];
		j2.ai.wanttojump += tuto.jumper;
		j1.allowedmoves = tuto.moves[0]; j2.allowedmoves = tuto.moves[1];
		choserandomstage();
		functiontoexecute = loop;
	}

	function menupersos(){
		resizecanvas();
		chartimer = (chartimer+1)%(chartimercycle*2);
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,1024,576);
		var leftside = 134; var topside = 40;
		//ctx.scale(2.32,2.32);
		//ctx.drawImage(characterscreenpng,92,0);
		//ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(3,3);
		for(var i=0;i<liste_persos.length;i++){
			ctx.drawImage(characteristics.get(liste_persos[i]).icon,leftside+24*(i%3),topside+40*Math.floor(i/3));
		}
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(2,2);
		ctx.drawImage(playericonpng,8,210);
		if(secondplayerishuman){
			ctx.drawImage(playericonpng,482,210);
		}
		else{
			ctx.drawImage(boticonpng,482,210);
			ctx.fillStyle = "white";
			ctx.font = "18px serif";
			ctx.fillText(difficultynames[difficulte],410,220);
			ctx.fillText(" -   +",420,240);
		}
		if(click==1){
			click=2;
			if(entre(clickx,482/512,505/512) && entre(clicky,210/250,241/250) && secondplayerchosescharac){secondplayerishuman = !secondplayerishuman}
			if(!secondplayerishuman && entre(clickx,425/512,435/512) && entre(clicky,230/250,240/250) && arcadelevel<=0){difficulte = Math.max(difficulte-1,0)}
			if(!secondplayerishuman && entre(clickx,444/512,454/512) && entre(clicky,230/250,240/250) && arcadelevel<=0){difficulte = Math.min(difficulte+1,difficultynames.length-1)}
			if(entre(clickx,400/1024,610/1024) && entre(clicky,450/500,480/500)){persolocked = [0,0]; skinschoisis = [0,0];gobacktotitlescreen();return;}
		}
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(1,1);
		if(chartimer<chartimercycle || persolocked[0]){
			ctx.strokeStyle = "red";
			ctx.strokeRect(leftside*3+72*(persosovered[0]%3),topside*3+120*Math.floor(persosovered[0]/3),63,96);
		}
		if(secondplayerchosescharac && ((chartimer>=chartimercycle && persosovered[0]==persosovered[1]) || (chartimer<chartimercycle && persosovered[0]!=persosovered[1]) || persolocked[1])){
			ctx.strokeStyle = "green";
			ctx.strokeRect(leftside*3+72*(persosovered[1]%3),topside*3+120*Math.floor(persosovered[1]/3),63,96);
		}

		
		//ctx.font = "20px serif";
		//ctx.fillText("1",415+72*persosovered[0],205);
		//ctx.fillText("2",415+72*persosovered[1],230);
		if(j1.droite==1){
			j1.droite=2;
			if(!persolocked[0]){
				if(persosovered[0]%3<2){
					persosovered[0]=Math.min(liste_persos.length-1,persosovered[0]+1);
					reset_for_charac_screen(0);
					play_sound_eff("cursor_move");
				}
			}
			else if(!secondplayerishuman && !persolocked[1] && secondplayerchosescharac){
				if(persosovered[1]%3<2){
					persosovered[1]=Math.min(liste_persos.length-1,persosovered[1]+1);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j1.gauche==1){
			j1.gauche=2;
			if(!persolocked[0]){
				if(persosovered[0]%3>0){
					persosovered[0]=Math.max(0,persosovered[0]-1);
					reset_for_charac_screen(0);
					play_sound_eff("cursor_move");
				}
			}
			else if(!secondplayerishuman && !persolocked[1] && secondplayerchosescharac){
				if(persosovered[1]%3>0){
					persosovered[1]=Math.max(0,persosovered[1]-1);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j1.haut==1){
			j1.haut=2;
			if(!persolocked[0]){
				if(persosovered[0]>2){
					persosovered[0]=Math.min(liste_persos.length-1,persosovered[0]-3);
					reset_for_charac_screen(0);
					play_sound_eff("cursor_move");
				}
			}
			else if(!secondplayerishuman && !persolocked[1] && secondplayerchosescharac){
				if(persosovered[1]>2){
					persosovered[1]=Math.min(liste_persos.length-1,persosovered[1]-3);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j1.bas==1){
			j1.bas=2;
			if(!persolocked[0]){
				if(persosovered[0]<=2){
					persosovered[0]=Math.min(liste_persos.length-1,persosovered[0]+3);
					reset_for_charac_screen(0);
					play_sound_eff("cursor_move");
				}
			}
			else if(!secondplayerishuman && !persolocked[1] && secondplayerchosescharac){
				if(persosovered[1]<=2){
					persosovered[1]=Math.min(liste_persos.length-1,persosovered[1]+3);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j2.droite==1){
			j2.droite=2;
			if(!persolocked[1]){
				if(persosovered[1]%3<2){
					persosovered[1]=Math.min(liste_persos.length-1,persosovered[1]+1);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j2.gauche==1){
			j2.gauche=2;
			if(!persolocked[1]){
				if(persosovered[1]%3>0){
					persosovered[1]=Math.max(0,persosovered[1]-1);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j2.haut==1){
			j2.haut=2;
			if(!persolocked[1]){
				if(persosovered[1]>2){
					persosovered[1]=Math.min(liste_persos.length-1,persosovered[1]-3);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if(j2.bas==1){
			j2.bas=2;
			if(!persolocked[1]){
				if(persosovered[1]<=2){
					persosovered[1]=Math.min(liste_persos.length-1,persosovered[1]+3);
					reset_for_charac_screen(1);
					play_sound_eff("cursor_move");
				}
			}
		}
		if((j2.poing==1 || j2.jambe==1) && secondplayerishuman && !persolocked[1]){
			if(j2.poing==1){skinschoisis[1]=0;}
			else{skinschoisis[1]=1;}
			if(j1.poing==1){j1.poing=2;}
			else{j1.jambe=2;}
			persolocked[1]=true;
			if(persolocked[1] && persosovered[1]==persosovered[0]){skinschoisis[1]=(skinschoisis[0]+1)%2;}
			characteristics.get(liste_persos[persosovered[1]]).namewav.currentTime=0;
			characteristics.get(liste_persos[persosovered[1]]).namewav.play();
			reset_for_charac_screen(1);
			j2.vicpose=1;
		}
		if(j1.poing==1 || j1.jambe==1){
			if(!persolocked[0]){
				persolocked[0]=true;
				if(j1.poing==1){skinschoisis[0]=0;}
				else{skinschoisis[0]=1;}
				if(persolocked[1] && persosovered[1]==persosovered[0]){skinschoisis[0]=(skinschoisis[1]+1)%2;}
				characteristics.get(liste_persos[persosovered[0]]).namewav.currentTime=0;
				characteristics.get(liste_persos[persosovered[0]]).namewav.play();
				reset_for_charac_screen(0);
				j1.vicpose=1;
			}
			else if(!secondplayerishuman && !persolocked[1] && secondplayerchosescharac){
				persolocked[1]=true;
				if(j1.poing==1){skinschoisis[1]=0;}
				else{skinschoisis[1]=1;}
				if(persolocked[0] && persosovered[1]==persosovered[0]){skinschoisis[1]=(skinschoisis[0]+1)%2;}
				characteristics.get(liste_persos[persosovered[1]]).namewav.currentTime=0;
				characteristics.get(liste_persos[persosovered[1]]).namewav.play();
				reset_for_charac_screen(1);
				j2.vicpose=1;
			}
			if(j1.poing==1){j1.poing=2;}
			else{j1.jambe=2;}
		}
		if(persolocked[0] && (persolocked[1] || !secondplayerchosescharac)){
			lockincountdown++;
			if(lockincountdown>=lockincountdownfdur){
				lockincountdown=0;
				persoschoisis = [liste_persos[persosovered[0]],liste_persos[persosovered[1]]]
				if(!secondplayerchosescharac){
					if(arcadelevel==liste_persos.length){
						persoschoisis[1] = "shao_kahn";
					}
					else{
						persoschoisis[1] = arcadeorder[arcadelevel];
					}
					skinschoisis[1] = randomInt(0,1);
					if(persolocked[0] && persoschoisis[1]==persoschoisis[0]){skinschoisis[1]=(skinschoisis[0]+1)%2;}
				}
				reset_game();
				is_in_charc_screen = false;
				choserandomstage();
				functiontoexecute = loop;
				return;
			}
		}
		
		j1.afficher(j2);
		if(secondplayerchosescharac){j2.afficher(j1);}
		ctx.fillStyle = "white";
		ctx.font = "30px serif";
		ctx.fillText("Go to title screen",400,470);
	}


	function menututo(){
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,1024,576);
		ctx.fillStyle = "white";
		ctx.font = "40px serif";
		ctx.fillText("Basics",80,30);
		ctx.fillText("Crouching",80,80);
		ctx.fillText("Jumping",80,130);
		ctx.fillText("Specials",80,180);
		ctx.fillText("Combos",80,230);
		ctx.fillText("Raiden",400,30);
		ctx.fillText("Kitana",400,80);
		ctx.fillText("Scorpion",400,130);
		ctx.fillText("Subzero",400,180);
		ctx.fillText("Liu Kang",400,230);
		ctx.font = "30px serif";
		ctx.fillText("Go to title screen",400,470);
		if(click==1){
			click=2;
			if(entre(clickx,400/1024,610/1024) && entre(clicky,450/500,480/500)){persolocked = [0,0]; skinschoisis = [0,0];gobacktotitlescreen();return;}
			else if(entre(clickx,80/1024, 280/1024) && entre(clicky,0,0.1*tutolineslist.length)){
				currenttutoline = tutolineslist[Math.floor(clicky*10)];
				launchtutorial(currenttutoline[0]);
			}
			else if(entre(clickx,400/1024, 600/1024) && entre(clicky,0,0.1*tutopersoslist.length)){
				currenttutoline = tutopersoslist[Math.floor(clicky*10)];
				launchtutorial(currenttutoline[0]);
			}
		}
	}


	function parameters_screen(){
		resizecanvas();
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,1024,576);
		ctx.fillStyle = "white";
		ctx.font = "30px serif";
		ctx.fillText("Go to title screen",400,470);
		ctx.fillText("Player1:",0,25);
		ctx.fillText("Right",120,25);
		ctx.fillText("Left",220,25);
		ctx.fillText("Jump",320,25);
		ctx.fillText("Down",420,25);
		ctx.fillText("Punch",520,25);
		ctx.fillText("Kick",620,25);
		ctx.fillText("Special",720,25);
		ctx.fillText("Grab",820,25);
		ctx.fillText("Player2:",0,125);
		ctx.fillText("Right",120,125);
		ctx.fillText("Left",220,125);
		ctx.fillText("Jump",320,125);
		ctx.fillText("Down",420,125);
		ctx.fillText("Punch",520,125);
		ctx.fillText("Kick",620,125);
		ctx.fillText("Special",720,125);
		ctx.fillText("Grab",820,125);
		if(controlafaire!=-1){
			if(key!=""){
				ctx.fillText(key,120+(controlafaire%8)*100,55+100*(controlafaire>=8));
				controls[controlafaire]=key;key="";
			}
			else{
				ctx.fillText(controls[controlafaire],120+(controlafaire%8)*100,55+100*(controlafaire>=8));
			}
		}
		if(click==1){
			click=2;
			if(entre(clickx,400/1024,610/1024) && entre(clicky,450/500,480/500)){functiontoexecute = titlescreen; skinschoisis = [0,0];}
			else if(entre(clickx,120/1024,920/1024)&&entre(clicky,10/500,40/500)){controlafaire=Math.floor((clickx-120/1024)/(100/1024));}
			else if(entre(clickx,120/1024,920/1024)&&entre(clicky,110/500,140/500)){controlafaire=8+Math.floor((clickx-120/1024)/(100/1024));}
		}
	}

	function titlescreen(){
		resizecanvas();
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,1024,576);
		ctx.scale(2,2);
		ctx.drawImage(logopng,150,20);
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.fillStyle = "yellow";
		ctx.font = "40px serif";
		ctx.fillText("Fight CPU",80,370);
		ctx.fillStyle = "red";
		ctx.fillText("Versus mode",380,370);
		ctx.fillStyle = "white";
		ctx.fillText("Parameters",740,370);
		ctx.fillStyle = "blue";
		ctx.fillText("Arcade mode",380,430);
		ctx.fillStyle = "gray";
		ctx.fillText("Training",80,430);
		ctx.fillStyle = "green";
		ctx.fillText("Tutorials",740,430);
		if(click==1){
			click=2;
			if(entre(clicky,340/500,380/500)){
				if(entre(clickx,80/1024,260/1024)){functiontoexecute = menupersos;secondplayerishuman=false;}
				else if(entre(clickx,380/1024,590/1024)){functiontoexecute = menupersos;secondplayerishuman=true;}
				else if(entre(clickx,740/1024,920/1024)){functiontoexecute = parameters_screen;}
			}
			else if(entre(clicky,400/500,440/500)){
				if(entre(clickx,80/1024,260/1024)){functiontoexecute = menupersos;secondplayerishuman=true;secondplayerisdummy=true;}
				else if(entre(clickx,380/1024,590/1024)){functiontoexecute = menupersos;secondplayerishuman=false;arcadelevel=0;arcadeorder.shuffle();secondplayerchosescharac=false;}
				else if(entre(clickx,740/1024,920/1024)){youareintutorial=true; secondplayerishuman = false; tutorialscenenumber = 0; functiontoexecute = menututo;}
			}
		}
	}

	function globalloop(){
		setTimeout(globalloop,frame_delay);
		functiontoexecute();
	}


	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	canvas.style.left = "0px";
	canvas.style.top = "0px";
	canvas.style.position = "absolute";
	ctx.font = "40px Arial";
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;

	
	

	function play_sound_eff(s){
		if(!soundeffon){return;}
		let l = sounds_eff.get(s);
		let n = Math.floor(Math.random()*l.length);
		l[n].currentTime = 0; l[n].play();
	}

	var secondplayerishuman = true; var secondplayerchosescharac = true; var secondplayerisdummy = false;

	var sounds_eff = new Map();
	sounds_eff.set("lhit",[document.querySelector('#lhitwav1'),document.querySelector('#lhitwav2'),document.querySelector('#lhitwav3')]);
	sounds_eff.set("mhit",[document.querySelector('#mhitwav1'),document.querySelector('#mhitwav2'),document.querySelector('#mhitwav3')]);
	sounds_eff.set("hhit",[document.querySelector('#hhitwav1'),document.querySelector('#hhitwav2'),document.querySelector('#hhitwav3')]);
	sounds_eff.set("parry",[document.querySelector('#parrywav')]);
	sounds_eff.set("fan",[document.querySelector('#fanwav')]);
	sounds_eff.set("freeze",[document.querySelector('#freezewav')]);
	sounds_eff.set("electrocute",[document.querySelector('#electrocutewav')]);
	sounds_eff.set("explosion",[document.querySelector('#explosion1wav'),document.querySelector('#explosion2wav')]);
	sounds_eff.set("femalelmov",[document.querySelector('#femalelmov1wav'),document.querySelector('#femalelmov2wav')]);
	sounds_eff.set("femalemmov",[document.querySelector('#femalemmov1wav'),document.querySelector('#femalemmov2wav')]);
	sounds_eff.set("femalehmov",[document.querySelector('#femalehmov1wav'),document.querySelector('#femalehmov2wav')]);
	sounds_eff.set("femalehurted",[document.querySelector('#femalehurted1wav'),document.querySelector('#femalehurted2wav')]);
	sounds_eff.set("femalebighurted",[document.querySelector('#femalebighurtedwav')]);
	sounds_eff.set("malelmov",[document.querySelector('#malelmov1wav'),document.querySelector('#malelmov2wav')]);
	sounds_eff.set("malemmov",[document.querySelector('#malemmov1wav'),document.querySelector('#malemmov2wav')]);
	sounds_eff.set("malehmov",[document.querySelector('#malehmov1wav'),document.querySelector('#malehmov2wav')]);
	sounds_eff.set("malehurted",[document.querySelector('#malehurted1wav'),document.querySelector('#malehurted2wav')]);
	sounds_eff.set("malecomehere",[document.querySelector('#comehere1wav'),document.querySelector('#comehere2wav')]);
	sounds_eff.set("malebighurted",[document.querySelector('#malebighurtedwav')]);
	sounds_eff.set("maleraidenbullshit",[document.querySelector('#raidenbullshit1wav'),document.querySelector('#raidenbullshit2wav'),document.querySelector('#raidenbullshit3wav'),document.querySelector('#raidenbullshit4wav'),document.querySelector('#raidenbullshit5wav')]);
	sounds_eff.set("liulmov",[document.querySelector('#liulmov1wav'),document.querySelector('#liulmov2wav')]);
	sounds_eff.set("liummov",[document.querySelector('#liummov1wav'),document.querySelector('#liummov2wav')]);
	sounds_eff.set("liuhmov",[document.querySelector('#liuhmov1wav'),document.querySelector('#liuhmov2wav')]);
	sounds_eff.set("liuhurted",[document.querySelector('#liuhurted1wav'),document.querySelector('#liuhurted2wav')]);
	sounds_eff.set("liubighurted",[document.querySelector('#liubighurted1wav'),document.querySelector('#liubighurted2wav')]);
	sounds_eff.set("liubullshit",[document.querySelector('#liukangbullshit1wav'),document.querySelector('#liukangbullshit2wav')]);
	sounds_eff.set("fatal1",[document.querySelector('#fatal1wav')]);
	sounds_eff.set("fatal2",[document.querySelector('#fatal2wav')]);
	sounds_eff.set("fatality",[document.querySelector('#fatalitywav')]);
	sounds_eff.set("finishher",[document.querySelector('#finishherwav')]);
	sounds_eff.set("finishhim",[document.querySelector('#finishhimwav')]);
	sounds_eff.set("wins",[document.querySelector('#winswav')]);
	sounds_eff.set("toasty",[document.querySelector('#toastywav')]);
	sounds_eff.set("compliment",[document.querySelector('#compliment1wav'),document.querySelector('#compliment2wav'),document.querySelector('#compliment3wav'),document.querySelector('#compliment4wav')]);
	sounds_eff.set("shaowinquote",[document.querySelector('#shaowinquote1wav'),document.querySelector('#shaowinquote2wav'),document.querySelector('#shaowinquote3wav')]);
	sounds_eff.set("cursor_move",[document.querySelector('#cursorwav')]);
	sounds_eff.set("coup",[document.querySelector('#coup1wav'),document.querySelector('#coup2wav'),document.querySelector('#coup3wav'),document.querySelector('#coup4wav'),document.querySelector('#coup5wav')]);
	sounds_eff.set("grapple",[document.querySelector('#grapplewav')]);
	sounds_eff.set("teleport",[document.querySelector('#teleportwav')]);

	

	var fightwav = document.querySelector('#fightwav');

	var musiques = [document.querySelector('#towerwav'), document.querySelector('#deadpoolwav'), document.querySelector("#wastewav"), document.querySelector("#forestwav"),  document.querySelector("#gorowav"), document.querySelector("#mkwav")];
	var roundover_musiques = [document.querySelector('#towerroundoverwav'),document.querySelector('#deadpoolroundoverwav'),document.querySelector("#wasteroundoverwav"), document.querySelector("#forestroundoverwav"),document.querySelector("#forestroundoverwav"), document.querySelector("#forestroundoverwav")];
	
	for (var i=0; i<musiques.length; i++){
		musiques[i].loop = true;
	}
	
	var chosenstage = 4; var numberofstages = 5;

	var roundswav = [document.querySelector('#round1wav'),document.querySelector('#round2wav'),document.querySelector('#round3wav')];

	characteristics.set("kitana",{png : kitskins,coordinates : kitcoordinates, sex : "f", standnframes : 5, rollspeed : 3, hkickstartnframe : 2, hkickendnframe : 3, kicknframe : 5,grabxdist : 34, grabydist : 36, stunnframes : 5, walknframes : 8, icon : kitanaiconpng, namewav : document.querySelector('#kitanawav'),
	width : 34, height : 97,vitesse : 3.2,jumpxspeed : 3.6,backmovnerf : 0.85, gravity : 0.4, jumpforce : 9,jumpsquat : 3, shorthop : 6, friction:0.2, hurtcontrol : 0.2, grabtype : "poser",
	airdrift : 0.12, airmaxspeed : 2, airdodgespeed : 5.5, airdodgefdur : 15, landinglag : 8,coups : kitana_coups, pv : 100, getupfdur : 32, grabfdur : 35, grabdeg : 13, vicposframes : 12, vicposfdur : 50, cds : [70,120,240,240], icons : [fanthrowiconpng,fanswipeiconpng,fanlifticonpng,squarepunchiconpng], voiceactor : "female"});

	characteristics.set("mileena",{png : milskins,coordinates : milcoordinates, sex : "f", standnframes : 10, rollspeed : 3, hkickstartnframe : 2, hkickendnframe : 3, kicknframe : 5,grabxdist : 34, grabydist : 36, stunnframes : 5, walknframes : 8, icon : mileenaiconpng, namewav : document.querySelector('#mileenawav'),
	width : 34, height : 97,vitesse : 3,jumpxspeed : 3.3,backmovnerf : 0.9, gravity : 0.42, jumpforce : 8.8,jumpsquat : 3, shorthop : 5.8, friction:0.22, hurtcontrol : 0.2, grabtype : "poser",
	airdrift : 0.12, airmaxspeed : 1.8, airdodgespeed : 5.85, airdodgefdur : 13, landinglag : 9,coups : mileena_coups, pv : 95, getupfdur : 32, grabfdur : 35, grabdeg : 12, vicposframes : 10, vicposfdur : 40, cds : [150,150,240,270], icons : [knifeiconpng,balliconpng,fanlifticonpng,teleport_dropiconpng], voiceactor : "female"});
	

	characteristics.set("raiden",{png : raiskins,coordinates : raicoordinates, sex : "m", standnframes : 8, rollspeed : 5, hkickstartnframe : 3, hkickendnframe : 3, kicknframe : 5,grabxdist : 32, grabydist : 38, stunnframes : 6, walknframes : 8, icon : raideniconpng, namewav : document.querySelector('#raidenwav'),
	width : 36, height : 107,vitesse : 3,jumpxspeed : 3.4,backmovnerf : 0.95, gravity : 0.42, jumpforce : 9,jumpsquat : 3, shorthop : 6, friction:0.22, hurtcontrol : 0.2, grabtype : "poser",
	airdrift : 0.14, airmaxspeed : 2, airdodgespeed : 5.8, airdodgefdur : 15, landinglag : 8,coups : raiden_coups, pv : 95, getupfdur : 30, grabfdur : 35, grabdeg : 12, vicposframes : 6, vicposfdur : 36, cds : [150,180,150,360], icons : [elecgrabiconpng,thundergodiconpng,boltthrowiconpng,teleporticonpng], voiceactor : "male"});


	characteristics.set("scorpion",{png : scoskins,coordinates : scocoordinates, sex : "m", standnframes : 6, rollspeed : 5, hkickstartnframe : 3, hkickendnframe : 2, kicknframe : 4, grabxdist : 32, grabydist : 38, stunnframes : 5, walknframes : 9, icon : scorpioniconpng, namewav : document.querySelector('#scorpionwav'),
	width : 40, height : 103,vitesse : 2.75,jumpxspeed : 3.4,backmovnerf : 0.92, gravity : 0.41, jumpforce : 9,jumpsquat : 4, shorthop : 5.2, friction:0.21, hurtcontrol : 0.2,grabtype : "launch",
	airdrift : 0.15, airmaxspeed : 1.8, airdodgespeed : 5.6, airdodgefdur : 14, landinglag : 6,coups : scorpion_coups, pv : 95, getupfdur : 36, grabfdur : 20, grabdeg : 12, vicposframes : 2, vicposfdur : 12, cds : [180,100,210,120], icons : [spearthrowiconpng,airgrabiconpng,hellgatesiconpng,legtakedowniconpng], voiceactor : "male"});

	characteristics.set("subzero",{png : subskins,coordinates : subcoordinates, sex : "m", standnframes : 10, rollspeed : 5, hkickstartnframe : 3, hkickendnframe : 2, kicknframe : 4, grabxdist : 32, grabydist : 38, stunnframes : 5, walknframes : 9, icon : subzeroiconpng, namewav : document.querySelector('#subzerowav'),
	width : 39, height : 103,vitesse : 3,jumpxspeed : 3.4,backmovnerf : 0.9, gravity : 0.41, jumpforce : 9.1,jumpsquat : 3, shorthop : 6.3, friction:0.17, hurtcontrol : 0.18,grabtype : "launch",
	airdrift : 0.13, airmaxspeed : 1.8, airdodgespeed : 5.7, airdodgefdur : 15, landinglag : 9, coups : subzero_coups, pv : 95, getupfdur : 36, grabfdur : 20, grabdeg : 12, vicposframes : 2, vicposfdur : 14, cds : [210,150,240,270], icons : [iceballiconpng,slideiconpng,iceflaskiconpng,icebodyiconpng], voiceactor : "male"});
	
	characteristics.set("shao_kahn",{png : shaoskins,coordinates : shaocoordinates, sex : "m", standnframes : 6, rollspeed : 5, hkickstartnframe : 3, hkickendnframe : 2, kicknframe : 5,grabxdist : 32, grabydist : 38, stunnframes : 6, walknframes : 8, icon : raideniconpng, namewav : document.querySelector('#raidenwav'),
	width : 40, height : 114,vitesse : 3.1,jumpxspeed : 3.4,backmovnerf : 0.92, gravity : 0.44, jumpforce : 6.5,jumpsquat : 3, shorthop : 6, friction:0.22, hurtcontrol : 0.1,grabtype : "launch",
	airdrift : 0.1, airmaxspeed : 2, airdodgespeed : 5.8, airdodgefdur : 15, landinglag : 8,coups : shao_coups, pv : 140, getupfdur : 24, grabfdur : 35, grabdeg : 12, vicposframes : 6, vicposfdur : 42, cds : [150,240,150,360], icons : [elecgrabiconpng,chargeiconpng,boltthrowiconpng,teleporticonpng], voiceactor : "male"});
	
	characteristics.set("liukang",{png : liuskins,coordinates : liucoordinates, sex : "m", standnframes : 6, rollspeed : 5, hkickstartnframe : 2, hkickendnframe : 2, kicknframe : 4,grabxdist : 32, grabydist : 38, stunnframes : 6, walknframes : 9, icon : liukangiconpng, namewav : document.querySelector('#liukangwav'),
	width : 36, height : 98,vitesse : 3.4,jumpxspeed : 3.5,backmovnerf : 0.9, gravity : 0.42, jumpforce : 9.2,jumpsquat : 2, shorthop : 6.1, friction:0.21, hurtcontrol : 0.2, grabtype : "launch",
	airdrift : 0.14, airmaxspeed : 2.1, airdodgespeed : 6, airdodgefdur : 13, landinglag : 8,coups : liukang_coups, pv : 95, getupfdur : 36, grabfdur : 15, grabdeg : 11, vicposframes : 6, vicposfdur : 30, cds : [150,70,90,180], icons : [fireballiconpng,flying_kickiconpng,bicycleiconpng,cycleiconpng], voiceactor : "liu"});
	




	j1 = new Joueur();
	j2 = new Joueur();

	var decalagex = 256;
	var ground = 240;
	var stage_size = 720;
	var camerax = 0;
	var gamefreeze = 0; var still_draw = false; var fixcamera = 0;
	var shakex = 0; var shakey = 0; var shakeforce = 0; var shakeframe = 0;
	var end_of_round_countdown = 0; var fightstartcountdown = 80;
	var frame_delay = 17; var base_frame_delay = 16; var slowmodur = 0;
	var vitcamera = 7;
	var pause_after_vicpose = 30;
	var cpt = 0; var objects_to_loop = new Map();
	var click = 0;var clickx=0; var clicky = 0;
	var difficulte = 1;
	var roundwonsj1 = 0; var roundwonsj2 = 0;
	var finishhim = 0; var fatalitywasdone = false; var fatalitysreen = 0;
	var persoschoisis = ["kitana","raiden"]; var skinschoisis = [0,0]; var persolocked = [0,0]; var persosovered = [5,0];
	var musiqueon = true; var soundeffon = true; var introon = true; var timer = 0; var timer_init = 99*60;
	var liste_persos = ["raiden","kitana","scorpion","subzero", "liukang", "mileena"];
	var chartimer = 0; var chartimercycle = 3; var difficultynames = ["Easy","Normal","Hard","Insane","Terminator"];
	var is_in_charc_screen = true; var lockincountdown = 0; var lockincountdownfdur = 40; var controlafaire = -1; var key = "";
	var Width= window.innerWidth; var Height=window.innerHeight;
	var decalage = 0; var wdecalagey = 0;
	var bufferwindow = 5; var minimumcomboscaling = 0.5;
	var framesforperfectblock = 9; var perfectblockcd = 9;
	var arcadelevel = -1; var arcadeorder = [...liste_persos]; arcadeorder.shuffle(); var arcadestagesorder = [1,0,3,2,0,4,5];
	var youareintutorial = false; var tutorialscenenumber = 0; var currentuto = null; var currenttutoline = tutospecial;


	function shake_screen(frames,force){
		shakeforce = force; shakeframe = frames;
	}

	function slow_game(frames,slow_force){
		slowmodur = frames;frame_delay = base_frame_delay*slow_force;
	}

	
	var controls=[["ArrowRight","ArrowLeft","ArrowUp","ArrowDown","KeyB","KeyN","KeyM","KeyH","KeyJ"],["KeyF","KeyS","KeyE","KeyD","KeyQ","KeyA","KeyZ","KeyW","KeyE"]];
	var controlspause = "Enter";
	var pausepressed = 0; var gamepaused = false;

	function logKey(e) {
		if(e.code==controls[0][0]){j1.droite=1}
		if(e.code==controls[0][1]){j1.gauche=1}
		if(e.code==controls[0][2]&&j1.haut==0){j1.haut=1}
		if(e.code==controls[0][3]){j1.bas=1}
		if(e.code==controls[0][4]&&j1.poing==0){j1.poing=1}
		if(e.code==controls[0][5]&&j1.jambe==0){j1.jambe=1}
		if(e.code==controls[0][6]&&j1.special==0){j1.special=1}
		if(e.code==controls[0][7]&&j1.dodge==0){j1.dodge=1;}
		if(e.code==controls[0][8]&&j1.jump==0){j1.jump=1;}
		if(secondplayerishuman){
			if(e.code==controls[1][0]){j2.droite=1}
			if(e.code==controls[1][1]){j2.gauche=1}
			if(e.code==controls[1][2]&&j2.haut==0){j2.haut=1}
			if(e.code==controls[1][3]){j2.bas=1}
			if(e.code==controls[1][4]&&j2.poing==0){j2.poing=1}
			if(e.code==controls[1][5]&&j2.jambe==0){j2.jambe=1}
			if(e.code==controls[1][6]&&j2.special==0){j2.special=1}
			if(e.code==controls[1][7]&&j2.dodge==0){j2.dodge=1}
			if(e.code==controls[1][8]&&j2.jump==0){j2.jump=1;}
		}
		if(e.code==controlspause&&pausepressed==0){pausepressed=1;}
		key=e.code;
	}
	function unlogKey(e){
		if(e.code==controls[0][0]){j1.droite=0}
		if(e.code==controls[0][1]){j1.gauche=0}
		if(e.code==controls[0][2]){j1.haut=0}
		if(e.code==controls[0][3]){j1.bas=0}
		if(e.code==controls[0][4]){j1.poing=0}
		if(e.code==controls[0][5]){j1.jambe=0}
		if(e.code==controls[0][6]){j1.special=0}
		if(e.code==controls[0][7]){j1.dodge=0;}
		if(e.code==controls[0][8]){j1.jump=0;}
		if(e.code==controls[1][0]){j2.droite=0}
		if(e.code==controls[1][1]){j2.gauche=0}
		if(e.code==controls[1][2]){j2.haut=0}
		if(e.code==controls[1][3]){j2.bas=0}
		if(e.code==controls[1][4]){j2.poing=0}
		if(e.code==controls[1][5]){j2.jambe=0}
		if(e.code==controls[1][6]){j2.special=0}
		if(e.code==controls[1][7]){j2.dodge=0}
		if(e.code==controls[1][8]){j2.jump=0;}
		if(e.code==controlspause){pausepressed=0;}
	}
	function clickEvent(e){
		clickx=(e.pageX-decalage)/Width;clicky=(e.pageY-wdecalagey)/Height;click=1;
	}
	function unclickEvent(_){
		click=0;
	}
	document.addEventListener('keydown', logKey);
	document.addEventListener('keyup', unlogKey);
	document.addEventListener("mousedown", clickEvent);
	document.addEventListener("mouseup", unclickEvent);

	reset_for_charac_screen(0);
	reset_for_charac_screen(1);
	var functiontoexecute = titlescreen;
	globalloop();


	const gamepads = new Map();

		function gamepadHandler(event, connected) {
  			const gamepad = event.gamepad;
  			// Note:
  			// gamepad === navigator.getGamepads()[gamepad.index]

  			if (connected) {
    			gamepads.set(gamepad.index,gamepad);
  			} else {
    			gamepads.delete(gamepad.index);
  			}
}
		
		
window.addEventListener(
	"gamepadconnected",
	(e) => {
	  gamepadHandler(e, true);
	},
	false,
  );
  window.addEventListener(
	"gamepaddisconnected",
	(e) => {
	  gamepadHandler(e, false);
	},
	false,
  );
	function pressed(b){
		if (typeof(b) == "object") {
			return b.pressed;
			}
			return b == 1.0;
	}
	function bonstick(controls,a){
		if(controls==a+"true"||controls==a+"false"){return 1;}
		return 0
	}

	function buttonPressed(b) {
		if (typeof(b) == "object") {
			return b.pressed;
		}
		return b == 1.0;
		}
		
		function gameLoop() {
		var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
		if (!gamepads)
			return;
		
		var gp = gamepads[0];

		var i=0;
		if(gp==null){return;}
		for (r=0;r<gp.buttons.length;r++){
			if(controls[0]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.droite=0}else {if(j1.droite==0){j1.droite=1}}}
			if(controls[1]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.gauche=0}else {if(j1.gauche==0){j1.gauche=1}}}
			if(controls[2]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.haut=0}else {if(j1.haut==0){j1.haut=1}}}
			if(controls[3]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.bas=0}else {if(j1.bas==0){j1.bas=1}}}
			if(controls[4]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.poing=0}else {if(j1.poing==0){j1.poing=1}}}
			if(controls[5]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.jambe=0}else {if(j1.jambe==0){j1.jambe=1}}}
			if(controls[6]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.special=0}else {if(j1.special==0){j1.special=1}}}
			if(controls[7]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j1.dodge=0}else {if(j1.dodge==0){j1.dodge=1}}}
			if(controls[8]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.droite=0}else {if(j2.droite==0){j2.droite=1}}}
			if(controls[9]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.gauche=0}else {if(j2.gauche==0){j2.gauche=1}}}
			if(controls[10]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.haut=0}else {if(j2.haut==0){j2.haut=1}}}
			if(controls[11]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.bas=0}else {if(j2.bas==0){j2.bas=1}}}
			if(controls[12]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.poing=0}else {if(j2.poing==0){j2.poing=1}}}
			if(controls[13]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.jambe=0}else {if(j2.jambe==0){j2.jambe=1}}}
			if(controls[14]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.special=0}else {if(j2.special==0){j2.special=1}}}
			if(controls[15]==i.toString()+r.toString(20)){if(!buttonPressed(gp.buttons[r])){j2.dodge=0}else {if(j2.dodge==0){j2.dodge=1}}}
			if(buttonPressed(gp.buttons[r])){key=i.toString()+r.toString(20);}
		}

		for (r=0;r<gp.axes.length;r++){
			var s=gp.axes[r];
			if(distance(s,0)>0.5 && distance(s,0)<1.5){key="stick"+i.toString()+r.toString(20)+(s>=0.5).toString()}
			if(bonstick(controls[0],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5||(s>0.5)!=(controls[0].substr(7,1)=="t")){j1.droite=0;}else {if(j1.droite==0&&(s>0.5)==(controls[0].substr(7,1)=="t")){j1.droite=1}}}
			if(bonstick(controls[1],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5||(s>0.5)==(controls[0].substr(7,1)=="t")){j1.gauche=0}else {if(j1.gauche==0&&(s>0.5)==(controls[1].substr(7,1)=="t")){j1.gauche=1}}}
			if(bonstick(controls[2],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j1.haut=0}else {if(j1.haut==0&&(s>0.5)==(controls[2].substr(7,1)=="t")){j1.haut=1}}}
			if(bonstick(controls[3],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j1.bas=0}else {if(j1.bas==0&&(s>0.5)==(controls[3].substr(7,1)=="t")){j1.bas=1}}}
			if(bonstick(controls[4],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j1.poing=0}else {if(j1.poing==0&&(s>0.5)==(controls[4].substr(7,1)=="t")){j1.poing=1}}}
			if(bonstick(controls[5],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j1.jambe=0}else {if(j1.jambe==0&&(s>0.5)==(controls[5].substr(7,1)=="t")){j1.jambe=1}}}
			if(bonstick(controls[6],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j1.special=0}else {if(j1.special==0&&(s>0.5)==(controls[6].substr(7,1)=="t")){j1.special=1}}}
			if(bonstick(controls[7],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5||(s>0.5)!=(controls[0].substr(7,1)=="t")){j1.dodge=0}else {if(j1.dodge==0&&(s>0.5)==(controls[7].substr(7,1)=="t")){j1.dodge=1;}}}
			if(bonstick(controls[8],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5||(s>0.5)!=(controls[8].substr(7,1)=="t")){j2.droite=0;}else {if(j2.droite==0&&(s>0.5)==(controls[8].substr(7,1)=="t")){j2.droite=1}}}
			if(bonstick(controls[9],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5||(s>0.5)==(controls[8].substr(7,1)=="t")){j2.gauche=0}else {if(j2.gauche==0&&(s>0.5)==(controls[9].substr(7,1)=="t")){j2.gauche=1}}}
			if(bonstick(controls[10],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j2.haut=0}else {if(j2.haut==0&&(s>0.5)==(controls[10].substr(7,1)=="t")){j2.haut=1}}}
			if(bonstick(controls[11],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j2.bas=0}else {if(j2.bas==0&&(s>0.5)==(controls[11].substr(7,1)=="t")){j2.bas=1}}}
			if(bonstick(controls[12],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j2.poing=0}else {if(j2.poing==0&&(s>0.5)==(controls[12].substr(7,1)=="t")){j2.poing=1}}}
			if(bonstick(controls[13],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j2.jambe=0}else {if(j2.jambe==0&&(s>0.5)==(controls[13].substr(7,1)=="t")){j2.jambe=1}}}
			if(bonstick(controls[14],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5){j2.special=0}else {if(j2.special==0&&(s>0.5)==(controls[14].substr(7,1)=="t")){j2.special=1}}}
			if(bonstick(controls[15],"stick"+i.toString()+r.toString(20))){if(distance(s,0)<=0.5||(s>0.5)!=(controls[0].substr(7,1)=="t")){j2.dodge=0}else {if(j2.dodge==0&&(s>0.5)==(controls[15].substr(7,1)=="t")){j2.dodge=1;}}}

			
		
		}
	}
	var manetteshandleur=setInterval(gameLoop,16);
}