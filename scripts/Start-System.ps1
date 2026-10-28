$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
try {
    & docker compose config --quiet
    if ($LASTEXITCODE -ne 0) { throw 'Invalid configuration.' }
    & docker compose up -d --no-build
    if ($LASTEXITCODE -ne 0) { throw 'Startup failed.' }
    & docker compose ps
} finally { Pop-Location }
