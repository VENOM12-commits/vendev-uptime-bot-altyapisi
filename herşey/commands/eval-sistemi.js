const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Color = require("../gerekliler/renk.json")
const db = require("croxydb")
const { config } = require("process")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['eval'],  
  description: 'promo kod denersiniz.',
  options: [
    { 
      name: "kod", 
      description: "Denenecek kod yaz bakam", 
      type: 3,
      required: true
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

  const kod = interaction.options.getString('kod')
  try {
    var evaled = clean(await eval(kod))
    if (evaled.match(new RegExp(`${client.token}`, "g")));
    const Token = new EmbedBuilder()
      .setDescription(`${Emojis.Çarpı} Bu şekilde token alınamaz ki token napacan`)
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    if (evaled.includes(client.token)) return await interaction.followUp({embeds: [Token]})
    const Eval = new EmbedBuilder()
      .addFields({name: `${Emojis.Sağ} Kod girişi`, value: `\`${kod}\``})
      .addFields({name: `${Emojis.Sol} Kod çıkışı`, value: `\`${evaled}\``}) 
      .setColor(Colors.Green)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Eval]})
  } catch (err) {
    const Hata = new EmbedBuilder()
      .addFields({name: `${Emojis.Sağ} Kod girişi`, value: `\`${kod}\``})
      .addFields({name: `${Emojis.Ünlem} Hata`, value: `\`${err}\``}) 
      .setColor(Colors.Red)
      .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
      .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
      .setTimestamp()
    await interaction.followUp({embeds: [Hata]});
  }
    function clean(text) {
    if(typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 })
      text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
      return text
    }
  }
}
  