import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSwipeable } from 'react-swipeable';

import PlayIcon from './Components/SVG/Play';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Card = styled.div`
  width: min(calc(55vh - 40px), calc(100vw - 40px));
  height: min(calc(100vh - 40px), calc(181vw - 40px));
  background: #F5F5F7;
  border-radius: 17px;
  overflow: hidden;
  transform: translateZ(0);
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Image = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background: url(${({ style: { image } }) => image}) center center / cover no-repeat;
  cursor: ${({ style: { showPointer } }) => showPointer ? 'pointer' : 'initial'};
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const NextButton = styled.button`
  border: 0;
  outline: 0;
  border-radius: 4px;
  font-size: 16px;
  width: calc(100% - 48px);
  padding: 16px 0;
  cursor: pointer;
  display: flex;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-weight: bold;
  justify-content: center;
  background: #267afd;
  color: #ffffff;

  @media screen and (max-height: 568px) {
    font-size: 14px;
    padding: 12px 0;
  }

  @media screen and (max-height: 524px) {
    font-size: 14px;
    padding: 8px 0;
  }
`;

const SkipButton = styled.button`
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  background: transparent;
  color: #267afd;
  border: 0;
  outline: 0;
  width: calc(100% - 48px);
  padding: 16px 0;
  margin: 2px auto 4px auto;
  cursor: pointer;

  @media screen and (max-height: 568px) {
    font-size: 14px;
    padding: 12px 0;
  }
`;

const Indicators = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 28px;

  @media screen and (max-height: 568px) {
    margin-bottom: 26px;
  }

  @media screen and (max-height: 524px) {
    margin-bottom: 18px;
  }
`;

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  background: #267afd;
  opacity: ${({ style: { isActive } }) => isActive ? '1' : '0.4'};
  border-radius: 50%;
  margin: 0 6.5px;
  transition: 0.3s ease opacity;
  cursor: pointer;
`;

const ScrollWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.2s ease-in-out;
  transform: ${({ style: { isNext, isPrev } }) => {
    if (isNext) return 'translate(100vw, 0)';
    if (isPrev) return 'translate(-100vw, 0)';
    return 'translate(0, 0)';
  }};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VideoOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  transition: all 0.3s ease-in-out;
  display: ${({ style: { showOverlay } }) => showOverlay ? 'flex' : 'none'};
  opacity: ${({ style: { showOpacity } }) => showOpacity ? '1' : '0'};
  width: 100vw;
  height: 100vh;
  z-index: 10;
  align-items: center;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;

  width: 100%;
  height: auto;

  transform: ${({ style: { mp4Offset } }) => mp4Offset ? `translate(0, ${mp4Offset}%)` : 'translate(0, 92%)'};

  video {
    width: 100%;
    height: auto;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% - 8px));
    fill: #ffffff;
    width: 64px;
    height: 64px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
    z-index: 10;
  }
`;

const About = ({ cards, onCreateRemix, nextButtonText, remixButtonText, skipButtonText }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);
  const [iFrameSrc, setIFrameSrc] = useState(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (cardIndex < cards.length - 1) setCardIndex((i) => i + 1);
    },
    onSwipedRight: () => {
      if (cardIndex > 0) setCardIndex((i) => i - 1);
    },
  });

  const handleHide = () => {
    setShowOpacity(() => false);
    window.setTimeout(() => {
      setShowOverlay(() => false);
      setIFrameSrc(() => null);
    }, 600);
  };

  const handleShow = (videoURL) => {
    if (!videoURL) return;

    setIFrameSrc(() => videoURL);
    setShowOverlay(() => true);
    window.setTimeout(() => {
      setShowOpacity(() => true);
    }, 100);
  };

  if (!cards || !cards.length) return null;

  let buttonText = nextButtonText && nextButtonText !== '' ? nextButtonText : 'Next';
  if (cardIndex === cards.length - 1) buttonText = remixButtonText && remixButtonText !== '' ? remixButtonText : 'Get Started';

  return (
    <Container>
      <VideoOverlay
        style={{ showOpacity, showOverlay }}
        onClick={handleHide}
      >
        {
          showOverlay &&
          <iframe
            width={window.innerWidth * 0.9}
            height={window.innerWidth * 0.9 * 0.5625}
            title={'Template Tutorial'}
            src={iFrameSrc}
            frameBorder={'0'}
            allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
            allowFullScreen
          />
        }
      </VideoOverlay>
      <Card>
        <CardContent {...handlers}>
          {
            cards.map(({ image, mp4, mp4Offset, videoURL }, idx) => (
              <ScrollWrapper
                key={idx}
                style={{
                  isActive: cardIndex === idx,
                  isNext: cardIndex < idx,
                  isPrev: cardIndex > idx,
                }}
              >
                <Image
                  style={{ image, showPointer: videoURL }}
                />
                {
                  (mp4 && mp4 !== '') &&
                  <VideoWrapper
                    onClick={videoURL ? () => handleShow(videoURL) : () => { }}
                    style={{ mp4Offset }}
                  >
                    {videoURL && <PlayIcon />}
                    <video width={'560'} height={'315'} autoPlay loop muted>
                      <source src={mp4} type={'video/mp4'} />
                    </video>
                  </VideoWrapper>
                }
              </ScrollWrapper>
            ))
          }

          <Controls>
            <Indicators>
              {
                (cards.length && cards.length > 1) && Array.from(Array(cards.length).keys()).map((num) => (
                  <Indicator
                    key={num}
                    onClick={() => setCardIndex(() => num)}
                    style={{ isActive: cardIndex === num }}
                  />
                ))
              }
            </Indicators>
            <NextButton
              onClick={() => cardIndex === cards.length - 1 ? onCreateRemix() : setCardIndex((i) => i + 1)}
              style={{ isRemixButton: cardIndex === cards.length - 1 }}
            >
              {buttonText}
            </NextButton>
            <SkipButton onClick={() => onCreateRemix()}>
              {skipButtonText && skipButtonText !== '' ? skipButtonText : 'Skip'}
            </SkipButton>
          </Controls>
        </CardContent>
      </Card>
    </Container>
  );
};

About.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string.isRequired,
    mp4: PropTypes.string,
    mp4Offset: PropTypes.number,
  })),
  nextButtonText: PropTypes.string,
  onCreateRemix: PropTypes.func,
  remixButtonText: PropTypes.string,
  skipButtonText: PropTypes.string,
};

About.defaultProps = {
  cards: [],
  nextButtonText: 'Next',
  onCreateRemix() { },
  remixButtonText: 'Get Started',
  skipButtonText: 'Skip',
};

export default About;
