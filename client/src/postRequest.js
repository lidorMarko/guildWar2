import React from 'react';
import Request from 'axios-react';
 
const Demo = () => (
  <Request
    config={{
      method: 'get',
      url: 'http://localhost:5000/users',
    }}
  >
    {({ loading, response, error, refetch, networkStatus }) => (
      <div>
          {networkStatus && <span>{networkStatus}</span>}
          {loading && <span>Loading...</span>}
          {error && <span>{error.response.data}</span>}
          {response && <h3>{response.data.title}</h3>}
          <button onClick={refetch}>Refetch!</button>
      </div>
    )}
  </Request>
);

export  {Demo};