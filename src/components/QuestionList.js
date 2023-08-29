import React, { useState, useEffect } from "react";

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

  async function deleteQuestion(id) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setQuestions(questions.filter(question => question.id !== id));
        console.log("Question deleted successfully!");
      } else {
        console.error("Failed to delete question");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }

  async function updateCorrectAnswer(id, correctIndex) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ correctIndex: parseInt(correctIndex) })
      });

      if (response.ok) {
        setQuestions(prevQuestions =>
          prevQuestions.map(question =>
            question.id === id ? { ...question, correctIndex: parseInt(correctIndex) } : question
          )
        );
        console.log("Correct answer updated successfully!");
      } else {
        console.error("Failed to update correct answer");
      }
    } catch (error) {
      console.error("Error updating correct answer:", error);
    }
  }

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
              <select
                value={question.correctIndex}
                onChange={(event) => updateCorrectAnswer(question.id, event.target.value)}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
              <button onClick={() => deleteQuestion(question.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;


