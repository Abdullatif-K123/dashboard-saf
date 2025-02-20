/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Grid, Paper } from "@mui/material";
import parse from "html-react-parser";
import i18n from "lib/i18next";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import TextField from "./TextField";
export type EditorRef = { getData: () => string };
export type EditorProps = {
  initial: string;
  preview?: boolean;
  html?: boolean;
};
export const Editor = forwardRef(function Editor(
  { initial, preview, html }: EditorProps,
  ref
) {
  const [data, setData] = useState(initial);
  //@ts-ignore
  const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        getData() {
          return data;
        },
      } as EditorRef;
    },
    [data]
  );
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sx={{ ".ck-content": { minHeight: "20vh" } }}>
        <CKEditor
          //@ts-ignore
          ref={editorRef}
          config={{
            language: {
              content: i18n.language,
              ui: i18n.language,
            },
            toolbar: [
              "heading",
              "Bold",
              "Italic",
              "blockQuote",
              "NumberedList",
              "BulletedList",
              "Link",
              "Outdent",
              "Indent",
            ],
          }}
          //@ts-ignore
          editor={ClassicEditor}
          data={initial}
          onChange={(_: any, editor: { getData: () => string }) => {
            setData(editor.getData());
          }}
        />
      </Grid>
      {preview && (
        <Grid item xs={12}>
          <Paper
            sx={{
              minHeight: "20vh",
              overflow: "hidden",
              p: 1,
              "*": { wordBreak: "break-all" },
            }}
          >
            {parse(data)}
          </Paper>
        </Grid>
      )}
      {html && (
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            sx={{
              ".MuiOutlinedInput-root": {
                borderRadius: 2,
                bgcolor: "white",
                minHeight: "20vh",
              },
            }}
            value={data}
            multiline
            fullWidth
            onChange={(event) => {
              setData(event.currentTarget.value);
            }}
          />
        </Grid>
      )}
    </Grid>
  );
});
export default Editor;
