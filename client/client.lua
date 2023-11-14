local function toggleNuiFrame(shouldShow)
	SetNuiFocus(shouldShow, shouldShow)
	SendNUIMessage({ action = 'setVisible', data = shouldShow })
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
	toggleNuiFrame(true)
end)

RegisterNetEvent('trase_lootboxes:client:notify', Config.Notification)