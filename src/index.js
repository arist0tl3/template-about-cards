import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
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
  background: #ffffff;
  border-radius: 17px;
  overflow: hidden;
`;

const CardContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImageHeader = styled.div`
  position: relative;
  height: 61.39%;
  width: 100%;
  background: url(${({ style: { image } }) => image}) center center / contain no-repeat;
  cursor: ${({ style: { showPointer } }) => showPointer ? 'pointer' : 'initial'};

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    fill: #ffffff;
    width: 64px;
    height: 64px;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));
  }
`;

const CopyWrapper = styled.div`
  height: 38.61%;
  width: 100%;
  padding: 24px;
`;

const Steps = styled.div`
  height: 100%;
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CopyHeader = styled.header`
  font-size: 25px;
  font-style: italic;
  font-weight: bold;
  line-height: 35.5px;

  @media screen and (max-height: 600px) {
    font-size: 20px;
    line-height: 27.5px;
  }
`;

const CopyParagraph = styled.p`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  letter-spacing: -0.02rem;

  @media screen and (max-height: 600px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 96px;
  width: 100%;
  padding: 0 24px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const NextButton = styled.button`
  align-items: center;
  appearance: none;
  background: none;
  border-radius: 6px;
  border: 2px solid #000;
  bottom: 15px;
  cursor: pointer;
  display: flex;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-weight: bold;
  height: 43px;
  justify-content: center;
  min-width: 98px;
  outline: none;
  padding: 0 10px;
  text-transform: uppercase;
  transition: 0.1s ease transform;

  background-color: ${({ style: { isRemixButton } }) => isRemixButton ? 'rgb(0, 0, 0)' : 'none'};
  color: ${({ style: { isRemixButton } }) => isRemixButton ? 'rgb(255, 255, 255)' : '#000000'};
`;

const Indicators = styled.div`
  height: 96px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Indicator = styled.div`
  width: 10px;
  height: 10px;
  background: #7B7B7B;
  border-radius: 50%;
  margin-right: 13px;
  transition: 0.3s ease transform;
  transform: scale(${({ style: { isActive } }) => isActive ? '1.5' : '1'});
  cursor: pointer;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 24px 0 0 0;
  width: 100%;

  @media screen and (max-height: 600px) {
    margin: 12px 0 0 0;
  }
`;

const StepNumber = styled.div`
  font-size: 16.43px;
  line-height: 22.37px;
  font-weight: bold;
  margin-top: -3px;
  color: #007aff;
  background: rgba(0, 122, 255, 0.1);
  width: 35.05px;
  height: 35.05px;
  min-width: 35.05px;
  min-height: 35.05px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 17px;

  @media screen and (max-height: 600px) {
    display: none;
  }
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: #000000;
`;

const StepTitle = styled.div`
  font-size: 20px;
  line-height: 27.24px;
  font-weight: 700;
  letter-spacing: -0.02rem;

  @media screen and (max-height: 600px) {
    font-size: 18px;
    line-height: 25.74px;
  }
`;

const StepText = styled.div`
  font-size: 13px;
  line-height: 18.61px;
`;

const ScrollWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 96px);
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

