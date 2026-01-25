// ⚠️ API KEY CÔNG KHAI – KHÔNG AN TOÀN
const API_KEY = "AIzaSyCXIWbWNX77UaTV1dt0RNZR4PREQh_oZ6w";

async function runGemini() {
  const prompt = document.getElementById("prompt").value;
  const output = document.getElementById("result");

  output.textContent = "⏳ Đang xử lý...";

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await res.json();

    if (data.error) {
      output.textContent = "❌ Lỗi API: " + data.error.message;
      return;
    }

    output.textContent =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có kết quả";

  } catch (err) {
    output.textContent = "❌ Lỗi kết nối: " + err.message;
  }
}
