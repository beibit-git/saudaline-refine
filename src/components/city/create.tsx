import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import {
  Drawer,
  Form,
  Input,
  Select,
  Checkbox,
  DrawerProps,
  FormProps,
  ButtonProps,
  Grid,
} from "antd";
import { IRegion } from "interfaces";

type CreateCityProps = {
  drawerProps: DrawerProps;
  formProps: FormProps;
  saveButtonProps: ButtonProps;
};

export const CityCreate: React.FC<CreateCityProps> = ({
  drawerProps,
  formProps,
  saveButtonProps,
}) => {
  const breakpoint = Grid.useBreakpoint();

  const { selectProps: regionSelectProps } = useSelect<IRegion>({
    resource: "region",
  });

  return (
    <Drawer
      {...drawerProps}
      width={breakpoint.sm ? "500px" : "100%"}
      zIndex={1001}
    >
      <Create
        resource="city"
        saveButtonProps={saveButtonProps}
        goBack={false}
        contentProps={{
          style: {
            boxShadow: "none",
          },
          bodyStyle: {
            padding: 0,
          },
        }}
      >
        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            isActive: true,
          }}
        >
          <Form.Item
            label="Регион"
            name={["region"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select {...regionSelectProps} />
          </Form.Item>
          <Form.Item
            label="Названия на русском"
            name={["name"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item
            label="Названия на русском"
            name={["nameRu"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Названия на казахском"
            name={["nameKz"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Названия на английском"
            name={["nameEn"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item> */}
        </Form>
      </Create>
    </Drawer>
  );
};
