import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisateurEditFormComponent } from './realisateur-edit-form.component';

describe('RealisateurEditFormComponent', () => {
  let component: RealisateurEditFormComponent;
  let fixture: ComponentFixture<RealisateurEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisateurEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisateurEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
