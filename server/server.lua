local FRAMEWORK <const> = require 'framework.server'
local legit = {}

local CreateThread <const> = CreateThread
local Wait <const> = Wait
local os <const> = os
local print <const> = print
local type <const> = type
local json <const> = json
local table <const> = table
local string <const> = string
local tonumber <const> = tonumber
local GetPlayerIdentifiers <const> = GetPlayerIdentifiers
local GetPlayerName <const> = GetPlayerName
local PerformHttpRequest <const> = PerformHttpRequest
local RegisterCommand <const> = RegisterCommand
local RegisterNetEvent <const> = RegisterNetEvent
local TriggerClientEvent <const> = TriggerClientEvent

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


if not Config.UseableItems then
    RegisterCommand(Config.Command, function(src)
        TriggerClientEvent('trase_lootboxes:client:openUI', src)
        legit[src] = true
    end, false)
else
    local createdItems = {}
    local amount = 0
    for crateId, crate in pairs(Config.Crates) do
        if not crate.item then
            print(('^1[trase_lootboxes] ^3WARNING: ^7You have a lootbox without an item. Please add an item to the lootbox: %s.'):format(crate.text))
        else
            if not createdItems[crate.item] then
                createdItems[crate.item] = true
                amount += 1
                FRAMEWORK.addItemUseCallback(crate.item, function(source, args)
                    TriggerClientEvent('trase_lootboxes:client:itemUsed', source, crateId -1 --[[ Because lua index starts at 1 instead of 0 ]])
                    legit[source] = true
                end)
            else
                print(('^1[trase_lootboxes] ^3WARNING: ^7You have multiple lootboxes with the same item. Please remove one of them. Item: %s'):format(crate.item))
            end
        end
    end

    print(('^4[trase_lootboxes] ^2[SUCCESS]: ^7%s items have been registered for lootboxes.'):format(amount))
end

