const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField, StringSelectMenuBuilder } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const { sahipID, supportServer } = require("../ayar/config.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['rozet'],  
  description: 'HarenUptime rozet sistemi.',
  options: [
    { 
      name: "ver", 
      description: "Bir kullanıcıya rozet verir.", 
      type: 1,
      options: [
        { 
          name: "verilecek-kullanıcı", 
          description: "Rozet verilecek kullanıcı.", 
          type: 6,
          required: true
        }
      ]
    },
    { 
      name: "al", 
      description: "Bir kullanıcıdan rozet alırsınız.", 
      type: 1,
      options: [
        { 
          name: "alınacak-kullanıcı", 
          description: "Rozeti alınacak kullanıcı.", 
          type: 6,
          required: true
        }
      ]
    },
    { 
      name: "liste", 
      description: "Rozetler hakkında bilgi verir.", 
      type: 1
    }
  ],
  
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  if(interaction.options.getSubcommand() === 'liste') {
    
    const Liste = new EmbedBuilder()
      .setColor(Colors.Yellow)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setDescription(`
> ${Emojis.RozetKullanıcı} botu kullanan bütün kullanıcılarda rözet vardır!.

> ${Emojis.RozetSponsor} venoma sponsor olan kullanıcılara verilir!

> ${Emojis.RozetDestekçi} venomun veya sunucusuna destekde bulunan kullanıcılara verilir!

> ${Emojis.RozetPremium} venomun premium sahibi üyelere verilir!

> ${Emojis.RozetBug} venom botunun önemli bir bug bulan kullanıcılara verilir.

> ${Emojis.RozetKurucu} venom uptimenin kurucularına verilir.

> ${Emojis.RozetDeveloper} venoma yardımcı olan geliştiricilerine verilir.

> Destek sunucusuna gelerek rozetler hakkında daha fazla bilgi alabilir ve rozet isteğinde bulunabilirsin kral
`)
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
  const Buton = new ActionRowBuilder()
    .addComponents(new ButtonBuilder()        
      .setURL(config.supportServer)
      .setLabel(`Destek sunucum`)
      .setStyle("Link"))
    await interaction.followUp({embeds: [Liste], components: [Buton]})
  }
  
  if(interaction.options.getSubcommand() === 'ver') {
   
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})

  const kullanıcı = interaction.options.getUser('verilecek-kullanıcı')
  
  const RozetSeç = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Soru} Mesaj altındaki menüden eklemek istediğiniz rozeti seçebilirsin`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  const RozetListe = new ActionRowBuilder()
    .addComponents(new StringSelectMenuBuilder()
    .setCustomId('rozetler')
    .setPlaceholder('Verilecek rozetler.')
    .addOptions([
      {
        label: `Sponsor`,
        value: `rozetsponsor`,
        emoji: `${Emojis.RozetSponsor}`
      },
      {
        label: `Bug hunter`,
        value: `rozetbug`,
        emoji: `${Emojis.RozetBug}`
      },
      {
        label: `Premium üye`,
        value: `rozetpremium`,
        emoji: `${Emojis.RozetPremium}`
      },
      {
        label: `Destekçi`,
        value: `rozetdestekçi`,
        emoji: `${Emojis.RozetDestekçi}`
      }]))
  await interaction.followUp({embeds: [RozetSeç], components: [RozetListe]})
    
 client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetsponsor") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetVar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetSponsor} rozeti bulunuyor kankim`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Rozetler.includes(`${Emojis.RozetSponsor}`)) return await interaction.followUp({embeds: [RozetVar]})
   
  db.push(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetSponsor}`)
  const Verildi = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıya ${Emojis.RozetSponsor} rozeti verildi.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Verildi]})
       }
     }
   })
    
    
 client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetbug") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece geliştiriciler kullanabilir.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetVar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetBug} rozeti bulunuyor ki`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Rozetler.includes(`${Emojis.RozetBug}`)) return await interaction.followUp({embeds: [RozetVar]})
   
  db.push(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetBug}`)
  const Verildi = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıya ${Emojis.RozetBug} rozeti verildiaa        3W`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Verildi]})
       }
     }
   })
  
    
 client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetpremium") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece geliştiriciler kullanabilir.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetVar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetPremium} rozeti bulunuyor ki kral`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Rozetler.includes(`${Emojis.RozetPremium}`)) return await interaction.followUp({embeds: [RozetVar]})
   
  db.push(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetPremium}`)
  const Verildi = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıya ${Emojis.RozetPremium} rozeti verildi`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Verildi]})
       }
     }
   })
    
    
 client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetdestekçi") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetVar = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetDestekçi} rozeti bulunuyor`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Rozetler.includes(`${Emojis.RozetDestekçi}`)) return await interaction.followUp({embeds: [RozetVar]})
   
  db.push(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetDestekçi}`)
  const Verildi = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcıya ${Emojis.RozetDestekçi} rozeti verildi.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Verildi]})
       }
     }
   })
    
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
  
  const RozetSeç = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Soru} Mesaj altındaki menüden geri almak istediğiniz rozeti seçebilirsiniz`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  const RozetListe = new ActionRowBuilder()
    .addComponents(new StringSelectMenuBuilder()
    .setCustomId('rozetler')
    .setPlaceholder('Alınacak rozetler.')
    .addOptions([
      {
        label: `Sponsor`,
        value: `rozetsponsor`,
        emoji: `${Emojis.RozetSponsor}`
      },
      {
        label: `Bug hunter`,
        value: `rozetbug`,
        emoji: `${Emojis.RozetBug}`
      },
      {
        label: `Premium üye`,
        value: `rozetpremium`,
        emoji: `${Emojis.RozetPremium}`
      },
      {
        label: `Destekçi`,
        value: `rozetdestekçi`,
        emoji: `${Emojis.RozetDestekçi}`
      }]))
  await interaction.followUp({embeds: [RozetSeç], components: [RozetListe]})
    
