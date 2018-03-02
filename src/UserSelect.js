import React, { Component } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

type Props = {
  userOptions: Array<Object>,
  selectedUser: Object,
  onSelect: Function
}

export default class UserSelect extends Component<Props, State> {
  static defaultProps = {
    userOptions: [],
    selectedUser: {
      id: ''
    },
    onSelect: () => {}
  }

  handleChange (event, { value }) {
    event.preventDefault()
    this.props.onSelect(value)
  }

  render () {
    const { userOptions, selectedUser } = this.props

    return (
      <Menu compact>
        <Dropdown
          onChange={this.handleChange.bind(this)}
          placeholder='Select User'
          selection
          options={userOptions}
          value={selectedUser.value}
        />
      </Menu>
    )
  }
}
