import React from 'react'
import * as S from './styles'
import Hit from './Hit'

import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits, Stats } from 'react-instantsearch-dom'

const Search = ({ algolia }) => {
  const searchClient = algoliasearch(algolia.appId, algolia.searchOnlyApiKey)

  return (
    <S.SearchWrapper>
      <InstantSearch searchClient={searchClient} indexName={algolia.indexName}>
        <SearchBox autoFocus translations={{ placeholder: 'Pesquisar...' }} />
        <Stats
          translations={{
            stats(nbHits, timeSpentMs) {
              return `${nbHits} resultados encontrados em ${timeSpentMs}ms`
            }
          }}
        />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </S.SearchWrapper>
  )
}

export default Search
