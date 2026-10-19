import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgRecordingList } from './ecg-recording-list';

describe('EcgRecordingList', () => {
  let component: EcgRecordingList;
  let fixture: ComponentFixture<EcgRecordingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcgRecordingList],
    }).compileComponents();

    fixture = TestBed.createComponent(EcgRecordingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
