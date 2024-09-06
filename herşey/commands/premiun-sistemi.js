const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const Log = require("../gerekliler/log.json")
const { sahipID } = require("../ayar/config.json")
const db = require("croxydb")
const moment = require('moment')
require('moment-duration-format')
const ms = require('ms')

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['premium'],  
  description: 'venom premium sistemi.',
  options: [
    { 
      name: "ver",
      description: "Bir kullanıcıya premium verirsiniz.", 
      type: 1,
      options: [
        { 
          name: "verilecek-kullanıcı",
          description: "Premium verilecek kullanıcı.", 
          type: 6,
          required: true
        },
      ]
    },
    { 
      name: "al",
      description: "Bir kullanıcının premiumunu alırsınız.", 
      type: 1,
      options: [
        { 
          name: "alınacak-kullanıcı",
          description: "Premiumu alınacak kullanıcı.", 
          type: 6,
          required: true
        },
      ]
    },
    { 
      name: "kontrol",
      description: "Bir kullanıcının premium üyeliğini kontrol edersiniz.", 
      type: 1,
      options: [
        { 
          name: "bakılacak-kullanıcı",
          description: "Premium üye bilgisine bakılacak kullanıcı.", 
          type: 6,
          required: false
        },
      ]
    },
    { 
      name: "süreli",
      description: "Bir kullanıcıya süreli premium verirsiniz.", 
      type: 1,
      options: [
        { 
          name: "verilecek-kullanıcı",
          description: "Premium verilecek kullanıcı.", 
          type: 6,
          required: true
        },
        { 
          name: "süre",
          description: "Verilecek süre.", 
          type: 3,
          required: true
        },
      ]
    },
    { 
      name: "liste",
      description: "Premium kullanıcıları listeler.", 
      type: 1
    }
  ],
    
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  if(interaction.options.getSubcommand() === 'ver') {
   
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  const kullanıcı = interaction.options.getUser('verilecek-kullanıcı')
 
  const Premium = db.fetch(`PremiumÜye_${kullanıcı.id}`)
  if(!Premium) {
    db.set(`PremiumÜye_${kullanıcı.id}`, true)
    db.add(`PremiumSayı`, 1)
    db.push(`Premiumlar`, kullanıcı.id)
    const PremiumLog = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`BİR KULLANICIYA PREMİUN VERİLDİ`)
      .addFields(
        {
          name: `${Emojis.Kullanıcı} Kullanıcı`, 
          value: `> ${kullanıcı} \`${kullanıcı.tag}\` \`(${kullanıcı.id})\``
        },
        {
          name: `${Emojis.Yetkili} Yetkili`, 
          value: `> ${interaction.user} \`${interaction.user.tag}\` \`(${interaction.user.id})\``
        })
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    client.channels.cache.get(Logs.Premium).send({embeds: [PremiumLog]})
    const Eklendi = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} ${kullanıcı} premiun verdim hayırlı olsun ${kullanıcı} güle güle kullanma dilegi ile!`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Eklendi]})
    
  } else {
    const Var = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcıya ztn premiun önceden vermişim ki`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Var]})
    
    }
  }
  
  
  if(interaction.options.getSubcommand() === 'al') {
   
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  const kullanıcı = interaction.options.getUser('alınacak-kullanıcı')
 
  const Premium = db.fetch(`PremiumÜye_${kullanıcı.id}`)
  if(Premium) {
    db.delete(`PremiumÜye_${kullanıcı.id}`)
    db.subtract(`PremiumSayı`, 1)
    db.unpush(`Premiumlar`, kullanıcı.id)
    const PremiumLog = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`BİR KULLANICIDAN PREMİUN ALINDI `)
      .addFields(
        {
          name: `${Emojis.Kullanıcı} Kullanıcı`, 
          value: `> ${kullanıcı} \`${kullanıcı.tag}\` \`(${kullanıcı.id})\``
        },
        {
          name: `${Emojis.Yetkili} Yetkili`, 
          value: `> ${interaction.user} \`${interaction.user.tag}\` \`(${interaction.user.id})\``
        })
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    client.channels.cache.get(Logs.Premium).send({embeds: [PremiumLog]})
    const Alındı = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcının premium üyeliği alındım yazık oldu!`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Alındı]})
    
  } else {
    const Yok = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} ${kullanıcı} aa zaten bu kral premiun yok ki ya`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Yok]})
    
    }
  }
  
  
  if(interaction.options.getSubcommand() === 'liste') {
   
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
    
    var allPremium = []
      
      db.fetch(`Premiumlar`, []).forEach(data => {
          allPremium.push(data)
      })
    
  const PreListe = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()}) 
    .setDescription(`VENOM PREMİUN OLAN KULLANICI LİSTESİ`)
    .addFields(
      {
        name: `${Emojis.Elmas} Premium üyeler (${db.fetch(`PremiumSayı`) || 0})`,
        value: `<@${allPremium.join(">\n<@")}>`
      })
    .setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [PreListe]})
  }
  
  
  if(interaction.options.getSubcommand() === 'kontrol') {
   
  const kullanıcı = interaction.options.getUser('bakılacak-kullanıcı') || interaction.user
 
  const Premium = db.fetch(`PremiumÜye_${kullanıcı.id}`)
  
  if(Premium) {
    const Var = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kral premiun bitiş zamanı: \`${db.fetch(`SüreliPremium_${kullanıcı.id}`) || `Süresiz`}\``)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Var]})
  } else {
      const Yok = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının premium yok ki`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Yok]})
  }    
  }
  
  
  if(interaction.options.getSubcommand() === 'süreli') {
   
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  const kullanıcı = interaction.options.getUser('verilecek-kullanıcı')
  const süre = interaction.options.getString('süre')
 
  const Premium = db.fetch(`PremiumÜye_${kullanıcı.id}`)
  if(Premium) {
    const Var = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} ${kullanıcı} kullanıcıda zaten premiun var.`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Var]})
  } else {
    let PremiumBitiş = Date.now() + ms(süre.replace('gün', 'day').replace('saat', 'hours').replace('hafta', 'week'))
      db.set(`PremiumÜye_${kullanıcı.id}`, true)
      db.add(`PremiumSayı`, 1)
      db.set(`SüreliPremium_${kullanıcı.id}`, moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')) 
      db.push(`Premiumlar`, kullanıcı.id)
    const PremiumLog = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`Bir kullanıcıya premium üyeliği verildi`)
      .addFields(
        {
          name: `${Emojis.Kullanıcı} Kullanıcı`, 
          value: `> ${kullanıcı} \`${kullanıcı.tag}\` \`(${kullanıcı.id})\``
        },
        {
          name: `${Emojis.Yetkili} Yetkili`, 
          value: `> ${interaction.user} \`${interaction.user.tag}\` \`(${interaction.user.id})\``
        },
        {
          name: `${Emojis.Uptime} Premium bitiş zamanı`,
          value: `> ${moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')}`
        })
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    client.channels.cache.get(Logs.Premium).send({embeds: [PremiumLog]})
    const Verildi = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıya \`${süre}\` süreli premium verdim. Bitiş zamanı: ${moment(PremiumBitiş).format('DD.MM.YYYY - HH:mm:ss')}`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Verildi]})
    
    setTimeout(() => {
        
      db.delete(`PremiumÜye_${kullanıcı.id}`)
      db.delete(`SüreliPremium_${kullanıcı.id}`)
      db.subtract(`PremiumSayı`, 1)
      db.unpush(`Premiumlar`, kullanıcı.id)
     
      const PremiumLog = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`Bir kullanıcının premium üyeliğinin süresi sona erdi`)
      .addFields(
        {
          name: `${Emojis.Kullanıcı} Kullanıcı`, 
          value: `> ${kullanıcı} \`${kullanıcı.tag}\` \`(${kullanıcı.id})\``
        })
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    client.channels.cache.get(Logs.Premium).send({embeds: [PremiumLog]})
    }, ms(süre.replace('gün', 'day').replace('saat', 'hours').replace('hafta', 'week')))
  }
  }
    
    
  }
}