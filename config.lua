Config = {}

Config.Framework = 'auto' -- auto, esx, qbcore (custom setup in framework folder)
Config.EnableSpinningSound = true -- When selecting a reward after opening a crate, play a spinning sound
Config.UseableItems = true -- Use items instead of UI to open crates
Config.Command = 'lootbox' -- Command to open the UI (only if UseableItems is false)

Config.UI = { -- Change the UI to your liking
    Sidebar = 'linear-gradient(150deg, #0038FF -3.19%, rgba(0, 0, 0, 0.50) 62.7%)',
    Main = 'linear-gradient(130deg, #0038FF -3.19%, rgba(0, 0, 0, 0.50) 62.7%)',
}

Config.RarityOdds = { -- Change the odds to your liking (MUST add up to 1)
    ['legendary'] = 0.07,
    ['epic'] = 0.1,
    ['rare']  = 0.13,
    ['uncommon'] = 0.2,
    ['common'] = 0.5,
}

Config.Strings = {
    ['sidebar_title'] = 'Lootboxes',
    ['sidebar_description'] = 'Open lootboxes and get a chance to win rewards!',

    ['selection_title'] = 'Lootboxes',
    ['selection_description'] = 'Select the lootbox!',

    ['crate_description'] = 'Lootbox', -- The title of the card is the "text" in crates!
    ['crate_button_select'] = 'SELECT CRATE',

    ['selectedCrate_title'] = 'Selected Crate',
    ['selectedCrate_description'] = 'Viewing {LOOTBOX_NAME} lootbox.',
    ['selectedCrate_rewards'] = 'Rewards',
    ['selectedCrate_requirements'] = 'Requirements',
    ['selectedCrate_button_open'] = 'Open Crate',

    ['selector_title'] = 'Opening',
    ['selector_description'] = 'Wait for the wheel to stop scrolling!',

    ['winnings_title'] = 'YOUR WINNINGS',
    ['winnings_button_claim'] = 'Claim',

    ['winnings_notification_title'] = 'You Won!',
    ['winnings_notification_description'] = 'You have won {AMOUNT}x {ITEM}!',

    ['requirements_notification_title'] = 'Requirements not met!',
    ['requirements_notification_description'] = 'You need {AMOUNT}x {ITEM} to open this crate!',

    ['discord_logs_title'] = 'Item Won!',
    ['discord_logs_description'] = 'A player has opened a lootbox and received a reward!',
}

