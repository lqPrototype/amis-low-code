/**
 * @author 重新定义schema
 * @filename extendsRender.tsx
 * @date 2024-01-18 星期四
 * @description
 */
import { Schema } from "amis";
import { get, isEmpty, isFunction, isObject, map, omit } from "lodash-es";
/**
 * @des 自定义格式 转换为 amis 格式
 * @date 2024-01-17 星期三
 * @function
 * @param {}
 * @return {}
 */
export const convertToAmisSchema = (
  schema: Schema,
  option: {
    preset?: Schema;
    definitions?: any;
  }
): Schema => {
  const { definitions, preset } = option;

  if (!preset && !definitions) {
    return schema;
  }

  map(schema, (value, key) => {
    if (key === "apis") {
      return;
    }

    if (isObject(value)) {
      schema[key] = convertToAmisSchema(value as any, option);
      return;
    }

    if (key === "$ref" && isFunction(get(definitions, value))) {
      delete schema.$ref;
      schema = get(definitions, value)(schema) || { type: "table-omit" };
      return;
    }

    const presetRefType =
      key === "$preset"
        ? "key"
        : typeof value === "string" && value.indexOf("$preset.") === 0
        ? "value"
        : "";

    if (!presetRefType) {
      return;
    }

    const isKeyRef = presetRefType === "key";
    const presetVal = get(
      preset,
      isKeyRef ? value : value.replace("$preset.", "")
    );
    const logStr = ` [${key}: ${value}] 请检查preset`;

    if (!presetVal) {
      console.warn("$preset 不存在。", logStr);
      return;
    }

    if (!isKeyRef) {
      schema[key] = presetVal;
      return;
    }

    if (!isObject(presetVal)) {
      console.warn("$preset为key时，只能引用object值。", logStr);
      return;
    }

    delete schema.$preset;
    schema = { ...presetVal, ...schema };
  });

  return schema;
};

/**
 * @des 处理自定义格式
 * @date 2024-01-17 星期三
 * @function
 * @param {}
 * @return {}
 */
export const resolveLibSchema = (schema: any) => {
  const { preset = {}, definitions, constants, ...rest } = schema;

  if (isEmpty(preset) && isEmpty(definitions)) {
    return { ...rest, definitions };
  }

  const reformSchema = { definitions, preset, ...rest };
  const amisSchema = convertToAmisSchema(reformSchema, {
    definitions,
    preset,
  });
  const newSchema: any = omit(amisSchema, ["preset"]);

  return newSchema;
};
