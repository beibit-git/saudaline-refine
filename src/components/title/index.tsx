import { Logo } from "./styled";
import { BikeWhiteIcon } from "components";

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  return (
    <Logo>
      {collapsed ? (
        <BikeWhiteIcon style={{ color: "white", fontSize: "32px" }} />
      ) : (
        <img src="/admin/images/adminLogo.png" alt="SaudaLine" />
      )}
    </Logo>
  );
};
