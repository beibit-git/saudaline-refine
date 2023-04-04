import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  DateField,
  ImageField,
} from "@refinedev/antd";
import { Typography, Col, Row } from "antd";

const { Title } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Row>
        <Col span={8}>
          <ImageField
            value={record?.mainPhoto[0].url}
            title={record?.mainPhoto[0].name}
            width={"95%"}
          />
          {/* <img src={record?.mainPhoto[0].url} alt="" width={"100%"} /> */}
        </Col>
        <Col span={15}>
          <TextField
            value={record?.title}
            style={{ fontSize: 18, fontWeight: "bold" }}
          />
          <Title level={5}>
            <strong>Номер товара:</strong>{" "}
            <NumberField value={record?.id ?? ""} />
          </Title>
          <Title level={5}>
            Категория: <TextField value={record?.category.title} />
          </Title>
          <Title level={5}>
            Цена: <TextField value={record?.price} /> тг
          </Title>
          <Title level={5}>
            <strong>Описание товара:</strong>{" "}
          </Title>
          <TextField value={record?.description} />
          <Title level={5}>
            Поставщик: <TextField value={record?.provider?.name} />
          </Title>
          <Title level={5}>
            Дата добавления товара: <DateField value={record?.created} />
          </Title>
          <Title level={5}>
            Количество просмотров: <TextField value={record?.hits} />
          </Title>
        </Col>
      </Row>
    </Show>
  );
};
