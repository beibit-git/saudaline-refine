import { BaseKey } from "@refinedev/core";

import { NumberField } from "@refinedev/antd";
import { IProduct } from "interfaces";
import {
  CloseCircleOutlined,
  FormOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Card,
  Divider,
  InputNumber,
  Dropdown,
  Menu,
  Typography,
} from "antd";

const { Text, Paragraph } = Typography;

type ProductItemProps = {
  item: IProduct;
  updateStock?: (changedValue: number, clickedProduct: IProduct) => void;
  editShow: (id?: BaseKey) => void;
};

export const ProductItem: React.FC<ProductItemProps> = ({
  item,
  updateStock,
  editShow,
}) => {
  return (
    <Card
      style={{
        margin: "8px",
        opacity: item.amount <= 0 ? 0.5 : 1,
      }}
      bodyStyle={{ height: "500px" }}
    >
      <div style={{ position: "absolute", top: "10px", right: "5px" }}>
        <Dropdown
          overlay={
            <Menu mode="vertical">
              {updateStock && (
                <Menu.Item
                  key="1"
                  disabled={item.amount <= 0}
                  style={{
                    fontWeight: 500,
                  }}
                  icon={
                    <CloseCircleOutlined
                      style={{
                        color: "red",
                      }}
                    />
                  }
                  onClick={() => updateStock(0, item)}
                >
                  распродано
                </Menu.Item>
              )}
              <Menu.Item
                key="2"
                style={{
                  fontWeight: 500,
                }}
                icon={
                  <FormOutlined
                    style={{
                      color: "green",
                    }}
                  />
                }
                onClick={() => editShow(item.id)}
              >
                редактировать
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <MoreOutlined
            style={{
              fontSize: 24,
            }}
          />
        </Dropdown>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {item.mainPhoto?.url ? (
            <Avatar size={128} src={item.mainPhoto?.url} alt={item.title} />
          ) : (
            <Avatar
              size={128}
              src="/images/product-default-img.png"
              alt="no-photo"
            />
          )}

          {/* <Avatar size={128} src={item.mainPhoto} alt={item.title} /> */}
        </div>
        <Divider />
        <Paragraph
          ellipsis={{ rows: 2, tooltip: true }}
          style={{
            fontSize: "18px",
            fontWeight: 800,
            marginBottom: "8px",
          }}
        >
          {item.title}
        </Paragraph>
        <Paragraph
          ellipsis={{ rows: 3, tooltip: true }}
          style={{ marginBottom: "8px" }}
        >
          {item.description}
        </Paragraph>
        <Text
          className="item-id"
          style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#999999",
          }}
        >
          #{item.id}
        </Text>
        <Text
          className="item-id"
          style={{
            fontSize: "14px",
            color: "#999999",
          }}
        >
          Кол: {item.amount}
        </Text>
        <NumberField
          style={{
            fontSize: "24px",
            fontWeight: 500,
            marginBottom: "8px",
          }}
          options={{
            currency: "kzt",
            style: "currency",
          }}
          value={item.price}
        />
        {updateStock && (
          <div id="stock-number">
            <InputNumber
              size="large"
              keyboard
              min={0}
              value={item.amount || 0}
              onChange={(value: number | null) => updateStock(value ?? 0, item)}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </div>
    </Card>
  );
};
