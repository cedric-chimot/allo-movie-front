import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeursAdminPageComponent } from './acteurs-admin-page.component';

describe('ActeursAdminPageComponent', () => {
  let component: ActeursAdminPageComponent;
  let fixture: ComponentFixture<ActeursAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActeursAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActeursAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
