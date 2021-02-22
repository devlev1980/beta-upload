import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import {MaterialModule} from '../shared/material/material.module';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { FileSizeFormatPipe } from './pipes/file-size-format.pipe';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [UploadFilesComponent, ExpansionPanelComponent, FileSizeFormatPipe],
  imports: [
    CommonModule,
    UploadFilesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UploadFilesModule { }
