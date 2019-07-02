import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWarPage } from './create-war.page';

describe('CreateWarPage', () => {
  let component: CreateWarPage;
  let fixture: ComponentFixture<CreateWarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
