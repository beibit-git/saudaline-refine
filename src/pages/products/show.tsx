import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  DateField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
      <Title level={5}>Brand</Title>
      {/* {brandIsLoading ? <>Loading...</> : <>{brandData?.data?.id}</>} */}
      <Title level={5}>Main Photo</Title>
      <NumberField value={record?.mainPhoto ?? ""} />
      <Title level={5}>Photos</Title>
      <NumberField value={record?.photos ?? ""} />
      <Title level={5}>Unit Type</Title>
      <TextField value={record?.unitType?.name} />
      <Title level={5}>Hits</Title>
      <NumberField value={record?.hits ?? ""} />
      <Title level={5}>Creates Date</Title>
      <DateField value={record?.createsDate} />
      <Title level={5}>Category</Title>
      {/* {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.id}</>} */}
      <Title level={5}>Sub Category</Title>
      <TextField value={record?.subCategory?.title} />
      <Title level={5}>Provider</Title>
      <TextField value={record?.provider?.name} />
    </Show>
  );
};
