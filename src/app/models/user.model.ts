import { MdFile } from './md-file.model';

export interface User {
  id: string;
  mdFiles: MdFile[];
}
