Param (
	[Parameter(Mandatory = $true)]
   [string]$command,
   
   [Parameter(Mandatory = $true)]
   [string]$hostAlias,
   
   [Parameter(Mandatory = $true)]
   [string]$vmName,
   
   [Parameter(Mandatory = $true)]
   [string]$vSphereUsername,
   
   [Parameter(Mandatory = $true)]
   [string]$vSpherePassword,
   
   [Parameter(Mandatory = $false)]
   [string]$snapshotName = "Base"
   
)

$ErrorActionPreference = "Stop"
$WarningPreference = "SilentlyContinue"

switch ($hostAlias) {
   "spartan" {$vCenterAddress = "spartanvcenter.perftestmv.local"}
   "mv2" {$vCenterAddress = "vcenter-mv2.fmsuz.com"}
   default {$vCenterAddress = "vcenter-mv2.fmsuz.com"}
}

switch ($command) {
   "PowerOn" { 
      try {
         #Add-PSSnapin VMware.VimAutomation.Coreç
         #Import-Module VMware.PowerCLI
         (Connect-VIServer -server $vCenterAddress -User $vSphereUsername -Password $vSpherePassword) | Out-Null
         ($vm = Get-VM -Name $vmName) | Out-Null
         If ($vm.PowerState -ne "PoweredOn") {
            (Start-VM $vm) | Out-Null
         }
         Write-Output $true
         (Disconnect-VIServer -server $vCenterAddress -Confirm:$false -Force) | Out-Null
      } catch {
         Write-Output $false, "---"$Error
      }
   }

   "Revert" { 
      try {
         #Add-PSSnapin VMware.VimAutomation.Coreç
         #Import-Module VMware.PowerCLI
         (Connect-VIServer -server $vCenterAddress -User $vSphereUsername -Password $vSpherePassword) | Out-Null
         ($vm = Get-VM -Name $vmName) | Out-Null
         ($allSnapshots = Get-Snapshot -VM $vm) | Out-Null
         ($snapshot = $allSnapshots | Where {$_.name -like $snapshotName} | Select-Object -Last 1)  | Out-Null
         if($snapshot -ne $null) {
            (Set-VM -vm $vm -snapshot $snapshot -confirm:$false) | Out-Null
            Write-Output $true
         } else {
            Write-Output $false, "---Get-Snapshot : No snapshot named $snapshotName found"
         }
         (Disconnect-VIServer -server $vCenterAddress -Confirm:$false -Force) | Out-Null

      } catch {
         Write-Output $false, "---"$Error
      }
   }
   
   default { 
      Write-Output $false, "---Command not recognized"
   }
}