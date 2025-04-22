import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtaskComponent } from './showtask.component';

describe('ShowtaskComponent', () => {
  let component: ShowtaskComponent;
  let fixture: ComponentFixture<ShowtaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
