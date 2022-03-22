import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformAtt'
})
export class TransformAttPipe implements PipeTransform {

  transform(att:number): string {
    if(att > -1){
      return '+'+att
    }else{
      return String(att)
    }
  }

}
