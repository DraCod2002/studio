'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Activity } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: { label: string; value: number }[];
}

const questions: Question[] = [
  {
    id: 'q1',
    text: '¿Con qué frecuencia te has sentido abrumado/a en la última semana?',
    options: [
      { label: 'Nunca', value: 0 },
      { label: 'Raramente', value: 1 },
      { label: 'A veces', value: 2 },
      { label: 'A menudo', value: 3 },
      { label: 'Muy a menudo', value: 4 },
    ],
  },
  {
    id: 'q2',
    text: '¿Con qué frecuencia has tenido problemas para relajarte en la última semana?',
    options: [
      { label: 'Nunca', value: 0 },
      { label: 'Raramente', value: 1 },
      { label: 'A veces', value: 2 },
      { label: 'A menudo', value: 3 },
      { label: 'Muy a menudo', value: 4 },
    ],
  },
  {
    id: 'q3',
    text: '¿Con qué frecuencia te has sentido irritable o te has enfadado fácilmente en la última semana?',
    options: [
      { label: 'Nunca', value: 0 },
      { label: 'Raramente', value: 1 },
      { label: 'A veces', value: 2 },
      { label: 'A menudo', value: 3 },
      { label: 'Muy a menudo', value: 4 },
    ],
  },
    {
    id: 'q4',
    text: '¿Con qué frecuencia te ha costado concentrarte en la última semana?',
    options: [
      { label: 'Nunca', value: 0 },
      { label: 'Raramente', value: 1 },
      { label: 'A veces', value: 2 },
      { label: 'A menudo', value: 3 },
      { label: 'Muy a menudo', value: 4 },
    ],
  },
  {
    id: 'q5',
    text: '¿Con qué frecuencia te has sentido preocupado/a o ansioso/a en la última semana?',
    options: [
      { label: 'Nunca', value: 0 },
      { label: 'Raramente', value: 1 },
      { label: 'A veces', value: 2 },
      { label: 'A menudo', value: 3 },
      { label: 'Muy a menudo', value: 4 },
    ],
  },
];

interface Answers {
  [key: string]: string; 
}

export default function StressTestForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.keys(answers).length !== questions.length) {
      alert('Por favor, responde todas las preguntas.'); 
      return;
    }
    
    let currentScore = 0;
    for (const questionId in answers) {
      currentScore += parseInt(answers[questionId], 10);
    }
    setScore(currentScore);
    setShowResults(true);
  };

  const getStressLevel = (currentScore: number | null) => {
    if (currentScore === null) return { level: '', advice: '', icon: Activity, color: '' };
    if (currentScore <= 6) {
      return { level: 'Estrés Bajo', advice: 'Pareces estar manejando bien el estrés. ¡Sigue así con hábitos saludables!', icon: CheckCircle, color: 'text-green-500' };
    } else if (currentScore <= 12) {
      return { level: 'Estrés Moderado', advice: 'Podrías estar experimentando algo de estrés. Considera explorar técnicas de relajación y prácticas de autocuidado.', icon: Activity, color: 'text-yellow-500' };
    } else {
      return { level: 'Estrés Alto', advice: 'Tus niveles de estrés parecen ser altos. Podría ser beneficioso buscar apoyo, practicar técnicas de reducción de estrés consistentemente y considerar hablar con un profesional si es necesario.', icon: AlertTriangle, color: 'text-red-500' };
    }
  };

  const resetTest = () => {
    setAnswers({});
    setScore(null);
    setShowResults(false);
  };

  if (showResults && score !== null) {
    const { level, advice, icon: Icon, color } = getStressLevel(score);
    return (
      <Card className="text-center p-6 animate-fade-in">
        <CardHeader>
          <div className="flex justify-center items-center mb-4">
            <Icon className={`w-16 h-16 ${color}`} />
          </div>
          <CardTitle className="text-2xl font-bold">Resultado de tu Evaluación de Estrés</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-2">Puntuación: {score} / {questions.length * 4}</p>
          <p className={`text-2xl font-bold mb-4 ${color}`}>{level}</p>
          <p className="text-muted-foreground mb-6 text-base">{advice}</p>
          <Button onClick={resetTest} className="w-full sm:w-auto">Realizar Test de Nuevo</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((question, index) => (
        <fieldset key={question.id} className="space-y-3 p-4 border rounded-lg shadow-sm bg-card animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <legend className="text-lg font-medium mb-2 text-primary-foreground bg-primary px-3 py-1 rounded-md">{`Pregunta ${index + 1}: ${question.text}`}</legend>
          <RadioGroup
            onValueChange={(value) => handleInputChange(question.id, value)}
            value={answers[question.id]}
            aria-label={question.text}
            className="space-y-2"
          >
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors">
                <RadioGroupItem value={option.value.toString()} id={`${question.id}-${option.value}`} />
                <Label htmlFor={`${question.id}-${option.value}`} className="text-base cursor-pointer flex-grow">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
      ))}
      <Button type="submit" className="w-full text-lg py-3 mt-6 shadow-md hover:shadow-lg transition-shadow" size="lg">
        Obtener Mis Resultados
      </Button>
    </form>
  );
}
