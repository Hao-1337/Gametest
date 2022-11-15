/*
==========================================================================================================================================================

  + main.js for choigame api
  + @version v7.16.2 - MCBE 1.19.30
  + @script_version beta-1.0.0 - some method is old (just lazy)
  + @athour ChoiGame123 (dis: Choigame 123 #5666)
  + @dependent ChoigameRP - v2.0.3
  + @helper nope
  + @special_thank Nguyễn Vương (dis: NSNguyenVuong #2303)
  + Discord link: <a herf="https://discord.gg/2dnE2uT49r"></a>

==========================================================================================================================================================

  + Aliable Function: Chat Rank, Privated Chat, Chest Form (97% complete & 80% optimize(ing)), UI form shop (30% complete),
                      World Edit(in dev, 100% basic function done, 47% optimize), Custom Command (93% complete(just kidding))
                      And more function for work
  + File path for node: /storage/emulated/0/Android/data/com.mojang.minecraftpe/files/games/com.mojang/minecraftWorlds/new\ api/behavior_packs/ChoigameBP/scripts

  oh shit runCommand no longer aliable also statusMessage will be gone

==========================================================================================================================================================
*/
import {
    system,
    world,
    Entity,
    Player,
    Items,
    ItemStack,
    MinecraftItemTypes,
    Location,
    BlockLocation,
    EffectType,
    MinecraftEffectTypes,
    MinecraftEnchantmentTypes
} from "mojang-minecraft";
import {
    ActionFormData,
    ModalFormData,
    MessageFormData
} from "mojang-minecraft-ui";
import {
    SimulatedPlayer,
    Test,
    register
} from "mojang-gametest"

import {
    config,
    onHack
} from "./config.js";

/**Value declaration*/
const watchdogtime = Date.now(),
    sound = {
        successful: "note.bell",
        failed: "mob.blaze.hit"
    },
    numFormat = [{
            value: 1e9,
            symbol: "B"
        },
        {
            value: 1e6,
            symbol: "M"
        },
        {
            value: 1e3,
            symbol: "K"
        },
        {
            value: 1,
            symbol: ""
        }
    ],
    TICK = new Map(),
    LOOP = new Map(),
    COMMANDS = [],
    CMD_ALIAS = {},
    CMD_NAME = [],
    EVENTS = world.events,
    reach_limits = 7,
    MinecraftEnchantments = Object.values(MinecraftEnchantmentTypes);
let LocationLog = {},
    chestGUILog = false,
    config_bool = config.config_bool,
    containerPage = [],
    containerFunction = [],
    callBackPage = [],
    LBTopLimit = config.LBTopLimit,
    LBUpdateDelay = config.LBUpdateDelay,
    LBInfoText = config.LBInfoText,
    show_time = config.show_time,
    chat_rank_bool = config.chat_rank_bool,
    chat_region_bool = config.chat_region_bool,
    byPassTag = config.byPassTag,
    admin_tag = config.admin_tag,
    stuff_tag = config.stuff_tag,
    chat_rank_tag_prefix = config.chat_rank_tag_prefix,
    chat_region_tag_prefix = config.chat_region_tag_prefix,
    chat_region_prefix = config.chat_region_prefix,
    chat_cooldown = config.timeCD,
    first_rank = config.first_rank,
    multirankSign = config.multirankSign,
    cmd_arr_i = 0,
    command_prefix = config.command_prefix ?? "!",
    CHAT_CD_LOG = {},
    money_objectives = config.money_objectives,
    TEAMS = [],
    b_counter = 0,
    counter = 0,
    TABLE = [],
    player_log = undefined,
    debug = config.debug,
    world_edit_log = config.world_edit_log,
    structure_size = config.structure_size,
    fill_size = config.fill_size,
    world_edit_rom = {},
    console_error_handle = config.console_error_handle,
    world_edit_item = config.world_edit_item,
    world_edit_rom_length = config.world_edit_rom_length;

/**Setup*/
[...world.getDimension("overworld")
.getEntities({type: "choigame:inventory", tags: ["isChestGui"]})]
.forEach(v1 => {
    v1.triggerEvent("before_die");
    v1.triggerEvent("die");
    });

/**
 * String prototype split, use for command arguments split (unaffected by spaces)
 * @return Array<Object>
 */
String.prototype.splitArgument=function(t){if(!t||!(t instanceof Player))throw SyntaxError("Input param must be player for prasing");let e=[],r=[],a=!1,n,s=0;function i(t,e=!0){try{if(e)return Array.isArray(JSON.parse(t.replace(/['`]/g,'"')));return JSON.parse(t.replace(/['`]/g,'"'))}catch(r){return!1}}function o(t,e=!0){try{if(e)return JSON.parse(t.replace(/['`]/g,'"')) instanceof Object;return JSON.parse(t.replace(/['`]/g,'"'))}catch(r){return!1}}async function c(e,r=!1){let a=(Date.now()*Math.random()/1e5).toFixed(6),n;return r?getPlayerFromName(e):(await t.runCommandAsync(`tag ${e} add test:${a}`).catch(t=>0).then(t=>t&&(n=[...world.getDimension("minecraft:overworld").getEntities({tags:[`test:${a}`]})])),n?.forEach(t=>t.removeTag(`test:${a}`)),n?n:[])}if(this.split("").reduce((t,i,o,c)=>{try{if(" "===c[o+1]&&" "===i||" "===t&&" "===i)return i;if(r[s]||(r[s]=[]),r[s].push(c[o]),!a&&0===e.length&&" "===i)return s++,i;if(!a&&("["===i&&e.push("]"),"{"===i&&e.push("}"),'"'===i))return e.push('"'),a=!0,i;if(0!==e.length||a||"]"!==i&&"}"!==i&&'"'!==i||(n=`Invalid object - Redundant '${i}'`),a)return'"'===i&&(a=!1,e.pop()),i;return e.length>=1&&e[e.length-1]===i&&e.pop(),i}catch(p){console.warn(p,p.stack)}},this[0]),r=r.map(t=>t.join("").trim()).map(t=>t.startsWith('"')&&t.endsWith('"')?(t=t.slice(1)).slice(0,t.length-1):t),e.length>=1)return{error:!0,data:`Invalid object - Missing '${e[e.length-1]}`};if(n)return{error:!0,data:n};let p=r.map(e=>(function e(r){var a;let n=`${r.trim()}`.match(/(\-\d+\.\d+)|(\d+\.\d+)|(\-\d+)|(\d+)/gm),s=r.match(/([\^\~](?:[+-]?(?:\d+(?:\.\d+)?)?)?){3}/gm),[p,l,d,u,g,h,m]=[n&&n[0]&&`${n[0]}`.length===r.length,s&&s[0]&&`${s[0]}`.length===r.length,"true"===r||"false"===r,r.match(/(@[asre]\[[\w\W]*?\])|(@[asre])/g),Array.from(world.getPlayers(),t=>t.name.toLowerCase()).some(t=>t===r.toLowerCase()),i(r),o(r)];return l?{type:["location"],data:parseLocation((a=r).match(/[^~]\d+(?:\.[\d+])?/gm),t)}:p?{type:["number","location"],data:+`${r}`}:g?{type:["selector"],data:c(r,!0)}:u?{type:["selector","string"],data:c(r)}:d?{type:["boolean"],data:"true"===r}:h?{type:["array"],data:i(r,!1)}:m?{type:["object"],data:o(r,!1)}:{type:["string"],data:r}})(e));return{error:!1,data:r,data_type:p.map(t=>t.type),parse_data:p.map(t=>t.data),selector:p.filter(t=>t.type.includes("selector"))}};
String.prototype.padStart=function(a,b){let c="",d=0; if (a <= 0) return b; for (d; d < a; d++) c+=" "; return c + b;}
String.prototype.firstUpperCase=function(){return this.slice(0,1). toUpperCase()+this.slice(1);}
Array.prototype.splice=function(){if("number"!=typeof arguments[0]||"number"!=typeof arguments[1]||"number"!=typeof arguments[2])throw SyntaxError("Undefined value at .splice");if(arguments[1]-1>arguments[0])throw SyntaxError("The delete number values is too big with this array");let[e,t,i]=[this.slice(0,arguments[0]+1-arguments[1]),function e(t){let i=[];for(let r=3;r<1/0&&t[r];r++)i.push(t[r]);return i||[]}(arguments),this.slice(arguments[0]+1,this.length)];return[e,t,i].flat(0===arguments[2]?1:arguments[2]+1)};
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
Array.prototype.megresplice = function () {
    let $shw = [];
    for (let $dje of this)
        if ($shw.includes($dje)) continue;
        else $shw.push($dje);
    return $shw;
};

/**Some stuff class, not builder class*/
class TickTimeOut {
    constructor(time = 10, func = () => {}) {
        this.name = "xxyyx".replace(/[xy]/g, (c) => {
            let r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
            return (c == 'x' ? r : (r & 3 | 8)).toString(16);
        });
        this.id = Date.now();
        this.time = time;
        this.function = func;
        TICK.set(this.name, () => {
            if (Date.now() - this.id > this.time) {
                this.canceled();
                this.function();
            }
        });
    };
    canceled() {
        TICK.delete(this.name);
    };
};
class TickLoop {
    constructor(
        loop_time = Infinity,
        step_time = 200,
        func = () => {},
        break_loop_condition = (v1, v2, v3) => false,
        break_loop_function = () => {},
        end_loop_function = () => {}
    ) {
        this.name = "xyxyy".replace(/[xy]/g, (c) => {
            let r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
            return (c == 'x' ? r : (r & 3 | 8)).toString(16);
        });
        this.id = Date.now();
        this.timer = this.id;
        this.loop_time = loop_time;
        this.step_time = step_time;
        this.run_function = func;
        this.break_condition = break_loop_condition;
        this.break_function = break_loop_function;
        this.end_function = end_loop_function;
        this.check_object_1 = arguments[6];
        this.check_object_2 = arguments[7];
        this.check_object_3 = arguments[8];
        LOOP.set(this.name, () => {
            try {
                if (this.break_condition(this.check_object_1, this.check_object_2, this.check_object_3)) {
                    this.remove();
                    return break_loop_function(this.check_object_1, this.check_object_2, this.check_object_3);
                }
                if (Date.now() - this.id > loop_time) {
                    this.remove();
                    return end_loop_function(this.check_object_1, this.check_object_2, this.check_object_3);
                }
                if (Date.now() - this.timer > this.step_time) {
                    this.timer = Date.now();
                    this.run_function(this.check_object_1, this.check_object_2, this.check_object_3);
                }
            } catch (e) {
                console.error(e, e.stack ?? "");
            }
        });
    };
    remove() {
        LOOP.delete(this.name);
    };
    static removeAll() {
        LOOP.clear();
    };
};
class onMove {
    constructor() {};
};


/**Stuff function*/
const forEachPlayers = func => [...world.getPlayers()].forEach(pl => func(pl)),
    getTPS = (toFixIndex = 2) => {
        let tps_m = 0;
        new TickTimeOut(1, ({
            deltaTime
        }) => {
            tps_m = (deltaTime / 1).toFixed(toFixIndex);
        });
        return tps_m;
    },
    getPlayerFromName = (name) => [...world.getPlayers({name: name})][0],
    getInventory = (entity) => {
        try {
            return entity.getComponent("minecraft:inventory").container;
        } catch (e) {
            return;
        }
    },
    getEnch = (item) => {
        try {
            return item.getComponent(`enchantments`);
        } catch (e) {
            return;
        }
    },
    getINVItems = (iv) => Array.from({
        length: iv.size
    }, (e, i) => iv.getItem(i)),
    enchCheck = (i, n, e) => !i.canAddEnchantment(n) && n.level != e.maxLevel,
    sameItemStackNoNBT = item => new ItemStack(Items.get(item.id), item.amount, item.data),
    getAllScore = (objectives) => world.scoreboard.getObjective(objectives)?.getParticipants()?.filter((v) => v.type === "player" || v.type === "entity")?.map(e => {
        return {
            entity: e.getEntity(),
            score: e.id,
            name: e.displayName
        };
    }),
    getScore = (entity, objectives) => {
        try {
            return world.scoreboard.getObjective(objectives)?.getScore(entity.scoreboard) ?? 0;
        } catch (e) {
            return 0;
        }
    },
    numFormatter = (num = 0, digits = 2) => {
        let INF = numFormat.find(v => num >= v.value);
        return INF ? `${(num / INF.value).toFixed(digits)/**.replace(/\.([0-9])*([1-9])/g, "$1")*/}${INF.symbol}` : 0;
    },
    runCommand = (command, selector, dim = "minecraft:overworld") => {
        try {
            let dimension = world.getDimension(dim);
            if (selector) return {
                error: false,
                statusMessage: selector.runCommand(command).statusMessage
            };
            return {
                error: false,
                statusMessage: dimension.runCommand(command).statusMessage
            };
        } catch (e) {
            return {
                error: true,
                statusMessage: `[runCommand]-§cError: ${e}`
            };
        }
    },
    getGamemode = (player) => {
        let [a, s, c] = ["a", "s", "c"].map((gm) => gm = runCommand(`testfor @s[m=${gm}]`, player).error);
        return (!a) ? 'adventure' : (!s) ? 'survival' : (!c) ? 'creative' : 'unknown';
    },
    setGamemode = (player, gamemode) => {
        if (gamemode === getGamemode(player)) return;
        const command = runCommand(`gamemode ${gamemode}`, player);
        if (command.error) return console.error("setGamemode Error: " + command.statusMessage);
    },
    damgeToForm = (player, form, callBack, failed_mess = "§4[Server.damgeToForm()] Failed to open form automatically, you can exit chat to continue") => {
        try {
            if (getGamemode(player) === 'creative') {
                setGamemode(player, 'survival');
                runCommand(`damage @s 0 entity_attack`, player);
                setGamemode(player, 'creative');
            } else {
                runCommand(`damage @s 0 entity_attack`, player);
            };
            new TickTimeOut(500, () => form.show(player).then(r => {
                if (r.canceled && r.cancelationReason === "userBusy") {
                    player.tell(failed_mess);
                    waitPlayerRotation(player).catch().then(v => {
                        if (v) form.show(player).then(v => v && callBack(v, player));
                    });
                    return;
                }
                return r;
            }).then(r => r && callBack(r, player)));
        } catch (e) {
            if (debug) console.warn(e, e.stack ?? "")
        }
    },
    UUIDGen = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (new Date().getTime() + Math.random() * 16) % 16 | 0;
        return (c == 'x' ? r : (r & 3 | 8)).toString(16);
    }),
    distance = (loc1, loc2) => {
        const x = [loc1.x, loc2.x].sort((a, b) => b - a),
            y = [loc1.y, loc2.y].sort((a, b) => b - a),
            z = [loc1.z, loc2.z].sort((a, b) => b - a);
        return {
            x: x[0] - x[1],
            y: y[0] - y[1],
            z: z[0] - z[1]
        };
    },
    velocity = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2),
    health = (player) => player.getComponent("minecraft:health").current,
    timeUpdate = (bool = false) => {
        const d = new Date(),
            addGMT = data => (data / 60) * -1;
        let [gmts, time, gmt] = [addGMT(d.getTimezoneOffset()), [d.getHours(), d.getMinutes(), d.getSeconds()].map(v => (v < 10) ? `0${v}` : v), ''];
        gmt = (gmts > 0) ? `+${gmts}` : gmts;
        /**change you time format here*/
        return (bool) ? `§b${gmt} §a${time.join('§f:§a')}§r` : `§8${time.join(':')}§r`;
    },
    isReach = (p1, p2) => (Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2 + (p1.z - p2.z) ** 2) > reach_limits),
    parseLocation = ([x, y, z], {
        location,
        viewVector
    }) => {
        if (!x || !y || !x) throw new SyntaxError("Undefined Input");
        const a = [x, y, z].map((arg) => {
            const r = parseInt(arg.replace(/\D/g, ""));
            return isNaN(r) ? 0 : r;
        });
        const b = [x, y, z].map((arg, index) => {
            return arg.includes("~") ? a[index] + location[index] : arg.includes("^") ? a[index] + viewVector[index] : a[index];
        });
        return new Location(b[0], b[1], b[2]);
    },
    comI = (it1, it2) => {
        try {
            if (`${it1} ${it2}`.match(/undefined|null/g)?.length === 1) return false;
            if (`${it1} ${it2}`.match(/undefined|null/g)?.length === 2) return true;

            function convertsToString(item) {
                let {
                    id,
                    name,
                    data
                } = item, lore = item.getLore();
                return [id, name, data, lore].flat(1).join("");
            }
            return `${convertsToString(it1)}` === `${convertsToString(it2)}`;
        } catch (e) {
            if (debug) console.warn(e, e.stack ?? "")
        }
    },
    tran = (obj) => {
        if (typeof obj != "object") return obj;
        const _a = Array.isArray(obj) ? [] : {};
        for (const k in obj) _a[k] = typeof obj == "object" ? tran(obj[k]) : obj[k];
        return _a;
    },
    toString = (obj) => JSON.stringify(tran(obj), void 0, 3),
    alignLeft = (string, length = 16) => {
        let out = string,
            length1 = string.replace(/§[0-9a-forlkg]/g, "");
        if (length1.length < length)
            for (var i = 0; i < length - string.length; i++) out += " ";
        out = string;
        return out;
    },
    textToBinary = text => text.split('').map(char => char.charCodeAt(0).toString(2)).join(' '),

    binaryToText = binary => binary.split(' ').map(char => String.fromCharCode(parseInt(char, 2))).join(''),
    clearChat = async (times = 60, player = {
        name: "Admin"
    }) => {
        for (let clc = 0; clc < times; clc++) await runCommand(`tellraw @a {"rawtext":[{"text":"§a"}]}`);
        runCommand(`tellraw @a {"rawtext":[{"text":"§aChat has been clear by§f:§e ${player.name}"}]}`);
    },
    getEntityTagByPrefix = (entity, prefix) => entity?.getTags().find(v => v.startsWith(prefix))?.replace(prefix, ""),
    getEntityTagByPrefixs = (entity, prefix) => entity?.getTags().filter(v => v.startsWith(prefix))?.map(v => v.replace(prefix, "")) ?? [],
    getAllLB = () => {
        return [...world.getDimension("overworld").getEntities({tag: ["is_leaderboard"], type: "choigame:floating_text"})];
    },
    getAllObjectiveName = () => {
        try {
            return world.scoreboard.getObjectives().map(v => v.id) ?? [];
        } catch (e) {
            return [];
        }
    };

