var tutobasics = [
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lpunch"],["lpunch"]], aimoves : [],
        jumper : 0,
        msg : "Pressing punch and no direction will do a light punch (or lpunch), try to hit the ennemy with it"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,15], moves : [["lpunch"],["lpunch"]], aimoves : [],
        jumper : 0,
        msg : "Light punches are very fast but have a very short range, try to hit the ennemy again, but this time he will defend himself"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["lkick"],["lkick"]], aimoves : [],
        jumper : 0,
        msg : "Similarly, light kicks are done by pressing kick and no direction"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [20,15], moves : [["lkick"],["lpunch"]], aimoves : [],
        jumper : 0,
        msg : "Light kicks are a bit slower than light punches but have a bit more range"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,15], moves : [["hpunch"],["lpunch"]], aimoves : [],
        jumper : 0,
        msg : "Heavy punches are done by pressing punch and either back or forward, they are mostly used in combos, which you will learn later"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,15], moves : [["mkick"],["jump", "jpunch"]], aimoves : [],
        jumper : 70,
        msg : "Heavy kicks are done by pressing back and kick, they can be used as a pretty safe anti air"
    },
    {
        char : ["raiden","raiden"], ai : -1, pv : [20,25], moves : [["hkick"],["lpunch"]], aimoves : [],
        jumper : 0,
        msg : "Roundhouses are powerful kicks that are performed by pressing forward and kick"
    },
    {
        char : ["raiden","raiden"], ai : 1, pv : [20,25], moves : [["hkick"],["jump","jpunch"]], aimoves : [],
        jumper : 50,
        msg : "Roundhouses are a very good anti air"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [20,25], moves : [["hkick"],["lpunch"]], aimoves : [],
        jumper : 0,
        msg : "Roundhouses also easily outrange light moves, try to use this to defeat your ennemy"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [30,15], moves : [["block","lpunch", "lkick"],["hkick"]], aimoves : [],
        jumper : 0,
        msg : "But roundhouses are quite unsafe against blocking, which is performed by holding back"
    },
    {
        char : ["raiden","raiden"], ai : 2, pv : [30,20], moves : [["hkick","grab"],["block"]], aimoves : [],
        jumper : 0,
        msg : "However, blocking is beaten by grabs, performed with the grab button"
    },
    {
        char : ["raiden","raiden"], ai : 0, pv : [80,60], moves : [["lpunch", "lkick", "hpunch", "mkick","hkick","grab", "block"],["lpunch", "lkick", "hpunch", "mkick","hkick","grab", "block", "jump"]], aimoves : [],
        jumper : 5,
        msg : "You now know the very basic of kombat, here is your final challenge!"
    },
]