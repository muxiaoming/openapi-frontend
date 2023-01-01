import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Button, Card, Descriptions, Form, Input, message } from 'antd';
import {
  getInterfaceInfoByIdUsingGET,
} from '@/services/openapi-backend/interfaceInfoController';
import {useParams} from "@@/exports";

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams();
  const loadData = async () => {
    if (!params.id){
      message.error('参数不存在');
      return;
    }
    setLoading(true);
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id),
      });
      setData(res.data)
      setLoading(false);
    } catch (e: any) {
      message.error('请求失败.' + e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <PageContainer title="在线接口开放平台">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            <Descriptions.Item label="接口状态">{data.status ? '开启' : '关闭'}</Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求地址">{data.url}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card>
        <Form
          name="invoke"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="requestParams"
           /* rules={[{ required: true, message: 'Please input your username!' }]}*/
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Index;
