import { Renderer, RendererProps } from "amis";
import React from "react";

export type TableCssProps = RendererProps & {
  css?: string;
  htmlClassName?: string;
  tag?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const getAmisCrudSchema = (props: any) => {
  const { tableClassName = "", filter, headerToolbar = [], ...rest } = props;

  const crudSchema: any = {
    keepItemSelectionOnPageChange: true,
    ...rest,
    type: "crud",
    headerToolbar,
    filter: {
      ...filter,
      title: "",
      submitText: "",
      wrapWithPanel: false,
    },
  };

  return crudSchema;
};

export type TableCrudProps = TableCssProps;

@Renderer({
  test: /(^|\/)table-crud$/,
  name: "table-crud",
})
export class LibCrud extends React.Component<TableCrudProps> {
  render() {
    const { render } = this.props;

    return render("body", getAmisCrudSchema(this.props));
  }
}
