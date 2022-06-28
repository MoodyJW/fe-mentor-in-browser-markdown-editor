import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentFileNameComponent } from './current-file-name.component';

describe('CurrentFileNameComponent', () => {
  let component: CurrentFileNameComponent;
  let fixture: ComponentFixture<CurrentFileNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentFileNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentFileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
