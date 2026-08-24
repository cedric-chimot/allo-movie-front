import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisateurFormComponent } from './realisateur-form.component';

describe('RealisateurFormComponent', () => {
  let component: RealisateurFormComponent;
  let fixture: ComponentFixture<RealisateurFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisateurFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisateurFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
