import React from 'react';
import styled from 'tachyons-components';
import { Loader } from './generic';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

const BookItemWrapper = styled('div')`
  fl w-50 w-25-l link overflow-hidden
`;

const BookImage = styled('div')`
  grow aspect-ratio--4x6
`;

const BookItem = ({ image, link }) => (
  <BookItemWrapper>
    <BookImage
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    />
  </BookItemWrapper>
);

const Collection = props => {
  if (props.allBooksPhotos.loading) {
    return <Loader active={props.allBooksPhotos.loading} />;
  } else {
    return (
      <article>
        {props.allBooksPhotos.allBooks.map(a => (
          <Link
            key={a.id}
            to={{
              pathname: '/book',
              search: `?id=${a.id}`
            }}
            style={{ textDecoration: 'none' }}
          >
            <BookItem key={a.id} image={a.coverPhotoUrl} />
          </Link>
        ))}
      </article>
    );
  }
};

const ALL_BOOKS_PHOTOS = gql`
  query AllBooksPhotos {
    allBooks {
      id
      coverPhotoUrl
    }
  }
`;

const Collections = graphql(ALL_BOOKS_PHOTOS, {
  name: 'allBooksPhotos',
  options: {
    fetchPolicy: 'network-only'
  }
})(Collection);

export default Collections;
