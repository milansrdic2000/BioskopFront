import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSingleMovieComponent } from './admin-single-movie.component';

describe('AdminSingleMovieComponent', () => {
  let component: AdminSingleMovieComponent;
  let fixture: ComponentFixture<AdminSingleMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSingleMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSingleMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