Config.Crates = {
    {
        text = 'Legendary',
        -- image = 'https://imgur.com/siLz0Wa.png', -- If Config.UseableItems is set to true, you can remove this line
        -- color = 'linear-gradient(158deg, #D24C00 8.96%, #6A2600 85.48%)', -- If Config.UseableItems is set to true, you can remove this line
        -- border = '0.7px solid #FFBD80', -- If Config.UseableItems is set to true, you can remove this line
        -- hoverColor = '#804719', -- If Config.UseableItems is set to true, you can remove this line
        item = 'legendary_key', -- If you want to use an item to open the crate, uncomment this line and change the item to the item you want to use (make sure Config.UseableItems is set to true)
        requirements = {
            { tier = 'requirement', item = 'legendary_key', itemLabel = 'Legendary Key', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', item = 'WEAPON_ASSAULTRIFLE', itemLabel = 'Assault Rifle', amount = '1' },
            { tier = 'legendary', item = 'WEAPON_CARBINERIFLE', itemLabel = 'Carbine Rifle', amount = '1' },
            { tier = 'epic', item = 'WEAPON_APPISTOL', itemLabel = 'AP Pistol', amount = '1' },
            { tier = 'epic', item = 'WEAPON_MINISMG', itemLabel = 'Mini SMG', amount = '1' },
            { tier = 'rare', item = 'ammo-rifle', itemLabel = 'Rifle Ammo', amount = '250' },
            { tier = 'rare', item = 'WEAPON_COMBATPISTOL', itemLabel = 'Combat Pistol', amount = '1' },
            { tier = 'common', item = 'ammo-9', itemLabel = 'Pistol Ammo', amount = '75' },
            { tier = 'common', item = 'WEAPON_PISTOL', itemLabel = 'Pistol', amount = '1' },
            { tier = 'uncommon', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', item = 'apple', itemLabel = 'Apple', amount = '25' },
        },
    },
    {
        text = 'Epic',
        image = 'https://imgur.com/p810vpT.png',
        color = 'linear-gradient(158deg, #A803FD 8.96%, #4101FF 85.48%)',
        border = '0.7px solid #ED80FF',
        hoverColor = '#67009c',
        requirements = {
            { tier = 'requirement', item = 'epic_key', itemLabel = 'Epic Key', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', item = 'armour', itemLabel = 'Armor', amount = '5' },
            { tier = 'epic', item = 'ammo-9', itemLabel = 'Pistol Ammo', amount = '20' },
            { tier = 'rare', item = 'ammo-rifle', itemLabel = 'Rifle Ammo', amount = '20' },
            { tier = 'common', item = 'money', itemLabel = 'Money', amount = '2500' },
            { tier = 'uncommon', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', item = 'apple', itemLabel = 'Apple', amount = '25' },
        },
    },
    {
        text = 'Rare',
        image = 'https://imgur.com/1LlkHs9.png',
        color = 'linear-gradient(158deg, #005CEA 8.96%, #002F8B 85.48%)',
        border = '0.7px solid #80C2FF',
        hoverColor = '#003d9c',
        requirements = {
            { tier = 'requirement', item = 'rare_key', itemLabel = 'Rare Key', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', item = 'armour', itemLabel = 'Armor', amount = '5' },
            { tier = 'epic', item = 'ammo-9', itemLabel = 'Pistol Ammo', amount = '20' },
            { tier = 'rare', item = 'ammo-rifle', itemLabel = 'Rifle Ammo', amount = '20' },
            { tier = 'common', item = 'money', itemLabel = 'Money', amount = '2500' },
            { tier = 'uncommon', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', item = 'apple', itemLabel = 'Apple', amount = '25' },
        },
    },
    {
        text = 'Uncommon',
        image = 'https://imgur.com/IW6BtE9.png',
        color = 'linear-gradient(158deg, #15bd02 8.96%, #058b00 85.48%)',
        border = '0.7px solid #19fa00',
        hoverColor = '#058b00',
        requirements = {
            { tier = 'requirement', item = 'uncommon_key', itemLabel = 'Uncommon Key', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', item = 'armour', itemLabel = 'Armor', amount = '5' },
            { tier = 'epic', item = 'ammo-9', itemLabel = 'Pistol Ammo', amount = '20' },
            { tier = 'rare', item = 'ammo-rifle', itemLabel = 'Rifle Ammo', amount = '20' },
            { tier = 'common', item = 'money', itemLabel = 'Money', amount = '2500' },
            { tier = 'uncommon', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', item = 'apple', itemLabel = 'Apple', amount = '25' },
        },
    },
    {
        text = 'Common',
        image = 'https://imgur.com/WBHACcw.png',
        color = 'linear-gradient(158deg, #A1A1A1 8.96%, #474747 85.48%)',
        border = '0.7px solid #fff',
        hoverColor = '#4f4f4f',
        requirements = {
            { tier = 'requirement', item = 'common_key', itemLabel = 'Common Key', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', item = 'armour', itemLabel = 'Armor', amount = '5' },
            { tier = 'epic', item = 'ammo-9', itemLabel = 'Pistol Ammo', amount = '20' },
            { tier = 'rare', item = 'ammo-rifle', itemLabel = 'Rifle Ammo', amount = '20' },
            { tier = 'common', item = 'money', itemLabel = 'Money', amount = '2500' },
            { tier = 'uncommon', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', item = 'apple', itemLabel = 'Apple', amount = '25' },
        },
    },
}

Config.Notification = function(data)
    -- data.type, data.title, data.description
    lib.notify(data)
end

