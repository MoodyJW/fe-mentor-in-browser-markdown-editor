export interface MdFile {
  id: string;
  createdAt: { seconds: number };
  name: string;
  content: string;
}

export interface NewMdFileData {
  currentMdFile: MdFile;
  newMdFileName: string;
}
