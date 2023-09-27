import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoDialogoComponent } from './medico-dialogo.component';

describe('MedicoDialogoComponent', () => {
  let component: MedicoDialogoComponent;
  let fixture: ComponentFixture<MedicoDialogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicoDialogoComponent]
    });
    fixture = TestBed.createComponent(MedicoDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
