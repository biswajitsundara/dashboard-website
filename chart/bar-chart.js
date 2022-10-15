/**
 * Bar Chart Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */


/*********************************************************************************************************
 *                                          APP CHART SETTINGS
 *********************************************************************************************************/

const barChartSettings = {
  chartTitle: "Monthly Sales Report",
  chartType: "bar",
  datasource: data1,
  xAxisTitle: "<------------- Products ------------>",
  yAxisTitle: "<------------- Sales --------------->",
  xAxisKey: "Rejection",
  yAxisKey: "Product",
};

/***********************************************************************************************************
 *                                           PLUGIN SECTION
 *
 * *********************************************************************************************************/

async function getBarChartTitle() {
  return new Promise(async (resolve, reject) => {
    const titleText = {
      display: true,
      text: barChartSettings.chartTitle,
      padding: {
        top: 10,
        bottom: 30,
      },
      font: {
        family: "Roboto",
        size: 22,
      },
    };
    resolve(titleText);
  });
}

async function getBarChartLegends() {
  return new Promise(async (resolve, reject) => {
    const legends = {
      display: true,
      position: "right",
      align: "center",
    };
    resolve(legends);
  });
}

async function getBarChartPlugin() {
  return new Promise(async (resolve, reject) => {
    const barChartTitle = await getBarChartTitle();
    const barChartLegends = await getBarChartLegends();

    const plugins = {
      title: barChartTitle,
      legend: barChartLegends,
    };
    resolve(plugins);
  });
}

/*************************************************************************************************************
 *                                            SCALE & XY OPTION SECTION
 *
 * ***********************************************************************************************************/

async function getScaleXForBarChart() {
  return new Promise(async (resolve, reject) => {
    const scalex = {
      stacked: true,
      grid: {
        display: false,
      },
    };
    resolve(scalex);
  });
}

async function getScaleYForBarChart() {
  return new Promise((resolve, reject) => {
    const scaley = {
      stacked: true,
      beginAtZero: true,
      grid: {
        display: false,
      },
    };
    resolve(scaley);
  });
}

async function getAxisTitleForBarChart(titleText) {
  return new Promise(async (resolve, reject) => {
    const title = {
      display: true,
      text: titleText,
      color: "#816d6a",
      font: {
        family: "'Roboto', sans-serif",
        size: 18,
        weight: "bold",
        lineHeight: 1.2,
      },
    };
    resolve(title);
  });
}

async function getXoptionForBarChart() {
  return new Promise(async (resolve, reject) => {
    const scalex = await getScaleXForBarChart();
    const titlex = await getAxisTitleForBarChart(barChartSettings.xAxisTitle);
    const xoption = {
      ...scalex,
      title: titlex,
    };
    resolve(xoption);
  });
}

async function getYoptionForBarChart() {
  return new Promise(async (resolve, reject) => {
    const scaley = await getScaleYForBarChart();
    const titley = await getAxisTitleForBarChart(barChartSettings.yAxisTitle);
    const yoption = {
      ...scaley,
      title: titley,
    };
    resolve(yoption);
  });
}

/**************************************************************************************************************
 *                                            CHART OPTIONS
 *
 * ************************************************************************************************************/

async function getBarChartOptions() {
  return new Promise(async (resolve, reject) => {
    const plugins = await getBarChartPlugin();
    const xOption = await getXoptionForBarChart();
    const yOption = await getYoptionForBarChart();

    const barOptions = {
      scales: {
        x: xOption,
        y: yOption,
      },
      plugins: plugins,
    };
    resolve(barOptions);
  });
}

/*****************************************************************************************************************
 *                                            UTILITY - COLOR PALETTE
 *
 * **************************************************************************************************************/

async function getColor(labels) {
  return new Promise((resolve, reject) => {
    colors = [
      "#13B6CF","#36A2EB","#ed7c76","#E85D88","#854E9B","#6E8598","#5A68AD","#cfcfbc","#224651",
      "#583660","#F5DEB3","#8c4548","#36454f","#45B08C","#C5A1AF","#8C92AC","#483C32","#FFA07A",
      "#F4A460","#DB7093","#F7CAC9","#5f9ea0","#008080","#4682B4","#8D918D","#614051","#b76e79",
      "#C54B8C","#bcb88a","#b3cee5","#91A092","#405580","#89CFF0","#FDBCB4","#E3A869","#0492C2",
    ];

    let colorData = {};

    for (let i = 0; i < labels.length; i++) {
      colorData[labels[i]] = colors[i];
    }

    resolve(colorData);
  });
}

