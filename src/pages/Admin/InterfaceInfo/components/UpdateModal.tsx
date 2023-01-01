import type {ProColumns, ProFormInstance} from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  //shift+f6,在变量定义处重命名
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
};
const UpdateModal: React.FC<Props> = (props) => {
  const { values, visible, columns, onCancel, onSubmit } = props;

  const formRef = useRef<ProFormInstance>();

  useEffect(() =>{
    if(formRef){
      formRef.current?.setFieldsValue(values)
    }
  },[values])
  return (
    <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
    {/*  {JSON.stringify(values)}*/}
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        onSubmit={async (value) => {
          onSubmit?.(value);
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
