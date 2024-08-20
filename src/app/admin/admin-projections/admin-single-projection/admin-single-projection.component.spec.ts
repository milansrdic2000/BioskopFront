import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleProjectionComponent } from './admin-single-projection.component';

describe('AdminSingleProjectionComponent', () => {
  let component: AdminSingleProjectionComponent;
  let fixture: ComponentFixture<AdminSingleProjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSingleProjectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSingleProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
