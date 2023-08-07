
type THeaderTemplate = {
  projectTitle:string,
  catchPhrase:string,
  logoURL:string
}

export const HeaderTemplate = ({projectTitle, catchPhrase, logoURL} : THeaderTemplate)  => {
  const projectLogo = logoURL.length > 0 ?
  `<a href="https://github.com/github_username/repo_name">
  <img src=${logoURL} alt="Logo" width="80" height="80">
  </a>`
  : ''

  return `<div align="center">
${projectLogo}
<h3 align="center">${projectTitle}</h3>
<p align="center">
${catchPhrase}
<br />
<a href="https://github.com/github_username/repo_name"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://github.com/github_username/repo_name">View Demo</a>·
<a href="https://github.com/github_username/repo_name/issues">Report Bug</a>·
<a href="https://github.com/github_username/repo_name/issues">Request Feature</a>
</p>
</div>`;
}