import React from "react";
import { Metrics } from './metrics'
import { prepareScene } from '../gyroscope';

export const Gyroscope = () => {
  prepareScene();
  return (
    <div className="gyroscope">
        <div className="gyroscope__scene"></div>
        <Metrics />
    </div>
  );
};