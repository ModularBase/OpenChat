import React from 'react';
import styled from 'styled-components';

const BadgeContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 5px;

  &:hover .tooltip {
    visibility: visible;
  }
`;

const Badge = styled.span`
  background-color: ${props => (props.isAdmin ? '#ff5c5c' : '#5cdbff')};
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  color: white;
  cursor: pointer;
`;

const Tooltip = styled.div`
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -50px;
  width: 120px;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }
`;

const BadgeWithTooltip = ({ isAdmin, tooltipText }) => (
  <BadgeContainer>
    <Badge isAdmin={isAdmin}>{isAdmin ? 'Admin' : 'User'}</Badge>
    <Tooltip className="tooltip">{tooltipText}</Tooltip>
  </BadgeContainer>
);

export default BadgeWithTooltip;
