const {REST, Routes} = require('discord.js');

require('dotenv').config();	// .env 파일을 불러옴
const BOT_TOKEN = process.env.BOT_TOKEN;	// .env 파일에서 BOT_TOKEN 변수 호출
console.log(BOT_TOKEN);

const CLIENT_ID = process.env.CLIENT_ID;
console.log(CLIENT_ID);

const GUILD_ID = process.env.GUILD_ID;
console.log(GUILD_ID);

const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command files from the commands directory you created earlier
// const commandsPath = path.join(__dirname, 'commands');


/*
// const commandsPath = path.join(__dirname, 'commands/fun');   // fun 폴더 안에 있는 파일들만 불러옴
const commandsPath = path.join(__dirname, 'commands/utility');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log("commandsPath: " + commandsPath);
console.log("commandFiles: " + commandFiles);

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
    // const command = require(`./commands/fun/${file}`);   // fun 폴더 안에 있는 파일들만 불러옴
    const command = require(`./commands/utility/${file}`);
    console.log(`deploy-command working... ${command}`);
    commands.push(command.data.toJSON());
}

console.log("commands: ");
console.log(commands);
*/

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath);
        let tempPath = filePath+"/"+file;


        // const command = require(`${filePath}/${file}`);
        const command = require(tempPath);
        console.log(`filepath/file : ${tempPath}`);
        console.log(`deploy-commands file : ${file}`);
        console.log(`deploy-commands filePath: ${filePath}`);
        console.log(`deploy-commands command ${command}`);

        commands.push(command.data.toJSON());

    }
}

console.log(`commands: ${commands}`);






// Construct and prepare an instance of the REST module
const rest = new REST({version: '10'}).setToken(BOT_TOKEN);

// and deploy your commands!
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            // Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands},
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();

