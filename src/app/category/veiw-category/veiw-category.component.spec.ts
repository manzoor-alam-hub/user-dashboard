import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwCategoryComponent } from './veiw-category.component';

describe('VeiwCategoryComponent', () => {
  let component: VeiwCategoryComponent;
  let fixture: ComponentFixture<VeiwCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
