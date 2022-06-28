import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBarComponent } from './preview-bar.component';

describe('PreviewBarComponent', () => {
  let component: PreviewBarComponent;
  let fixture: ComponentFixture<PreviewBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
