// @flow
import React, { Component } from 'react'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import { graphql, ApolloProvider, compose } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import { Header, Container } from 'semantic-ui-react'
import AllMessages from './AllMessages'
import AppSync from './AppSync'
import UserSelect from './UserSelect'
import jane from './assets/jane.svg'
import karl from './assets/karl.svg'

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: AppSync.apiKey
  },
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id
  })
})

const users = [
  {
    key: 1,
    id: 'green',
    text: 'Jane',
    avatar: jane,
    value: 1
  },
  {
    key: 2,
    id: 'blue',
    text: 'Karl',
    avatar: karl,
    value: 2
  },
  {
    key: 3,
    id: 'orange',
    text: 'Ruth',
    value: 3
  },
  {
    key: 4,
    id: 'purple',
    text: 'Angela',
    value: 4
  },
  {
    key: 5,
    id: 'brown',
    text: 'Bill',
    value: 5
  }
]

type Props = {}
type State = {
  users: Array<Object>,
  selectedUser: Object
}

class App extends Component<Props, State> {
  state = {
    users,
    selectedUser: {}
  }

  handleSelectUser (value) {
    const user = this.state.users.find(u => u.value === value)
    this.setState({ selectedUser: user })
  }

  render () {
    return (
      <Container>
        <Header>
          <UserSelect
            userOptions={this.state.users}
            selectedUser={this.state.selectedUser}
            onSelect={this.handleSelectUser.bind(this)}
          />
        </Header>
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
