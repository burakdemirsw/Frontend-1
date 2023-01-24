import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TrackDetail } from '@beatport/models';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCardComponent {
  @Input() track: TrackDetail;
  @Output() playWaveForm = new EventEmitter<number>();

  toggleStatus: boolean = false;

  playWaveFormOnClick(id: number): void {
    if (!id || id < 1) {
      return; //throw alert
    }

    this.toggleStatus = !this.toggleStatus;
    this.playWaveForm.emit(id);
  }
}
