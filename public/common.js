console.log(window.location.pathname);

if (window.location.pathname === "/") {
  document.getElementById("youtube").style.color = "rgba(215, 3, 56)";
  document.getElementById("youtube").style.fontWeight = "bold";
  document.getElementById("youtube").style.borderBottom = "1px solid red";
}

if (window.location.pathname === "/instagram") {
  document.getElementById("instagram").style.color = "#C13584";
  document.getElementById("instagram").style.fontWeight = "bold";
  document.getElementById("instagram").style.borderBottom = "1px solid #C13584";
}
