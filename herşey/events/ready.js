const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, ActivityType, Status } = require ("discord.js")
const { joinVoiceChannel } = require("@discordjs/voice")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const Log = require("../gerekliler/log.json")
const db = require("croxydb")
const { autoSaver } = require("../gerekliler/yedek")
const config = require("../ayar/config.json")
require("advanced-logs")
console.setConfig({
  background: false,
  timestamp: false
})

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
      
  const channels = client.channels.cache.get(config.sesID)
    
  const VoiceConnection = joinVoiceChannel({
    channelId: channels.id,
    guildId: channels.guild.id,
    adapterCreator: channels.guild.voiceAdapterCreator,
  });
      
      const list = [
        "VenDev | VenCode",
        "kesintisiz uptime",
        `${db.fetch(`UptimeLink`).length || 0} link aktif ediyor`,
          `${client.guilds.cache.size} Sunucu uptime hizmeti veriyor`
      ]
      
      setInterval(() => {
              client.user.setPresence({
              activities: 
              [
           {
            name: list[Math.floor(Math.random() * list.length)], 
            type: ActivityType.Playing,
            Status: "dnd"
          }
        ]
    })
      }, 20000)
    console.success(``, ` bot aktif dostum uptime zamanı!`)
    const başlama = `<t:${Math.floor(client.readyAt / 1000)}:R>`
    const Durum = new EmbedBuilder()
      .setColor(Colors.Green)
      .setDescription(` yeniden aktifim başlama: ${başlama}`) 
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
     client.channels.cache.get(Logs.OtoDurum).send({embeds: [Durum]})
      
    setInterval(() => {autoSaver(client)}, 86400000) 

  }
}

console.log("aktif")
console.log("destek için = gg/vencode")