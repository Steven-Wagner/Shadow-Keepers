import React from 'react';

export default function AgentList(props) {

    const agentsList = props.agents.map(agent => {
        return (
            <li className={agent.currentMission === 'None' ? "agent": "agent busy-agent"}
                key={agent.name}>
                {`${agent.name}: ${agent.currentMission}`}
            </li>
        )
    })

    return (
        <div>
            <h2>All Agents</h2>
            <ul>
                {agentsList}
            </ul>
        </div>
    )
}