import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmDetailPageComponent } from './film-detail-page.component';

describe('FilmDetailPageComponent', () => {
  let component: FilmDetailPageComponent;
  let fixture: ComponentFixture<FilmDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
