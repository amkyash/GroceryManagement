import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedComponent } from './placed.component';

describe('PlacedComponent', () => {
  let component: PlacedComponent;
  let fixture: ComponentFixture<PlacedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacedComponent]
    });
    fixture = TestBed.createComponent(PlacedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
