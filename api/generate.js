import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { shape, color, toppings, text } = req.body;

  const prompt = `Realistic cake, shape: ${shape}, color: ${color}, toppings: ${toppings?.join(", ")}, text: ${text}`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "gpt-image-1",
        prompt,
        size: "512x512"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      imageUrl: response.data.data[0].url
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "AI error" });
  }
}
