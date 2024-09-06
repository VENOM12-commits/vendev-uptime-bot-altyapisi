const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['bakım'],  
  description: 'venom bakım sistemi.',
  options: [
    { 
      name: "aç",
      description: "Botu bakıma sokar.", 
      type: 1,
      options: [
        { 
          name: "sebep",
          description: "Bakıma alınma sebebi.", 
          type: 3,
          required: false
        }
      ]
    },
    { 
      name: "kapat",
      description: "Botu bakımdan çıkarır.", 
      type: 1
    }
  ],
    
async execute(client, interaction) {
  
  await interaction.deferReply()
  const Bakım = db.fetch(`Bakım`)
  
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} bu komutu sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  if(interaction.options.getSubcommand() === 'aç') {
  
  const sebep = interaction.options.getString('sebep') || `Sebep belirtilmemiş ki sahip`
  
  if(Bakım) {
    const Açık = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} zaten bakımdayım!`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Açık]})
  } else {
    db.set(`Bakım`, true)
    db.set(`BakımSebep`, sebep)
    const Açıldı = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} artık bakımdayım bakım sebebi: \`${sebep}\` en kısa zaman işlh yeniden hizmeteyim!`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Açıldı]})
    
    }
  }
  
if(interaction.options.getSubcommand() === 'kapat') {
  if(!Bakım) {
    const Kapalı = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} zaten bakımda degilim`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Kapalı]})
  } else {
    db.delete(`Bakım`)
    db.delete(`BakımSebep`)
    const Kapandı = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} yeee! bakımda degilim artık`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Kapandı]})
    
      }
    }
  
  }
}