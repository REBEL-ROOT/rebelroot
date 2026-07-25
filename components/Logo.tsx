import React from 'react';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  height?: number;
}

export default function Logo({ className, height = 48 }: LogoProps) {
  return (
    <LogoWrapper className={className} style={{ height: `${height}px` }}>
      <LogoImg src="/rebelroot-logo-transparent.png" alt="REBELROOT Logo" />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  user-select: none;
`;

const LogoImg = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.03);
  }
`;
