import React, { Component } from 'react';
import AgentChoice from './agentChoice';
import MissionDashError from './MissionDashError';
import {withRouter} from 'react-router-dom';

class  MissionDashboard extends Component {

    constructor(props) {
        super(props);
        this.state={
            chosenAgents: [],
            error: ''
        }
        this.chooseAgent = this.chooseAgent.bind(this)
    }

    chooseAgent(agent) {
        if (agent.currentMission !== 'None') {
            this.setState({
                error: 'You must select an agent that is not currently on a mission'
            })
        }
        else if (this.state.chosenAgents.find(agentToCheck=> agentToCheck === agent)){
            const newAgentList = this.state.chosenAgents.filter(currentAgent=> currentAgent.name !== agent.name)
            this.setState({
                chosenAgents: newAgentList
            }, ()=>console.log('remove an agent', this.state.chosenAgents))
        }
        else {
            console.log('click was registered', agent);
            this.setState({
                chosenAgents: [...this.state.chosenAgents, agent]
            },()=> console.log('state updated', this.state.chosenAgents))
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const currentMission = this.props.currentMission[0];
        if (this.state.chosenAgents.length === currentMission.agents) {
            this.props.addBusyAgents(this.state.chosenAgents, currentMission.name)
            //add action to action list for when agents will retunr to Ready status
            const actionToReturnAgents = [{removeBusyAgents: currentMission.name, delay: currentMission.missionTurns}]
            
            const initialValue = 0;
            const totalInvestigation = this.state.chosenAgents.reduce((investingationScore, agent) => agent.skills.Investigation + investingationScore, initialValue)
            const totalCharisma = this.state.chosenAgents.reduce((charismaScore, agent) => agent.skills.Charisma + charismaScore, initialValue)
            const totalCombat = this.state.chosenAgents.reduce((combatScore, agent) => agent.skills.Combat + combatScore, initialValue)

            //mission succes of failure?
            if (currentMission.difficulty.Investigation <= totalInvestigation && 
                currentMission.difficulty.Charisma <= totalCharisma && 
                currentMission.difficulty.Combat <= totalCombat) {
                    const skillsAction = currentMission.actionSuc.filter(action => {
                        return action.addSkills
                    })
                    if (skillsAction[0]) {
                        skillsAction[0].agents = (this.state.chosenAgents);
                    }
                    console.log('skills action', skillsAction);
                    const actions = actionToReturnAgents.concat(currentMission.action.concat(currentMission.actionSuc))
                    this.props.addToPendingAction(actions);
                    this.props.history.push('/');
            }
            else {
                const actions = actionToReturnAgents.concat(currentMission.action.concat(currentMission.actionFail))
                this.props.addToPendingAction(actions);
                this.props.history.push('/');
            }
        }
        else {
            this.setState({
                error: `You need to send ${currentMission.agents} agent(s) on this mission.`
            })
        }
    }

    render() {

    const chosenAgentDisplay = this.state.chosenAgents.map(agent=>{
        return agent.name;
    })
    .join(`,\u00A0`);
    
    const agents = this.props.agents.filter(availAgents => {
        return availAgents.currentMission === 'None';
    })
    .map(agent=>{
        const chosenAgent = this.state.chosenAgents.find(choAgent => choAgent.name === agent.name)
        console.log('is agent chosen?', chosenAgent);
        return <AgentChoice key={agent.name} agentData={agent} chooseAgent={this.chooseAgent} chosenAgent={chosenAgent} />
    })

    console.log('in dashborad', this.props)
    return (
        <div className="agent-choices">
            <h2>{this.props.currentMission[0].name}</h2>
            <h3>Available Agents</h3>
            <ul className="agent-list">
                {agents}
            </ul>
            <div>Chosen Agents: {chosenAgentDisplay}</div>
            <MissionDashError errorMessage={this.state.error} />
            <button type="submit" onClick={(e)=>this.handleSubmit(e)}>Submit</button>
        </div>
    )
    }
}

export default withRouter(MissionDashboard)