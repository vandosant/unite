import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { defaultDataIdFromObject } from 'apollo-cache-inmemory'

type Props = {
  messages: Array<Object>,
  onAdd: Function
}

type State = {
  text: string
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

  handleAdd () {
    const { text } = this.state
    const createdAt = +new Date
    const add = { text, createdAt }

    this.setState({ text: '' })
    this.props.onAdd({ ...add, id: defaultDataIdFromObject(add) })
  }

  render () {
    const { messages } = this.props

    return (
      <div>
        {[].concat(messages).map(message => <div key={message.id}>{message.text}</div>)}
        <Form onChange={this.handleChange.bind(this, 'text')} onSubmit={this.handleAdd.bind(this)}>
          <Form.Field>
            <label>Message</label>
            <input placeholder='Message' />
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}
