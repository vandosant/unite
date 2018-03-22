// @flow
import React, { Component } from 'react'
import AWSAppSyncClient from 'aws-appsync'
import { Rehydrated } from 'aws-appsync-react'
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link'
import { graphql, ApolloProvider, compose } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'
import {
  Container,
  Header,
  Grid
} from 'semantic-ui-react'
import AllMessages from './AllMessages'
import AppSync from './AppSync'
import UserSelect from './UserSelect'
import Greeting from './Greeting.bs'
import angela from './assets/angela.svg'
import bill from './assets/bill.svg'
import jane from './assets/jane.svg'
import karl from './assets/karl.svg'
import ruth from './assets/ruth.svg'

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
    id: 1,
    color: 'green',
    text: 'Jane',
    avatar: jane,
    value: 1
  },
  {
    key: 2,
    id: 2,
    color: 'blue',
    text: 'Karl',
    avatar: karl,
    value: 2
  },
  {
    key: 3,
    id: 3,
    color: 'orange',
    text: 'Ruth',
    avatar: ruth,
    value: 3
  },
  {
    key: 4,
    id: 4,
    color: 'purple',
    text: 'Angela',
    avatar: angela,
    value: 4
  },
  {
    key: 5,
    id: 5,
    color: 'brown',
    text: 'Bill',
    avatar: bill,
    value: 5
  }
]

type Props = {}
type State = {
  users: Array<Object>,
  selectedUser: Object
}

export class App extends Component<Props, State> {
  state = {
    users,
    selectedUser: {}
  }

  handleSelectUser (value: Number) {
    const user = this.state.users.find(u => u.value === value)
    this.setState({ selectedUser: user })
  }

  render () {
    return (
      <Container style={{ 'padding': '2em' }}>
        <Header>
          <Grid
            stackable
            columns={16}
            verticalAlign='middle'
          >
            <Grid.Column width={8}>
              <Greeting message='Unite' />
            </Grid.Column>
            <Grid.Column width={8} textAlign='right'>
              <UserSelect
                userOptions={this.state.users}
                selectedUser={this.state.selectedUser}
                onSelect={this.handleSelectUser.bind(this)}
              />
            </Grid.Column>
          </Grid>
        </Header>
        <AllMessagesWithData
          userId={this.state.selectedUser.id}
          users={this.state.users}
        />
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
      userId
    }
  }
}`

const CreateMessageMutation = gql`
mutation CreateMessageMutation($text: String!, $createdAt: String!, $userId: Int!) {
  createMessage(
    text: $text
    createdAt: $createdAt
    userId: $userId
  ) {
    __typename
    id
    createdAt
    text
    userId
  }
}
`

const NewMessagesSubscription = gql`
subscription NewMessagesSub {
  newMessage {
      __typename
      id
      createdAt
      text
      userId
  }
}`

export const AllMessagesWithData = compose(
  graphql(ListMessagesQuery, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      messages: props.data.listMessages && props.data.listMessages.items,
      subscribeToNewMessages: params => {
        props.data.subscribeToMore({
          document: NewMessagesSubscription,
          updateQuery: (prev, { subscriptionData: { data: { newMessage } } }) => ({
            ...prev,
            listMessages: {
              __typename: 'PaginatedMessages',
              items: [
                newMessage,
                ...prev.listMessages.items.filter(item => item.id !== newMessage.id)
              ]
            }
          })
        })
      }
    })
  }),
  graphql(CreateMessageMutation, {
    options: {
      update: (store, { data: { createMessage } }) => {
        const data = store.readQuery({ query: ListMessagesQuery })
        data.listMessages.items.push(createMessage)
        store.writeQuery({ query: ListMessagesQuery, data })
      }
    },
    props: props => ({
      onSubmit: message => props.mutate({
        mutation: CreateMessageMutation,
        variables: message,
        optimisticResponse: {
          createMessage: {
            __typename: 'Message',
            text: message.text,
            createdAt: message.createdAt,
            id: -1,
            userId: message.userId
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