RegisterNetEvent('trase_lootboxes:server:reward', function(args)
    local src = source
    local item = json.decode(args.data)
    if not legit[src] then return end -- Modder
 
    FRAMEWORK.addItem(src, item.item, item.amount)
    local receiveNotification = Config.Strings['winnings_notification_description']:gsub('{AMOUNT}', item.amount):gsub('{ITEM}', item.itemLabel)
    TriggerClientEvent('trase_lootboxes:client:notify', src, { type = 'success', title = Config.Strings['winnings_notification_title'], description = receiveNotification })
    legit[src] = nil
    
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


local function errorLog(msg)
    CreateThread(function()
        while true do
            Wait(4500)
            print(('^4[Trase_Lootboxes]^0: ^1[ERROR]^7: %s'):format(msg))
            print('^4[Trase_Lootboxes]^0: ^3[DOCUMENTATION]^7: For installation guides & more visit our documentation https://docs.trase.dev/.')
            print('^4[Trase_Lootboxes]^0: ^2[SUPPORT]^7: For support contact us on discord https://discord.gg/trase/.')
        end
    end)
end

-- Continue Config verification
CreateThread(function()
    local t = type

    local startTime = os.microtime()

    -- Check Config.Framework
    if (t(Config.Framework) ~= 'string') then
        return errorLog('^3Config.Framework^0 is not a ^1string^0')
    end

    -- Check Config.EnableSpinningSound
    if (t(Config.EnableSpinningSound) ~= 'boolean') then
        return errorLog('^3Config.EnableSpinningSound^0 is not a ^1boolean^0.')
    end

    -- Check Config.UI
    if (t(Config.UI) ~= 'table') then
        return errorLog('^3Config.UI^0 is not a ^1table^0.')
    end

    -- Check Config.RarityOdds
    if (t(Config.RarityOdds) ~= 'table') then
        return errorLog('^3Config.RarityOdds^0 is not a ^1table^0.')
    else
        local totalOdds = 0
        for _, odd in pairs(Config.RarityOdds) do
            if (t(odd) ~= 'number') then
                return errorLog('^3Config.RarityOdds^0 is not set to a ^1integer^0.')
            end
            totalOdds = totalOdds + odd
        end
        if math.abs(totalOdds - 1) > 0.0001 then
            return errorLog('^3Config.RarityOdds^0 do not add up to ^11^0.')
        end
    end

    -- Check Config.Strings
    if (t(Config.Strings) ~= 'table') then
        return errorLog('^3Config.Strings^0 is not a ^1table^0.')
    end

    -- Check Config.Crates
    if (t(Config.Crates) ~= 'table') then
        return errorLog('^3Config.Crates^0 is not a ^1table^0.')
    else
        for crateId, crate in ipairs(Config.Crates) do
            if (t(crate) ~= 'table') then
                return errorLog('^3Config.Crates[' .. crateId .. ']^0 is not a ^1table^0.')
            end

            if (t(crate.text) ~= 'string') then
                return errorLog('^3Config.Crates[' .. crateId .. '].text^0 is not a ^1string^0.')
            end

            if not Config.UseableItems then
                if (t(crate.image) ~= 'string') then
                    return errorLog('^3Config.Crates[' .. crateId .. '].image^0 is not a ^1string^0.')
                end

                if (t(crate.color) ~= 'string') then
                    return errorLog('^3Config.Crates[' .. crateId .. '].color^0 is not a ^1string^0.')
                end

                if (t(crate.border) ~= 'string') then
                    return errorLog('^3Config.Crates[' .. crateId .. '].border^0 is not a ^1string^0.')
                end

                if (t(crate.hoverColor) ~= 'string') then
                    return errorLog('^3Config.Crates[' .. crateId .. '].hoverColor^0 is not a ^1string^0.')
                end
            else
                if not crate.item then
                    return errorLog('^3Config.Crates[' .. crateId .. '].item^0 is not set.')
                else
                    if (t(crate.item) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].item^0 is not a ^1string^0.')
                    end
                end
            end

            if (t(crate.requirements) ~= 'table') then
                return errorLog('^3Config.Crates[' .. crateId .. '].requirements^0 is not a ^1table^0.')
            else
                for requirementId, requirement in ipairs(crate.requirements) do
                    if (t(requirement) ~= 'table') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].requirements[' .. requirementId .. ']^0 is not a ^1table^0.')
                    end

                    if (t(requirement.tier) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].requirements[' .. requirementId .. '].tier^0 is not a ^1string^0.')
                    end

                    if (t(requirement.item) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].requirements[' .. requirementId .. '].item^0 is not a ^1string^0.')
                    end

                    if (t(requirement.amount) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].requirements[' .. requirementId .. '].amount^0 is not a ^1string^0.')
                    end
                end
            end

            if (t(crate.rewards) ~= 'table') then
                return errorLog('^3Config.Crates[' .. crateId .. '].rewards^0 is not a ^1table^0.')
            else
                for rewardId, reward in ipairs(crate.rewards) do
                    if (t(reward) ~= 'table') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].rewards[' .. rewardId .. ']^0 is not a ^1table^0.')
                    end

                    if (t(reward.tier) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].rewards[' .. rewardId .. '].tier^0 is not a ^1string^0.')
                    end

                    if (t(reward.item) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].rewards[' .. rewardId .. '].item^0 is not a ^1string^0.')
                    end

                    if (t(reward.amount) ~= 'string') then
                        return errorLog('^3Config.Crates[' .. crateId .. '].rewards[' .. rewardId .. '].amount^0 is not a ^1string^0.')
                    end
                end
            end
        end
    end

    -- Check Config.Notification
    if (t(Config.Notification) ~= 'function') then
        return errorLog('^3Config.Notification^0 is not a ^1function^0.')
    end

    local loadedTime = os.microtime() - startTime

    print(('^4[Trase_Lootboxes] ^2[SUCCESS]^0: Config loaded, loaded in %sms!'):format(loadedTime))
    print('^4[Trase_Lootboxes] ^3[DOCUMENTATION]^0: For installation guides & more visit our documentation https://docs.trase.dev/.')
    print('^4[Trase_Lootboxes] ^2[SUPPORT]^0: For support contact us on discord https://discord.gg/trase/.')
end)