const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getTokens(user_id, guild_id) {
    console.log(`جاري جلب التوكنات لـ المستخدم: ${user_id} في الخادم: ${guild_id}`);
    const headers = {
        "Authorization": "Bot " + "YOUR_BOT_TOKEN_HERE" // استبدل بـ توكن البوت الخاص بك
    };
    const url = `https://discord.com/api/v10/guilds/${guild_id}/members/${user_id <Generate></Generate>