function TeamChecker() {
    /*just test, very hard to combie with player json*/
    return;
    let allTeamID = [...world.getPlayers()].map(v => v.getTags().filter(v => v.match(/\[team:[\w\W]+?\]/g)[0])).megresplice(),
        teamBuild = allTeamID.map(id => [...world.getPlayers()].filter(v => {
            return v.hasTag(id);
        }));
    /**make team*/
    teamBuild.forEach((team, index) => {
        team.forEach(player => {
            player.getTags().filter(tag => tag.match(/team:[0-9]+?/g).length >= 1).forEach(tag => player.removeTag(tag));
            player.addTag(`team:${index}`);
        });
    });
};

function* round_loc_gen(loc) {
    if (!loc instanceof BlockLocation && !("x" in loc) && !("y" in loc) && !("z" in loc)) throw new SyntaxError(`Invalid input at arguments[0]`);
    else loc = new BlockLocation(loc.x, loc.y, loc.z);
    yield loc.offset(1, 1, 0);
    yield loc.offset(-1, 1, 0);
    yield loc.offset(0, 1, -1);
    yield loc.offset(0, 1, 1);
    yield loc.offset(-1, 1, 1);
    yield loc.offset(1, 1, -1);
    yield loc.offset(-1, 1, -1);
    yield loc.offset(0, 1, 0);
    yield loc.offset(1, 1, 1);
    yield loc.offset(1, 0, 0);
    yield loc.offset(-1, 0, 0);
    yield loc.offset(0, 0, -1);
    yield loc.offset(0, 0, 1);
    yield loc.offset(-1, 0, 1);
    yield loc.offset(1, 0, -1);
    yield loc.offset(-1, 0, -1);
    yield loc.offset(1, 0, 1);
    yield loc.offset(1, -1, 0);
    yield loc.offset(-1, -1, 0);
    yield loc.offset(0, -1, -1);
    yield loc.offset(0, -1, 1);
    yield loc.offset(-1, -1, 1);
    yield loc.offset(1, -1, -1);
    yield loc.offset(-1, -1, -1);
    yield loc.offset(0, -1, 0);
    yield loc.offset(1, -1, 1);
}
function* locGen(loc, igLoc) {
    loc = new BlockLocation(loc.x, loc.y, loc.z);
    for (let pos of round_lox_gen(loc)) if (!igLoc.some(pos1 => pos1.equal(pos))) yield pos;
}
function vein_mine(dimension, touch_loc, blockType, loc_ig = [], max_size = 60) {
    const locs = locGen(touch_loc, loc_ig);
    for (let loc of locs) {
        if (blockType.id === dimension.getBlock(loc).type.id) {
            b_counter++;
            vein_mine(dimension, loc, blockType, locs, max_size);
            /*break code*/
            runCommand(`setblock ${loc.x} ${loc.y} ${loc.z} air 0 destroy`);
        }
        if (b_counter >= max_size) {
            new TickTimeOut(400, () => b_counter = 0);
            break;
        }
    }
}

/**Asyn stuff function*/
const waitPlayerJoin = async (player) => await new Promise((resolve, reject) => {
        new TickLoop(
            18e4,
            300,
            () => {
                /**
                 *Loop function
                 *Also nothing here bc it just need break function
                 */
            },
            (player) => {
                try {
                    player.runCommand(`testfor @s`);
                    return true;
                } catch (e) {
                    return false;
                }
            },
            (player) => resolve(player),
            () => reject(`Player connection failed`),
            player
        );
    }).catch(err => {
        if (debug) console.warn(err, err.stack ?? "")
    }),
    runCommands = (commands, selector) => {
        /**in dev*/
        try {
            if (selector) commands.forEach(cmd => runCommand(cmd, selector));
            else commands.forEach(cmd => runCommand(cmd));
        } catch (e) {if (debug) console.warn(e, e.stack ?? "")}
    },
    waitPlayerRotation = async (player, wait_time = 20e4) => {
        const vv = player.viewVector;
        return await new Promise((reslove, reject) => {
            new TickLoop(
            wait_time,
            300,
            (pl) => {
                if (!player) reject(`Player Not Found`);
            },
            (player) => !vv.equals(player.viewVector),
            (player) => reslove(player),
            () => reject(`Wait time end`),
            player
            )
        });
    };

/**world.events*/
let tmd = 0;
EVENTS.tick.subscribe(data => {
    tmd++;
    if (tmd <= 1) return;
    tmd = 0;
    for (let [name, value] of TICK) value(data);
    for (let [name, value] of LOOP) value(data);
});
EVENTS.playerJoin.subscribe(({player}) => waitPlayerJoin(player).then(player => {
    console.warn(`§aPlayer ${player.name} joined`);
    const string = [
        "§a---------------------------------------------------------------------------------------",
        "",
        "§b§lWelcome To Server",
        "",
        "§aChoiGame API§e - §6v7.16.2§a MCBE§e - §6v1.19.31",
        "§2Made by:§6 Choigame123 §b(Choigame 123#5666)",
        "",
        "§a---------------------------------------------------------------------------------------",
        ].forEach(v => {
            const length = max_length - v.replace(/(§[0-9a-forlkgmn])|(\\[\w\d\S]+)/gm, "").length;
            if (length < 1) return player.tell(v);
            player.tell("".padStart(Math.floor((length / 2) * 1.45), " ") + v);
        });
    new ChestFormBuilder(player, 0);
}));
EVENTS.itemUseOn.subscribe(({source: player, blockLocation: location, item}) => {
    if (player.id !== "minecraft:player") return;
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!world_edit_rom[player.name].pos1 || !item || item?.id !== world_edit_item || !item.getLore() || item.getLore()[0] !== `§5Use for world edit`) return;
    world_edit_rom[player.name].pos2 = location;
    player.tell(`§4[World edit] §a You have set position 2 at:§e ${location.x} ${location.y} ${location.z}`);
});
EVENTS.blockBreak.subscribe(({player, block, brokenBlockPermutation}) => {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    let item = player.getComponent("minecraft:inventory").container.getItem(player.selectedSlot);
    if (!item || item?.id !== world_edit_item || !item.getLore() || item.getLore()[0] !== `§5Use for world edit`) return;
    block.setPermutation(brokenBlockPermutation);
    world_edit_rom[player.name].pos1 = block.location;
    player.tell(`§4[World edit] §a You have set position 1 at:§e ${block.location.x} ${block.location.y} ${block.location.z}`);
});

