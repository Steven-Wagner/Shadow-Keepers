import React from 'react' ;
import AgentMenu from './AgentMenu/AgentMenu';
import {Link} from 'react-router-dom';

export default function Menu (props) {
    return (
        <div className="menu">
            <Link to={'/agentmenu/'}>Hire Agent</Link>
        </div>
    )
}