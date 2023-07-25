const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('vogpolicy')
		.setDescription('Activates the five minute vog policy')
		.addUserOption(option => option.setName('target').setDescription('The fireteam member in question').setRequired(true)),
	async execute(interaction) {
		const member = interaction.options.getMember('target');
		let minutes = 0;
		let seconds = 0;
		await interaction.reply(`Five minute vog policy activated! @${member.user.username} has 5 minutes and 0 seconds to join.`);
		for (let i = 299; i > 0; i--) {
			await wait(1000);
			minutes = Math.floor(i / 60);
			seconds = i - minutes * 60;
			await interaction.editReply(`Five minute vog policy activated! @${member.user.username} has ${minutes} minutes and ${seconds} seconds to join.`);
		}
		await interaction.editReply(`Time is up! ${member.user.username} has failed to answer in time.`);
	},
};