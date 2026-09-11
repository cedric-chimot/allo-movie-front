import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsAdminPageComponent } from './film-admin-page.component';

describe('FilmAdminPageComponent', () => {
  let component: FilmsAdminPageComponent;
  let fixture: ComponentFixture<FilmsAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
