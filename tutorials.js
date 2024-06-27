var tutobasics = [
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lpunch"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Pressing punch and no direction will do a light punch (or lpunch), try to hit the ennemy with it"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,15], moves : [["lpunch"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Light punches are very fast but have a very short range, try to hit the ennemy again, but this time he will defend himself"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lkick"],["lkick"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Similarly, light kicks are done by pressing kick and no direction"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [20,15], moves : [["lkick"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Light kicks are a bit slower than light punches but have a bit more range"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["hpunch"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Heavy punches are done by pressing punch and either back or forward, they are mostly used in combos, which you will learn later"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,15], moves : [["mkick"],["jump", "jpunch"]], aimoves : [],
        jumper : 70, regenerate : false,
        msg : "Heavy kicks are done by pressing back and kick, they can be used as a pretty safe anti air"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,25], moves : [["hkick"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Roundhouses are powerful kicks that are performed by pressing forward and kick"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [20,25], moves : [["hkick"],["jump","jpunch"]], aimoves : [],
        jumper : 50, regenerate : false,
        msg : "Roundhouses are a very good anti air"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,25], moves : [["hkick"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Roundhouses also easily outrange light moves, try to use this to defeat your ennemy"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [30,15], moves : [["block","lpunch", "lkick"],["hkick"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "But roundhouses are quite unsafe against blocking, which is performed by holding back"
    },
    {
        char : ["raiden","raiden"], ai : 2, pv : [30,20], moves : [["hkick","grab"],["block"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "However, blocking is beaten by grabs, performed with the grab button"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [80,60], moves : [["lpunch", "lkick", "hpunch", "mkick","hkick","grab", "block"],["lpunch", "lkick", "hpunch", "mkick","hkick","grab", "block", "jump"]], aimoves : [],
        jumper : 5, regenerate : false,
        msg : "You now know the very basic of kombat, here is your final challenge!"
    },
]

var tutocrouch = [
    {
        char : ["kitana","kitana"], ai : -1, pv : [20,15], moves : [["clpunch", "crouch"],["clpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Pressing punch and down with no direction will do a light punch (or clpunch), try to hit the ennemy with it"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,15], moves : [["clpunch", "crouch", "block"],["hkick"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "By crouching, you will also not get hit by high moves, as long as you dont try to block them, use this to beat your ennemy"
    },
    {
        char : ["kitana","kitana"], ai : 2, pv : [20,15], moves : [["clpunch", "crouch","hkick", "block"],["block"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Moreover, crouching moves can't be blocked high, they have to be blocked low! Be aware though that jump attacks can't be blocked low"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,15], moves : [["clkick", "crouch", "block"],["clpunch","crouch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Pressing kick and down with no direction will do a crouching light kick (or clkick), which has similar properties to a standing light kick"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,15], moves : [["cmkick", "crouch", "block"],["clpunch","crouch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Pressing kick and down and either back or forward will do a crouching heavy kick (or chkick), which is a stronger but slower crouching light kick"
    },
    {
        char : ["kitana","kitana"], ai : -1, pv : [20,22], moves : [["huppercut", "crouch", "block"],["clpunch","crouch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Pressing punch and down and either back or forward will do an huppercut, which is every characters's most powerful move!"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,22], moves : [["huppercut", "crouch", "block"],["jump","jkick"]], aimoves : [],
        jumper : 60, regenerate : false,
        msg : "Huppercuts are an amazing anti air"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [80,70], moves : [["huppercut", "crouch", "block", "clpunch", "clkick", "cmkick"],["jump","jkick", "crouch", "block", "clpunch", "clkick", "cmkick", "hkick"]], aimoves : [],
        jumper : 5, regenerate : false,
        msg : "You now know the basics of crouching, here is you final challenge!"
    },
]

var tutojump = [
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,20], moves : [["jkick", "jskick", "jump"],["clpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "You can jump by pressing the jump button, once in the air, press kick to do your jump kick (or jkick). Pressing the jump button very briefly or pressing jump and down will perform a short hop"
    },
    {
        char : ["scorpion","scorpion"], ai : 0, pv : [20,20], moves : [["jpunch", "jump"],["lkick", "lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Jump punches (jpunch) are performed similarly, but have a less generous hitbox, they can be used as a combo starter"
    },
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,20], moves : [["jskick", "jump"],["lkick", "lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Jump standing kicks (jskick) can only be performed if you have zero momentum in the air"
    },
    {
        char : ["scorpion","scorpion"], ai : 1, pv : [20,20], moves : [["jkick", "jump", "block"],["jkick", "jump", "block"]], aimoves : [],
        jumper : 30, regenerate : false,
        msg : "Jump kicks have a triangle hitbox, which means if 2 characters use their jkick, the one above the other will win"
    },
    {
        char : ["scorpion","scorpion"], ai : 0, pv : [80,70], moves : [["jkick", "jpunch", "jskick", "jump", "block"],["jkick", "jpunch", "jskick", "jump", "block", "lpunch", "lkick", "mkick"]], aimoves : [],
        jumper : 10, regenerate : false,
        msg : "You now know the basics of jump attacks, here is your final challenge!"
    },
]

var tutospecial = [
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,20], moves : [["elecgrab"],["clpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Special moves are all done with the special button, try to use raiden's neutral special by pressing special and no direction"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,20], moves : [["thundergod", "block"],["lpunch", "lkick", "mkick", "mpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "As you can see, special moves have a cooldown after being used. Now, try to use raiden's forward special by pressing special and forward"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,20], moves : [["boltthrow", "block"],["lpunch", "lkick", "mkick", "mpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Now, try to use raiden's back special by pressing special and back"
    },
    {
        char : ["scorpion","raiden"], ai : 0, pv : [20,20], moves : [["leg_takedown", "crouch", "block"],["lpunch", "lkick", "mkick", "mpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Since raiden's down special doesn't do damage, you will use scorpion's down special by pressing special and down"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,22], moves : [["hkick", "thundergod"],["jump","jkick"]], aimoves : [],
        jumper : 0, regenerate : true,
        msg : "You can cancel normal moves into special moves. Try to cancel raiden's roundhouse into his thundergod for a simple combo"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [80,80], moves : [["elecgrab", "thundergod", "boltthrow", "teleport", "crouch", "block", "jump"],["elecgrab", "thundergod", "boltthrow", "teleport", "crouch", "block", "jump"]], aimoves : [],
        jumper : 2, regenerate : false,
        msg : "You now know the basics of special moves, here is your final challenge! consider beating the arcade mode in easy after this!"
    },
]

var tutocombo = [
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lpunch", "hpunch"],["clpunch"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "You can cancel a light punch into a heavy punch to do a combo, do it!"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,25], moves : [["hkick", "hpunch"],["clpunch"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Indeed, you can cancel light moves into heavy moves then into launchers (ie roundhouses and huppercuts) and finally into specials. Try cancelling your hpunch into a roundhouse for example"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,29], moves : [["lpunch", "hkick", "hpunch"],["clpunch"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Ok now cancel your lpunch into your hpunch into your roundhouse"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [30,15], moves : [["lpunch", "hpunch", "block"],["jump", "lpunch", "jpunch"]], aimoves : [],
        jumper : 4,  regenerate : true,
        msg : "Now, try to do the lpunch to hpunch combo against a real opponent"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,22], moves : [["clpunch", "crouch", "huppercut"],["clpunch"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "This way of comboing also works when you crouch, try to combo your clpunch into your huppercut for example"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [80,22], moves : [["clpunch", "crouch", "huppercut"],["hkick", "crouch", "block"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "This is a very good way of punishing a missed roundhouse for example"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,27], moves : [["lpunch", "hkick", "jpunch", "jump"],["clpunch"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "You can also combo from a jpunch on a grounded opponent. Into a lpunch then into a hkick for example"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [50,20], moves : [["huppercut", "crouch", "block", "clpunch", "clkick", "cmkick", "lpunch", "lkick", "hpunch", "mkick", "hkick", "jump", "jpunch"],["jump","jkick", "lpunch", "lkick"]], aimoves : [],
        jumper : 2, regenerate : true,
        msg : "Here is your final challenge : do any 20 damage combo against a real opponent"
    },
]


var tutolineslist = [tutobasics, tutocrouch, tutojump, tutospecial, tutocombo];
