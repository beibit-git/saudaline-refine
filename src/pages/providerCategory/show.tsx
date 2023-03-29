import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, NumberField, ImageField, TextField } from "@refinedev/antd";
import { Typography } from "antd";
import { IProviderCategory } from "interfaces";

const { Title } = Typography;

export const ProviderCategoryShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Фото</Title>
      {record?.photo[0]?.url ? (
        <ImageField
          value={record?.photo[0]?.url}
          title={record?.photo[0]?.name}
          width={250}
        />
      ) : (
        <TextField value="нет изображения" />
      )}

      {/* <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ""} /> */}
      <Title level={5}>Название на казахском языке</Title>
      <TextField value={record?.nameKz} />
      <Title level={5}>Название на русском языке</Title>
      <TextField value={record?.nameRu} />
      <Title level={5}>Название на английском языке</Title>
      <TextField value={record?.nameEn} />
    </Show>
  );
};
