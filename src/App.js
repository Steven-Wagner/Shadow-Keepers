import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MissionDescription from './mission/missionDescription'
import './App.css';
import descriptionData from './missionData';
import itemsData from './itemDate';
import Inventory from './inventory/inventory';
import MissionDashboard from './missionDashboard/missionDashboard'
import Menu from './Menu';
import AgentMenu from './AgentMenu/AgentMenu';
import AgentList from './AgentList';


export class App extends Component {

  constructor(props) {
    super(props);
    console.log(descriptionData);
    this.state = {
      currentDescription: descriptionData.intro,
      currentItems: [itemsData.stick],
      pendingActions: [],
      currentMission: '',
      agents: [
        {name: 'Steve', currentMission: 'Some Mission', skills: {Investigation: 1, Charisma: 1, Combat: 1}}
              ],
      busyAgents: []
    }
    this.addToPendingAction = this.addToPendingAction.bind(this);
    this.performNextAction = this.performNextAction.bind(this);
    this.addNewAgent = this.addNewAgent.bind(this);
    this.addBusyAgents = this.addBusyAgents.bind(this);
  }

  addToPendingAction(actions) {
    if (actions !== []) {
      const actionsArray = actions.map(action=>{
        if (!action.delay) {
          action.delay=0
          return action;
        }
        return action
      })
      this.setState({
        pendingActions: actionsArray.concat(this.state.pendingActions)
      }, ()=>this.performNextAction())
    }
    else {
      this.performNextAction()
    } 
  }

  performNextAction() {
    const action = this.state.pendingActions.find(searchAction =>{
      return searchAction.delay === 0;
    })
    if (!action) {
      this.nextTurn()
    }
    else if (action.goTo) {
      this.setState({
        currentDescription: descriptionData[action.goTo]
      })
    }
    else if (action.addItem) {
      this.setState({
        currentItems: [...this.state.currentItems, itemsData[action.addItem]],
        currentDescription: 
          {startDescription: `You just recived: ${action.addItem}`,
          options: [{label: `Awesome`,
                  action: []
                }]
          }
      })
    }
    else if (action.mission) {
      this.setState({
        currentMission: action.mission
      }, ()=>this.newMission(action.mission))
    }
    else if (action.removeBusyAgents) {
      this.changeMissionStatusToNone(action.removeBusyAgents)
    }

    else if (action.addSkills) {
      //iterate adskills. todo: add addskills action to action list in missiondash
    }
    
    this.actionCompleted(action);
  }

  actionCompleted(action) {
    const indexToDelete = this.state.pendingActions.indexOf(action);
    const newPendingActions = this.state.pendingActions.filter((action, index)=>{
      return index !== indexToDelete
    })
    this.setState({
      pendingActions: newPendingActions
    })
  }

  changeMissionStatusToNone(mission) {
    const agentsToChange = []
    const updateAgentsStatus = this.state.agents.map(agent => {
      if (agent.currentMission === mission) {
        agentsToChange.push(agent.name)
        agent.currentMission = 'None'
        return agent;        
      }
      return agent
    })
    agentsToChange.join(', ');
    this.setState({
      agents: updateAgentsStatus,
      currentDescription: 
          {startDescription: `${agentsToChange} returned from ${mission}`,
          options: [{label: `Awesome`,
                  action: []
                  }]
          }
    })
  }

  newMission(mission) {
    this.props.history.push(`/mission/${mission[0].name}`)
  }

  nextTurn() {
    const newDelays = this.state.pendingActions.map((action, index)=>{
      if (action.delay > 0) {
        action.delay -= 1
        return action;
      }
      else {
        return action
      }
    })
    if (!newDelays.find(action=>action.delay === 0)) {
      this.setState({
        currentDescription: {
          startDescription: `It's a slow week. There is nothing to report`,
          options: [{label: `Wait for next week`,
                    action: []
                  }
                  ]
        }
      })
    }
    else {
      this.setState({
        pendingActions: newDelays
      }, ()=>this.performNextAction())
    }
  }

  addNewAgent(agent) {
    console.log('making new agent', agent);
    this.setState({
      agents: [...this.state.agents, agent]
    })
  }

  addBusyAgents(busyAgents, missionName) {
    const updateBusyAgents = this.state.agents.map((agent)=> {
      busyAgents.forEach(busyAgent => {
        if (agent.name === busyAgent.name) {
          agent.currentMission = missionName;
          return agent
        }       
      })
      return agent
    })
    this.setState({
      agents: updateBusyAgents
    })
  }

  render() {

    console.log(this.state);
    return (
      <div className="content">
        <div className="left-section inventory">
          <Route
            path='/'
            render={()=>
              <Inventory currentItems={this.state.currentItems} />
            }
          />
        </div>
        <main role="main" className="main-section">
          <Route 
            exact path="/"
            render={()=>
              <MissionDescription 
                currentDescription={this.state.currentDescription} 
                addToPendingAction={this.addToPendingAction}
                performNextAction={this.performNextAction}/>
            }
          />
          <Route
            path="/mission/"
            render={()=>
              <MissionDashboard 
                currentMission={this.state.currentMission}
                agents={this.state.agents}
                addToPendingAction={this.addToPendingAction}
                addBusyAgents = {this.addBusyAgents} />
            }
          />
          <Route
            path="/agentmenu"
            render={()=>
              <AgentMenu 
                history={this.props.history}
                agents={this.state.agents} 
                addNewAgent={this.addNewAgent}/>
            }
          />
        </main>
        <div className="right-section agent-stuff">
          <AgentList agents={this.state.agents} />
          <Route
            path="/"
            component={Menu}
          />
          {/*to do: add agent name and status to this sidebar*/}
        </div>
      </div>
    );
  }
}

export default withRouter(App);
