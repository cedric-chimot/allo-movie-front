import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisateursAdminPageComponent } from './realisateurs-admin-page.component';

describe('RealisateursAdminPageComponent', () => {
  let component: RealisateursAdminPageComponent;
  let fixture: ComponentFixture<RealisateursAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisateursAdminPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisateursAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
