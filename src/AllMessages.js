// @flow
import React, { Component } from 'react'
import {
  Button,
  Container,
  Form,
  Header,
  Image,
  Message
} from 'semantic-ui-react'

type Props = {
  messages: Array<Object>,
  users: Array<{
    key: Number,
    color: String,
    avatar: String,
    text: String
  }>,
  userId: Number,
  onSubmit: Function,
  subscribeToNewPosts: Function,
  subscribeToNewMessages: Function
}

type State = {
  text: string
}

const style = {
  h3: {
    marginTop: '2em',
    padding: '2em 0em'
  }
}

export default class AllMessages extends Component<Props, State> {
  static defaultProps = {
    messages: [],
    users: [],
    onAdd: () => {}
  }

  state = {
    text: ''
  }

  componentWillMount () {
    this.props.subscribeToNewMessages()
  }

  handleChange = (event: Object) => {
    this.setState({ text: event.target.value })
  }

  handleSubmit = (event: Object) => {
    event.preventDefault()

    const { text } = this.state
    const { userId } = this.props
    const createdAt = +new Date()
    const add = {
      text,
      createdAt,
      userId
    }

    this.setState({ text: '' })
    this.props.onSubmit({ ...add })
  }

  render () {
    const { messages, users, userId } = this.props

    return (
      <div>
        <Header
          as='h3'
          content='Messages'
          style={style.h3}
          textAlign='center'
        />
        <Container text>
          {
            [].concat(messages)
              .sort((a, b) => a.createdAt - b.createdAt)
              .map(message => {
                const { color, avatar, text } = users.find(u => u.id === message.userId)
                return <Message color={color} key={message.id}>
                  <Message.Header>
                    <Image src={avatar} avatar />{text}
                  </Message.Header>
                  <p>{message.text}</p>
                </Message>
              })
          }
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit}>
            <Form.Field>
              <label>Message</label>
              <input
                placeholder={!userId ? 'Select your user' : 'Message'}
                value={this.state.text}
                disabled={!userId}
              />
            </Form.Field>
            <Button type='submit' disabled={!userId}>Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}
