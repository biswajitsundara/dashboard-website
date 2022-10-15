/**
 * Line Chart Component
 * @author - Biswajit Sundara
 * @date - 15/10/2022
 */

/************************************************************************************************
 *                                        CHART SETTINGS
 *
 * **********************************************************************************************/

const lineChartSettings = {
  chartType: "line",
  chartTitle: "Weekly Trend",
  xAxisTitle: "<-------------- Products -------------->",
  yAxisTitle: "<-------------- Count -------------->",
  dataSets: [
    {
      label: "Week 1 Rejections",
      key: "Product",
      datasource: data1,
      color: "#4bc0c0",
    },
    {
      label: "Week 2 Rejections",
      key: "Product",
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
async function getDataByFieldForLineChart(dataSet1, keyname) {
  return new Promise((resolve, reject) => {
    const listObj = {};
    for (let i = 0; i < dataSet1.length; i++) {
      const value = dataSet1[i][keyname];

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
async function getChartLabelsForLineChart() {
  return new Promise(async (resolve, reject) => {
    let allLabels = {};
    for (let i = 0; i < lineChartSettings.dataSets.length; i++) {
      const dataLabels = await getDataByFieldForLineChart(
        lineChartSettings.dataSets[i].datasource,
        lineChartSettings.dataSets[i].key
      );
      allLabels = { ...allLabels, ...dataLabels };
    }

    const chartlabels = Object.keys(allLabels);
    resolve(chartlabels);
  });
}

/**
 * This is Y axis, the values (e.g 20, 30, 40)
 *
 */
async function getDataSetForLineChart(dataSource, key, labels) {
  return new Promise(async (resolve, reject) => {
    const appData = await getDataByFieldForLineChart(dataSource, key);
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

async function getChartStyleForLineChart(bordercolor) {
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

async function getLineDataSet() {
  return new Promise(async (resolve, reject) => {
    const dataLine = [];
    const chartLabels = await getChartLabelsForLineChart();

    for (let i = 0; i < lineChartSettings.dataSets.length; i++) {
      const lineDataset = await getDataSetForLineChart(
        lineChartSettings.dataSets[i].datasource,
        lineChartSettings.dataSets[i].key,
        chartLabels
      );

      const chartStyle = await getChartStyleForLineChart(
        lineChartSettings.dataSets[i].color
      );

      const chartDataSet = {
        label: lineChartSettings.dataSets[i].label,
        data: lineDataset,
        ...chartStyle,
      };

      dataLine.push(chartDataSet);
    }

    resolve(dataLine);
  });
}

/**************************************************************************************************************
 *                                            SCALES & XY OPTIONS
 *
 * ************************************************************************************************************/

async function getScaleXForLineChart() {
  return new Promise(async (resolve, reject) => {
    const scalex = {
      grid: {
        display: false,
      },
    };
    resolve(scalex);
  });
}

async function getScaleYForLineChart() {
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

async function getAxisTitleForLineChart(titleText) {
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

async function getXoptionForLineChart() {
  return new Promise(async (resolve, reject) => {
    const scalex = await getScaleXForLineChart();
    const titlex = await getAxisTitleForLineChart(lineChartSettings.xAxisTitle);
    const xoption = {
      ...scalex,
      title: titlex,
    };
    resolve(xoption);
  });
}

async function getYoptionForLineChart() {
  return new Promise(async (resolve, reject) => {
    const scaley = await getScaleYForLineChart();
    const titley = await getAxisTitleForLineChart(lineChartSettings.yAxisTitle);
    const yoption = {
      ...scaley,
      title: titley,
    };
    resolve(yoption);
  });
}

/**************************************************************************************************************
 *                                            PLUGIN
 *
 * ************************************************************************************************************/

async function getLineChartTitle() {
  return new Promise(async (resolve, reject) => {
    const titleText = {
      display: true,
      text: lineChartSettings.chartTitle,
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

async function getLineChartLegends() {
  return new Promise(async (resolve, reject) => {
    const legends = {
      display: true,
      position: "right",
      align: "center",
    };
    resolve(legends);
  });
}

async function getLineChartPlugin() {
  return new Promise(async (resolve, reject) => {
    const lineChartTitle = await getLineChartTitle();
    const lineChartLegends = await getLineChartLegends();

    const plugins = {
      title: lineChartTitle,
      legend: lineChartLegends,
    };
    resolve(plugins);
  });
}

/**************************************************************************************************************
 *                                              CHART OPTIONS
 *
 * ************************************************************************************************************/

async function getLineOptions() {
  return new Promise(async (resolve, reject) => {
    const plugins = await getLineChartPlugin();
    const xOption = await getXoptionForLineChart();
    const yOption = await getYoptionForLineChart();

    const lineOptions = {
      scales: {
        x: xOption,
        y: yOption,
      },
      plugins: plugins,
    };
    resolve(lineOptions);
  });
}

/****************************************************************************************************
 *                                          CHART CONFIGURATION
 *
 ****************************************************************************************************/

async function getLineConfig() {
  return new Promise(async (resolve, reject) => {
    const labels = await getChartLabelsForLineChart();
    const chartDataSets = await getLineDataSet();
    const lineChartOptions = await getLineOptions();

    const lineData = {
      labels: labels,
      datasets: chartDataSets,
    };

    const lineConfig = {
      type: lineChartSettings.chartType,
      data: lineData,
      options: lineChartOptions,
    };

    resolve(lineConfig);
  });
}

/**********************************************************************************************
 *                                    RENDER THE BAR CHART
 *
 * ********************************************************************************************/

async function getLineChart() {
  const lineConfig = await getLineConfig();
  const lineChartElement = document.getElementById("appTrendChart1");
  const myLineChart = new Chart(lineChartElement, lineConfig);
}
