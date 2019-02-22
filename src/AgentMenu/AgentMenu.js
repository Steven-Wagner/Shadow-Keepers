import React, {Component} from 'react';
import agentNames from '../AgentNamesData';
import MissionDashError from '../missionDashboard/MissionDashError';
import AgentWithSkills from '../AgentWithSkills';

export default class AgentMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agents: [],
            newAgent: ''
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentDidMount() {
        const newAgents = ['agent 1', 'agent 2'].map(agent => {
            return this.createAgent();
        })
        this.setState({
            agents: newAgents
        })
    }

    createAgent() {
        const newAgentName = 
            [agentNames.firstNames[this.getRandomInt(agentNames.firstNames.length)] 
            , agentNames.lastNames[this.getRandomInt(agentNames.lastNames.length)]]
            .join('\u00A0');
        const newSkills = {skills:{
            'Investigation': this.getRandomInt(10), 
            'Charisma': this.getRandomInt(10), 
            'Combat': this.getRandomInt(10)}
        }

        const agentNameAndStatus = {name: newAgentName, currentMission: 'None'}
        const newAgent = {...newSkills, ...agentNameAndStatus}
        console.log('new Gaent', newAgent);
        return newAgent;
    }

    chooseThisAgent(agent) {
        this.setState({
            newAgent: agent
        })
    }

    submitNewAgent(e) {
        e.preventDefault();
        if (this.state.newAgent !== '') {
            this.props.addNewAgent(this.state.newAgent);
            this.props.history.goBack();
        }
        else{
            this.setState({
                error: 'Please select an agent to hire or cancel'
            })
        }
    }

    render() {
        const newAgentChoices = this.state.agents.map((agent, i)=>{
            return (
                <button type="button" className={this.state.newAgent.name === agent.name ? "chosen-agent agent" : "agent"} 
                    key={i} 
                    onClick={()=>this.chooseThisAgent(agent)}
                    >              
                    <AgentWithSkills agent={agent} key={i}/>
                </button>
            )
        })

        return (
            <div className="new-agents">
                <h2>Pick an agent and click hire</h2>
                <form className="new-agents-form">
                    {newAgentChoices}
                    <div>
                        <button type="submit" onClick={(e)=>this.submitNewAgent(e)}>Hire</button>
                        <button onClick={()=>this.props.history.push('/')}>Cancel</button>
                    </div>
                    <MissionDashError errorMessage={this.state.error} />
                </form>
            </div>
        )
    }
}