import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActeursAdminComponent } from './acteurs-admin.component';

describe('ActeursAdminComponent', () => {
  let component: ActeursAdminComponent;
  let fixture: ComponentFixture<ActeursAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActeursAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActeursAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
