import OpenAI from "openai";

// ดึง API Key จาก Environment Variable
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  // ตรวจสอบ method ต้องเป็น POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // รับข้อมูลจากหน้าเว็บ
  const { age, gender, fitnessLevel, goal } = req.body;

  // สร้าง prompt สำหรับ AI
  const prompt = `
  สร้างตารางออกกำลังกาย 7 วัน สำหรับ:
  อายุ: ${age}, เพศ: ${gender}, ระดับความฟิต: ${fitnessLevel}, เป้าหมาย: ${goal}.
  ให้รายละเอียด: วัน, ชื่อท่า, เซ็ต, ครั้ง
  `;

  try {
    // เรียก OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    });

    // ส่งผลลัพธ์กลับหน้าเว็บ
    res.status(200).json({ text: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
