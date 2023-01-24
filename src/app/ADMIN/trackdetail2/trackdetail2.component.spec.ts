import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trackdetail2Component } from './trackdetail2.component';

describe('Trackdetail2Component', () => {
  let component: Trackdetail2Component;
  let fixture: ComponentFixture<Trackdetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Trackdetail2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trackdetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
