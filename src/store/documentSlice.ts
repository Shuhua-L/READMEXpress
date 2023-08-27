import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import getLiteral from "@/utils/Literals";
import { TSection } from "@/types";

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
    updateContent: (state, action: PayloadAction<{ section: string; formData: any }>) => {
      const { section, formData } = action.payload;
      let literal = getLiteral({ section, data: formData });
      let idx = state.sections.findIndex((sec) => sec.name === section);
      state.sections[idx].content = literal;
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
export const { updateContent } = DocumentSlice.actions;

const sections = (state: RootState) => state.document.sections;

export const sectionTemplateSelector = createSelector(
  [sections, (sections, sec: string) => sec],
  (sections, sec) => {
    let idx = sections.findIndex((section) => section.name === sec);
    return sections[idx];
  }
);
