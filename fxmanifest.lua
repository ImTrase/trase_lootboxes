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
	Todo List:
	- Fix the button, positioning is fucked
	- Useable items instead of UI
	- Configurable rarity odds
]]