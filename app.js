const express = require("express");
const ytdl = require("ytdl-core");
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

app.get("/urls/", async (req, res) => {
  if (req.get("host") === "lqgm8j-4000.csb.app") {
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

app.listen(4000, () => {
  console.log(`Server is running on PORT: 4000`);
});
