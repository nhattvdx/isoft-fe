import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({ name: 'imageLoader', pure: false })
export class ImageLoaderPipe implements PipeTransform {
  constructor() { }
  transform(path: string): string {
    if (path) {
      return environment.serverURL + '/' + path;
    }
    return null;
  }
}