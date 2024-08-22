import React, { useRef, useState } from "react";

function EventForm() {
  const titleRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const endTimeRef = useRef(null);
  const noteRef = useRef(null);

  const [error, setError] = useState("");
  const [timeError, setTimeError] = useState("");

  const Validation = () => {
    if (new Date(dateRef.current.value) < new Date()) {
      setError("date must be greater than today");
      return false;
    }
    if (timeRef.current.value > endTimeRef.current.value) {
      setTimeError("end time must be greater than ");
      return false;
    } else {
      return true;
    }
  };

  const eventForm = {
    title: "",
    date: new Date(),
    time: new Date().getTime(),
    endTime: "",
    note: "",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (titleRef.current !== null) eventForm.title = titleRef.current.value;
    if (dateRef.current !== null) eventForm.date = dateRef.current.value;
    if (timeRef.current !== null) eventForm.time = timeRef.current.value;
    if (endTimeRef.current !== null)
      eventForm.endTime = endTimeRef.current.value;
    if (noteRef.current !== null) eventForm.note = noteRef.current.value;

    if (Validation()) {
      console.log(eventForm);
      setError("");
      setTimeError("");
    }
  };

  return (
    <div className="h-screen w-screen  flex items-center justify-center bg-slate-600">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col">
          <label htmlFor="event-title" className="form-label">
            Title
          </label>
          <input
            ref={titleRef}
            type="text"
            className="event-title form-control"
            id="event-title"
            placeholder="Title of the event"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="event-date" className="form-label">
            Date
          </label>
          <input
            ref={dateRef}
            type="Date"
            className="event-date form-control"
            id="event-date"
          />
          {error ? <p>{error}</p> : ""}
        </div>

        <div className="flex flex-col">
          <label htmlFor="event-time" className="form-label">
            Starts at
          </label>
          <input
            ref={timeRef}
            type="time"
            className="event-time form-control"
            id="event-time"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="end-time" className="form-label">
            Ends at
          </label>
          <input
            ref={endTimeRef}
            type="time"
            className="event-time form-control"
            id="end-time"
          />
          {timeError ? <p>{timeError}</p> : ""}
        </div>

        <div className="flex flex-col">
          <label htmlFor="event-note" className="form-label">
            Note
          </label>
          <input
            ref={noteRef}
            type="text"
            className="event-note form-control"
            id="event-note"
            placeholder="Add notes of the event, location or links to the meeting"
          />
        </div>
        <button className="p-3 bg-indigo-600 rounded-md" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EventForm;
