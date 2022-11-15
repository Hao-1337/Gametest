/**
==========================================================================================================================================================

  + Config file
  + @version v3.0.0 - 1.19.30
  + @athour ChoiGame123 (dis: Choigame 123 #5666)
  + @helper nope
  + @special_thank Nguyễn Vương (dis: NSNguyenVuong #2303)
  + Discord link: <a herf="https://discord.gg/2dnE2uT49r"></a>

==========================================================================================================================================================
*/


export const config = {
    // All thing below you can change in-game (splash "-setting")

    //Console error handle:
    debug: true,
    console_error_handle: "chat",

    //Please adjust the parameters of worldedit correctly or it will crash, error, not work
    //World edit wand (axe id only);
    world_edit_item: "minecraft:wooden_axe",
    //World edit history length: int: 2 -> 16
    world_edit_rom_length: 10,
    //World edit log: boolean
    world_edit_log: true,
    //Biggest structure can save in one structure block (max is 64 - 319 - 64)
    structure_size: { x: 16, y: 319, z: 16 },
    //Biggest area can fill in one time (max is 32^3 - 1 (32 per 2 axis and 31 for remaining axis))
    fill_size: { x: 31, y: 31, z: 31 },

    //rank tag prefix (sign for your rank): string
    chat_rank_tag_prefix: "chat_rank:",
    //player rank if no one another rank are show: string
    first_rank: ["§aMember"],
    // region tag prefix (sign for you chat region): string
    chat_region_tag_prefix: "chat_region:",
    //chat region prefix: string
    chat_region_prefix: "!",
    //delimiter of multi-rank : string
    multirankSign: "§r§8][§r",
    //cooldown time(if cooldown is true) : int(mili seconds)
    timeCD: 4000,
    //chat region default setting : boolean
    chatR: true,
    //custom command prefix: string
    command_prefix: `-`,

    //Waiting time between each leaderboard update: int(mili seconds)
    LBUpdateDelay: 5000,
    //Rank limit from 1 -> x (int: recommended 3 -> 20)
    LBTopLimit: 10,
    //Info text for lb: string
    LBInfoText: "§aTop     Name     Score",
    //default objective for money scoreboard: string
    money_objectives: "money",

    //show chat time: boolean
    show_time: true,
    //use defalut config: boolean
    config_bool: false,
    //Turn on/off chat rank: boolean
    chat_rank_bool : true,
    //Turn on/off privated chat: boolean
    chat_region_bool : true,

    //Bypass tag for anti-hack check
    byPassTag: "Admin",
    //Admin & Stuff tag
    admin_tag: "Admin",
    stuff_tag: "Stuff",

    //default sound: mojang-minecraft.soundType or sound id
    successful: "note.bell",
    failed: "mob.blaze.hit"
};

//Do something when detect hacker
export const onHack = (player) => {
    player.runCommandAsync(`tellraw @a {"rawtext":[{"text":"§c${player.name} use hack!"}]}`);
}

//prohibited items!
export const blockBan = [
    "minecraft:allow",
    "minecraft:bamboo_sapling",
    "minecraft:bubble_column",
    "minecraft:bedrock",
    "minecraft:beehive",
    "minecraft:bee_nest",
    "minecraft:border_block",
    "minecraft:barrier",
    "minecraft:balloon",
    "minecraft:bleach",
    "minecraft:client_request_placeholder_block",
    "minecraft:camera",
    "minecraft:chemical_heat",
    "minecraft:command_block",
    "minecraft:chain_command_block",
    "minecraft:command_block_minecart",
    "minecraft:chemistry_table",
    "minecraft:daylight_detector_inverted",
    "minecraft:deny",
    "minecraft:end_gateway",
    "minecraft:flowing_lava",
    "minecraft:flowing_water",
    "minecraft:fire",
    "minecraft:glowingobsidian",
    "minecraft:glowingObsidian",
    "minecraft:glow_stick",
    "minecraft:hard_glass",
    "minecraft:hard_glass_pane",
    "minecraft:hard_stained_glass",
    "minecraft:hard_stained_glass_pane",
    "minecraft:info_update",
    "minecraft:info_update2",
    "minecraft:invisibleBedrock",
    "minecraft:invisiblebedrock",
    "minecraft:ice_bomb",
    "minecraft:netherreactor",
    "minecraft:netherReactor",
    "minecratf:movingBlock",
    "minecraft:movingblock",
    "minecraft:melon_stem",
    "minecraft:monster_egg",
    "minecraft:medicine",
    "minecraft:lava",
    "minecraft:lit_furnace",
    "minecraft:lit_blast_furnace",
    "minecraft:lit_smoker",
    "minecraft:lit_redstone_lamp",
    "minecraft:lit_redstone_ore",
    "minecraft:lava_cauldron",
    "minecraft:light_block",
    "minecraft:powered_comparator",
    "minecraft:powered_repeater",
    "minecraft:pistonArmCollision",
    "minecraft:pistomarmcollision",
    "minecraft:portal",
    "minecraft:reserved3",
    "minecraft:reserved4",
    "minecraft:reserved6",
    "minecraft:redstone_wire",
    "minecraft:repeating_command_block",
    "minecraft:rapid_fertilizer",
    "minecraft:standing_sign",
    "minecraft:standing_banner",
    "minecraft:stonecutter",
    "minecraft:stickyPistonArmCollision",
    "minecraft:stickypistonarmcollision",
    "minecraft:soul_fire",
    "minecraft:sparkler",
    "minecraft:spawn_egg",
    "minecraft:structure_void",
    "minecraft:structure_block",
    "minecraft:unknown",
    "minecraft:unpowered_repeater",
    "minecraft:unpowered_comparator",
    "minecraft:unlit_redstone_torch",
    "minecraft:underwater_torch",
    "minecraft:water",
    "minecraft:wall_sign",
    "minecraft:wall_banner",
    "minecraft:beehive",
    "minecraft:bedrock",
    "minecraft:allow",
    "minecraft:deny",
    "minecraft:command_block",
    "minecraft:repeating_command_block",
    "minecraft:chain_command_block",
    "minecraft:bee_nest",
    "minecraft:unknown",
    "minecraft:info_update",
    "minecraft:info_update2",
    "minecraft:reserved3",
    "minecraft:reserved4",
    "minecraft:reserved6",
    "minecraft:movingblock",
    "minecraft:movingBlock",
    "minecraft:invisiblebedrock",
    "minecraft:glowingobsidian",
    "minecraft:netherreactor",
    "minecraft:chemical_heat",
    "minecraft:client_request_placeholder_block",
    "minecraft:lit_furnace",
    "minecraft:lit_blast_furnace",
    "minecraft:lit_smoker",
    "minecraft:lit_redstone_lamp",
    "minecraft:lit_redstone_ore",
    "minecraft:lava_cauldron",
    "minecraft:light_block",
    "minecraft:powered_comparator",
    "minecraft:powered_repeater",
    "minecraft:structure_void",
    "minecraft:structure_block",
    "minecraft:unknown",
    "minecraft:unpowered_repeater",
    "minecraft:unpowered_comparator",
    "minecraft:unlit_redstone_torch",
    "minecraft:underwater_torch"
];