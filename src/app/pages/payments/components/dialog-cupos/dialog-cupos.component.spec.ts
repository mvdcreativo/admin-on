import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCuposComponent } from './dialog-cupos.component';

describe('DialogCuposComponent', () => {
  let component: DialogCuposComponent;
  let fixture: ComponentFixture<DialogCuposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCuposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCuposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
