import React, { PropTypes } from 'react'

// Online contribution donation form
function SuggestionField({ options, action, form }) {
  const { onBlur, onChange, onFocus } = action
  return (
    <div>
      <div className="options btn btn-group">
        {
          options.map(amount => {
            function handleClick() {
              onChange(amount.toString())
            }
            return (
              <button className="btn btn-default" onClick={handleClick}>
                {`$${amount}`}
              </button>
            )
          }
        )}
      </div>
      <div className="form-group">
        <label className="sr-only" htmlFor="exampleInputAmount"></label>
        <div className="input-group">
          <div className="input-group-addon">$</div>
          <input
            type="text"
            className="form-control"
            id="contributeAmount"
            onBlur={onBlur}
            onChange={onChange}
            onFocus={onFocus}
            placeholder=""
            value={form.value}
          />
        </div>
      </div>
    </div>
  )
}

SuggestionField.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
}

SuggestionField.defaultProps = {
}

export default SuggestionField
