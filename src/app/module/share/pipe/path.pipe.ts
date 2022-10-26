import { Content } from './../model/result.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'srcPath'
})
export class PathPipe implements PipeTransform {

  transform(value: Content, ...args: unknown[]): string {
    return value.filePath+'/'+value.storeName
  }
}
