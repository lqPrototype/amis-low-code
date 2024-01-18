import { Editor, ShortcutKey } from "amis-editor";
import { inject, observer } from "mobx-react";
import { toast, Select } from "amis";
import { currentLocale } from "i18n-runtime";
import { IMainStore } from "../store";
import "../editor/DisabledEditorPlugin";
import "../renderer/TableCrudRenderer";
import { useParams } from "react-router-dom";
import PCPreview from "@/icons/pc-preview.svg";
import H5Preview from "@/icons/h5-preview.svg";

let currentIndex = -1;

let host = `${window.location.protocol}//${window.location.host}`;

// 如果在 gh-pages 里面
if (/^\/amis-editor-demo/.test(window.location.pathname)) {
  host += "/amis-editor";
}

const schemaUrl = `${host}/schema.json`;

const editorLanguages = [
  {
    label: "简体中文",
    value: "zh-CN",
  },
  {
    label: "English",
    value: "en-US",
  },
];

export default inject("store")(
  observer(function ({
    store,
    history,
  }: { store: IMainStore } & Record<string, any>) {
    const { id } = useParams();
    const index: number = Number(id);
    const curLanguage = currentLocale(); // 获取当前语料类型

    if (index !== currentIndex) {
      currentIndex = index;
      store.updateSchema(store.pages[index].schema);
    }

    function save() {
      store.updatePageSchemaAt(index);
      toast.success("保存成功", "提示");
    }

    function onChange(value: any) {
      store.updateSchema(value);
      store.updatePageSchemaAt(index);
    }

    function changeLocale(value: string) {
      localStorage.setItem("suda-i18n-locale", value);
      window.location.reload();
    }

    function exit() {
      history.push(`/${store.pages[index].path}`);
    }

    return (
      <div className="Editor-Demo">
        <div className="Editor-header">
          <div className="Editor-title">amis 可视化编辑器</div>
          <div className="Editor-view-mode-group-container">
            <div className="Editor-view-mode-group">
              <div
                className={`Editor-view-mode-btn editor-header-icon ${
                  !store.isMobile ? "is-active" : ""
                }`}
                onClick={() => {
                  store.setIsMobile(false);
                }}
              >
                <img
                  src={PCPreview}
                  style={{ width: 20, height: 20 }}
                  title="PC模式"
                />
              </div>
              <div
                className={`Editor-view-mode-btn editor-header-icon ${
                  store.isMobile ? "is-active" : ""
                }`}
                onClick={() => {
                  store.setIsMobile(true);
                }}
              >
                <img
                  src={H5Preview}
                  style={{ width: 20, height: 20 }}
                  title="移动模式"
                />
              </div>
            </div>
          </div>

          <div className="Editor-header-actions">
            <ShortcutKey />
            <Select
              className="margin-left-space"
              options={editorLanguages}
              value={curLanguage}
              clearable={false}
              onChange={(e: any) => changeLocale(e.value)}
            />
            <div
              className={`header-action-btn m-1 ${
                store.preview ? "primary" : ""
              }`}
              onClick={() => {
                store.setPreview(!store.preview);
              }}
            >
              {store.preview ? "编辑" : "预览"}
            </div>
            {!store.preview && (
              <div className={`header-action-btn exit-btn`} onClick={exit}>
                退出
              </div>
            )}
          </div>
        </div>
        <div className="Editor-inner">
          <Editor
            theme={"cxd"}
            preview={store.preview}
            isMobile={store.isMobile}
            value={store.schema}
            onChange={onChange}
            onPreview={() => {
              store.setPreview(true);
            }}
            onSave={save}
            className="is-fixed"
            $schemaUrl={schemaUrl}
            showCustomRenderersPanel={true}
            amisEnv={{
              fetcher: store.fetcher,
              notify: store.notify,
              alert: store.alert,
              copy: store.copy,
            }}
          />
        </div>
      </div>
    );
  })
);
