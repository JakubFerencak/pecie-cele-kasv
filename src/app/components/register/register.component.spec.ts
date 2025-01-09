import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Vytvorenie špióna pre AuthService
    const spy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register() when form is submitted', () => {
    // Nastavenie dát
    component.auth = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    // Simulácia odpovede zo služby
    authServiceSpy.register.and.returnValue(of({ success: true }));

    // Volanie register() funkcie
    component.register();

    // Očakávanie, že register bola volaná so správnymi dátami
    expect(authServiceSpy.register).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123'
    });
  });

  it('should alert if passwords do not match', () => {
    spyOn(window, 'alert');

    // Nastavenie nezhodných hesiel
    component.auth = {
      username: 'testuser',
      email: 'test@test.com',
      password: 'password123',
      confirmPassword: 'password321'
    };

    component.register();

    // Overenie, že alert bol zavolaný
    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });
});
