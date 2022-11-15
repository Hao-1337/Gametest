const natural_blocks = [{
            name: "Dirt",
            id: 'minecraft:dirt',
            dv: 0,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "dirt.png"
        },
        {
            name: "Coarse Dirt",
            id: 'minecraft:dirt',
            dv: 1,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "coarse_dirt.png"
        },
        {
            name: "Grass",
            id: 'minecraft:grass',
            dv: 0,
            cost_buy: 3,
            cost_sell: 2,
            max_amount: 64,
            texture: "grass.png"
        },
        {
            name: "Podzol",
            id: 'minecraft:podzol',
            dv: 0,
            cost_buy: 3,
            cost_sell: 1,
            max_amount: 64,
            texture: "podzol.png"
        },
        {
            name: "Mycelium",
            id: 'minecraft:mycelium',
            dv: 0,
            cost_buy: 3,
            cost_sell: 1,
            max_amount: 64,
            texture: "mycelium.png"
        },
        {
            name: "Gravel",
            id: 'minecraft:gravel',
            dv: 0,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "gravel.png"
        },
        {
            name: "Sand",
            id: 'minecraft:sand',
            dv: 0,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "sand0.png"
        },
        {
            name: "Redsand",
            id: 'minecraft:sand',
            dv: 1,
            cost_buy: 2,
            cost_sell: 1,
            max_amount: 64,
            texture: "sand1.png"
        },
        {
            name: "Stone",
            id: 'minecraft:stone',
            dv: 0,
            cost_buy: 2,
            cost_sell: 1,
            max_amount: 64,
            texture: "stone.png"
        },
        {
            name: "Granite",
            id: 'minecraft:stone',
            dv: 1,
            cost_buy: 2,
            cost_sell: 1,
            max_amount: 64,
            texture: "granite.png"
        },
        {
            name: "Diorite",
            id: 'minecraft:stone',
            dv: 3,
            cost_buy: 2,
            cost_sell: 1,
            max_amount: 64,
            texture: "diorite.png"
        },
        {
            name: "Andesite",
            id: 'minecraft:stone',
            dv: 5,
            cost_buy: 2,
            cost_sell: 1,
            max_amount: 64,
            texture: "andesite.png"
        },
        {
            name: "Deepslate",
            id: 'minecraft:deepslate',
            dv: 0,
            cost_buy: 3,
            cost_sell: 1,
            max_amount: 64,
            texture: "deepslate.png"
        },
        {
            name: "Tuff",
            id: 'minecraft:tuff',
            dv: 5,
            cost_buy: 2,
            cost_sell: 1,
            max_amount: 64,
            texture: "tuff.png"
        },
        {
            name: "Amethyst Block",
            id: 'minecraft:amethyst_block',
            dv: 0,
            cost_buy: 10,
            cost_sell: 6,
            max_amount: 64,
            texture: "amethyst_block.png"
        },
        {
            name: "Budding Amethyst",
            id: 'minecraft:budding_amethyst',
            dv: 0,
            cost_buy: 10000,
            cost_sell: 1e9,
            max_amount: 64,
            special_number: true,
            texture: "budding_amethyst.png"
        },
        {
            name: "Calcite",
            id: 'minecraft:calcite',
            dv: 0,
            cost_buy: 11,
            cost_sell: 7,
            max_amount: 64,
            texture: "calcite.png"
        },
        {
            name: "Packed Ice",
            id: 'minecraft:frosted_ice',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "frosted_ice.png"
        },
        {
            name: "Blue Ice",
            id: 'minecraft:blue_ice',
            dv: 0,
            cost_buy: 13,
            cost_sell: 3,
            max_amount: 64,
            texture: "blue_ice.png"
        },
        {
            name: "Oak Log",
            id: 'minecraft:log',
            dv: 0,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "oak_log.png"
        },
        {
            name: "Spruce Log",
            id: 'minecraft:log',
            dv: 1,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "spruce_log.png"
        },
        {
            name: "Birch Log",
            id: 'minecraft:log',
            dv: 2,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "brich_log.png"
        },
        {
            name: "Jungle Log",
            id: 'minecraft:log',
            dv: 3,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "jungle_log.png"
        },
        {
            name: "Acacia Log",
            id: 'minecraft:log2',
            dv: 0,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "acacia_log.png"
        },
        {
            name: "Dark Oak Log",
            id: 'minecraft:log2',
            dv: 1,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "dark_oak_log.png"
        },
        {
            name: "Mangrove Log",
            id: 'minecraft:mangrove_log',
            dv: 1,
            cost_buy: 5,
            cost_sell: 3,
            max_amount: 64,
            texture: "mangrove_log.png"
        },
        {
            name: "Oak Leaves",
            id: 'minecraft:leaves',
            dv: 0,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "oak_leaves.png"
        },
        {
            name: "Spruce Leaves",
            id: 'minecraft:leaves',
            dv: 1,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "spruce_leaves.png"
        },
        {
            name: "Birch Leaves",
            id: 'minecraft:leaves',
            dv: 2,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "birch_leaves.png"
        },
        {
            name: "Jungle Leaves",
            id: 'minecraft:leaves',
            dv: 3,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "jungle_leaves.png"
        },
        {
            name: "Acacia Leaves",
            id: 'minecraft:leaves2',
            dv: 0,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "acacia_leaves.png"
        },
        {
            name: "Dark Oak Leaves",
            id: 'minecraft:leaves2',
            dv: 1,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "dark_oak_leaves.png"
        },
        {
            name: "Mangrove Leaves",
            id: 'minecraft:mangrove_leaves',
            dv: 1,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "mangrove_leaves.png"
        },
        {
            name: "Azalea Leaves",
            id: 'minecraft:azalea_leaves',
            dv: 1,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "azalea_leaves.png"
        },
        {
            name: "Flowering Azalea Leaves",
            id: 'minecraft:azalea_leaves_flowered',
            dv: 1,
            cost_buy: 1,
            cost_sell: 1,
            max_amount: 64,
            texture: "flowering_azalea_leaves.png"
        },
        {
            name: "Coal Ore",
            id: 'minecraft:coal_ore',
            dv: 0,
            cost_buy: 7,
            cost_sell: 4,
            max_amount: 64,
            texture: "coal_ore.png"
        },
        {
            name: "Iron Ore",
            id: 'minecraft:iron_ore',
            dv: 0,
            cost_buy: 20,
            cost_sell: 6,
            max_amount: 64,
            texture: "iron_ore.png"
        },
        {
            name: "Gold Ore",
            id: 'minecraft:gold_ore',
            dv: 0,
            cost_buy: 30,
            cost_sell: 9,
            max_amount: 64,
            texture: "gold_ore.png"
        },
        {
            name: "Redstone Ore",
            id: 'minecraft:redstone_ore',
            dv: 0,
            cost_buy: 12,
            cost_sell: 4,
            max_amount: 64,
            texture: "redstone_ore.png"
        },
        {
            name: "Lapis Lazuli Ore",
            id: 'minecraft:lapis_ore',
            dv: 0,
            cost_buy: 17,
            cost_sell: 4,
            max_amount: 64,
            texture: "lapis_ore.png"
        },
        {
            name: "Copper Ore",
            id: 'minecraft:copper_ore',
            dv: 0,
            cost_buy: 15,
            cost_sell: 4,
            max_amount: 64,
            texture: "copper_ore.png"
        },
        {
            name: "Diamond Ore",
            id: 'minecraft:diamond_ore',
            dv: 0,
            cost_buy: 50,
            cost_sell: 30,
            max_amount: 64,
            texture: "diamond_ore.png"
        },
        {
            name: "Emerald Ore",
            id: 'minecraft:emerald_ore',
            dv: 0,
            cost_buy: 70,
            cost_sell: 35,
            max_amount: 64,
            texture: "emerald_ore.png"
        },
        {
            name: "Deepslate Coal Ore",
            id: 'minecraft:deepslate_coal_ore',
            dv: 0,
            cost_buy: 8,
            cost_sell: 4,
            max_amount: 64,
            texture: "deepslate_coal_ore.png"
        },
        {
            name: "Deepslate Iron Ore",
            id: 'minecraft:deepslate_iron_ore',
            dv: 0,
            cost_buy: 21,
            cost_sell: 6,
            max_amount: 64,
            texture: "deepslate_iron_ore.png"
        },
        {
            name: "Deepslate Gold Ore",
            id: 'minecraft:deepslate_gold_ore',
            dv: 0,
            cost_buy: 31,
            cost_sell: 9,
            max_amount: 64,
            texture: "deepslate_gold_ore.png"
        },
        {
            name: "Deepslate Redstone Ore",
            id: 'minecraft:deepslate_redstone_ore',
            dv: 0,
            cost_buy: 13,
            cost_sell: 4,
            max_amount: 64,
            texture: "deepslate_redstone_ore.png"
        },
        {
            name: "Deepslate Lapis Lazuli Ore",
            id: 'minecraft:deepslate_lapis_ore',
            dv: 0,
            cost_buy: 18,
            cost_sell: 4,
            max_amount: 64,
            texture: "deepslate_lapis_ore.png"
        },
        {
            name: "Deepslate Copper Ore",
            id: 'minecraft:deepslate_copper_ore',
            dv: 0,
            cost_buy: 16,
            cost_sell: 4,
            max_amount: 64,
            texture: "deepslate_copper_ore.png"
        },
        {
            name: "Deepslate Diamond Ore",
            id: 'minecraft:deepslate_diamond_ore',
            dv: 0,
            cost_buy: 52,
            cost_sell: 30,
            max_amount: 64,
            texture: "deepslate_diamond_ore.png"
        },
        {
            name: "Deepslate Emerald Ore",
            id: 'minecraft:deepslate_emerald_ore',
            dv: 0,
            cost_buy: 73,
            cost_sell: 35,
            max_amount: 64,
            texture: "deepslate_emerald_ore.png"
        },
        {
            name: "Nether Quartz Ore",
            id: 'minecraft:quartz_ore',
            dv: 0,
            cost_buy: 11,
            cost_sell: 5,
            max_amount: 64,
            texture: "quartz_ore.png"
        },
        {
            name: "Nether Gold Ore",
            id: 'minecraft:nether_gold_ore',
            dv: 0,
            cost_buy: 10,
            cost_sell: 22,
            max_amount: 64,
            texture: "nether_gold_ore.png"
        },
        {
            name: "Ancient Debris",
            id: 'minecraft:ancient_debris',
            dv: 0,
            cost_buy: 120,
            cost_sell: 50,
            max_amount: 64,
            texture: "ancient_debris.png"
        },
    ],
    natural_items = [{
            name: "Oak Sapling",
            id: 'minecraft:sapling',
            dv: 0,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "oak_sapling.png"
        },
        {
            name: "Brich Sapling",
            id: 'minecraft:sapling',
            dv: 2,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "brich_sapling.png"
        },
        {
            name: "Spruce Sapling",
            id: 'minecraft:sapling',
            dv: 1,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "spruce_sapling.png"
        },
        {
            name: "Acacia Sapling",
            id: 'minecraft:sppling',
            dv: 4,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "acacia_sapling.png"
        },
        {
            name: "Dark Oak Sapling",
            id: 'minecraft:sapling',
            dv: 5,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "dark_oak_sapling.png"
        },
        {
            name: "Jungle Sapling",
            id: 'minecraft:sapling',
            dv: 3,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "jungle_sapling.png"
        },
        {
            name: "Mangrove Propagule",
            id: 'minecraft:mangrove_propagule',
            dv: 0,
            cost_buy: 8,
            cost_sell: 1,
            max_amount: 64,
            texture: "mangrove_sapling.png"
        },
        {
            name: "Cactus",
            id: 'minecraft:cactus',
            dv: 0,
            cost_buy: 10,
            cost_sell: 3,
            max_amount: 64,
            texture: "cactus.png"
        },
        {
            name: "Bamboo",
            id: 'minecraft:bamboo',
            dv: 0,
            cost_buy: 10,
            cost_sell: 4,
            max_amount: 64,
            texture: "bamboo.png"
        },
        {
            name: "Wheat seed",
            id: 'minecraft:wheat_seeds',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "wheat_seed.png"
        },
        {
            name: "Pumpkin Seed",
            id: 'minecraft:pumpkin_seeds',
            dv: 0,
            cost_buy: 9,
            cost_sell: 1,
            max_amount: 64,
            texture: "pumpkin_seed.png"
        },
        {
            name: "Melon Seed",
            id: 'minecraft:melon_seeds',
            dv: 0,
            cost_buy: 10,
            cost_sell: 1,
            max_amount: 64,
            texture: "melon_seed.png"
        },
        {
            name: "Beetroot Seed",
            id: 'minecraft:beetroot_seeds',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "beetroot_seed.png"
        },
        {
            name: "Potato",
            id: 'minecraft:potato',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "potato.png"
        },
        {
            name: "Carrot",
            id: 'minecraft:carrot',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "carrot.png"
        },
        {
            name: "Sweet Berries",
            id: 'minecraft:sweet_berries',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "sweet_berries.png"
        },
        {
            name: "Glow Berries",
            id: 'minecraft:glow_berries',
            dv: 0,
            cost_buy: 5,
            cost_sell: 1,
            max_amount: 64,
            texture: "glow_berries.png"
        },
        {
            name: "Moss Block",
            id: 'minecraft:moss_block',
            dv: 0,
            cost_buy: 3,
            cost_sell: 1,
            max_amount: 64,
            texture: "moss_block.png"
        },
        {
            name: "Moss Carpet",
            id: 'minecraft:moss_carpet',
            dv: 0,
            cost_buy: 0,
            cost_sell: 0,
            max_amount: 64,
            texture: "moss_carpet.png"
        },
        {
            name: "Azalea",
            id: 'minecraft:azalea',
            dv: 0,
            cost_buy: 6,
            cost_sell: 1,
            max_amount: 64,
            texture: "azalea.png"
        },
        {
            name: "Flowering Azalea",
            id: 'minecraft:flowering_azalea',
            dv: 0,
            cost_buy: 6,
            cost_sell: 1,
            max_amount: 64,
            texture: "flowering_azalea.png"
        },
        {
            name: "Small Dripleaf",
            id: 'minecraft:small_dripleaf_block',
            dv: 0,
            cost_buy: 10,
            cost_sell: 3,
            max_amount: 64,
            texture: "small_dripleaf.png"
        },
        {
            name: "Big Dripleaf",
            id: 'minecraft:big_dripleaf',
            dv: 0,
            cost_buy: 11,
            cost_sell: 3,
            max_amount: 64,
            texture: "big_dripleaf.png"
        },
        {
            name: "Spore Blossom",
            id: 'minecraft:spore_blossom',
            dv: 0,
            cost_buy: 30,
            cost_sell: 10,
            max_amount: 64,
            texture: "spore_blossom.png"
        },
        {
            name: "Kelp",
            id: 'minecraft:kelp',
            dv: 0,
            cost_buy: 7,
            cost_sell: 1,
            max_amount: 64,
            texture: "kelp.gif"
        },
        {
            name: "Seagrass",
            id: 'minecraft:seagrass',
            dv: 0,
            cost_buy: 4,
            cost_sell: 1,
            max_amount: 64,
            texture: "seagrass.gif"
        },
        {
            name: "Lily Pad",
            id: 'minecraft:waterlily',
            dv: 0,
            cost_buy: 6,
            cost_sell: 1,
            max_amount: 64,
            texture: "waterlily.png"
        }
    ],
    building_blocks = [{
        name: "",
        id: 'minecraft:',
        dv: 0,
        cost_buy: 0,
        cost_sell: 0,
        texture: ""
    }, ],
    tools = {
        tool_axes: [{
                name: "Wooden Axe",
                id: 'minecraft:wooden_axe',
                dv: 0,
                cost_buy: 2 * 3,
                cost_sell: 1 * 3,
                max_amount: 1,
                texture: "wooden_axe.png"
            },
            {
                name: "Stone Axe",
                id: 'minecraft:stone_axe',
                dv: 0,
                cost_buy: 3 * 3,
                cost_sell: 1 * 3,
                max_amount: 1,
                texture: "stone_axe.png"
            },
            {
                name: "Iron Axe",
                id: 'minecraft:iron_axe',
                dv: 0,
                cost_buy: 30 * 3,
                cost_sell: 20 * 3,
                max_amount: 1,
                texture: "iron_axe.png"
            },
            {
                name: "Golden Axe",
                id: 'minecraft:golden_axe',
                dv: 0,
                cost_buy: 40 * 3,
                cost_sell: 30 * 3,
                max_amount: 1,
                texture: "golden_axe.png"
            },
            {
                name: "Diamond Axe",
                id: 'minecraft:diamond_axe',
                dv: 0,
                cost_buy: 60 * 3,
                cost_sell: 50 * 3,
                max_amount: 1,
                texture: "diamond_axe.png"
            },
            {
                name: "Netherite Axe",
                id: 'minecraft:netherite_axe',
                dv: 0,
                cost_buy: 60 * 3 + 800,
                cost_sell: 50 * 3 + 800,
                max_amount: 1,
                texture: "netherite_axe.png"
            }
        ],
        tool_pickaxes: [{
                name: "Wooden Pickaxe",
                id: 'minecraft:wooden_pickaxe',
                dv: 0,
                cost_buy: 2 * 3,
                cost_sell: 1 * 3,
                max_amount: 1,
                texture: "wooden_pickaxe.png"
            },
            {
                name: "Stone Pickaxe",
                id: 'minecraft:stone_pickaxe',
                dv: 0,
                cost_buy: 3 * 3,
                cost_sell: 1 * 3,
                max_amount: 1,
                texture: "stone_pickaxe.png"
            },
            {
                name: "Iron Pickaxe",
                id: 'minecraft:iron_pickaxe',
                dv: 0,
                cost_buy: 30 * 3,
                cost_sell: 20 * 3,
                max_amount: 1,
                texture: "iron_pickaxe.png"
            },
            {
                name: "Golden Pickaxe",
                id: 'minecraft:golden_pickaxe',
                dv: 0,
                cost_buy: 40 * 3,
                cost_sell: 30 * 3,
                max_amount: 1,
                texture: "golden_pickaxe.png"
            },
            {
                name: "Diamond Pickaxe",
                id: 'minecraft:diamond_pickaxe',
                dv: 0,
                cost_buy: 60 * 3,
                cost_sell: 50 * 3,
                max_amount: 1,
                texture: "diamond_pickaxe.png"
            },
            {
                name: "Netherite Pickaxe",
                id: 'minecraft:netherite_pickaxe',
                dv: 0,
                cost_buy: 60 * 3 + 800,
                cost_sell: 50 * 3 + 800,
                max_amount: 1,
                texture: "netherite_pickaxe.png"
            }

        ],
        tool_shovels: [{
                name: "Wooden Shovel",
                id: 'minecraft:wooden_shovel',
                dv: 0,
                cost_buy: 2,
                cost_sell: 1,
                max_amount: 1,
                texture: "wooden_shovel.png"
            },
            {
                name: "Stone Shovel",
                id: 'minecraft:stone_shovel',
                dv: 0,
                cost_buy: 3,
                cost_sell: 1,
                max_amount: 1,
                texture: "stone_shovel.png"
            },
            {
                name: "Iron Shovel",
                id: 'minecraft:iron_shovel',
                dv: 0,
                cost_buy: 30,
                cost_sell: 20,
                max_amount: 1,
                texture: "iron_shovel.png"
            },
            {
                name: "Golden Shovel",
                id: 'minecraft:golden_shovel',
                dv: 0,
                cost_buy: 40,
                cost_sell: 30,
                max_amount: 1,
                texture: "golden_shovel.png"
            },
            {
                name: "Diamond Shovel",
                id: 'minecraft:diamond_shovel',
                dv: 0,
                cost_buy: 60,
                cost_sell: 50,
                max_amount: 1,
                texture: "diamond_shovel.png"
            },
            {
                name: "Netherite Shovel",
                id: 'minecraft:netherite_shovel',
                dv: 0,
                cost_buy: 60 + 800,
                cost_sell: 50 + 800,
                max_amount: 1,
                texture: "netherite_shovel.png"
            }

        ],
        tool_hoes: [{
                name: "Wooden Hoe",
                id: 'minecraft:wooden_hoe',
                dv: 0,
                cost_buy: 2 * 2,
                cost_sell: 1 * 2,
                max_amount: 1,
                texture: "wooden_hoe.png"
            },
            {
                name: "Stone Hoe",
                id: 'minecraft:stone_hoe',
                dv: 0,
                cost_buy: 3 * 2,
                cost_sell: 1 * 2,
                max_amount: 1,
                texture: "stone_hoe.png"
            },
            {
                name: "Iron Hoe",
                id: 'minecraft:iron_hoe',
                dv: 0,
                cost_buy: 30 * 2,
                cost_sell: 20 * 2,
                max_amount: 1,
                texture: "iron_hoe.png"
            },
            {
                name: "Golden Hoe",
                id: 'minecraft:golden_hoe',
                dv: 0,
                cost_buy: 40 * 2,
                cost_sell: 30 * 2,
                max_amount: 1,
                texture: "golden_hoe.png"
            },
            {
                name: "Diamond Hoe",
                id: 'minecraft:diamond_hoe',
                dv: 0,
                cost_buy: 60 * 2,
                cost_sell: 50 * 2,
                max_amount: 1,
                texture: "diamond_hoe.png"
            },
            {
                name: "Netherite Hoe",
                id: 'minecraft:netherite_hoe',
                dv: 0,
                cost_buy: 60 * 2 + 800,
                cost_sell: 50 * 2 + 800,
                max_amount: 1,
                texture: "netherite_hoe.png"
            }
        ],
        tool_swords: [{
                name: "Wooden Sword",
                id: 'minecraft:wooden_sword',
                dv: 0,
                cost_buy: 2 * 2,
                cost_sell: 1 * 2,
                max_amount: 1,
                texture: "wooden_sword.png"
            },
            {
                name: "Stone Sword",
                id: 'minecraft:stone_sword',
                dv: 0,
                cost_buy: 3 * 2,
                cost_sell: 1 * 2,
                max_amount: 1,
                texture: "stone_sword.png"
            },
            {
                name: "Iron Sword",
                id: 'minecraft:iron_sword',
                dv: 0,
                cost_buy: 30 * 2,
                cost_sell: 20 * 2,
                max_amount: 1,
                texture: "iron_sword.png"
            },
            {
                name: "Golden Sword",
                id: 'minecraft:golden_sword',
                dv: 0,
                cost_buy: 40 * 2,
                cost_sell: 30 * 2,
                max_amount: 1,
                texture: "golden_sword.png"
            },
            {
                name: "Diamond Sword",
                id: 'minecraft:diamond_sword',
                dv: 0,
                cost_buy: 60 * 2,
                cost_sell: 50 * 2,
                max_amount: 1,
                texture: "diamond_sword.png"
            },
            {
                name: "Netherite Sword",
                id: 'minecraft:netherite_sword',
                dv: 0,
                cost_buy: 60 * 2 + 800,
                cost_sell: 50 * 2 + 800,
                max_amount: 1,
                texture: "netherite_sword.png"
            }
        ],
        armor_helmet: [{
                name: "Leader Helmet",
                id: 'minecraft:leather_helmet',
                dv: 0,
                cost_buy: 10 * 5,
                cost_sell: 3 * 5,
                max_amount: 1,
                texture: "leather_helmet.tga"
            },
            {
                name: "Turtle Helmet",
                id: 'minecraft:turtle_helmet',
                dv: 0,
                cost_buy: 70 * 5,
                cost_sell: 50 * 5,
                max_amount: 1,
                texture: "turtle_helmet.png"
            },
            {
                name: "Chainmail Helmet",
                id: 'minecraft:chainmail_helmet',
                dv: 0,
                cost_buy: 35 * 5,
                cost_sell: 15 * 5,
                max_amount: 1,
                texture: "chainmail_helmet.png"
            },
            {
                name: "Iron Helmet",
                id: 'minecraft:iron_helmet',
                dv: 0,
                cost_buy: 30 * 5,
                cost_sell: 20 * 5,
                max_amount: 1,
                texture: "iron_helmet.png"
            },
            {
                name: "Golden Helmet",
                id: 'minecraft:golden_helmet',
                dv: 0,
                cost_buy: 40 * 5,
                cost_sell: 30 * 5,
                max_amount: 1,
                texture: "golden_helmet.png"
            },
            {
                name: "Diamond Helmet",
                id: 'minecraft:diamond_helmet',
                dv: 0,
                cost_buy: 60 * 5,
                cost_sell: 50 * 5,
                max_amount: 1,
                texture: "diamond_helmet.png"
            },
            {
                name: "Netherite Helmet",
                id: 'minecraft:netherite_helmet',
                dv: 0,
                cost_buy: 60 * 5 + 800,
                cost_sell: 50 * 5 + 800,
                max_amount: 1,
                texture: "netherite_helmet.png"
            }
        ],
        armor_chestplate: [{
                name: "Leather chestplate",
                id: 'minecraft:leather_chestplate',
                dv: 0,
                cost_buy: 10 * 8,
                cost_sell: 3 * 8,
                max_amount: 1,
                texture: "leather_chestplate.png"
            },
            {
                name: "Chainmail chestplate",
                id: 'minecraft:chainmail_chestplate',
                dv: 0,
                cost_buy: 35 * 8,
                cost_sell: 15 * 8,
                max_amount: 1,
                texture: "chainmail_chestplate.png"
            },
            {
                name: "Iron chestplate",
                id: 'minecraft:iron_chestplate',
                dv: 0,
                cost_buy: 30 * 8,
                cost_sell: 20 * 8,
                max_amount: 1,
                texture: "iron_chestplate.png"
            },
            {
                name: "Golden chestplate",
                id: 'minecraft:golden_chestplate',
                dv: 0,
                cost_buy: 40 * 8,
                cost_sell: 30 * 8,
                max_amount: 1,
                texture: "golden_chestplate.png"
            },
            {
                name: "Diamond chestplate",
                id: 'minecraft:diamond_chestplate',
                dv: 0,
                cost_buy: 60 * 8,
                cost_sell: 50 * 8,
                max_amount: 1,
                texture: "diamond_chestplate.png"
            },
            {
                name: "Netherite chestplate",
                id: 'minecraft:netherite_chestplate',
                dv: 0,
                cost_buy: 60 * 8 + 800,
                cost_sell: 50 * 8 + 800,
                max_amount: 1,
                texture: "netherite_chestplate.png"
            }
        ],
        armor_leggings: [{
                name: "Leather Leggings",
                id: 'minecraft:leather_leggings',
                dv: 0,
                cost_buy: 10 * 6,
                cost_sell: 3 * 6,
                max_amount: 1,
                texture: "leather_leggings.tga"
            },
            {
                name: "Chainmail Leggings",
                id: 'minecraft:chainmail_leggings',
                dv: 0,
                cost_buy: 35 * 6,
                cost_sell: 15 * 6,
                max_amount: 1,
                texture: "chainmail_leggings.png"
            },
            {
                name: "Iron Leggings",
                id: 'minecraft:iron_leggings',
                dv: 0,
                cost_buy: 30 * 6,
                cost_sell: 20 * 6,
                max_amount: 1,
                texture: "iron_leggings.png"
            },
            {
                name: "Golden Leggings",
                id: 'minecraft:golden_leggings',
                dv: 0,
                cost_buy: 40 * 6,
                cost_sell: 30 * 6,
                max_amount: 1,
                texture: "golden_leggings.png"
            },
            {
                name: "Diamond Leggings",
                id: 'minecraft:diamond_leggings',
                dv: 0,
                cost_buy: 60 * 6,
                cost_sell: 50 * 6,
                max_amount: 1,
                texture: "diamond_leggings.png"
            },
            {
                name: "Netherite Leggings",
                id: 'minecraft:netherite_leggings',
                dv: 0,
                cost_buy: 60 * 6 + 800,
                cost_sell: 50 * 6 + 800,
                max_amount: 1,
                texture: "netherite_leggings.png"
            }
        ],
        armor_boots: [{
                name: "Leather Boots",
                id: 'minecraft:leather_boots',
                dv: 0,
                cost_buy: 10 * 4,
                cost_sell: 3 * 4,
                max_amount: 1,
                texture: "leather_boots.tga"
            },
            {
                name: "Chainmail Boots",
                id: 'minecraft:chainmail_boots',
                dv: 0,
                cost_buy: 35 * 4,
                cost_sell: 15 * 4,
                max_amount: 1,
                texture: "chainmail_boots.png"
            },
            {
                name: "Iron Boots",
                id: 'minecraft:iron_boots',
                dv: 0,
                cost_buy: 30 * 4,
                cost_sell: 20 * 4,
                max_amount: 1,
                texture: "iron_boots.png"
            },
            {
                name: "Golden Boots",
                id: 'minecraft:golden_boots',
                dv: 0,
                cost_buy: 40 * 4,
                cost_sell: 30 * 4,
                max_amount: 1,
                texture: "golden_boots.png"
            },
            {
                name: "Diamond Boots",
                id: 'minecraft:diamond_boots',
                dv: 0,
                cost_buy: 60 * 4,
                cost_sell: 50 * 4,
                max_amount: 1,
                texture: "diamond_boots.png"
            },
            {
                name: "Netherite Boots",
                id: 'minecraft:netherite_boots',
                dv: 0,
                cost_buy: 60 * 4 + 800,
                cost_sell: 50 * 4 + 800,
                max_amount: 1,
                texture: "netherite_boots.png"
            }
        ],
        bucket: [{
                name: "Bucket",
                id: 'minecraft:bucket',
                dv: 0,
                cost_buy: 80,
                cost_sell: 30,
                max_amount: 16,
                texture: "bucket.png"
            },
            {
                name: "Water Bucket",
                id: 'minecraft:bucket',
                dv: 8,
                cost_buy: 90,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_water.png"
            },
            {
                name: "Lava Bucket",
                id: 'minecraft:bucket',
                dv: 10,
                cost_buy: 90,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_lava.png"
            },
            {
                name: "Powder Snow Bucket",
                id: 'minecraft:bucket',
                dv: 11,
                cost_buy: 600,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_powder_snow.png"
            },
            {
                name: "Milk Bucket",
                id: 'minecraft:bucket',
                dv: 1,
                cost_buy: 90,
                cost_sell: 30,
                max_amount: 1,
                texture: "bucket_milk.png"
            },
            {
                name: "Bucket of Axolotl",
                id: 'minecraft:bucket',
                dv: 12,
                cost_buy: 90,
                cost_sell: 300,
                max_amount: 1,
                texture: "bucket_axolotl.png"
            },
            {
                name: "Bucket of Cod",
                id: 'minecraft:bucket',
                dv: 2,
                cost_buy: 100,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_cod.png"
            },
            {
                name: "Bucket of Samalon",
                id: 'minecraft:bucket',
                dv: 3,
                cost_buy: 100,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_samalon.png"
            },
            {
                name: "Bucket of Tropical Fish",
                id: 'minecraft:bucket',
                dv: 4,
                cost_buy: 100,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_tropical.png"
            },
            {
                name: "Bucket of Pufferfish",
                id: 'minecraft:bucket',
                dv: 5,
                cost_buy: 100,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_pufferfish.png"
            },
            {
                name: "Bucket of Tadpole",
                id: 'minecraft:bucket',
                dv: 13,
                cost_buy: 100,
                cost_sell: 40,
                max_amount: 1,
                texture: "bucket_tadpole.png"
            }
        ]
    },
    tool_shop = [{
            name: "Flint And Steel",
            id: 'minecraft:flint_and_steel',
            dv: 0,
            cost_buy: 40,
            cost_sell: 10,
            max_amount: 1,
            texture: "flint_and_steel.png"
        },
        {
            name: "Shears",
            id: 'minecraft:shears',
            dv: 0,
            cost_buy: 80,
            cost_sell: 30,
            max_amount: 1,
            texture: "shears.png"
        },
        {
            name: "compass",
            id: 'minecraft:compass',
            dv: 0,
            cost_buy: 130,
            cost_sell: 40,
            max_amount: 64,
            texture: "compass.png"
        },
        {
            name: "Clock",
            id: 'minecraft:clock',
            dv: 0,
            cost_buy: 170,
            cost_sell: 50,
            max_amount: 64,
            texture: "clock.png"
        },
        {
            name: "Fishing Rod",
            id: 'minecraft:fishing_rod',
            dv: 0,
            cost_buy: 50,
            cost_sell: 20,
            max_amount: 1,
            texture: "fishing_rod.png"
        },
        {
            name: "Trident",
            id: 'minecraft:trident',
            dv: 0,
            cost_buy: 500,
            cost_sell: 200,
            max_amount: 1,
            texture: "trident.png"
        }
    ];
export {
    natural_blocks,
    natural_items,
    building_blocks,
    tools,
    tool_shop
}