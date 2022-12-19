import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { List, message } from 'antd';
import {
  getInterfaceInfoByIdUsingGET,
  listInterfaceInfoByPageUsingGET
} from '@/services/openapi-backend/interfaceInfoController';
import {getLoginUserUsingGET} from "@/services/openapi-backend/userController";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();

  const loadData = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET(id);
      setData(res.data)
      setLoading(false);
    } catch (e: any) {
      message.error('请求失败.' + e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = '/interface_info/${item.id}';
          return <List.Item actions={[<a key={item.id} href={apiLink}>查看</a>]}>
            <List.Item.Meta
              title={<a href={apiLink}>{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        }}
        pagination={{
          // eslint-disable-next-line @typescript-eslint/no-shadow
          showTotal(total: number){
            return '总数: ' + total;
          },
          pageSize: 10,
          total,
          onChange(page, pageSize) {
            loadData(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
