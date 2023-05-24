import React from 'react'
import Layout from '../components/Layout'
import Courses from '../components/Courses'

import Seo from '../components/seo'

const CoursesPage = () => (
  <Layout>
    <Seo title="Cursos" />
    <Courses />
  </Layout>
)

export default CoursesPage
