import { Pipe, PipeTransform } from '@angular/core';
import { TrackDetail } from 'src/app/models/trackDetail';

@Pipe({
  name: 'trackPageGenreFilter'
})
export class TrackPageGenreFilterPipe implements PipeTransform {

  transform(value: TrackDetail[], filterText: string): TrackDetail[] {
    filterText=filterText?filterText.toLowerCase():""

    return filterText?value.filter((t:TrackDetail)=>t.genreName.toLowerCase().indexOf(filterText)!==-1):value
  }

}
