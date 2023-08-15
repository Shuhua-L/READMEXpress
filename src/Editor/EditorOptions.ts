import SimpleMDE from "easymde";

export const options = () => {
  return {
    autofocus: true,
    spellChecker: false,
    status: false,
    toolbar: [
      "bold",
      "italic",
      {
        name: "CustomHeading",
        action: SimpleMDE.toggleHeading3,
        className: "fa fa-header",
        title: "Heading",
      },
      "|",
      "quote",
      "code",
      "link",
      "|",
      "unordered-list",
      "ordered-list",
      "horizontal-rule",
      {
        name: "CustomTable",
        action: SimpleMDE.drawTable,
        className: "fa fa-table",
        title: "Table",
      },
      "|",
      "fullscreen",
      "guide",
    ],
  } as SimpleMDE.Options;
};
