const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/matches", async (req, res) => {
  const sport = req.query.sport;
  const today = new Date().toISOString().split("T")[0];

  let url = "";
  if (sport === "Soccer") {
    url = `https://v3.football.api-sports.io/fixtures?date=${today}`;
  } else if (sport === "Basketball") {
    url = `https://v1.basketball.api-sports.io/games?date=${today}`;
  } else {
    return res.status(400).json({ error: "Invalid sport type." });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "x-apisports-key": process.env.API_KEY,
        "Content-Type": "application/json",
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data from external API." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
