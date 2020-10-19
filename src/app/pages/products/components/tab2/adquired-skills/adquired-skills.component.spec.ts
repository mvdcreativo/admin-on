import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquiredSkillsComponent } from './adquired-skills.component';

describe('AdquiredSkillsComponent', () => {
  let component: AdquiredSkillsComponent;
  let fixture: ComponentFixture<AdquiredSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdquiredSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdquiredSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
