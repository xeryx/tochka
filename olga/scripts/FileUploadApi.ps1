Param (
	[Parameter(Mandatory = $true)]
   [string]$Uri,

	[Parameter(Mandatory = $true)]
   [string]$InFile
   )

$ErrorActionPreference = "Stop"
$WarningPreference = "SilentlyContinue"

(Add-Type -AssemblyName System.Net.Http) | Out-Null
($httpClientHandler = New-Object System.Net.Http.HttpClientHandler) | Out-Null
($httpClient = New-Object System.Net.Http.Httpclient $httpClientHandler) | Out-Null

($packageFileStream = New-Object System.IO.FileStream @($InFile, [System.IO.FileMode]::Open)) | Out-Null

($contentDispositionHeaderValue = New-Object System.Net.Http.Headers.ContentDispositionHeaderValue "form-data") | Out-Null
($contentDispositionHeaderValue.Name = "fileToUpload") | Out-Null
($contentDispositionHeaderValue.FileName = (Split-Path $InFile -leaf))| Out-Null

($streamContent = New-Object System.Net.Http.StreamContent $packageFileStream) | Out-Null
($streamContent.Headers.ContentDisposition = $contentDispositionHeaderValue) | Out-Null
($streamContent.Headers.ContentType = New-Object System.Net.Http.Headers.MediaTypeHeaderValue "multipart/form-data") | Out-Null

($content = New-Object System.Net.Http.MultipartFormDataContent) | Out-Null
($content.Add($streamContent)) | Out-Null

try {
   ($response = $httpClient.PostAsync($Uri, $content).Result) | Out-Null

   if (!$response.IsSuccessStatusCode){
      ($responseBody = $response.Content.ReadAsStringAsync().Result) | Out-Null
      ($errorMessage = "Status code {0}. Reason {1}. Server reported the following message: {2}." -f $response.StatusCode, $response.ReasonPhrase, $responseBody) | Out-Null

      throw [System.Net.Http.HttpRequestException] $errorMessage
   }

   Write-Output $true
}
catch [Exception] {
   Write-Output $false, $PSItem.Exception.Message
}
finally
{
   if($null -ne $httpClient)    {
      ($httpClient.Dispose()) | Out-Null
   }
   if($null -ne $response) {
      ($response.Dispose()) | Out-Null
   }
}
    