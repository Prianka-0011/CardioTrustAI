
using MediatR;

namespace CardioTrustAI.Application.Recordings;

public sealed record GetAllRecordingsQuery
    : IRequest<IReadOnlyList<RecordingDto>>;

public sealed class GetAllRecordingsQueryHandler
    : IRequestHandler<
        GetAllRecordingsQuery,
        IReadOnlyList<RecordingDto>>
{
    private readonly IRecordingRepository _repository;

    public GetAllRecordingsQueryHandler(
        IRecordingRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<RecordingDto>> Handle(
        GetAllRecordingsQuery request,
        CancellationToken cancellationToken)
    {
        var recordings = await _repository.GetAllAsync(
            cancellationToken);

        return recordings.Select(recording => new RecordingDto
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
        }).ToList();
    }
}
