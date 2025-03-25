fx_version 'cerulean'
game 'gta5'

author 'Trase'
description 'An advanced and unique lootbox system for your FiveM server.'
lua54 'yes'
version '1.0.2'

ui_page 'web/build/index.html'

shared_scripts {
	'@ox_lib/init.lua',
	'config.lua',
}

client_script "client/**/*"
server_scripts {
	"config.server.lua",
	"server/**/*"
}

files {
	'web/build/index.html',
	'web/build/**/*',
}

escrow_ignore {
    'framework/*.lua',
    'config.lua',
    'server/versions.lua',
}

--[[
	Features:
	- Optimized at 0.00ms
	- Secure & Protected
	- Highly Configurable
	- Configurable lootboxes
	- Configurable rewards
	- Configurable requirements
	- Configurable UI
	- Useable Items
	- Configurable sounds
	- Configurable rarity odds
	- Configurable useable items
	- Configurable discord logs
	- Configurable locales
	- ESX/QBCore Compatible
	- Configurable all images
	- Configurable notification
]]
