
using CardioTrustAI.Domain.Entities;
using CardioTrustAI.Domain.Enums;
using CardioTrustAI.Application.Recordings;
using CardioTrustAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace CardioTrustAI.Infrastructure;

public sealed class RecordingRepository : IRecordingRepository
{
    private readonly CardioTrustAIDbContext _context;

    public RecordingRepository(CardioTrustAIDbContext context)
    {
        _context = context;
    }

    public async Task<Recording?> GetByIdAsync(
        Guid id,
        CancellationToken cancellationToken = default)
    {
        return await _context.Recordings
            .AsNoTracking()
            .FirstOrDefaultAsync(
                x => x.Id == id && !x.IsDeleted,
                cancellationToken);
    }

    public async Task<IReadOnlyList<Recording>> GetAllAsync(
        CancellationToken cancellationToken = default)
    {
        return await _context.Recordings
            .AsNoTracking()
            .Where(x => !x.IsDeleted)
            .OrderByDescending(x => x.UploadedAtUtc)
            .ToListAsync(cancellationToken);
    }

    public async Task<Recording> AddAsync(
        Recording recording,
        CancellationToken cancellationToken = default)
    {
        await _context.Recordings.AddAsync(
            recording,
            cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);

        return recording;
    }

    public async Task UpdateAsync(
        Recording recording,
        CancellationToken cancellationToken = default)
    {
        _context.Recordings.Update(recording);

        await _context.SaveChangesAsync(cancellationToken);
    }

    public async Task SoftDeleteAsync(
        Recording recording,
        CancellationToken cancellationToken = default)
    {
        recording.IsDeleted = true;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
