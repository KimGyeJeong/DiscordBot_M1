const Discord = require('discord.js');	// discord.js 라이브러리 호출
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })	// Client 객체 생성

const dotenv = require('dotenv').config();	// .env 파일 호출
const BOT_TOKEN = dotenv.parsed.BOT_TOKEN;	// .env 파일에서 BOT_TOKEN 변수 호출

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(BOT_TOKEN);