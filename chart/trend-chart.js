/**
 * Trend Chart Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */


/************************************************************************************************
 *                                        CHART SETTINGS
 *
 * **********************************************************************************************/
const trendChartSettings = {
  chartType: "line",
  chartTitle: "Weekly Trend",
  xAxisTitle: "<-------------- Rejection -------------->",
  yAxisTitle: "<-------------- Count -------------->",
  dataSets: [
    {
      label: "Week 1 Rejections",
      key: "Rejection",
      datasource: data1,
      color: "#4bc0c0",
    },
    {
      label: "Week 2 Rejections",
      key: "Rejection",
      datasource: data2,
      color: "#FFB6C1",
    },
  ],
};

/*********************************************************************************************
 *                                       CHART DATA
 *
 * *******************************************************************************************/

/**
 * This will scan the data source and prepare the key value data set
 * based on the key provided.
 */
async function getDataByFieldForTrendChart(dataSet, keyname) {
  return new Promise((resolve, reject) => {
    const listObj = {};

    for (let i = 0; i < dataSet.length; i++) {
      const value = dataSet[i][keyname];

      if (listObj[value]) {
        listObj[value] = listObj[value] + 1;
      } else {
        listObj[value] = 1;
      }
    }
    resolve(listObj);
  });
}

/**
 * This goes in X axis (e.g product - A, B, C)
 */
async function getChartLabelsForTrendChart() {
  return new Promise(async (resolve, reject) => {
    let allTrendLabels = {};

    for (let k = 0; k < trendChartSettings.dataSets.length; k++) {
      const dataLabels1 = await getDataByFieldForTrendChart(
        trendChartSettings.dataSets[k].datasource,
        trendChartSettings.dataSets[k].key
      );

      allTrendLabels = { ...allTrendLabels, ...dataLabels1 };
    }

    const chartlabels = Object.keys(allTrendLabels);
    resolve(chartlabels);
  });
}

/**
 * This is Y axis, the values (e.g 20, 30, 40)
 *
 */
async function getDataSetForTrendChart(dataSource, key, labels) {
  return new Promise(async (resolve, reject) => {
    const appData = await getDataByFieldForTrendChart(dataSource, key);
    const dataSet = [];
    labels.forEach((element) => {
      if (appData[element]) {
        dataSet.push(appData[element]);
      } else {
        dataSet.push(0);
      }
    });
    resolve(dataSet);
  });
}

async function getChartStyleForTrendChart(bordercolor) {
  return new Promise((resolve, reject) => {
    const chartStyle = {
      fill: false,
      backgroundColor: bordercolor,
      borderColor: bordercolor,
      tension: 0.5,
      lineTension: 0.5,
    };

    resolve(chartStyle);
  });
}

async function getTrendDataSet() {
  return new Promise(async (resolve, reject) => {
    const dataTrend = [];
    const chartLabels = await getChartLabelsForTrendChart();

    for (let i = 0; i < trendChartSettings.dataSets.length; i++) {
      const trendDataset = await getDataSetForTrendChart(
        trendChartSettings.dataSets[i].datasource,
        trendChartSettings.dataSets[i].key,
        chartLabels
      );

      const chartStyle = await getChartStyleForTrendChart(
        trendChartSettings.dataSets[i].color
      );

      const chartDataSet = {
        label: trendChartSettings.dataSets[i].label,
        data: trendDataset,
        ...chartStyle,
      };

      dataTrend.push(chartDataSet);
    }

    resolve(dataTrend);
  });
}

/**************************************************************************************************************
 *                                              SCALE & XY OPTION
 *
 * ************************************************************************************************************/

async function getScaleXForTrendChart() {
  return new Promise(async (resolve, reject) => {
    const scalex = {
      grid: {
        display: false,
      },
    };
    resolve(scalex);
  });
}

async function getScaleYForTrendChart() {
  return new Promise(async (resolve, reject) => {
    const scaley = {
      //beginAtZero: true,
      grid: {
        display: false,
      },
    };
    resolve(scaley);
  });
}

async function getAxisTitleForTrendChart(titleText) {
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

async function getXoptionForTrendChart() {
  return new Promise(async (resolve, reject) => {
    const scalex = await getScaleXForTrendChart();
    const titlex = await getAxisTitleForTrendChart(
      trendChartSettings.xAxisTitle
    );
    const xoption = {
      ...scalex,
      title: titlex,
    };
    resolve(xoption);
  });
}

async function getYoptionForTrendChart() {
  return new Promise(async (resolve, reject) => {
    const scaley = await getScaleYForTrendChart();
    const titley = await getAxisTitleForTrendChart(
      trendChartSettings.yAxisTitle
    );
    const yoption = {
      ...scaley,
      title: titley,
    };
    resolve(yoption);
  });
}


/**************************************************************************************************************
 *                                              PLUGIN
 *
 * ************************************************************************************************************/

async function getTrendChartTitle() {
  return new Promise(async (resolve, reject) => {
    const titleText = {
      display: true,
      text: trendChartSettings.chartTitle,
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

async function getTrendChartLegends() {
  return new Promise(async (resolve, reject) => {
    const legends = {
      display: true,
      position: "right",
      align: "center",
    };
    resolve(legends);
  });
}

async function getTrendChartPlugin() {
  return new Promise(async (resolve, reject) => {
    const trendChartTitle = await getTrendChartTitle();
    const trendChartLegends = await getTrendChartLegends();

    const plugins = {
      title: trendChartTitle,
      legend: trendChartLegends,
    };
    resolve(plugins);
  });
}

/**************************************************************************************************************
 *                                              CHART OPTIONS
 *
 * ************************************************************************************************************/

async function getTrendChartOptions() {
  return new Promise(async (resolve, reject) => {
    const plugins = await getTrendChartPlugin();
    const xOption = await getXoptionForTrendChart();
    const yOption = await getYoptionForTrendChart();

    const trendOptions = {
      scales: {
        x: xOption,
        y: yOption,
      },
      plugins: plugins,
    };
    resolve(trendOptions);
  });
}


/****************************************************************************************************
 *                                          CHART CONFIGURATION
 *
 ****************************************************************************************************/

async function getTrendConfig() {
  return new Promise(async (resolve, reject) => {
    const labels = await getChartLabelsForTrendChart();
    const chartDataSets = await getTrendDataSet();
    const trendOptions = await getTrendChartOptions();

    const data = {
      labels: labels,
      datasets: chartDataSets,
    };

    const config = {
      type: "line",
      data: data,
      options: trendOptions,
    };

    resolve(config);
  });
}


/**********************************************************************************************
 *                                    RENDER THE BAR CHART
 *
 * ********************************************************************************************/
async function getTrendChart() {
  const trendConfig = await getTrendConfig();
  const trendChartElement = document.getElementById("appTrendChart2");
  const myTrendChart = new Chart(trendChartElement, trendConfig);
}
