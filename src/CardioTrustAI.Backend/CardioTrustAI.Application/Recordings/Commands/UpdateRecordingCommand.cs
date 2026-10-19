
using MediatR;

namespace CardioTrustAI.Application.Recordings;
public sealed record UpdateRecordingCommand(
    Guid Id,
    string PatientReference,
    string FileName,
    string StoragePath,
    string FileFormat,
    int LeadCount,
    int SamplingRateHz,
    double DurationSeconds,
    DateTime? RecordedAtUtc
) : IRequest<RecordingDto?>;

public sealed class UpdateRecordingCommandHandler
    : IRequestHandler<UpdateRecordingCommand, RecordingDto?>
{
    private readonly IRecordingRepository _repository;

    public UpdateRecordingCommandHandler(
        IRecordingRepository repository)
    {
        _repository = repository;
    }

    public async Task<RecordingDto?> Handle(
        UpdateRecordingCommand request,
        CancellationToken cancellationToken)
    {
        var recording = await _repository.GetByIdAsync(
            request.Id,
            cancellationToken);

        if (recording is null)
        {
            return null;
        }

        recording.PatientReference = request.PatientReference;
        recording.FileName = request.FileName;
        recording.StoragePath = request.StoragePath;
        recording.FileFormat = request.FileFormat;
        recording.LeadCount = request.LeadCount;
        recording.SamplingRateHz = request.SamplingRateHz;
        recording.DurationSeconds = request.DurationSeconds;
        recording.RecordedAtUtc = request.RecordedAtUtc;

        await _repository.UpdateAsync(
            recording,
            cancellationToken);

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
