import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackNotificationComponent } from './snack-notification.component';

describe('SnackNotificationComponent', () => {
  let component: SnackNotificationComponent;
  let fixture: ComponentFixture<SnackNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnackNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnackNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
