-- This is server-sided because we don't want modders to be able to get the discord webhook.
while (not Config) do Wait(0) end
Config.Server = {}

Config.Server.Discord = {
    Enabled = true,
    Webhook = 'https://discord.com/api/webhooks/1173817576225243227/yCJtNAY9s5JpzV4IZTKAzJ3dRO9opSvG39smuXrmAJDCUQnx2TT1wB6srL8kF1InTx1a'
}