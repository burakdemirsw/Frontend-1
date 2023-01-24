import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackFSComponent } from './track-fs.component';

describe('TrackFSComponent', () => {
  let component: TrackFSComponent;
  let fixture: ComponentFixture<TrackFSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackFSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackFSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
