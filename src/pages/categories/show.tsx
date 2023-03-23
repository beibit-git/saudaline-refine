import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, TagField, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CategoriesShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>Provider</Title>
      <TextField value={record?.provider?.name} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
    </Show>
  );
};
