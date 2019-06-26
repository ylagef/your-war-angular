import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { warsTabPage } from './warsTab.page';

describe('warsTabPage', () => {
  let component: warsTabPage;
  let fixture: ComponentFixture<warsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [warsTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(warsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
