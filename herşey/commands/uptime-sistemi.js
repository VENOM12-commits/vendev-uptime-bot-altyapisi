const { Discord, EmbedBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, PermissionsBitField } = require ("discord.js")
const Emoji = require("../gerekliler/emoji.json")
const Colors = require("../gerekliler/renk.json")
const db = require("croxydb")

module.exports = {
  slash: true, 
  enable: true, 
  dbl: false, 
  name: ['uptime-sistemi'],  
  description: 'Uptime sistemini kurarsınız',
  options: [
    { 
      name: "kanal", 
      description: "uptime kanalı nedir", 
      type: 7,
      required: false
    }
  ],
  
async execute(client, interaction) {
  
  await interaction.deferReply()
  
  const Kanal = interaction.options.getChannel('kanal') || interaction.channel
  
  const YetkiYok = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olmalısın kral`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.followUp({embeds: [YetkiYok]})
  const MetinKanalı = new EmbedBuilder()
    .setColor(Colors.Red)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Çarpı} sistemi bir **metin kanalına** ayarla`)
    .setFooter({text: client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  if(Kanal.type !== ChannelType.GuildText) return await interaction.followUp({embeds: [MetinKanalı]})
  
  const Oldu = new EmbedBuilder()
    .setColor(Colors.Green)
    .setAuthor({name: interaction.user.username, iconURL: interaction.user.avatarURL()}) 
    .setDescription(`${Emojis.Tik} Uptime sistemi ${Kanal} olarak ayarladım!`)
    .setFooter({text:client.user.username, iconURL: client.user.avatarURL()}) 
    .setTimestamp()
  await interaction.followUp({embeds: [Oldu]})
  
  const Uptime = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL()}) 
    .setDescription(`
# uptime sistemine hoşgeldin

# kurallar

1- **bozuk link botu bozacak bir link eklemek yasaktır ve karaliste alınma sebebidir.**
2- **sunucu p@tlatma sorgu botu ve başka bir uptime botu uptime etmek yasaktır sistemden ömur boyu yasakanma sebebidir!**
3- **yan hesap açıp uptime etmek yasaktır yakalanırsanız destek sunucusundan ban sistemde de karaliste alınırsınız!**
4- **en az **3** link premiun varsa **30** link ekleyebilirsin!**
5- **verileriniz botun croxydb saklanır sildirmek için destek sunucununa gel!**

# uptime etme

1- altdaki **link ekle** buton link ekleyebilirsiniz.
2- altdaki **link sil** buton link silebilirsiniz.
3- altdaki **link liste** buton eklediniz link görebilirsiniz.
4- altdaki **yenile** buton link  yenilyebilirsiniz.
`)
    .setFooter({text:client.user.username, iconURL: client.user.avatarURL()}) 
    .setImage(`https://cdn.glitch.global/a05428fd-4cef-4667-a4b6-a17f503dbea5/standard.gif?v=1679220526653`)
    .setTimestamp()
  const Butonlar = new ActionRowBuilder()
    .addComponents(new ButtonBuilder()
      .setEmoji(Emojis.Link)
      .setLabel("Ekle")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("ekle"))
    .addComponents(new ButtonBuilder()
      .setEmoji(Emojis.Sil)
      .setLabel("Sil")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("sil"))
    .addComponents(new ButtonBuilder()
      .setEmoji(Emojis.Dosya)
      .setLabel("Liste")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("liste"))
    .addComponents(new ButtonBuilder()
      .setEmoji(Emojis.Yenile)
      .setLabel("Düzenle")
      .setStyle(ButtonStyle.Secondary)
      .setCustomId("düzenle"))
  Kanal.send({embeds: [Uptime], components: [Butonlar]})
  }
}