import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import { getUserSignInUsingGet } from "@/api/userController";
import { message } from "antd";

interface props {}

const ChartCalendar = (props: props) => {
  // 签到日期列表 [1,200] 表示第一天和第200天有数据
  const [dataList, setDataList] = useState<number[]>([1, 200]);
  // 计算图表所需要的数据
  const year = new Date().getFullYear();
  // 获取刷题记录
  const fetchDataList = async () => {
    try {
      const res = await getUserSignInUsingGet({
        year,
      });
      // @ts-ignore
      setDataList(res.data);
    } catch (e) {
      message.error("获取刷题记录失败");
    }
  };
  const optionsData = dataList.map((item) => {
    // 计算字符串
    const dateStr = dayjs(`${year}-01-01`)
      .add(item - 1, "day")
      .format("YYYY-MM-DD");
    return [dateStr, 1];
  });
  // 组件挂载时获取数据
  useEffect(() => {
    fetchDataList();
  }, []);
  // 图表配置
  const options = {
    visualMap: {
      show: false,
      min: 0,
      max: 1,
      inRange: {
        // 颜色从灰色到浅绿色
        color: ["#efefef", "lightgreen"],
      },
    },
    calendar: {
      range: year,
      left: 20,
      // 单元格自动宽度，高度为 16 像素
      cellSize: ["auto", 16],
      yearLabel: {
        position: "top",
        formatter: `${year} 年刷题记录`,
      },
    },
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: optionsData,
    },
  };

  return <ReactECharts className="chart-calendar" option={options} />;
};
export default ChartCalendar;
