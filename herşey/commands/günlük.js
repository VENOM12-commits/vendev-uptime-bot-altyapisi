const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require ("discord.js")
const db = require("croxydb")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const Log = require("../gerekliler/log.json")
const { paraBirimi } = require("../ayar/marketAYAR.json")


module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['günlük'],  
  description: 'Günlük ödülünüzü alırsınız.',

async execute(client, interaction) { 
  
  await interaction.deferReply()
  
  if(db.fetch(`Günlük_${interaction.user.id}`)) {
    
    const Bekle = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} Günlük ödülünü sadece 24 saatte bir alabilirsin`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Bekle]})
    
  } else {
  
    db.add(`Bakiye_${interaction.user.id}`, 10)
    
    const Aldın = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} Günlük ödülünü aldın ve bakiyene **10${paraBirimi}** eklendim!`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Aldın]})
    
    db.set(`Günlük_${interaction.user.id}`, true)
    setTimeout(() => {
      db.delete(`Günlük_${interaction.user.id}`)
    }, 86400000)
  }
  
  }
}