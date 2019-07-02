import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWarPage } from './detail-war.page';

describe('DetailWarPage', () => {
  let component: DetailWarPage;
  let fixture: ComponentFixture<DetailWarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
