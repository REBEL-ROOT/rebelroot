import Head from 'next/head';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import OverTitle from 'components/OverTitle';
import Page from 'components/Page';
import SectionTitle from 'components/SectionTitle';
import { media } from 'utils/media';

interface FeedbackFormPayload {
  name: string;
  email: string;
  product: string;
  message: string;
}

export default function SupportPage() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [hasSuccessfullySubmitted, setHasSuccessfullySubmitted] = useState(false);
  const [hasErrored, setHasErrored] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting, errors } = formState;

  const upiId = 'warrior4root@ptyes';
  const upiUrl = `upi://pay?pa=${upiId}&pn=RebelRoot&cu=INR&tn=Support%20RebelRoot`;
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;

  async function onSubmit(payload: FeedbackFormPayload) {
    setHasErrored(false);
    try {
      const res = await fetch('/api/sendFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          ...payload,
        }),
      });

      if (res.status === 204) {
        setHasSuccessfullySubmitted(true);
      } else {
        setHasErrored(true);
      }
    } catch {
      setHasErrored(true);
    }
  }

  return (
    <Page
      title="Support &amp; Feedback | RebelRoot"
      description="Help support RebelRoot open source collective via UPI, Ko-fi, or send us direct product feedback."
    >
      <Head>
        <meta name="keywords" content="Support RebelRoot, RebelRoot donation, donate UPI, Ko-fi RebelRoot, send feedback, open source support" />
      </Head>

      <Wrapper>
        <HeaderContainer>
          <OverTitle>Support the rebellion</OverTitle>
          <SectionTitle>Keep RebelRoot Independent</SectionTitle>
          <Subtitle>
            We build ad-free, telemetry-free, local-first tools. We accept zero corporate funding. Help us stay fully sovereign through direct donations or by submitting feedback.
          </Subtitle>
        </HeaderContainer>

        <ContentGrid>
          {/* Left Column: Feedback Form */}
          <Card>
            <CardTitle>Send Us Feedback</CardTitle>
            <CardDescription>
              Encountered a bug? Have a feature request? Let us know how we can make our products better.
            </CardDescription>

            {hasSuccessfullySubmitted ? (
              <SuccessState>
                <SuccessIcon>🎉</SuccessIcon>
                <h3>Thank You!</h3>
                <p>Your feedback has been routed to our core dev team. We appreciate your support.</p>
                <Button style={{ marginTop: '2rem' }} onClick={() => setHasSuccessfullySubmitted(false)}>
                  Send Another Message
                </Button>
              </SuccessState>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)}>
                {hasErrored && <ErrorMessage>Failed to send feedback. Please try again.</ErrorMessage>}
                
                <FormGroup>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    placeholder="Name"
                    id="name"
                    disabled={isSubmitting}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <ErrorMessage>{errors.name.message as string}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Your Email</Label>
                  <Input
                    placeholder="Email Address"
                    id="email"
                    type="email"
                    disabled={isSubmitting}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                  />
                  {errors.email && <ErrorMessage>{errors.email.message as string}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="product">Select Product</Label>
                  <Select
                    id="product"
                    disabled={isSubmitting}
                    {...register('product', { required: 'Please select a product' })}
                  >
                    <option value="General">General / Platform</option>
                    <option value="Omni Browser">Omni Browser</option>
                    <option value="MOCNovel">MOCNovel</option>
                    <option value="CampCart">CampCart</option>
                    <option value="Ved Astra">Ved Astra</option>
                    <option value="MOC Office">MOC Office</option>
                  </Select>
                  {errors.product && <ErrorMessage>{errors.product.message as string}</ErrorMessage>}
                </FormGroup>

                <FormGroup>
                  <Label>Rate Your Experience</Label>
                  <StarContainer>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarButton
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        active={star <= (hoverRating ?? rating)}
                      >
                        ★
                      </StarButton>
                    ))}
                  </StarContainer>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    as="textarea"
                    placeholder="Describe your experience, report a bug, or suggest a new feature..."
                    id="message"
                    disabled={isSubmitting}
                    {...register('message', { required: 'Message content is required' })}
                  />
                  {errors.message && <ErrorMessage>{errors.message.message as string}</ErrorMessage>}
                </FormGroup>

                <Button as="button" type="submit" disabled={isSubmitting} style={{ width: '100%' }}>
                  {isSubmitting ? 'Sending Feedback...' : 'Submit Feedback'}
                </Button>
              </Form>
            )}
          </Card>

          {/* Right Column: Support & Donation Channels */}
          <RightColumn>
            {/* UPI Donation Card */}
            <DonateCard>
              <DonateBadge>India Payments</DonateBadge>
              <CardTitle>UPI Direct Donation</CardTitle>
              <CardDescription>
                Scan the QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) to support local deployment nodes.
              </CardDescription>
              <QrContainer>
                <QrCodeImage src={qrCodeApiUrl} alt="UPI Payment QR Code" />
              </QrContainer>
              <UpiDetails>
                <VpaLabel>UPI VPA ID:</VpaLabel>
                <VpaCode>{upiId}</VpaCode>
              </UpiDetails>
            </DonateCard>

            {/* International Donation Card */}
            <DonateCard>
              <DonateBadge>International Support</DonateBadge>
              <CardTitle>Global Creators Support</CardTitle>
              <CardDescription>
                Help cover our domain maintenance and edge hosting costs via QR scan or direct checkout links.
              </CardDescription>

              <QrContainer>
                <QrCodeImage src="/paypal-qr.png" alt="PayPal Payment QR Code" />
              </QrContainer>

              <SupportButtonsGroup>
                <KofiButton href="https://ko-fi.com/rebelroot" target="_blank" rel="noopener noreferrer">
                  <KofiIcon>☕</KofiIcon> Buy us a Ko-fi
                </KofiButton>

                <PayPalButton href="https://www.paypal.com/ncp/payment/A867TKRQ8EKRE" target="_blank" rel="noopener noreferrer">
                  <PayPalIcon>💳</PayPalIcon> Support on PayPal
                </PayPalButton>
              </SupportButtonsGroup>
            </DonateCard>
          </RightColumn>
        </ContentGrid>
      </Wrapper>
    </Page>
  );
}

