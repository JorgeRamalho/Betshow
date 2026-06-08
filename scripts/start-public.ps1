# BetShow — servidor + link público (Cloudflare Tunnel)
$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

$port = if ($env:PORT) { $env:PORT } else { "5173" }

Write-Host ""
Write-Host "  BetShow — link publico na internet" -ForegroundColor Green
Write-Host "  ----------------------------------" -ForegroundColor Green
Write-Host "  1. Iniciando Vite na porta $port..." -ForegroundColor Gray
Write-Host "  2. Em seguida, o Cloudflare Tunnel gera a URL https://....trycloudflare.com" -ForegroundColor Gray
Write-Host ""

$viteJob = Start-Job -ScriptBlock {
    param($root, $p)
    Set-Location $root
    $env:PORT = $p
    npm run dev 2>&1
} -ArgumentList $ProjectRoot, $port

Start-Sleep -Seconds 6

Write-Host "  Abrindo tunel publico..." -ForegroundColor Cyan
Write-Host ""

npx --yes cloudflared tunnel --url "http://localhost:$port"

Stop-Job $viteJob -ErrorAction SilentlyContinue
Remove-Job $viteJob -ErrorAction SilentlyContinue
