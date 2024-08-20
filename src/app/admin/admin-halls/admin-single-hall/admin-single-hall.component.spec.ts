import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleHallComponent } from './admin-single-hall.component';

describe('AdminSingleHallComponent', () => {
  let component: AdminSingleHallComponent;
  let fixture: ComponentFixture<AdminSingleHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSingleHallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSingleHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
