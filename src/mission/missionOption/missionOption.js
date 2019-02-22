import React from 'react';

export default function MissionOptions(props) {
    console.log(props);

    function performActions(actionsArray) {
        props.addToPendingAction(actionsArray)
        //props.performNextAction()

    }

    return <button onClick={()=>performActions(props.optionData.action)}>{props.optionData.label}</button>
}