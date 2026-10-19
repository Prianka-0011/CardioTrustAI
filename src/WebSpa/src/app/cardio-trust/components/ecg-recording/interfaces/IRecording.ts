export interface IRecording {
  id: string;
  patientReference: string;
  fileName: string;
  storagePath: string;
  fileFormat: string;
  leadCount: number;
  samplingRateHz: number;
  durationSeconds: number;
  recordedAtUtc?: string | null;
  uploadedAtUtc?: string;
  status?: string;
  isDeleted?: boolean;
}