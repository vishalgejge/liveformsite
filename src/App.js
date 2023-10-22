import React, { useState } from 'react';
import './App.css';
import Form from './Form';
// import Table from './Table';

function App() {
  const [formData, setFormData] = useState([]);

  const addFormData = (data) => {
    setFormData([...formData, data]);
  };

  return (
    <div className="App">
      <h1>Fill the form</h1>
      <Form onSubmit={addFormData} />
      <h4>Developed and designed by Vishal Gejge</h4>
      {/* <h1>Submitted Data</h1> */}
      {/* <Table data={formData} /> */}
    </div>
  );
}

export default App;
