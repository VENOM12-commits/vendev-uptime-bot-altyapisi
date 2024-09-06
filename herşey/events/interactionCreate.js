const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const fetch = require("fetch")
const db = require("croxydb")
const { topgg, botid, sahipID } = require("../ayar/config.json")

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client, dbl) {
      
    if (interaction.type !== InteractionType.ApplicationCommand) {
    } else {
      const command = client.slashcommands.get(interaction.commandName)
      if (!command) return
      try {
        
        const Buton = new ActionRowBuilder()
          .addComponents(new ButtonBuilder()        
            .setURL(`https://discord.gg/XjBRvvaUzM`)
            .setLabel(`Destek sunucusu`)
            .setStyle("Link"))  
        
        if(db.fetch(`Karaliste_${interaction.user.id}`)) {
          const Kullanamazsın = new EmbedBuilder()
            .setColor(Colors.Red)
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
            .setDescription(`${Emojis.Ünlem} \`${db.fetch(`KaralisteSebep_${interaction.user.id}`)}\` sebebi ile botun karalistesinde bulunduğun için botu kullanamazsın, karalisteyi açtırmak için destek sunucusuna gelebilirsin.`)
            .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
            .setTimestamp()
            if(config.sahipID) return await interaction.reply({embeds: [Kullanamazsın], components: [Buton]})
        }
        
        if(db.fetch(`Bakım`)) {
          const Bakımda = new EmbedBuilder()
            .setColor(Colors.Red)
            .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
            .setDescription(`${Emojis.Ünlem} Bot şuanda \`${db.fetch(`BakımSebep`)}\` geliştiriliyorum destek veya bilgi için destek sunucuma gel!`)
            .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
            .setTimestamp()
            if(config.sahipID) return await interaction.reply({embeds: [Bakımda], components: [Buton]})
        }
  
        const Dm = new EmbedBuilder()
          .setColor(Colors.Red)
          .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
          .setDescription(`${Emojis.Çarpı} selam kanki dm yazdıgın için sagol ama beni bir sunucuya ekleyip kullanmalısın dm hizmet vermiyorum.`)
          .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
          .setTimestamp()
        if(!interaction.guild) return await interaction.reply({embeds: [Dm]})
  
        const Oy = new EmbedBuilder()
          .setColor(Colors.Red)
          .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
          .setDescription(`${Emojis.Çarpı} aaa 1 dk bana oy vermeden komutlarımı kullanamasın`)
          .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
          .setTimestamp()
        
        const OyVer = new ActionRowBuilder()
          .addComponents(new ButtonBuilder()        
            .setURL(`https://top.gg/bot/${botid}/vote`)
            .setLabel(`Oy ver`)
            .setStyle("Link"))
        
        if (topgg) {
          await dbl.getVotes().then((x) => {
            if (command.dbl && !x.filter((y) => y.id === interaction.user.id).length)
              return interaction.reply({embeds: [Oy], components: [OyVer]})
            else command.execute(client, interaction, dbl)
          })
        } else {
          command.execute(client, interaction, dbl)
        }
      } catch (error) {
        console.error(error)
        const Hata = new EmbedBuilder()
          .setColor(Colors.Red)
          .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
          .setDescription(`${Emojis.Çarpı} bu komutumda bir hata var destek sunucuma gelmelisin`)
          .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
          .setTimestamp()
        interaction.reply({embeds: [Hata]})
      }
    }
  }
}
