import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialidadEdicionComponent } from './especialidad-edicion.component';

describe('EspecialidadEdicionComponent', () => {
  let component: EspecialidadEdicionComponent;
  let fixture: ComponentFixture<EspecialidadEdicionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialidadEdicionComponent]
    });
    fixture = TestBed.createComponent(EspecialidadEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
