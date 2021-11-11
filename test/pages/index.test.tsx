import 'reflect-metadata'

import { fireEvent, render } from '../testUtils'

import { Home } from '../../pages/index'
import React from 'react'

const classDecorator = (target: Function) => {
  // do something with your class
}

@classDecorator
class Hello {
  meow: boolean
}

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />, {})
    expect(asFragment()).toMatchSnapshot()
  })

  it('clicking button triggers alert', () => {
    const { getByText } = render(<Home />, {})
    window.alert = jest.fn()
    fireEvent.click(getByText('Test Button'))
    expect(window.alert).toHaveBeenCalledWith('With typescript and Jest')
  })
})
