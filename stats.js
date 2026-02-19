var characteristics = new Map();

function get_default_combos(){
    let default_combos = new Map();
    default_combos.set("lpunch","hkick");
    default_combos.set("hpunch","hkick");
    default_combos.set("lkick","hkick");
    default_combos.set("mkick","hkick");
    default_combos.set("clpunch","huppercut");
    default_combos.set("clkick","huppercut");
    default_combos.set("cmkick","huppercut");
    return default_combos;
}

var default_combos = get_default_combos();

var normal_moves = ["lpunch","hpunch","lkick","mkick","hkick","clpunch","huppercut","clkick","cmkick","jkick","jskick","jpunch","grab"];


var kitana_coups = new Map();
kitana_coups.set("lpunch",{slag : 8, fdur : 6, elag : 12, degats : 5, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 15, hitboxxe : 47,hitboxys : 1, hitboxye : 75, hitboxxouv : 20, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("hpunch",{slag : 14, fdur : 10, elag : 16, degats : 9, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 49, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("lkick",{slag : 10, fdur : 8, elag : 14, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 54, hitboxys : 0, hitboxye : 40, hitboxxouv : 24, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("mkick",{slag : 16, fdur : 12, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 52, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("hkick",{slag : 14, fdur : 8, elag : 24, degats : 15, hitstun : 38, hurtx : 3.2, hurty : 7, hitboxxs : 20, hitboxxe : 52, hitboxys : 1, hitboxye : 106, hitboxxouv : 30, blood_height : 0, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 2, coupwav : "coup"});
kitana_coups.set("clpunch",{slag : 6, fdur : 6, elag : 8, degats : 4, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 30,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("huppercut",{slag : 12, fdur : 10, elag : 24, degats : 20, hitstun : 60, hurtx : 3, hurty : 10, hitboxxs : 20, hitboxxe : 42, hitboxys : 1, hitboxye : 95, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.05, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
kitana_coups.set("clkick",{slag : 6, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 38,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("cmkick",{slag : 13, fdur : 6, elag : 12, degats : 9, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 50,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("jkick",{slag : 10, fdur : 25, elag : 4, degats : 10, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 11, blockx : 2.2, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
kitana_coups.set("jskick",{slag : 8, fdur : 15, elag : 7, degats : 13, hitstun : 32, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 33,hitboxys : -20, hitboxye : 30, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 11, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 8, hitsound : "hhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
kitana_coups.set("jpunch",{slag : 7, fdur : 10, elag : 10, degats : 8, hitstun : 22, hurtx : 1.5, hurty : 0, hitboxxs : 15, hitboxxe : 58,hitboxys : -40, hitboxye : -40, hitboxxouv : 32, blood_height : 0, landinglag : 8, blockstun : 13, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : -0.2, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
kitana_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 12, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
kitana_coups.set("fanthrow",{slag : 18, fdur : 0, elag : 20, degats : 3, hitstun : 22, hurtx : 0.9, hurty : 1, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 3, hitsound : "fan", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "coup"});
kitana_coups.set("fanswipe",{slag : 8, fdur : 6, elag : 8, degats : 10, hitstun : 30, hurtx : 3, hurty : 4., hitboxxs : 18, hitboxxe : 60, hitboxys : 1, hitboxye : 70, hitboxxouv : 20, blood_height : 0, blockstun : 10, blockx : 2.8, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 9, hitsound : "fan", blood : "mblood", damageonblock : 3, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "coup"});
kitana_coups.set("fanlift",{slag : 5, fdur : 10, elag : 5, degats : 8, comboscaling : 0.15, hitstun : 38, hurtx : 0.6, hurty : 5, hitboxxs : -10, hitboxxe : 10, hitboxys : -10, hitboxye : 10, hitboxxouv : 0, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 5, hitsound : "hhit", blood : "lblood", damageonblock : 3, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "coup"});
kitana_coups.set("squarepunch",{slag : 15, fdur : 20, elag : 2, degats : 9, hitstun : 25, hurtx : 4.5, hurty : 2, hitboxxs : 15, hitboxxe : 58,hitboxys : -40, hitboxye : -1, hitboxxouv : 32, blood_height : 0, landinglag : 8, blockstun : 13, blockx : 1.9, hiteffect : "fall", hitboxxeyscaling : -0.2, hitlag : 9, hitsound : "mhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 0, coupwav : "coup"});

var kitana_combos = get_default_combos();
kitana_combos.set("hkick","fanthrow");
kitana_combos.set("huppercut","fanlift");


var mileena_coups = new Map();
mileena_coups.set("lpunch",{slag : 7, fdur : 6, elag : 12, degats : 5, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 15, hitboxxe : 47,hitboxys : 1, hitboxye : 75, hitboxxouv : 20, blood_height : 0, blockstun : 11, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("hpunch",{slag : 13, fdur : 10, elag : 16, degats : 9, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 49, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 13, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("lkick",{slag : 9, fdur : 8, elag : 14, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 54, hitboxys : 0, hitboxye : 40, hitboxxouv : 24, blood_height : 0, blockstun : 11, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("mkick",{slag : 15, fdur : 12, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 52, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 0, blockstun : 13, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("hkick",{slag : 14, fdur : 8, elag : 24, degats : 15, hitstun : 38, hurtx : 3.2, hurty : 7, hitboxxs : 20, hitboxxe : 52, hitboxys : 1, hitboxye : 106, hitboxxouv : 30, blood_height : 0, blockstun : 15, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 3, coupwav : "coup"});
mileena_coups.set("clpunch",{slag : 6, fdur : 6, elag : 8, degats : 4, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 30,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 9, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("huppercut",{slag : 12, fdur : 10, elag : 24, degats : 18, hitstun : 60, hurtx : 3, hurty : 10, hitboxxs : 20, hitboxxe : 47, hitboxys : 1, hitboxye : 90, hitboxxouv : 15, blood_height : 0, blockstun : 15, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.03, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
mileena_coups.set("clkick",{slag : 7, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 38,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 9, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("cmkick",{slag : 12, fdur : 6, elag : 12, degats : 9, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 10, hitboxxe : 50,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 11, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("jkick",{slag : 8, fdur : 25, elag : 4, degats : 10, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 2.3, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
mileena_coups.set("jskick",{slag : 7, fdur : 15, elag : 7, degats : 13, hitstun : 32, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 33,hitboxys : -20, hitboxye : 30, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 8, hitsound : "hhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
mileena_coups.set("jpunch",{slag : 6, fdur : 10, elag : 10, degats : 8, hitstun : 22, hurtx : 1.5, hurty : 0, hitboxxs : 15, hitboxxe : 58,hitboxys : -40, hitboxye : -40, hitboxxouv : 32, blood_height : 0, landinglag : 8, blockstun : 12, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : -0.2, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
mileena_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 12, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
mileena_coups.set("knifethrow",{slag : 11, fdur : 0, elag : 14, degats : 8, hitstun : 22, hurtx : 1.1, hurty : 4, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 8, blockx : 1.5, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "fan", blood : "lblood", damageonblock : 2,landinglag : 9, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
var knife_stats = {slag : 11, fdur : 0, elag : 14, degats : 8, hitstun : 22, hurtx : 1.1, hurty : 4, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 8, blockx : 1.5, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "fan", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""};
mileena_coups.set("teleport_drop",{slag : 12, fdur : 0, elag : 0, degats : 0, hitstun : 0, hurtx : 0.9, hurty : 0, hitboxxs : 0, hitboxxe : 0,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "teleport"});
mileena_coups.set("ball",{slag : 6, fdur : 12, elag : 7, degats : 10, comboscaling : 0.15, hitstun : 60, hurtx : 2, hurty : 8, hitboxxs : 20, hitboxxe : 20,hitboxys : -20, hitboxye : 45, hitboxxouv : 0, blood_height : -5, blockstun : 8, blockx : 1.4, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 9, hitsound : "mhit", blood : "mblood", damageonblock : 2, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
mileena_coups.set("homing_knife",{slag : 20, fdur : 0, elag : 14, degats : 5, hitstun : 22, hurtx : 1.1, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 8, blockx : 1.5, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 7, hitsound : "fan", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});

var mileena_combos = get_default_combos();
mileena_combos.set("hkick","knifethrow");
mileena_combos.set("ball","huppercut");


var raiden_coups = new Map();
raiden_coups.set("lpunch",{slag : 6, fdur : 6, elag : 12, degats : 5, hitstun : 22, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 43,hitboxys : 1, hitboxye : 95, hitboxxouv : 18, blood_height : 10, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("hpunch",{slag : 14, fdur : 10, elag : 16, degats : 10, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 49, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("lkick",{slag : 8, fdur : 8, elag : 14, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 54, hitboxys : 0, hitboxye : 40, hitboxxouv : 12, blood_height : -5, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("mkick",{slag : 16, fdur : 12, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 51, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 5, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("hkick",{slag : 14, fdur : 8, elag : 24, degats : 16, hitstun : 38, hurtx : 3.5, hurty : 7, hitboxxs : 20, hitboxxe : 48, hitboxys : 1, hitboxye : 106, hitboxxouv : 30, blood_height : 8, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 1.8, coupwav : "coup"});
raiden_coups.set("clpunch",{slag : 7, fdur : 6, elag : 8, degats : 4, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 42,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("huppercut",{slag : 12, fdur : 10, elag : 28, degats : 19, hitstun : 60, hurtx : 3.1, hurty : 11, hitboxxs : 20, hitboxxe : 49, hitboxys : 1, hitboxye : 90, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.03, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
raiden_coups.set("clkick",{slag : 6, fdur : 6, elag : 8, degats : 6, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 0.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("cmkick",{slag : 8, fdur : 6, elag : 12, degats : 8, hitstun : 22, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("jkick",{slag : 10, fdur : 25, elag : 4, degats : 10, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
raiden_coups.set("jskick",{slag : 8, fdur : 15, elag : 7, degats : 11, hitstun : 28, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 56,hitboxys : -20, hitboxye : 20, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0.5, hitlag : 8, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
raiden_coups.set("jpunch",{slag : 6, fdur : 10, elag : 10, degats : 8, hitstun : 24, hurtx : 1.2, hurty : 0, hitboxxs : 40, hitboxxe : 59,hitboxys : -50, hitboxye : 10, hitboxxouv : 32, blood_height : 0, landinglag : 6, blockstun : 12, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
raiden_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 12, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
raiden_coups.set("teleport",{slag : 10, fdur : 0, elag : 10, degats : 0, hitstun : 0, hurtx : 0.9, hurty : 0, hitboxxs : 0, hitboxxe : 0,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "teleport"});
raiden_coups.set("boltthrow",{slag : 14, fdur : 0, elag : 30, degats : 8, hitstun : 22, hurtx : 1.1, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 1.5, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 7, hitsound : "electrocute", blood : "electrocute", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
raiden_coups.set("thundergod",{slag : 10, fdur : 30, elag : 0, degats : 11, hitstun : 60, hurtx : 5, hurty : 8, hitboxxs : 20, hitboxxe : 50,hitboxys : 0, hitboxye : 30, hitboxxouv : 40, blood_height : 20, blockstun : 10, blockx : 1.7, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 9, hitsound : "hhit", blood : "mblood", damageonblock : 2, disponibility : "stand", voiceline : "raidenbullshit", movx : 0, coupwav : ""});
raiden_coups.set("elecgrab",{slag : 8, fdur : 8, elag : 8, degats : 50, hitstun : 22, hurtx : 0.9, hurty : 0, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "electrocute", blood : "electrocute", damageonblock : 1, disponibility : "stand", voiceline : "mmov", movx : 2.5, coupwav : "coup"});

var raiden_combos = get_default_combos();
raiden_combos.set("huppercut","thundergod");
raiden_combos.set("hkick","boltthrow");


var scorpion_coups = new Map();
scorpion_coups.set("lpunch",{slag : 5, fdur : 5, elag : 11, degats : 5, hitstun : 21, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 46,hitboxys : 1, hitboxye : 95, hitboxxouv : 19, blood_height : 10, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("hpunch",{slag : 12, fdur : 9, elag : 16, degats : 9, hitstun : 27, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 48, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("lkick",{slag : 8, fdur : 7, elag : 14, degats : 5, hitstun : 19, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 50, hitboxys : 0, hitboxye : 40, hitboxxouv : 11, blood_height : -5, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("mkick",{slag : 14, fdur : 11, elag : 16, degats : 10, hitstun : 25, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 49, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 5, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("hkick",{slag : 13, fdur : 8, elag : 18, degats : 15, hitstun : 38, hurtx : 4.2, hurty : 9.2, hitboxxs : 20, hitboxxe : 50, hitboxys : 1, hitboxye : 100, hitboxxouv : 30, blood_height : 8, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 2, coupwav : "coup"});
scorpion_coups.set("clpunch",{slag : 7, fdur : 6, elag : 8, degats : 4, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 42,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("huppercut",{slag : 11, fdur : 10, elag : 28, degats : 19, hitstun : 60, hurtx : 3.4, hurty : 10.7, hitboxxs : 20, hitboxxe : 51, hitboxys : 1, hitboxye : 95, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.03, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("clkick",{slag : 6, fdur : 6, elag : 7, degats : 5, hitstun : 20, hurtx : 1.2, hurty : 0, hitboxxs : 10, hitboxxe : 47,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 0.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("cmkick",{slag : 9, fdur : 6, elag : 12, degats : 7, hitstun : 22, hurtx : 1.5, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("jkick",{slag : 8, fdur : 25, elag : 4, degats : 10, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 60,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("jskick",{slag : 8, fdur : 15, elag : 7, degats : 11, hitstun : 28, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 56,hitboxys : -20, hitboxye : 20, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0.5, hitlag : 8, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("jpunch",{slag : 7, fdur : 10, elag : 10, degats : 8, hitstun : 24, hurtx : 1.2, hurty : 0, hitboxxs : 40, hitboxxe : 59,hitboxys : -50, hitboxye : 10, hitboxxouv : 32, blood_height : 0, landinglag : 6, blockstun : 12, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("grab",{slag : 4, fdur : 3, elag : 12, degats : 16, hitstun : 60, hurtx : 3, hurty : 6, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("hell_gates",{slag : 6, fdur : 30, elag : 0, degats : 0, hitstun : 0, hurtx : 5, hurty : 8, hitboxxs : 0, hitboxxe : 0,hitboxys : -400, hitboxye : -400, hitboxxouv : 40, blood_height : 20, landinglag : 6, blockstun : 10, blockx : 1.7, hiteffect : "", hitboxxeyscaling : 0, hitlag : 9, hitsound : "hhit", blood : "mblood", damageonblock : 2, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "coup"});
scorpion_coups.set("spear_throw",{slag : 12, fdur : 0, elag : 60, degats : 5, hitstun : 22, hurtx : 2, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : -2, blockstun : 10, blockx : 1.5, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "comehere", movx : 0, coupwav : "grapple"});
var spear_stats = {slag : 12, fdur : 0, elag : 60, degats : 5, hitstun : 22, comboscaling : 0.2, hurtx : -8, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : -2, blockstun : 10, blockx : 1.5, hiteffect : "spear", hitboxxeyscaling : 0, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "coup"}
scorpion_coups.set("leg_takedown",{slag : 12, fdur : 6, elag : 12, degats : 8, hitstun : 22, hurtx : 1.5, hurty : 5, hitboxxs : 10, hitboxxe : 50,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 2, disponibility : "crouch", voiceline : "mmov", movx : 2.2, coupwav : "coup"});
scorpion_coups.set("airgrab",{slag : 1, fdur : 2, elag : 0, degats : 16, hitstun : 60, hurtx : 3, hurty : 6, hitboxxs : 5, hitboxxe : 38,hitboxys : -50, hitboxye : 40, hitboxxouv : 5, blood_height : 0, blockstun : 12, landinglag : 1, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "lmov", movx : 0, coupwav : "coup"});

var scorpion_combos = get_default_combos();
scorpion_combos.set("huppercut","spear_throw");
scorpion_combos.set("cmkick","leg_takedown");
scorpion_combos.set("hkick","hell_gates");

var subzero_coups = new Map();
subzero_coups.set("lpunch",{slag : 7, fdur : 5, elag : 12, degats : 5, hitstun : 22, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 46,hitboxys : 1, hitboxye : 95, hitboxxouv : 19, blood_height : 10, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("hpunch",{slag : 14, fdur : 9, elag : 16, degats : 9, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 48, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("lkick",{slag : 9, fdur : 7, elag : 14, degats : 5, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 50, hitboxys : 0, hitboxye : 40, hitboxxouv : 11, blood_height : -5, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("mkick",{slag : 16, fdur : 11, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 49, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 5, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("hkick",{slag : 14, fdur : 8, elag : 18, degats : 15, hitstun : 45, hurtx : 3.5, hurty : 6.8, hitboxxs : 20, hitboxxe : 50, hitboxys : 1, hitboxye : 100, hitboxxouv : 30, blood_height : 8, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 2.4, coupwav : "coup"});
subzero_coups.set("clpunch",{slag : 8, fdur : 6, elag : 8, degats : 4, hitstun : 21, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 42,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("huppercut",{slag : 12, fdur : 10, elag : 28, degats : 19, hitstun : 60, hurtx : 3, hurty : 10, hitboxxs : 20, hitboxxe : 51, hitboxys : 1, hitboxye : 95, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.03, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
subzero_coups.set("clkick",{slag : 7, fdur : 6, elag : 7, degats : 5, hitstun : 20, hurtx : 1.2, hurty : 0, hitboxxs : 10, hitboxxe : 47,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 0.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("cmkick",{slag : 10, fdur : 6, elag : 12, degats : 8, hitstun : 22, hurtx : 1.5, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("jkick",{slag : 10, fdur : 25, elag : 4, degats : 10, hitstun : 38, hurtx : 3.2, hurty : 5, hitboxxs : 0, hitboxxe : 60,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
subzero_coups.set("jskick",{slag : 10, fdur : 15, elag : 7, degats : 11, hitstun : 30, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 56,hitboxys : -20, hitboxye : 20, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0.5, hitlag : 8, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
subzero_coups.set("jpunch",{slag : 7, fdur : 10, elag : 10, degats : 8, hitstun : 25, hurtx : 1.2, hurty : 0, hitboxxs : 40, hitboxxe : 59,hitboxys : -50, hitboxye : 10, hitboxxouv : 32, blood_height : 0, landinglag : 6, blockstun : 12, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
subzero_coups.set("grab",{slag : 5, fdur : 3, elag : 12, degats : 16, hitstun : 60, hurtx : 3, hurty : 6, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
subzero_coups.set("slide",{slag : 10, fdur : 20, elag : 7, degats : 10, hitstun : 60, hurtx : 5, hurty : 8, hitboxxs : 20, hitboxxe : 46,hitboxys : -20, hitboxye : -1, hitboxxouv : 20, blood_height : -5, blockstun : 10, blockx : 1.7, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 9, hitsound : "mhit", blood : "mblood", damageonblock : 2, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
subzero_coups.set("iceball",{slag : 13, fdur : 0, elag : 31, degats : 0, comboscaling : 0.2, hitstun : 60, hurtx : 0, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 0.3, hiteffect : "freeze", hitboxxeyscaling : 0, hitlag : 7, hitsound : "freeze", blood : "electrocute", damageonblock : 0,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
subzero_coups.set("iceflask",{slag : 21, fdur : 0, elag : 0, degats : 0, hitstun : 60, hurtx : 0, hurty : 3.5, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 0.3, hiteffect : "iceflask", hitboxxeyscaling : 0, hitlag : 2, hitsound : "freeze", blood : "electrocute", damageonblock : 0,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
subzero_coups.set("icebody",{slag : 3, fdur : 15, elag : 15, degats : 0, hitstun : 60, hurtx : 0, hurty : 3.5, hitboxxs : -12, hitboxxe : -12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 0.3, hiteffect : "iceflask", hitboxxeyscaling : 0, hitlag : 2, hitsound : "freeze", blood : "electrocute", damageonblock : 0,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});

var subzero_combos = get_default_combos();
subzero_combos.set("huppercut","iceball");


var reptile_coups = new Map();
reptile_coups.set("lpunch",{slag : 8, fdur : 5, elag : 12, degats : 6, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 46,hitboxys : 1, hitboxye : 95, hitboxxouv : 19, blood_height : 10, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("hpunch",{slag : 14, fdur : 9, elag : 16, degats : 9, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 48, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("lkick",{slag : 10, fdur : 7, elag : 14, degats : 5, hitstun : 19, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 50, hitboxys : 0, hitboxye : 40, hitboxxouv : 11, blood_height : -5, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("mkick",{slag : 16, fdur : 11, elag : 16, degats : 10, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 49, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 5, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("hkick",{slag : 15, fdur : 8, elag : 18, degats : 15, hitstun : 45, hurtx : 3.5, hurty : 6.8, hitboxxs : 20, hitboxxe : 50, hitboxys : 1, hitboxye : 100, hitboxxouv : 30, blood_height : 8, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 2.4, coupwav : "coup"});
reptile_coups.set("clpunch",{slag : 8, fdur : 6, elag : 8, degats : 6, hitstun : 21, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 42,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("huppercut",{slag : 13, fdur : 10, elag : 27, degats : 20, hitstun : 60, hurtx : 3.18, hurty : 9.8, hitboxxs : 20, hitboxxe : 51, hitboxys : 1, hitboxye : 100, hitboxxouv : 15, blood_height : 0, blockstun : 16, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.03, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
reptile_coups.set("clkick",{slag : 8, fdur : 6, elag : 7, degats : 5, hitstun : 20, hurtx : 1.2, hurty : 0, hitboxxs : 10, hitboxxe : 47,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 10, blockx : 0.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("cmkick",{slag : 10, fdur : 6, elag : 12, degats : 8, hitstun : 22, hurtx : 1.5, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 12, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("jkick",{slag : 11, fdur : 25, elag : 4, degats : 10, hitstun : 38, hurtx : 3.2, hurty : 5, hitboxxs : 0, hitboxxe : 60,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
reptile_coups.set("jskick",{slag : 11, fdur : 15, elag : 7, degats : 11, hitstun : 30, hurtx : 0.8, hurty : 0, hitboxxs : 10, hitboxxe : 56,hitboxys : -20, hitboxye : 20, hitboxxouv : 12, blood_height : 0, landinglag : 8, blockstun : 10, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0.5, hitlag : 8, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
reptile_coups.set("jpunch",{slag : 8, fdur : 10, elag : 10, degats : 8, hitstun : 25, hurtx : 1.2, hurty : 0, hitboxxs : 40, hitboxxe : 59,hitboxys : -50, hitboxye : 10, hitboxxouv : 32, blood_height : 0, landinglag : 6, blockstun : 12, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
reptile_coups.set("grab",{slag : 6, fdur : 3, elag : 12, degats : 16, hitstun : 60, hurtx : 3, hurty : 6, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
reptile_coups.set("slide",{slag : 10, fdur : 20, elag : 8, degats : 10, hitstun : 60, hurtx : 5, hurty : 8, hitboxxs : 20, hitboxxe : 46,hitboxys : -20, hitboxye : -1, hitboxxouv : 20, blood_height : -5, blockstun : 10, blockx : 1.7, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 9, hitsound : "mhit", blood : "mblood", damageonblock : 2, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
reptile_coups.set("spit",{slag : 12, fdur : 0, elag : 28, degats : 8, hitstun : 22, hurtx : 1.3, hurty : 4., hitboxxs : -12, hitboxxe : 12,hitboxys : -6, hitboxye : 15, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 1.5, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "spithit", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "", movx : 0, coupwav : ""});
reptile_coups.set("charge_chargeball",{slag : 5, fdur : 0, elag : 5, degats : 8, hitstun : 22, hurtx : 1.3, hurty : 4., hitboxxs : -12, hitboxxe : 12,hitboxys : -6, hitboxye : 15, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 1.5, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "spithit", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : ""});
reptile_coups.set("chargeball",{slag : 15, fdur : 0, elag : 13, degats : 14, hitstun : 60, comboscaling : 0.1, hurtx : -2., hurty : 8., hitboxxs : -15, hitboxxe : 15,hitboxys : -15, hitboxye : 20, hitboxxouv : 5, blood_height : 0, blockstun : 16, blockx : 1., hiteffect : "unblockable_projectile_fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "explcrunch", blood : "lblood", damageonblock : 3,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
reptile_coups.set("bomb",{slag : 15, fdur : 0, elag : 15, degats : 9, hitstun : 27, comboscaling : 0.15, hurtx : 1.3, hurty : 9.5, hitboxxs : -12, hitboxxe : 12,hitboxys : -6, hitboxye : 15, hitboxxouv : 5, blood_height : 0, blockstun : 10, blockx : 1.5, hiteffect : "projectile_fall", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "teleport"});

var reptile_combos = get_default_combos();
reptile_combos.set("hkick","spit");
reptile_combos.set("huppercut","bomb");

var liukang_coups = new Map();
liukang_coups.set("lpunch",{slag : 4, fdur : 6, elag : 8, degats : 4, hitstun : 21, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 40,hitboxys : 1, hitboxye : 95, hitboxxouv : 18, blood_height : 10, blockstun : 9, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("hpunch",{slag : 9, fdur : 10, elag : 12, degats : 7, hitstun : 28, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 47, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 13, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("lkick",{slag : 8, fdur : 8, elag : 14, degats : 5, hitstun : 20, hurtx : 1.1, hurty : 0, hitboxxs : 18, hitboxxe : 52, hitboxys : 0, hitboxye : 40, hitboxxouv : 12, blood_height : -5, blockstun : 11, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("mkick",{slag : 14, fdur : 12, elag : 15, degats : 8, hitstun : 26, hurtx : 1.5, hurty : 0, hitboxxs : 18, hitboxxe : 51, hitboxys : 1, hitboxye : 98, hitboxxouv : 24, blood_height : 5, blockstun : 13, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("hkick",{slag : 10, fdur : 7, elag : 16, degats : 12, hitstun : 38, hurtx : 3.3, hurty : 7, hitboxxs : 20, hitboxxe : 45, hitboxys : 1, hitboxye : 106, hitboxxouv : 30, blood_height : 8, blockstun : 15, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 10, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 2.3, coupwav : "coup"});
liukang_coups.set("clpunch",{slag : 6, fdur : 6, elag : 8, degats : 3, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 42,hitboxys : -1, hitboxye : -1, hitboxxouv : 14, blood_height : 0, blockstun : 9, blockx : 1.3, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("huppercut",{slag : 10, fdur : 10, elag : 25, degats : 15, hitstun : 60, hurtx : 3.2, hurty : 11, hitboxxs : 20, hitboxxe : 51, hitboxys : 1, hitboxye : 100, hitboxxouv : 15, blood_height : 0, blockstun : 15, blockx : 2.5, hiteffect : "fall", hitboxxeyscaling : 0.03, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "crouch", voiceline : "hmov", movx : 0, coupwav : "coup"});
liukang_coups.set("clkick",{slag : 5, fdur : 6, elag : 9, degats : 4, hitstun : 20, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -45, hitboxye : -20, hitboxxouv : 14, blood_height : 0, blockstun : 8, blockx : 0.8, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("cmkick",{slag : 9, fdur : 7, elag : 12, degats : 6, hitstun : 22, hurtx : 1, hurty : 0, hitboxxs : 10, hitboxxe : 45,hitboxys : -1, hitboxye : -20, hitboxxouv : 22, blood_height : 0, blockstun : 11, blockx : 1.9, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "crouch", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("jkick",{slag : 8, fdur : 25, elag : 4, degats : 9, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 9, blockx : 2.6, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
liukang_coups.set("jskick",{slag : 8, fdur : 25, elag : 4, degats : 9, hitstun : 35, hurtx : 3.4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : 0, landinglag : 8, blockstun : 9, blockx : 2.3, hiteffect : "fall", hitboxxeyscaling : -1, hitlag : 8, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
liukang_coups.set("jpunch",{slag : 5, fdur : 9, elag : 10, degats : 6, hitstun : 24, hurtx : 1.2, hurty : 0, hitboxxs : 40, hitboxxe : 59,hitboxys : -50, hitboxye : 10, hitboxxouv : 32, blood_height : 0, landinglag : 6, blockstun : 8, blockx : 3.0, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "air", voiceline : "mmov", movx : 0, coupwav : "coup"});
liukang_coups.set("grab",{slag : 4, fdur : 3, elag : 12, degats : 16, hitstun : 60, hurtx : 3.2, hurty : 6, hitboxxs : 5, hitboxxe : 38,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "grab", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
liukang_coups.set("flying_kick",{slag : 8, fdur : 18, elag : 12, degats : 9, hitstun : 35, hurtx : 4, hurty : 5, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : -20, landinglag : 8, blockstun : 8, blockx : 2.3, hiteffect : "fall", hitboxxeyscaling : -0.2, hitlag : 8, hitsound : "mhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : "coup"});
liukang_coups.set("fireball",{slag : 12, fdur : 0, elag : 30, degats : 6, hitstun : 17, hurtx : 1.1, hurty : 0, hitboxxs : -12, hitboxxe : 12,hitboxys : -8, hitboxye : 8, hitboxxouv : 5, blood_height : 0, blockstun : 8, blockx : 1.5, hiteffect : "projectile", hitboxxeyscaling : 0, hitlag : 7, hitsound : "lhit", blood : "lblood", damageonblock : 2,landinglag : 12, disponibility : "stand", voiceline : "mmov", movx : 0, coupwav : ""});
liukang_coups.set("bicycle",{slag : 8, fdur : 30, elag : 6, degats : 2, hitstun : 32, hurtx : 3, hurty : 0, hitboxxs : 0, hitboxxe : 56,hitboxys : -65, hitboxye : 5, hitboxxouv : 22, blood_height : -20, landinglag : 8, blockstun : 7, blockx : 2.3, hiteffect : "none", hitboxxeyscaling : -0.2, hitlag : 6, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "bullshit", movx : 0, coupwav : "coup"});
liukang_coups.set("cycle",{slag : 0, fdur : 0, elag : 27, degats : 0, hitstun : 0, hurtx : 0.9, hurty : 0, hitboxxs : 0, hitboxxe : 0,hitboxys : 0, hitboxye : -1, hitboxxouv : 15, blood_height : 0, blockstun : 12, blockx : 1.7, hiteffect : "", hitboxxeyscaling : 0, hitlag : 5, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});

var liukang_combos = get_default_combos();
liukang_combos.set("hkick","flying_kick");
liukang_combos.set("huppercut","fireball");
liukang_combos.set("bicycle","flying_kick")



var shao_coups = new Map();
shao_coups.set("lpunch",{slag : 9, fdur : 5, elag : 12, degats : 8, hitstun : 25, hurtx : 1.1, hurty : 0, hitboxxs : 15, hitboxxe : 48,hitboxys : 1, hitboxye : 95, hitboxxouv : 19, blood_height : 10, blockstun : 12, blockx : 1.7, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 6, hitsound : "lhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
shao_coups.set("hpunch",{slag : 14, fdur : 9, elag : 16, degats : 12, hitstun : 32, hurtx : 1.3, hurty : 0, hitboxxs : 11, hitboxxe : 52, hitboxys : 0, hitboxye : 82, hitboxxouv : 21, blood_height : 0, blockstun : 14, blockx : 2.5, hiteffect : "none", hitboxxeyscaling : 0, hitlag : 8, hitsound : "mhit", blood : "lblood", damageonblock : 1, disponibility : "stand", voiceline : "lmov", movx : 0, coupwav : "coup"});
shao_coups.set("hkick",{slag : 18, fdur : 8, elag : 18, degats : 19, hitstun : 90, hurtx : 4, hurty : 8.5, hitboxxs : 20, hitboxxe : 50, hitboxys : 1, hitboxye : 100, hitboxxouv : 30, blood_height : 8, blockstun : 16, blockx : 3.3, hiteffect : "fall", hitboxxeyscaling : 0, hitlag : 12, hitsound : "hhit", blood : "mblood", damageonblock : 1, disponibility : "stand", voiceline : "hmov", movx : 3, coupwav : "coup"});
shao_coups.set("charge",{slag : 12, fdur : 20, elag : 7, degats : 12, hitstun : 60, hurtx : 5.2, hurty : 8, hitboxxs : 20, hitboxxe : 46,hitboxys : 0, hitboxye : 90, hitboxxouv : 40, blood_height : -5, blockstun : 35, blockx : 1, hiteffect : "guard_break", hitboxxeyscaling : 0, hitlag : 11, hitsound : "mhit", blood : "mblood", damageonblock : 4, disponibility : "stand", voiceline : "hmov", movx : 0, coupwav : "coup"});

var shao_combos = get_default_combos();
shao_combos.set("hkick","charge");


var movpriority = new Map(); 	//you can cancel a mov by a mov of priority stritcly superior
movpriority.set("",0);
movpriority.set("forward_dash",10);
movpriority.set("back_dash",10);
movpriority.set("run",10);
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
movpriority.set("hell_gates",70);
movpriority.set("spear_throw",70);
movpriority.set("leg_takedown",70);
movpriority.set("slide",70);
movpriority.set("iceball",70);
movpriority.set("iceflask",70);
movpriority.set("icebody",70);
movpriority.set("charge",70);
movpriority.set("flying_kick",70);
movpriority.set("fireball",70);
movpriority.set("bicycle",70);
movpriority.set("cycle",70);
movpriority.set("knifethrow",70);
movpriority.set("teleport_drop",70);
movpriority.set("spit",70);
movpriority.set("chargeball",70);
movpriority.set("charge_chargeball",70);
movpriority.set("bomb",70);
movpriority.set("air_dodge",100);
movpriority.set("landing_lag",100);
movpriority.set("jumpsquat",100);
movpriority.set("free_fall",100);
movpriority.set("grab",100);

var cd_dependance = new Map();
cd_dependance.set("",0);
cd_dependance.set("forward_dash",-1);
cd_dependance.set("back_dash",-1);
cd_dependance.set("run",-1);
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
cd_dependance.set("hell_gates",2);
cd_dependance.set("spear_throw",0);
cd_dependance.set("leg_takedown",3);
cd_dependance.set("airgrab",1);
cd_dependance.set("slide",1);
cd_dependance.set("iceball",0);
cd_dependance.set("iceflask",2);
cd_dependance.set("icebody",3);
cd_dependance.set("charge",1);
cd_dependance.set("flying_kick",1);
cd_dependance.set("fireball",0);
cd_dependance.set("bicycle",2);
cd_dependance.set("cycle",3);
cd_dependance.set("teleport_drop",3);
cd_dependance.set("ball",1);
cd_dependance.set("spit",2);
cd_dependance.set("bomb",3);
