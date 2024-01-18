/**
 * @author 导出schema
 * @date 2024-01-17 星期三
 * @function
 * @param {}
 * @return {}
 */
export const schema = {
  type: "chart",
  config: {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
      },
    ],
    backgroundColor: "transparent",
  },
  replaceChartOption: true,
  id: "u:792241949a44",
  dataFilter: "",
};
