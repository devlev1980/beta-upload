import {Injectable} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {finalize, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  private filePath = '';
  private storageRef: AngularFireStorageReference;
  private uploadTask: AngularFireUploadTask;
  private percentage$: Observable<number>;
   allPercentage: Observable<any>;

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  uploadFiles(files: FileList): Observable<number> {
    const allPercentage: Observable<number>[] = [];
    Array.from(files).forEach((file) => {
      this.filePath = `${this.basePath}/${file.name}`;
      this.storageRef = this.storage.ref(this.filePath);
      this.uploadTask = this.storage.upload(this.filePath, file);
      this.percentage$ = this.uploadTask.percentageChanges();
      allPercentage.push(this.percentage$);
      console.log(allPercentage);
      this.allPercentage = combineLatest(this.allPercentage).pipe(
        map((percentage) => {
          let result = 0;
          for (const perc of percentage) {
            result = result + perc;
          }
          return result / percentage.length;
        }),
        tap(console.log)
      )
      // uploadTask.snapshotChanges().pipe(
      //   finalize(() => {
      //     this.storageRef.getDownloadURL().subscribe(downloadURL => {
      //       // file.url = downloadURL;
      //       Array.from(files).forEach((item) => {
      //         item. = file
      //       })
      //     });
      //   })
      // ).subscribe();
      this.saveFileData(files);

    });
    return this.uploadTask.percentageChanges();


  }

  private saveFileData(fileUpload: FileList): void {
    this.db.list(this.basePath).push(fileUpload);
  }
}
