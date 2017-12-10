import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimusComponent } from './animus.component';

describe('AnimusComponent', () => {
  let component: AnimusComponent;
  let fixture: ComponentFixture<AnimusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
