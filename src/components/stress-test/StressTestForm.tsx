
'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Activity, Smile, Meh, Frown } from 'lucide-react';

interface StressQuestion {
  id: string;
  text: string;
  category: 'physical' | 'emotional' | 'cognitive';
}

const allQuestions: StressQuestion[] = [
  // Síntomas físicos
  { id: 'q1', text: 'He tenido dolores de cabeza frecuentes.', category: 'physical' },
  { id: 'q2', text: 'Siento tensión muscular (cuello, espalda, mandíbula).', category: 'physical' },
  { id: 'q3', text: 'Tengo dificultades para dormir o me despierto con frecuencia.', category: 'physical' },
  { id: 'q4', text: 'He notado cambios en mi apetito (más hambre o falta de apetito).', category: 'physical' },
  { id: 'q5', text: 'Me siento más cansado/a de lo normal, incluso sin hacer mucho esfuerzo.', category: 'physical' },
  { id: 'q6', text: 'Mi ritmo cardíaco se acelera sin razón aparente.', category: 'physical' },
  { id: 'q17', text: 'He experimentado problemas digestivos (malestar estomacal, estreñimiento, diarrea).', category: 'physical' },
  { id: 'q18', text: 'He notado una disminución en mi deseo sexual.', category: 'physical' },
  // Síntomas emocionales
  { id: 'q7', text: 'Me siento irritable, impaciente o de mal humor fácilmente.', category: 'emotional' },
  { id: 'q8', text: 'Me cuesta relajarme, incluso cuando tengo tiempo libre.', category: 'emotional' },
  { id: 'q9', text: 'Me siento ansioso/a o nervioso/a con frecuencia.', category: 'emotional' },
  { id: 'q10', text: 'Me siento abrumado/a por tareas simples o cotidianas.', category: 'emotional' },
  { id: 'q11', text: 'He perdido interés en actividades que antes disfrutaba.', category: 'emotional' },
  { id: 'q19', text: 'Me siento desesperanzado/a sobre el futuro.', category: 'emotional' },
  { id: 'q20', text: 'Siento ganas de llorar sin razón aparente o con más frecuencia.', category: 'emotional' },
  // Síntomas conductuales o cognitivos
  { id: 'q12', text: 'Me cuesta concentrarme o tomar decisiones.', category: 'cognitive' },
  { id: 'q13', text: 'Estoy procrastinando más de lo normal.', category: 'cognitive' },
  { id: 'q14', text: 'Estoy comiendo en exceso o muy poco.', category: 'cognitive' },
  { id: 'q15', text: 'He aumentado el consumo de cafeína, alcohol o cigarrillos.', category: 'cognitive' },
  { id: 'q16', text: 'Estoy evitando situaciones sociales o personas.', category: 'cognitive' },
  { id: 'q21', text: 'He tenido dificultad para recordar cosas o me siento olvidadizo/a.', category: 'cognitive' },
  { id: 'q22', text: 'Me he vuelto más descuidado/a con mis responsabilidades personales o laborales.', category: 'cognitive' },
  { id: 'q23', text: 'Tengo pensamientos recurrentes o preocupantes que no puedo quitarme de la cabeza.', category: 'cognitive' },
];

const questionCategories: { title: string, key: StressQuestion['category'], icon: React.ElementType }[] = [
    { title: 'Síntomas Físicos', key: 'physical', icon: Activity },
    { title: 'Síntomas Emocionales', key: 'emotional', icon: Meh },
    { title: 'Síntomas Conductuales o Cognitivos', key: 'cognitive', icon: Frown }
];


interface Answers {
  [key: string]: boolean;
}

export default function StressTestForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [affirmativeCount, setAffirmativeCount] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCheckboxChange = (questionId: string, checked: boolean) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: checked,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    let count = 0;
    allQuestions.forEach(q => {
      if (answers[q.id] === true) {
        count++;
      }
    });

    setAffirmativeCount(count);
    setShowResults(true);
  };

  const getStressLevelInfo = (count: number | null) => {
    if (count === null) return { level: '', advice: '', icon: Activity, color: '' };
    if (count <= 7) { // Adjusted threshold for 23 questions
      return { 
        level: 'Nivel bajo de estrés o manejable.', 
        advice: '¡Excelente! Parece que estás manejando bien el estrés. Continúa con tus hábitos saludables y estrategias de afrontamiento.', 
        icon: Smile, 
        color: 'text-green-500' 
      };
    } else if (count <= 15) { // Adjusted threshold for 23 questions
      return { 
        level: 'Estrés moderado.', 
        advice: 'Podrías estar experimentando un nivel moderado de estrés. Sería útil implementar o reforzar técnicas de manejo del estrés como ejercicios de respiración, actividad física regular, asegurar un buen descanso y hablar con alguien de confianza sobre cómo te sientes.', 
        icon: Meh, 
        color: 'text-yellow-500' 
      };
    } else { // count >= 16
      return { 
        level: 'Posible estrés elevado.', 
        advice: 'Tus respuestas sugieren un posible nivel elevado de estrés. Es muy recomendable que busques apoyo profesional (psicólogo, terapeuta, médico general) para evaluar tu situación y recibir orientación adecuada. Recuerda que pedir ayuda es un paso valiente.', 
        icon: Frown, 
        color: 'text-red-500' 
      };
    }
  };

  const resetTest = () => {
    setAnswers({});
    setAffirmativeCount(null);
    setShowResults(false);
  };

  if (showResults && affirmativeCount !== null) {
    const { level, advice, icon: Icon, color } = getStressLevelInfo(affirmativeCount);
    return (
      <Card className="text-center p-6 animate-fade-in">
        <CardHeader>
          <div className="flex justify-center items-center mb-4">
            <Icon className={`w-16 h-16 ${color}`} />
          </div>
          <CardTitle className="text-2xl font-bold">Resultados de tu Autoevaluación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-2">Respuestas afirmativas: {affirmativeCount} / {allQuestions.length}</p>
          <p className={`text-xl font-bold mb-4 ${color}`}>{level}</p>
          <p className="text-muted-foreground mb-6 text-base whitespace-pre-line">{advice}</p>
          <Button onClick={resetTest} className="w-full sm:w-auto">Realizar Test de Nuevo</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questionCategories.map(category => (
        <fieldset key={category.key} className="space-y-3 p-4 border rounded-lg shadow-sm bg-card animate-slide-in-up">
          <legend className="text-xl font-semibold mb-3 text-primary flex items-center">
            <category.icon className="mr-2 h-6 w-6" />
            {category.title}
          </legend>
          {allQuestions.filter(q => q.category === category.key).map((question, index) => (
            <div key={question.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted transition-colors">
              <Checkbox
                id={question.id}
                checked={answers[question.id] || false}
                onCheckedChange={(checked) => handleCheckboxChange(question.id, Boolean(checked))}
                className="mt-1"
                aria-labelledby={`${question.id}-label`}
              />
              <Label htmlFor={question.id} id={`${question.id}-label`} className="text-base cursor-pointer flex-grow leading-snug">
                {question.text}
              </Label>
            </div>
          ))}
        </fieldset>
      ))}
      <Button type="submit" className="w-full text-lg py-3 mt-6 shadow-md hover:shadow-lg transition-shadow" size="lg">
        Ver Mis Resultados
      </Button>
    </form>
  );
}

