import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdFileComponent } from './md-file.component';

describe('MdFileComponent', () => {
  let component: MdFileComponent;
  let fixture: ComponentFixture<MdFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
