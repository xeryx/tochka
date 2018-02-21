Param (
   [Parameter(Mandatory = $false)]
   [string]$definition
)

$ErrorActionPreference = "Stop"
$WarningPreference = "SilentlyContinue"
$error.clear()

try {

   if(!$definition) {
      $list = Get-ChildItem -Directory -Path \\TFSStore\TFSFiles\Release | ? {
         $_.LastWriteTime -gt (Get-Date).AddMonths(-3) 
      } | Select-Object Name | ft -hidetableheaders
   } else {
      $list = Get-ChildItem -Directory -Path "\\TFSStore\TFSFiles\Release\$definition" | Select-Object Name | ft -hidetableheaders
   }

   Write-Output $true
   Write-Output $list

   Exit, 0
   
} catch {

   if($error -like "*Cannot find path*") {
      $Error.clear()
      try {
         $secpasswd = ConvertTo-SecureString "aut0mati0n" -AsPlainText -Force 
         $mycreds = New-Object System.Management.Automation.PSCredential ("fmsuz\foxautomation", $secpasswd)
      
         New-PSDrive -Name "G" -Root "\\TFSStore\TFSFiles" -PSProvider "FileSystem" -Credential $mycreds | Out-Null
      
         if(!$definition) {
            $list = Get-ChildItem -Directory -Path \\TFSStore\TFSFiles\Release | ? {
               $_.LastWriteTime -gt (Get-Date).AddMonths(-3) 
            } | Select-Object Name | ft -hidetableheaders
         } else {
            $list = Get-ChildItem -Directory -Path "\\TFSStore\TFSFiles\Release\$definition" | Select-Object Name | ft -hidetableheaders
         }
      
         Write-Output $true
         Write-Output $list
      
      } catch {
         Write-Output $false
         Write-Output "---"$Error
      }

   } else {
      Write-Output $false
      Write-Output "---"$Error
   }
}
