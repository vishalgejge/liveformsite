import React, { useState, useEffect } from 'react';
import axios from 'axios';
import emailjs from 'emailjs-com';
import './css/style.css';

const Form = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [countryPhoneCode, setCountryPhoneCode] = useState(''); // Define the state variable here

  useEffect(() => {
    // Request for Authorization Token
    axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        'Accept': 'application/json',
        'api-token': 'gF3SakZMa6Xp4NA69GCj7WFcvxxEpF2InBe6nFFI1j9fw693cMlPCC8u4PXs801Rfng',
        'user-email': 'vishalgejge04@gmail.com'
      }
    })
    .then(response => {
      setAuthToken(response.data.auth_token);
      // Fetch countries after getting the auth token
      fetchCountries(response.data.auth_token);
    })
    .catch(error => {
      console.error(error);
    });
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const fetchCountries = (token) => {
    // Fetch countries
    axios.get('https://www.universal-tutorial.com/api/countries/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      setCountries(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    setSelectedCountry(selectedCountryCode);
    const selectedCountryObject = countries.find(country => country.country_code === selectedCountryCode);
    if (selectedCountryObject) {
      setCountryPhoneCode(`+${selectedCountryObject.country_phone_code}`);
    }
    // Fetch states based on selected country code
    axios.get(`https://www.universal-tutorial.com/api/states/${selectedCountryCode}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    })
    .then(response => {
      setStates(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Prepare the email template parameters
    const templateParams = {
      name: name,
      subject: subject,
      country: selectedCountry,
      state: selectedState,
      phoneNumber: phoneNumber,
    };
  
    // Send the email using Email.js service
    emailjs.send('service_kj0065b', 'template_66xa24w', templateParams, 'WPMNzoOLoH7OXeXnZ')
      .then((response) => {
        console.log('Email sent successfully:', response);
  
        // Reset form fields
        setName('');
        setSubject('');
        setSelectedCountry('');
        setSelectedState('');
        setPhoneNumber('');
  
        // Show success message to the user
        alert('Email sent successfully!');
  
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Show error message to the user if sending email fails
        alert('Failed to submit the form. Please try again later.');
      });
  };

  return (
    <div className="this-div">
      <form onSubmit={handleSubmit}>
        <input type="text"  placeholder="Name"  value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <input type="text"  placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <br />
        <br />
        <select value={selectedCountry} onChange={handleCountryChange} required>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country.country_code} value={country.country_code}>
              {country.country_name}
            </option>
          ))}
        </select>
        <br />
        <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)} required>
          <option value="">Select State</option>
          {states.map(state => (
            <option key={state.state_name} value={state.state_name}>
              {state.state_name}
            </option>
          ))}
        </select>
        <br />
        <input type="text" value={countryPhoneCode + phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
