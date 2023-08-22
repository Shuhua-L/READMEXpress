import generateTableOfContents from "@/utils/generateTOC";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type content = {
  [key: string]: string | undefined;
};

interface DocumentState {
  sections: string[];
  contents: content;
  settings?: {
    showTOC?: boolean;
    showBOT?: boolean;
  };
  document: string;
}

const initialState: DocumentState = {
  sections: ["header", "about", "tech", "getting-started", "usage", "contributing"],
  contents: {},
  settings: {
    showTOC: true,
  },
  document: "",
};

export const DocumentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    addDocument: (state, action: PayloadAction<string>) => {
      state.sections.push(action.payload);
    },
    updateContent: (state, action: PayloadAction<{ sec: string; doc: string }>) => {
      const { sec, doc } = action.payload;
      console.log({ sec, doc });
      state.contents[sec] = doc;
    },
    getDocument: (state) => {
      const { sections, contents, settings } = state;
      let res = sections.filter((sec) => sec !== undefined).map((sec: string) => contents[sec]);
      if (settings?.showTOC && Object.keys(contents).length > 0) {
        res.splice(1, 0, generateTableOfContents(res.join("\n")));
      }
      state.document = res.join("\n");
    },
    setContents: (state, action: PayloadAction<content>) => {
      state.contents = action.payload;
    },
  },
});

export default DocumentSlice.reducer;
export const { addDocument, updateContent, getDocument, setContents } = DocumentSlice.actions;
