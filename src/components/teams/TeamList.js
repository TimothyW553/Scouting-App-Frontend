import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const TeamList = ({events}) => {
  return (
    <div className="team-list section">
      { events && projects.map(event => {
        return (
          <Link to={'/teams/' + event.id} key={event.id}>
            <TeamSummary project={event} />
          </Link>
        )
      })}  
    </div>
  )
}

export default TeamList
