import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(text: string, limit: number): unknown {
    return text.substring(0, limit) + '.....';
  }
}
