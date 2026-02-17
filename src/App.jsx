

import { useEffect,useState } from 'react'
import JobsList from './components/JobsList';
import { getCandidateByemail, getJobs } from './api/api';

function App() {
  const [datosPostulacion, SetDatosPostulacion] = useState({});
  const [jobs, SetJobs] = useState([]);

  useEffect(() => {
    
    getCandidateByemail()
    .then(response => {
   
        return response.json()
      })
      .then(data => {
        console.log(data);
        SetDatosPostulacion(data)
      })
      .catch((err) => { console.log(err); })

    getJobs()
      .then((response) => {
       
        return response.json();
      })
      .then((data) => {
        console.log(data);

        SetJobs(data);
      })
      .catch((err) => {
        console.log(err);
      })
     

  }, [])

  return (
    <div className="min-h-full">
      <div>
        <JobsList
          jobs={jobs}
          datosPostulacion={datosPostulacion}
        
        />
      </div>
    </div>
  );
}

export default App
