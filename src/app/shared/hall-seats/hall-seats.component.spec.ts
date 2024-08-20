import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallSeatsComponent } from './hall-seats.component';

describe('HallSeatsComponent', () => {
  let component: HallSeatsComponent;
  let fixture: ComponentFixture<HallSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HallSeatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HallSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
