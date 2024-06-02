import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavItemsComponent } from './fav-items.component';

describe('FavItemsComponent', () => {
  let component: FavItemsComponent;
  let fixture: ComponentFixture<FavItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