client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetsponsor") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetYok = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetSponsor} rozeti bulunmuyor.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!Rozetler.includes(`${Emojis.RozetSponsor}`)) return await interaction.followUp({embeds: [RozetYok]})
   
  db.unpush(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetSponsor}`)
  const Alındı = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcının ${Emojis.RozetSponsor} rozeti geri aldım`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Alındı]})
       }
     }
   })
    
    
client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetbug") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetYok = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetBug} rozeti bulunmuyor`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!Rozetler.includes(`${Emojis.RozetBug}`)) return await interaction.followUp({embeds: [RozetYok]})
   
  db.unpush(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetBug}`)
  const Alındı = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcının ${Emojis.RozetBug} rozeti geri alındı.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Alındı]})
       }
     }
   })
    
    
client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetpremium") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece sahibim kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetYok = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetPremium} rozeti bulunmuyor.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!Rozetler.includes(`${Emojis.RozetPremium}`)) return await interaction.followUp({embeds: [RozetYok]})
   
  db.unpush(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetPremium}`)
  const Alındı = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcının ${Emojis.RozetPremium} rozeti geri alındı.`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Alındı]})
       }
     }
   })
    
    
 client.on('interactionCreate', async interaction => {
 if(!interaction.isStringSelectMenu()) return
 if(interaction.customId === "rozetler") {
 if(interaction.values[0] == "rozetdestekçi") {
   await interaction.deferReply()
   const Rozetler = db.fetch(`Rozetler_${kullanıcı.id}`) || []
  
   const Sahip = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu sadece geliştiriciler kullanabilir!`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
    if(config.sahipID) return await interaction.followUp({embeds: [Sahip]})
  
  const RozetYok = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} ${kullanıcı} adlı kullanıcının zaten ${Emojis.RozetDestekçi} rozeti bulunmuyor`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!Rozetler.includes(`${Emojis.RozetDestekçi}`)) return await interaction.followUp({embeds: [RozetYok]})
   
  db.unpush(`Rozetler_${kullanıcı.id}`, `${Emojis.RozetDestekçi}`)
  const Alındı = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} ${kullanıcı} adlı kullanıcının ${Emojis.RozetDestekçi} rozeti geri aldım`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Alındı]})
       }
     }
   })
    
  }
  
  }
}