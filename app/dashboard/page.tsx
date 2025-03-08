"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import './style.css';
import '../globals.css'

import { 
  ResponsiveContainer, 
  LineChart, 
  BarChart, 
  XAxis, 
  YAxis, 
  Line, 
  Bar,
  Tooltip,
  RadialBarChart, 
  RadialBar
} from 'recharts';
import { Cpu, MemoryStick, BatteryCharging, AlertTriangle } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: 'positive' | 'negative' | 'neutral';
}

interface GaugeBoxProps {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  unit?: string; 
}

const EnergyDashboard = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    ram: 68,
    energy: 2.4,
    efficiency: 82
  });

  const historicalData = [
    { time: '00:00', consumption: 2.1, cpu: 38, ram: 62 },
    { time: '04:00', consumption: 1.8, cpu: 42, ram: 58 },
    { time: '08:00', consumption: 2.4, cpu: 51, ram: 71 },
    { time: '12:00', consumption: 3.1, cpu: 68, ram: 82 },
    { time: '16:00', consumption: 2.9, cpu: 73, ram: 79 },
    { time: '20:00', consumption: 2.5, cpu: 57, ram: 65 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, prev.cpu + (Math.random() * 2 - 1)),
        ram: Math.min(100, prev.ram + (Math.random() * 2 - 1)),
        energy: parseFloat((prev.energy + (Math.random() * 0.1 - 0.05)).toFixed(2)),
        efficiency: Math.min(100, prev.efficiency + (Math.random() * 0.5 - 0.25))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Monitorage énergétique - Centre de données
          </h1>
          <div className="flex gap-8">

          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm bg-green-100 px-3 py-1.5 rounded-full">
              <BatteryCharging className="w-4 h-4 text-green-600" />
              <span className="text-green-800">Mode optimisation actif</span>
            </div>
          </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="flex gap-6">
    <MetricCard 
      icon={<Cpu className="w-6 h-6" />}
      title="Utilisation CPU"
      value={`${metrics.cpu.toFixed(1)}%`}
      trend={metrics.cpu > 70 ? 'negative' : 'positive'}
    />
    <MetricCard 
      icon={<MemoryStick className="w-6 h-6" />}
      title="Utilisation RAM"
      value={`${metrics.ram.toFixed(1)}%`}
      trend={metrics.ram > 75 ? 'negative' : 'positive'}
    />
  </div>


  <div className="flex gap-8">
  <MetricCard 
    icon={<BatteryCharging className="w-6 h-6" />}
    title="Consommation énergétique"
    value={`${metrics.energy} kWh`}
    trend={metrics.energy > 3 ? 'negative' : 'positive'}
  />
  <MetricCard 
    icon={<div className="w-6 h-6">%</div>}
    title="Efficacité énergétique"
    value={`${metrics.efficiency.toFixed(1)}%`}
    trend={metrics.efficiency > 80 ? 'positive' : 'neutral'}
  />




</div>
</div>





<div className="grid grid-cols-2 gap-8">
<div className="flex flex-wrap gap-8">
  <div className="w-full sm:w-1/2 space-y-6">
    {/* Charge CPU */}
    <GaugeBox 
      title="Charge CPU"
      value={metrics.cpu}
      color="#10b981"
      icon={<Cpu className="w-5 h-5" />}
    />
    
    {/* Consommation énergétique */}
    <GaugeBox 
      title="Consommation énergétique"
      value={metrics.energy} // Utilise la variable `energy`
      unit="kWh"
      color="#f59e0b" // Couleur pour la consommation énergétique
      icon={<MemoryStick className="w-5 h-5" />}
    />
  </div>

  <div className="w-full sm:w-1/2 space-y-6">
    {/* Utilisation RAM */}
    <GaugeBox 
      title="Utilisation RAM"
      value={metrics.ram}
      color="#3b82f6"
      icon={<MemoryStick className="w-5 h-5" />}
    />
    
    {/* Efficacité énergétique */}
    <GaugeBox 
      title="Efficacité énergétique"
      value={metrics.efficiency} // Utilise la variable `efficiency`
      unit="%"
      color="#4caf50" // Couleur pour l'efficacité
      icon={<MemoryStick className="w-5 h-5" />}
    />
  </div>
</div>



</div>
</div>

<div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
    <h2 className="text-lg font-semibold mb-4">Tendance de consommation horaire</h2>
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={historicalData}>
          <XAxis dataKey="time" />
          <YAxis unit="kWh" />
          <Tooltip />
          <Line 
            type="monotone"
            dataKey="consumption" 
            stroke="#3b82f6" 
            strokeWidth={2}
          />
          <Line 
            type="monotone" 
            dataKey="cpu" 
            stroke="#10b981" 
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Répartition énergétique par composant</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[ { name: 'CPU', value: 42 }, { name: 'GPU', value: 28 }, { name: 'Stockage', value: 15 }, { name: 'Réseau', value: 10 }, { name: 'Autres', value: 5 }]}>
                <XAxis dataKey="name" />
                <YAxis unit="%" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>


      </div>
    </div>
  );
};

const MetricCard = ({ icon, title, value, trend }: MetricCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <div className="text-gray-500 flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        <div className="text-2xl font-bold">{value}</div>
      </div>
      {trend === 'positive' && (
        <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm">▼ 12%</span>
      )}
      {trend === 'negative' && (
        <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" /> ▲ 18%
        </span>
      )}
    </div>
  </div>
);


const GaugeBox = ({ title, value, color, icon }: GaugeBoxProps) => (
    
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className="text-gray-500 flex items-center gap-2">
        {icon}
        
        <span>{title}</span>
      </div>
      <span className="text-2xl font-bold" style={{ color }}>{value}%</span>
    </div>
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={[{ value }]}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar 
            dataKey="value"
            cornerRadius={10}
            fill={color}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  </div>
 
);


export default EnergyDashboard;
