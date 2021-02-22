import {Observable} from 'rxjs';
import {ExpansionLocation} from '../upload-files/expansion-panel/expansion-location';

export class UploadModel {
  position: ExpansionLocation;
  files: IFile[];
  isExpanded: boolean;

  constructor(position, files, isExpanded) {
    this.position = position;
    this.files = files;
    this.isExpanded = isExpanded;
  }
}

export class IFile {
  name: string;
  size: number;
  lastModified: number;
  fileType: string;
  percentage: Observable<number>;

}
