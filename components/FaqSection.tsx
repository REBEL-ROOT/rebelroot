import React, { useState } from 'react';
import styled from 'styled-components';
import Container from './Container';
import SectionTitle from './SectionTitle';
import { media } from 'utils/media';

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FaqItem[];
}

export default function FaqSection({ title = 'Frequently Asked Questions', subtitle, faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper>
      <Container>
        <SectionTitle>{title}</SectionTitle>
        {subtitle && <SubtitleText>{subtitle}</SubtitleText>}
        <FaqList>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FaqCard key={idx} $isOpen={isOpen} onClick={() => toggleFaq(idx)}>
                <QuestionHeader>
                  <QuestionText>{faq.question}</QuestionText>
                  <ToggleIcon>{isOpen ? '−' : '+'}</ToggleIcon>
                </QuestionHeader>
                {isOpen && <AnswerText>{faq.answer}</AnswerText>}
              </FaqCard>
            );
          })}
        </FaqList>
      </Container>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  padding: 8rem 0;
  background: rgb(var(--secondBackground));
  border-top: 1px solid rgba(var(--text), 0.05);
  border-bottom: 1px solid rgba(var(--text), 0.05);
`;

const SubtitleText = styled.p`
  font-size: 1.8rem;
  color: rgba(var(--text), 0.7);
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 4rem;
`;

const FaqList = styled.div`
  max-width: 80rem;
  margin: 4rem auto 0;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const FaqCard = styled.div<{ $isOpen: boolean }>`
  background: rgb(var(--cardBackground));
  border: 1px solid ${({ $isOpen }) => ($isOpen ? 'rgba(var(--primary), 0.4)' : 'rgba(var(--text), 0.08)')};
  border-radius: 1.6rem;
  padding: 2.4rem;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(var(--primary), 0.5);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
`;

const QuestionText = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--text));
  margin: 0;

  ${media('<=phone')} {
    font-size: 1.7rem;
  }
`;

const ToggleIcon = styled.span`
  font-size: 2.4rem;
  font-weight: 800;
  color: rgb(var(--primary));
  line-height: 1;
`;

const AnswerText = styled.p`
  font-size: 1.6rem;
  line-height: 1.65;
  color: rgba(var(--text), 0.85);
  margin-top: 1.6rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(var(--text), 0.06);
`;
