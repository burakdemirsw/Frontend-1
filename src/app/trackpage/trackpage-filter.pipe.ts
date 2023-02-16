import { Pipe, PipeTransform } from '@angular/core';
import { Track } from '../models/track';
import { TrackDetail } from '../models/trackDetail';

@Pipe({
  name: 'trackpageFilter'
})
export class TrackpageFilterPipe implements PipeTransform {


  transform(value: TrackDetail[], filterText: string): TrackDetail[] {
    filterText=filterText?filterText.toLowerCase():""

    return filterText?value.filter((t:TrackDetail)=>t.title.toLowerCase().indexOf(filterText)!==-1):value
  }

}
