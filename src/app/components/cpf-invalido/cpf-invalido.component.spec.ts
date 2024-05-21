import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfInvalidoComponent } from './cpf-invalido.component';

describe('CpfInvalidoComponent', () => {
  let component: CpfInvalidoComponent;
  let fixture: ComponentFixture<CpfInvalidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpfInvalidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CpfInvalidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
