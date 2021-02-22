import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {UploadModel} from '../../models/upload.model';
import {ExpansionLocation} from './expansion-location';

@Component({
  selector: 'yl-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() panelState;
  @Input() uploadModel: UploadModel;
  @Input() showExpansionPanel: boolean;
  @Input() expansionPanelLocation: ExpansionLocation = ExpansionLocation.BottomRight;
  @Output() cancelEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  private basePath = '/uploads';
  clickCount: number = 0;
  @ViewChild('pauseIcon') pauseIcon: ElementRef;


  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.startUpload();
  }

  /**
   * Start uploading files to Firebase
   */
  startUpload(): void {
    this.uploadModel.files.forEach((file) => {
      const path = `${this.basePath}/${file.name}`;
      this.task = this.storage.upload(path, file);
      file.percentage = this.task.percentageChanges();
    });

  }

  /**
   * Pause uploading
   */
  onPauseUploadingFile(): void {
    this.clickCount++;
    this.clickCount % 2 === 0 ? this.task.resume() : this.task.pause();
  }

  /**
   * Close expansion panel by clicking on 'X' button
   */
  onCloseExpansionPanelPanel(): void {
    this.showExpansionPanel = false;
    this.cancelEmit.emit(this.showExpansionPanel);
    this.task.cancel();
  }
}
