
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IRecording } from '../interfaces/IRecording';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {

  constructor(private http: HttpClient) {}

  baseUrl = environment.baseUrl + 'api/v1/recordings/';

  getRecordings(): Observable<IRecording[]> {
    return this.http.get<IRecording[]>(this.baseUrl);
  }

  getRecordingById(id: string): Observable<IRecording> {
    return this.http.get<IRecording>(`${this.baseUrl}${id}`);
  }

  createRecording(recording: IRecording): Observable<IRecording> {
    return this.http.post<IRecording>(this.baseUrl, {
      patientReference: recording.patientReference,
      fileName: recording.fileName,
      storagePath: recording.storagePath,
      fileFormat: recording.fileFormat,
      leadCount: recording.leadCount,
      samplingRateHz: recording.samplingRateHz,
      durationSeconds: recording.durationSeconds,
      recordedAtUtc: recording.recordedAtUtc ?? null
    });
  }

  updateRecording(recording: IRecording): Observable<IRecording> {
    if (
      !recording.id ||
      recording.id === '00000000-0000-0000-0000-000000000000'
    ) {
      throw new Error('Cannot update recording with invalid ID');
    }

    return this.http.put<IRecording>(
      `${this.baseUrl}${recording.id}`,
      {
        id: recording.id,
        patientReference: recording.patientReference,
        fileName: recording.fileName,
        storagePath: recording.storagePath,
        fileFormat: recording.fileFormat,
        leadCount: recording.leadCount,
        samplingRateHz: recording.samplingRateHz,
        durationSeconds: recording.durationSeconds,
        recordedAtUtc: recording.recordedAtUtc ?? null
      }
    );
  }

  deleteRecording(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${id}`);
  }
}
