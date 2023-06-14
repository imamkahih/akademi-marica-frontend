import React, { useState } from "react";

export default function CourseCurriculum({ topics }) {
  const [collapsedStates, setCollapsedStates] = useState(() => {
    const initialState = {};
    topics.forEach((topic) => {
      initialState[topic.id] = true;
    });
    return initialState;
  });

  const toggleCollapse = (topicId) => {
    setCollapsedStates((prevCollapsedStates) => ({
      ...prevCollapsedStates,
      [topicId]: !prevCollapsedStates[topicId],
    }));
  };

  return (
    <>
      {topics.map((topic) => (
        <div
          id={`accordion-flush-${topic.id}`}
          data-accordion="collapse"
          data-active-classes="bg-white text-gray-900"
          data-inactive-classes="text-gray-500"
          className=" mb-1 px-3"
          key={topic.id}
        >
          <h2>
            <button
              type="button"
              className="flex items-center justify-between w-full py-1 font-medium text-left text-gray-800 border-b border-gray-200"
              data-accordion-target={`#accordion-flush-body-${topic.id}`}
              aria-expanded={!collapsedStates[topic.id]}
              aria-controls={`accordion-flush-body-${topic.id}`}
              onClick={() => toggleCollapse(topic.id)}
            >
              <span>{topic.title}</span>
              {topic.lessons.length > 0 && (
                <svg
                  data-accordion-icon
                  className="w-6 h-6 rotate-180 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </h2>
          {!collapsedStates[topic.id] && topic.lessons.length > 0 && (
            <div
              id={`accordion-flush-body-${topic.id}`}
              aria-labelledby={`accordion-flush-${topic.id}`}
            >
              {topic.lessons.map((lesson) => (
                <div
                  className="py-1 px-1 border-b border-gray-200 "
                  key={lesson.id}
                >
                  <p className=" text-gray-500">{lesson.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
