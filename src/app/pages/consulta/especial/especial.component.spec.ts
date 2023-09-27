import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialComponent } from './especial.component';

describe('EspecialComponent', () => {
  let component: EspecialComponent;
  let fixture: ComponentFixture<EspecialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecialComponent]
    });
    fixture = TestBed.createComponent(EspecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
