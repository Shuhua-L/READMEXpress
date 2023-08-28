import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import getLiteral from "@/utils/Literals";
import { TSection } from "@/types";
import generateTableOfContents from "@/utils/generateTOC";

interface DocumentState {
  sections: TSection[];
  settings: {
    showTOC?: boolean;
    showBOT?: boolean;
  };
  template: TSection[];
}

const initialState: DocumentState = {
  sections: [],
  settings: {
    showTOC: true,
    showBOT: false,
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
    updateContent: (state, action: PayloadAction<{ section: string; formData: any }>) => {
      const { section, formData } = action.payload;
      let literal = getLiteral({ section, data: formData });
      let idx = state.sections.findIndex((sec) => sec.name === section);
      state.sections[idx].content = literal;
    },
    toggleShowTOC: (state) => {
      state.settings.showTOC = !state.settings.showTOC;
    },
    toggleShowBOT: (state) => {
      state.settings.showBOT = !state.settings.showBOT;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTemplate.fulfilled, (state, action) => {
      const template = action.payload.map((sec: TSection) => {
        let { name, title, default: defaultData } = sec;
        let literalTemplate = getLiteral({
          section: name,
          data: { title, ...defaultData },
        });
        return { ...sec, content: literalTemplate };
      });
      state.sections = template;
    });
  },
});

export default DocumentSlice.reducer;
export const { updateContent, toggleShowTOC, toggleShowBOT } = DocumentSlice.actions;

const sections = (state: RootState) => state.document.sections;
const settings = (state: RootState) => state.document.settings;

export const sectionTemplateSelector = createSelector(
  [sections, (sections, sec: string) => sec],
  (sections, sec) => {
    let idx = sections.findIndex((section) => section.name === sec);
    return sections[idx];
  }
);

export const updatedDocument = createSelector([sections, settings], (sections, settings) => {
  let res = sections
    .map((section) => {
      if (settings?.showBOT && section.name !== "header" && section.name !== "toc") {
        return section.content?.concat(
          `\n<p align="right">(<a href="#readme-top">back to top</a>)</p>\n`
        );
      }
      return section.content;
    })
    .join("\n");
  if (settings?.showBOT && sections.length > 0) {
    res = `<a name="readme-top"></a>\n` + res;
  }
  if (settings?.showTOC && sections.length > 0) {
    res = generateTableOfContents(res);
  }
  return res;
});
