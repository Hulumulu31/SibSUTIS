import React from 'react';
import DataSet from '/src/components/DataSet';  // Абсолютный путь для теста

const App = () => {
  const headers = ['Country', 'Prezident', 'Age'];
  const data = [
    { Country: 'Russia', Prezident: 'V.V. Putin', Age: 72 },
    { Country: 'USA', Prezident: 'Donald Trump', Age: 78 },
    { Country: 'China', Prezident: '习近平', Age: 71 },
  ];

  return (
    <div>
      <h1>Data Set</h1>
      <DataSet 
        headers={headers} 
        data={data} 
        renderHeader={(header) => <strong>{header}</strong>} 
        renderRow={(value) => <em>{value}</em>} 
      />
    </div>
  );
};

export default App;
