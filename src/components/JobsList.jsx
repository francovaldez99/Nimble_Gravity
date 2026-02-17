import React from "react";
import JobItem from "./JobItem";

export default function JobsList({ jobs , datosPostulacion }) {

  
    if (jobs.length > 0) {
    return (
      <div className="flex flex-col items-center justify-center mx-2 my-2">
        {jobs.map((jobitem, index) => (
          <JobItem
            id={jobitem.id}
            title={jobitem.title}
            index={index}
            key={jobitem.id}
            datosPostulacion={datosPostulacion}
          />
        ))}
      </div>
    );
    } else  {
      return (
        <div className="fixed inset-0 h-full w-full flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-400 border-t-transparent  "></div>
        </div>
      );
    }
  
}
