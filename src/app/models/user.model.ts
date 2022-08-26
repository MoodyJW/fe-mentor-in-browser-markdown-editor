import { MdFile } from './md-file.model';

export interface User {
  currentMdFile: MdFile;
  id: string;
  mdFiles: MdFile[];
}
