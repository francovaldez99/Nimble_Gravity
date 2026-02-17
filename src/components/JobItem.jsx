import React, { useState } from "react";
import { applyToJob } from "../api/api";

export default function JobItem({ title, id, datosPostulacion }) {
    const [inputRepo, setInputRepo] = useState('');
    const [errorForm, setErrorForm] = useState(false);
    const [loadingForm, setLoadingForm] = useState(false);
    const [correctFetching, setCorrectFetching] = useState(false);
    function handleSubmit(event) {
        event.preventDefault();
        setLoadingForm(true);
        setErrorForm(false);
        setCorrectFetching(false);
        const { uuid, candidateId, applicationId } = datosPostulacion;

        if (!uuid || !candidateId || !id || !applicationId || !inputRepo) {
          setErrorForm(true);
          setLoadingForm(false);
          return;
        }
        applyToJob({
          uuid,
          candidateId,
          jobId: id,
          repoUrl: inputRepo,
          applicationId,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
          })
          .then(() => {
            setInputRepo("");
            setCorrectFetching(true);
          })
          .catch((error) => {
            console.error("Error al postular:", error);
            setErrorForm(true);
          })
          .finally(() => {
            setLoadingForm(false);
          });
    }
  return (
    <div
      className="py-4 px-2 border border-slate-200 rounded bg-white my-4 min-w-100 flex justify-evenly items-center flex-col "
      id={id}
    >
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="url del repo"
          className="border rounded py-4 px-3"
          onChange={(e) => setInputRepo(e.target.value)}
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
