/**
 * Side Nav Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */

/*****************************************************************************************
 *                                 APPLICATION SPECIFIC SIDE NAV DATA
 *
 *****************************************************************************************/

const sideNavData = [
  {
    navText: "Home",
    navActive: true,
    navIcon: "fa-home",
    navLink: ["appBarChartBox", "appTable", "dropdownrow"],
  },
  {
    navText: "Week Chart",
    navActive: false,
    navIcon: "fa-bar-chart",
    navLink: ["appBarChartBox"],
  },
  {
    navText: "Details Table",
    navActive: false,
    navIcon: "fa-table",
    navLink: ["appTable", "dropdownrow"],
  },
  {
    navText: "Trend Chart",
    navActive: false,
    navIcon: "fa-line-chart",
    navLink: ["appTrendChartBox1", "appTrendChartBox2"],
  },
];

/*****************************************************************************************
 *                          APPLICATION SPECIFIC CALENDAR NAV DATA
 *
 *****************************************************************************************/
const calNavData = [
  {
    navText: "Current Week",
    link: true,
    navIcon: "fa-calendar",
    navLink: appdata.currentWeekLink,
    date: appdata.currentWeek,
  },
  {
    navText: "Previous Week",
    link: false,
    navIcon: "fa-calendar",
    navLink: appdata.previousWeekLink,
    date: appdata.previousWeek,
  },
];

/*****************************************************************************************
 *                                  RESET NAV ACTIVE STATUS
 *
 *****************************************************************************************/

function resetNavActiveStatus(navTobeActivated) {
  const navLinks = document.getElementsByClassName("nav-link");

  for (i = 0; i < navLinks.length; i++) {
    if (navLinks[i].classList.contains("active")) {
      navLinks[i].classList.remove("active");
    }
    if (navLinks[i].innerText == navTobeActivated) {
      navLinks[i].classList.add("active");
    }
  }
}

/*****************************************************************************************
 *                                  RESET NAV ITEMS
 *
 *****************************************************************************************/

function resetItems(itemToBeActivated) {
  sideNavData.forEach((navData) => {
    for (let i = 0; i < navData.navLink.length; i++) {
      const navElem = document.getElementById(navData.navLink[i]);
      if (navData.navLink[i] != "#" && navElem != null) {
        navElem.style.display = "none";
      }
      if (navData.navLink[i] == "dropdownrow") {
        const dds = document.getElementsByClassName("dropdownrow");
        for (let k = 0; k < dds.length; k++) {
          dds[k].style.display = "none";
        }
      }
    }
  });

  for (let j = 0; j < itemToBeActivated.length; j++) {
    if (itemToBeActivated[j] == "dropdownrow") {
      const dds = document.getElementsByClassName("dropdownrow");
      for (let k = 0; k < dds.length; k++) {
        dds[k].style.display = "block";
      }
    } else {
      document.getElementById(itemToBeActivated[j]).style.display = "block";
    }
  }
}

/*****************************************************************************************
 *                                  SIDE NAV ITEM
 *
 *****************************************************************************************/

async function getSideNavItem(data) {
  return new Promise((resolve, reject) => {
    const navLink = document.createElement("a");
    navLink.classList.add("nav-link");
    if (data.navActive) {
      navLink.classList.add("active");
    }

    navLink.style.cursor = "pointer";
    navLink.setAttribute("role", "tab");
    navLink.innerHTML = `<i class="fa ${data.navIcon} mr-2"></i>  ${data.navText}`;

    navLink.addEventListener("click", (event) => {
      resetNavActiveStatus(event.target.innerText);
      resetItems(data.navLink);
    });

    resolve(navLink);
  });
}

/*****************************************************************************************
 *                                  CALENDAR NAV ITEM
 *
 *****************************************************************************************/
function getCalendarNavItem(data) {
  return new Promise((resolve, reject) => {
    let navLink;

    if (data.link) {
      navLink = document.createElement("a");
      navLink.setAttribute("href", data.navLink);
      navLink.style.cursor = "pointer";
    } else {
      navLink = document.createElement("span");
    }

    navLink.classList.add("nav-link");
    navLink.setAttribute("role", "tab");
    navLink.innerHTML = `<i class="fa ${data.navIcon} mr-2"></i>  ${data.navText}`;

    const dateText = document.createElement("p");
    dateText.innerText = data.date;
    navLink.appendChild(dateText);

    resolve(navLink);
  });
}

/*****************************************************************************************
 *                                  SIDE NAV UI
 *
 *****************************************************************************************/
async function getSideNav() {
  const navDiv = document.createElement("div");
  navDiv.classList.add("nav", "flex-column", "nav-pills");
  navDiv.setAttribute("role", "tabList");
  navDiv.style.marginTop = "100px";
  navDiv.style.marginLeft = "50px";

  sideNavData.forEach(async (data) => {
    const navItem = await getSideNavItem(data);
    navDiv.appendChild(navItem);
  });

  const calDiv = document.createElement("div");
  calDiv.classList.add("nav", "flex-column", "nav-pills");
  calDiv.setAttribute("role", "tabList");
  calDiv.style.marginTop = "40px";
  calDiv.style.marginLeft = "50px";

  calNavData.forEach(async (data) => {
    const navItem = await getCalendarNavItem(data);
    calDiv.appendChild(navItem);
  });

  document.getElementById("leftCol").appendChild(navDiv);
  document.getElementById("leftCol").appendChild(calDiv);
}
