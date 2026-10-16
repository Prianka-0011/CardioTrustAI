var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseGlobalExceptionHandler();   // 1️⃣ Catch everything
app.UseHttpsRedirection();         // 2️⃣ Security
app.UseAuthentication();           // 3️⃣ Auth
app.UseAuthorization();            // 4️⃣ Permissions
app.MapControllers(); 

app.Run();
