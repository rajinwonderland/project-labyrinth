import React from 'react';
import { Card, CardHeader, CardMedia, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import styled from 'tachyons-components';
import ContentLoader, { Facebook } from 'react-content-loader';
import RaisedButton from 'material-ui/RaisedButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import { Rating } from 'material-ui-rating';
import ReactAudioPlayer from 'react-audio-player';
import { SpeedDial, BubbleList, BubbleListItem } from 'react-speed-dial';
import { PacmanLoader } from 'halogenium';
import 'tachyons';

const colors = {
  android: {
    backgroundColor: '#4b7d2f',
    color: 'white'
  },
  kindle: {
    backgroundColor: '#ff9900',
    color: 'white'
  },
  audio: {
    backgroundColor: '#1a1c1d',
    color: 'white'
  },
  disabled: {
    backgroundColor: 'rgb(229, 229, 229)',
    color: 'rgba(0, 0, 0, 0.3)'
  },
  ios: {
    color: 'white',
    background:
      'linear-gradient(50.622764738094645deg, #f16 2%, #fe1e6e 24.2%, #ff2371 39.4%, #fe2573 39.4%, #ff2b75 56.1%, #ff2d76 56.1%, #ff327c 68.1%, #ff327c 72.3%, #ff347d 72.3%, #ff3d81 90.1%, #ff4183 96.7%)'
  }
};

const openUrl = url => {
  return window.open(url, '_blank');
};

const Summary = styled('p')`lh-copy avenir f5`;
const Title = styled('h1')` w-70 w-100-ns f4 f3-ns lh-title fw5 pl3 avenir`;
const Author = styled('strong')`f5-ns f6 fw6 avenir`;
const Publisher = styled('strong')`f5-ns f6 fw3 avenir`;
const AuthorInfo = styled('div')`flex flex-wrap mb3`;
const ActionsContainer = styled('div')`dn flex-ns kubj flex-wrap items-center`;
const AuthorPic = styled('img')`br-100 ba h3 w3 dib`;
const Col = styled('div')`pl2 flex flex-column flex-wrap justify-center`;
// const Row = styled('div')`flex flex-wrap`
const Text = styled('strong')`f6 fw3 avenir`;
const Section = styled('h3')`avenir f4 fw3 lh-title`;

const Fab = ({ epubUrl, mobiUrl, audioBookUrl }) => (
  <SpeedDial>
    <BubbleList>
      <BubbleListItem
        primaryText="Download for Android"
        leftAvatar={<Avatar style={colors.android} icon={<FileDownload />} />}
        className="avenir fw3"
        styleText={colors.android}
        onClick={() => openUrl(epubUrl)}
      />
      <BubbleListItem
        primaryText="Download for Kindle"
        leftAvatar={<Avatar style={colors.kindle} icon={<FileDownload />} />}
        className="avenir fw3"
        styleText={colors.kindle}
        onClick={() => openUrl(mobiUrl)}
      />
      <BubbleListItem
        primaryText="Download for iOS"
        leftAvatar={<Avatar style={colors.ios} icon={<FileDownload />} />}
        className="avenir fw3"
        styleText={colors.ios}
        onClick={() => openUrl(mobiUrl)}
      />
      <BubbleListItem
        primaryText="Download Audio Book"
        leftAvatar={<Avatar style={audioBookUrl ? colors.audio : colors.disabled} icon={<PlayArrow />} />}
        className="avenir fw3"
        styleText={audioBookUrl ? colors.audio : colors.disabled}
        onClick={audioBookUrl ? () => openUrl(audioBookUrl) : null}
      />
    </BubbleList>
  </SpeedDial>
);

const AuthorBox = ({ author, publisher, photoUrl }) => (
  <AuthorInfo>
    <AuthorPic
      src={photoUrl}
      size={50}
      style={{
        objectFit: 'cover',
        objectPosition: 'top'
      }}
    />
    <Col>
      <Author>{`${author}`}</Author>
      <Publisher>{`${publisher}`}</Publisher>
    </Col>
  </AuthorInfo>
);

const RatingsBox = props => (
  <Col className="items-start mb2 mt2">
    <Rating
      value={Math.round(props.averageRating)}
      readOnly
      itemStyle={{ width: 20, height: 20, padding: 0 }}
      itemIconStyle={{ width: 20, height: 20 }}
    />
    <Text>{`${props.averageRating} Average Rating on ${props.provider}`}</Text>
    <Text className="mt1">{`${props.ratingsCount} Ratings on ${props.provider}`}</Text>
    {props.reviewCount && <Text className="mt1">{`${props.reviewCount} Reviews on ${props.provider}`}</Text>}
  </Col>
);

const BookInfo = ({
  grRatingsCount,
  grReviewCount,
  grAverageRating,
  author,
  publisher,
  photoUrl,
  epubUrl,
  mobiUrl,
  averageRating,
  ratingsCount
}) => (
  <Col>
    <Col>
      <Author>{`by ${author}`}</Author>
      <Publisher>{`${publisher}`}</Publisher>
    </Col>
    <div>
      <ActionsContainer>
        <RaisedButton
          label="Android"
          labelColor="white"
          icon={<FileDownload color={epubUrl ? 'white' : 'rgba(0, 0, 0, 0.3)'} />}
          href={epubUrl}
          disabled={epubUrl ? false : true}
          backgroundColor="#4b7d2f"
          style={{
            marginRight: '2.5px',
            marginTop: '16px',
            marginBottom: '16px'
          }}
        />
        <RaisedButton
          label="Kindle"
          labelColor="white"
          icon={<FileDownload color={mobiUrl ? 'white' : 'rgba(0, 0, 0, 0.3)'} />}
          href={mobiUrl}
          disabled={mobiUrl ? false : true}
          backgroundColor="#ff9900"
          style={{
            marginLeft: '2.5px',
            marginRight: '2.5px',
            marginTop: '16px',
            marginBottom: '16px'
          }}
        />
        <RaisedButton
          label="iOS"
          labelColor="white"
          icon={<FileDownload color={mobiUrl ? 'white' : 'rgba(0, 0, 0, 0.3)'} />}
          href={mobiUrl}
          disabled={mobiUrl ? false : true}
          disabledLabelColor="rgba(0, 0, 0, 0.3)"
          buttonStyle={{
            background: mobiUrl
              ? 'linear-gradient(50.622764738094645deg, #f16 2%, #fe1e6e 24.2%, #ff2371 39.4%, #fe2573 39.4%, #ff2b75 56.1%, #ff2d76 56.1%, #ff327c 68.1%, #ff327c 72.3%, #ff347d 72.3%, #ff3d81 90.1%, #ff4183 96.7%)'
              : 'rgb(229, 229, 229)'
          }}
          style={{
            marginLeft: '2.5px',
            marginTop: '16px',
            marginBottom: '16px'
          }}
        />
      </ActionsContainer>
      {averageRating && (
        <RatingsBox provider="Google Play Books" averageRating={averageRating} ratingsCount={ratingsCount} />
      )}
      {grRatingsCount && (
        <RatingsBox
          provider="Goodreads"
          averageRating={grAverageRating}
          ratingsCount={grRatingsCount}
          reviewCount={grReviewCount}
        />
      )}
    </div>
  </Col>
);

export const BookCard = ({
  epubUrl,
  mobiUrl,
  author,
  authorDescription,
  title,
  summary,
  coverPhotoUrl,
  audioBookUrl,
  photoUrl,
  publisher,
  synopsis,
  altSynopsis,
  averageRating,
  ratingsCount,
  grRatingsCount,
  grReviewCount,
  authorDetails,
  grAverageRating
}) => (
  <Card
    style={{
      whiteSpace: 'wrap',
      alignSelf: 'center',
      width: '80%'
    }}
  >
    <CardHeader
      title={<Title>{title}</Title>}
      subtitle={
        <BookInfo
          {...{
            grRatingsCount,
            grReviewCount,
            grAverageRating,
            author,
            publisher,
            photoUrl,
            epubUrl,
            mobiUrl,
            averageRating,
            ratingsCount
          }}
        />
      }
      style={{
        paddingRight: '16px',
        whiteSpace: 'wrap'
      }}
      textStyle={{
        paddingRight: '0px',
        width: 'auto'
      }}
      avatar={
        <Avatar
          src={coverPhotoUrl}
          style={{
            borderRadius: 0,
            minHeight: '150px',
            maxHeight: '300px',
            maxWidth: '200px',
            minWidth: '100px',
            height: '100%',
            width: '100%'
          }}
        />
      }
    />
    <Col className="ma3 mt0">
      <Section style={{ color: 'rgba(0, 0, 0, 0.3)' }}>Summary</Section>
      <Summary>{synopsis ? synopsis : decodeHtmlEntity(summary)}</Summary>
      <Section style={{ color: 'rgba(0, 0, 0, 0.3)' }}>Synopsis</Section>
      <Summary>{`${altSynopsis || synopsis}`}</Summary>
      {audioBookUrl && (
        <div>
          <Section style={{ color: 'rgba(0, 0, 0, 0.3)' }}>Audio Book</Section>
          <ReactAudioPlayer src={audioBookUrl} controls />
        </div>
      )}
      <Section style={{ color: 'rgba(0, 0, 0, 0.3)' }}>Author</Section>
      <AuthorBox {...{ publisher, author, photoUrl }} />
      <Summary>{authorDescription}</Summary>
      <Summary>{authorDetails}</Summary>
    </Col>
    <Fab {...{ epubUrl, mobiUrl, audioBookUrl }} />
  </Card>
);

const decodeHtmlEntity = str => {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

const BookTitle = styled('h1')`
  f6 f5-ns fw6 lh-title black mv0 avenir
`;

const BookAuthor = styled('h2')`
  f6 fw4 mt2 mb0 black-60 avenir
`;

export const BookItem = ({ image, author, title }) => (
  <Card
    style={{
      height: '315px',
      width: '160px',
      margin: '5px'
    }}
  >
    <CardMedia>
      <img src={image} height="247px" alt={title} />
    </CardMedia>
    <CardText style={{ paddingLeft: '8px', paddingTop: '8px' }}>
      <BookTitle>{title.substring(0, 15)}</BookTitle>
      <BookAuthor>{author}</BookAuthor>
    </CardText>
  </Card>
);

export const ItemLoader = () => (
  <Card
    style={{
      height: '315px',
      width: '160px',
      margin: '5px'
    }}
  >
    <ContentLoader height={330} width={160} speed={4} primaryColor={'#f3f3f3'} secondaryColor={'#ecebeb'}>
      <rect x="-313.92" y="-123.76" rx="4" ry="4" width="260.91" height="14.27" />
      <rect x="-313.92" y="-79.07" rx="3" ry="3" width="189.55" height="14.27" />
      <rect x="-470.34" y="110.86" rx="3" ry="3" width="448.23" height="14.27" />
      <rect x="46" y="17.05" rx="0" ry="0" width="0" height="0" />
      <rect x="63.5" y="43.05" rx="0" ry="0" width="0" height="0" />
      <rect x="-36.75" y="-0.95" rx="0" ry="0" width="216" height="209.98" />
      <rect x="46.5" y="104.05" rx="0" ry="0" width="0" height="18" />
      <rect x="7.3" y="222.05" rx="0" ry="0" width="136.59" height="30" />
      <rect x="7.3" y="260.05" rx="0" ry="0" width="137" height="18" />
      <rect x="103.3" y="239.05" rx="0" ry="0" width="0" height="0" />
      <rect x="103.3" y="239.05" rx="0" ry="0" width="0" height="0" />
      <rect x="105.3" y="267.05" rx="0" ry="0" width="1" height="0" />
    </ContentLoader>
  </Card>
);

export const BookLoader = () => (
  <Card
    style={{
      whiteSpace: 'wrap',
      alignSelf: 'center',
      width: '80%',
      padding: '16px'
    }}
  >
    <Facebook />
  </Card>
);

const Load = styled('div')`flex flex-column items-center justify-center`;

export const Loader = () => (
  <Load>
    <PacmanLoader color="#1295ce" size="48px" margin="20px" />
  </Load>
);
