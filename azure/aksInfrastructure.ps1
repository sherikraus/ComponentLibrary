param(
    [Parameter(Mandatory = $true)]
    [string]
    $resourceGroupName,
    [Parameter(Mandatory = $true)]
    [string]
    $namespace,    
    [Parameter(Mandatory = $true)]
    [string]
    $environmentName,
    [Parameter(Mandatory = $true)]
    [string]
    $region
)
Function CheckForErrors {
    if ($LASTEXITCODE -ne 0) {
        $ErrorActionPreference = "Stop"
        Write-Error "Error executing command. Stopping."
    }
}
$ErrorActionPreference = "Continue"


nuget install Azure-AagTagging -Version 0.1.20200106.2 -ExcludeVersion -OutputDirectory packages
Import-Module ./packages/Azure-AagTagging/Azure-AagTagging.psm1 -Force
CheckForErrors

#Tags
$tags = GetTags $environmentName $resourceGroupName
CheckForErrors

$applicationName = "componentlibrary"
$ipName = @($applicationName, $environmentName, "ingressstaticip") -join "-"

$dnsName = @($applicationName, $environmentName, "aks") -join "-"

kubectl.exe create namespace $namespace
kubectl.exe config set-context --current --namespace=$namespace

helm repo add stable https://kubernetes-charts.storage.googleapis.com/

helm repo update

helm upgrade nginx-componentlibrary-$environmentName-ingress stable/nginx-ingress --install --namespace $namespace --set controller.replicaCount=2 --set controller.nodeSelector."beta\.kubernetes\.io/os"=linux --set defaultBackend.nodeSelector."beta\.kubernetes\.io/os"=linux --set controller.service.annotations."service\.beta\.kubernetes\.io\/azure-dns-label-name"=$dnsName

kubectl.exe apply -f ../kube/deployment.yaml
# kubectl.exe apply -f ../kube/ingress.yaml

# # az network public-ip update --ids $ip.publicIp.id --dns-name $dnsName
# # Patch to replace hostnames between environments
# $finalDnsName = $dnsName + "." + $region + ".cloudapp.azure.com"
# $ingressPatch = "[{`"op`": `"replace`",`"path`": `"/spec/rules/0/host`",`"value`": `"$finalDnsName`"},{`"op`": `"replace`",`"path`": `"/spec/tls/0/hosts/0`",`"value`": `"$finalDnsName`"}]"
# kubectl.exe patch ing/componentlibrary-ingress --type=json --patch $ingressPatch

