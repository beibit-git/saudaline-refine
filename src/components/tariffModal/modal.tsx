import React, { useEffect, useState } from "react";
import { useApiUrl, BaseKey, useCustom } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Grid, Modal, Card, Row, Col, Typography, Tag } from "antd";
import { AESDecrypt } from "common/Crypto-Helper";
import Constants from "common/constants";
import { WalletOutlined } from "@ant-design/icons";
import axios from "axios";
import "./tariff.css";

export const ModalView = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [myTariff, setMyTariff] = useState(0);
  //   const [myBalance, setMyBalance] = useState(1);
  const [tariffs, setTariffs] = useState(null);
  const [role, setRole] = useState();
  console.log(props.myBalance);

  //   const itemString = localStorage.getItem("user");

  //   const authAxios = axios.create({
  //     baseURL: Constants.API_BASE_URL,
  //     timeout: 300000,
  //   });

  //   authAxios.interceptors.request.use(
  //     (request) => {
  //       request.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  //       return request;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   useEffect(() => {
  //     if (itemString) {
  //       const user = JSON.parse(itemString);
  //       setRole(AESDecrypt(user.role.roleName));
  //       if (role == "ROLE_PROVIDER") {
  //         authAxios
  //           .get(`${Constants.API_BASE_URL}/provider/get-provider-balance`)
  //           .then((response) => {
  //             setMyTariff(response.data.tariff);
  //             setMyBalance(response.data.balance);
  //           })
  //           .finally(() => {});
  //       }
  //     }
  //   }, []);

  useEffect(() => {
    if (props.myBalance === 0 || props.myTariff == null) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [props.myTariff, props.myBalance]);

  return (
    <>
      <Modal
        title="Подключить тариф и пополнить баланс"
        open={isModalOpen}
        closable={false}
        footer={null}
        width={"70%"}
        style={{
          textAlign: "center",
        }}
      >
        <Row gutter={16} style={{ marginTop: "25px" }}>
          <Col span={8}>
            <Card
              title="Default size card"
              style={{ width: 300 }}
              actions={[<>Действие</>]}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Default size card"
              style={{ width: 300 }}
              actions={[<>Действие</>]}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              title="Default size card"
              style={{ width: 300 }}
              actions={[<>Действие</>]}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </Modal>
      {role == "ROLE_PROVIDER" ? (
        <>
          <Typography>Мой баланс</Typography>

          <Tag
            color="blue"
            style={{ fontSize: "16px" }}
            icon={<WalletOutlined />}
          >
            {props.myBalance}
          </Tag>
        </>
      ) : null}
    </>
  );
};
