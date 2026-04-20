param(
  [string]$Pptx  = "$PSScriptRoot\ai-markets-deck.pptx",
  [string]$OutDir = "$PSScriptRoot\slides"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Pptx)) {
  Write-Error "Not found: $Pptx"
  exit 1
}

if (Test-Path $OutDir) { Remove-Item "$OutDir\*" -Force -Recurse -ErrorAction SilentlyContinue }
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
$pres = $ppt.Presentations.Open($Pptx, $true, $false, $false)

# Export as JPG at a reasonable resolution
$pres.Export($OutDir, "JPG", 1600, 900)

$pres.Close()
$ppt.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
[GC]::Collect()
[GC]::WaitForPendingFinalizers()

Get-ChildItem $OutDir | Select-Object -ExpandProperty FullName
