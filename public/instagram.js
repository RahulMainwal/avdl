const urlInput = document.getElementById("url-input"),
  urlAncor = document.getElementById("url-ancor"),
  urlLinks = document.getElementById("url-links"),
  thumbnailUrlConatiner = document.getElementById("thumbnailUrlConatiner"),
  loader = document.getElementById("loader");

const loading = () => {
  document.getElementById("full-loading-section").style.display = "none";
  document.getElementById("card").style.display = "block";
  thumbnailUrlConatiner.style.display = "none";
  console.log("Developed by Rahul Mainwal.");
};

const getInstagramUrls = async ({ url }) => {
  loader.innerText = "Loading...";
  loader.style.display = "block";
  urlLinks.style.display = "none";
  thumbnailUrlConatiner.style.display = "none";
  urlLinks.innerHTML = "";

  const urls = await fetch(`/urls/instagram?url=${url}`);
  const response = await urls.json();
  console.log(response);

  if (response.error === false) {
    loader.innerText = "Loading...";
    loader.style.display = "none";
    urlLinks.style.display = "block";
    thumbnailUrlConatiner.style.display = "block";
    urlLinks.innerHTML = "";
    urlLinks.innerHTML = `<a id="ancor" href=${response.data.video.contentUrl}>Video.mp4</a> <br/><br/>`;
    document
      .getElementById("thumbnailUrl")
      .setAttribute("src", response.data.video.thumbnailUrl);
  } else {
    loader.innerText = response.message;
    loader.style.display = "block";
    urlLinks.style.display = "none";
  }
};

if (urlInput.value) {
  console.log(urlInput.value);
  getInstagramUrls({
    url: e.target.value,
  });
}

urlInput.onkeyup = (e) => {
  if (event.keyCode === 13) {
    getInstagramUrls({
      url: e.target.value,
    });
  }
};

urlAncor.onclick = () => {
  getInstagramUrls({ url: urlInput.value });
};
