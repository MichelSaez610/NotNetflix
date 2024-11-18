import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A1VideoSelectorComponent } from './a1-video-selector.component';

describe('A1VideoSelectorComponent', () => {
  let component: A1VideoSelectorComponent;
  let fixture: ComponentFixture<A1VideoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [A1VideoSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A1VideoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
