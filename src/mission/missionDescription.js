import React, {Component} from 'react';
import MissionOption from './missionOption/missionOption';

export default class MissionDescription extends Component {
    render() {

        console.log('what is this', this.props)
        const options = this.props.currentDescription.options.map((option, i)=>{
            console.log(this.props);
            return <MissionOption 
                        optionData={option} 
                        key={i}
                        addToPendingAction={this.props.addToPendingAction}
                        performNextAction={this.props.performNextAction}/>
        })

        return (
            <div>
                <div>
                    <p>{this.props.currentDescription.startDescription}</p>
                </div>
                <div className="mission-options">
                    {options}
                </div>
            </div>
        )
    }
}