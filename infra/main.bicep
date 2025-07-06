targetScope = 'resourceGroup'

@description('Name of the Container App')
param containerAppName string

@description('Name of the Container App Environment')
param environmentName string

@description('Container image to deploy')
param image string

@description('GHCR username')
param registryUsername string

@secure()
@description('GHCR PAT or token')
param registryPassword string

@description('Azure location')
param location string = resourceGroup().location

@description('Registry server (e.g., ghcr.io)')
param registryServer string

module containerapp 'modules/container-app.bicep' = {
  name: 'containerapp'
  params: {
    location: location
    containerAppName: containerAppName
    environmentName: environmentName
    image: image
    registryUsername: registryUsername
    registryPassword: registryPassword
    registryServer: registryServer
  }
}
