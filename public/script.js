const removeWatermark = () => {
  const ids = [];
  const iframes = document.body.querySelectorAll("iframe");
  for (const iframe of iframes) {
    if (iframe.id.startsWith("sb__open-sandbox")) ids.push(iframe.id);
  }
  for (const id of ids) {
    const node = document.createElement("div");
    node.style.setProperty("display", "none", "important");
    node.id = id;
    document.getElementById(id).remove();
    document.body.appendChild(node);
  }
};

setTimeout(removeWatermark, 500);

const loading = () => {
  document.getElementById("full-loading-section").style.display = "none";
  document.getElementById("card").style.display = "block";
  console.log("Developed by Rahul Mainwal.");
};

const urlInput = document.getElementById("url-input"),
  urlAncor = document.getElementById("url-ancor"),
  urlLinks = document.getElementById("url-links"),
  loader = document.getElementById("loader");

const getYoutubeUrls = async ({ url }) => {
  console.log(url);

  loader.innerText = "Loading...";
  loader.style.display = "block";
  urlLinks.style.display = "none";
  urlLinks.innerHTML = "";

  const urls = await fetch(`/urls/?url=${url}`);
  const response = await urls.json();

  if (response.error === false) {
    loader.innerText = "Loading...";
    loader.style.display = "none";
    urlLinks.style.display = "block";

    const responseVideoWithAudio = response.data.info.filter(
      (x) => x.hasAudio === true && x.hasVideo === true
    );

    const responseAudioWithAudio = response.data.info.filter(
      (x) => x.hasAudio === true && !x.hasVideo
    );

    const responseVideoWithoutAudio = response.data.info.filter(
      (x) => !x.hasAudio && x.hasVideo === true
    );

    const responseAudioWithoutAudio = response.data.info.filter(
      (x) => !x.hasAudio && !x.hasVideo
    );

    console.log(response);

    urlLinks.innerHTML = "";
    responseVideoWithAudio.map((x) => {
      let div = document.createElement("div");
      div.innerHTML = `<a id="ancor" href=${x.url}>${
        x.qualityLabel
          ? "Video." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
          : "Audio." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
      } (${x.qualityLabel ? x.qualityLabel : x.audioQuality}) - ${
        x.hasAudio ? "With Audio" : "No Audio"
      }</a> <br/><br/>`;
      urlLinks.appendChild(div);
    });

    responseAudioWithAudio.map((x) => {
      let div = document.createElement("div");
      div.innerHTML = `<a id="ancor" href=${x.url}>${
        x.qualityLabel
          ? "Video." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
          : "Audio." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
      } (${x.qualityLabel ? x.qualityLabel : x.audioQuality}) - ${
        x.hasAudio ? "Width Audio" : "No Audio"
      }</a> <br/><br/>`;
      urlLinks.appendChild(div);
    });

    responseVideoWithoutAudio.map((x) => {
      let div = document.createElement("div");
      div.innerHTML = `<a id="ancor" href=${x.url}>${
        x.qualityLabel
          ? "Video." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
          : "Audio." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
      } (${x.qualityLabel ? x.qualityLabel : x.audioQuality}) - ${
        x.hasAudio ? "Width Audio" : "No Audio"
      }</a>`;
      urlLinks.appendChild(div);
    });

    responseAudioWithoutAudio.map((x) => {
      let div = document.createElement("div");
      div.innerHTML = `<a id="ancor" href=${x.url}>${
        x.qualityLabel
          ? "Video." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
          : "Audio." + x.mimeType.split(" ", 2)[0].slice(6).replace(";", "")
      } (${x.qualityLabel ? x.qualityLabel : x.audioQuality}) - ${
        x.hasAudio ? "Width Audio" : "No Audio"
      }</a> <br/><br/>`;
      urlLinks.appendChild(div);
    });
  } else {
    loader.innerText = response.message;
    loader.style.display = "block";
    urlLinks.style.display = "none";
  }
};

urlInput.onkeyup = (e) => {
  if (event.keyCode === 13) {
    getYoutubeUrls({
      url: e.target.value,
    });
  }
};

urlAncor.onclick = () => {
  getYoutubeUrls({
    url: urlInput.value,
  });
};