EVENTS.entityHurt.subscribe(({hurtEntity: player, damagingEntity: atacker, cause}) => {
    if (!atacker && cause === "fall") {
        //runCommand here
    }
})
EVENTS.beforeItemUse.subscribe(data => {
    let {
        source: player,
        item
    } = data;
    if (item.id === "choigame123:ui_open") {
        data.cancel = true;
    new ActionFormData()
    .title('§l§b§k||§r  §l§aShop  §b§k||')
    .button('§aNatural Block')
    .button('§aNatural Item')
    .button('§bBuilding Block')
    .button('§bTool & Armor')
    .button('§aPotion')
    .button('§aMiscellaneous')
    .button('§aPlugins')
    .show(player)
    .then(v => main_shop_ui_open(v, player));
    }
});
EVENTS.beforeChat.subscribe(data => {
    data.sendToTargets = true;
    data.targets = [];
});
EVENTS.chat.subscribe(async ({message: chat, sender: player}) => {
    try {
        const chatCoolDown = player => {
            (!CHAT_CD_LOG[player.name]) ? (CHAT_CD_LOG[player.name] = 0) : null;
            if (CHAT_CD_LOG[player.name] > 0) return true;
            if (CHAT_CD_LOG[player.name] <= 0) {
                CHAT_CD_LOG[player.name] = chat_cooldown;
                new TickLoop(chat_cooldown, 1, player => CHAT_CD_LOG[player.name] -= 50, player => false, player => {}, player => {
                    CHAT_CD_LOG[player.name] = 0
                }, player)
            }
            return false;
        };
        function argTypeCheck(string) {
            let num_parse = `${string.trim()}`.match(/(\-\d+\.\d+)|(\d+\.\d+)|(\-\d+)|(\d+)/gm),
                loc_parse = string.match(/([\^\~](?:[+-]?(?:\d+(?:\.\d+)?)?)?){3}/gm);
            return (num_parse && num_parse[0] && `${num_parse[0]}`.length === string.length) ? ["number", "location"] : (loc_parse && loc_parse[0] && `${loc_parse[0]}`.length === string.length) ? "location" : (string === 'true' || string === "false") ? "boolean" : (string.match(/(@[asre]\[[\w\W]*?\])|(@[asre])/g) || Array.from(world.getPlayers(), v => v.name.toLowerCase()).some(pln => pln === string.toLowerCase())) ? ["selector", "string"] : (Array.isArray(string)) ? ["array"] : (string instanceof Object) ? ["object"] : ["string"];
        }
        let player_name = player.name,
            region = getEntityTagByPrefix(player, chat_region_tag_prefix),
            rank = `§8[§r${getEntityTagByPrefixs(player, chat_rank_tag_prefix)?.join(multirankSign)}§r§8]`,
            times = timeUpdate(),
            color_name = player.name.split("").some(v => (v === `§`));
        (rank.length >= 11) ? null: (rank = `§8[${first_rank.join(multirankSign)}§r§8]`);
        (show_time) ? null: (times = undefined);
        (chat_rank_bool) ? null: (rank = undefined);
        (color_name) ? null: (player_name = `§b${player_name}`);
        if (chat.startsWith(chat_region_prefix)) {
            if (!chat_region_bool) return player.tell(`§4[Private Chat] §cPrivate chat is being turned off, ask admin for reson`);
            if (chatCoolDown(player)) return player.tell(`§cYou chat so fast! Please wait more ${(CHAT_CD_LOG[player.name] / 1000).toFixed(2)}s`);
            if (!region) return player.tell(`§4[Private chat] §cYou don't have a private chat! Join or create one!`);
            return [...world.getPlayers({tags:[`${chat_region_tag_prefix}${region}`]})].forEach(p => p.tell(`§a${region}§r§l§e > §r${rank ? `${rank} ` : ""}${player_name}${times ? ` ${times}` : ""}§r§e >§r§a ${chat.slice(chat_region_prefix)}`));
        }
        if (chat.startsWith(command_prefix)) {
            let check_args, checkM = chat.slice(command_prefix.length), command, ct = 0;
            if (!checkM) return player.tell(`§cUnknown command, did you mean:§a ${COMMANDS.random().command}`);
            check_args = checkM.splitArgument(player);
            if (check_args.error) return player.tell(`§4Error:§c ${check_args.data} - Native conversion failed`);
            let args = check_args.data,
                args_type = check_args.data_type,
                parse_datas = [],
                reg = new RegExp(args[0].split("").map((v, i, arr) => ct > 2 ? (ct = 0, v + arr[i-2]) : (ct++ ,null)).filter(v => v !== null)?.join(`|`), "gm");
            for (const pb of check_args.parse_data) parse_datas.push(await pb);
            console.warn(JSON.stringify(args), "\n", args_type);
            command = COMMANDS.find(v => (v.command === args[0] || v.alias?.includes(args[0])));
            if (!command) return player.tell(`§cUnknown command, did you mean:§a ${COMMANDS.filter(v => v && v.command.match(reg)).random()?.command ?? "help"}`);
            if (command.admin_only && (!(player.hasTag(admin_tag) || !player.hasTag(stuff_tag)))) return player.tell(`§4Error:§c You need permisssion for use this command!`);
        /*
         @typedef StringType
         Array<["string", "selector", "number", "location", "boolean", "array", "object", "any"]>
         
         if (args_render.length < args.length - 1) {
                if (["error","both"].includes(show_type)) player.tell(`§4Error:§c ${args.slice(0, args.length - 1).join(" ")}§6 >>> §c${args.slice(-1)[0]} §6<<<`);
                if (["usage","both"].includes(show_type)) player.tell(`§4Usage:§r ${usage}`);
                return;
            }
        */
            let data = {
                player: player,
                args: args /*String: for argument>*/,
                type: args_type /*Array<StringType>*/,
                data: parse_datas /*Array<JavaScript data>*/
            };
            console.warn(args,"\n",args_type)
            const {
                command: name,
                usage,
                example,
                admin_only,
                developers,
                error_show_mode: show_type,
                args_render,
                callBack
            } = command,
            non_required_length = args_render.filter(v => v.required).length;
            world.say(`Input: ${toString(args)}\n InputType:  ${toString(args_type)}`);
            if (args_render.length === 0 && !callBack) throw new SyntaxError(`No render data for command: ${name}`);
            for (let i = 0, i1 = 1; i < args_render.length; i++, i1++) {
                function error(reson) {
                    let error_patern = args;
                    error_patern = error_patern.splice(i, 0, 0, "§6>>>§c");
                    error_patern = error_patern.splice(i + 2, 0, 0, "§6<<<§c");
                    if (["error","both"].includes(show_type)) player.tell(`§4Error:§c ${error_patern.join(" ")} §6=> §c${reson}`);
                   if (["usage","both"].includes(show_type)) player.tell(`§4Usage:§r ${usage}`);
                };
                const [
                    arg,
                    type,
                    {
                        value_type: vtype,
                        arg_type: atype,
                        required,
                        default_value,
                        number_range: range,
                        break_type: btype,
                        break_value: barg,
                        break_callBack,
                        possible_value: parg,
                        callBack,
                        formCallBack
                    }
                ] = [args[i1], args_type[i1], args_render[i]];
                world.say(`${arg} ${toString(type)} ${required}`);
                if (!arg) {
                    if (required)/*Error 1: missing arguments*/{
                        if (["error","both"].includes(show_type)) player.tell(`§4Error:§c ${args.join(" ")}§6 >>> §6<<<`);
                        if (["usage","both"].includes(show_type)) player.tell(`§4Usage:§r ${usage}`);
                        return;
                    }
                    if (!default_value) throw new InternalError("Oh no default_value not here!");
                    data.args[i1] = JSON.stringify(default_value);
                    data.type[i1] = argTypeCheck(default_value);
                    data.data[i1] = default_value;
                    continue;
                }
                if (barg.includes(arg) || (btype && btype.some(v => type.includes(v)))) return break_callBack(data);
                if (parg && !parg.includes(arg))/*Error 2: Isn't possible value*/return error(`§e${args[i1]}§c isn't possible value, must be §e${parg.random()}`);
                /*world.say(`${toString(vtype)} with ${toString(type)} => ${type.some(v => vtype.includes(v))}`);*/
                if (!type.some(v => vtype.includes(v)))/*Error 3: Invalid arg type*/return error(`§earg[${i1}]§c is §e[${type.map(v=>v.firstUpperCase())}]§c, must be §e[${atype.map(v=>v.firstUpperCase())}]`);
                
            }
            return;
        }
        if (chatCoolDown(player)) return player.tell(`§cYou chat so fast! Please wait more ${(CHAT_CD_LOG[player.name] / 1000).toFixed(2)}s`);
        runCommand(`tellraw @a {"rawtext":[{"text":"§r${rank ? `${rank} ` : ""}${player_name}${times ? ` ${times}` : ""}§r§e >§r§a ${chat}"}]}`);
    } catch (e) {
        console.warn(e, e.stack ?? "");
    }
});

