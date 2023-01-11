const chartBoxZoom1 = document.getElementById("zoom1");
const chartBoxZoom2 = document.getElementById("zoom2");
const chartBoxZoom3 = document.getElementById("zoom3");

chartBoxZoom1.addEventListener("click", (e) => {
  if (chartBoxZoom1.innerText == "+") {
    document.getElementById("appBarChartBox").style.width = "70vw";
    chartBoxZoom1.innerText = "-";
  } else {
    document.getElementById("appBarChartBox").style.width = "50vw";
    chartBoxZoom1.innerText = "+";
  }
});

chartBoxZoom2.addEventListener("click", (e) => {
  if (chartBoxZoom2.innerText == "+") {
    document.getElementById("appTrendChartBox1").style.width = "70vw";
    chartBoxZoom2.innerText = "-";
  } else {
    document.getElementById("appTrendChartBox1").style.width = "50vw";
    chartBoxZoom2.innerText = "+";
  }
});

chartBoxZoom3.addEventListener("click", (e) => {
  if (chartBoxZoom3.innerText == "+") {
    document.getElementById("appTrendChartBox2").style.width = "70vw";
    chartBoxZoom3.innerText = "-";
  } else {
    document.getElementById("appTrendChartBox2").style.width = "50vw";
    chartBoxZoom3.innerText = "+";
  }
});
