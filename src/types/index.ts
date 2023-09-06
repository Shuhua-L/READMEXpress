export type TSectionProps = {
  section: string;
};

export type THeaderTemplate = {
  githubUser: string;
  repository: string;
  projectTitle: string;
  catchPhrase: string;
  logoURL: string;
};

export type TBasicLiteral = {
  title?: string;
  description: string;
};

export type TDownloadTemplate = {
  description: string;
  preDescription: string;
  preCode: string;
  steps: {
    step: string;
    code: string;
  }[];
};

export type TTechnologies = {
  description?: string;
  listStyle: string;
  selected?: any[];
};

export interface NonEmptyMap {
  [key: string]: string;
}

export type TMap = {
  [key: string]: any;
};

export type TModule = {
  name: string;
  title: string;
  default?: TMap;
  content?: string;
};
