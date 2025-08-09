import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import workflowJson from '../../animations/marketing-workflow.json'; // hoặc animation bạn chọn

export default function HeroAnimation() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Player autoplay loop src={workflowJson} style={{ height: 400, width: 400 }} />
    </div>
  );
}