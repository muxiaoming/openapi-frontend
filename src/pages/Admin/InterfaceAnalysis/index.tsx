import {PageContainer} from "@ant-design/pro-components";
import '@umijs/max';
import React, {useEffect, useState} from "react";
import ReactECharts from 'echarts-for-react';
import {listTopInvokeInterfaceInfoUsingGET} from "@/services/openapi-backend/analysisController";
import {message} from "antd";

/**
 * 接口分析
 * @constructor
 */
const InterfaceAnalysis: React.FC = () => {
  // react 语法, 理解, 前者是定义属性, 后者定义属性的设置(set)方法
  // 无需get方法,data本身就能取到数据, useState()可能类似初始化, []表示初始化数组,
  const [data, setData] = useState<API.InterfaceInfoVO[]>([]);
  // true/false 表示初始化boolean
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // todo 从远程获取数据
    try {
      listTopInvokeInterfaceInfoUsingGET().then((res) => {
        if (res.data) {
          setData(res.data);
        }
      });
    } catch (e: any) {
      message.error('请求失败.' + e.message);
    }
  }, []);

  // 映射, {value: 1048, name: 'Search Engine'}
  const chartData = data.map(Item => {
    return {
      value: Item.totalNum,
      name: Item.name
    }
  });

  const option = {
    title: {
      text: '接口调用TOP3',
      subtext: '接口详情',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  return (
    <PageContainer>
      <ReactECharts loadingOption={{
        showLoading: loading
      }} option={option} />
    </PageContainer>
  );
};
export default InterfaceAnalysis;
