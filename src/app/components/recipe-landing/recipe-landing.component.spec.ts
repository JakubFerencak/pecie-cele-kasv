import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeLandingComponent } from './recipe-landing.component';

describe('RecipeLandingComponent', () => {
  let component: RecipeLandingComponent;
  let fixture: ComponentFixture<RecipeLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
