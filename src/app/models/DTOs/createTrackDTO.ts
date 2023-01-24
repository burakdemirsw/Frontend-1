import { TrackDetailDTO } from './trackDetailDTO';
import { TrackDTO } from './trackDTO';

export class CreateTrackDTO {
  constructor(trackDTO: TrackDTO, trackDetailDTO: TrackDetailDTO) {
    this.trackDTO = trackDTO;
    this.trackDetailDTO = trackDetailDTO;
  }
  trackDTO!: TrackDTO;
  trackDetailDTO!: TrackDetailDTO;
}
