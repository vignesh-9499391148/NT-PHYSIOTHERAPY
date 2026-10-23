import React from 'react';
import { Award, UserCheck, Target, Network, Smile, HeartPulse, Zap, Clock } from 'lucide-react';

const iconMap = {
  Award,
  UserCheck,
  Target,
  Network,
  Smile,
  HeartPulse,
  Zap,
  Clock
};

export default function FeatureCard({ feature }) {
  const IconComponent = iconMap[feature.icon] || HeartPulse;

  return (
    <div className="feature-card">
      <div className="feature-icon-box">
        <IconComponent size={32} />
      </div>
      <h4>{feature.title}</h4>
      <p>{feature.description}</p>
    </div>
  );
}
