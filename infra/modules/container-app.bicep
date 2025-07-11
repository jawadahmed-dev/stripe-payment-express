param containerAppName string
param environmentName string
param image string
param location string
param registryServer string
param registryUsername string
@secure() 
param registryPassword string

resource env 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: environmentName
  location: location
  properties: {}
}

resource app 'Microsoft.App/containerApps@2023-05-01' = {
  name: containerAppName
  location: location
  properties: {
    managedEnvironmentId: env.id
    configuration: {
       activeRevisionsMode: 'Single'
      registries: [
        {
          server: registryServer
          username: registryUsername
          passwordSecretRef: 'ghcr-password'
        }
      ]
      secrets: [
        {
          name: 'ghcr-password'
          value: registryPassword
        }
      ]
    }
    template: {
      containers: [
        {
          name: containerAppName
          image: image
          env: [
            {
              name: 'NODE_ENV'
              value: 'develop'
            }
          ]
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 3
      }
    }
  }
}
