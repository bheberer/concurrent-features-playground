import React, { useMemo, useState, useTransition } from 'react';
import {
  VictoryChart,
  VictoryScatter,
  VictoryContainer,
  VictoryTheme,
  VictoryBar,
  VictoryStack,
  VictoryArea,
} from 'victory';

import './App.css';

function App() {
  const [value, setValue] = useState('');

  return (
    <div className="App">
      <section>
        <label for="user-input" style={{ color: 'white', marginLeft: 48, display: 'block' }}>
          <h1>Very fun concurrency demo</h1>
          <input
            id="user-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: 400, height: 40, fontSize: 16 }}
            placeholder="longer input -> more dom nodes -> slow :("
          />
        </label>

        <div style={{ position: 'relative' }}>
          <Charts query={value} />
        </div>
      </section>
    </div>
  );
}

export default App;

const Charts = React.memo(({ query }) => {
  const data = query.split('').reduce((acc) => {
    const points = [];

    for (let i = 0; i < 25; i++) {
      points.push({
        x: Math.random() * 20,
        y: Math.random() * 200,
        fill: i % 3 === 0 ? '#E6497A' : i % 2 === 0 ? '#3EB0E6' : '#E6D765',
      });
    }

    return [...acc, ...points];
  }, []);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <VictoryChart
          theme={VictoryTheme.material}
          height={400}
          width={400}
          domain={{ x: [0, 20], y: [0, 200] }}
          containerComponent={<VictoryContainer responsive={false} />}
        >
          <VictoryScatter
            size={5}
            data={data}
            style={{
              data: {
                fill: ({ datum }) => {
                  return datum.fill;
                },
              },
            }}
          />
        </VictoryChart>
        <VictoryChart
          theme={VictoryTheme.material}
          height={400}
          width={400}
          domain={{ x: [0, 20], y: [0, 200] }}
          containerComponent={<VictoryContainer responsive={false} />}
        >
          <VictoryBar
            size={5}
            data={data}
            style={{
              data: {
                fill: ({ datum }) => {
                  return datum.fill;
                },
              },
            }}
          />
        </VictoryChart>
      </div>
      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        width={800}
        domain={{ x: [0, 20], y: [0, 200] }}
        containerComponent={<VictoryContainer responsive={false} />}
      >
        <VictoryStack>
          <VictoryArea
            data={data}
            style={{
              data: {
                fill: '#E6497A',
              },
            }}
          />
          <VictoryArea
            data={data}
            style={{
              data: {
                fill: '#3EB0E6',
              },
            }}
          />
          <VictoryArea
            data={data}
            style={{
              data: {
                fill: '#E6D765',
              },
            }}
          />
        </VictoryStack>
      </VictoryChart>
    </>
  );
});

function Spinner({ isStale }) {
  return (
    <div class={`lds-spinner ${isStale ? 'lds-spinner-visible' : ''}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
