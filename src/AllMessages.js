import React, { Component } from 'react'

export default class AllMessages extends Component {
  static defaultProps = {
    messages: []
  }

  render () {
    const { messages } = this.props

    return (
      <div>
        {[].concat(messages).map(message => <div key={message.id}>{message.text}</div>)}
      </div>
    )
  }
}
