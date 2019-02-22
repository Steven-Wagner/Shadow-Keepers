
import React from 'react';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import MissionDescription from './mission/missionDescription'
import MissionOption from './mission/missionOption/missionOption';

describe('<MissionDescription', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<MissionDescription 
                                    currentDescription={{startDescription: "This is the intro. My name is Sightseer. Would you like to join my team?", options: [{label: "Count Me In", action: Array(2)}, {label: "I'm Not Sure I'm Ready", action: Array(2)}]}}
                                    />)
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})

describe('<MissionOption', () => {
    it('renders button correcty', () => {
        const wrapper = shallow(<MissionOption optionData={{label: "Count Me In"}}/>)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('function called when missionOption button pressed', ()=> {

        const mockCallBack = jest.fn()

        const wrapper = mount(<MissionOption optionData={{label: "Count Me In"}} addToPendingAction={mockCallBack}/>)
        wrapper.find('button').simulate('click');
        expect(mockCallBack).toHaveBeenCalled();
    })
})
