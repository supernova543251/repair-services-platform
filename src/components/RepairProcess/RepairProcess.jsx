import React from 'react';
import './RepairProcess.css';
import { repairSteps } from '../../data';

const RepairProcess = () => {
  return (
    <section className="fixflash-steps">
      <h2 className="section-title">How Fix Flash Works</h2>
      <div className="steps-grid">
        {repairSteps.map((step) => {
          const Icon = step.icon;
          return (
            <div className="step-card" key={step.number}>
              <div className="step-icon" style={{ backgroundColor: step.color }}>
                <Icon />
              </div>
              <div className="step-info">
                <h3>{step.number}. {step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RepairProcess;