"use strict";

import data from "./data.json";

console.log("Work: daily - current", data[0].timeframes.daily.current);
console.log("Work: daily - previous", data[0].timeframes.daily.previous);

// Import images (for Parcel 2)------------------------------------------
const iconWork = new URL("../images/icon-work.svg", import.meta.url).href;
const iconPlay = new URL("../images/icon-play.svg", import.meta.url).href;
const iconStudy = new URL("../images/icon-study.svg", import.meta.url).href;
const iconExercise = new URL("../images/icon-exercise.svg", import.meta.url)
  .href;
const iconSocial = new URL("../images/icon-social.svg", import.meta.url).href;
const iconSelfCare = new URL("../images/icon-self-care.svg", import.meta.url)
  .href;
const iconEllispsis = new URL("../images/icon-ellipsis.svg", import.meta.url)
  .href;

// Select elements-------------------------------------------------------
const activitiesContainer = document.getElementById("activities-container");
const btnDaily = document.getElementById("btn-daily");
const btnWeekly = document.getElementById("btn-weekly");
const btnMonthly = document.getElementById("btn-monthly");

// Current timeframe state-------------------------------------------------
let currentTimeFrame = "weekly";

// create activitiesConfig object-----------------------------------------
const activitiesConfig = {
  Work: { bg: "bg-orange-300", icon: iconWork, title: "Work" },
  Play: { bg: "bg-blue-300", icon: iconPlay, title: "Play" },
  Study: { bg: "bg-pink-400", icon: iconStudy, title: "Study" },
  Exercise: { bg: "bg-green-400", icon: iconExercise, title: "Exercise" },
  Social: { bg: "bg-purple-700", icon: iconSocial, title: "Social" },
  "Self Care": { bg: "bg-yellow-300", icon: iconSelfCare, title: "Self Care" },
};

// Get previous period label based on timeframe------------------------
const getPreviousLabel = (timeframe) => {
  const labels = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  return labels[timeframe];
};

const appendActivity = (activity, timeframe) => {
  const config = activitiesConfig[activity.title];
  const currentHours = activity.timeframes[timeframe].current;
  const previousHours = activity.timeframes[timeframe].previous;
  const previousLabel = getPreviousLabel(timeframe);

  const card = document.createElement("article");
  card.innerHTML = `  
          <div class="${config.bg} rounded-2xl overflow-hidden relative z-0">
            <figure class="w-19.5 h-19.5">
  
              <img
                class="absolute -top-2.75 right-4.75 -z-10"
                src="${config.icon}"
                alt=""
              />
            </figure>       

            <!-- blue container -->
            <div
              class="bg-navy-900 flex flex-col gap-3.75 p-6 rounded-2xl -mt-10 xl:gap-6 xl:p-8.25 hover:bg-navy-800 z-10"
            >
              <!-- title and dots -->
              <div class="flex justify-between items-center">
                <p class="text-preset-5-medium text-white">${activity.title}</p>
                <button
                  type="button"
                  class="cursor-pointer dot-states" aria-label="Add activity"
                >                  
                    <img class="w-5.25 h-1.25" src="${iconEllispsis}" alt="" />                  
                </button>
              </div>

              <!-- hours and week data -->
              <div
                class="flex justify-between items-center md:flex-col md:gap-2 md:items-start xl:pr-11.5 xl:pb-1.25"
              >
                <p
                  class="font-rubik font-light text-[2rem] leading-(--line-height-38) text-white md:text-[3.5rem] md:leading-(--line-height-66)"
                >
                  ${currentHours}hrs
                </p>
                <p class="text-preset-6 text-navy-200">${previousLabel}
                   - ${previousHours}hrs
                </p>
              </div>
            </div>
          </div>
        `;

  activitiesContainer.appendChild(card);
};

const populateDOM = (data, timeframe) => {
  // Clear existing content
  activitiesContainer.innerHTML = "";
  // Append each activity with the current timeframe
  data.forEach((activity) => {
    appendActivity(activity, timeframe);
  });
};

// Update active button state-----------------------------
const updateActiveButton = (activeBtn) => {
  [btnDaily, btnWeekly, btnMonthly].forEach((btn) => {
    btn.classList.remove("text-white");
    btn.classList.add("text-purple-500");
  });
  activeBtn.classList.remove("text-purple-500");
  activeBtn.classList.add("text-white");
  activeBtn.setAttribute("aria-pressed", "true");
};

// Initial load
if (!data) return;
if (data) {
  populateDOM(data, currentTimeFrame);
  updateActiveButton(btnWeekly);
}

// Event listeners
btnDaily.addEventListener("click", function () {
  currentTimeFrame = "daily";
  populateDOM(data, currentTimeFrame);
  updateActiveButton(btnDaily);
});

btnWeekly.addEventListener("click", function () {
  currentTimeFrame = "weekly";
  populateDOM(data, currentTimeFrame);
  updateActiveButton(btnWeekly);
});

btnMonthly.addEventListener("click", function () {
  currentTimeFrame = "monthly";
  populateDOM(data, currentTimeFrame);
  updateActiveButton(btnMonthly);
});
