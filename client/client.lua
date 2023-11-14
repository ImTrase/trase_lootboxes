local function toggleNuiFrame(shouldShow, selctionMenu)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('lootboxes', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end, false)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNUICallback('collectItems', function(data, cb)
  toggleNuiFrame(false)
  print('recive')
  local item = data.data
  print(item)
  cb({})
end)

local Config = {
	Crates = {
		{
			text = 'Legendary',
			image = 'https://imgur.com/siLz0Wa.png',
			color = 'linear-gradient(158deg, #D24C00 8.96%, #6A2600 85.48%)',
			border = '0.7px solid #FFBD80',
			hoverColor = '#804719',
			requirements = {
				{ tier = 'requirement', image = 'https://imgur.com/siLz0Wa.png', item = 'Sourpatch', amount = '1' },
			},
			rewards = {
				{ tier = 'legendary', image = 'https://imgur.com/siLz0Wa.png', item = 'Sourpatch', amount = '5' },
				{ tier = 'epic', image = 'https://imgur.com/siLz0Wa.png', item = 'Sourpatch', amount = '5' },
				{ tier = 'rare', image = 'https://imgur.com/siLz0Wa.png', item = 'Sourpatch', amount = '5' },
				{ tier = 'common', image = 'https://imgur.com/siLz0Wa.png', item = 'Sourpatch', amount = '5' },
				{ tier = 'uncommon', image = 'https://imgur.com/siLz0Wa.png', item = 'Sourpatch', amount = '5' },
			},
		},
		{
			text = 'Epic',
			image = 'https://imgur.com/p810vpT.png',
			color = 'linear-gradient(158deg, #A803FD 8.96%, #4101FF 85.48%)',
			border = '0.7px solid #ED80FF',
			hoverColor = '#67009c',
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
			text = 'Common',
			image = 'https://imgur.com/zAl2Wki.png',
			color = 'linear-gradient(158deg, #11D900 8.96%, #008B16 85.48%)',
			border = '0.7px solid #91FF80',
			hoverColor = '#004f0d',
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
			image = 'https://imgur.com/siLz0Wa.png',
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
}

RegisterNUICallback('getConfigFile', function(data, cb)
	cb(Config)
end)