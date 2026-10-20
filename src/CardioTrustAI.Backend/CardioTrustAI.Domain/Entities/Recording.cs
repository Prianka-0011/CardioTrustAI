using System.ComponentModel.DataAnnotations;
using CardioTrustAI.Domain.Enums;

namespace CardioTrustAI.Domain.Entities;

public class Recording
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [MaxLength(100)]
    public string PatientReference { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string FileName { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public string StoragePath { get; set; } = string.Empty;

    [Required]
    [MaxLength(20)]
    public string FileFormat { get; set; } = string.Empty;

    [Range(1, 12)]
    public int LeadCount { get; set; }

    [Range(1, 10000)]
    public int SamplingRateHz { get; set; }

    [Range(0.1, 86400)]
    public double? DurationSeconds { get; set; }

    public DateTime? RecordedAtUtc { get; set; }

   
    public DateTime? UploadedAtUtc { get; set; } = DateTime.UtcNow;

    public Guid? Status { get; set; } = RecordingStatus.Uploaded;

    public bool IsDeleted { get; set; } = false;
}