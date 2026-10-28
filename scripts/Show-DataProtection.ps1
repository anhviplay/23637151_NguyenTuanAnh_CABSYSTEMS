$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
try {
    $sql = "SELECT body->>'accountId' AS account_id, body->>'passwordHash' AS password_hash, body->>'phoneCipher' AS encrypted_phone FROM records WHERE kind='account' LIMIT 2;"
    & docker compose exec -T postgres psql -U cab_admin -d identity_db -c $sql
    if ($LASTEXITCODE -ne 0) { throw 'Database inspection failed.' }
    & git check-ignore -v .env .data/tls/key.pem
} finally { Pop-Location }
