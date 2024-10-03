const axios = require('axios');

document.getElementById('memberForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const user_id = document.getElementById('user_id').value;
    const guild_id = document.getElementById('guild_id').value;

    const headers = {
        "Authorization": "Bot " + "التوكن" 
    };

    const url = `https://discord.com/api/v10/guilds/${guild_id}/members/${user_id}`;

    try {
        const response = await axios.get(url, { headers });

        if (response.status === 200) {
            const memberInfo = `
                <h2>معلومات العضو:</h2>
                <p>اسم المستخدم: ${response.data.user.username}</p>
                <p>معرّف المستخدم: ${response.data.user.id}</p>
                <p>الأدوار: ${response.data.roles.join(", ")}</p>
                <p>الاسم المستعار: ${response.data.nick || 'لا يوجد'}</p>
            `;
            document.getElementById('result').innerHTML = memberInfo;
        } else {
            document.getElementById('result').innerHTML = `[-] فشل الحصول على المعلومات. كود الحالة: ${response.status}`;
        }
    } catch (error) {
        console.error("خطأ في جلب معلومات العضو:", error.message);
        if (error.response) {
            document.getElementById('result').innerHTML = "تفاصيل الخطأ: " + error.response.data.message;
        }
    }
});
