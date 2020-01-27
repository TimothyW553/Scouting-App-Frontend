import React from 'react'
import moment from 'moment'

const TeamButtonSummary = ({event}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{event.teams}</span>
        <p>Event ID {event.event_id}</p>
      </div>
    </div>
  )
}

export default TeamButtonSummary;