/* ─── Styled Components ─── */

const Wrapper = styled(Container)`
  padding-top: 8rem;
  padding-bottom: 12rem;
`;

const HeaderContainer = styled.div`
  text-align: center;
  max-width: 80rem;
  margin: 0 auto 6rem auto;
`;

const Subtitle = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  opacity: 0.8;
  margin-top: 2rem;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: start;

  ${media('<=desktop')} {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgb(var(--cardBackground));
  border: 1px solid rgba(var(--text), 0.15);
  border-radius: 1.6rem;
  padding: 4rem;
  box-shadow: 0 10px 35px -10px rgba(0, 0, 0, 0.15);

  ${media('<=tablet')} {
    padding: 3rem;
  }
`;

const CardTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
`;

const CardDescription = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  opacity: 0.7;
  margin-bottom: 3rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const DonateCard = styled(Card)`
  position: relative;
  overflow: hidden;
`;

const DonateBadge = styled.span`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(var(--primary), 0.1);
  color: rgb(var(--primary));
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.4rem 1.2rem;
  border-radius: 2rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const QrContainer = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 1.2rem;
  display: inline-block;
  align-self: center;
  margin: 1rem auto 2.5rem auto;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: center;
  width: fit-content;
`;

const QrCodeImage = styled.img`
  width: 20rem;
  height: 20rem;
  display: block;
`;

const UpiDetails = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: rgba(var(--text), 0.03);
  padding: 1.2rem 2rem;
  border-radius: 0.8rem;
  border: 1px dashed rgba(var(--text), 0.1);
`;

const VpaLabel = styled.span`
  font-weight: 600;
  font-size: 1.4rem;
  opacity: 0.6;
`;

const VpaCode = styled.code`
  font-family: monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(var(--primary));
`;

/* Buttons */
const SupportButtonsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BaseSupportButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: var(--shadow-sm);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const KofiButton = styled(BaseSupportButton)`
  background: #ff5e5b;
  color: #ffffff;

  &:hover {
    background: #ff4744;
  }
`;

const KofiIcon = styled.span`
  font-size: 2rem;
`;

const PayPalButton = styled(BaseSupportButton)`
  background: #0070ba;
  color: #ffffff;

  &:hover {
    background: #005ea6;
  }
`;

const PayPalIcon = styled.span`
  font-size: 2rem;
`;

/* Form Components */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 600;
  opacity: 0.8;
`;

const Select = styled.select`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--text), 0.15);
  background: rgb(var(--secondBackground));
  color: rgb(var(--text));
  font-size: 1.5rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: rgb(var(--primary));
  }

  option {
    background: rgb(var(--secondBackground));
    color: rgb(var(--text));
  }
`;

const Textarea = styled(Input)`
  width: 100%;
  min-height: 14rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  resize: vertical;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StarButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  font-size: 3.5rem;
  cursor: pointer;
  color: ${(props) => (props.active ? '#FFD700' : 'rgba(var(--text), 0.15)')};
  transition: color 0.15s ease;
  line-height: 1;

  &:hover {
    transform: scale(1.1);
  }
`;

const ErrorMessage = styled.p`
  color: rgb(var(--errorColor));
  font-size: 1.4rem;
`;

const SuccessState = styled.div`
  text-align: center;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  h3 {
    font-size: 2.4rem;
    font-weight: 800;
  }

  p {
    font-size: 1.6rem;
    opacity: 0.7;
    line-height: 1.6;
    max-width: 32rem;
  }
`;

const SuccessIcon = styled.div`
  font-size: 6rem;
  animation: pop 0.4s ease;

  @keyframes pop {
    0% { transform: scale(0.5); }
    100% { transform: scale(1); }
  }
`;
