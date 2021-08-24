import styled, { css } from "styled-components";

const gradient = (degs, color1, color2) => css`
  background: linear-gradient(${degs || 130}deg, ${color1} 0%, ${color2} 100%);
`;

gradient();

export const Card = styled.div`
  position: relative;
  margin: 20px 20px;
  overflow: hidden;
  height: 420px;
  width: 280px;
  padding: 3rem 0 2rem;
  border-radius: 0.5rem;
  transition: all 1.5s;
  color: white;
  ${(props) => gradient(props.deg, props.color1, props.color2)};
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.025), 0 9px 46px 8px rgba(0, 0, 0, 0.025),
    0 11px 15px -7px rgba(0, 0, 0, 0.025);

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    ${(props) => gradient(-50, props.color1, props.color2)};
    transition: opacity 0.75s;
  }
  &:hover {
    transform: scale(1.05);
  }
  &:hover::after {
    opacity: 1;
  }
`;

export const Content = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.div`
  display: flex;
  margin-top: -25px;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  flex: 0 0 auto;
  border-radius: 50%;
  font-size: 40px;
  color: white;
  ${(props) => gradient(props.deg, props.color1, props.color2)};
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.25);
`;

export const CandidateName = styled.div`
  text-shadow: 2px 2px #979698;
  font-size: 1rem;
  font-weight: bold;
  font-style: oblique;
`;

export const JobTitle = styled.div`
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
`;

export const SkillListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.25rem;

  & > i {
    font-size: 20px;
    margin-right: 0.5rem;
  }
`;

export const DetailButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 82px;
  z-index: 3;
  flex: 0 0 auto;
  height: 40px;
  padding: 0 2rem;
  margin-top: 0.5rem;
  border: 0;
  border-radius: 20px;
  color: rgba(0, 0, 0, 0.85);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.25);
  transition: all 1.5s;
  outline: none;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }
`;

export const BackgroundSquare = styled.div`
  position: absolute;
  z-index: 2;
  top: 52%;
  left: 0%;
  width: 200%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(-3deg);
`;
