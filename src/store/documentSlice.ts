import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import getLiteral from "@/utils/Literals";
import { TModule } from "@/types";
import generateTableOfContents from "@/utils/generateTOC";

interface DocumentState {
  // sections: TSection[];
  sections: string[];
  settings: {
    showTOC?: boolean;
    showBOT?: boolean;
  };
  // template: TSection[];
  modules: {
    [key: string]: TModule;
  };
}

const initialState: DocumentState = {
  sections: [],
  settings: {
    showTOC: true,
    showBOT: false,
  },
  // template: [],
  modules: {},
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
      // console.log({ section, formData, literal });
      state.modules[section].content = literal;
    },
    toggleShowTOC: (state) => {
      if (state.settings.showTOC) {
        state.sections = state.sections.filter((sec) => sec !== "toc");
      } else {
        const index = state.sections[0] === "header" ? 1 : 0;
        state.sections.splice(index, 0, "toc");
      }
      state.settings.showTOC = !state.settings.showTOC;
    },
    toggleShowBOT: (state) => {
      state.settings.showBOT = !state.settings.showBOT;
    },
    updateSections: (state, action: PayloadAction<string[]>) => {
      state.settings.showTOC = action.payload.includes("toc");
      state.sections = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTemplate.fulfilled, (state, action) => {
      const template = action.payload.map((sec: TModule) => {
        let { name, title, default: defaultData } = sec;
        let literalTemplate = getLiteral({
          section: name,
          data: { title, ...defaultData },
        });
        state.modules[name] = { ...sec, content: literalTemplate };
        return name;
      });
      state.sections = template;
    });
  },
});

export default DocumentSlice.reducer;
export const { updateContent, updateSections, toggleShowTOC, toggleShowBOT } =
  DocumentSlice.actions;

const sections = (state: RootState) => state.document.sections;
const settings = (state: RootState) => state.document.settings;
const modules = (state: RootState) => state.document.modules;

export const sectionTemplateSelector = createSelector(
  [modules, (modules, sec: string) => sec],
  (modules, sec) => {
    return modules[sec];
  }
);

export const updatedDocument = createSelector(
  [sections, settings, modules],
  (sections, settings, modules) => {
    let res = sections
      .map((section) => {
        if (settings?.showBOT && section !== "header" && section !== "toc") {
          return modules[section]?.content?.concat(
            `\n<p align="right">(<a href="#readme-top">back to top</a>)</p>\n`
          );
        }
        return modules[section]?.content;
      })
      .join("\n");
    // console.log("updatedDocument", { sections, modules, res });
    if (settings?.showBOT && sections.length > 0) {
      res = `<a name="readme-top"></a>\n` + res;
    }
    if (settings?.showTOC && sections.length > 0) {
      res = generateTableOfContents(res);
    }
    return res;
  }
);

export const sectionsWithKeysSelector = createSelector([sections], (sections) => {
  return sections.map((key, idx) => {
    return { id: idx + 1, sectionKey: key };
  });
});
