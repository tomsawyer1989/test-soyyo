import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListCompaniesComponent } from './check-list-companies.component';

describe('CheckListCompaniesComponent', () => {
  let component: CheckListCompaniesComponent;
  let fixture: ComponentFixture<CheckListCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListCompaniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
