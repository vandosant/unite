// @flow
import React, { Component } from 'react'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import { graphql, ApolloProvider, compose } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import * as AWS from 'aws-sdk'
import gql from 'graphql-tag'
import { Container } from 'semantic-ui-react'
import AllMessages from './AllMessages'
import AppSync from './AppSync'

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
  },
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id
  })
})

type Props = {}

class App extends Component<Props> {
  render () {
    return (
      <Container>
        <AllMessagesWithData />
      </Container>
    )
  }
}

const ListMessagesQuery = gql`
query ListMessages {
  listMessages {
    items {
      __typename
      id
      createdAt
      text
    }
  }
}`

const CreateMessageMutation = gql`
mutation CreateMessageMutation($text: String!, $createdAt: String!) {
  createMessage(
    text: $text
    createdAt: $createdAt
  ) {
    __typename
    id
    createdAt
    text
  }
}
`

const AllMessagesWithData = compose(
  graphql(ListMessagesQuery, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      messages: props.data.listMessages && props.data.listMessages.items
    })
  }),
  graphql(CreateMessageMutation, {
    options: {
      update: (store, { data: { createMessage } }) => {
        const data = store.readQuery({ query: ListMessagesQuery })

        console.log(createMessage)
        data.listMessages.items.push(createMessage)
        store.writeQuery({ query: ListMessagesQuery, data })
      }
    },
    props: props => ({
      onAdd: message => props.mutate({
        mutation: CreateMessageMutation,
        variables: message,
        optimisticResponse: {
          createMessage: {
            __typename: 'Message',
            text: message.text,
            createdAt: message.createdAt,
            id: -1
          }
        }
      })
    })
  })
)(AllMessages)

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
)

export default WithProvider
