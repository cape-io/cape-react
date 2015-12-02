import React, { PropTypes } from 'react'

function Feedback() {
  const helpTxt = 'If you have a question, an issue uploading, or have noticed a bug, please report it here'
  <div className="feedback">
    <a target="_blank" href="https://www.hipchat.com/gv1XLjgaV">
      <button className="btn btn-info">Help/Feedback</button>
      <p className="helptext">
        {helpTxt}
      </p>
    </a>
  </div>
}

Feedback.propTypes = {
}
Feedback.defaultProps = {
}

export default Feedback
