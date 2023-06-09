const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');


require('dotenv').config();	// .env 파일을 불러옴

const BOT_TOKEN = process.env.BOT_TOKEN;	// .env 파일에서 BOT_TOKEN 변수 호출
console.log(`BOT_TOKEN: ${BOT_TOKEN}`);

const CLIENT_ID = process.env.CLIENT_ID;
console.log(`CLIENT_ID: ${CLIENT_ID}`);

const GUILD_ID = process.env.GUILD_ID;
console.log(`GUILD_ID: ${GUILD_ID}`);


// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// console.log(`foldersPath: ${foldersPath}`);
// console.log(`commandFolders: ${commandFolders}`);

// const eventsPath = path.join(__dirname, 'events');
// const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // console.log(`main command ${command}`);
        // console.log(`filePath: ${filePath}`);

        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    //console.log(c.user);
    // console.log(c);
});


client.on(Events.InteractionCreate, async interaction => {
    console.log('working...');

    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    if (!interaction.isChatInputCommand()) return;

    // if (!interaction.isModalSubmit()) return;
    // 여기서 뻗어버림;

    // if(interaction.isModalSubmit()){
    //     console.log('modal submit');
    //     console.log(`interaction.fields : ${interaction.fields}`);
    // }
    //얘는 작동도 안함

    if (interaction.customId === 'InputUserInfo') {
        await interaction.reply({ content: 'Your submission was received successfully!' });
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
        }
    }
});


// Log in to Discord with your client's token
client.login(BOT_TOKEN);