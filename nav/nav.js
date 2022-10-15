/**
 * Nav Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */

/*****************************************************************************************
 *                                 APPLICATION SPECIFIC NAV DATA
 * 
 *****************************************************************************************/

 const navData = {
  title: appdata.appTitle,
  link: appdata.appTitleLink
};

/*****************************************************************************************
 *                                      NAV BAR
 * 
 *****************************************************************************************/
function getNav() {
  const nav = document.createElement("nav");
  nav.classList.add("navbar", "fixed-top", "navbar-dark", "bg-dark");

  const navLink = document.createElement("a");
  navLink.classList.add("navbar-brand");
  navLink.setAttribute("href", navData.link);
  navLink.innerText = navData.title;

  nav.appendChild(navLink);
  document.body.appendChild(nav);
}
