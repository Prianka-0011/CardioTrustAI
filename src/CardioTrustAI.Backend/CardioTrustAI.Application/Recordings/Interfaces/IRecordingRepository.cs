
using CardioTrustAI.Domain.Entities;

namespace CardioTrustAI.Application.Recordings;

public interface IRecordingRepository
{
    Task<Recording?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default);

    Task<IReadOnlyList<Recording>> GetAllAsync(
        CancellationToken cancellationToken = default);

    Task<Recording> AddAsync(
        Recording recording,
        CancellationToken cancellationToken = default);

    Task UpdateAsync(
        Recording recording,
        CancellationToken cancellationToken = default);

    Task SoftDeleteAsync(
        Recording recording,
        CancellationToken cancellationToken = default);
}
