
using CardioTrustAI.Domain.Enums;
namespace CardioTrustAI.Application.Recordings;

public sealed class RecordingDto
{
    public Guid Id { get; set; }

    public string PatientReference { get; set; } = string.Empty;

    public string FileName { get; set; } = string.Empty;

    public string StoragePath { get; set; } = string.Empty;

    public string FileFormat { get; set; } = string.Empty;

    public int LeadCount { get; set; }

    public int SamplingRateHz { get; set; }

    public double DurationSeconds { get; set; }

    public DateTime? RecordedAtUtc { get; set; }

    public DateTime UploadedAtUtc { get; set; }

    public RecordingStatus Status { get; set; }
}
