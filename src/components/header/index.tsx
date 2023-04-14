import { useGetIdentity } from "@refinedev/core";
import { Layout as AntdLayout, Space, Avatar, Typography, Button } from "antd";
import { IconMoon, IconSun } from "components/icons";
import { useConfigProvider } from "contexts";
import { ModalView } from "components/tariffModal";

const { Text } = Typography;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useConfigProvider();

  return (
    <AntdLayout.Header
      style={{
        display: "flex",
        justifyContent: "flex-end",
        background: "white",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
      }}
    >
      <ModalView />
      <Space>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          type="default"
          icon={mode === "light" ? <IconMoon /> : <IconSun />}
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        />
        <Space style={{ marginLeft: "8px" }}>
          {user?.name && (
            <Text style={{ color: "black" }} strong>
              {user.name}
            </Text>
          )}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Space>
    </AntdLayout.Header>
  );
};
