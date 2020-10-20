import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewProductsComponent } from './admin-view-products.component';

describe('AdminViewProductsComponent', () => {
  let component: AdminViewProductsComponent;
  let fixture: ComponentFixture<AdminViewProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