/**Main class*/
class customCommandBuilder {
    static prefix(p) {
        command_prefix = p
    };
    constructor({
        command,
        alias = [],
        usage = "No usage",
        example = ["No example"],
        admin_only = false,
        developers = ["Choigame123"],
        error_show_mode = "error",
    }) {
        this.index = cmd_arr_i;
        cmd_arr_i++;

        function checkCMD() {
            let all_cmd = Object.keys(CMD_ALIAS),
                all_alias = Object.values(CMD_ALIAS);
            if (all_cmd.includes(command) || alias.some(v => all_alias.includes(v))) return true;
            return false;
        };
        if (!["error", "usage", "both"].some(v => v === error_show_mode)) throw new SyntaxError(`Error show mode must be 'error' | 'both' | 'usage'`);
        if (typeof command !== "string") throw new SyntaxError(`Command must be a string!`);
        if (typeof usage !== "string") throw new SyntaxError(`Usage must be a string!`);
        if (!Array.isArray(alias)) throw new SyntaxError(`Alias must be an array!`);
        if (typeof admin_only !== "boolean") throw new SyntaxError(`admin_only must be a boolean!`);
        if (!Array.isArray(example)) throw new SyntaxError(`EX must be an array!`);
        if (!Array.isArray(developers)) throw new SyntaxError(`Dev must be an array!`);
        if (checkCMD()) throw new TypeError(`Same command or alias detect!`);
        COMMANDS[this.index] = {
            ...arguments[0],
            args_render: []
        };
        CMD_ALIAS[command] = alias;
        return this;
    };
    addArgument({
        value_type = "any",
        arg_type = "end_arg",
        required = true,
        default_value,
        number_range,
        break_type = [],
        break_value = [],
        break_callBack = function (player, args) {},
        possible_value = [],
        callBack = function (player, args) {},
        formCallBack = function (players, form, callBack) {}
    }) {1
        const error = new SyntaxError (`Number range must be format like:§e"min,max§r `);
        if (number_range) {
            if (value_type.some(v => v !== "number")) throw new SyntaxError(`Number range must be just use for number only`);
            if (!(typeof number_range === "string")) throw error;
            const _range_ = number_range.split(",");
            if (_range_.length !== 2) throw error;
            if (_range_[0] > _range_[1]) throw error;
        }
        try {
        if (value_type === "any") value_type = ["string", "selector", "number", "location", "boolean", "array", "object"];
        if (break_type === "any") break_type = ["string", "selector", "number", "location", "boolean", "array", "object"];
        if (value_type.some(v => !["string", "selector", "number", "location", "boolean", "array", "object"].includes(v))) throw new SyntaxError(`Invalid value type at addArgument`);
        if (!["end_arg", "need_next_arg"].some(v => v === arg_type)) throw new SyntaxError(`Invalid argument type at addArgument`);
        if (COMMANDS[this.index].args_render[COMMANDS[this.index].args_render.length-1]?.required === false && required === true) throw new SyntaxError("You bad: if the previous args are not needed then all the following args are also!");
        if (default_value && required) throw new SyntaxError(`Can't use default_value when required is true`);
        if (!default_value && !required) throw new SyntaxError(`You need default_value because this arg is not required`);
        if (!Array.isArray(possible_value)) throw new SyntaxError(`'possible_value' must be an array`);
        if (!Array.isArray(break_value)) throw new SyntaxError(`'break_value' must be an array`);
        if (break_type.some(v => !["string", "selector", "number", "boolean", "array", "object"].includes(v))) throw new SyntaxError(`Invalid break type at addArgument`);
        if (!["string", "any"].some(v => value_type === v) && possible_value.length >= 1) throw new SyntaxError(`Only type 'string' have possible_value`);
        COMMANDS[this.index].args_render.push({
            ...arguments[0]
        });
        return this;
        } catch (e) {
            console.warn(e, e.stack)
        }
    };
    addCallBack(func) {
        COMMANDS[this.index]["callBack"] = func;
        return this;
    };
};
class Database {
    constructor(name) {
        try {
            runCommand('scoreboard objectives add database dummy');
        } catch (error) {};
        this.name = name;
        this.counter = counter;
        counter++;
        TABLE[this.counter] = name;
    }
    getJSON() {
        try {
            return world.scoreboard.getObjective('database')
            ?.getParticipants()
            ?.filter(v => v.type === "fakePlayer")
            ?.map(v => v.displayName)
            ?.filter(v => v.startsWith("CG10DB[") && v.endsWith("]"))
            ?.map(v => {
                return v = v.slice(7, v.length - 1),
                v = v.split(" "),
                {
                    name: v[0],
                    key: v[1],
                    parse_data: JSON.parse(v[2]
                        .replace(/\[\:\]/gm, "\ ")
                        .replace(/\[\'\]/gm, "\"")
                    ),
                    raw_data: v[2]
                }
            })
            .filter(v => v.name === this.name) ?? [];
        } catch (e) {
            console.warn(new Error(`Database:getJSON():${e} ${e.stack}`));
        };
    }
    set(key, value, table = this.name) {
        let data = this.getJSON();
        if (data.some(v => v.key === key)) return false;
        runCommand(`scoreboard players set "CG10DB[${table} ${key} ${JSON.stringify(value)
            .replace(/\"/gm, "\[\'\]")
            .replace(/\ /gm, "\[\:\]")
        }]" database 0`);
        return true;
    }
    get(key) {
        let data = this.getJSON();
        if (!data) {
            console.warn(`Table `, this.name, ` doesn't have key: `, key);
            return;
        }
        return data.find(v => v.key === key)?.parse_data;
    }
    transfer(key, new_table, new_key) {
        let data = this.getJSON();
        if (!data.some(v => v.key === key)) {
            console.warn(`Table `, this.name, ` doesn't have key: `, key);
            return;
        }
        if (!this.hasTable(new_table)) {
            console.warn(`Table `, new_table, ` not found`);
            return;
        }
        this.remove(key);
        this.set(new_key, data.find(v => v.key === key), new_table);
    }
    update(key, value) {
        let data = this.getJSON();
        if (!data.some(v => v.key === key)) {
            console.warn(`Table `, this.name, ` doesn't have key: `, key);
            return false;
        }
        this.remove(key);
        return this.set(key, value);
    }
    remove(key) {
        let raw = this.getJSON().find(v => v.key === key)?.raw_data;
        if (!raw) {
            console.warn(`Table `, this.name, ` doesn't have key: `, key);
            return false;
        }
        runCommand(`scoreboard players reset "CG10DB[${this.name} ${key} ${raw}]" database`);
        return true;
    }
    convert_to_string() {
        console.warn(this.getJSON()?.map(v => toString(v.parse_data)).join("\n"));
    }
    hasKey(key) {
        return this.getJSON().find(v => v.key === key) !== undefined;
    }
    hasTable(table = this.name) {
        return TABLE.includes(table);
    }
    allKey() {
        return this.getJSON();
    }
};
class CuboidSplit {
    constructor(pos1, pos2, size = {
    x: 32,
    y: 32,
    z: 32
}) {
    this.min = {
        x: Math.min(pos1.x, pos2.x),
        y: Math.min(pos1.y, pos2.y),
        z: Math.min(pos1.z, pos2.z)
    };
    this.max = {
        x: Math.max(pos1.x, pos2.x),
        y: Math.max(pos1.y, pos2.y),
        z: Math.max(pos1.z, pos2.z)
    };
    const breakpoints = {
        x: [],
        y: [],
        z: [],
    };
    const cubes = [];
    for (const [axis, value] of Object.entries(size)) {
        for (let coordinate = this.min[axis];; coordinate = coordinate + value) {
            if (coordinate < this.max[axis]) {
                breakpoints[axis].push(coordinate);
            }
            else {
                breakpoints[axis].push(this.max[axis]);
                break;
            }
        }
    }
    breakpoints.x.forEach((x, x_index) => {
        breakpoints.y.forEach((y, y_index) => {
            breakpoints.z.forEach((z, z_index) => {
                let CurCord = {
                    x: x,
                    y: y,
                    z: z,
                };
                let indexOf = {
                    x: x_index,
                    y: y_index,
                    z: z_index,
                };
                let NextCord = {};
                for (let axis in breakpoints) {
                    let nextValue = breakpoints[axis][indexOf[axis] + 1];
                    if (!nextValue && breakpoints[axis].length > 1) return;
                    NextCord[axis] = nextValue ?? CurCord[axis];
                    if (NextCord[axis] !== this.max[axis]) NextCord[axis]--;
                }
                cubes.push({
                    pos1: CurCord,
                    pos2: NextCord
                });
            });
        });
    });
    return cubes;
}
}

class WorldEdit {
    pos1;
    pos2;
    in_progress = false;
    clone_data;
    blockTypes = [];
    deviated_confirm = new MessageFormData().title("§cSomething is wrong!").body("§aThis pyramid has a base of a rectangle (not perfect), do you want to continue?").button1("§aYes").button2("§cNo");
    static[Symbol.hasInstance](player) {
        return world_edit_rom[player.name] !== undefined;
    }
    static wand(player) {
        const inv = player.getComponent("minecraft:inventory").container,
            item = new ItemStack(Items.get(world_edit_item), 1, 0);
        item.setLore([`§5Use for world edit`]);
        inv.setItem(player.selectedSlot, item);
    }
    sphere_hollow(cx, cy, cz, r, x1 = cx + r, x2 = cx - r, y1 = cy + r, y2 = cy - r, z1 = cz + r, z2 = cz - r) {
        [x1, x2] = [x1, x2].sort((a, b) => a - b);
        [y1, y2] = [y1, y2].sort((a, b) => a - b);
        [z1, z2] = [z1, z2].sort((a, b) => a - b);
        if (y1 > 319 || y2 < -64) return this.tell("§c You can't build outside the world");
        this.undo_log.push(this.save(new Location(x1, y1, z1), new Location(x2, y2, z2), this.undo_log.length, "undo"));
        return hollow(cx, cy, cz, r, x1, x2, y1, y2, z1, z2);
        function* hollow (cx, cy, cz, r, x1, x2, y1, y2, z1, z2) {
            let string = "m===r1";
            for (let i = 1; i < r+1; i++) string += `||m===r1-${i}||m===r1+${i}`;
            const check = new Function("m", "r1", `return ${string}`);
            for (let x = x1; x < x2 + 1; x++)
            for (let y = y1; y < y2 + 1; y++)
            for (let z = z1; z < z2 + 1; z++) 
            if (check(x ** 2 + y ** 2 + z ** 2 - 2 * x * cx - 2 * y * cy - 2 * z * cz + cx ** 2 + cy ** 2 + cz ** 2, r ** 2))
            yield {
                x: x,
                y: y,
                z: z
            };
        }
    }
    sphere_solid(cx, cy, cz, r, x1 = cx + r, x2 = cx - r, y1 = cy + r, y2 = cy - r, z1 = cz + r, z2 = cz - r) {
        [x1, x2] = [x1, x2].sort((a, b) => a - b);
        [y1, y2] = [y1, y2].sort((a, b) => a - b);
        [z1, z2] = [z1, z2].sort((a, b) => a - b);
        if (y1 > 319 || y2 < -64) return this.tell("§c You can't build outside the world");
        this.undo_log.push(this.save(new Location(x1, y1, z1), new Location(x2, y2, z2), this.undo_log.length, "undo"));
        return solid(cx, cy, cz, r, x1, x2, y1, y2, z1, z2);
        function* solid (cx, cy, cz, r, x1, x2, y1, y2, z1, z2) {
            for (let x = x1; x < x2 + 1; x++)
            for (let y = y1; y < y2 + 1; y++)
            for (let z = z1; z < z2 + 1; z++) 
            if ((x ** 2 + y ** 2 + z ** 2 - 2 * x * cx - 2 * y * cy - 2 * z * cz + cx ** 2 + cy ** 2 + cz ** 2) <= r ** 2)
            yield {
                x: x,
                y: y,
                z: z
            };
        }
    }
    /*
    square_pyramid: "Math.abs(x) + Math.abs(y) + z - zMin = 0",
    cone: "Math.abs(Math.sqrt(x^2 + y^2)) + Math.abs(z) - zMin = 0",
    tetrahedron:
    "Math.abs(-x) + Math.abs(x) + Math.abs(y) + Math.abs(z) - yMin , zMin = 0",
    pyramid_solid(x1, y1, z1, x2, y2, z2) {
        return pyramid_gen(x1, y1, z1, x2, y2, z2);
        function* pyramid_gen(x1, y1, z1, x2, y2, z2) {
            for (let y = y1; y < y2; y++) {
                if (!x1 || !x2 || !z1 || !z2) break;
                yield {
                    loc1: {
                        x: x1,
                        y: y,
                        z: z1
                    },
                    loc2: {
                        x: x2,
                        y: y,
                        z: z2
                    }
                }
                x1++,x2--,z1++,z2--;
            }
        }
    }
    async pyramid(block) {
        [x1, x2] = [x1, x2].sort((a, b) => a - b);
        [y1, y2] = [y1, y2].sort((a, b) => a - b);
        [z1, z2] = [z1, z2].sort((a, b) => a - b);
        if (y1 > 319 || y2 < -64) return this.tell("§c You can't build outside the world");
        let confirm = false;
        if (x2 - x1 !== z2 - z1) await this.deviated_confirm.show(this.player).then(v => (!v.canceled || r.selection === 0) && (confirm = true));
        if (confirm) {
            this.undo_log.push(this.save(new Location(x1, y1, z1), new Location(x2, y2, z2), this.undo_log.length, "undo"));
        }
    }
    */
    save(pos1, pos2, index, h = 'undo') {
        if (h === "undo") {
            if (this.undo_log.length > world_edit_rom_length) index = this.undo_log.shift().index;
        }
        if (h === "redo") {
            if (this.redo_log.length > world_edit_rom_length) index = this.redo_log.shift().index;
        }
        this.in_progress = true;
        let push_data = [],
            cuboids = new CuboidSplit(pos1, pos2, structure_size);
        for (let [index1, cuboid] of Object.entries(cuboids)) {
            runCommand(`structure save "${this.player.name}:${index}_${index1}_${h}" ${cuboid.pos1.x} ${cuboid.pos1.y} ${cuboid.pos1.z} ${cuboid.pos2.x} ${cuboid.pos2.y} ${cuboid.pos2.z} memory`, this.player);
            push_data.push({
                name: `${this.player.name}:${index}_${index1}_${h}`,
                pos1: cuboid.pos1,
                pos2: cuboid.pos2
            });
        }
        this.in_progress = false;
        return {
            index: index,
            from: pos1,
            to: pos2,
            dimension: this.size,
            data: push_data,
            time: cuboids.length * 60
        };
    }
    load(data) {
        try {
            this.in_progress = true;
            data = data.data;
            if (!data) return {
                error: true
            };
            let load_time = Date.now();
            data.forEach((cube, i, a) => {
                let output = runCommand(`structure load "${cube.name}" ${cube.pos1.x} ${cube.pos1.y} ${cube.pos1.z} 0_degrees none block_by_block ${(a.length / 4).toFixed(2)}`, this.player).statusMessage;
                if (world_edit_log) world.say(`[${cube.pos1.x} ${cube.pos1.y} ${cube.pos1.z}]-${output}`);
            });
            new TickTimeOut(Date.now() - load_time + (data.length * 500), () => this.in_progress = false);
            return {
                time: Date.now() - load_time + (data.length * 70)
            };
        }
        catch (e) {
            if (debug) console.warn(e, e.stack ?? "")
        }
    }
    load_new_pos(pos1, data) {
        this.in_progress = false;
        let load_time = Date.now(),
            cuboids = new CuboidSplit(new BlockLocation(pos1.x, pos1.y, pos1.z), new BlockLocation(pos1.x + data.dimension.x, pos1.y + data.dimension.y, pos1.z + data.dimension.z), structure_size);
        for (let [index, cube] of Object.entries(cuboids)) {
            let output = runCommand(`structure load "${data.data[index].name}" ${cube.pos1.x} ${cube.pos1.y} ${cube.pos1.z} 0_degrees none block_by_block ${(data.data.length / 2).toFixed(2)}`, this.player).statusMessage;
            if (world_edit_log) world.say(`[${cube.pos1.x} ${cube.pos1.y} ${cube.pos1.z}]-${output}`);
        }
        this.in_progress = true;
        return {
            time: Date.now() - load_time + (data.data.length * 120)
        };
    }
    delete(data) {
        data = data.data;
        if (!data) return {
            error: true
        };
        data.forEach(cube => runCommand(`structure delete ${cube.name}`));
        return {
            error: false
        }
    }
    valid_blocks(array) {
        this.old_block = this.player.dimension.getBlock(this.pos1).permutation;
        let error = false,
            index;
        runCommand(`setblock ${this.pos1.x} ${this.pos1.y} ${this.pos1.z} choigame:air`);
        for (let [i, v] of Object.entries(array))
            if (runCommand(`setblock ${this.pos1.x} ${this.pos1.y} ${this.pos1.z} ${v.id} ${v.data}`).error) error = true, index = +`${i}`;
        this.player.dimension.getBlock(this.pos1).setPermutation(this.old_block);
        if (!error) this.getBlockTypes();
        return {
            error: error,
            invalid: array[index]
        };
    }
    getBlockTypes(arr) {
        /*Check block type before run this function*/
        this.blockTypes = [];
        this.old_block = this.player.dimension.getBlock(this.pos1).permutation;
        for (let block of data) {
            runCommand(`setblock ${this.pos1.x} ${this.pos1.y} ${this.pos1.z} ${block.id} ${block.data}`);
            this.blockTthis.blockTypes.push(this.player.dimension.getBlock(this.pos1).type);
        }
        this.player.dimension.getBlock(this.pos1).setPermutation(this.old_block);
    }
    tell(message) {
        return this.player.tell(`§4[World Edit]${message.trim()}`);
    }
    set pos1(loc) {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        this.pos1 = new BlockLocation(loc.x, loc.y, loc.z);
        return this;
    }
    set pos2(loc) {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        this.pos2 = new BlockLocation(loc.x, loc.y, loc.z);
        return this;
    }
    get pos1() {
        return this.pos1
    }
    get pos2() {
        return this.pos2
    }
    get size() {
        const x = [this.pos1.x, this.pos2.x].sort((a, b) => b - a),
            y = [this.pos1.y, this.pos2.y].sort((a, b) => b - a),
            z = [this.pos1.z, this.pos2.z].sort((a, b) => b - a),
            dx = (x[0] - x[1]) > 0 ? (x[0] - x[1]) : 1,
            dy = (y[0] - y[1]) > 0 ? (y[0] - y[1]) : 1,
            dz = (z[0] - z[1]) > 0 ? (z[0] - z[1]) : 1;
        return {
            x: x[0] - x[1],
            dx: dx,
            y: y[0] - y[1],
            dy: dy,
            z: z[0] - z[1],
            dz: dz
        };
    }
    get volume() {
        let size = this.size;
        return size.dx * size.dy * size.dz;
    }
    cut() {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (!this.pos1 || !this.pos2) return this.tell(`§c Please choose a location!`);
        const time = Date.now();
        this.clone_data = this.save(this.pos1, this.pos2, 0, "clone");
        new TickTimeOut(this.clone_data.time ?? 500, () => {
            this.tell(`§a Successful cut§e ${this.volume} blocks§a in§e ${Date.now() - time}ms`);
            this.set(undefined, "air", 0, false, false);
        });
    }
    coppy() {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (!this.pos1 || !this.pos2) return this.tell(`§c Please choose a location!`);
        this.in_progress = true;
        const time = Date.now();
        new TickTimeOut(400, () => {
            this.clone_data = this.save(this.pos1, this.pos2);
            this.tell(`§a Successful coppy§e ${this.volume} blocks§a in §e${Date.now() - time}ms`);
        });
    }
    paste(save_undo = true) {
        if (!this.clone_data) return this.tell(`§a The clipboard is empty!`);
        if (!this.pos1 || !this.pos2) return this.tell(`§c Please choose a location!`);
        if (this.clone_data.from.x === this.pos1.x && this.clone_data.from.y === this.pos1.y && this.clone_data.from.z === this.pos1.z) return this.tell(`§c You are pasting the old position!`);
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        this.in_progress = true;
        let save_data;
        if (save_undo) save_data = this.save(this.pos1, this.pos2, this.undo_log.length, "undo");
        if (save_data) this.undo_log.push(save_data);
        this.in_progress = true;
        new TickTimeOut(save_data.time ?? 500, () => {
            const load_data = this.load_new_pos(this.pos1, this.clone_data);
            new TickTimeOut(load_data.time ?? 500, () => this.tell(`§a Successful paste clipboard in ${load_data.time}ms`));
            this.in_progress = false;
        });
    }
    undo() {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (this.undo_log.length === 0) return this.tell(`§c Undo history not found!`);
        this.in_progress = true;
        let data = this.undo_log.pop();
        this.redo_log.push(this.save(data.from, data.to, data.index, "redo"));
        const load = this.load(data);
        new TickTimeOut(load.time, () => {
            this.in_progress = false;
            this.tell(`§a Successful undid in §e${load.time}ms`);
        });
    }
    redo() {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (this.redo_log.length === 0) return this.tell(`§c Redo history not found!`);
        this.in_progress = true;
        let data = this.redo_log.pop();
        this.undo_log.push(this.save(data.from, data.to, data.index, "undo"));
        const load = this.load(data);
        new TickTimeOut(load.time, () => {
            this.in_progress = false;
            this.tell(`§a Successful redid in §e${load.time}ms`);
        });
    }
    sphere(type, r = 10, id, data, load_rail = r * 8) {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (!this.pos1) return this.tell(`§c Please choose a location!`);
        let pb = this.valid_blocks([{id: id, data: data}]);
        if (pb.error) return this.tell(`§c Parse error - block§e[id: '${pb.invalid.id}', data: ${pb.invalid.data}}]§c is invalid block!`);
        this.in_progress = true;
        this.redo_log = [];
        const time = Date.now();
        let set_data;
        if (type === "hollow") set_data = this.sphere_hollow(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`);
        else set_data = this.sphere_solid(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, undefined, undefined, undefined, undefined, undefined, undefined);
        const tick = world.events.tick.subscribe(() => {
            let array = [];
            for (let i = 0; i < load_rail; i++) {
                const {value, done} = set_data.next();
                if (done) {
                    world.events.tick.unsubscribe(tick);
                    this.in_progress = false;
                    this.tell(`§a Successful create a ${type} sphere §eC(${this.pos1.x}, ${this.pos1.y}, ${this.pos1.z}) : (x - ${this.pos1.x})² + (y - ${this.pos1.y})² + (z - ${this.pos1.z})² ${type === "hollow" ? "=" : "<="} ${r}²)§c in §e${Date.now() - time}ms`);
                    break;
                }
                runCommand(`setblock ${value.x} ${value.y} ${value.z} ${id} ${data}`);
            }
        });
    }
    circle(type, r = 10, axis, id, data, load_rail = r * 32) {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (!this.pos1) return this.tell(`§c Please choose a location!`);
        let pb = this.valid_blocks([{id: id, data: data}]);
        if (pb.error) return this.tell(`§c Parse error - block§e[id: '${pb.invalid.id}', data: ${pb.invalid.data}}]§c is invalid block!`);
        this.in_progress = true;
        this.redo_log = [];
        const time = Date.now();
        let set_data;
        if (type === "hollow") {
            if (axis === "x") set_data = this.sphere_hollow(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, this.pos1.x, this.pos1.x, undefined, undefined, undefined, undefined);
            if (axis === "y") set_data = this.sphere_hollow(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, undefined, undefined, this.pos1.y, this.pos1.y, undefined, undefined);
            if (axis === "z") set_data = this.sphere_hollow(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, undefined, undefined, undefined, undefined, this.pos1.z, this.pos1.z);
        }
        else {
            if (axis === "x") set_data = this.sphere_solid(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, this.pos1.x, this.pos1.x, undefined, undefined, undefined, undefined);
            if (axis === "y") set_data = this.sphere_solid(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, undefined, undefined, this.pos1.y, this.pos1.y, undefined, undefined);
            if (axis === "z") set_data = this.sphere_solid(this.pos1.x, this.pos1.y, this.pos1.z, +`${r}`, undefined, undefined, undefined, undefined, this.pos1.z, this.pos1.z);
        }
        const tick = world.events.tick.subscribe(() => {
            let array = [];
            for (let i = 0; i < load_rail; i++) {
                const {value, done} = set_data.next();
                if (done) {
                    world.events.tick.unsubscribe(tick);
                    this.in_progress = false;
                    this.tell(`§a Successful create a ${type} circle at §e${this.pos1.x} ${this.pos1.y} ${this.pos1.z}§a in axis§e ${axis} §ain§e ${Date.now() - time}ms`);
                    break;
                }
                runCommand(`setblock ${value.x} ${value.y} ${value.z} ${id} ${data}`);
            }
        });
    }
    set(replaced_block, block_id, block_data, save_undo = true, output_message = true) {
        if (this.in_progress) return this.tell(`§c Another action in progress, please wait...`);
        if (!this.pos1 || !this.pos2) return this.tell(`§c Please choose a location!`);
        const err = replaced_block ? this.valid_blocks([...replace_block, {
            id: block_id,
            data: block_data
        }]) : this.valid_blocks([{
            id: block_id,
            data: block_data
        }]);
        if (err.error) return this.tell(`§c Parse error - block§e[id: '${err.invalid.id}', data: ${err.invalid.data}}]§c is invalid block!`);
        let save_data;
        if (save_undo) save_data = this.save(this.pos1, this.pos2, this.undo_log.length, "undo");
        if (save_data) this.undo_log.push(save_data);
        this.in_progress = true;
        this.redo_log = [];
        new TickTimeOut(save_data?.time ?? 500, () => {
            const time = Date.now();
            replaced_block ? replaced_block = ` ${replaced_block.id} ${replaced_block.data}` : replaced_block = ``;
            for (let cube of new CuboidSplit(this.pos1, this.pos2, fill_size)) runCommand(`fill ${cube.pos1.x} ${cube.pos1.y} ${cube.pos1.z} ${cube.pos2.x} ${cube.pos2.y} ${cube.pos2.z} ${block_id} ${replaced_block}`, this.player);
            new TickTimeOut(Date.now() - time, () => {
                this.in_progress = false;
                if (output_message) this.tell(`§a Successful fill §e${this.volume}blocks §ain §e${Date.now() - time}ms`);
            });
        });
    }
    constructor(player) {
        this.undo_log = [];
        this.redo_log = [];
        this.clone_log = [];
        this.player = player;
        return this;
    }
}

class ChestFormBuilder {
    item;
    save = [];
    page_error = false;
    stackBoolean = false;
    static set({
        page,
        loc,
        from,
        to,
        slot,
        id,
        amount,
        data,
        lore = [],
        define,
        isAir = false
    }) {
        if (!containerPage[page]) {
            containerPage[page] = [];
            containerFunction[page] = [];
        }
        if (!(page || loc || from || to || slot)) throw new SyntaxError(`Must be has a location format`);
        if (loc !== undefined) {
            if (slot !== undefined || from !== undefined || to !== undefined) throw new ReferenceError(`Only one type of location format can be used`);
            if (loc.column > 6 || loc.raw > 9) throw new RangeError(`The row or column is too large for the container`);
            slot = loc.column * 6 + loc.raw;
        }
        if (from !== undefined || to !== undefined) {
            if (slot !== undefined || loc !== undefined) throw new ReferenceError(`Only one type of location format can be used`);
            if (from == undefined && to !== undefined || from !== undefined && to == undefined) throw new SyntaxError(`'from' and 'to' property must be used together!`);
            if (from > to) throw new EvalError(`'from' property cannot be bigger than 'to' property!`);
            slot = [from, to];
        }
        if ((typeof slot === "number" && slot < 0) || (Array.isArray(slot) && (slot[0] < 0 || slot[1] < 0))) throw new RangeError(`Slot location must be positive number`);
        if (id === undefined && data === undefined && amount === undefined && !isAir) throw new SyntaxError(`Must be have: 'id', 'amount', 'data' property or 'isAir' property for control!`);
        if (isAir && (id !== undefined || data !== undefined || amount !== undefined)) throw new SyntaxError(`'isAir' property not to be used with 'id', 'amount', 'data' property`);
        if (!define) throw new SyntaxError(`Must be has 'define' property for control!`);
        for (let $c = 0; $c < 54; $c++) {
            if (containerFunction[page][$c] === undefined) containerFunction[page][$c] = {
                type: "airSlot"
            };
        }
        if (!Array.isArray(slot)) {
            if (!isAir) {
                containerPage[page][slot] = new ItemStack(Items.get(id), amount, data);
                containerPage[page][slot].setLore(lore);
            } else containerPage[page][slot] = undefined;
            containerFunction[page][slot] = defineRender();
        } else
            for (let holdSlot = slot[0]; holdSlot < slot[1]; holdSlot++) {
                if (!isAir) {
                    containerPage[page][holdSlot] = new ItemStack(Items.get(id), amount, data);
                    containerPage[page][holdSlot].setLore(lore);
                } else containerPage[page][slot] = undefined;
                containerFunction[page][holdSlot] = defineRender();
            }

        function defineRender() {
            if (!define instanceof Object) throw new SyntaxError(`You need define property for chestGUI control!`);
            if (!define instanceof Object) throw new TypeError(`Data isn't typeof define`);
            if (Object.keys(define).some(v => v !== "type" && v !== "callBack")) throw new SyntaxError(`Unknow property at define`);
            switch (define.type) {
                case 'airSlot': {
                    if (Object.keys(define).some(v => v !== "type")) throw new SyntaxError(`Unknow property at define`);
                    return {
                        type: "airSlot"
                    };
                    break;
                };
                case 'lockSlot': {
                    if (Object.keys(define).some(v => v !== "type")) throw new SyntaxError(`Unknow property at define`);
                    return {
                        type: "lockSlot"
                    };
                    break;
                };
                case 'renderSlot': {
                    if (Object.keys(define).some(v => v !== "type")) throw new SyntaxError(`Unknow property at define`);
                    return {
                        type: "renderSlot",
                        render: true
                    };
                    break;
                };
                default:
                    throw new TypeError(`Define don't have type: ${define.type}`);
            }
        }
    };
    static setCallBack({
        page,
        callBack
    }) {
        if (page === undefined) throw new SyntaxError(`Page not define`);
        if (!Array.isArray(callBack)) throw new TypeError(`Property callBack must be an array`);
        for (let checkCallBack of callBack) {
            if (!checkCallBack instanceof Object) throw new SyntaxError(`Callback array must be all are object`);
            if (Object.keys(checkCallBack).some(v => v !== "slot" && v !== "runCommands" && v !== "nextPage" && v !== "runFunction" && v !== "exitForm")) throw new SyntaxError(`Unknow property at callBack`);
            if (!"slot" in checkCallBack) throw new SyntaxError(`You need 'slot' property for make callBack`);
            if (!Object.keys(checkCallBack).some(v => v === "runCommands" || v === "nextPage" || v === "runFunction" || v === "exitForm")) throw new SyntaxError(`You need 'runCommands || runFunction || nextPage' property for make callBack`);
            if (!(typeof checkCallBack.slot === "number")) throw new TypeError(`Property 'slot' must be a number`);
            if (checkCallBack.runCommands !== undefined && !(checkCallBack.runCommands instanceof Array)) throw new TypeError(`Property 'runCommands' must be an array`);
            if (checkCallBack.runFunction !== undefined && !(checkCallBack.runFunction instanceof Function)) throw new TypeError(`Property 'runFunction' must be a function`);
            if (checkCallBack.nextPage !== undefined && typeof checkCallBack.nextPage !== 'number') throw new TypeError(`Property 'nextPage' must be a number`);
            if (checkCallBack.exitForm !== undefined && typeof checkCallBack.exitForm !== 'boolean') throw new TypeError(`Property 'exitForm' must be a boolean`);
        }
        callBackPage[page] = callBack;
    };
    constructor(player, page = 0) {
            this.player = player;
            this.setup(player, page)
            if (this.boolean) return;
            this.boolean = true;
            this.firstTimeSetup();
    };
    firstTimeSetup() {
        try {
            world.events.playerLeave.subscribe(({
                playerName
            }) => {
                if (playerName !== this.playerName || !this.entity) return;
                this.entity.kill();
            });
            EVENTS.entityCreate.subscribe(({
                entity
            }) => {
                if (entity.id === "minecraft:item") {
                    this.itEntity = entity;
                    this.item = entity.getComponent("minecraft:item").itemStack;
                }
            });
        } catch (e) {
            if (debug) console.warn(e, e.stack ?? "")
        }
    };
    setup(player, page) {
        player.triggerEvent("Script:spawn_chest_gui");
        new TickTimeOut(800, () => {
            this.entity = [...player.dimension.getEntities({tags: ["new"], location: player.location, type: "choigame:inventory"})][0];
            this.entity.removeTag("new");
            this.entity.addTag("isChestGui");
            this.entity.addTag(`owner:${this.player.name}`);
            this.entity.nameTag = "ChestGUI";
            /*this.entity.addEffect(MinecraftEffectTypes.invisibility, 1e9, 1, false);*/
            this.playerName = this.player.name;
            this.playerContainer = this.player.getComponent("minecraft:inventory").container;
            this.container = this.entity.getComponent("minecraft:inventory").container;
            this.setPage(page);
            this.entityRender();
        });
    }
    reset() {
            this.entity.triggerEvent(`die`);
            this.entityLoop.remove();
            new TickTimeOut(300, () => this.setup(this.player, this.page));
    }
    entityRender() {
        this.entityLoop = new TickLoop(Infinity, 500, () => {
            try {
                if (!this.entity) return;
                if (this.playerContainer.getItem(this.player.selectedSlot)?.id === "choigame123:chest_gui") {
                    this.entity.teleport(this.player.location, this.player.dimension, 0, 0);
                    this.handling_item();
                    return;
                }
                this.entity.teleport(new Location(this.player.location.x, this.player.location.y - 5, this.player.location.z), this.player.dimension, 0, 0);
            } catch (e) {
                    if (debug) console.warn(e, e.stack ?? "")
                
            }
        });
    };
    setPage(newPage) {
            if (!this.entity) return;
            this.page = newPage;
            let $tag = [...this.entity.getTags()].filter(tag => tag.startsWith(`page:`))[0] ?? "page:undefined";
            this.entity.removeTag($tag);
            this.entity.addTag(`page:${newPage}`);
            this.pageRender();
    };
    pageRender() {
            if (!this.entity) return;
            if (!containerPage[this.page]) {
                throw new ReferenceError(`No inventory page specified!`);
                this.page_error = true;
                return;
            }
            for (let i = 0; i < this.container.size; i++) this.container.setItem(i, containerPage[this.page][i] ?? new ItemStack(MinecraftItemTypes.allaySpawnEgg, 0, 0));
    };
    compareItem(t,e){try{if(`${t} ${e}`.match(/undefined|null/g)?.length===1)return!1;if(`${t} ${e}`.match(/undefined|null/g)?.length===2)return!0;function n(t){let{id:e,name:n,amount:r,data:l}=t,u=t.getLore();return[e,n,r,l,u].flat(1).join("")}if(n(t)===n(e))return!0;return!1}catch(r){debug&&console.warn(r,r.stack??"")}}
    compareItemNoAmount(t,e){try{if(`${t} ${e}`.match(/undefined|null/g)?.length===1)return!1;if(`${t} ${e}`.match(/undefined|null/g)?.length===2)return!0;function n(t){let{id:e,name:n,data:r}=t,l=t.getLore();return[e,n,r,l].flat(1).join("")}if(`${n(t)}`==`${n(e)}`)return!0;return!1}catch(r){debug&&console.warn(r,r.stack??"")}}
    compareEnchant(t,e){try{let[n,r]=[t,e].map(t=>[...t.getComponent("enchantments").enchantments]);if(n.length!==r.length)return!1;for(let l=0;l<ivl1.length;l++)if(n[l].type.id!==r[l].type.id||n[l].level!==r[l].level)return!1;return!0}catch(u){debug&&console.warn(u,u.stack??"")}}
    handling_item(){if(this.page_error)throw new InternalError("No container page for chest GUI!");for(let S=0;S<this.playerContainer.size;S++)this.save[S]=this.playerContainer.getItem(S);this.handling=[];let t=getINVItems(this.container);for(let[i,e]of Object.entries(t))this.compareItem(e,containerPage[this.page][i])||this.handling.push({index:+`${i}`,item:e});if(!this.handling.length)return;if(this.handling[0].index,this.handling[0].item,1===this.handling.length){let n=this.handling[0].index,s=this.handling[0].item;if(!containerPage[this.page][n]&&s)return this.playerContainer.addItem(s),this.pageRender(),this.switchingControl(n);if(s){if(this.index2,this.compareItemNoAmount(s,containerPage[this.page][n]))return s.amount-=containerPage[this.page][n].amount,this.playerContainer.addItem(s),this.pageRender(),this.switchingControl(n);if(this.save.find((t,i)=>(this.index2=i,this.compareItem(t,containerPage[this.page][n]))))return this.container.swapItems(n,this.index2,this.playerContainer),this.pageRender(),this.switchingControl(n)}else{if(this.item&&this.compareItem(this.item,containerPage[this.page][n]))return this.itEntity.kill(),this.itEntity=void 0,this.item=void 0,this.pageRender(),this.switchingControl(n);this.index1;if(this.save.find((t,i)=>(this.index1=i,this.compareItemNoAmount(t,containerPage[this.page][n])&&containerPage[this.page][n].amount<=t.amount)))return this.save[this.index1].amount-=containerPage[this.page][n].amount,this.playerContainer.setItem(this.index1,this.save[this.index1]),this.pageRender(),this.switchingControl(n)}}if(2===this.handling.length){let[{item:h,index:a},{item:r,index:o}]=this.handling;if(this.compareItem(h,containerPage[this.page][o])||this.compareItemNoAmount(h,r))return this.pageRender()}for(let m of(this.real_amount=0,this.amount_counter=0,this.stack_item,this.itemStack=containerPage[this.page][this.handling[0].index],this.handling))this.real_amount+=containerPage[this.page][m.index]?.amount??0,m.item&&(this.stack_item=m.item,this.amount_counter+=m.item.amount);let d=this.amount_counter-this.real_amount;if(0===d)return this.pageRender();if(d>0)return this.stack_item.amount=d,this.playerContainer.addItem(this.stack_item),this.pageRender();if(/*world.say(`${toString(this.itemStack)}`),*/d<0)return this.index3=[],this.save.filter((t,i)=>!!this.compareItemNoAmount(t,this.itemStack)&&(this.index3.push(i),!0)).forEach((t,i)=>{0!==this.real_amount&&(t.amount<=this.real_amount?(this.real_amount-=t.amount,this.playerContainer.setItem(this.item3[i],new itemStack(MinecraftItemTypes.allaySpawnEgg,0,0))):(t.amount-=this.real_amount,this.real_amount=0,this.playerContainer.setItem(this.index3[i],t)))}),this.pageRender()}
    switchingControl(slotIndex) {
        if (!callBackPage[this.page]) throw new InternalError(`This page don't have callBack`);
        if (containerFunction[this.page][slotIndex].type === "renderSlot") {
            this.$it = callBackPage[this.page].find(v => v.slot === slotIndex);
            if (this.$it) {
                let {
                    runCommands,
                    runFunction,
                    nextPage,
                    exitForm = false
                } = this.$it;
                if (runCommands) runCommands.forEach(v => {
                    try {
                        this.player.runCommand(v);
                    } catch (e) {}
                });
                if (runFunction) runFunction(this.player, this.page, this.container);
                if (exitForm === true) return this.reset();
                if (nextPage) this.setPage(page);
            }
            return;
        }
        this.pageRender(this.page);
    };
};

