import React from 'react'
import { BookCard, BookLoader } from './generic'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const BookContainer = props => {
  if (props.bookDetails.loading) {
    return <BookLoader />
  } else {
    return (
      <BookCard
        author={props.bookDetails['getBookDetails'].authorName}
        title={props.bookDetails['getBookDetails'].title}
        coverPhotoUrl={props.bookDetails['getBookDetails'].coverPhotoUrl}
        photoUrl={props.bookDetails['getBookDetails'].authorPhotoUrl}
        publisher={props.bookDetails['getBookDetails'].publisher}
        mobiUrl={props.bookDetails['getBookDetails'].mobiUrl}
        epubUrl={props.bookDetails['getBookDetails'].epubUrl}
        audioBookUrl={props.bookDetails['getBookDetails'].audioBookUrl}
        summary={props.bookDetails['getBookDetails'].details}
        synopsis={props.bookDetails['getBookDetails'].synopsis}
        altSynopsis={props.bookDetails['getBookDetails'].bookInfoSynopsis}
        authorDescription={props.bookDetails['getBookDetails'].authorInfoDescription}
        pageCount={props.bookDetails['getBookDetails'].pageCount}
        ratingsCount={props.bookDetails['getBookDetails'].ratingsCount}
        details={props.bookDetails['getBookDetails'].details}
        authorDetails={props.bookDetails['getBookDetails'].authorInfoDetails}
        averageRating={props.bookDetails['getBookDetails'].averageRating}
        grAverageRating={props.bookDetails['getBookDetails'].grAverageRating}
        grRatingsCount={props.bookDetails['getBookDetails'].grRatingsCount}
        grReviewCount={props.bookDetails['getBookDetails'].grReviewCount}
      />
    )
  }
}

const GET_BOOK = gql`
  query bookDetailsById($id: ID!) {
    getBookDetails(id: $id) {
      authorInfoId
      authorInfoName
      authorInfoDescription
      authorInfoPhotoUrl
      authorInfoDetails
      authorInfoDetailsUrl
      bookInfoId
      bookInfoSynopsis
      pageCount
      categories
      averageRating
      ratingsCount
      maturiyRating
      altCoverPhotoUrl
      infoLink
      details
      bookInfoTitle
      id
      published
      publisher
      synopsis
      epubUrl
      mobiUrl
      audioBookUrl
      tags
      title
      coverPhotoUrl
      isbn
      authorName
      authorId
      authorPhotoUrl
      grRatingsCount
      grReviewCount
      grAverageRating
    }
  }
`

const Book = graphql(GET_BOOK, {
  name: 'bookDetails',
  options: ({ location }) => {
    const { search } = location
    const params = new URLSearchParams(search)
    return {
      variables: { id: params.get('id') },
      fetchPolicy: 'network-only'
    }
  }
})(BookContainer)

export default Book
