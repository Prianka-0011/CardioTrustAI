CardioTrustAI/
├── CardioTrustAI.slnx
├── docker-compose.yml
├── Dockerfile
└── src/
    ├── CardioTrustAI.Backend/
    │   ├── CardioTrustAI.API/
    │   ├── CardioTrustAI.Application/
    │   ├── CardioTrustAI.Domain/
    │   ├── CardioTrustAI.Infrastructure/
    │   │
    │   └── CardioTrustAI.PythonAPI/
    │       ├── app/
    │       │   ├── main.py
    │       │   ├── api/
    │       │   │   └── endpoints/
    │       │   ├── application/
    │       │   │   └── services/
    │       │   │       ├── ecg_service.py
    │       │   │       ├── prediction_service.py
    │       │   │       └── evaluation_service.py
    │       │   ├── domain/
    │       │   ├── infrastructure/
    │       │   │   ├── datasets/
    │       │   │   └── models/
    │       │   ├── schemas/
    │       │   └── core/
    │       ├── tests/
    │       ├── requirements.txt
    │       └── Dockerfile
    │
    └── WebSpa/
        └── ...

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

# Phython Setup

# 1. Navigate to the Python API project
cd "$HOME\Documents\CardioTrustAI\src\CardioTrustAI.Backend\CardioTrustAI.PythonAPI"

# 2. Set Miniconda paths
$conda = "$env:USERPROFILE\miniconda3\Scripts\conda.exe"
$globalPython = "$env:USERPROFILE\miniconda3\python.exe"

# 3. Verify Miniconda
if (!(Test-Path $conda) -or !(Test-Path $globalPython)) {
    throw "Miniconda was not found at the expected location."
}

& $globalPython --version
& $conda --version

# 4. Create Python 3.12 environment only if it does not exist
if (!(Test-Path ".venv\python.exe")) {
    & $conda create -p "$PWD\.venv" python=3.12 -y
    if ($LASTEXITCODE -ne 0) {
        throw "Python environment creation failed."
    }
}

# 5. Upgrade pip
& "$PWD\.venv\python.exe" -m pip install --upgrade pip
if ($LASTEXITCODE -ne 0) {
    throw "pip upgrade failed."
}

# 6. Install API and ECG research packages
& "$PWD\.venv\python.exe" -m pip install "fastapi[standard]" numpy pandas scipy matplotlib scikit-learn wfdb
if ($LASTEXITCODE -ne 0) {
    throw "Package installation failed."
}

# 7. Verify package installation
& "$PWD\.venv\python.exe" -c "import fastapi, numpy, pandas, scipy, matplotlib, sklearn, wfdb; print('All packages imported successfully')"
if ($LASTEXITCODE -ne 0) {
    throw "Package verification failed."
}

# 8. Save installed dependencies
& "$PWD\.venv\python.exe" -m pip freeze | Out-File -Encoding utf8 requirements.txt

# 9. Create the app folder if needed
New-Item -ItemType Directory -Force -Path "app" | Out-Null

# 10. Create main.py if it does not exist
if (!(Test-Path "app\main.py")) {
@'
from fastapi import FastAPI

app = FastAPI(
    title="CardioTrustAI Python API",
    description="Python backend for ECG analysis",
    version="1.0.0",
)

@app.get("/")
def home():
    return {
        "message": "CardioTrustAI Python API is running",
        "status": "healthy",
    }

@app.get("/api/v1/ai/health")
def health_check():
    return {
        "service": "CardioTrustAI AI Backend",
        "status": "healthy",
    }
'@ | Set-Content -Encoding utf8 "app\main.py"
}


# 11. Configure HTTPS for local development

# Create a local development certificate if needed
$certFolder = Join-Path $PWD "certs"
$certPath = Join-Path $certFolder "localhost.pem"
$keyPath = Join-Path $certFolder "localhost-key.pem"

New-Item -ItemType Directory -Force -Path $certFolder | Out-Null

# Check whether OpenSSL is installed
$openssl = Get-Command openssl -ErrorAction SilentlyContinue

if (!(Test-Path $certPath) -or !(Test-Path $keyPath)) {
    if (!$openssl) {
        throw "OpenSSL is required to create the local HTTPS certificate. Install OpenSSL or use your trusted local certificate tool."
    }

    & openssl.Source req -x509 -newkey rsa:2048 -nodes `
        -keyout $keyPath `
        -out $certPath `
        -days 365 `
        -subj "/CN=localhost" `
        -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

    if ($LASTEXITCODE -ne 0) {
        throw "HTTPS certificate creation failed."
    }
}

# 12. Start the API over HTTPS
& "$PWD\.venv\python.exe" -m uvicorn app.main:app `
    --reload `
    --host 127.0.0.1 `
    --port 8001 `
    --ssl-certfile "$certPath" `
    --ssl-keyfile "$keyPath"



cd "$HOME\Documents\CardioTrustAI\src\CardioTrustAI.Backend\CardioTrustAI.PythonAPI"

# Install Jupyter Notebook in your existing Python environment
& "$PWD\.venv\python.exe" -m pip install notebook ipykernel

# Create the experiments folder
New-Item -ItemType Directory -Force -Path "experiments" | Out-Null

# Start Jupyter Notebook in the project directory
& "$PWD\.venv\python.exe" -m notebook --notebook-dir="$PWD\experiments"


------------------------------------------------
# 1. Go to the CardioTrustAI Python project
cd "$HOME\Documents\CardioTrustAI\src\CardioTrustAI.Backend\CardioTrustAI.PythonAPI"

# 2. Install the packages for ECG experiments and Jupyter
& "$PWD\.venv\python.exe" -m pip install "fastapi[standard]" notebook ipykernel numpy pandas scipy matplotlib scikit-learn wfdb

if ($LASTEXITCODE -ne 0) {
    throw "Package installation failed."
}

# 3. Register this Python environment as a Jupyter kernel
& "$PWD\.venv\python.exe" -m ipykernel install --user --name cardiotrustai --display-name "Python (CardioTrustAI)"

if ($LASTEXITCODE -ne 0) {
    throw "Jupyter kernel registration failed."
}

# 4. Verify all packages
& "$PWD\.venv\python.exe" -c "import fastapi, pandas, numpy, scipy, matplotlib, sklearn, wfdb, ipykernel; print('All CardioTrustAI packages are installed successfully.')"

Write-Host "Setup complete. Restart Jupyter and select the CardioTrustAI kernel."
