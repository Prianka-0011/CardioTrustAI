
using CardioTrustAI.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CardioTrustAI.Infrastructure;

public static class DependencyInjection
{
    private static string DbHost =>
        Environment.GetEnvironmentVariable("DB_HOST")
        ?? (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Production"
            ? "database-cardiotrustai"
            : "localhost");

    private static int DbPort =>
        int.TryParse(Environment.GetEnvironmentVariable("DB_PORT"), out var port)
            ? port
            : 5432;

    private static string DbName =>
        Environment.GetEnvironmentVariable("DB_NAME")
        ?? "CardioTrustAIDb";

    private static string DbUser =>
        Environment.GetEnvironmentVariable("DB_USER")
        ?? "postgres";

    private static string DbPass =>
        Environment.GetEnvironmentVariable("DB_PASS")
        ?? "CardioTrustAI123!";

    public static string GetConnectionString()
    {
        return $"Host={DbHost};Port={DbPort};Database={DbName};Username={DbUser};Password={DbPass}";
    }

    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddDbContext<CardioTrustAIDbContext>(options =>
            options.UseNpgsql(
                GetConnectionString(),
                npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 5,
                    maxRetryDelay: TimeSpan.FromSeconds(10),
                    errorCodesToAdd: null)));

        return services;
    }
}
