# ============================================================
# Stage 1: Base runtime
# ============================================================

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base

WORKDIR /app

# Configure ASP.NET Core to listen on port 8080.
ENV ASPNETCORE_HTTP_PORTS=8080

# Container HTTP port.
EXPOSE 8080


# ============================================================
# Stage 2: Build
# ============================================================

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

# Copy solution-level configuration first.
COPY global.json .
COPY Directory.Packages.props .
COPY AlgoArena.sln .

# Copy project files first to maximize Docker layer caching.
COPY AlgoArena.API/AlgoArena.API.csproj AlgoArena.API/
COPY AlgoArena.Application/AlgoArena.Application.csproj AlgoArena.Application/
COPY AlgoArena.Domain/AlgoArena.Domain.csproj AlgoArena.Domain/
COPY AlgoArena.Infrastructure/AlgoArena.Infrastructure.csproj AlgoArena.Infrastructure/
COPY AlgoArena.Persistence/AlgoArena.Persistence.csproj AlgoArena.Persistence/

# Restore dependencies.
RUN dotnet restore AlgoArena.API/AlgoArena.API.csproj

# Copy source code.
COPY . .

# Build the API.
RUN dotnet build AlgoArena.API/AlgoArena.API.csproj \
    --configuration Release \
    --no-restore \
    --output /app/build


# ============================================================
# Stage 3: Publish
# ============================================================

FROM build AS publish

RUN dotnet publish AlgoArena.API/AlgoArena.API.csproj \
    --configuration Release \
    --no-restore \
    --output /app/publish \
    --no-self-contained


# ============================================================
# Stage 4: Production
# ============================================================

FROM base AS final

WORKDIR /app

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "AlgoArena.API.dll"]