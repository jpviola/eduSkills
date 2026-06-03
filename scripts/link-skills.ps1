# link-skills.ps1
# Enlaza todas las skills del repositorio a $HOME/.claude/skills para que Claude Desktop/CLI las reconozca.

$repoRoot = Get-Item -Path "$PSScriptRoot\.."
$destDir = Join-Path $env:USERPROFILE ".claude\skills"

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir -Force
}

# Buscar todos los archivos SKILL.md y crear symlinks
Get-ChildItem -Path (Join-Path $repoRoot.FullName "skills") -Filter "SKILL.md" -Recurse | ForEach-Object {
    $srcDir = $_.Directory.FullName
    $name = $_.Directory.Name
    $targetPath = Join-Path $destDir $name

    if (Test-Path $targetPath) {
        Remove-Item -Path $targetPath -Recurse -Force
    }

    # Crear symlink (requiere privilegios de administrador en algunos casos o modo desarrollador)
    New-Item -ItemType SymbolicLink -Path $targetPath -Target $srcDir -Force
    Write-Host "Enlazada skill: $name -> $srcDir"
}
