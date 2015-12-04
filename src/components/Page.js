import React, { PropTypes } from 'react'

// Basic suggestion button.
function Page({ children, intro, title }) {
  return (
    <div>
      { title && <h1>{ title }</h1> }
      { intro && <p className="lead">{ intro }</p> }
      { children }
    </div>
  )
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  intro: PropTypes.string,
  title: PropTypes.string,
}
Page.defaultProps = {}

export default Page
