import { useState, useEffect } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            <div>
              <p>{question.prompt}</p>
              <p>Answers: {question.answers.join(", ")}</p>
              <p>Correct Index: {question.correctIndex}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

