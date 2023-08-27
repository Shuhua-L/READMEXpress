import generateTableOfContents from "@/utils/generateTOC";
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import getLiteral from "@/InputForms/Literals";
import template from "@/data/template";

export type TMap = {
  [key: string]: any;
};

export type TSection = {
  name: string;
  title: string;
  default?: TMap;
  content?: string;
};

interface DocumentState {
  sections: TSection[];
  settings?: {
    showTOC?: boolean;
    showBOT?: boolean;
  };
  template: TSection[];
}

const initialState: DocumentState = {
  sections: [],
  settings: {
    showTOC: true,
  },
  template: [],
};

export const fetchTemplate = createAsyncThunk("template/fetch", async (thunkAPI) => {
  const response = await fetch("/api/template", {
    method: "GET",
  });
  const data = response.json();
  return data;
});

export const DocumentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<{ sec: string; doc: string }>) => {
      const { sec, doc } = action.payload;
      let idx = state.sections.findIndex((section) => section.name === sec);
      state.sections[idx].content = doc;
    },
    // updateTemplate: (state, action: PayloadAction<number>) => {
    //   // const template = template
    //   state.sections = template.map((sec: TSection) => {
    //     let { name, title, default: defaultData } = sec;
    //     let literalTemplate = getLiteral({
    //       section: name,
    //       props: { title, ...defaultData },
    //     });
    //     return { ...sec, content: literalTemplate };
    //   });
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTemplate.fulfilled, (state, action) => {
      const template = action.payload.map((sec: TSection) => {
        let { name, title, default: defaultData } = sec;
        let literalTemplate = getLiteral({
          section: name,
          props: { title, ...defaultData },
        });
        return { ...sec, content: literalTemplate };
      });
      state.sections = template;
    });
  },
});

export default DocumentSlice.reducer;
export const { updateContent } = DocumentSlice.actions;

const sections = (state: RootState) => state.document.sections;

export const sectionTemplateSelector = createSelector(
  [sections, (sections, sec: string) => sec],
  (sections, sec) => {
    let idx = sections.findIndex((section) => section.name === sec);
    return sections[idx];
  }
);