/********************************************************************************************************************
 *                                             CHART DATA
 *
 ********************************************************************************************************************/

/**
 * This goes in X axis (e.g Rejections - Expired, Returned)
 */

async function getXChartLabelsForBarChart() {
  return new Promise(async (resolve, reject) => {
    let allLabelset = new Set();
    const appData = barChartSettings.datasource;
    const xkey = barChartSettings.xAxisKey;

    for (i = 0; i < appData.length; i++) {
      allLabelset.add(appData[i][xkey]);
    }

    const allLabelArray = Array.from(allLabelset);
    resolve(allLabelArray);
  });
}

/**
 * This goes in Y axis (e.g Products - Milk, Paneer)
 */
async function getYChartLabelsForBarChart() {
  return new Promise(async (resolve, reject) => {
    let allLabelset = new Set();
    const appData = barChartSettings.datasource;
    const ykey = barChartSettings.yAxisKey;

    for (i = 0; i < appData.length; i++) {
      allLabelset.add(appData[i][ykey]);
    }

    const allLabelArray = Array.from(allLabelset);
    resolve(allLabelArray);
  });
}

/**
 * This will return the vertical data {"Expired": 3, "Returned": 2}
 */

async function getYAxisDataForBarChart(ychartLabel) {
  return new Promise((resolve, reject) => {
    const appData = barChartSettings.datasource;
    const ykey = barChartSettings.yAxisKey;
    const xkey = barChartSettings.xAxisKey;
    let xdataObj = {};

    for (j = 0; j < appData.length; j++) {
      if (appData[j][ykey] === ychartLabel) {
        const xdataLabel = appData[j][xkey]; //Expired
        if (xdataObj[xdataLabel]) {
          xdataObj[xdataLabel] = xdataObj[xdataLabel] + 1;
        } else {
          xdataObj[xdataLabel] = 1;
        }
      }
    }
    resolve(xdataObj);
  });
}

/**
 * This goes in Y axis (e.g product - 10, 20, 30)
 * This will return the vertical data {"Milk": 3}
 */

async function getXYAxisDataForBarChart() {
  return new Promise(async (resolve, reject) => {
    const ylabels = await getYChartLabelsForBarChart();
    let xyDataObj = {};

    for (let i = 0; i < ylabels.length; i++) {
      const ydata = await getYAxisDataForBarChart(ylabels[i]);
      xyDataObj[ylabels[i]] = ydata;
    }

    resolve(xyDataObj);
  });
}

async function getBarChartData() {
  return new Promise(async (resolve, reject) => {
    const xydata = await getXYAxisDataForBarChart();
    const xlabels = await getXChartLabelsForBarChart();
    const ylabels = await getYChartLabelsForBarChart();
    const colorSet = await getColor(ylabels);

    const bardataSet = [];

    for (j = 0; j < ylabels.length; j++) {
      const dataArray = [];
      let dataColors = [];

      for (i = 0; i < xlabels.length; i++) {
        if (xydata[ylabels[j]][xlabels[i]]) {
          dataArray.push(xydata[ylabels[j]][xlabels[i]]);

          dataColors.push(colorSet[ylabels[j]]);
        } else {
          dataArray.push(0);
        }
      }

      bardataSet.push({
        label: ylabels[j],
        data: dataArray,
        backgroundColor: dataColors,
        borderColor: "white",
        borderWidth: 0.2,
      });
    }

    const barChartData = {
      labels: xlabels,
      datasets: bardataSet,
    };

    resolve(barChartData);
  });
}

/****************************************************************************************************
 *                                          CHART CONFIGURATION
 *
 ****************************************************************************************************/

async function getBarChartConfig() {
  return new Promise(async (resolve, reject) => {
    const dataBar = await getBarChartData();
    const barChartOptions = await getBarChartOptions();
    const barConfig = {
      type: barChartSettings.chartType,
      data: dataBar,
      options: barChartOptions,
    };
    resolve(barConfig);
  });
}

/**********************************************************************************************
 *                                    RENDER THE BAR CHART
 *
 * ********************************************************************************************/

async function getBarChart() {
  const barChartElement = document.getElementById("appBarChart");
  const barChartConfig = await getBarChartConfig();
  const myBarChart = new Chart(barChartElement, barChartConfig);
}
