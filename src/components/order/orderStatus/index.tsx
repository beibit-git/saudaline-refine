import { Tag } from "antd";

type OrderStatusProps = {
  status: "NEW" | "APPROVED" | "CANCELED" | "CLOSED" | undefined;
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  let color;
  let text;

  switch (status) {
    case "CANCELED":
      color = "orange";
      text = "Отклонено поставщиком";
      break;
    // case "APPROVED":
    //     color = "cyan";
    //     break;
    case "NEW":
      color = "green";
      text = "Ожидающий";
      break;
    case "APPROVED":
      color = "blue";
      text = "Принято";
      break;
    case "CLOSED":
      color = "red";
      text = "Отклонено заказчиком";
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};
