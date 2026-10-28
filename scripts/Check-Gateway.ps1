$ErrorActionPreference = 'Stop'
Push-Location -LiteralPath (Split-Path -Parent $PSScriptRoot)
try {
    $lines = & docker compose ps --format json
    if ($LASTEXITCODE -ne 0) { throw 'Cannot inspect containers.' }
    $result = foreach ($line in $lines) {
        $item = $line | ConvertFrom-Json
        $published = @($item.Publishers | Where-Object { $_.PublishedPort -gt 0 })
        if ($item.Service -ne 'gateway' -and $published.Count -gt 0) { throw "Direct port exposed: $($item.Service)" }
        [pscustomobject]@{Service=$item.Service;HostPorts=($published | ForEach-Object {$_.PublishedPort}) -join ', '}
    }
    $result | Format-Table -AutoSize
} finally { Pop-Location }
