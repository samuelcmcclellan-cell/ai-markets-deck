param(
  [string]$Pptx  = "$PSScriptRoot\ai-markets-deck.pptx",
  [string]$OutDir = "$PSScriptRoot\slides"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Pptx)) {
  Write-Error "Not found: $Pptx"
  exit 1
}

$workspace = (Resolve-Path $PSScriptRoot).Path
$resolvedOutDir = if (Test-Path $OutDir) {
  (Resolve-Path $OutDir).Path
} else {
  $parent = Split-Path -Parent $OutDir
  $leaf = Split-Path -Leaf $OutDir
  Join-Path (Resolve-Path $parent).Path $leaf
}

if (-not $resolvedOutDir.StartsWith($workspace, [System.StringComparison]::OrdinalIgnoreCase)) {
  Write-Error "Refusing to export outside workspace: $resolvedOutDir"
  exit 1
}

if (Test-Path $resolvedOutDir) {
  Get-ChildItem -LiteralPath $resolvedOutDir -Force | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Force -Path $resolvedOutDir | Out-Null

$ppt = New-Object -ComObject PowerPoint.Application
$ppt.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
$pres = $null

try {
  $pres = $ppt.Presentations.Open($Pptx, $true, $false, $false)

  # Export 16:9 slide JPGs for the static viewer.
  $pres.Export($resolvedOutDir, "JPG", 1920, 1080)
}
finally {
  if ($pres -ne $null) {
    $pres.Close()
    [System.Runtime.InteropServices.Marshal]::ReleaseComObject($pres) | Out-Null
  }
  $ppt.Quit()
  [System.Runtime.InteropServices.Marshal]::ReleaseComObject($ppt) | Out-Null
  [GC]::Collect()
  [GC]::WaitForPendingFinalizers()
}

Get-ChildItem $resolvedOutDir | Select-Object -ExpandProperty FullName
