import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { profileTabPage } from './profileTab.page';

describe('profileTabPage', () => {
  let component: profileTabPage;
  let fixture: ComponentFixture<profileTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [profileTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(profileTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
