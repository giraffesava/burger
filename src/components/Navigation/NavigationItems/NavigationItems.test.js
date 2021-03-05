import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })


  it('should render 2 <NavigationItem /> elements if not authenticated', () => {
    //const wrapper = shallow(<NavigationItems/>); //we added it to beforeEach()
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  });
  it('should render 3 <NavigationItem /> elements if authenticated', () => {
    //const wrapper = shallow(<NavigationItems isAuthenticated/>);
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.find(NavigationItem)).toHaveLength(3)
  })
  it('should an exact logout button', () => {
    wrapper.setProps({isAuthenticated: true})
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
  })
})