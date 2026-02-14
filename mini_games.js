


function drawGauge(ctx, x, y, width, height, value) {
    // value entre 0 et 1

    ctx.save();


    // Hauteur remplie
    const filledHeight = height * value;

    // Gradient vertical (bas → haut)
    const gradient = ctx.createLinearGradient(
        0, y + height,   // bas
        0, y             // haut
    );

    gradient.addColorStop(0, "green");
    gradient.addColorStop(1, "red");

    ctx.fillStyle = gradient;

    ctx.fillRect(
        x,
        y + height - filledHeight,
        width,
        filledHeight
    );

    ctx.restore();
}


class MiniGame{
    constructor(ctx,j1,base_score,music){
        this.ctx = ctx; this.j1=j1;
        this.base_score = base_score;
        this.addi_score = 0;
        this.show_score_cpt = 0;
        this.show_add_score = 0;
        this.shakeframe = 0; this.shakex = 0.; this.shakey = 0.; this.shakeforce = 0.;
        this.music = music;this.music.play();
    }
    render(){
        if(this.shakeframe > 0){
			this.shakeframe --;
			if(this.shakeframe<=3){this.shakeforce*=0.8;}
			this.shakex = -this.shakeforce + 2*Math.random()*this.shakeforce;
			this.shakey = -this.shakeforce + 2*Math.random()*this.shakeforce;
		}
		else{
			this.shakex = 0; this.shakey = 0;
		}
    }
    shake_screen(frames,force){
		this.shakeforce = force; this.shakeframe = frames;
	}

    drawScore(){
        this.ctx.fillStyle = "yellow";
        this.ctx.font = "40px Luminari";
        this.ctx.fillText("Score: "+(this.base_score+this.addi_score).toString(),20,42);
        if(this.show_score_cpt){
            this.show_score_cpt--;
            var a = 40*0.86;
            var dec = 0;
            if (this.show_score_cpt>=35){
                var dec = -8*(this.show_score_cpt-35);
            }
            if (this.combo_affich_cpt<=5){
                this.ctx.globalAlpha = this.show_score_cpt*0.2;
            }
            this.ctx.fillText("+"+this.show_add_score.toString(),a-6+dec,85);
            this.ctx.globalAlpha = 1.0;
        }
    }

    addScore(s){
        this.addi_score+=s;
        this.show_add_score = s;
        this.show_score_cpt = 40;
    }

    endMiniGame(){
        end_mini_game = true;
        mini_game_score = this.addi_score;
        this.music.pause();
        this.music.currentTime = 0;
    }

