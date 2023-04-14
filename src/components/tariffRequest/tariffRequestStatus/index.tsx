import { Tag } from "antd";

type TariffStatusProps = {
  status: "NEW" | "PAID" | "UNPAID" | undefined;
};

export const TariffStatus: React.FC<TariffStatusProps> = ({ status }) => {
  let color;
  let text;

  switch (status) {
    case "NEW":
      color = "orange";
      text = "Новый";
      break;
    case "PAID":
      color = "blue";
      text = "Оплаченный";
      break;
    case "UNPAID":
      color = "red";
      text = "Неоплаченнный";
      break;
  }

  return <Tag color={color}>{text}</Tag>;
};
