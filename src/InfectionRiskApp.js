import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

export default function InfectionRiskApp() {
  const [age, setAge] = useState('');
  const [bmi, setBmi] = useState('');
  const [diabetes, setDiabetes] = useState('No');
  const [risk, setRisk] = useState(null);
  const [explanation, setExplanation] = useState([]);

  const calculateRisk = () => {
    const ageNum = parseInt(age);
    const bmiNum = parseFloat(bmi);
    let riskLevel = 'BAJO';
    const factors = [];

    if (diabetes === 'Sí') factors.push('Diabetes');
    if (bmiNum > 30) factors.push('IMC elevado');
    if (ageNum > 70) factors.push('Edad avanzada');

    if (factors.length >= 2) riskLevel = 'ALTO';
    else if (factors.length === 1) riskLevel = 'MODERADO';

    setRisk(riskLevel);
    setExplanation(factors);
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center">Aplicación clínica interactiva</h1>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div>
            <label>Edad</label>
            <Input value={age} onChange={(e) => setAge(e.target.value)} type="number" />
          </div>
          <div>
            <label>IMC</label>
            <Input value={bmi} onChange={(e) => setBmi(e.target.value)} type="number" />
          </div>
          <div>
            <label>Diabetes</label>
            <Select value={diabetes} onValueChange={setDiabetes}>
              <SelectTrigger>{diabetes}</SelectTrigger>
              <SelectContent>
                <SelectItem value="Sí">Sí</SelectItem>
                <SelectItem value="No">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateRisk} className="w-full">Calcular riesgo de infección</Button>
        </CardContent>
      </Card>

      {risk && (
        <Card>
          <CardContent className="pt-6 space-y-2">
            <p className="text-lg font-semibold">
              Riesgo de infección: <span className={risk === 'ALTO' ? 'text-red-600' : risk === 'MODERADO' ? 'text-yellow-500' : 'text-green-600'}>{risk}</span>
            </p>
            <p className="text-sm font-medium">Factores que contribuyen:</p>
            <ul className="list-disc list-inside">
              {explanation.map((factor, i) => <li key={i}>{factor}</li>)}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
