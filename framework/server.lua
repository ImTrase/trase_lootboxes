local FRAMEWORK = {}
local ESX, QBCore

local function loadESX()
    local _, ESX = pcall(function()
        return exports['es_extended']:getSharedObject()
    end)

    if not ESX then
        AddEventHandler('esx:getSharedObject', function(obj)
            ESX = obj
        end)
    end

    return ESX
end

local function loadQBCore()
    local _, QBCore = pcall(function()
        return exports['qb-core']:GetCoreObject()
    end)

    return QBCore
end

if Config.Framework == 'auto' then
    if loadESX() then
        Config.Framework = 'esx'
    elseif loadQBCore() then
        Config.Framework = 'qbcore'
    end
end

if Config.Framework == 'esx' then
    ESX = loadESX()

    FRAMEWORK.getPlayer = function(target)
        if not target then return end
        local xPlayer = ESX.GetPlayerFromId(target)
        if not xPlayer then return end
        return xPlayer
    end

    local money_found = { 'money', 'black_money', 'bank' }

    FRAMEWORK.addItem = function(target, item, amount)
        if item == 'cash' then item = 'money' end -- Conversion for QBCore
        local xPlayer = FRAMEWORK.getPlayer(target)
        if not xPlayer then return end

        if type(item) == 'string' then
            if item == money_found then
                xPlayer.addAccountMoney(item, amount)
            else
                xPlayer.addInventoryItem(item, amount)
            end
        end
    end

    FRAMEWORK.getItem = function(target, item)
        if item == 'cash' then item = 'money' end -- Conversion for QBCore
        local xPlayer = FRAMEWORK.getPlayer(target)
        if not xPlayer then return end

        if type(item) == 'string' then
            if item == money_found then
                return xPlayer.getAccount(item).money
            else
                local itemData = xPlayer.getInventoryItem(item)
                if not itemData then return end
                return itemData.count
            end
        end
    end

    FRAMEWORK.removeItem = function(target, item, amount)
        if item == 'cash' then item = 'money' end -- Conversion for QBCore
        local xPlayer = FRAMEWORK.getPlayer(target)
        if not xPlayer then return end

        if type(item) == 'string' then
            if item == money_found then
                xPlayer.removeAccountMoney(item, amount)
            else
                xPlayer.removeInventoryItem(item, amount)
            end
        end
    end

    FRAMEWORK.addItemUseCallback = function(item, callback)
        ESX.RegisterUsableItem(item, callback)
    end
elseif Config.Framework == 'qbcore' then
    QBCore = loadQBCore()

    FRAMEWORK.getPlayer = function(target)
        if not target then return end
        local player = QBCore.Functions.GetPlayer(target)
        if not player then return end
        return player
    end

    FRAMEWORK.addItem = function(target, item, amount)
        local player = FRAMEWORK.getPlayer(target)
        if not player then return end

        if type(item) == 'string' then
            player.Functions.AddItem(item, amount)
        end
    end

    FRAMEWORK.getItem = function(target, item)
        local player = FRAMEWORK.getPlayer(target)
        if not player then return end

        if type(item) == 'string' then
            local itemData = player.Functions.GetItemByName(item)
            if not itemData then return 0 end
            return itemData.amount or 0
        end
    end

    FRAMEWORK.removeItem = function(target, item, amount)
        local player = FRAMEWORK.getPlayer(target)
        if not player then return end

        if type(item) == 'string' then
            player.Functions.RemoveItem(item, amount)
        end
    end

    FRAMEWORK.addMoney = function(target, moneyType, amount)
        local player = FRAMEWORK.getPlayer(target)
        if not player then return end

        if moneyType == 'cash' or moneyType == 'bank' or moneyType == 'crypto' then
            player.Functions.AddMoney(moneyType, amount)
        end
    end

    FRAMEWORK.getMoney = function(target, moneyType)
        local player = FRAMEWORK.getPlayer(target)
        if not player then return 0 end

        if moneyType == 'cash' or moneyType == 'bank' or moneyType == 'crypto' then
            return player.PlayerData.money[moneyType] or 0
        end
    end

    FRAMEWORK.removeMoney = function(target, moneyType, amount)
        local player = FRAMEWORK.getPlayer(target)
        if not player then return end

        if moneyType == 'cash' or moneyType == 'bank' or moneyType == 'crypto' then
            player.Functions.RemoveMoney(moneyType, amount)
        end
    end

    FRAMEWORK.addItemUseCallback = function(item, callback)
        QBCore.Functions.CreateUseableItem(item, callback)
    end
end

return FRAMEWORK