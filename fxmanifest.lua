fx_version 'cerulean'
games { 'gta5' }
author 'Trase'
lua54 'yes'
version '1.0.0'

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
	'locales/*.json',
	'web/build/index.html',
	'web/build/**/*',
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