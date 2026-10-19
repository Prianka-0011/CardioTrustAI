
using CardioTrustAI.Domain.Entities;
using CardioTrustAI.Domain.Enums;
using MediatR;

namespace CardioTrustAI.Application.Recordings;
public sealed record CreateRecordingCommand(
    string PatientReference,
    string FileName,
    string StoragePath,
    string FileFormat,
    int LeadCount,
    int SamplingRateHz,
    double DurationSeconds,
    DateTime? RecordedAtUtc
) : IRequest<RecordingDto>;

public sealed class CreateRecordingCommandHandler
    : IRequestHandler<CreateRecordingCommand, RecordingDto>
{
    private readonly IRecordingRepository _repository;

    public CreateRecordingCommandHandler(
        IRecordingRepository repository)
    {
        _repository = repository;
    }

    public async Task<RecordingDto> Handle(
        CreateRecordingCommand request,
        CancellationToken cancellationToken)
    {
        var recording = new Recording
        {
            PatientReference = request.PatientReference,
            FileName = request.FileName,
            StoragePath = request.StoragePath,
            FileFormat = request.FileFormat,
            LeadCount = request.LeadCount,
            SamplingRateHz = request.SamplingRateHz,
            DurationSeconds = request.DurationSeconds,
            RecordedAtUtc = request.RecordedAtUtc,
            UploadedAtUtc = DateTime.UtcNow,
            Status = RecordingStatus.Uploaded,
            IsDeleted = false
        };

        var created = await _repository.AddAsync(
            recording,
            cancellationToken);

        return MapToDto(created);
    }

    private static RecordingDto MapToDto(Recording recording)
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
}
