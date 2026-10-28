$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
try {
    & docker compose exec -T kafka /opt/kafka/bin/kafka-topics.sh --bootstrap-server kafka:9092 --list
    if ($LASTEXITCODE -ne 0) { throw 'Cannot list topics.' }
    & docker compose exec -T kafka /opt/kafka/bin/kafka-console-consumer.sh --bootstrap-server kafka:9092 --topic booking.driver-assigned --from-beginning --max-messages 1 --timeout-ms 10000
    if ($LASTEXITCODE -ne 0) { throw 'Cannot read event.' }
} finally { Pop-Location }