const PlayerData = new Database('lb'),
    cfdb = new Database('config');
cfdb.set("new", config);

function updateConfig() {
    let {
        command_prefix: command_prefix1,
        chat_rank_bool: chat_rank_bool1,
        chat_region_bool: chat_region_bool1,
        byPassTag: byPassTag1,
        admin_tag: admin_tag1,
        stuff_tag: stuff_tag1,
        chat_rank_tag_prefix: chat_rank_tag_prefix1,
        chat_region_tag_prefix: chat_region_tag_prefix1,
        chat_region_prefix: chat_region_prefix1,
        show_time: show_time1,
        chat_cooldown: chat_cooldown1,
        first_rank: first_rank1,
        multirankSign: multirankSign1,
        successful: successful1,
        failed: failed1,
        chestGUILog: chestGUILog1,
        config_bool: config_bool1,
        LBUpdateDelay: LBUpdateDelay1,
        LBInfoText: LBInfoText1,
        LBTopLimit: LBTopLimit1,
        money_objectives: money_objectives1,
        world_edit_log: world_edit_log1,
        structure_size: structure_size1,
        fill_size: fill_size1,
        console_error_handle: console_error_handle1,
        world_edit_rom_length: world_edit_rom_length1,
        world_edit_item: world_edit_item1
    } = cfdb.get("new") ?? config;
    try {
        command_prefix = command_prefix1 ?? config.command_prefix,
        chat_rank_bool = chat_rank_bool1 ?? config.chat_rank_bool,
        chat_region_bool = chat_region_bool1 ?? config.chat_region_bool,
        byPassTag = byPassTag1 ?? config.byPassTag,
        admin_tag = admin_tag1 ?? config.admin_tag,
        stuff_tag = stuff_tag1 ?? config.stuff_tag,
        chat_rank_tag_prefix = chat_rank_tag_prefix1 ?? config.chat_region_tag_prefix,
        chat_region_tag_prefix = chat_region_tag_prefix1 ?? config.chat_region_prefix,
        chat_region_prefix = chat_region_prefix1 ?? config.chat_region_prefix,
        chat_cooldown = chat_cooldown1 ?? config.chat_cooldown,
        first_rank = first_rank1 ?? config.first_rank,
        multirankSign = multirankSign1 ?? config.multirankSign,
        sound.successful = successful1 ?? config.successful,
        sound.failed = failed1 ?? config.failed,
        chestGUILog = chestGUILog1 ?? config.chestGUILog,
        config_bool = config_bool1 ?? config.config_bool,
        LBTopLimit = LBTopLimit1 ?? config.LBTopLimit,
        LBInfoText = LBInfoText1 ?? config.LBInfoText,
        LBUpdateDelay = LBUpdateDelay1 ?? config.LBUpdateDelay,
        money_objectives = money_objectives1 ?? config.money_objectives,
        show_time = show_time1 ?? config.show_time,
        world_edit_log = world_edit_log1 ?? config.world_edit_log,
        structure_size = structure_size1 ?? config.structure_size,
        fill_size = fill_size1 ?? config.fill_size,
        console_error_handle = console_error_handle1 ?? config.console_error_handle,
        world_edit_item = world_edit_item1 ?? config.world_edit_item,
        world_edit_rom_length = world_edit_rom_length1 ?? config.world_edit_rom_length;
    } catch (e) {world.say(`${e} ${e.stack}`)}
}
updateConfig();

