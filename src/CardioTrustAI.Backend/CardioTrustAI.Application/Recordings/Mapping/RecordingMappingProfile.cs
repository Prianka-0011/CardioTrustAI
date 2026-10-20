
using CardioTrustAI.Domain.Entities;

namespace CardioTrustAI.Application.Recordings;

public static class RecordingMapper
{
    public static RecordingDto ToDto(Recording recording)
    {
        return new RecordingDto
        {
            Id = recording.Id,
            PatientReference = recording.PatientReference,
            FileName = recording.FileName,
            StoragePath = recording.StoragePath,
            FileFormat = recording.FileFormat,
            LeadCount = recording.LeadCount,
            SamplingRateHz = recording.SamplingRateHz,
            DurationSeconds = recording.DurationSeconds,
            RecordedAtUtc = recording.RecordedAtUtc,
            UploadedAtUtc = recording.UploadedAtUtc,
            Status = recording.Status
        };
    }

    public static Recording ToEntity(RecordingDto dto)
    {
        return new Recording
        {
            Id = dto.Id,
            PatientReference = dto.PatientReference,
            FileName = dto.FileName,
            StoragePath = dto.StoragePath,
            FileFormat = dto.FileFormat,
            LeadCount = dto.LeadCount,
            SamplingRateHz = dto.SamplingRateHz,
            DurationSeconds = dto.DurationSeconds,
            RecordedAtUtc = dto.RecordedAtUtc,
            UploadedAtUtc = dto.UploadedAtUtc,
            Status = dto.Status 
        };
    }
}