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

@description('Registry URL')
param registryURL string

@description('Key-value environment variables')
param appSettings object = {}

@description('Azure location')
param location string = resourceGroup().location

module containerapp '.modules/containerapp.bicep' = {
  name: 'containerapp'
  params: {
    location: location
    containerAppName: containerAppName
    environmentName: environmentName
    image: image
    registryUsername: registryUsername
    registryPassword: registryPassword
    appSettings: appSettings
  }
}
