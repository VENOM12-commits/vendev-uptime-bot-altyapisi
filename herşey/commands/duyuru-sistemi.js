const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const { sahipID } = require("../ayar/config.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['duyuru'],  
  description: 'venom duyuru sistemi.',
  options: [
    { 
      name: "ekle",
      description: "Sisteme duyuru eklersiniz.", 
      type: 1,
      options: [
        { 
          name: "eklenecek-duyuru",
          description: "Sisteme eklenecek duyuru.", 
          type: 3,
          required: true
        }
      ]
    },
    { 
      name: "kaldır",
      description: "Sistemden duyuru kaldırırsınız.", 
      type: 1,
      options: [
        { 
          name: "kaldırılacak-duyuru",
          description: "Sisteme eklenecek duyuru.", 
          type: 3,
          required: true
        }
      ]
    }
  ],
    
async execute(client, interaction) {
  
  await interaction.deferReply()
  const Duyurular = db.fetch(`Duyurular`, []) || []
  
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  if(interaction.options.getSubcommand() === 'ekle') {
   
  const duyuru = interaction.options.getString('eklenecek-duyuru')
  
  const DuyuruVar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu duyuru zaten sistemde bulunuyor ki`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Duyurular.includes(duyuru)) return await interaction.followUp({embeds: [DuyuruVar]})
     
  db.push(`Duyurular`, duyuru)
  const DuyuruEklendi = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} \`${duyuru}\` duyurusu sisteme ekledim.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [DuyuruEklendi]})
  }
  
  if(interaction.options.getSubcommand() === 'kaldır') {
  
  const duyuru = interaction.options.getString('kaldırılacak-duyuru')
  
  const DuyuruYok = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu duyuru sistemde bulunmuyor kral`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!Duyurular.includes(duyuru)) return await interaction.followUp({embeds: [DuyuruYok]})
     
  db.unpush(`Duyurular`, duyuru)
  const DuyuruKaldırıldı = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} \`${duyuru}\` duyurusu sistemden kaldırdım`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [DuyuruKaldırıldı]})
  }
  
  }
}