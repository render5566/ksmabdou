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
    const url = `https://discord.com/api/v10/guilds/${guild_id}/members/${user_id}`;
    
    try {
        console.log("جاري إرسال الطلب...");
        const response = await axios.get(url, { headers });
        console.log("تم استلام الرد.");
        console.log(response.data); // طباعة البيانات المستلمة
        if (response.status === 200) {
            return response.data.user.token; // تأكد من وجود القيمة هنا
        } else {
            console.log(`[-] فشل الحصول على البيانات. كود الحالة: ${response.status}`);
            return null;
        }
    } catch (error) {
        console.error("خطأ في جلب التوكنات:", error.message);
        console.log(error.response ? error.response.data : "لا توجد تفاصيل إضافية عن الخطأ");
        return null;
    }
}

async function main() {
    rl.question("أدخل ID المستخدم: ", (user_id) => {
        console.log(`تم إدخال ID المستخدم: ${user_id}`);
        rl.question("أدخل ID الخادم: ", async (guild_id) => {
            console.log(`تم إدخال ID الخادم: ${guild_id}`);
            try {
                const token = await getTokens(user_id, gu
