FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

RUN apt-get update && apt-get install -y curl ca-certificates && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && apt-get install -y nodejs && rm -rf /var/lib/apt/lists/*

WORKDIR /cardiotrustai

COPY . .

RUN dotnet restore ./CardioTrustAI.slnx
RUN dotnet build ./CardioTrustAI.slnx -c Debug --no-restore

WORKDIR /cardiotrustai/src/WebSpa

WORKDIR /cardiotrustai

EXPOSE 2029

ENTRYPOINT ["dotnet", "watch", "--project", "src/CardioTrustAI.Backend/CardioTrustAI.API/CardioTrustAI.API.csproj", "run", "--urls=http://0.0.0.0:2029"]