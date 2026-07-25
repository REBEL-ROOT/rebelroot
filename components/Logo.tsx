import React from 'react';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  height?: number;
  variant?: 'auto' | 'light' | 'dark';
}

export default function Logo({ className, height = 48, variant = 'auto' }: LogoProps) {
  return (
    <LogoWrapper className={className} style={{ height: `${height}px` }}>
      <LogoImg src="/rebelroot-logo-transparent.png" alt="REBELROOT Logo" $variant={variant} />
    </LogoWrapper>
  );
}

const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  user-select: none;
`;

const LogoImg = styled.img<{ $variant: 'auto' | 'light' | 'dark' }>`
  height: 100%;
  width: auto;
  object-fit: contain;
  transition: transform 0.25s ease, filter 0.25s ease;

  ${(p) =>
    p.$variant === 'dark'
      ? `filter: brightness(0.12) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));`
      : p.$variant === 'light'
      ? `filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));`
      : `
        .next-light-theme & {
          filter: brightness(0.12) drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
        }

        .next-dark-theme & {
          filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.4));
        }
      `}

  &:hover {
    transform: scale(1.03);
  }
`;
