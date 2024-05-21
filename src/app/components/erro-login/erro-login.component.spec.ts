import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroLoginComponent } from './erro-login.component';

describe('ErroLoginComponent', () => {
  let component: ErroLoginComponent;
  let fixture: ComponentFixture<ErroLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErroLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErroLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
