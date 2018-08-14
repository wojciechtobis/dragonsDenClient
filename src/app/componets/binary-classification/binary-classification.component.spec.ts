import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BinaryClassificationComponent } from './binary-classification.component';

describe('BinaryClassificationComponent', () => {
  let component: BinaryClassificationComponent;
  let fixture: ComponentFixture<BinaryClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BinaryClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BinaryClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
