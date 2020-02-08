import React from 'react'
import moment from 'moment'

const ProjectSummary = ({match_form}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title ">{match_form.team_num}</span>
        <p className="grey-text">{moment(match_form.createdAt.toDate()).calendar()}</p>
      </div>
    </div>
  )
}

export default ProjectSummary
