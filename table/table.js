/**
 * Table Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */

/*****************************************************************************************
 *                                   TABLE FILTERS
 *
 *****************************************************************************************/

async function getFilterFields(fieldName) {
  return new Promise((resolve, reject) => {
    const filterData = [];
    tableData.forEach((tdata) => {
      filterData.push(tdata[fieldName]);
    });
    const filteredData = [...new Set(filterData)];
    resolve(filteredData);
  });
}

/*****************************************************************************************
 *                                   FILTER DROP DOWN
 *
 *****************************************************************************************/

async function getDropDownButton(dropdownText) {
  return new Promise((resolve, reject) => {
    const ddbutton = document.createElement("button");
    ddbutton.classList.add(
      "btn",
      "btn-secondary",
      "dropdown-toggle",
      "dropdownrow"
    );
    ddbutton.setAttribute("type", "button");
    ddbutton.setAttribute("data-toggle", "dropdown");
    ddbutton.innerText = dropdownText;
    resolve(ddbutton);
  });
}

async function getDropDownItem(data, fieldName, ddButton) {
  return new Promise((resolve, reject) => {
    const dropdownMenuItem = document.createElement("a");
    dropdownMenuItem.classList.add("dropdown-item");
    dropdownMenuItem.setAttribute("href", "javascript:void(0);");
    dropdownMenuItem.innerText = data;

    dropdownMenuItem.addEventListener("click", (event) => {
      filterTableData(event.target.innerText, fieldName);
      ddButton.innerText = event.target.innerText;
    });

    resolve(dropdownMenuItem);
  });
}

/*****************************************************************************************
 *                                   FILTER TABLE DATA
 *
 *****************************************************************************************/

async function filterTableData(fieldValue, fieldName) {
  const filteredData = [];
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i][fieldName] == fieldValue) {
      filteredData.push(tableData[i]);
    }
  }

  const table = document.getElementById("table");
  const row = document.getElementsByTagName("tbody")[0];
  row.parentNode.removeChild(row);
  reloadAppTable(filteredData);
}

/*****************************************************************************************
 *                                   FILTER DROP DOWN
 *
 *****************************************************************************************/
async function getDropDown() {
  for (j = 0; j < filterFields.length; j++) {
    const dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    dropdown.classList.add("m-2");

    const dropdownMenu = document.createElement("div");
    dropdownMenu.classList.add("dropdown-menu");

    const ddButton = await getDropDownButton(filterFields[j]);
    ddButton.style.width = "250px";
    const dData = await getFilterFields(filterFields[j]);

    //For numbers it will not give correct result
    const sortedDropDownData = dData.sort();

    for (let i = 0; i < sortedDropDownData.length; i++) {
      const menuItem = await getDropDownItem(
        sortedDropDownData[i],
        filterFields[j],
        ddButton
      );
      dropdownMenu.appendChild(menuItem);
    }

    dropdown.appendChild(ddButton);
    dropdown.appendChild(dropdownMenu);

    document.getElementById("dropdownrow").appendChild(dropdown);
  }

  const resetButton = document.createElement("button");
  resetButton.classList.add("btn", "btn-danger", "m-2");
  resetButton.classList.add("dropdownrow");
  resetButton.innerText = "Reset";

  resetButton.addEventListener("click", (event) => {
    const ddButtons = document.getElementsByClassName("dropdown-toggle");
    for (j = 0; j < filterFields.length; j++) {
      ddButtons[j].innerText = filterFields[j];

      const table = document.getElementById("table");
      const row = document.getElementsByTagName("tbody")[0];
      row.parentNode.removeChild(row);
      reloadAppTable(tableData);
    }
  });

  document.getElementById("dropdownrow").appendChild(resetButton);
}

/*****************************************************************************************
 *                                   TABLE ROW
 *
 *****************************************************************************************/

async function getTableRow(data, rowNo) {
  return new Promise((resolve, reject) => {
    const tr = document.createElement("tr");

    const indexTd = document.createElement("td");
    indexTd.innerText = rowNo + 1;
    indexTd.style.width = "2%";
    tr.appendChild(indexTd);

    columnNames.forEach((colname) => {
      let cellText = data[colname];

      if (
        collapsibleField.includes(colname) &&
        cellText.length > collapsibleFieldLimit
      ) {
        cellText = cellText.substring(0, 50);
        cellText = cellText.concat("....");
      }

      if (!hiddenFields.includes(colname)) {
        const td = document.createElement("td");
        td.style.width = columnWidth[colname];
        if (HTMLFields.includes(colname)) {
          td.innerHTML = cellText;
        } else {
          td.innerText = cellText;
        }

        td.addEventListener("dblclick", (event) => {
          if (collapsibleField.includes(colname)) {

            if(td.innerText.endsWith('...')){
              td.innerText = data[colname];
            }
            else{
              td.innerText = cellText;
            }  
          }
        });
        tr.appendChild(td);
      }
    });
    resolve(tr);
  });
}

async function getTableHeading() {
  return new Promise((resolve, reject) => {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    const indexTh = document.createElement("th");
    indexTh.innerText = "SL";
    tr.appendChild(indexTh);

    columnNames = Object.getOwnPropertyNames(tableData[0]);
    columnNames.forEach((colname) => {
      if (!hiddenFields.includes(colname)) {
        const th = document.createElement("th");
        th.innerText = colname;
        tr.appendChild(th);
      }
    });
    thead.appendChild(tr);
    resolve(thead);
  });
}

async function reloadAppTable(tdata) {
  const tbody = document.createElement("tbody");
  tdata.forEach(async (data, rowIndex) => {
    const rowData = await getTableRow(data, rowIndex);
    tbody.appendChild(rowData);
  });

  document.getElementById("table").appendChild(tbody);
}

/*****************************************************************************************
 *                                    RENDER TABLE
 *
 *****************************************************************************************/

async function getAppTable() {
  const tableCard = document.createElement("div");
  tableCard.classList.add("tcard");
  tableCard.style.boxShadow =
    "0 5px 5px -3px #0003, 0 8px 10px 1px #00000024, 0 3px 14px 2px #0000001f;";
  tableCard.style.borderRadius = "3%";

  const table = document.createElement("table");
  table.classList.add("table", "table-bordered");
  table.setAttribute("id", "table");

  const thead = await getTableHeading();
  const tbody = document.createElement("tbody");

  tableData.forEach(async (data, rowIndex) => {
    const rowData = await getTableRow(data, rowIndex);
    tbody.appendChild(rowData);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  document.getElementById("appTable").appendChild(table);
  getFilterFields();
}
