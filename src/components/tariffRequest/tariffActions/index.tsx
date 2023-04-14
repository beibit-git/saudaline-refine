import { useList, useTranslate, useUpdate, useGo } from "@refinedev/core";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { ITariffRequest } from "interfaces";
import { Button } from "antd";
import { RefreshButton } from "@refinedev/antd";

enum ITariffStatus {
  "NEW",
  "PAID",
  "UNPAID",
}

type TariffActionProps = {
  record: ITariffRequest;
};

export const TariffActions: React.FC<TariffActionProps> = ({ record }) => {
  const t = useTranslate();
  const { mutate } = useUpdate();
  const go = useGo();

  function refresh() {
    window.location.reload();
  }
  return (
    <>
      <Button
        disabled={record.status !== "NEW"}
        icon={
          <CheckCircleOutlined
            style={{
              color: "#52c41a",
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          mutate(
            {
              resource: "tariff-request/set-paid",
              id: record.id,
              values: {
                status: "PAID",
              },
            },
            {
              onSuccess: (data, variables, context) => {
                console.log(123123132);
                refresh();
              },
            }
          );
        }}
      >
        Подключить
      </Button>{" "}
      <Button
        icon={
          <CloseCircleOutlined
            style={{
              color: "#EE2A1E",
              fontSize: 17,
            }}
          />
        }
        disabled={record.status === "PAID" || record.status === "UNPAID"}
        onClick={() =>
          mutate({
            resource: "tariff-request/set-unpaid",
            id: record.id,
            values: {
              status: "UNPAID",
            },
          })
        }
      >
        Отклонить
      </Button>
    </>
  );
};
