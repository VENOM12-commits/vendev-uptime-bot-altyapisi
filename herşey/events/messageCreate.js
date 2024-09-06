const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const { prefix, topgg, botid, sahipID, supportServer } = require("../ayar/config.json")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const db = require("croxydb")

module.exports = {
  name: "messageCreate",
  async execute(message, client, dbl) {
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return
    let command = message.content.split(" ")[0].slice(prefix.length)
    let args = message.content.split(" ").slice(1)
    let cmd = client.commands.get(command)
    if (!cmd) return
    
    const Buton = new ActionRowBuilder()
      .addComponents(new ButtonBuilder()        
        .setURL(config.supportServer)
        .setLabel(`Destek sunucusu`)
        .setStyle("Link"))  
        
    if(db.fetch(`Karaliste_${message.author.id}`)) {
      const Kullanamazsın = new EmbedBuilder()
        .setColor(Colors.Red)
        .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()}) 
        .setDescription(`${Emojis.Ünlem} \`${db.fetch(`KaralisteSebep`)}\` tüh be sahibim seni karaliste almış uptime edemesin :(`)
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
        .setTimestamp()
      if(config.sahipID) {
      await message.reply({embeds: [Kullanamazsın], components: [Buton]})
      }
    }
    
    if(db.fetch(`Bakım`)) {
      const Bakımda = new EmbedBuilder()
        .setColor(Colors.Red)
        .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()}) 
        .setDescription(`${Emojis.Ünlem} Bot şuanda \`${db.fetch(`BakımSebep`)}\` geliştiriliyorum destek veya bilgi için destek sunucuma gel!`)
        .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
        .setTimestamp()
        if(config.sahipID) {
      await message.reply({embeds: [Bakımda], components: [Buton]})
      }
    }
  
    const Dm = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} Komutlarımı sadece sunucularda kullanabilirsin.`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
     if(!message.guild) return await message.reply({embeds: [Dm]})
  
    const Oy = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} aaa 1 dk bana oy vermeden komutlarımı kullanamasın`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
        
    const OyVer = new ActionRowBuilder()
      .addComponents(new ButtonBuilder()        
        .setURL(`https://top.gg/bot/${botid}/vote`)
        .setLabel(`Oy ver kanki`)
        .setStyle("Link"))
        
    if (topgg) {
      await dbl.getVotes().then((x) => {
        if (cmd.dbl && !x.filter((y) => y.id === message.author.id).length)
          return message.reply({embeds: [Oy], components: [OyVer]})
        else cmd.execute(client, message, args, dbl)
      })
    } else {
      cmd.execute(client, message, args, dbl)
    }
  }
}