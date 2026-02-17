import React, { useState } from "react";
import { applyToJob } from "../api/api";

export default function JobItem({ title, id, datosPostulacion }) {
    const [inputRepo, SetInputRepo] = useState('');
    const [errorForm, SetErrorForm] = useState(false);
    const [loadingForm, SetLoadingForm] = useState(false);
    const [correctFetching, SetCorrectFetching] = useState(false);
    function HandleSubmit(event) {
        event.preventDefault();
        SetLoadingForm(true)
        const { uuid, candidateId } = datosPostulacion;

        if (!uuid || !candidateId || !id) {
            SetErrorForm(true);
            SetLoadingForm(false);
            return
        }
        applyToJob({ uuid, candidateId, jobId: id, repoUrl: inputRepo })
          .then((response) => response.json())
            .then(() => {
                SetInputRepo('');
                SetCorrectFetching(true);

          })
          .catch(() => console.error(SetErrorForm(true)))
        .finally(()=>{SetLoadingForm(false)})
    }
  return (
    <div
      className="py-4 px-2 border border-slate-200 rounded bg-white my-4 min-w-100 flex justify-evenly items-center flex-col "
      id={id}
    >
      <h2>{title}</h2>
      <form onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="url del repo"
          className="border rounded py-4 px-3"
          onChange={(e) => SetInputRepo(e.target.value)}
          value={inputRepo}
        />
        <button
          type="submit"
          className="border rounded bg-blue-500 hover:bg-blue-400  text-white font-bold
                 py-4 px-3 "
        >
          {loadingForm ? "Enviando..." : "Submit"}
        </button>
        {errorForm && (
          <span className="text-red-500 font-bold text-sm block">
            Algo salio mal enviando los datos
          </span>
        )}
        {correctFetching && (
          <span className="text-green-500 font-bold text-sm block">
           Postulacion enviada!
          </span>
        )}
      </form>
    </div>
  );
}
