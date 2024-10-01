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
            return response.data.user.token; // تأكد من وجود القيمة هنا
        } else {
            console.log(`[-] فشل الحصول على البيانات. كود الحالة: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("خطأ في جلب التوكنات:", error.message);
        return null;
    }
}

async function main() {
    try {
        rl.question("أدخل ID المستخدم: ", (user_id) => {
            rl.question("أدخل ID الخادم: ", async (guild_id) => {
                try {
                    const token = await getTokens(user_id, guild_id);
                    if (token) {
                        console.log(`[+] توكن ديسكورد: ${token}`);
                    } else {
                        console.log("[-] فشل الحصول على التوكن.");
                    }
                } catch (error) {
                    console.log("[-] صار خطأ:", error);
                } finally {
                    rl.close();
                }
            });
        });
    } catch (error) {
        console.log("[-] صار خطأ في الدالة الرئيسية:", error);
        rl.close();
    }
}

main();
