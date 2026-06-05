# BetShow — inicia servidor com link para acesso na rede local (celular, outro PC)
$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

function Get-LocalIPv4 {
    Get-NetIPAddress -AddressFamily IPv4 -ErrorAction SilentlyContinue |
        Where-Object { $_.IPAddress -notlike "127.*" -and $_.PrefixOrigin -ne "WellKnown" } |
        Select-Object -First 1 -ExpandProperty IPAddress
}

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

$ip = Get-LocalIPv4
if (-not $ip) { $ip = "SEU-IP-LOCAL" }
$port = if ($env:PORT) { $env:PORT } else { "5173" }

Write-Host ""
Write-Host "  BetShow — links de acesso" -ForegroundColor Green
Write-Host "  -------------------------" -ForegroundColor Green
Write-Host "  Neste PC:     http://localhost:$port/" -ForegroundColor Cyan
Write-Host "  Rede local:   http://${ip}:$port/" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Use o link da rede no celular (mesmo Wi-Fi)." -ForegroundColor Gray
Write-Host "  Internet publica: veja ACESSO-REMOTO.md (ngrok / Cloudflare)." -ForegroundColor Gray
Write-Host ""

npm run dev
