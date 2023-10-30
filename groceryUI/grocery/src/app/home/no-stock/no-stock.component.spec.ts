import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoStockComponent } from './no-stock.component';

describe('NoStockComponent', () => {
  let component: NoStockComponent;
  let fixture: ComponentFixture<NoStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoStockComponent]
    });
    fixture = TestBed.createComponent(NoStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
