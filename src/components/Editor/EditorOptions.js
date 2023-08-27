import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("easymde"), { ssr: false });

export const options = () => {
  return {
    ...SimpleMDE.Options,
    autofocus: true,
    spellChecker: false,
    status: false,
    toolbar: [
      "bold",
      "italic",
      // {
      //   name: "CustomHeading",
      //   action: SimpleMDE.toggleHeading3,
      //   className: "fa fa-header",
      //   title: "Heading",
      // },
      "heading-3",
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
  };
};
