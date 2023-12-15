import { useState, useEffect } from 'react'
import projectService from 'services/project-service'

function useProject(projectId) {
  const [project, setProject] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    projectService
      .getById(projectId)
      .then(({ data }) => setProject(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { project, loading, errors }
}

export default useProject
