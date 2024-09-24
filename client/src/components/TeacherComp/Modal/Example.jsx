import React, { useState, useRef } from "react";

const CreateExam = () => {
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([
    {
      id: 1,
      type: "multiple-choice",
    },
  ]);

  // Create refs for the input fields
  const questionTextRef = useRef([]);
  const optionARef = useRef([]);
  const optionBRef = useRef([]);
  const optionCRef = useRef([]);
  const optionDRef = useRef([]);
  const answerRef = useRef([]);
  console.log(questionTextRef)

  const addMultipleChoiceQuestion = () => {
    setQuestionCount(questionCount + 1);
    setQuestions([
      ...questions,
      {
        id: questionCount + 1,
        type: "multiple-choice",
      },
    ]);
  };

  const addShortAnswerQuestion = () => {
    setQuestionCount(questionCount + 1);
    setQuestions([
      ...questions,
      {
        id: questionCount + 1,
        type: "short-answer",
      },
    ]);
  };

  // Example function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    questions.forEach((question, index) => {
      if (question.type === "multiple-choice") {
        console.log("Question:", questionTextRef.current[index]?.value);
        console.log("Option A:", optionARef.current[index]?.value);
        console.log("Option B:", optionBRef.current[index]?.value);
        console.log("Option C:", optionCRef.current[index]?.value);
        console.log("Option D:", optionDRef.current[index]?.value);
        console.log("Answer:", answerRef.current[index]?.value);
      }
    });
  };

  return (
    <div style={{marginTop: "10rem", marginBottom: "2rem"}}>
      
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="list-group">
              <a href="#" className="list-group-item list-group-item-action">
                Dashboard
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Manage Subjects
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action active"
              >
                Create Exam
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Scores
              </a>
              <a href="#" className="list-group-item list-group-item-action">
                Messages
              </a>
            </div>
          </div>
          <div className="col-md-9">
            <h3>Create Exam</h3>
            <form id="create-exam-form" onSubmit={handleSubmit}>
              <div id="questions-container">
                {questions.map((question, index) =>
                  question.type === "multiple-choice" ? (
                    <div className="card mt-3" key={question.id}>
                      <div className="card-header">
                        <h5>Question {index + 1} (Multiple Choice)</h5>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label>Question Text</label>
                          <input
                            type="text"
                            ref={(el) => (questionTextRef.current[index] = el)}
                            className="form-control"
                            placeholder="Enter question text"
                          />
                        </div>
                        <div className="form-group">
                          <label>Options</label>
                          <input
                            type="text"
                            ref={(el) => (optionARef.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option A"
                          />
                          <input
                            type="text"
                            ref={(el) => (optionBRef.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option B"
                          />
                          <input
                            type="text"
                            ref={(el) => (optionCRef.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option C"
                          />
                          <input
                            type="text"
                            ref={(el) => (optionDRef.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Option D"
                          />
                        </div>
                        <div className="form-group">
                          <label>Correct Option</label>
                          <input
                            type="text"
                            ref={(el) => (answerRef.current[index] = el)}
                            className="form-control mb-2"
                            placeholder="Answer"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="card mt-3" key={question.id}>
                      <div className="card-header">
                        <h5>Question {index + 1} (Short Answer)</h5>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label>Question Text</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter question text"
                          />
                        </div>
                        <div className="form-group">
                          <label>Answer</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Enter answer"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={addMultipleChoiceQuestion}
              >
                Add Multiple Choice Question
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-3"
                onClick={addShortAnswerQuestion}
              >
                Add Short Answer Question
              </button>
              <button type="submit" className="btn btn-success btn-block mt-4">
                Create Exam
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExam;