const leaderboard_ui = new ActionFormData()
    .title('§aLeaderBoard')
    .body('§bWhat do you want to do?')
    .button('§aCreate leaderboard', "textures/ui/add.png")
    .button('§cRemove leaderboard', "textures/ui/delete.png")
    .button(`§aEdit leaderboard`);

function lbUI(r1, player) {
        try {
            if (r1.canceled === true) return;
            if (r1.selection === 0) addLB(player);
            if (r1.selection === 1) removeLB(player);
            if (r1.selection === 2) changeLB(player);
        } catch (e) {
            if (debug) console.warn(e, e.stack ?? "")
        }
};

function removeLB(player) {
    try {
        let allLB = getAllLB(),
            ALBNO = allLB.map(v => getEntityTagByPrefix(v, 'nameLB:'));
        ALBNO.length >= 1 ? null : ALBNO = ["No leaderboard found"];
        new ModalFormData()
            .title('§cLeaderBoard Remove')
            .dropdown("Choose a leaderboard:", ALBNO, 0)
            .show(player).then(r => {
                if (r.canceled) return lbUI(player);
                const lb = allLB[r.formValues[0]];
                if (lb === "No leaderboard found") return;
                if (lb) new MessageFormData()
                    .title("§cRemove Leaderboard Comfirm")
                    .body("Are you sure to remove this leaderboard? This action cannot be reversed!")
                    .button1("Yes")
                    .button2("No")
                    .show(player).then(r1 => {
                        console.warn(r1.selection);
                        if (r1.selection === 0) {
                            lb.kill();
                            player.playSound(sound.successful);
                            return player.tell(`§bLeaderboard§f:§c Remove leaderboard with name§f:§e ${ALBNO[r.formValues[0]]}§r §a successful`);
                        } else removeLB(player);
                    });
                else {
                    player.playSound(sound.failed);
                    player.tell(`§bLeaderboard§f:§c Operation canceled by user!`);
                }
            });
    } catch (e) {
        if (debug) console.warn(e, e.stack ?? "")
    }
};

function changeLB(player) {
    let allLB = getAllLB(),
        AOBN = getAllObjectiveName(),
        ALBNO = allLB.map(v => getEntityTagByPrefix(v, 'nameLB:'));
    ALBNO.length >= 1 ? null : ALBNO = ["No leaderboard found"];
    AOBN.length >= 1 ? null : AOBN = ["No objective found"];
    new ModalFormData()
        .title('§2Leaderboard Setting')
        .dropdown("Choose a leaderboard:", ALBNO, 0)
        .show(player).then(r => {
            try {
                if (r.canceled) return lbUI(player);
                const lb = allLB[r.formValues[0]];
                if (lb === "No leaderboard found") return;
                let lbn = getEntityTagByPrefix(lb, "nameLB:"),
                    objn = getEntityTagByPrefix(lb, "objective:"),
                    satn = (getEntityTagByPrefix(lb, "show_all_time:") === "true");
                if (lb) new ModalFormData()
                    .title(`§2Setting`)
                    .textField("Name", lbn, lbn)
                    .dropdown("Objective", AOBN, 0)
                    .toggle("Show all time", satn)
                    .show(player).then(r1 => {
                        if (r1.canceled) return changeLB(player);
                        let [n2, obi1, bool2] = r1.formValues,
                            ob2 = AOBN[obi1];
                        if (ob2 === "No objective found") {
                            player.playSound(sound.failed);
                            player.runCommand(`tellraw @s {"rawtext":[{"text":"§cCan't find a obiective for create leatherboard"}]}`);
                            return;
                        }
                        [`nameLB:${lbn}`, `objective:${objn}`, `show_all_time:${satn}`].forEach(tag => lb.removeTag(tag));
                        [`nameLB:${n2}`, `objective:${ob2}`, `show_all_time:${bool2}`].forEach(tag => lb.addTag(tag));
                        player.playSound(sound.successful);
                        player.tell(`§bLeaderboard§f:§a LeaderBoard setting change successful!`);
                    });
                else {
                    player.playSound(sound.failed);
                    player.tell(`§bLeaderboard§f:§c Operation canceled by user!`);
                }
            } catch (e) {
                if (debug) console.warn(e, e.stack ?? "")
            }
        });
};

function addLB(player) {
    let AONB = getAllObjectiveName();
    AONB.length >= 1 ? null : AONB = ["No objective found"];
    new ModalFormData()
        .title('§aCreate LeaderBoard')
        .textField('Name', 'Enter name')
        .dropdown('Objective', AONB, 0)
        .textField('X position', 'Enter X', '~')
        .textField('Y position', 'Enter Y', '~')
        .textField('Z position', 'Enter Z', '~')
        .toggle('Show in all time', false)
        .show(player).then(r => {
            try {
                if (r.canceled) return lbUI(player);
                let [n1, obi, X, Y, Z, bool1] = r.formValues,
                    ob1 = AONB[obi];
                if (ob1 === "No objective found") {
                    player.playSound(sound.failed);
                    player.tell(`§cCan't find a obiective for create leatherboard`);
                    return;
                }
                if (X === "~") X = Math.trunc(player.location.x);
                if (Y === "~") Y = Math.trunc(player.location.y);
                if (Z === "~") Z = Math.trunc(player.location.z);
                console.warn(`[Leaderboard] data:{"player":,"pos":[${X},${Y},${Z}],"name":"${n1}","objective":"${ob1}","show_all_time":${bool1}}`);
                let check = runCommand(`testfor @e[type=choigame:floating_text,x=${X},y=${Y},z=${Z},r=5,tag=is_leaderboard]`);
                if (check.error) {
                    console.warn(`[Leaderboard] §aAll thing are good, create leaderboard!`);
                    let entity = player.dimension.spawnEntity("choigame:floating_text", new BlockLocation(X, Y, Z));
                    [`is_leaderboard`, `nameLB:${n1}`, `show_all_time:${bool1}`, `objective:${ob1}`].forEach(v => entity.addTag(v));
                    player.playSound(sound.successful);
                    player.tell(`§bLeaderboard§f:§r §aComplete create leaderboard with name§f:§e ${n1}§r§a, objective§f:§e ${ob1}§a at§f: §e${X} ${Y} ${Z}`);
                    return;
                }
                console.warn(`[Leatherboard] §cError because have a leaderboard nearby!`);
                player.playSound(sound.failed);
                player.tell(`§cYou cannot place the leaderboard too close to another leaderboard`);
            } catch (e) {
                if (debug) console.warn(e, e.stack ?? "")
            }
        });
};

function updateLeaderboard(entity) {
    let objective = getEntityTagByPrefix(entity, "objective:"),
        show = getEntityTagByPrefix(entity, "show_all_time:"),
        outNT = [],
        LBNT = [];
    PlayerData.set(objective, []);
    forEachPlayers(player => outNT.push({
        name: player.name,
        score: getScore(player, objective)
    }));
    let inNT = [...outNT, ...PlayerData.get(objective).filter(v => !outNT.some(v1 => v.name === v1.name))];
    PlayerData.update(objective, inNT);
    (show === "true") ? (LBNT = inNT) : (LBNT = outNT);
    LBNT = LBNT.sort((a, b) => b.score - a.score).map((v, i) => v = {
        name: v.name,
        score: numFormatter(v.score),
        top: i + 1
    });
    entity.nameTag = `${getEntityTagByPrefix(entity, "nameLB:") ?? '§cNo Name'}\n${LBInfoText ?? '§aTop     Name     Score'}\n${LBNT.slice(0, LBTopLimit - 1).map(v => `#${v.top} ${v.name} ${v.score}`)?.join("\n")}`;
}
let lbtk = new TickLoop(1000);

