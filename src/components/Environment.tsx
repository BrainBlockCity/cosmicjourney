import React from 'react';
import { Stars, Environment as DreiEnvironment } from '@react-three/drei';

const Environment: React.FC = () => {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <DreiEnvironment preset="night" />
    </>
  );
};

export default Environment;