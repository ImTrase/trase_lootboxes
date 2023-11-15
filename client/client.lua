local function toggleNuiFrame(shouldShow, crateToOpen)
	SetNuiFocus(shouldShow, shouldShow)
	SendNUIMessage({ action = 'setVisible', data = { isVisible = shouldShow, crateKey = crateToOpen } })
end

RegisterNUICallback('hideFrame', function(_, cb)
	toggleNuiFrame(false)
	cb({})
end)

RegisterNUICallback('collectItems', function(data, cb)
	toggleNuiFrame(false)
	TriggerServerEvent('trase_lootboxes:server:reward', data)
	cb({})
end)

RegisterNUICallback('trase_lootboxes:client:checkRequirements', function(data, cb)
	local canOpen = lib.callback.await('trase_lootboxes:server:passRequirements', false, data)
	cb(canOpen)
end)

RegisterNUICallback('getConfigFile', function(data, cb)
	cb(Config)
end)

RegisterNetEvent('trase_lootboxes:client:openUI', function()
	if Config.UseableItems then return end
	toggleNuiFrame(true)
end)

RegisterNetEvent('trase_lootboxes:client:itemUsed', function(crateId)
	if not Config.UseableItems then return end
	toggleNuiFrame(true, crateId)
end)

RegisterNetEvent('trase_lootboxes:client:notify', Config.Notification)