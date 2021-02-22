import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ExpansionLocation} from './expansion-location';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {AngularFireDatabase} from '@angular/fire/database';
import {fromEvent, Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {IFile, UploadModel} from '../../models/upload.model';
import {Position} from '../../models/position';
import {UploadFilesComponent} from '../upload-files/upload-files.component';

@Component({
  selector: 'yl-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {
  @Input() panelState;
  @Input() uploadModel: UploadModel;
   @Input()showExpansionPanel: boolean ;
  @Input() expansionPanelLocation: Position = Position.bottomRight;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  private basePath = '/uploads';
  downloadUrl;
  clickCount: number = 0;
  @ViewChild('pauseIcon') pauseIcon: ElementRef;
  @ViewChild(UploadFilesComponent) uploadComponent: UploadFilesComponent
  private isCanceled: boolean;
  private uploadState: Observable<any>;
  private state: string = '';


  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload(): void {
    this.uploadModel.files.forEach((file) => {
      const path = `${this.basePath}/${file.name}`;
      const ref = this.storage.ref(path);
      this.task = this.storage.upload(path, file);
      file.percentage = this.task.percentageChanges();
      this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
      this.snapshot = this.task.snapshotChanges().pipe(
        finalize(async () => {
          this.downloadUrl = await ref.getDownloadURL().toPromise();
        })
      );
    });
    this.uploadState.subscribe(data => {
      this.state = data
    })
  }

  onPauseUploadingFile(): void {
    this.clickCount++;
    this.clickCount % 2 === 0 ? this.task.resume() : this.task.pause();
  }

  onCloseExpansionPanelPanel(): void {
    // this.uploadModel.files = [];
    if (this.state === 'running') {
      this.task.cancel();
    }
  }
}
