import React from 'react'
import moment from 'moment'

const TeamSummary = ({event}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{event.event_id}</span>
      </div>
    </div>
  )
}

export default TeamSummary
