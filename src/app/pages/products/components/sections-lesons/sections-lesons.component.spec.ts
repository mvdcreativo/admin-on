import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsLesonsComponent } from './sections-lesons.component';

describe('SectionsLesonsComponent', () => {
  let component: SectionsLesonsComponent;
  let fixture: ComponentFixture<SectionsLesonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionsLesonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionsLesonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