    drawSkin(x,y,skin,anim,orientation,coordinates,charac_width){
        this.ctx.scale(2*orientation,2);
        var coords = coordinates.get(anim);
        this.ctx.drawImage(skin,coords.offx,coords.offy,coords.width,coords.height,(x+coords.decx*orientation-orientation*charac_width/2+this.shakex)*orientation,y-coords.height-coords.decy+this.shakey,coords.width,coords.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(1,1);
    }

    drawSkinRota(x,y,skin,anim,orientation,coordinates,rotation){
        var coords = coordinates.get(anim);
        var x = (x+coords.decx*orientation-orientation*coords.width/2+this.shakex)*orientation;
        var y = y-coords.height-coords.decy+this.shakey;
        this.ctx.scale(2*orientation,2);
        this.ctx.translate(x+coords.width/2,y+coords.height/2);
        this.ctx.rotate(Math.PI*rotation/180);
        this.ctx.drawImage(skin,coords.offx,coords.offy,coords.width,coords.height,-coords.width/2,-coords.height/2,coords.width,coords.height);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(1,1);
        this.ctx.restore();
    }

    drawImage(image,x,y){
        this.ctx.scale(2,2);
        this.ctx.drawImage(image,x+this.shakex,y+this.shakey);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(1,1);
    }
}


class TestYourMight extends MiniGame{
    constructor(ctx,j1,base_score,music,perso1stats,perso2stats,skins){
        super(ctx,j1,base_score,music);
        this.perso1stats = perso1stats;
        this.skin1 = perso1stats.png[skins[0]];this.skin2 = perso2stats.png[skins[1]];
        this.width1 = perso1stats.width; this.width2 = perso2stats.width;
        this.coordinates1 = perso1stats.coordinates; this.coordinates2 = perso2stats.coordinates;
        this.standnframes1 = perso1stats.standnframes; this.standnframes2 = perso2stats.standnframes;
        this.stunnframes1 = perso1stats.stunnframes; this.stunnframes2 = perso2stats.stunnframes;

        this.cameray = 0; this.costcpt1 = 0; this.costcpt2 = 0;
        this.global_cpt = 0; this.heady = 0; this.goalheady = 0; this.head_rota = 0; this.head_tb = 5;
        this.has_reached = false; this.charge=0;
        this.shakepersx = 0.; this.shakepersy = 0.;
    }
    render(){
        super.render();
        if(this.global_cpt==0){play_sound_eff("testyourmight");}
        this.cameray = Math.max(this.cameray,this.heady-50);
        this.drawImage(mountainpng,0,this.cameray-680);

        var start_punch = 120;
        var end_stand = 210;
        var decap = end_stand+12;
        var show_score = decap+30;
        var end_mini_time = show_score+80;

        this.shakepersx = 0.; this.shakepersy = 0.;


        if(this.global_cpt<=start_punch){
            var a = 4;
            this.costcpt1 = (this.costcpt1+1)%(this.standnframes1*a);
            var n1 = Math.floor(this.costcpt1/a)+1; this.costume1 = "stand"+n1.toString();
        }
        else if(this.global_cpt<=end_stand){
            this.costume1 = "huppercut1";
            if(this.j1.poing==1){this.charge+=1;this.j1.poing=2;}
            else{this.charge -= this.charge*0.004;}
            this.shakepersx = (0.5-Math.random())*this.charge/2.; this.shakepersy = (0.5-Math.random())*this.charge/2.;
        }
        else{
            if(this.global_cpt<=end_stand+4){this.costume1="huppercut1";}
            else if(this.global_cpt<=end_stand+8){this.costume1="huppercut2";}
            else if(this.global_cpt<=end_stand+12){this.costume1="huppercut3";}
            else{this.costume1="huppercut4";}
        }
        if(this.global_cpt<=decap){
            var b = 7;
            this.costcpt2 = (this.costcpt2+1)%(this.stunnframes2*b);
            var n2 = Math.floor(this.costcpt2/b)+1; this.costume2 = "stunned"+n2.toString();
        }
        else{
            var b = 5;
            var n2 = Math.min(6,Math.floor((this.global_cpt-decap)/b)+1);
            this.costume2 = "decapitated"+n2.toString();
        }

        if(this.global_cpt==start_punch-2){play_sound_eff(this.perso1stats.voiceactor+"lmov")}
        if(this.global_cpt==end_stand){this.goalheady=this.charge*30;play_sound_eff(this.perso1stats.voiceactor+"hmov")}
        if(this.global_cpt==decap-2){play_sound_eff("hhit");play_sound_eff("spithit");}
        if(this.global_cpt==decap){this.shake_screen(5+Math.floor(this.charge/2),1.+this.charge*1.3);}

        this.drawSkin(200+this.shakepersx,this.cameray+245+this.shakepersy,this.skin1,this.costume1,1,this.coordinates1,this.width1);
        this.drawSkin(250,this.cameray+245,this.skin2,this.costume2,-1,this.coordinates2,this.width2);

        if(this.global_cpt>=decap){
            this.drawSkinRota(258,this.cameray+155-this.heady,this.skin2,"head",-1,this.coordinates2,this.head_rota);
            if (this.has_reached){
                this.heady+=this.head_tb;
                if(this.head_tb>=-0.1){this.head_tb-=0.02}
                else{this.head_tb-=0.5;}
                if(this.heady<=-85){this.heady=-85;this.head_rota=0;}
            }
            else if(this.heady<=this.goalheady-10){
                if(this.global_cpt>=decap+5){this.heady+=5;}
            }
            else if(this.heady<=this.goalheady){
                this.heady+=this.head_tb;
                this.head_tb-=0.5;
                if(this.heady>this.goalheady){this.has_reached=true;this.head_tb=0.;if(this.heady>=50.){play_sound_eff("ding");}}
            }
            this.head_rota = (this.head_rota+20.)%360;
        }


        drawGauge(this.ctx,20,380,20,100,this.charge/8.);
        var meters = this.heady;
        if(this.has_reached){meters=this.goalheady;}
        meters = Math.floor(meters/40)*50;
        this.ctx.fillStyle = "grey";
        this.ctx.font = "50px Luminari";
        this.ctx.fillText(meters.toString()+"m",770,45);

        if(this.global_cpt==show_score){
            this.addScore(meters*10);
            if(meters>200){play_sound_eff("compliment");}
        }
        if(this.global_cpt==end_mini_time){
            this.endMiniGame();
        }

        this.drawScore();

        if(this.global_cpt<=start_punch-10){
            if(this.global_cpt%6<3){this.ctx.fillStyle = "white";}
            else{this.ctx.fillStyle = "red";}
            this.ctx.font = "50px Luminari";
            this.ctx.fillText("Test Your Might!",280,100);
        }

        if(this.has_reached || this.global_cpt<=decap+10){this.global_cpt++;}

    }
}




