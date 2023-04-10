const {SlashCommandBuilder, GatewayIntentBits} = require("discord.js");
const {ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('inputuserinfo')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        console.log(`who are you...${interaction.user.username}, ${interaction.user.id}, ${interaction.user.tag}`);
        //await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);


        //TEST
        console.log(`11interaction.fields : ${interaction.fields}`);

        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('InputUserInfo')
            .setTitle('내 정보 입력');

        // Add components to modal

        // Create the text input components
        const BirthDateInput = new TextInputBuilder()
            .setCustomId('BirthDateInput')
            // The label is the prompt the user sees for this input
            .setLabel("생년월일을 입력해주세요. (예: 2000-01-01)")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short)
            // set the maximum number of characters to allow
            .setMaxLength(10)
            // set the minimum number of characters required for submission
            .setMinLength(10)
            // set a placeholder string to prompt the user
            .setPlaceholder('2023-01-01')
            // set a default value to pre-fill the input
            .setValue('2023-01-01')
            // require a value in this input field
            .setRequired(true);

        const GenderInput = new TextInputBuilder()
            .setCustomId('GenderInput')
            .setLabel("성별을 입력해주세요 (예: 남 or 여)")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short)
            .setMaxLength(1)
            .setMinLength(1)
            .setRequired(true)
        ;

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(BirthDateInput);
        const secondActionRow = new ActionRowBuilder().addComponents(GenderInput);

        // Get the data entered by the user
        // const birthDate = interaction.fields.getTextInputValue('BirthDateInput');
        // const gender = interaction.fields.getTextInputValue('GenderInput');

        // console.log(`interaction.fields.length : ${interaction.fields.length}`);  // undefined이기 때문에 TypeError: Cannot read properties of undefined (reading 'length')


        // console.log(`birthDate, gender : ${birthDate}, ${gender}`);

        console.log(`22interaction.fields : ${interaction.fields}`);  // undefined함

        console.log(`firstActionRow : ${firstActionRow}`);
        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow);

        // Show the modal to the user
        await interaction.showModal(modal);


    },
};