import React from 'react'
import Layout from '../components/Layout'
import About from '../components/About'

import Seo from '../components/seo'

const AboutPage = () => (
  <Layout>
    <Seo title="Sobre" />
    <About />
  </Layout>
)

export default AboutPage
