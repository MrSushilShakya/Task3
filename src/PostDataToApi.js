import React, { useState } from 'react';
import './PostDataToApi.css'; // Import CSS file for styling

const PostDataToApi = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://chimpu.xyz/api/post.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phonenumber: phoneNumber })
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data.msg); // Access only the 'msg' property
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData);
        setResponseData(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError({ error: true, message: 'An error occurred while fetching data' });
      setResponseData(null);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && (
        <div className="error">
          <p>Error: {error.message}</p>
        </div>
      )}
      {responseData && (
        <div className="response">
          <h2>Data received:</h2>
          <p>{responseData}</p> {/* Render only the 'msg' property */}
        </div>
      )}
    </div>
  );
};

export default PostDataToApi;
