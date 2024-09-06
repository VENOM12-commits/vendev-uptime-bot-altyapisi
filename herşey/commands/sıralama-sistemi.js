const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const { paraBirimi } = require("../ayar/marketAYAR.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['sıralama'],  
  description: 'coin fazla olan kullanıcı sıralamasını gösterir.',
  
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  let sayı = 1
  
  let filtre = client.users.cache.filter(x => (db.fetch(`Bakiye_${x.id}`)) || 0)
    .sort((x,y) => (db.fetch(`Bakiye_${y.id}`)|| 0) - (db.fetch(`Bakiye_${x.id}`)) || 0)
    .map((x) => {
      return `**${sayı++}.** ${x.username} - ${db.fetch(`Bakiye_${x.id}`) || 0} HC`
    })
  
  const Sıralama = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${paraBirimi}Coin (${paraBirimi}) zenginlerinin sıralaması`)
    .addFields(
      {
        name: `${Emojis.Tag} En zengin 10 kullanıcı`,
        value: `${filtre.slice(0, 10).join("\n") || `Sıralamada hiç kullanıcı bulunmuyor ki ya!`}`
      })
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Sıralama]})
  
  }
}