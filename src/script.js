"use strict";

import data from "./data.json";
console.log(data[0].title);

const btn = document.getElementById("nav-btn");
const workHoursCur = document.getElementById("work-hours-cur");
const workHoursPrev = document.getElementById("work-hours-prev");

btn.addEventListener("click", function () {
  if (btn && "Daily") {
    workHoursCur.innerHTML = `${data[0].timeframes.daily.current}hrs`;
    workHoursPrev.innerHTML = `Last Week - ${data[0].timeframes.daily.previous}hrs`;

    console.log("Yes");
  }
});
