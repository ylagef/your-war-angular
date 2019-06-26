import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { manageTabPage } from './manageTab.page';

describe('manageTabPage', () => {
  let component: manageTabPage;
  let fixture: ComponentFixture<manageTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [manageTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(manageTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
