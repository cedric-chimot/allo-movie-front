import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilmsPageComponent } from './search-films-page.component';

describe('SearchFilmsPageComponent', () => {
  let component: SearchFilmsPageComponent;
  let fixture: ComponentFixture<SearchFilmsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilmsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFilmsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
