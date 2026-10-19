
using CardioTrustAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CardioTrustAI.Infrastructure.Persistence;

public class CardioTrustAIDbContext : DbContext
{
    public CardioTrustAIDbContext(
        DbContextOptions<CardioTrustAIDbContext> options)
        : base(options)
    {
    }

    public DbSet<Recording> Recordings => Set<Recording>();
}
