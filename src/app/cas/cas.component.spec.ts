import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasComponent } from './cas.component';

describe('CasComponent', () => {
  let component: CasComponent;
  let fixture: ComponentFixture<CasComponent>;

  // tenemos 2 before each porque uno llama a la función async de angular
  // esto se debe a que complileComponents tiene que acceder al fileSystem y esto tiene una pequeña demora
  // si estamos utilizando webpack no es necesario llamar a compileComponents

  // Por lo tanto, podemos borrar este beforeEach, agregando la configuracion de TestBed al principio del siguiente beforeEach
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    // TestBed.configureTestingModule({
    //   declarations: [ CasComponent ]
    // });

    fixture = TestBed.createComponent(CasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // cuidado con tener fixture.detectChanges(); acá
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
