import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUserSectionComponent } from './product-user-section.component';

describe('ProductUserSectionComponent', () => {
  let component: ProductUserSectionComponent;
  let fixture: ComponentFixture<ProductUserSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductUserSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUserSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