const About = ({ config, configURL, onCreateRemix }) => {
  const [currentConfig, setCurrentConfig] = useState({});

  useEffect(() => {
    // If there is no configURL, just set the passed config
    if (!configURL) {
      setCurrentConfig(() => config);
      return;
    }

    // Attempt to fetch a dynamic config, if we don't have it
    // in a reasonable amount of time, use the passed config
    const timeout = window.setTimeout(() => {
      setCurrentConfig(() => config);
    }, 1000);

    const fetchConfig = async () => {
      if (!configURL) return;

      const { data } = await axios(configURL);

      if (data) {
        window.clearTimeout(timeout);
        setCurrentConfig(() => data);
      }
    };

    fetchConfig();
  }, []);

  const [cardIndex, setCardIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showOpacity, setShowOpacity] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (cardIndex < 2) setCardIndex((i) => i + 1);
    },
    onSwipedRight: () => {
      if (cardIndex > 0) setCardIndex((i) => i - 1);
    },
  });

  const handleHide = () => {
    setShowOpacity(() => false);
    window.setTimeout(() => {
      setShowOverlay(() => false);
    }, 600);
  };

  const handleShow = () => {
    if (!currentConfig.cardOne.videoURL) return;

    setShowOverlay(() => true);
    window.setTimeout(() => {
      setShowOpacity(() => true);
    }, 100);
  };

  if (!currentConfig.cardOne) return null;

  return (
    <Container>
      {
        currentConfig.cardOne.videoURL &&
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
              src={currentConfig.cardOne.videoURL}
              frameBorder={'0'}
              allow={'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'}
              allowFullScreen
            />
          }
        </VideoOverlay>
      }
      <Card>
        <CardContent {...handlers}>
          <ScrollWrapper
            style={{
              isActive: cardIndex === 0,
              isPrev: cardIndex > 0,
            }}
          >
            <ImageHeader
              onClick={handleShow}
              style={{ image: currentConfig.cardOne.image, showPointer: currentConfig.cardOne.videoURL }}
            >
              {currentConfig.cardOne.videoURL && <PlayIcon />}
            </ImageHeader>
            <CopyWrapper>
              <CopyHeader>
                {currentConfig.cardOne.header}
              </CopyHeader>
              <CopyParagraph>
                {currentConfig.cardOne.paragraph}
              </CopyParagraph>
            </CopyWrapper>
          </ScrollWrapper>

          <ScrollWrapper
            style={{
              isActive: cardIndex === 1,
              isNext: cardIndex < 1,
              isPrev: cardIndex > 1,
              background: '#f7f7f7',
            }}
          >
            <Steps>
              <CopyHeader style={{ marginBottom: '17px' }}>
                {currentConfig.cardTwo.header}
              </CopyHeader>
              {
                currentConfig.cardTwo.steps.map(({ title, text }, idx) => (
                  <StepWrapper key={title}>
                    <StepNumber>{idx + 1}</StepNumber>
                    <StepContent>
                      <StepTitle>{title}</StepTitle>
                      <StepText>{text}</StepText>
                    </StepContent>
                  </StepWrapper>
                ))
              }
            </Steps>
          </ScrollWrapper>

          <ScrollWrapper
            style={{
              isActive: cardIndex === 2,
              isNext: cardIndex < 2,
            }}
          >
            <ImageHeader
              style={{ image: currentConfig.cardThree.image }}
            />
            <CopyWrapper>
              <CopyHeader>
                {currentConfig.cardThree.header}
              </CopyHeader>
            </CopyWrapper>
          </ScrollWrapper>

          <Controls>
            <Indicators>
              {
                [0, 1, 2].map((num) => (
                  <Indicator
                    key={num}
                    onClick={() => setCardIndex(() => num)}
                    style={{ isActive: cardIndex === num }}
                  />
                ))
              }
            </Indicators>
            <NextButton
              onClick={() => cardIndex === 2 ? onCreateRemix() : setCardIndex((i) => i + 1)}
              style={{ isRemixButton: cardIndex === 2 }}
            >
              {cardIndex === 2 ? 'Get Started' : 'Next'}
            </NextButton>
          </Controls>
        </CardContent>
      </Card>
    </Container>
  );
};

About.propTypes = {
  config: PropTypes.shape({
    cardOne: PropTypes.shape({
      image: PropTypes.string.isRequired,
      videoURL: PropTypes.string,
      header: PropTypes.string.isRequired,
      paragraph: PropTypes.string.isRequired,
    }),
    cardTwo: PropTypes.shape({
      header: PropTypes.string.isRequired,
      steps: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })).isRequired,
    }),
    cardThree: PropTypes.shape({
      image: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    }),
  }),
  configURL: PropTypes.string,
  onCreateRemix: PropTypes.func,
};

About.defaultProps = {
  config: {},
  onCreateRemix() { },
};

export default About;