function updateLeaderboardConfig() {
    lbtk.remove();
    lbtk = new TickLoop(Infinity, LBUpdateDelay, () => {
        [...world.getDimension("overworld").getEntities({tags: ["is_leaderboard"], type: "choigame:floating_text"})].forEach(v1 => updateLeaderboard(v1));
        forEachPlayers(player => {
            let rank = getEntityTagByPrefixs(player, chat_rank_tag_prefix);
            (rank.length >= 1) ? null: (rank = first_rank);
            player.nameTag = `${player.name}\n§r§8[§r${rank?.join(multirankSign)}§r§8]`;
        });
    });
}
updateLeaderboardConfig();
new TickTimeOut(1/0, 1000, (data) => forEachPlayers(pl => {
    let speed = velocity(pl.location, LocationLog[pl.name].location ?? pl.location);
    pl.runCommandAsync(`titleraw @s title {"rawtext":[{"text":"   §aTPS:§e ${(1 / data.deltaTime).toFixed(2)} \n   §aSpeed: ${speed} m/s"}]}`);
    LocationLog[pl.name] = {location: pl.location, viewVector: player.viewVector};
    }));
/**Also don't forget antihack*/

const reach_check = () => {
    world.events.beforeItemUseOn.subscribe(data => {
        const {
            source: player,
            blockLocation
        } = data;
        if (!isReach(player.location, blockLocation) || player.hasTag(byPassTag)) return;
        data.cancel = true;
        onHack(player);
    });
    world.events.blockBreak.subscribe((data) => {
        if (!isReach(data.player.location, data.block.location) || data.player.hasTag(byPassTag)) return;
        onHack(data.player);
        data.dimension
            .getBlock(data.block.location)
            .setPermutation(data.brokenBlockPermutation);
    });
    world.events.blockPlace.subscribe((data) => {
        if (!isReach(data.player.location, data.block.location) || data.player.hasTag(byPassTag)) return;
        onHack(data.player);
        data.dimension
            .getBlock(data.block.location)
            .setPermutation(MinecraftBlockTypes.air);
    });
    world.events.entityHit.subscribe((data) => {
        if (data.hitEntity) {
            if (!isReach(data.entity.location, data.hitEntity.location)) return;
        }
        if (data.hitBlock) {
            if (!isReach(data.entity.location, data.hitBlock.location)) return;
        }
        onHack(data.hitEntity);
    });
}

const invCheck = () => new TickLoop(null, null, () => forEachPlayers(player => {
    if (player.hasTag(byPassTag)) return;
    let inventory = getInventory(player);
    for (const [i, item] of getINVItems(inventory).entries()) {
        const itemEnchants = item.getComponent("enchantments").enchantments;
        if (blockBan.includes(item.id)) {
            inventory.setItem(i, sameItemStackNoNBT(item));
            onHack(player);
        }
        for (const e of MinecraftEnchantments) {
            const ench = itemEnchants.getEnchantment(e);
            if (ench && enchChecker(itemEnchants, ench, e)) {
                inventory.setItem(i, sameItemStackNoNBT(item));
                onHack(player);
            }
        }
    }
}));

/**
 * Get Item Data For ez make chestGUI register
*/
const translate_data = BlockLoc => {
    console.warn(world.getDimension(`minecraft:overworld`).getBlock(BlockLoc).id);
    let binv = world.getDimension(`minecraft:overworld`).getBlock(BlockLoc).getComponent(`inventory`).container;
    return Array.from({length: binv.size}, (v, i) => binv.getItem(i)).filter(v => v !== undefined).map(v => v = {name: v.id.replace(/minecraft:/g, "").split(/_/g).map(v1 => v1.slice(0, 1).toUpperCase() + v1.slice(1, v1.length)).join(" "), id: v.id, dv: v.data, cost_buy: 0, cost_sell: 0, texture: v.id.replace(/minecraft:/g, "") + ".png", max_amount: v.amount,});
}

import {
    natural_blocks,
    natural_items,
    building_blocks,
    tools,
    tool_shop
} from "./shop_data.js";

const main_shop_ui = new ActionFormData()
    .title('§l§b§k||§r  §l§aShop  §b§k||')
    .button('§aNatural Block')
    .button('§aNatural Item')
    .button('§bBuilding Block')
    .button('§bTool & Armor')
    .button('§aPotion')
    .button('§aMiscellaneous')
    .button('§aPlugins'),
    natural_shop_ui = new ActionFormData()
    .title("§aNature Blocks Shop"),
    natural_item_shop_ui = new ActionFormData()
    .title("§aNature Items Shop"),
    tool_and_armor_ui = new ActionFormData()
    .title("§aTool & Armor")
    .button('§aAxe')
    .button('§aPickaxe')
    .button('§aHoe')
    .button('§aShovel')
    .button('§aSword')
    .button('§aHelmet')
    .button('§aChestplate')
    .button('§aLeggings')
    .button('§aBoots')
    .button('§aBuckets')
    .button('§aOther'),
    tools_axe_ui = new ActionFormData()
    .title("§aAxe"),
    tools_pickaxe_ui = new ActionFormData()
    .title("§aPickaxe"),
    tools_hoe_ui = new ActionFormData()
    .title("§aHoe"),
    tools_shovel_ui = new ActionFormData()
    .title("§aShovel"),
    tools_sword_ui = new ActionFormData()
    .title("§aSword"),
    armors_helmet_ui = new ActionFormData()
    .title("§aHelmet"),
    armors_chestplate_ui = new ActionFormData()
    .title("§aChestplate"),
    armors_leggings_ui = new ActionFormData()
    .title("§aLeggings"),
    armors_boots_ui = new ActionFormData()
    .title("§aBoots"),
    tools_bucket_ui = new ActionFormData()
    .title('§aBucket'),
    tools_other_ui = new ActionFormData()
    .title('§aOther');
for (let n of tool_shop) {
    tools_other_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.bucket) {
    tools_bucket_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.tool_axes) {
    tools_axe_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.tool_pickaxes) {
    tools_pickaxe_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.tool_hoes) {
    tools_hoe_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.tool_shovels) {
    tools_shovel_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.tool_swords) {
    tools_sword_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.armor_helmet) {
    armors_helmet_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.armor_chestplate) {
    armors_chestplate_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.armor_leggings) {
    armors_leggings_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of tools.armor_boots) {
    armors_boots_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/item§6 Sell§f:§a${n.cost_sell}$/item`, `textures/ui/tool_and_weapon/${n.texture}`);
}
for (let n of natural_items) {
    natural_item_shop_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/block§6 Sell§f:§a${n.cost_sell}$/block`, `textures/ui/natural_item/${n.texture}`);
}
for (let n of natural_blocks) {
    if (n.special_number) natural_shop_ui.button(`§2${n.name}\n§bBuy§f:§a${numFormatter(n.cost_buy)}$/block§6 Sell§f:§a${numFormatter(n.cost_sell)}$/block`, `textures/ui/natural_shop/${n.texture}`);
    else natural_shop_ui.button(`§2${n.name}\n§bBuy§f:§a${n.cost_buy}$/block§6 Sell§f:§a${n.cost_sell}$/block`, `textures/ui/natural_shop/${n.texture}`);
}


function main_shop_ui_open(r, player) {
        if (r.canceled === true) return player.playSound(sound.failed);
        switch (r.selection) {
            case 0: {
                natural_ui_open(player);
                break;
            }
            case 1: {
                natural_item_ui_open(player);
                break;
            }
            case 3: {
                tool_and_armor_ui_open(player);
                break;
            }
            default: {
                return;
            }
        }
}

function natural_ui_open(player) {
    natural_shop_ui.show(player).then((r) => {
        if (r.canceled === true) return main_shop_ui_open(player);
        shop_ui_choose(player, natural_blocks[r.selection]);
    });
}

function natural_item_ui_open(player) {
    natural_item_shop_ui.show(player).then((r) => {
        if (r.canceled === true) return main_shop_ui_open(player);
        shop_ui_choose(player, natural_items[r.selection]);
    });
}

function tool_and_armor_ui_open(player) {
    tool_and_armor_ui.show(player).then((r) => {
        if (r.canceled) return main_shop_ui_open(player);
        switch (r.selection) {
            case 0: {
                tools_axe_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.tool_axes[r.selection]);
                });
                break;
            }
            case 1: {
                tools_pickaxe_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.tool_pickaxes[r.selection]);
                });
                break;
            }
            case 2: {
                tools_hoe_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.tool_hoes[r.selection]);
                });
                break;
            }
            case 3: {
                tools_shovel_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.tool_shovels[r.selection]);
                });
                break;
            }
            case 4: {
                tools_sword_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.tool_swords[r.selection]);
                });
                break;
            }
            case 5: {
                armors_helmet_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.armor_helmet[r.selection]);
                });
                break;
            }
            case 6: {
                armors_chestplate_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.armor_chestplate[r.selection]);
                });
                break;
            }
            case 7: {
                armors_leggings_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.armor_leggings[r.selection]);
                });
                break;
            }
            case 8: {
                armors_boots_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.armor_boots[r.selection]);
                });
                break;
            }
            case 9: {
                tools_bucket_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tools.bucket[r.selection]);
                });
                break;
            }
            case 10: {
                tools_other_ui.show(player).then((r) => {
                    if (r.canceled) return tool_and_armor_ui_open(player);
                    shop_ui_choose(player, tool_shop[r.selection]);
                });
                break;
            }
            default: {
                return;
            }
        }
    });
}

