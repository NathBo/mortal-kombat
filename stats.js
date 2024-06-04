var characteristics = new Map();

	kitana_coups = new Map();
	kitana_coups.set("lpunch",{slag : 8, fdur : 6, elag : 12, degats : 5, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 15, hitboxxe : 47,hitboxys : 0, hitboxye : 75, hitboxxouv : 20, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	kitana_coups.set("hpunch",{slag : 14, fdur : 10, elag : 16, degats : 10, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 49, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	kitana_coups.set("lkick",{slag : 10, fdur : 8, elag : 14, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 54, hitboxys : 0, hitboxye : 40, hitboxxouv : 24, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	kitana_coups.set("mkick",{slag : 16, fdur : 12, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 52, hitboxys : 0, hitboxye : 98, hitboxxouv : 24, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	kitana_coups.set("hkick",{slag : 14, fdur : 8, elag : 24, degats : 16, hitstun : 38, hurtx : 3.2, hurty : 7, hitboxxs : 20, hitboxxe : 50, hitboxys : 0, hitboxye : 106, hitboxxouv : 30, blood_height : 0, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 3,});
	kitana_coups.set("clpunch",{slag : 6, fdur : 6, elag : 8, degats : 4, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 30,hitboxys : -1, hitboxye : 20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0});
	kitana_coups.set("huppercut",{slag : 12, fdur : 10, elag : 24, degats : 20, hitstun : 60, hurtx : 3, hurty : 10, hitboxxs : 20, hitboxxe : 40, hitboxys : 0, hitboxye : 115, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.25, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0});
	kitana_coups.set("clkick",{slag : 6, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 38,hitboxys : -45, hitboxye : -60, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0});
	kitana_coups.set("cmkick",{slag : 13, fdur : 6, elag : 12, degats : 9, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 50,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0});
	kitana_coups.set("jkick",{slag : 10, fdur : 25, elag : 4, degats : 10, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 11, blockx : 1.9, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0});
	kitana_coups.set("jskick",{slag : 8, fdur : 15, elag : 7, degats : 13, hitstun : 32, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 33,hitboxys : -20, hitboxye : 30, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 11, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 8, hitsound : "hhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0});
	kitana_coups.set("jpunch",{slag : 6, fdur : 10, elag : 10, degats : 8, hitstun : 22, hurtx : 1.5, hurty : 0, hitboxxs : 15, hitboxxe : 58,hitboxys : -40, hitboxye : -40, hitboxxouv : 32, blood_height : 0, landinglag : 8, blockstun : 13, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : -0.2, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0});
	kitana_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 12, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 28,hitboxys : 0, hitboxye : -400, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	kitana_coups.set("fanthrow",{slag : 25, fdur : 0, elag : 16, degats : 8, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 3, hitsound : "fan", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0});
	kitana_coups.set("fanswipe",{slag : 12, fdur : 8, elag : 8, degats : 12, hitstun : 30, hurtx : 3, hurty : 0, hitboxxs : 18, hitboxxe : 60, hitboxys : 0, hitboxye : 70, hitboxxouv : 20, blood_height : 0, blockstun : 16, blockx : 2.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 9, hitsound : "fan", blood : "mblood", damageonblock : 3, disponibility : "stand", voiceline : "mmov", movx : 0});
	kitana_coups.set("fanlift",{slag : 5, fdur : 10, elag : 5, degats : 8, hitstun : 38, hurtx : 0.6, hurty : 5, hitboxxs : -10, hitboxxe : 10, hitboxys : -10, hitboxye : 10, hitboxxouv : 0, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 5, hitsound : "hhit", blood : "lblood", damageonblock : 3, disponibility : "stand", voiceline : "mmov", movx : 0});
	kitana_coups.set("squarepunch",{slag : 15, fdur : 20, elag : 2, degats : 9, hitstun : 25, hurtx : 4.5, hurty : 2, hitboxxs : 15, hitboxxe : 58,hitboxys : -40, hitboxye : -40, hitboxxouv : 32, blood_height : 0, landinglag : 8, blockstun : 13, blockx : 1.9, hiteffect : "fall", hitboxxeyscaling : -0.2, hitlag : 9, hitsound : "mhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 0});

	raiden_coups = new Map();
	raiden_coups.set("lpunch",{slag : 6, fdur : 6, elag : 12, degats : 5, hitstun : 22, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 43,hitboxys : 0, hitboxye : 95, hitboxxouv : 18, blood_height : 10, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	raiden_coups.set("hpunch",{slag : 14, fdur : 10, elag : 16, degats : 10, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 49, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	raiden_coups.set("lkick",{slag : 8, fdur : 8, elag : 14, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 54, hitboxys : 0, hitboxye : 40, hitboxxouv : 12, blood_height : -5, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	raiden_coups.set("mkick",{slag : 16, fdur : 12, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 51, hitboxys : 0, hitboxye : 98, hitboxxouv : 24, blood_height : 5, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov"});
	raiden_coups.set("hkick",{slag : 14, fdur : 8, elag : 24, degats : 16, hitstun : 38, hurtx : 3.5, hurty : 7, hitboxxs : 20, hitboxxe : 48, hitboxys : 0, hitboxye : 106, hitboxxouv : 30, blood_height : 8, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 2});
	raiden_coups.set("clpunch",{slag : 7, fdur : 6, elag : 8, degats : 4, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 42,hitboxys : -1, hitboxye : 20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0});
	raiden_coups.set("huppercut",{slag : 12, fdur : 10, elag : 28, degats : 19, hitstun : 60, hurtx : 3.1, hurty : 11, hitboxxs : 20, hitboxxe : 46, hitboxys : 0, hitboxye : 120, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.25, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0});
	raiden_coups.set("clkick",{slag : 6, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -45, hitboxye : -60, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 0.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0});
	raiden_coups.set("cmkick",{slag : 8, fdur : 6, elag : 12, degats : 8, hitstun : 22, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0});
	raiden_coups.set("jkick",{slag : 10, fdur : 25, elag : 4, degats : 10, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 2.3, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0});
	raiden_coups.set("jskick",{slag : 8, fdur : 15, elag : 7, degats : 11, hitstun : 28, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 56,hitboxys : -20, hitboxye : 20, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0.5, hitlag : 8, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0});
	raiden_coups.set("jpunch",{slag : 6, fdur : 10, elag : 10, degats : 8, hitstun : 24, hurtx : 1.2, hurty : 0, hitboxxs : 40, hitboxxe : 59,hitboxys : -50, hitboxye : 10, hitboxxouv : 32, blood_height : 0, landinglag : 6, blockstun : 12, blockx : 2.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0});
	raiden_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 12, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 28,hitboxys : 0, hitboxye : -400, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	raiden_coups.set("teleport",{slag : 11, fdur : 0, elag : 12, degats : 0, hitstun : 0, hurtx : 0.9, hurty : 0, hitboxxs : 0, hitboxxe : 0,hitboxys : 0, hitboxye : -400, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0});
	raiden_coups.set("boltthrow",{slag : 14, fdur : 0, elag : 30, degats : 8, hitstun : 22, hurtx : 1.1, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 1.5, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 7, hitsound : "electrocute", blood : "electrocute", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0});
	raiden_coups.set("thundergod",{slag : 10, fdur : 30, elag : 0, degats : 11, hitstun : 60, hurtx : 5, hurty : 8, hitboxxs : 20, hitboxxe : 50,hitboxys : 0, hitboxye : 30, hitboxxouv : 40, blood_height : 20, blockstun : 10, blockx : 1.7, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 9, hitsound : "hhit", blood : "mblood", damageonblock : 2, disponibility : "stand", voiceline : "raidenbullshit", movx : 0});
	raiden_coups.set("elecgrab",{slag : 8, fdur : 8, elag : 8, degats : 50, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 28,hitboxys : 0, hitboxye : -400, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "electrocute", blood : "electrocute", damageonblock : 1, disponibility : "stand", voiceline : "mmov", movx : 2.5});



    



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
	movpriority.set("fanthrow",70);
	movpriority.set("fanswipe",70);
	movpriority.set("fanlift",70);
	movpriority.set("squarepunch",70);
	movpriority.set("teleport",70);
	movpriority.set("thundergod",70);
	movpriority.set("elecgrab",70);
	movpriority.set("air_dodge",100);
	movpriority.set("landing_lag",100);
	movpriority.set("jumpsquat",100);
	movpriority.set("free_fall",100);
	movpriority.set("grab",100);

	var cd_dependance = new Map();
	cd_dependance.set("",0);
	cd_dependance.set("forward_dash",-1);
	cd_dependance.set("back_dash",-1);
	cd_dependance.set("lpunch",-1);
	cd_dependance.set("clpunch",-1);
	cd_dependance.set("hpunch",-1);
	cd_dependance.set("jpunch",-1);
	cd_dependance.set("jkick",-1);
	cd_dependance.set("jskick",-1);
	cd_dependance.set("lkick",-1);
	cd_dependance.set("mkick",-1);
	cd_dependance.set("clkick",-1);
	cd_dependance.set("cmkick",-1);
	cd_dependance.set("hkick",-1);
	cd_dependance.set("huppercut",-1);
	cd_dependance.set("fanthrow",0);
	cd_dependance.set("fanswipe",1);
	cd_dependance.set("fanlift",2);
	cd_dependance.set("squarepunch",3);
	cd_dependance.set("air_dodge",-1);
	cd_dependance.set("landing_lag",-1);
	cd_dependance.set("jumpsquat",-1);
	cd_dependance.set("free_fall",-1);
	cd_dependance.set("grab",-1);
	cd_dependance.set("teleport",3);
	cd_dependance.set("boltthrow",2);
	cd_dependance.set("thundergod",1);
	cd_dependance.set("elecgrab",0);