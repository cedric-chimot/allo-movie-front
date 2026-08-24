import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealisateursAdminComponent } from './realisateurs-admin.component';

describe('RealisateursAdminComponent', () => {
  let component: RealisateursAdminComponent;
  let fixture: ComponentFixture<RealisateursAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealisateursAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealisateursAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
