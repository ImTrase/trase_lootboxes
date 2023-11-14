local FRAMEWORK <const> = require 'framework.server'
local legit = {}


local function getIdentifiers(player)
    local t = {}

    if player then
        local identifiers = GetPlayerIdentifiers(player)

        for i=1, #identifiers do
            local prefix, identifier = string.strsplit(':', identifiers[i])
            t[prefix] = identifier
        end
    end

    return t
end

local function returnIds(target)
    local t = {}

    local identifiers = getIdentifiers(target)

    for k, v in pairs(identifiers) do
        if k == 'steam' then
            t[#t+1] = ('Steam: [%s](https://steamcommunity.com/profiles/%s)'):format(v, tonumber(v, 16))
        elseif k == 'discord' then
            t[#t+1] = ('Discord: <@%s>'):format(v)
        elseif k == 'license' then
            t[#t+1] = ('License: %s'):format(v)
        elseif k == 'license2' then
            t[#t+1] = ('License 2: %s'):format(v)
        elseif k == 'fivem' then
            t[#t+1] = ('FiveM: %s'):format(v)
        elseif k == 'xbl' then
            t[#t+1] = ('Xbox: %s'):format(v)
        elseif k == 'live' then
            t[#t+1] = ('Live: %s'):format(v)
        end
    end

    return table.concat(t, '\n')
end

local  function discordLog(args, cb)
    if (not args or type(args) ~= 'table') then return end

    local embed = {
        color = '0',
        type = 'rich',
        title = args?.title or '',
        description = args?.description or '',
        timestamp = os.date('!%Y-%m-%dT%H:%M:%S'),
        footer = {
            text = 'Trase.Dev © 2023', 
            icon_url = 'https://cdn.discordapp.com/attachments/1119540289196003410/1157097126363406457/logo.png?ex=65175e2c&is=65160cac&hm=5acffe6f61ae2989aab52dc1fb41136910754f7848e7f4071bbd90028c0a20c9&'
        }
    }

    if type(args?.fields) == 'table' and #args?.fields >= 1 then
        embed.fields = args?.fields
    end

    local data = {}
    local encodedData = {
        username = 'Lootboxes 📦', 
        avatar_url = 'https://cdn.discordapp.com/attachments/1119540289196003410/1157097126363406457/logo.png?ex=65175e2c&is=65160cac&hm=5acffe6f61ae2989aab52dc1fb41136910754f7848e7f4071bbd90028c0a20c9&',
        embeds = { embed } 
    }
 
    PerformHttpRequest(args?.webhook, function(statusCode, responseText, headers)
        data = { statusCode = statusCode, responseText = responseText, headers = headers }
    end, 'POST', json.encode(encodedData), { ['Content-Type'] = 'application/json' })
end

RegisterCommand('lootboxes', function(src)
    TriggerClientEvent('trase_lootboxes:client:openUI', src)
    legit[src] = true
end, false)

RegisterNetEvent('trase_lootboxes:server:reward', function(args)
    local src = source
    local item = json.decode(args.data)
    if not legit[src] then return end -- Modder
 
    FRAMEWORK.addItem(src, item.item, item.amount)
    local receiveNotification = Config.Strings['winnings_notification_description']:gsub('{AMOUNT}', item.amount):gsub('{ITEM}', item.itemLabel)
    TriggerClientEvent('trase_lootboxes:client:notify', src, { type = 'success', title = Config.Strings['winnings_notification_title'], description = receiveNotification })

    if Config.Server.Discord.Enabled then
        local fields = {}
        fields[#fields +1] = { name = 'Player', value = ('%s (Id: %s)'):format(GetPlayerName(src), src), inline = false }
        fields[#fields +1] = { name = 'Item Won', value = ('```Item: %s | Item Amount: %s | Item Rarity: %s```'):format(item.amount, item.itemLabel, item.tier), inline = false }
        fields[#fields +1] = { name = 'Player Identifiers', value = returnIds(src), inline = false }

        discordLog({
            title = Config.Strings['discord_logs_title'],
            description = Config.Strings['discord_logs_description'],
            webhook = Config.Server.Discord.Webhook,
            fields = fields
        })
    end
end)

lib.callback.register('trase_lootboxes:server:passRequirements', function(source, args)
    local src = source

    local boxId = args.data + 1 -- Because lua index starts at 1 instead of 0
    local crate = Config.Crates[boxId]
    local requirements = crate.requirements

    local canOpen = true

    for _, requirement in pairs(requirements) do
        if requirement.tier == 'requirement' then
            local amount = FRAMEWORK.getItem(src, requirement.item)
            if tonumber(amount) < tonumber(requirement.amount) then
                canOpen = false
                local receiveNotification = Config.Strings['requirements_notification_description']:gsub('{AMOUNT}', requirement.amount):gsub('{ITEM}', requirement.itemLabel)
                TriggerClientEvent('trase_lootboxes:client:notify', src, { type = 'error', title = Config.Strings['requirements_notification_title'], description = receiveNotification })
            end
        end
    end

    if canOpen then
        for _, requirement in pairs(requirements) do
            if requirement.tier == 'requirement' then
                FRAMEWORK.removeItem(src, requirement.item, requirement.amount)
            end
        end
    end

    return canOpen
end)