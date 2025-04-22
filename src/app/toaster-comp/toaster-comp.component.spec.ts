import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterCompComponent } from './toaster-comp.component';

describe('ToasterCompComponent', () => {
  let component: ToasterCompComponent;
  let fixture: ComponentFixture<ToasterCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToasterCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
