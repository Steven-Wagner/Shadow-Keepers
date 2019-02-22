import React from 'react';

export default function AgentWithSkills(props) {

    const skillsAsString = Object.entries(props.agent.skills).map(skill => {
        console.log(skill[0]);
        return <span key={skill[0]}>{`${skill[0]}: ${skill[1]}\u00A0`}</span>
    })

    console.log(skillsAsString)
    //may not need display status prop
    return (
        <div>
            <div>
                {props.agent.name} {props.displayStatus ? props.agent.currentMission: ''}
            </div>
            <div>
                {skillsAsString}
            </div>
        </div>
    )
}