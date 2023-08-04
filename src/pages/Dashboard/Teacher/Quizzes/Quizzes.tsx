import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

type Props = {};

const Quizzes = (props: Props) => {
  // Add state for original quizzes
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Quiz 1",
      batch: "Batch A",
      questions: [
        {
          id: 1,
          question: "Question 1",
          options: ["Option A", "Option B", "Option C"],
        },
        {
          id: 2,
          question: "Question 2",
          options: ["Option A", "Option B", "Option C"],
        },
      ],
    },
    {
      id: 2,
      title: "Quiz 2",
      batch: "Batch B",
      questions: [
        {
          id: 3,
          question: "Question 1",
          options: ["Option A", "Option B", "Option C"],
        },
        {
          id: 4,
          question: "Question 2",
          options: ["Option A", "Option B", "Option C"],
        },
      ],
    },
    {
      id: 3,
      title: "Quiz 3",
      batch: "Batch C",
      questions: [
        {
          id: 5,
          question: "Question 1",
          options: ["Option A", "Option B", "Option C"],
        },
        {
          id: 6,
          question: "Question 2",
          options: ["Option A", "Option B", "Option C"],
        },
      ],
    },
    // Add more quiz data as needed
  ]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [originalQuizzes, setOriginalQuizzes] = useState([...quizzes]);
  const onSubmit = (data: any) => {
    console.log(data);
    // Create a new quiz object with the data and add it to the quizzes state
    const newQuiz = {
      id: quizzes.length + 1,
      title: data.quizTitle,
      batch: data.batch,
      questions: [], // Add an empty array for questions (to be filled later)
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  const handleQuizClick = (quiz: any) => {
    setSelectedQuiz(quiz);
  };

  const closeModal = () => {
    setSelectedQuiz(null);
  };
  // Add state for selected batch

  // ... (previous code)

  const filterByBatch = (batch: any) => {
    setSelectedBatch(batch);

    // Apply filter on the original quizzes and set the filtered quizzes in the state
    if (batch === null) {
      setQuizzes(originalQuizzes);
    } else {
      const filteredQuizzes = originalQuizzes.filter(
        (quiz) => quiz.batch === batch
      );
      setQuizzes(filteredQuizzes);
    }
  };
  useEffect(() => {
    setOriginalQuizzes(quizzes); // Update originalQuizzes whenever quizzes change
  }, [quizzes]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields as before */}
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quizzes</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              selectedBatch === null ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            onClick={() => filterByBatch(null)}
          >
            All
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              selectedBatch === "Batch A" ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            onClick={() => filterByBatch("Batch A")}
          >
            Batch A
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              selectedBatch === "Batch B" ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            onClick={() => filterByBatch("Batch B")}
          >
            Batch B
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              selectedBatch === "Batch C" ? "bg-blue-600" : "hover:bg-blue-600"
            }`}
            onClick={() => filterByBatch("Batch C")}
          >
            Batch C
          </button>
        </div>
        {/* Quizzes grid as before */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-slate-100 p-4 hover:bg-slate-300 shadow rounded-lg hover:shadow-lg transition duration-300"
              onClick={() => handleQuizClick(quiz)}
              style={{ cursor: "pointer" }}
            >
              <h2 className="text-lg font-semibold mb-2">{quiz.title}</h2>
              <p>Batch: {quiz.batch}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for displaying quiz questions */}
      {selectedQuiz && (
        <div className="fixed  inset-0 z-50 flex items-center justify-center">
          <div className="bg-black opacity-50 fixed inset-0"></div>
          <div className="bg-white p-4 rounded-lg z-10">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedQuiz?.title}
            </h2>
            <p>Batch: {selectedQuiz.batch}</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Questions:</h3>
            {selectedQuiz.questions.map((question) => (
              <div key={question.id} className="mb-4">
                <p className="font-semibold">{question.question}</p>
                <ul>
                  {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
