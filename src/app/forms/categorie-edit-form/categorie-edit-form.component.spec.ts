import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieEditFormComponent } from './categorie-edit-form.component';

describe('CategorieEditFormComponent', () => {
  let component: CategorieEditFormComponent;
  let fixture: ComponentFixture<CategorieEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
