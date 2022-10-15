/**
 * Card Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */

/*****************************************************************************************
 *  APPLICATION SPECIFIC CARD DATA.  MAKE SURE THERE ARE NO DUPLICATE PROPERTIES
 * 
 *****************************************************************************************/

 //appCardData under data/cardd.js

/*****************************************************************************************
 *                     CARD COLORS (SHOULD HAVE MORE MEMBERS THAN appCardData)
 * 
 *****************************************************************************************/
const cardColors = {
  oldLace: "#fdf5e6",
  mistyRCse: "#ffdddd",
  tara: "#ddffdd",
  perano: "#BBBFE6",
  lightBlue: "#bbd4e6",
  palepink: "#f9ccca",
};

/*******************************************************************************************
 *                             CARD OBJECT (appCardData + cardColors)
 * 
 *******************************************************************************************/
async function getCardData() {
  let cardData = [];
  let i = 0;
  colorKeys = Object.keys(cardColors);

  return new Promise((resolve, reject) => {
    for (dataEle in appCardData) {
      cardData.push({
        cardHeader: dataEle,
        cardBody: appCardData[dataEle],
        cardColor: cardColors[colorKeys[i]],
      });
      i++;
    }
    resolve(cardData);
  });
}

/***************************************************************************************
 *                               CARD  (INDIVIDUAL CARD)
 * 
 ***************************************************************************************/

async function createCard(data) {
  return new Promise((resolve, reject) => {
    const card = document.createElement("div");
    card.classList.add("card", "border-0");
    card.style.width = "200px";
    card.style.backgroundColor = data.cardColor;
    card.style.borderRadius = "1em";

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header", "text-center");
    cardHeader.innerText = data.cardHeader;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", `text-dark`);

    const cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title", "text-center");
    cardTitle.innerText = data.cardBody;

    cardBody.appendChild(cardTitle);

    card.appendChild(cardHeader);
    card.appendChild(cardBody);

    resolve(card);
  });
}

/****************************************************************************************
 *                              CARD DECK (GROUP OF CARDS)
 * 
 ****************************************************************************************/

async function getAppCards() {
  const cardDeck = document.createElement("div");
  cardDeck.classList.add("card-deck");

  const cardData = await getCardData();
  cardData.forEach(async (data) => {
    const card = await createCard(data);
    cardDeck.appendChild(card);
  });

  document.getElementById("appcards").appendChild(cardDeck);
}
