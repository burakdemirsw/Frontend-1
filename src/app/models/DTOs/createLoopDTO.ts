import { LoopDetailDTO } from './LoopDetailDTO';
import { LoopDTO } from './loopDTO';


export class CreateLoopDTO {
  constructor(loopDTO: LoopDTO, loopDetailDTO: LoopDetailDTO) {
    this.loopDTO = loopDTO;
    this.loopDetailDTO = loopDetailDTO;
  }
  loopDTO!: LoopDTO;
  loopDetailDTO!: LoopDetailDTO;
}
