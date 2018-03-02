import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { App, AllMessagesWithData } from './App'
import UserSelect from './UserSelect'

Enzyme.configure({ adapter: new Adapter() })

const expectedProps = {
  userOptions: [
    {
      avatar: 'jane.svg',
      color: 'green',
      id: 1,
      key: 1,
      text: 'Jane',
      value: 1
    },
    {
      avatar: 'karl.svg',
      color: 'blue',
      id: 2,
      key: 2,
      text: 'Karl',
      value: 2
    },
    {
      avatar: 'ruth.svg',
      color: 'orange',
      id: 3,
      key: 3,
      text: 'Ruth',
      value: 3},
    {
      avatar: 'angela.svg',
      color: 'purple',
      id: 4,
      key: 4,
      text: 'Angela',
      value: 4
    },
    {
      avatar: 'bill.svg',
      color: 'brown',
      id: 5,
      key: 5,
      text: 'Bill',
      value: 5
    }
  ]
}

it('renders <Container />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(Container).length).toEqual(1)
})

it('renders <Header />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(Header).length).toEqual(1)
})

it('renders <UserSelect />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(UserSelect).length).toEqual(1)
})

it('passes user props to <UserSelect />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(UserSelect).prop('userOptions')).toEqual(expectedProps.userOptions)
})

it('renders <AllMessagesWithData />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(AllMessagesWithData).length).toEqual(1)
})

it('passes user props to <AllMessagesWithData />', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find(AllMessagesWithData).prop('users')).toEqual(expectedProps.userOptions)
})
