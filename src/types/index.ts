export type TSectionProps = {
  updateContent: (doc: string, section: string) => void;
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

export interface Map {
  [key: string]: string | undefined;
}

export type TTemplate = {
  [key: string]: {
    name: string;
    title: string;
    default: any;
  };
};
