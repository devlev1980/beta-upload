import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'fileSizeFormat'
})

export class FileSizeFormatPipe implements PipeTransform {
  FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  transform(sizeInBytes: number, ...args: unknown[]): string {
    let power = Math.round(Math.log(sizeInBytes) / Math.log(1024));
    power = Math.min(power, this.FILE_SIZE_UNITS.length - 1);
    const size = sizeInBytes / Math.pow(1024, power);
    const formattedSize = Math.round(size * 100) / 100;
    const unit = this.FILE_SIZE_UNITS[power];
    return size ? `${formattedSize} ${unit}` : '0';
  }

}
