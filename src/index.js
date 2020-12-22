import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const RemixButton = styled.button`
  border: 0;
  outline: 0;
  border-radius: 4px;
  font-size: 18px;
  width: calc(100% - 52px);
  height: 48px;
  cursor: pointer;
  display: flex;
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  background: #267afd;
  color: #ffffff;
  margin-bottom: 10px;
`;

const SubText = styled.div`
  font-family: 'Open Sans', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.02em;
  margin-bottom: 48px;
  color: rgba(130,130,130,1);
`;

const About = ({ image, onCreateRemix, remixButtonText, subText }) => (
  <Container>
    <Card>
      <CardContent>
        <Image style={{ image }} />
        <Controls>
          <RemixButton
            onClick={() => onCreateRemix()}
          >
            {remixButtonText}
          </RemixButton>
          <SubText>
            {subText}
          </SubText>
        </Controls>
      </CardContent>
    </Card>
  </Container>
);

About.propTypes = {
  image: PropTypes.string.isRequired,
  onCreateRemix: PropTypes.func,
  remixButtonText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
};

About.defaultProps = {
  onCreateRemix() { },
};

export default About;
