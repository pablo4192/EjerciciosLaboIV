import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDerrotaComponent } from './modal-derrota.component';

describe('ModalDerrotaComponent', () => {
  let component: ModalDerrotaComponent;
  let fixture: ComponentFixture<ModalDerrotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDerrotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDerrotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
