import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeScrollingComponent } from './poke-scrolling.component';

describe('PokeScrollingComponent', () => {
  let component: PokeScrollingComponent;
  let fixture: ComponentFixture<PokeScrollingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokeScrollingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
