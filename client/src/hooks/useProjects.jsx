import { useState, useEffect } from 'react'
import projectService from 'services/project-service'

function useProjects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    projectService
      .get()
      .then(({ data }) => setProjects(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { projects, loading, errors, setProjects }
}

export default useProjects
