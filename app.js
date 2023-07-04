const express = require("express");
const ytdl = require("ytdl-core");
const instaDL = require("insta-dl");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const app = express();
var cors = require("cors");
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/instagram", (req, res) => {
  res.sendFile(__dirname + "/public/" + "instagram.html");
});

app.get("/urls/", async (req, res) => {
  if (req.get("host") === "avdl.vercel.app") {
    try {
      const url = req.query.url;
      if (!url) {
        return res.send({
          error: true,
          message: "Could not provide any url.",
          data: null,
        });
      }
      const videoId = await ytdl.getURLVideoID(url);
      const metaInfo = await ytdl.getInfo(url);
      let data = {
        url: "https://www.youtube.com/embed/" + videoId,
        info: metaInfo.formats,
      };
      return res.send({
        error: false,
        message: "Success",
        data,
      });
    } catch (error) {
      return res.send({
        error: true,
        message: "No video found in this url or it is not a youtube url.",
        data: null,
      });
    }
  } else {
    return res.send({ message: "Request is not allowed" });
  }
});

app.get("/urls/instagram", async (req, res) => {
  if (req.get("host") === "avdl.vercel.app") {
    const url = req.query.url;
    if (!url) {
      return res.send({
        error: true,
        message: "Could not provide any url.",
        data: null,
      });
    }
    instaDL
      .getReelInfo(url)
      .then((data) => {
        return res.send({
          error: false,
          message: "Success",
          data,
        });
      })
      .catch((err) => {
        return res.send({
          error: true,
          message: "No video found in this url or it is not a instagram url.",
          data: null,
        });
      });
  } else {
    return res.send({ message: "Request is not allowed" });
  }
});

app.listen(4000, () => {
  console.log(`Server is running on PORT: 4000`);
});

module.exports = app;
