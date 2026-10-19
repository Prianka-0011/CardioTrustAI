
using MediatR;

namespace CardioTrustAI.Application.Recordings;

public sealed record GetRecordingByIdQuery(Guid Id)
    : IRequest<RecordingDto?>;

public sealed class GetRecordingByIdQueryHandler
    : IRequestHandler<GetRecordingByIdQuery, RecordingDto?>
{
    private readonly IRecordingRepository _repository;

    public GetRecordingByIdQueryHandler(
        IRecordingRepository repository)
    {
        _repository = repository;
    }

    public async Task<RecordingDto?> Handle(
        GetRecordingByIdQuery request,
        CancellationToken cancellationToken)
    {
        var recording = await _repository.GetByIdAsync(
            request.Id,
            cancellationToken);

        if (recording is null)
        {
            return null;
        }

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
