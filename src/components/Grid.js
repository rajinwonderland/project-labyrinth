import React from 'react'
import StackGrid from 'react-stack-grid'
import { BookItem, ItemLoader } from './generic'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

const Loading = num => {
  let loaders = []
  for (let i = 0; i < num; i++) {
    loaders.push(<ItemLoader key={i} />)
  }
  return <StackGrid columnWidth={180}>{loaders}</StackGrid>
}
const BookItems = props => {
  console.log(props)
  if (props.books.loading) {
    return Loading(15)
  } else {
    return (
      <StackGrid columnWidth={180}>
        {props.books.allBooks.map(a => (
          <Link
            key={a.id}
            to={{
              pathname: '/book',
              search: `?id=${a.id}`
            }}
            style={{ textDecoration: 'none' }}
          >
            <BookItem author={a.author.name} title={a.title} image={a.coverPhotoUrl} />
          </Link>
        ))}
      </StackGrid>
    )
  }
}

const ALL_BOOKS_QUERY = gql`
  query BooksQuery {
    allBooks {
      id
      title
      coverPhotoUrl
      author {
        id
        name
        photoUrl
      }
    }
  }
`

const Grid = graphql(ALL_BOOKS_QUERY, {
  name: 'books',
  options: {
    fetchPolicy: 'network-only'
  }
})(BookItems)

export default Grid
