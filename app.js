async function summarize() {
  const input = document.getElementById("inputText").value;
  const length = document.getElementById("length").value;
  const output = document.getElementById("output");

  if (!input.trim()) {
    output.innerText = "Please enter some text.";
    return;
  }

  output.innerText = "Summarizing...";

  const prompt = `Summarize this text in a ${length} form:\n\n${input}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENAI_API_KEY_HERE", // 🔴 Replace this
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      output.innerText = "Error: " + data.error.message;
    } else {
      output.innerText = data.choices[0].message.content;
    }
  } catch (err) {
    output.innerText = "Something went wrong: " + err.message;
  }
}
