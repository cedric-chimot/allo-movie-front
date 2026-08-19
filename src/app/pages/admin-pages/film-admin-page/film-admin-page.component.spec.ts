import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmAdminPageComponent } from './film-admin-page.component';

describe('FilmAdminPageComponent', () => {
  let component: FilmAdminPageComponent;
  let fixture: ComponentFixture<FilmAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
