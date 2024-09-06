const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const Log = require("../gerekliler/log.json")
const { sahipID } = require("../ayar/config.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['link-limit'],  
  description: 'venom link limit sistemi.',
  options: [
    { 
      name: "ekle",
      description: "Bir kullanıcıya link ekleme hakkı verirsiniz.", 
      type: 1,
      options: [
        { 
          name: "eklenecek-kullanıcı",
          description: "Link ekleme hakkı verilecek kullanıcı.", 
          type: 6,
          required: true
        },
        { 
          name: "eklenecek-miktar",
          description: "Eklenecek link ekleme hakkı miktarı.", 
          type: 3,
          required: true
        },
      ]
    },
    { 
      name: "al",
      description: "Bir kullanıcıdan link ekleme hakkı alırsınız.", 
      type: 1,
      options: [
        { 
          name: "alınacak-kullanıcı",
          description: "Link ekleme hakkı alınacak kullanıcı.", 
          type: 6,
          required: true
        },
        { 
          name: "alınacak-miktar",
          description: "Alınacak link ekleme hakkı miktarı.", 
          type: 3,
          required: true
        },
      ]
    }
  ],
    
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  if(interaction.options.getSubcommand() === 'ekle') {
   
  const kullanıcı = interaction.options.getUser('eklenecek-kullanıcı')
  const miktar = interaction.options.getString('eklenecek-miktar')
  const LinkLimit = db.fetch(`LinkLimit_${kullanıcı.id}`) || 0
  
  const Miktar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Eklenecek miktarın 0'dan büyük olması gerekli.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp() 
  if(miktar <= 0) return await interaction.followUp({embeds: [Miktar]})
    
  db.add(`LinkLimit_${kullanıcı.id}`, miktar)
  const Eklendi = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıya \`${miktar}\` adet link ekleme hakkı verildi. Toplam link ekleme hakkı \`${(db.fetch(`LinkLimit_${kullanıcı.id}`) || 0)+3}\` oldu! yee kk hayırlı olsun.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Eklendi]})
  }
  
  if(interaction.options.getSubcommand() === 'al') {
   
  const kullanıcı = interaction.options.getUser('alınacak-kullanıcı')
  const miktar = interaction.options.getString('alınacak-miktar')
  const LinkLimit = db.fetch(`LinkLimit_${kullanıcı.id}`) || 0
  
  const Miktar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Alınacak miktarın 0'dan büyük olması gerekli kankim`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp() 
  if(miktar <= 0) return await interaction.followUp({embeds: [Miktar]})
    
  const Fazla = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının \`${miktar}\` adet link ekleme hakkı bulunmuyor zaten biraz üst ver günah!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp() 
  if(LinkLimit < miktar) return await interaction.followUp({embeds: [Fazla]})
    
  db.subtract(`LinkLimit_${kullanıcı.id}`, miktar)
  const Alındı = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıdan \`${miktar}\` adet link ekleme hakkı alındı. Toplam link ekleme hakkı \`${(db.fetch(`LinkLimit_${kullanıcı.id}`) || 0)+3}\` kaldı! hayırlı olsun kral.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Alındı]})
  }
  
  }
}