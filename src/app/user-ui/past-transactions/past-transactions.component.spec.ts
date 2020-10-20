import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastTransactionsComponent } from './past-transactions.component';

describe('PastTransactionsComponent', () => {
  let component: PastTransactionsComponent;
  let fixture: ComponentFixture<PastTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
