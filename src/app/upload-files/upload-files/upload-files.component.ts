import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ExpansionLocation} from '../expansion-panel/expansion-location';
import {UploadModel} from '../../models/upload.model';

@Component({
  selector: 'yl-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFilesComponent implements OnInit {
  uploadModel: UploadModel;
  filesList: Array<File> = [];
  expansionPanelLocation: ExpansionLocation = ExpansionLocation.BottomLeft;
  @Input() showExpansionPanel;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor() {
  }

  ngOnInit(): void {

  }

  /**
   * Select files
   * @param files: FileList
   */

  onFileSelected(files: FileList): void {
    this.filesList = [];
    for (let i = 0; i < files.length; i++) {
      this.filesList.push(files.item(i));
    }
    this.showExpansionPanel = true;
    this.uploadModel = new UploadModel(this.expansionPanelLocation, this.filesList, true);
    this.fileInput.nativeElement.value = null;
  }

  /**
   * On cancel uploading emit from 'Expansion panel' component
   * @param event: boolean
   */
  onCancel(event: boolean): void {
    this.showExpansionPanel = event;
  }
}
