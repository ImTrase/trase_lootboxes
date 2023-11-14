fx_version 'cerulean'
games { 'gta5' }
author 'Trase'
lua54 'yes'
version '1.0.0'

ui_page 'web/build/index.html'

shared_script '@ox_lib/init.lua'

client_script "client/**/*"
server_script "server/**/*"

files {
	'locales/*.json',
	'web/build/index.html',
	'web/build/**/*',
}