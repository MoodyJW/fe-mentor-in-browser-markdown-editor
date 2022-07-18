import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdFilesListComponent } from './md-files-list.component';

describe('MdFilesListComponent', () => {
  let component: MdFilesListComponent;
  let fixture: ComponentFixture<MdFilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdFilesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdFilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
