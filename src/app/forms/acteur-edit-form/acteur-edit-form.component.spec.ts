import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeurEditFormComponent } from './acteur-edit-form.component';

describe('ActeurEditFormComponent', () => {
  let component: ActeurEditFormComponent;
  let fixture: ComponentFixture<ActeurEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActeurEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActeurEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
