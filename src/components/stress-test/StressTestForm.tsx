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
    text: 'How often have you felt overwhelmed in the past week?',
    options: [
      { label: 'Never', value: 0 },
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Often', value: 3 },
      { label: 'Very Often', value: 4 },
    ],
  },
  {
    id: 'q2',
    text: 'How often have you had trouble relaxing in the past week?',
    options: [
      { label: 'Never', value: 0 },
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Often', value: 3 },
      { label: 'Very Often', value: 4 },
    ],
  },
  {
    id: 'q3',
    text: 'How often have you felt irritable or easily annoyed in the past week?',
    options: [
      { label: 'Never', value: 0 },
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Often', value: 3 },
      { label: 'Very Often', value: 4 },
    ],
  },
    {
    id: 'q4',
    text: 'How often have you found it hard to concentrate in the past week?',
    options: [
      { label: 'Never', value: 0 },
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Often', value: 3 },
      { label: 'Very Often', value: 4 },
    ],
  },
  {
    id: 'q5',
    text: 'How often have you felt worried or anxious in the past week?',
    options: [
      { label: 'Never', value: 0 },
      { label: 'Rarely', value: 1 },
      { label: 'Sometimes', value: 2 },
      { label: 'Often', value: 3 },
      { label: 'Very Often', value: 4 },
    ],
  },
];

interface Answers {
  [key: string]: string; // Store option value as string
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
      alert('Please answer all questions.'); // Replace with a proper toast or inline message
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
    if (currentScore === null) return { level: '', advice: '', icon: Activity };
    if (currentScore <= 6) {
      return { level: 'Low Stress', advice: 'You seem to be managing stress well. Keep up the good work with healthy habits!', icon: CheckCircle, color: 'text-green-500' };
    } else if (currentScore <= 12) {
      return { level: 'Moderate Stress', advice: 'You might be experiencing some stress. Consider exploring relaxation techniques and self-care practices.', icon: Activity, color: 'text-yellow-500' };
    } else {
      return { level: 'High Stress', advice: 'Your stress levels appear to be high. It might be beneficial to seek support, practice stress-reduction techniques consistently, and consider talking to a professional if needed.', icon: AlertTriangle, color: 'text-red-500' };
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
          <CardTitle className="text-2xl font-bold">Your Stress Assessment Result</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold mb-2">Score: {score} / {questions.length * 4}</p>
          <p className={`text-2xl font-bold mb-4 ${color}`}>{level}</p>
          <p className="text-muted-foreground mb-6 text-base">{advice}</p>
          <Button onClick={resetTest} className="w-full sm:w-auto">Take Test Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {questions.map((question, index) => (
        <fieldset key={question.id} className="space-y-3 p-4 border rounded-lg shadow-sm bg-card animate-slide-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <legend className="text-lg font-medium mb-2 text-primary-foreground bg-primary px-3 py-1 rounded-md">{`Question ${index + 1}: ${question.text}`}</legend>
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
        Get My Results
      </Button>
    </form>
  );
}
