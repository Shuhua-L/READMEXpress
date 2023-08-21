import {
  THeaderTemplate,
  TBasicLiteral,
  TDownloadTemplate,
  NonEmptyMap,
  TTechnologies,
} from "@/types";

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
    case "tech": {
      return TechTemplate(props);
    }
    default: {
      return BasicLiteral(props);
    }
  }
};

export type getBadgesProps = {
  user: string;
  repo: string;
  templateNum: number;
  badgeStyle?: string;
};

export const getBadges = (props: getBadgesProps) => {
  const { user, repo, templateNum, badgeStyle } = props;

  const templates: NonEmptyMap = {
    1: `
[![Contributors][contributors-shield]][contributors-url]
[![Last Update][last-update-shield]][last-update-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

[contributors-shield]: https://img.shields.io/github/contributors/${user}/${repo}.svg?style=${badgeStyle}
[contributors-url]: https://github.com/${user}/${repo}/graphs/contributors
[last-update-shield]: https://img.shields.io/github/last-commit/${user}/${repo}?style=${badgeStyle}
[last-update-url]: https://github.com/${user}/${repo}/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/${user}/${repo}.svg?style=${badgeStyle}
[forks-url]: https://github.com/${user}/${repo}/network/members
[stars-shield]: https://img.shields.io/github/stars/${user}/${repo}.svg?style=${badgeStyle}
[stars-url]: https://github.com/${user}/${repo}/stargazers
[issues-shield]: https://img.shields.io/github/issues/${user}/${repo}.svg?style=${badgeStyle}
[issues-url]: https://github.com/${user}/${repo}/issues
[license-shield]: https://img.shields.io/github/license/${user}/${repo}.svg?style=${badgeStyle}
[license-url]: https://github.com/${user}/${repo}/blob/master/LICENSE
      `,
    2: `
<p>
  <a href="https://github.com/${user}/${repo}/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/${user}/${repo}" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/${user}/${repo}" alt="last update" />
  </a>
  <a href="https://github.com/${user}/${repo}/network/members">
    <img src="https://img.shields.io/github/forks/${user}/${repo}" alt="forks" />
  </a>
  <a href="https://github.com/${user}/${repo}/stargazers">
    <img src="https://img.shields.io/github/stars/${user}/${repo}" alt="stars" />
  </a>
  <a href="https://github.com/${user}/${repo}/issues/">
    <img src="https://img.shields.io/github/issues/${user}/${repo}" alt="open issues" />
  </a>
  <a href="https://github.com/${user}/${repo}/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/${user}/${repo}.svg" alt="license" />
  </a>
</p>
    `,
  };

  return templates[templateNum];
};

export const HeaderTemplate = (props: THeaderTemplate) => {
  const { projectTitle, catchPhrase, logoURL, githubUser: user, repository: repo } = props;
  let templateNum = 2;

  const templates: NonEmptyMap = {
    1: `
${getBadges({ user, repo, templateNum, badgeStyle: "for-the-badge" })}
<br />
<div align="center">
  ${logoURL.length > 0 ? `<img src="${logoURL}" alt="Logo" width="80" height="80">` : ""}
  <h3 align="center">${projectTitle}</h3>
  <p align="center">
  ${catchPhrase}
  <br />
  <a href="https://github.com/${user}/${repo}"><strong>Explore the docs »</strong></a>
  <br />
  <br />
  <a href="https://github.com/${user}/${repo}">View Demo</a>·
  <a href="https://github.com/${user}/${repo}/issues">Report Bug</a>·
  <a href="https://github.com/${user}/${repo}/issues">Request Feature</a>
  </p>
</div>
`,
    2: `
<div align="center">

${logoURL.length > 0 ? `<img src="${logoURL}" alt="Logo" width="200" height="auto">` : ""}
<h1>${projectTitle}</h1>
<p>${catchPhrase}</p>


<!-- Badges -->
${getBadges({ user, repo, templateNum })}

<h4>
  <a href="https://github.com/${user}/${repo}/">View Demo</a>
  <span> · </span>
    <a href="https://github.com/${user}/${repo}">Documentation</a>
  <span> · </span>
    <a href="https://github.com/${user}/${repo}/issues/">Report Bug</a>
  <span> · </span>
    <a href="https://github.com/${user}/${repo}/issues/">Request Feature</a>
  </h4>
</div>
<br />
`,
  };

  return templates[templateNum];
};

export const BasicLiteral = (props: TBasicLiteral) => {
  const { description, title } = props;
  return `\n## ${title} \n ${description} \n`;
};

export const DownloadTemplate = (props: TDownloadTemplate) => {
  const { description, preDescription, preCode, steps } = props;

  let str = `\n## Getting Started \n${description}
### Prerequisites \n ${preDescription}
\`\`\`bash
${preCode}
\`\`\`
\n### Installation \n`;

  steps.forEach((curr, idx) => {
    str += `\n${idx + 1}. ${curr.step}
\`\`\`bash
${curr.code}
\`\`\``;
  });
  return str;
};

export const TechTemplate = (props: TTechnologies) => {
  const { description, listStyle, selected } = props;

  let str = `\n## Built With \n${description} \n`;

  if (listStyle === "badge") {
    selected?.forEach(({ label, value }) => {
      str += ` * ![${label}](${value}) \n`;
    });
  } else {
    selected?.forEach((tech) => {
      str += ` - ${tech.label} \n`;
    });
  }

  return str;
};

export default getLiteral;
