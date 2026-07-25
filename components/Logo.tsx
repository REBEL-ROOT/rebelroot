import React from 'react';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  height?: number;
  variant?: 'auto' | 'light' | 'dark';
}

export default function Logo({ className, height = 48, variant = 'auto' }: LogoProps) {
  if (variant === 'light') {
    return (
      <LogoWrapper className={className} style={{ height: `${height}px` }}>
        <AlwaysLightLogo src="/rebelroot-logo-transparent.png" alt="REBELROOT Logo" />
      </LogoWrapper>
    );
  }

  if (variant === 'dark') {
    return (
      <LogoWrapper className={className} style={{ height: `${height}px` }}>
        <AlwaysDarkLogo src="/rebelroot-logo-dark-transparent.png" alt="REBELROOT Logo" />
      </LogoWrapper>
    );
  }

  return (
    <LogoWrapper className={className} style={{ height: `${height}px` }}>
      {/* Black logo for light mode */}
      <LightModeLogo src="/rebelroot-logo-dark-transparent.png" alt="REBELROOT Logo" />
      {/* Silver/white logo for dark mode */}
      <DarkModeLogo src="/rebelroot-logo-transparent.png" alt="REBELROOT Logo" />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  user-select: none;
`;

const AlwaysLightLogo = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const AlwaysDarkLogo = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  transition: transform 0.25s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const LightModeLogo = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  display: none;
  transition: transform 0.25s ease;

  .next-light-theme & {
    display: block;
  }

  &:hover {
    transform: scale(1.03);
  }
`;

const DarkModeLogo = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  display: block;
  transition: transform 0.25s ease;

  .next-light-theme & {
    display: none;
  }

  &:hover {
    transform: scale(1.03);
  }
`;
