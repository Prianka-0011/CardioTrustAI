import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgRecording } from './ecg-recording';

describe('EcgRecording', () => {
  let component: EcgRecording;
  let fixture: ComponentFixture<EcgRecording>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcgRecording],
    }).compileComponents();

    fixture = TestBed.createComponent(EcgRecording);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
