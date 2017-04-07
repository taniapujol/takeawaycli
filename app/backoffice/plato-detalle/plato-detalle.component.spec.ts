import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatoDetalleComponent } from './plato-detalle.component';

describe('PlatoDetalleComponent', () => {
  let component: PlatoDetalleComponent;
  let fixture: ComponentFixture<PlatoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
