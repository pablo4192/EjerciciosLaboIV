import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVictoriaComponent } from './modal-victoria.component';

describe('ModalVictoriaComponent', () => {
  let component: ModalVictoriaComponent;
  let fixture: ComponentFixture<ModalVictoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVictoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVictoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
