Config = {}

Config.Framework = 'auto' -- auto, esx, qbcore (custom setup in framework folder)
Config.ImageURL = 'nui://ox_inventory/web/image/' -- folder, url (folder = images in html/images, url = images in the url specified below)

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
        image = 'https://imgur.com/siLz0Wa.png',
        color = 'linear-gradient(158deg, #D24C00 8.96%, #6A2600 85.48%)',
        border = '0.7px solid #FFBD80',
        hoverColor = '#804719',
        requirements = {
            { tier = 'requirement', item = 'legendary_key', itemLabel = 'Legendary Key', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', image = 'https://imgur.com/siLz0Wa.png', item = 'WEAPON_ASSAULTRIFLE', itemLabel = 'Assault Rifle', amount = '1' },
            { tier = 'legendary', image = 'https://imgur.com/siLz0Wa.png', item = 'WEAPON_CARBINERIFLE', itemLabel = 'Carbine Rifle', amount = '1' },
            { tier = 'epic', image = 'https://imgur.com/siLz0Wa.png', item = 'WEAPON_APPISTOL', itemLabel = 'AP Pistol', amount = '1' },
            { tier = 'epic', image = 'https://imgur.com/siLz0Wa.png', item = 'WEAPON_MINISMG', itemLabel = 'Mini SMG', amount = '1' },
            { tier = 'rare', image = 'https://imgur.com/siLz0Wa.png', item = 'ammo-rifle', itemLabel = 'Rifle Ammo', amount = '250' },
            { tier = 'rare', image = 'https://imgur.com/siLz0Wa.png', item = 'WEAPON_COMBATPISTOL', itemLabel = 'Combat Pistol', amount = '1' },
            { tier = 'common', image = 'https://imgur.com/siLz0Wa.png', item = 'ammo-9', itemLabel = 'Pistol Ammo', amount = '75' },
            { tier = 'common', image = 'https://imgur.com/siLz0Wa.png', item = 'WEAPON_PISTOL', itemLabel = 'Pistol', amount = '1' },
            { tier = 'uncommon', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', image = 'https://imgur.com/siLz0Wa.png', item = 'apple', itemLabel = 'Apple', amount = '25' },
            { tier = 'uncommon', image = 'https://imgur.com/siLz0Wa.png', item = 'bandana', itemLabel = 'Bandana', amount = '1' },
        },
    },
    {
        text = 'Epic',
        image = 'https://imgur.com/p810vpT.png',
        color = 'linear-gradient(158deg, #A803FD 8.96%, #4101FF 85.48%)',
        border = '0.7px solid #ED80FF',
        hoverColor = '#67009c',
        requirements = {
            { tier = 'requirement', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'epic', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'rare', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'common', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '5' },
            { tier = 'uncommon', image = 'https://imgur.com/siLz0Wa.png', item = 'water', itemLabel = 'Water', amount = '5' },
        },
    },
    {
        text = 'Rare',
        image = 'https://imgur.com/1LlkHs9.png',
        color = 'linear-gradient(158deg, #005CEA 8.96%, #002F8B 85.48%)',
        border = '0.7px solid #80C2FF',
        hoverColor = '#003d9c',
        requirements = {
            { tier = 'requirement', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'epic', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'rare', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'common', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'uncommon', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
        },
    },
    {
        text = 'Uncommon',
        image = 'https://imgur.com/IW6BtE9.png',
        color = 'linear-gradient(158deg, #15bd02 8.96%, #058b00 85.48%)',
        border = '0.7px solid #19fa00',
        hoverColor = '#058b00',
        requirements = {
            { tier = 'requirement', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'epic', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'rare', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'common', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'uncommon', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
        },
    },
    {
        text = 'Common',
        image = 'https://imgur.com/WBHACcw.png',
        color = 'linear-gradient(158deg, #A1A1A1 8.96%, #474747 85.48%)',
        border = '0.7px solid #fff',
        hoverColor = '#4f4f4f',
        requirements = {
            { tier = 'requirement', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '1' },
        },
        rewards = {
            { tier = 'legendary', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'epic', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'rare', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'common', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
            { tier = 'uncommon', image = 'https://i.imgur.com/M7bABmb.png', item = 'Sourpatch', amount = '5' },
        },
    },
}

Config.Notification = function(data)
    -- data.type, data.title, data.description
    lib.notify(data)
end