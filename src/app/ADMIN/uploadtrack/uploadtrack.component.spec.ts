import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadtrackComponent } from './uploadtrack.component';

describe('UploadtrackComponent', () => {
  let component: UploadtrackComponent;
  let fixture: ComponentFixture<UploadtrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadtrackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadtrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
