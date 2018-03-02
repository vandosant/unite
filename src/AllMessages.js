import React, { Component } from 'react'
import { Button, Container, Form, Header, Message } from 'semantic-ui-react'

type Props = {
  messages: Array<Object>,
  onAdd: Function
}

type State = {
  text: string
}

const style = {
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  }
}

export default class AllMessages extends Component {
  static defaultProps = {
    messages: [],
    onAdd: () => {}
  }

  constructor (props) {
    super(props)
  }

  state = {
    text: ''
  }

  handleChange (field, event) {
    event.preventDefault()

    this.setState({ [field]: event.target.value})
  }

  handleAdd (event) {
    event.preventDefault()

    const { text } = this.state
    const createdAt = +new Date
    const add = { text, createdAt }

    this.setState({ text: '' })
    this.props.onAdd({ ...add })
  }

  render () {
    const { messages } = this.props

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
            .map(message =>
              <Message info>
                <Message.Header>
                  {message.createdAt}
                </Message.Header>
                <p>
                  {message.text}
                </p>
              </Message>
            )
          }
          <Form onChange={this.handleChange.bind(this, 'text')} onSubmit={this.handleAdd.bind(this)}>
            <Form.Field>
              <label>Message</label>
              <input placeholder='Message' value={this.state.text} />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Container>
      </div>
    )
  }
}
