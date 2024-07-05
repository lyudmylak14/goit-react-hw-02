import { useEffect, useState } from 'react';
import Description from './Description/Description';
import Options from './Options/Options'
import Feedback from "./Feedback/Feedback"
import Notification from './Notification/Notification';
import css from './App.module.css'


export default function App() {
  const [responseCategorie, setResponseCategorie] = useState(() => {
    const savedResponses = localStorage.getItem('responses');
    return savedResponses ? JSON.parse(savedResponses) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem('responses', JSON.stringify(responseCategorie));
  }, [responseCategorie]);

  const updateFeedback = (feedbackType) => {
    setResponseCategorie((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setResponseCategorie({ good: 0, neutral: 0, bad: 0 });
  };

  const totalFeedback = responseCategorie.good + responseCategorie.neutral + responseCategorie.bad;
  const positiveFeedback = totalFeedback ? Math.round((responseCategorie.good / totalFeedback) * 100) : 0;

  return (
    <div className={css.container}>
      <Description />
      <Options 
      updateFeedback={updateFeedback} 
      resetFeedback={resetFeedback} 
      totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback 
          good={responseCategorie.good}
          neutral={responseCategorie.neutral}
          bad={responseCategorie.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}