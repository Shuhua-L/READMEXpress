
type THeaderTemplate = {
  githubHandler: string;
  repository: string;
  projectTitle: string;
  catchPhrase: string;
  logoURL: string;
}

export const HeaderTemplate = (props : THeaderTemplate)  => {
  const {projectTitle, catchPhrase, logoURL, githubHandler, repository} = props
  const projectLogo = logoURL.length > 0 ?
  `<a href="https://github.com/${githubHandler}/${repository}">
  <img src=${logoURL} alt="Logo" width="80" height="80">
  </a>`
  : ''

  return `<div align="center">
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
</div>`;
}

type TAboutTemplate = {
  description: string;
}

export const AboutTemplate = ({description}: TAboutTemplate) => {
  return `
## About
${description}`
}