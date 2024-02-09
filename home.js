function entre(a,b,c){
	return (a>=b && a<=c)
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

function main(){
	function resizecanvas(){
		Width= window.innerWidth;
		Height=window.innerHeight;
		  if(Height>=Width*6/9){Heigth=Width*6/9;canvas.style.left = "0px";}else if(Width*6/9>Height){Width=Height/6*9;canvas.style.left = (window.innerWidth-Width)/2+"px";decalage=(window.innerWidth-Width)/2}
		  canvas.style.width  = Width+'px';
		  canvas.style.height  = Height+'px';
	}

	class Joueur
	{
		constructor(x,y,perso,n)
		{
			this.reinit(x,y,perso,n);
		}
		reinit(x,y,perso,n){
			this.x = x; this.y = y; this.perso = perso; this.n = n;
			this.droite=0;this.gauche=0;this.haut=0;this.bas=0;this.poing=0;this.jambe=0;this.special=0;this.dodge=0;
			if (this.n == 0){this.orientation = 1}else{this.orientation = -1}
			this.costume = "stand1";
			this.charac = characteristics.get(this.perso);
			this.standing = 0;this.walking = 0;this.jumping=0;
			this.movlag = 0;
			this.mov = "";
			this.tb = 0; this.xspeed = 0; this.crouching = 0;
			this.hurted = 0; this.hurtx = 0; this.invincibilite = 0;
			this.pv = this.charac.pv;
			this.pushed = 0;this.pushx = 0;
			this.blocking = 0; this.falling = 0; this.gettingup = 0; this.grabbing = 0; this.grabbed = 0;
		}

		begincoup(s){
			var stats = this.charac.coups.get(s);
			this.mov = s;
			this.movlag = stats.slag+stats.fdur+stats.elag;
		}

		reoriente(other){
			if(this.movlag == 0&&this.y==0){if(this.x<other.x){this.orientation = 1;}else{this.orientation = -1;}}
			if(this.orientation==1){this.forward=this.droite;this.back=this.gauche;}else{this.orientation = -1;this.forward=this.gauche;this.back=this.droite;}
		}

		getup(){
			this.falling = 0;this.hurted =0; this.gettingup = 1;this.invincibilite = this.charac.getupfdur; this.y = 0;
		}

		begin_grab(other){
			this.grabbing = 1;
			this.movlag = 0;
			this.mov = "";
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

		miseajour(other){
			var c = this.charac;
			if(this.grabbing&&this.hurted==0&&this.grabbed==0){
				this.invincibilite = 1;
				this.grabbing++;
				if(this.grabbing==this.charac.grabfdur){this.end_grab(other);}
				else if(this.grabbing == Math.floor(this.charac.grabfdur*5/7)+1){
					other.grabbed=0;
					other.falling=1;
					other.y = 0;
					other.hurted = 15;
					other.x = this.x - this.orientation*(this.charac.width+other.charac.width)/1.4;
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
				this.xspeed = signe(this.xspeed)*Math.max(0,Math.abs(this.xspeed) -c.friction);
				this.gettingup++;
				if(this.gettingup == this.charac.getupfdur || (this.gettingup>=this.charac.getupfdur*5/6 && this.haut)){
					this.gettingup = 0; this.invincibilite = 0;
					if(this.haut==0 && this.bas){this.crouching = 6;}
				}
			}
			else if(this.blocking){
				this.blocking--;
				this.movlag = 0;this.mov = "";
				this.x += this.xspeed;
				if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.x = signe(this.x-camerax)*(decalagex-this.charac.width/2)}
			}
			else if(this.hurted==0){
				this.reoriente(other);

			
				if(this.y<=0){
					if(this.y<0){
						this.reoriente(other);
						if(this.mov == "air_dodge"){this.y=0;this.tb=0;this.movlag = c.landinglag;this.mov = "landing_lag"}
						else if(this.mov == "free_fall"){this.y=0;this.tb=0;this.movlag = c.landinglag;this.mov = "landing_lag";this.xspeed /=2;}
						else if(this.charac.coups.has(this.mov)){
							this.y=0;this.tb=0;this.movlag = this.charac.coups.get(this.mov).landinglag;this.mov = "landing_lag";
						}
						else{this.y = 0;this.tb=0;this.xspeed = 0;this.movlag = 0;this.mov = "";}
						
					}
					if (this.bas&&this.movlag == 0){this.crouching = Math.min(this.crouching+1,6);}
					else if(this.bas==0&&this.crouching>0&&this.movlag==0){this.crouching--;}
					if(this.haut==1&&movpriority.get(this.mov)<20){this.mov = "jumpsquat";this.movlag = c.jumpsquat;this.haut = 2;if(this.xspeed==0){if(this.droite >= 1){this.xspeed = c.vitesse;}else if(this.gauche>=1){this.xspeed = - c.vitesse}}}
					else if(this.poing==1&&this.forward+this.back==0&&movpriority.get(this.mov)<=30&&this.crouching==0&&this.bas==0){
						this.begincoup("lpunch");
						this.poing = 2;
					}
					else if(this.poing==1&&this.forward+this.back>=1&&movpriority.get(this.mov)<40&&this.crouching==0&&this.bas==0){
						this.begincoup("hpunch");
						this.poing = 2;
					}
					else if(this.jambe==1&&this.back>=1&&movpriority.get(this.mov)<40&&this.crouching==0&&this.bas==0){
						this.begincoup("mkick");
						this.jambe = 2;
					}
					else if(this.jambe==1&&this.forward+this.back==0&&movpriority.get(this.mov)<30&&this.crouching==0&&this.bas==0){
						this.begincoup("lkick");
						this.jambe = 2;
					}
					else if(this.jambe==1&&this.forward>=1&&movpriority.get(this.mov)<50&&this.crouching==0&&this.bas==0){
						this.begincoup("hkick");
						this.jambe = 2;
					}
					else if(this.poing==1&&this.forward+this.back==0&&movpriority.get(this.mov)<=30&&this.bas==1&&this.crouching>3){
						this.begincoup("clpunch");
						this.poing = 2;
					}
					else if(this.poing==1&&this.forward+this.back>0&&movpriority.get(this.mov)<50&&this.bas==1&&this.crouching>3){
						this.begincoup("huppercut");
						this.poing = 2;
						this.crouching = 0;
					}
					else if(this.jambe==1&&this.forward+this.back==0&&movpriority.get(this.mov)<30&&this.bas==1&&this.crouching>3){
						this.begincoup("clkick");
						this.jambe = 2;
					}
					else if(this.jambe==1&&this.forward+this.back>0&&movpriority.get(this.mov)<40&&this.bas==1&&this.crouching>3){
						this.begincoup("cmkick");
						this.jambe = 2;
					}
					else if(this.dodge==1&&this.movlag==0&&this.crouching==0){
						this.begincoup("grab");
						this.dodge = 2;
					}
					else if(this.forward>=1&&movpriority.get(this.mov)<=0&&this.crouching==0&&this.xspeed*this.orientation<c.vitesse){
						this.x+=this.charac.vitesse*this.orientation;this.xspeed = 0;
						let d = (this.charac.width+other.charac.width)/3;
						if(Math.abs(this.x-other.x)<d && this.y==0 && other.y==0){this.x-=this.charac.vitesse*this.orientation;}
					}
					else if(this.back>=1&&movpriority.get(this.mov)<=0&&this.crouching==0&&-this.xspeed*this.orientation<c.vitesse){
						this.x-=this.charac.vitesse*this.orientation*0.8;this.xspeed = 0;
					}
					if(this.mov != "forwardash" && this.mov != "backdash"){this.xspeed = signe(this.xspeed)*Math.max(0,Math.abs(this.xspeed) -c.friction);}
					
				}
				else{
					if(this.dodge==1&&this.movlag==0)
					{
						this.dodge=2;this.movlag = c.airdodgefdur;this.mov = "air_dodge";
						this.falling = 0;
						if(this.bas>=1){this.tb = -c.airdodgespeed;}
						else{this.tb = 0;}
						if(this.droite>=1){this.xspeed = c.airdodgespeed;}
						else if(this.gauche){this.xspeed = -c.airdodgespeed}
						else{this.xspeed = 0;}
					}
					else if(this.poing==1&&movpriority.get(this.mov)<40&&this.falling==0){
						this.poing=2;
						this.begincoup("jpunch");
					}
					else if(this.jambe==1&&movpriority.get(this.mov)<40&&this.xspeed == 0&&this.falling==0){
						this.jambe=2;
						this.begincoup("jskick");
					}
					else if(this.jambe==1&&movpriority.get(this.mov)<40&&this.xspeed != 0&&this.falling==0){
						this.jambe=2;
						this.begincoup("jkick");
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

					case "hkick":
						var stats = this.charac.coups.get(this.mov);
						if(this.movlag == stats.elag+stats.fdur+stats.slag-1){this.xspeed += stats.movx*this.orientation;}
						break;
				}
				this.movlag--;
				if(this.movlag == 0){
					if(this.mov == "jumpsquat"){this.mov = "";if(this.haut>=1 && this.bas == 0){this.tb = c.jumpforce;this.y = c.jumpforce;}else{this.tb = c.shorthop;this.y = c.shorthop;}}
					else if(this.mov == "air_dodge"){this.movlag = 100;this.mov = "free_fall";this.xspeed /=4;}
					else{this.mov = "";}
				}
			}
			this.x += this.xspeed;
			if(this.pushed>0){this.pushed--;this.x+=this.pushx;}
			let d = (this.charac.width+other.charac.width)/4;
			if(Math.abs(this.x-other.x)<d && this.y==0 && other.y==0){
				this.x=(this.x+other.x)/2+signe(this.x-other.x)*d;
				other.x=(this.x+other.x)/2-signe(this.x-other.x)*d;
			}
			if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.x = signe(this.x-camerax)*(decalagex-this.charac.width/2)}
		}
		else
		{
			this.hurted--;
			this.movlag = 0;this.mov = "";
			this.x += this.xspeed;
			if(this.y>0 || this.tb>0){this.y+=this.tb;this.tb-=c.gravity;}
			else if(this.y<0 && this.tb<=0){this.y=0;this.tb=0;}
			if(Math.abs(this.x-camerax)>decalagex-this.charac.width/2){this.x = signe(this.x-camerax)*(decalagex-this.charac.width/2)}
			if(this.y<=0 && this.falling){this.getup();}
		}
		
		}

		loop(other)
		{
			if(this.charac.coups.has(this.mov)){
				var stats = this.charac.coups.get(this.mov);
				if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){
					if(entre((other.x-this.x)*this.orientation,stats.hitboxxs-other.charac.width/2,stats.hitboxxe+other.charac.width/2+stats.hitboxxeyscaling*(other.y-(this.y+stats.hitboxys)))){
						if(other.crouching>3 && other.back==0){
							if(stats.hitboxys<=-1 || this.y>0){other.hurt(this,stats);}
						}
						else if(other.y==0){
							if(entre((other.y-this.y),stats.hitboxys,stats.hitboxxe+other.charac.height/3)){other.hurt(this,stats);}
						}
						else{
							if(entre((other.y-this.y),stats.hitboxys-other.charac.height/6,stats.hitboxxe+other.charac.height/6)){other.hurt(this,stats);}
						}
					}
				}
			}
		}

		hurt(other,stats){
			if(this.invincibilite){return;}
			if(this.movlag==0&&this.back>=1&&this.y==0&&stats.hiteffect != "grab"){
				this.blocking = stats.blockstun;
				this.xspeed = -stats.blockx*this.orientation;
			}
			else{
				switch (stats.hiteffect){
					case "fall" :
						this.falling = 4;
						this.crouching = 0;
						
						break;
					case "grab" :
						other.begin_grab(this);
						return;
				}
				this.hurted = stats.hitstun;
				this.xspeed = stats.hurtx*other.orientation;
			}
			if(this.y>0 && other.y>0){this.xspeed+=other.xspeed*2/3;this.hurted+=4;}
			if(Math.abs(this.x+this.xspeed*Math.abs(this.xspeed)/2/this.charac.friction-camerax)>decalagex-this.charac.width/2){other.pushed = 10;other.pushx = -other.orientation * (Math.abs(this.x+this.xspeed*Math.abs(this.xspeed)/2/this.charac.friction-camerax)-decalagex+this.charac.width)/5;other.xspeed = 0;}
			this.tb = stats.hurty;
			this.invincibilite = stats.fdur+1;
		}

		afficher(other){
			if(this.grabbed&&other.grabbed==0){
				return;
			}
			if(this.grabbing){
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
				else if(this.gettingup<=this.charac.getupfdur*2/6){this.costume = "grounded2"}
				else if(this.gettingup<=this.charac.getupfdur*3/6){this.costume = "getup1"}
				else if(this.gettingup<=this.charac.getupfdur*4/6){this.costume = "getup2"}
				else if(this.gettingup<=this.charac.getupfdur*5/6){this.costume = "getup3"}
				else {this.costume = "getup4"}
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
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+"3"}
						else if(entre(this.movlag,0,stats.elag/2)||entre(this.movlag,stats.elag+stats.fdur+stats.slag/2,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"1"}
						else{this.costume = this.mov+"2";}
						break;

					case "lkick" :
					case "mkick" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+"5"}
						else if(entre(this.movlag,0,stats.elag/4)||entre(this.movlag,stats.elag+stats.fdur+3*stats.slag/4,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"1"}
						else if(entre(this.movlag,0,stats.elag/2)||entre(this.movlag,stats.elag+stats.fdur+stats.slag/2,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"2"}
						else if(entre(this.movlag,0,3*stats.elag/4)||entre(this.movlag,stats.elag+stats.fdur+stats.slag/4,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"3"}
						else{this.costume = this.mov+"4";}
						break;

					case "hkick" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+"3"}
						else if(entre(this.movlag,stats.elag+stats.fdur+stats.slag/2,stats.elag+stats.fdur+stats.slag)){this.costume = this.mov+"1"}
						else if(this.movlag>=stats.elag){this.costume = this.mov+"2"}
						else if(this.movlag>=stats.elag*2/3){this.costume = this.mov+"4"}
						else if(this.movlag>=stats.elag/3){this.costume = this.mov+"5"}
						else {this.costume = this.mov+"6"}
						break;

					case "clpunch" :
					case "clkick" :
					case "jkick" :
					case "jskick" :
					case "jpunch" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag,stats.elag+stats.fdur)){this.costume = this.mov+"2"}
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

					case "grab" :
						var stats = this.charac.coups.get(this.mov);
						if(entre(this.movlag,stats.elag/2,stats.elag+stats.fdur)){this.costume = "lpunch2"}
						else{this.costume ="lpunch1";}
						break;

				}
			}
			else if (this.y>0){
				if(this.xspeed == 0){this.costume = "jump2";}
				else{
					
					if(this.jumping<0){this.costume = "jump3";this.jumping+=1;}
					else {this.jumping = mod(this.jumping+signe(this.xspeed*this.orientation),21);
						if(this.jumping<3){this.costume = "roll1";}
					else if(this.jumping<6){this.costume = "roll2"}
					else if(this.jumping<9){this.costume = "roll3"}
					else if(this.jumping<12){this.costume = "roll4"}
					else if(this.jumping<15){this.costume = "roll5"}
					else if(this.jumping<18){this.costume = "roll6"}
					else{this.costume = "roll7";}}
				}
			}
			else if(this.crouching>=1){
				if(this.crouching<=3){this.costume = "crouching1";}
				else{this.costume = "crouching2";}
			}
			else if(this.forward==0 && this.back==0)
			{
				this.standing = (this.standing+1)%25;
				if(this.standing<5){this.costume="stand1"}
				else if(this.standing<10){this.costume="stand2"}
				else if(this.standing<15){this.costume="stand3"}
				else if(this.standing<20){this.costume="stand4"}
				else {this.costume="stand5"}
				this.walking=0;
			}
			else{this.standing=0;
				if(this.forward>=1 || this.back>=1){
					if(this.forward>=1){this.walking=(this.walking+1)%32;}else{this.walking=(this.walking+31)%32;}
					if(this.walking<4){this.costume="walk1"}
					else if(this.walking<8){this.costume="walk2"}
					else if(this.walking<12){this.costume="walk3"}
					else if(this.walking<16){this.costume="walk4"}
					else if(this.walking<20){this.costume="walk5"}
					else if(this.walking<24){this.costume="walk6"}
					else if(this.walking<28){this.costume="walk7"}
					else {this.costume="walk8"}
				}
			}

			if(other.grabbed && this.grabbed==0){
				if(this.grabbing<=this.charac.grabfdur*1/7){var othercost = "grabbed1";}
				else if(this.grabbing<=this.charac.grabfdur*2/7){var othercost = "grabbed2";}
				else if(this.grabbing<=this.charac.grabfdur*3/7){var othercost = "grabbed3";}
				else {var othercost = "grabbed4";}
				var dist = (this.charac.width+other.charac.width)/1.5;
				var angle = this.grabbing*7/5/this.charac.grabfdur*Math.PI;
				var x = this.orientation*dist*Math.cos(angle)+this.x;
				var y = dist*Math.sin(angle)+this.y;
				ctx.scale(2*other.orientation,2);
				var coords = kitcoordinates.get(othercost);
				ctx.drawImage(kitpng,coords.offx,coords.offy,coords.width,coords.height,(x+decalagex-camerax+coords.decx*this.orientation-other.orientation*other.charac.width/2)*other.orientation,ground-y-coords.height-coords.decy,coords.width,coords.height);
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				ctx.scale(1,1);
			}


			ctx.scale(2*this.orientation,2);
			var coords = kitcoordinates.get(this.costume);
			ctx.drawImage(kitpng,coords.offx,coords.offy,coords.width,coords.height,(this.x+decalagex-camerax+coords.decx*this.orientation-this.orientation*this.charac.width/2)*this.orientation,ground-this.y-coords.height-coords.decy,coords.width,coords.height);
			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(1,1);

		
		}
	}



	function affichtt(){
		ctx.fillStyle = "gray";
		ctx.fillRect(0,0,1024,576);
		j1.afficher(j2);
		j2.afficher(j1);
	}
	
	function loop(){
		resizecanvas();
		j1.miseajour(j2);
		j2.miseajour(j1);
		j1.loop(j2);
		j2.loop(j1);
		affichtt();
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

	var kitpng=new Image();kitpng.src = 'ressource/characters/kitana.png';

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

	var characteristics = new Map();

	kitana_coups = new Map();
	kitana_coups.set("lpunch",{slag : 10, fdur : 6, elag : 8, degats : 7, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 47,hitboxys : 0, hitboxye : 75, blockstun : 12, blockx : 0.6, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("hpunch",{slag : 14, fdur : 10, elag : 16, degats : 10, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 49, hitboxys : 0, hitboxye : 82, blockstun : 14, blockx : 1, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("lkick",{slag : 14, fdur : 8, elag : 14, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 53, hitboxys : 0, hitboxye : 40, blockstun : 12, blockx : 0.6, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("mkick",{slag : 16, fdur : 12, elag : 16, degats : 9, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 52, hitboxys : 0, hitboxye : 98, blockstun : 14, blockx : 1, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("hkick",{slag : 14, fdur : 8, elag : 24, movx : 3, degats : 14, hitstun : 35, hurtx : 3.2, hurty : 7, hitboxxs : 20, hitboxxe : 50, hitboxys : 0, hitboxye : 106, blockstun : 16, blockx : 1.4, hiteffect : "fall", hitboxxeyscaling : 0});
	kitana_coups.set("clpunch",{slag : 8, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 30,hitboxys : -1, hitboxye : 20, blockstun : 10, blockx : 0.4, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("huppercut",{slag : 12, fdur : 10, elag : 24, degats : 18, hitstun : 50, hurtx : 3, hurty : 9.5, hitboxxs : 20, hitboxxe : 40, hitboxys : 0, hitboxye : 109, blockstun : 16, blockx : 1, hiteffect : "fall", hitboxxeyscaling : 0});
	kitana_coups.set("clkick",{slag : 8, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 38,hitboxys : -1, hitboxye : 5, blockstun : 10, blockx : 0.4, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("cmkick",{slag : 13, fdur : 6, elag : 12, degats : 8, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 50,hitboxys : -1, hitboxye : 5, blockstun : 10, blockx : 0.4, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("jkick",{slag : 6, fdur : 25, elag : 4, degats : 6, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 60,hitboxys : -55, hitboxye : 5, landinglag : 8, blockstun : 10, blockx : 0.4, hiteffect : "fall", hitboxxeyscaling : -1});
	kitana_coups.set("jskick",{slag : 8, fdur : 15, elag : 4, degats : 10, hitstun : 32, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 33,hitboxys : -20, hitboxye : 30, landinglag : 8, blockstun : 10, blockx : 0.4, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("jpunch",{slag : 5, fdur : 10, elag : 6, degats : 6, hitstun : 20, hurtx : 1.5, hurty : 0, hitboxxs : -5, hitboxxe : 58,hitboxys : -40, hitboxye : 5, landinglag : 8, blockstun : 10, blockx : 0.4, hiteffect : "none", hitboxxeyscaling : 0});
	kitana_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 15, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 30,hitboxys : 0, hitboxye : 75, blockstun : 12, blockx : 0.6, hiteffect : "grab", hitboxxeyscaling : 0});


	characteristics.set("kitana",{width : 34, height : 97,vitesse : 3.5,fdashslag : 3,fdashfdur : 11,fdashelag : 5,fdashspeed : 7, bdashslag : 3, bdashfdur : 13, bdashelag : 10, bdashspeed : 5, gravity : 0.4, jumpforce : 9,jumpsquat : 3, shorthop : 6, friction:0.2,
	airdrift : 0.2, airmaxspeed : 2, airdodgespeed : 5.5, airdodgefdur : 15, landinglag : 8,coups : kitana_coups, pv : 100, getupfdur : 30, grabfdur : 35});


	var movpriority = new Map(); 	//you can cancel a mov by a mov of priority stritcly superior
	movpriority.set("",0);
	movpriority.set("forward_dash",10);
	movpriority.set("back_dash",10);
	movpriority.set("lpunch",30);
	movpriority.set("clpunch",30);
	movpriority.set("hpunch",40);
	movpriority.set("jpunch",40);
	movpriority.set("jkick",40);
	movpriority.set("jskick",40);
	movpriority.set("lkick",30);
	movpriority.set("mkick",40);
	movpriority.set("clkick",30);
	movpriority.set("cmkick",40);
	movpriority.set("hkick",50);
	movpriority.set("huppercut",50);
	movpriority.set("air_dodge",100);
	movpriority.set("landing_lag",100);
	movpriority.set("jumpsquat",100);
	movpriority.set("free_fall",100);
	movpriority.set("grab",100);


	j1 = new Joueur(-150,0,"kitana",0);
	j2 = new Joueur(150,0,"kitana",1);

	var camerax = 0;
	var decalagex = 256;
	var ground = 262;

	
	var controls=["ArrowRight","ArrowLeft","KeyJ","ArrowDown","KeyB","KeyN","KeyM","KeyH","KeyF","KeyS","KeyE","KeyD","KeyQ","KeyA","KeyZ","KeyW"];

	function logKey(e) {
		if(e.code==controls[0]){j1.droite=1}
		if(e.code==controls[1]){j1.gauche=1}
		if(e.code==controls[2]&&j1.haut==0){j1.haut=1}
		if(e.code==controls[3]){j1.bas=1}
		if(e.code==controls[4]&&j1.poing==0){j1.poing=1}
		if(e.code==controls[5]&&j1.jambe==0){j1.jambe=1}
		if(e.code==controls[6]&&j1.special==0){j1.special=1}
		if(e.code==controls[7]&&j1.dodge==0){j1.dodge=1;}
		if(e.code==controls[8]){j2.droite=1}
		if(e.code==controls[9]){j2.gauche=1}
		if(e.code==controls[10]&&j2.haut==0){j2.haut=1}
		if(e.code==controls[11]){j2.bas=1}
		if(e.code==controls[12]&&j2.poing==0){j2.poing=1}
		if(e.code==controls[13]&&j2.jambe==0){j2.jambe=1}
		if(e.code==controls[14]&&j2.special==0){j2.special=1}
		if(e.code==controls[15]&&j2.dodge==0){j2.dodge=1}
		key=e.code;
	}
	function unlogKey(e){
		if(e.code==controls[0]){j1.droite=0}
		if(e.code==controls[1]){j1.gauche=0}
		if(e.code==controls[2]){j1.haut=0}
		if(e.code==controls[3]){j1.bas=0}
		if(e.code==controls[4]){j1.poing=0}
		if(e.code==controls[5]){j1.jambe=0}
		if(e.code==controls[6]){j1.special=0}
		if(e.code==controls[7]){j1.dodge=0;}
		if(e.code==controls[8]){j2.droite=0}
		if(e.code==controls[9]){j2.gauche=0}
		if(e.code==controls[10]){j2.haut=0}
		if(e.code==controls[11]){j2.bas=0}
		if(e.code==controls[12]){j2.poing=0}
		if(e.code==controls[13]){j2.jambe=0}
		if(e.code==controls[14]){j2.special=0}
		if(e.code==controls[15]){j2.dodge=0}
	}
	function clickEvent(e){
		clickx=(e.pageX-decalage)/Width;clicky=e.pageY/Height;click=1;
	}
	function unclickEvent(e){
		click=0;
	}
	document.addEventListener('keydown', logKey);
	document.addEventListener('keyup', unlogKey);
	document.addEventListener("mousedown", clickEvent);
	document.addEventListener("mouseup", unclickEvent);

	_  = setInterval(loop,17)
}