function shop_ui_choose(player, data) {
    const {id, name, dv, cost_sell, cost_buy, max_amount} = data,
        iv = player.getComponent("minecraft:inventory").container,
        container = Array.from({length: iv.size}, (v, i) => iv.getItem(i)),
        aliable_amount = container.filter(v => v && v.id === id && v.data === dv).reduce((p, v) => p + v.amount, 0),
        empty_aliable_amount = (max_amount === 1) ? 0 : container.filter(v => v && v.id === id && v.data === dv).reduce((p, v) => p + (max_amount - v.amount), 0),
        empty_amount = iv.emptySlotsCount * max_amount + empty_aliable_amount,
        money = getScore(player, money_objectives),
        register = [],
        form = new ActionFormData()
        .title(`§2Buy ${name}`)
        .body(`§aYou have: §e${money}$\n§aYou have:§e ${aliable_amount}§b ${name[0].toLowerCase() + name.slice(1)}${empty_amount >= 1 ? `` : `\n§cYou not enough inventory space to buy!`}${aliable_amount >= 1 ? `` : `\n§cYou don't have this item to sell!`}`);
    for (let stack_of of new Set([1, 16, 32, 64, 96, 128, 160, 192, 224, 256, 320, empty_amount])) {
        if (stack_of > empty_amount) continue;
        if (stack_of && !(stack_of / max_amount >= 27) && (money >= stack_of * cost_buy)) {
            register.push(stack_of);
            form.button(`§aBuy §e×${stack_of}\n§3${cost_buy * stack_of}$`);
        }
    }
    for (let stack_of of new Set([-1, -16, -32, -64, -96, -128, -160, -192, -224, -256, -320, -1 * aliable_amount]))
        if (stack_of && !(stack_of * -1 / max_amount >= 27) && (aliable_amount >= stack_of * -1)) {
            register.push(stack_of);
            form.button(`§cSell §e×${stack_of * -1}\n§3${cost_sell * stack_of * -1}$`);
        }
    form.show(player).then(r => {
        if (r.canceled) return main_shop_ui_open(player);
        let selection = register[r.selection];
        if (selection > 0) {
            player.playSound(sound.successful);
            runCommands([
                `tellraw @s {"rawtext":[{"text":"§4[Shop]§a You buy §e×${selection} ${name} with cost: ${selection * cost_buy}$"}]}`,
                `scoreboard players remove @s ${money_objectives} ${selection * cost_buy}`,
                `give @s ${id} ${selection} ${dv}`
            ], player);
        }
        if (selection < 0) {
            let c;
            player.playSound(sound.successful);
            runCommands([
                `tellraw @s {"rawtext":[{"text":"§4[Shop]§a You sell §e×${selection * -1} ${name} with cost: ${selection * cost_sell * -1}$"}]}`,
                `scoreboard players add @s ${money_objectives} ${(c = selection * -1 * cost_sell), (c > (2e31 - 1 - money)) ? (2e31 - 1 - money) : c}`,
                `clear @s ${id} ${dv} ${selection * -1}`
            ], player);
        }
    });
}

/**Done and export*/
export {
    TickTimeOut,
    TickLoop,
    customCommandBuilder,
    CuboidSplit,
    ChestFormBuilder,
    Database,
    health,
    velocity,
    distance,
    toString,
    parseLocation,
    damgeToForm,
    getGamemode,
    getScore,
    getAllScore,
    setGamemode,
    runCommand,
    runCommands,
    numFormatter,
    alignLeft,
    getInventory,
    forEachPlayers,
    getTPS,
    getPlayerFromName,
    UUIDGen,
    getAllObjectiveName,
    getAllLB,
    textToBinary,
    binaryToText,
    lbUI,
    clearChat,
    isReach,
    getINVItems,
    sameItemStackNoNBT,
    comI,
    getEntityTagByPrefix,
    getEntityTagByPrefixs
};

console.warn(`§bAll of API and test load in ${Date.now() - watchdogtime}ms`);

/**
 * And right here is for set up all api to work
 */
/*
new customCommandBuilder({command: "wand", admin_only: true, usage: `§2${command_prefix}wand:§a Use for get wand use for word edit`, developers: ["ChoiGame123"]}).addCallBack(({player}) => {
    WorldEdit.wand(player);
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
});
new customCommandBuilder({command: "undo", admin_only: true, usage: `§2${command_prefix}undo:§a Undo for word edit`, developers: ["ChoiGame123"]}).addCallBack(({player}) => {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].undo();
});
new customCommandBuilder({command: "redo", admin_only: true, usage: `§2${command_prefix}redo:§a Redo for word edit`, developers: ["ChoiGame123"]}).addCallBack(({player}) => {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].redo();
});
new customCommandBuilder({command: "set", admin_only: true, error_show_mode: "both", usage: `§b${command_prefix}set <block_id: string> <data_value: number>:§a Set block type for word edit`, developers: ["ChoiGame123"]})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "string"
})
.addArgument({
    arg_type: "end_arg",
    value_type: "number",
    callBack: function({player, args}) {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].set(undefined, args[1], args[2]);
    }
});
new customCommandBuilder({command: "cut", admin_only: true, usage: `§2${command_prefix}cut:§a Cut structure for word edit`, developers: ["ChoiGame123"]}).addCallBack(({player}) => {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].cut();
});
new customCommandBuilder({command: "coppy", admin_only: true, usage: `§2${command_prefix}coppy:§a Coppy structure use for word edit`, developers: ["ChoiGame123"]}).addCallBack(({player}) => {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].coppy();
});
new customCommandBuilder({command: "paste", admin_only: true, usage: `§2${command_prefix}paste:§a Paste structure use for word edit`, developers: ["ChoiGame123"]}).addCallBack(({player}) => {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].paste();
});
new customCommandBuilder({command: "sphere", admin_only: true, error_show_mode: "both", usage: `§b${command_prefix}sphere <type: enum[solid | hollow]> <radius: number> <block_id: string> <data_value: number>:§a Make a sphere for word edit`, developers: ["ChoiGame123"]})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "string",
    possible_value: ["solid", "hollow"]
})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "number"
})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "string"
})
.addArgument({
    arg_type: "end_arg",
    value_type: "number",
    callBack: function({player, args}) {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].sphere(args[1], args[2], args[3], args[4]);
    }
});
new customCommandBuilder({
    command: "circle",
    admin_only: true,
    error_show_mode: "both",
    usage: `§b${command_prefix}circle <type: enum[solid | hollow]> <radius: number> <axis: enum[x | y | z]> <block_id: string> <data_value: number>:§a Make a circle for word edit`,
    developers: ["ChoiGame123"]
})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "string",
    possible_value: ["solid", "hollow"]
})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "number"
})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "string",
    possible_value: ["x", "y", "z"]
})
.addArgument({
    arg_type: "need_next_arg",
    value_type: "string"
})
.addArgument({
    arg_type: "end_arg",
    value_type: "number",
    callBack: function({player, args}) {
    (world_edit_rom[player.name] !== undefined) ? 0 : world_edit_rom[player.name] = new WorldEdit(player);
    if (!(player instanceof WorldEdit)) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§4[World Edit]§c You have not enabled world edit :D"}]}`);
    world_edit_rom[player.name].circle(args[1], args[2], args[3], args[4], args[5]);
    }
});

new customCommandBuilder({
        command: "chat",
        admin_only: true
    }).addArgument({
        arg_type: "need_next_arg",
        value_type: "string",
        possible_value: ["clear", "config"],
        break_type: "string",
        break_value: ["clear"],
        break_callBack: function ({
            player,
            args
        }) {
            clearChat(args[2], player);
        }
    })
    .addArgument({
        arg_type: "end_arg",
        value_type: "object",
        callBack: function ({
            player,
            data: parse
        }) {
            for (let [i, v] of Object.entries(parse[2])) switch (i) {
                case "chat_rank_tag_prefix":
                    chat_rank_tag_prefix = v;
                    break;
                case "chat_region_tag_prefix":
                    chat_region_tag_prefix = v;
                    break;
                case "chat_cooldown":
                    chat_cooldown = v;
                    break;
                case "command_prefix":
                    command_prefix = v;
                    break;
                case "multi_rank_sign":
                    multirankSign = v;
                    break;
                case "first_rank":
                    first_rank = v;
                    break;
                case "chat_region_prefix":
                    chat_region_prefix = v;
                    break;
                default: {
                    player.runCommand(`tellraw @a {"rawtext":[{"text":"§cInvalid property §e[${i}]§c in config options"}]}`);
                }
            }
        }
    });
    new customCommandBuilder({
        command: "leaderboard",
        alias: ["lb"]
    }).addArgument({
        arg_type: "need_next_arg",
        value_type: "string",
        break_type: "string",
        break_value: ["form"],
        break_callBack: function ({
            player
        }) {
            damgeToForm(player, leaderboard_ui, lbUI);
        }
    }),
    shop_cmd = new customCommandBuilder({
        command: "shop"
    })
    .addCallBack(({
        player
    }) => damgeToForm(player, main_shop_ui, main_shop_ui_open));
    new customCommandBuilder({
        command: "setting",
        alias: ["st"],
        owner: ["Choigame123"],
        usage: `${command_prefix}st`,
        admin_only: true
    })
    .addCallBack(({
        player
    }) => {
        try {
            const abjn = getAllObjectiveName(),
                error_selection = ["console", "chat", "both"],
                wand_selection = ["minecraft:wooden_axe", "minecraft:stone_axe", "minecraft:iron_axe", "minecraft:golden_axe", "minecraft:diamond_axe", "minecraft:netherite_axe"],
                confirmation_form = new MessageFormData().title(`§a Confirm action`).body(`§cYou change §o§4World Edit Setting§r§c it will be reset §o§ccurrent session. §r\n\nAre you sure about?`).button1("Yes").button2("No");
            let current = "\n§a+Current setting:§r";
            for (let [i, v] of Object.entries(cfdb.get("new"))) current += `\n§6${i.replace(/\_/gm, " ").slice(0,1).toUpperCase() + i.replace(/\_/gm, " ").slice(1)}:§a ${v}§r`;
            damgeToForm(player,
                new ModalFormData()
                .title("§2World setting")
                .toggle("Using config file", config_bool)
                .textField(`If you not setting, this will be use in config file\nPlease click submit at end, or it will not save\nNote: §cIf you change §o§4World Edit Setting§r§c it will be reset §o§4current session§r\n\n${current}\n\nChat Setting:\n\nFirst Rank - split by\"|\"`, "Enter tag", first_rank.join("|"))
                .toggle("Show chat time", show_time)
                .toggle("Chat rank", chat_rank_bool)
                .textField("Multirank Sign", "Enter char", multirankSign)
                .textField("Command prefix", "Enter prefix", command_prefix)
                .toggle("Chat region (private chat)", chat_region_bool)
                .textField("Chat region prefix", "Enter prefix", chat_region_prefix)
                .slider("Chat Cooldown (miliseconds)", 0, 10000, 50, chat_cooldown)
                .textField("\nSound Setting:\n\nSuccessful", "Enter Sound ID", sound.successful)
                .textField("Failed", "Enter Sound ID", sound.failed)
                .textField("\nTag Setting:\n\nBypass anti-hack tag(also bypass admin/stuff tag)", "Enter tag", byPassTag)
                .textField("Admin Tag", "Enter tag", admin_tag)
                .textField("Stuff Tag", "Enter tag", stuff_tag)
                .textField("\nLeaderboard Setting:\n\nInfo Text", "Enter text", LBInfoText)
                .slider("Show for top", 3, 20, 1, LBTopLimit)
                .slider("Leaderboard Update Time (miliseconds)", 500, 60000, 200, LBUpdateDelay)
                .dropdown("\nWorld Edit:\n\nWand type:", ["Wooden axe", "Stone axe", "Iron axe", "Golden axe", "Diamond axe", "Netherite axe"], wand_selection.indexOf(world_edit_item))
                .slider("Structure size - x axis", 32, 64, 1, structure_size.x)
                .slider("Structure size - y axis", 1, 319, 1, structure_size.y)
                .slider("Structure size - z axis", 32, 64, 1, structure_size.z)
                .slider("Fill size - x axis", 1, 31, 1, fill_size.x)
                .slider("Fill size - y axis", 1, 31, 1, fill_size.y)
                .slider("Fill size - z axis", 1, 31, 1, fill_size.z)
                .slider("World edit history length", 4, 16, 1, world_edit_rom_length)
                .dropdown("\nOther:\n\nMoney Objectives", abjn, abjn.indexOf(money_objectives))
                .toggle("Error debug", debug)
                .dropdown("Debug Log", error_selection, error_selection.indexOf(console_error_handle))
                .toggle("Chest GUI Console log", chestGUILog),
                (r, player) => {
                    try {
                        if (r.canceled) return player.playSound(sound.failed);
                        let first_rank_string, config_bool, cmdp, crp, moi, wsi, esi, structure_size2 = {},
                            fill_size2 = {},
                            world_edit_rom_length2;
                        [
                            config_bool,
                            first_rank_string,
                            show_time,
                            chat_rank_bool,
                            multirankSign,
                            cmdp,
                            chat_region_bool,
                            crp,
                            chat_cooldown,
                            sound.successful,
                            sound.failed,
                            byPassTag,
                            admin_tag,
                            stuff_tag,
                            LBInfoText,
                            LBTopLimit,
                            LBUpdateDelay,
                            wsi,
                            structure_size2.x,
                            structure_size2.y,
                            structure_size2.z,
                            fill_size2.x,
                            fill_size2.y,
                            fill_size2.z,
                            world_edit_rom_length2,
                            moi,
                            debug,
                            esi,
                            chestGUILog
                        ] = r.formValues;
                        console_error_handle = error_selection[esi];
                        money_objectives = abjn[moi];
                        updateC();
                        async function updateC() {
                            let bool = false;
                            if (structure_size2.x !== structure_size.x || structure_size2.y !== structure_size.y || structure_size2.z !== structure_size.z || fill_size2.x !== fill_size.x || fill_size2.y !== fill_size.y || fill_size2.z !== fill_size.z || world_edit_rom_length2 !== world_edit_rom_length || wand_selection[wsi] !== world_edit_item) await confirmation_form.show(player).then(r => {
                                if (r.canceled || r.selection === 0) return;
                                structure_size = structure_size2,
                                    fill_size = fill_size2,
                                    world_edit_rom_length = world_edit_rom_length2,
                                    world_edit_item = wand_selection[wsi];
                                forEachPlayers(player => (player instanceof WorldEdit) ? (player.tell(`§4[WorldEdit]§c Someone update config so world edit will be reset because it decide how world edit works`), delete world_edit_rom[player.name], 0) : 0)
                            });
                            if (config_bool) await confirmation_form.show(player).then(r => {
                                if (r.canceled || r.selection === 0) return;
                                cfdb.update("new", config);
                                player.playSound(sound.successful);
                                player.tell(`§4[Config]§a Config has been set to default!`);
                                updateConfig();
                                updateLeaderboardConfig();
                                forEachPlayers(player => (player instanceof WorldEdit) ? (player.tell(`§4[WorldEdit]§c Someone update config so world edit will be reset because it decide how world edit works`), delete world_edit_rom[player.name], 0) : 0);
                                bool = true;
                            });
                            if (bool) return;
                            first_rank = first_rank_string.split(/\|/g);
                            if (cmdp.length >= 2 || cmdp.match(/[!;?|~=\-_+#*]/g)?.length <= 0) return player.tell(`§4[Config]§c Invalid Command Prefix`);
                            if (crp.length >= 2 || crp.match(/[!;?|~=\-_+#*]/g)?.length <= 0) return player.tell(`§4[Config]§c Invalid Region Prefix`);
                            command_prefix = cmdp,
                            chat_region_prefix = crp;
                            cfdb.update("new", {
                                LBUpdateDelay: LBUpdateDelay,
                                LBTopLimit: LBTopLimit,
                                LBInfoText: LBInfoText,
                                config_bool: config_bool,
                                show_time: show_time,
                                first_rank: first_rank,
                                multirankSign: multirankSign,
                                command_prefix: command_prefix,
                                chat_rank_bool: chat_rank_bool,
                                chat_region_bool: chat_region_bool,
                                chat_region_prefix: chat_region_prefix,
                                chat_cooldown: chat_cooldown,
                                admin_tag: admin_tag,
                                ...sound,
                                byPassTag: byPassTag,
                                admin_tag: admin_tag,
                                stuff_tag: stuff_tag,
                                money_objectives: money_objectives,
                                chestGUILog: chestGUILog,
                                world_edit_item: world_edit_item,
                                console_error_handle: console_error_handle,
                                world_edit_rom_length: world_edit_rom_length,
                                world_edit_log: world_edit_log,
                                structure_size: structure_size,
                                fill_size: fill_size
                            });
                            new TickTimeOut(500, () => updateConfig(), updateLeaderboardConfig(), player.playSound(sound.successful), player.tell(`§4[Config]§a New config has been saved!`));
                        }
                    } catch (e) {
                        if (debug) console.warn(e, e.stack ?? "")
                    }
                });
        } catch (e) {
            world.say(`${e} ${e.stack}`)
        }
    });

new customCommandBuilder({command: "chest", admin_only: true, usage: `§2${command_prefix}c Chest`}).addCallBack(({player}) => {
    new ChestFormBuilder(player);
});
*/
//page 0
ChestFormBuilder.set({
    page: 0,
    from: 0,
    to: 9,
    id: "minecraft:grass",
    data: 0,
    amount: 1,
    lore: ['', '§aTest lore!', '', '', '§7Plugins by @Choigame123'],
    define: {
        type: "renderSlot"
    }
});
ChestFormBuilder.set({
    page: 0,
    from: 54 - 18,
    to: 54,
    id: "minecraft:dirt",
    data: 0,
    amount: 1,
    lore: [`§4Yo`],
    define: {
        type: "lockSlot"
    }
});

let bruh = {
    page: 0,
    callBack: []
}
for (let i = 0; i < 9; i++) bruh.callBack.push({
    slot: i,
    exitForm: true,
    runCommands: [
        `tellraw @a {"rawtext":[{"text":"Choigame123 select slot: ${i}"}]}`
    ]
});
ChestFormBuilder.setCallBack(bruh);

//page 1
ChestFormBuilder.set({
    page: 1,
    from: 0,
    to: 54,
    id: "minecraft:diamond_block",
    data: 0,
    amount: 1,
    lore: ['', '§atest lore!', 'line3', 'line4'],
    define: {
        type: "airSlot"
    }
});
new customCommandBuilder({
    command: "wand",
    admin_only: true,
    usage: `§2${command_prefix}wand:§a Use for get wand use for word edit`,
    developers: ["ChoiGame123"]
})
.addArgument({
    value_type: ["string", "number", "location"],
    arg_type: "need_next_arg",
    required: false,
    default_value: "bruh",
    break_type: ["number"],
    break_value: ["0"],
    break_callBack: function ({player, args}) {
        world.say(player.name)
    }
})
.addArgument({
    arg_type: "end_arg",
    value_type: ["string"],
    required: false,
    default_value: "test the best command builder",
    callBack: function (dt) {
        world.say(`${toString(dt)}`)
    }
});