import type { TTemplate } from "@/types";

const template: TTemplate = {
  header: {
    name: "header",
    title: "Header",
    default: {
      githubUser: "Shuhua-L",
      repository: "READMEXpress",
      projectTitle: "READMEXpress",
      catchPhrase: "An awesome README generator",
      logoURL: "https://raw.githubusercontent.com/Shuhua-L/READMEXpress/main/public/logo.png",
    },
  },
  about: {
    name: "about",
    title: "About the Project",
    default: {
      description: `This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.`,
    },
  },
  "getting-started": {
    name: "getting-started",
    title: "Getting Started",
    default: {
      description: "To get a local copy up and running follow these simple example steps.",
      preDescription: "This project uses NPM as package manager.",
      preCode: "npm install npm@latest -g",
      steps: [
        {
          step: "Clone the repo",
          code: "git clone https://github.com/your_username_/Project-Name.git",
        },
        {
          step: "Install NPM packages",
          code: "npm install",
        },
      ],
    },
  },
  usage: {
    name: "usage",
    title: "Usage",
    default: {
      description:
        "Use this space to tell a little more about your project and how it can be used. Show additional screenshots, code samples, demos or link to other resources. ",
    },
  },
  contributing: {
    name: "contributing",
    title: "Contributing",
    default: {
      description: `Here's how you can contribute:

- [Open an issue]() if you believe you've encountered a bug.
- Make a [pull request]() to add new features/make quality-of-life improvements/fix bugs.
        `,
    },
  },

  tech: {
    name: "tech",
    title: "Built With",
    default: {
      description:
        "This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ones/plugins for the acknowledgements section. Here are a few examples.",
      listStyle: "badge",
    },
  },
  empty: {
    name: "",
    title: "",
    default: {},
  },
};

export default template;
