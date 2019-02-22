import React, { Component } from 'react';
import AgentWithSkills from '../AgentWithSkills';

export default class AgentChoice extends Component {

    clickedAgent() {
        this.props.chooseAgent(this.props.agentData)
    }

    render() {
        return(
            <button
                type="button"
                className={this.props.chosenAgent ? "chosen-agent agent" : "agent"} 
                value={this.props.agentData.name} 
                onClick={()=>this.clickedAgent()}>
                <AgentWithSkills agent={this.props.agentData}/>
            </button>
            
        )
    }
}