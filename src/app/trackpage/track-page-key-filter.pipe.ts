import { Pipe, PipeTransform } from '@angular/core';
import { TrackDetail } from '../models/trackDetail';

@Pipe({
  name: 'trackPageKeyFilter'
})
export class TrackPageKeyFilterPipe implements PipeTransform {

  transform(value: TrackDetail[], filterText: string): TrackDetail[] {
    filterText = filterText?filterText.toLowerCase():''

    return filterText?value.filter((t:TrackDetail)=>t.keyName.toLowerCase().indexOf(filterText)!==-1):value

  }

}
