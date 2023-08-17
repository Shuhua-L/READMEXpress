import { THeaderTemplate, TBasicLiteral, TDownloadTemplate } from "@/types";

type GetLiteralProps = {
  section: string;
  props: any;
};

const getLiteral = ({ section, props }: GetLiteralProps) => {
  switch (section) {
    case "header": {
      return HeaderTemplate(props);
    }
    case "getting-started": {
      return DownloadTemplate(props);
    }
    default: {
      return BasicLiteral(props);
    }
  }
};

export const HeaderTemplate = (props: THeaderTemplate) => {
  const { projectTitle, catchPhrase, logoURL, githubHandler, repository } = props;
  const projectLogo =
    logoURL.length > 0
      ? `<a href="https://github.com/${githubHandler}/${repository}">
  <img src="${logoURL}" alt="Logo" width="80" height="80">
  </a>`
      : "";

  return `
<div align="center">
${projectLogo}
<h3 align="center">${projectTitle}</h3>
<p align="center">
${catchPhrase}
<br />
<a href="https://github.com/${githubHandler}/${repository}"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://github.com/${githubHandler}/${repository}">View Demo</a>·
<a href="https://github.com/${githubHandler}/${repository}/issues">Report Bug</a>·
<a href="https://github.com/${githubHandler}/${repository}/issues">Request Feature</a>
</p>
</div>
`;
};

export const BasicLiteral = (props: TBasicLiteral) => {
  const { description, title } = props;
  return `
## ${title}

${description}
`;
};

export const DownloadTemplate = (props: TDownloadTemplate) => {
  const { description, preDescription, preCode, steps } = props;

  let str = `
## Getting Started

${description}

### Prerequisites

${preDescription}
\`\`\`bash
${preCode}
\`\`\`
`;

  steps.forEach((curr, idx) => {
    str += `
${idx + 1}. ${curr.step}
  \`\`\`bash
  ${curr.code}
  \`\`\`
    `;
  });
  return str;
};

export default getLiteral;
