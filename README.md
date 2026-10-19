CardioTrustAI/
├── backend/
│   └── CardioLens.Api/
├── frontend/
│   └── cardiolens-ui/
├── ai-service/
│   ├── app/
│   ├── models/
│   └── requirements.txt
├── data/
│   ├── raw/
│   └── processed/
└── docker-compose.yml

dotnet new sln -n CardioTrustAI

# API
dotnet new webapi -n CardioTrustAI.API -o src/CardioTrustAI.Backend/CardioTrustAI.API

# Domain
dotnet new classlib -n CardioTrustAI.Domain -o src/CardioTrustAI.Backend/CardioTrustAI.Domain
# Application

# Add To The Soluation
dotnet sln CardioTrustAI.slnx add src/CardioTrustAI.Backend/CardioTrustAI.API/CardioTrustAI.API.csproj

dotnet sln CardioTrustAI.slnx add src/CardioTrustAI.Backend/CardioTrustAI.Domain/CardioTrustAI.Domain.csproj

dotnet sln CardioTrustAI.slnx add src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj

dotnet sln CardioTrustAI.slnx add src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj

# Build The Whole Soluation
dotnet build CardioTrustAI.slnx

# Configure Application to Run on Debug mode
.vscode/launch.json
.vscode/tasks.json

# Add Releted Project Referance
dotnet add src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Domain/CardioTrustAI.Domain.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Domain/CardioTrustAI.Domain.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.API/CardioTrustAI.API.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.API/CardioTrustAI.API.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj

# Verify Each Project Reference List
dotnet add src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Domain/CardioTrustAI.Domain.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Domain/CardioTrustAI.Domain.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.API/CardioTrustAI.API.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Application/CardioTrustAI.Application.csproj

dotnet add src/CardioTrustAI.Backend/CardioTrustAI.API/CardioTrustAI.API.csproj reference src/CardioTrustAI.Backend/CardioTrustAI.Infrastructure/CardioTrustAI.Infrastructure.csproj

# SetUp All The Require Package
------------

# Middleware
Exception Handle //done
Middleware order
app.UseGlobalExceptionHandler();   // 1️⃣ Catch everything
app.UseHttpsRedirection();         // 2️⃣ Security
app.UseAuthentication();           // 3️⃣ Auth
app.UseAuthorization();            // 4️⃣ Permissions
app.MapControllers();  

# Front End
brew install mkcert
brew install nss
mkcert -install
npm install
npx ng serve --ssl --ssl-cert "./localhost+2.pem" --ssl-key "./localhost+2-key.pem"