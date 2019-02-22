import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';
import {route} from 'react-router-dom';
import {mount} from 'enzyme';

describe('<App>', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('opening screen renders correctly', () => {
    const wrapper = shallow(<App.WrappedComponent />);
    expect(toJson(wrapper)).toMatchSnapshot();
  })
  /*it('addToPendingAction call changes state correctly', () => {
    const wrapper = shallow(<MemoryRouter><App/></MemoryRouter>)
    wrapper.find('App').instance().addToPendingAction([{goTo: 'random'}]);
    expect(wrapper.find(App).state('pendingActions')).toBe([{goTo: 'random'}])
  })*/
})


