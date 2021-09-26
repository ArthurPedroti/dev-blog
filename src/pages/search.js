import React from 'react'
import Layout from '../components/Layout'
import Search from '../components/Search'
import Seo from '../components/seo'

const algolia = {
  appId: process.env.GATSBY_ALGOLIA_APP_ID,
  searchOnlyApiKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
  indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME
}

const SearchPage = () => (
  <Layout>
    <Seo title="Pesquisa" />
    <Search algolia={algolia} />
  </Layout>
)

export default SearchPage
