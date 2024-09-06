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
  name: ['karaliste'],  
  description: 'venom karaliste sistemi.',
  options: [
    { 
      name: "ekle",
      description: "Bir kullanıcıyı karalisteye eklersiniz.", 
      type: 1,
      options: [
        { 
          name: "eklenecek-kullanıcı",
          description: "Karalisteye eklenecek kullanıcı.", 
          type: 6,
          required: true
        },
        { 
          name: "sebep",
          description: "Karalisteye eklenme sebebi.", 
          type: 3,
          required: false
        }
      ]
    },
    { 
      name: "çıkart",
      description: "Bir kullanıcıyı karalisteden çıkartırsınız.", 
      type: 1,
      options: [
        { 
          name: "çıkartılacak-kullanıcı",
          description: "Karalisteden çıkartılacak kullanıcı.", 
          type: 6,
          required: true
        },
      ]
    },
    { 
      name: "kontrol",
      description: "Bir kullanıcının karaliste bilgisini kontrol edersiniz.", 
      type: 1,
      options: [
        { 
          name: "bakılacak-kullanıcı",
          description: "Karaliste bilgisine bakılacak kullanıcı.", 
          type: 6,
          required: false
        },
      ]
    },
    { 
      name: "liste",
      description: "Karalistedeki kullanıcıları listeler.", 
      type: 1
    }
  ],
    
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  if(interaction.options.getSubcommand() === 'ekle') {
   
  const kullanıcı = interaction.options.getUser('eklenecek-kullanıcı')
  const sebep = interaction.options.getString('sebep') || `Sebep belirtilmemiş ki.`
  const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
  
  if(!Karaliste) {
    db.add(`KaralisteSayı`, 1)
    db.push(`Karalistedekiler`, kullanıcı.id)
    db.set(`Karaliste_${kullanıcı.id}`, true)
    db.set(`KaralisteSebep_${kullanıcı.id}`, sebep)
    const Eklendi = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcı \`${sebep}\` sebebi ile karalisteye ekledim artık beni kullanamaz yazık ya`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Eklendi]})
    const KaralisteLog = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`Bir kullanıcı karalisteye eklendi`)
      .addFields(
        {
          name: `${Emojis.Kullanıcı} Kullanıcı `, 
          value: `> ${kullanıcı} \`${kullanıcı.tag}\` \`(${kullanıcı.id})\``
        },
        {
          name: `${Emojis.Yetkili} Yetkili`, 
          value: `> ${interaction.user} \`${interaction.user.tag}\` \`(${interaction.user.id})\``
        },
        {
          name: `${Emojis.Soru} Karaliste eklenme sebebi`,
          value: `> ${sebep}`
        })
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    client.channels.cache.get(Logs.Karaliste).send({embeds: [KaralisteLog]})
  } else {
    const Ekli = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcı zaten karalisteye eklemişim ki`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Ekli]})
    } 
  }
  
  if(interaction.options.getSubcommand() === 'çıkart') {
   
  const kullanıcı = interaction.options.getUser('çıkartılacak-kullanıcı')
  const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`)
  
  if(Karaliste) {
    db.subtract(`KaralisteSayı`, 1)
    db.unpush(`Karalistedekiler`, kullanıcı.id)
    db.delete(`Karaliste_${kullanıcı.id}`)
    db.delete(`KaralisteSebep_${kullanıcı.id}`)
    const Çıkartıldı = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcı karalisteden çıkartıldı, artık botu kullanabilir.`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Çıkartıldı]})
    const KaralisteLog = new EmbedBuilder()
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`Bir kullanıcı karalisteden çıkartıldı`)
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
    client.channels.cache.get(Logs.Karaliste).send({embeds: [KaralisteLog]})
  } else {
    const Yok = new EmbedBuilder()
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcı zaten karalistede yok!`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Yok]})
    } 
  }
  
  if(interaction.options.getSubcommand() === 'kontrol') {
   
  const kullanıcı = interaction.options.getUser('bakılacak-kullanıcı') || interaction.user
  const Karaliste = db.fetch(`Karaliste_${kullanıcı.id}`) 
  
  const KaralisteVar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Kırmızı} ${kullanıcı} adlı kullanıcı karalistede bulunuyor. beni kullanamaz!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Karaliste) return await interaction.followUp({embeds: [KaralisteVar]})
    
  const KaralisteYok = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Yeşil} ${kullanıcı} adlı kullanıcı karalistede bulunuyor. beni kullanamaz!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!Karaliste) return await interaction.followUp({embeds: [KaralisteYok]})
    
  }
  
  if(interaction.options.getSubcommand() === 'liste') {
   
  const Karaliste = db.fetch(`Karalistedekiler`, [])
  let Liste
  if(!Karaliste) {
    Liste = `${Emojis.Çarpı} Karalistede kimse bulunmuyor ki`
  } else {
    Liste = `${Karaliste.map((k) => `${Emojis.Sağ} <@${k}> \`(${k})\``).join("\n") || `${Emojis.Çarpı} Karalistede kimse bulunmuyor ki kral.`}`
  }
    
  const KaraListe = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription("VENOM KARALİSTE ÜYE LİSTESİ")
    .addFields(
      {
        name: `${Emojis.Elmas} Karalistedeki üyeler (${db.fetch(`KaralisteSayı`) || 0})`,
        value: `${Liste}`
      })
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [KaraListe]})
  }
  
  }
}