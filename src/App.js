// @flow
import React, { Component } from 'react'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import { graphql, ApolloProvider, compose } from 'react-apollo'
import * as AWS from 'aws-sdk'
import gql from 'graphql-tag'
import AllMessages from './AllMessages'
import AppSync from './AppSync'
import logo from './logo.svg'
import './App.css'

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AppSync.apiKey,

    // Amazon Cognito Federated Identities using AWS Amplify
    // credentials: () => Auth.currentCredentials(),

    // Amazon Cognito user pools using AWS Amplify
    // type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    // jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(),
  }
})
console.log(client)

type Props = {}

class App extends Component<Props> {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React</h1>
        </header>
        <AllMessagesWithData />
      </div>
    )
  }
}

const ListMessagesQuery = gql`
query ListMessages {
  listMessages {
    items {
      id
      text
    }
  }
}`

const AllMessagesWithData = graphql(ListMessagesQuery, {
  options: {
    fetchPolicy: 'cache-and-network'
  },
  props: props => ({
    messages: props.data.listMessages && props.data.listMessages.items
  })
})(AllMessages)

const createMessageQuery = gql`
mutation CreateMessage {
  createMessage(text: "hello", createdAt: "now") {
    id
    text
    createdAt
  }
}
`
const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

export default WithProvider
