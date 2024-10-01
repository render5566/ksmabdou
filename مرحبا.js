const axios = require("axios");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getTokens(user_id, guild_id) {
    const headers = {
        "Authorization": "Bot " + "YOUR_BOT_TOKEN"
    };
    const url = `https://discord.com/api/v10/guilds/${guild_id}/members/${user_id}`;
    try {
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
            return response.data.user.token; // تأكد أن هذه القيمة موجودة في الرد
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching tokens:", error);
        return null;
    }
}

async function main() {
    rl.question("Enter the user ID: ", async (user_id) => {
        rl.question("Enter the guild ID: ", async (guild_id) => {
            try {
                const token = await getTokens(user_id, guild_id);
                if (token) {
                    console.log(`[+] Discord Token: ${token}`);
                } else {
                    console.log("[-] Failed to get the token.");
                }
            } catch (error) {
                console.log("[-] An error occurred:", error);
            } finally {
                rl.close();
            }
        });
    });
}

main();
