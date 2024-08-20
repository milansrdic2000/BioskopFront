import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectionsComponent } from './admin-projections.component';

describe('AdminProjectionsComponent', () => {
  let component: AdminProjectionsComponent;
  let fixture: ComponentFixture<AdminProjectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminProjectionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminProjectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
