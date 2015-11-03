import React, { PropTypes } from 'react';

function Anonymous({providerId, label, email, displayName, join}) {
  const headerMsg = `Hi, ${displayName}!`;
  const leadMsg = `You've successfully authenticated by using your ${label}
    ${providerId} account. Unfortunately we did not find an exsisting CAPE user
    linked to that account${email ? ' or the email ' + email : ''}.
    You can create a new account or link this ${providerId} login with
    an exsisting account.`;
  const linkMsg = `Enter the email address of an exsisting CAPE user you want to
    link this login to.`;

  return (
    <div>
      { displayName && <h2>{ headerMsg }</h2> }
      <p className="lead">{ leadMsg }</p>
      <h3>Join</h3>
      <input type="text" defaultValue={displayName} />
      { email && <button onClick={() => join({displayName, email})}>Create a new account using {email}.</button> }
      <h3>Find & Link</h3>
      <p>{ linkMsg }</p>
      <input type="text" />
    </div>
  );
}
Anonymous.propTypes = {
  providerId: PropTypes.string.isRequired,
  join: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  email: PropTypes.string,
};

export default Anonymous;
