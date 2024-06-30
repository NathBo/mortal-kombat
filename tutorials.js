var tutobasics = [
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lpunch"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Pressing punch (by default B) and no direction will do a light punch (or lpunch), try to hit the ennemy with it"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,15], moves : [["lpunch"],["lpunch"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Light punches are very fast but have a very short range, try to hit the ennemy again, but this time he will defend himself"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lkick"],["lkick"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Similarly, light kicks are done by pressing kick (by default N) and no direction"
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
        msg : "However, blocking is beaten by grabs, performed with the grab button (H by default)"
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
        msg : "You can jump by pressing the jump button (by default J), once in the air, press kick to do your jump kick (or jkick). Pressing the jump button very briefly or pressing jump and down will perform a short hop"
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
        msg : "You now know the basics of special moves, here is your final challenge! Consider beating the arcade mode in easy after this!"
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


var tutoraiden = [
    {
        char : ["raiden","raiden"], ai : 2, pv : [20,20], moves : [["elecgrab", "hkick"],["block"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Raiden is an all-around fighter, that specializes in punishing opponents mistakes and launching them to the corner. Let's start with Raiden's neutral special, which is a command grab which moves him a bit forward, it beats block"
    },
    {
        char : ["raiden","raiden"], ai : 2, pv : [20,20], moves : [["thundergod"],["jump","block"]], aimoves : [],
        jumper : 60,  regenerate : false,
        msg : "Raiden's forward special is a giant dash, it is quite effective at punishing jumping opponents or as a surprise. It is also quite hard to punish"
    },
    {
        char : ["raiden","raiden"], ai : 2, pv : [20,20], moves : [["boltthrow", "block"],["hkick"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Raiden's back special is a simple but quite fast projectile. It can be used to stop opponents approaches but its long cooldown stops raiden from becoming a zoner"
    },
    {
        char : ["raiden","kitana"], ai : 2, pv : [8,5], moves : [["teleport", "lpunch"],["fanthrow"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Raiden's down special is a teleport. Use this to punish kitana's fan throws and punch her in the face"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,29], moves : [["thundergod", "huppercut", "crouch"],[""]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Raiden's forward special is a good combo ender. Use it after an huppercut to do a simple but damaging combo"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,35], moves : [["teleport", "huppercut", "crouch"],[""]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Raiden's down special is a good combo extender. Use it after an huppercut to combo into an other huppercut!"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,45], moves : [["thundergod", "huppercut", "crouch", "teleport"],[""]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Now for the big juicy combo, combo an huppercut into the teleport into an other uppercut into your forward special"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [25,29], moves : [["thundergod", "huppercut", "crouch", "teleport", "block"],["jump", "hkick"]], aimoves : [],
        jumper : 4,  regenerate : true,
        msg : "Now try to hit one of this combos against a real opponent"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [95,95], moves : [["elecgrab", "thundergod", "boltthrow", "teleport", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"],
        ["elecgrab", "thundergod", "boltthrow", "teleport", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"]], aimoves : [],
        jumper : 2, regenerate : false,
        msg : "You now know the basics of Raiden, here is your final challenge! Consider beating the arcade mode in normal with raiden after this!"
    },
]


var tutokitana = [
    {
        char : ["kitana","kitana"], ai : -1, pv : [20,20], moves : [["fanthrow"],["block"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Kitana is a turtle character, her projectiles makes opponents want to approach her, but she then has good defensive tools to keep them away. Let's start with Kitana's neutral special, which is a projectile with very low cooldown, making her a good zoner"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,20], moves : [["fanthrow", "jump"],["jump"]], aimoves : [],
        jumper : 80,  regenerate : false,
        msg : "It can also be performed in the air"
    },
    {
        char : ["kitana","kitana"], ai : 1, pv : [50,35], moves : [["fanswipe", "block"],["hkick", "block"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Kitana's forward special is a sweep that outranges most other moves, making her difficult to approach from the ground"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,20], moves : [["fanlift", "block"],["jump", "jkick"]], aimoves : [],
        jumper : 80,  regenerate : false,
        msg : "Kitana's back special is a projectile that goes up and allow for a free punish once it hits, making her quite difficult to approach from the air"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,20], moves : [["squarepunch", "block"],["jump", "jkick"]], aimoves : [],
        jumper : 100,  regenerate : false,
        msg : "Kitana's down special is her only move that helps her get out of the corner, and it does a pretty terrible job at it, making her quite vulnerable once cornered. It is still invulnerable on frame 1 though, and can be used as an anti air"
    },
    {
        char : ["kitana","kitana"], ai : -1, pv : [20,20], moves : [["fanlift", "hkick"],["jump", "jkick"]], aimoves : [],
        jumper : 100,  regenerate : true,
        msg : "Kitana's back special can be comboed into from a launcher (a roundhouse from example)"
    },
    {
        char : ["kitana","kitana"], ai : -1, pv : [20,35], moves : [["fanlift", "hkick"],["jump", "jkick"]], aimoves : [],
        jumper : 100,  regenerate : true,
        msg : "You can then follow it up with an other roundhouse"
    },
    {
        char : ["kitana","kitana"], ai : -1, pv : [20,42], moves : [["fanlift", "hkick", "squarepunch"],["jump", "jkick"]], aimoves : [],
        jumper : 100,  regenerate : true,
        msg : "And then follow with a down special"
    },
    {
        char : ["kitana","kitana"], ai : 0, pv : [20,28], moves : [["fanlift", "hkick", "squarepunch"],["jump", "jkick", "lkick", "hkick"]], aimoves : [],
        jumper : 20,  regenerate : true,
        msg : "Now, try this combo against a real opponent"
    },
    {
        char : ["kitana","kitana"], ai : 1, pv : [100,100], moves : [["fanthrow", "fanlift", "fanswipe", "squarepunch", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"],
        ["fanthrow", "fanlift", "fanswipe", "squarepunch", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"]], aimoves : [],
        jumper : 2, regenerate : false,
        msg : "You now know the basics of Kitana, here is your final challenge! Consider beating the arcade mode in normal with Kitana after this!"
    },
]

var tutoscorpion = [
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,10], moves : [["spear_throw"],["block"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Scorpion is an agressive character with very fast moves but slow movement. Let's start with his neutral special, which is a grappling spear that gives him a free follow-up"
    },
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,20], moves : [["spear_throw", "huppercut", "crouch"],["block"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "For example, you can chain this grapple into an huppercut"
    },
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,20], moves : [["hell_gates", "jpunch", "jkick"],["block"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "His back special, hell gates, lets him teleport from one side of the screen to the other. He can use this to surprise opponents with an aerial attack"
    },
    {
        char : ["scorpion","scorpion"], ai : 0, pv : [30,20], moves : [["airgrab", "jump"],["jump", "jkick"]], aimoves : [],
        jumper : 30,  regenerate : false,
        msg : "Scorpion's air special is an airgrab"
    },
    {
        char : ["scorpion","scorpion"], ai : 0, pv : [20,20], moves : [["leg_takedown", "crouch"],["hkick"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "His down special, leg takedown, can be used to hit opponents low and get a mixup afterwards"
    },
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,19], moves : [["leg_takedown", "clkick", "cmkick", "crouch"],["hkick"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "It is also a very good low combo ender. Try comboing you crouch light kick into you crouch heavy kick into leg takedown"
    },
    {
        char : ["scorpion","scorpion"], ai : -1, pv : [20,30], moves : [["spear_throw", "huppercut", "crouch"],["block"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Now an other combo, try comboing your huppercut into a spear throw into an other huppercut"
    },
    {
        char : ["scorpion","scorpion"], ai : 0, pv : [50,30], moves : [["spear_throw", "huppercut", "crouch"],["jump", "crouch", "block", "jkick", "lpunch", "clkick"]], aimoves : [],
        jumper : 10,  regenerate : true,
        msg : "Now try that combo against a real opponent"
    },
    {
        char : ["scorpion","scorpion"], ai : 1, pv : [100,100], moves : [["spear_throw", "hell_gates", "leg_takedown", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"],
        ["spear_throw", "hell_gates", "leg_takedown", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"]], aimoves : [],
        jumper : 2, regenerate : false,
        msg : "You now know the basics of Scorpion, here is your final challenge! Consider beating the arcade mode in normal with Scorpion after this!"
    },
]

var tutosubzero = [
    {
        char : ["subzero","subzero"], ai : -1, pv : [20,20], moves : [["slide"],["block"]], aimoves : [],
        jumper : 0,  regenerate : false,
        msg : "Subzero is a trap character with powerful combos, but he can have a hard time creating openings for himself. Let's start with his forward special, which is a slide that hits low"
    },
    {
        char : ["subzero","subzero"], ai : -1, pv : [20,15], moves : [["slide", "lpunch"],["block"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "You can actually combo this into a light punch it you hit the move at the end of its duration"
    },
    {
        char : ["subzero","subzero"], ai : -1, pv : [20,28], moves : [["slide", "lpunch", "hkick"],["block"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "You can even extend the combo into an hkick"
    },
    {
        char : ["subzero","subzero"], ai : -1, pv : [20,25], moves : [["huppercut", "crouch", "iceball"],["block"]], aimoves : [],
        jumper : 0,  regenerate : true,
        msg : "Subzero's neutral special is an iceball, which is very good for combos. try to combo an huppercut into an iceball into an other huppercut"
    },
    {
        char : ["subzero","subzero"], ai : 0, pv : [20,25], moves : [["huppercut", "crouch", "iceball"],["jump", "crouch", "block", "jkick", "lpunch", "clkick"]], aimoves : [],
        jumper : 10,  regenerate : true,
        msg : "Now, try this combo against a real opponent"
    },
    {
        char : ["subzero","subzero"], ai : 2, pv : [20,10], moves : [["iceflask", "crouch", "clkick", "clpunch", "grab", "hkick"],["crouch", "block"]], aimoves : [],
        jumper : 10,  regenerate : false,
        msg : "Subzero's back special creates an iceflask that makes opponents trip on them, even if they block, though they are invulnerable during the tripping. Try to open up the opponent with this move"
    },
    {
        char : ["subzero","subzero"], ai : 2, pv : [30,15], moves : [["jump" ,"icebody","lpunch", "lkick"],["hkick"]], aimoves : [],
        jumper : 0, regenerate : false,
        msg : "Subzero's down special is a parry that freezes opponents who try to attack him"
    },
    {
        char : ["subzero","subzero"], ai : 1, pv : [100,100], moves : [["iceball", "iceflask", "slide", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"],
        ["iceball", "iceflask", "slide", "crouch", "block", "jump", "lpunch", "lkick", "hpunch", "hkick", "mkick", "jpunch", "jkick", "jskick", "clpunch", "clkick", "cmkick", "huppercut"]], aimoves : [],
        jumper : 2, regenerate : false,
        msg : "You now know the basics of Subzero, here is your final challenge! Consider beating the arcade mode in normal with Subzero after this!"
    },
]




var tutolineslist = [tutobasics, tutocrouch, tutojump, tutospecial, tutocombo, tutoraiden, tutokitana, tutoscorpion, tutosubzero];
