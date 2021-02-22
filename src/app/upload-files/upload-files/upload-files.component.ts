import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ExpansionLocation} from '../expansion-panel/expansion-location';
import {UploadModel} from '../../models/upload.model';

@Component({
  selector: 'yl-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  uploadModel: UploadModel;
  filesList: File[] = [];
  expansionPanelLocation: ExpansionLocation = ExpansionLocation.BottomLeft;
  showExpansionPanel = false;
  @ViewChild('fileInput') fileInput: ElementRef
   allowMultiple: boolean = true;
  constructor() {
  }

  ngOnInit(): void {

  }


  onFileSelected(files: FileList): void {
    this.filesList = [];
    for (let i = 0; i < files.length; i++) {
      this.filesList.push(files.item(i));
    }
    this.showExpansionPanel = true;
    this.uploadModel = new UploadModel(this.expansionPanelLocation, this.filesList, true);
    this.fileInput.nativeElement.value = null
  }
}
