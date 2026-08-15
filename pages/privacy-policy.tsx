import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';

export default function PrivacyPolicyPage() {
  return (
    <Page title="Privacy Policy" description="Read the official RebelRoot Privacy Policy. Learn how our zero-telemetry and local-first architecture protects your personal data across all products.">
      <PrivacyPolicyContainer>
        <RichText>
          <h2>Our Commitment to Privacy</h2>
          <p>
            RebelRoot is an independent, developer-led collective. We design all of our software around a core principle: <strong>digital sovereignty</strong>. We believe that your data belongs entirely to you. Consequently, we maintain a strict stance on user privacy.
          </p>

          <h3>1. Zero Telemetry & Tracking</h3>
          <p>
            None of our applications (including MOC OFFICE, Omni Browser, MOCNovel, and CampCart) contain hidden analytics trackers, crash-reporting SDKs, or background telemetry. We do not inspect, log, aggregate, or sell your document contents, browsing history, read lists, search queries, or transaction items.
          </p>

          <h3>2. Local-First Storage & Offline AI</h3>
          <p>
            By default, all user data—such as documents, annotations, bookmarks, reading history, shopping carts, and logs—is stored directly on your physical device. For productivity tools like MOC OFFICE, document manipulation, PDF conversions, and local AI summarization run completely on-device without remote data ingestion.
          </p>

          <h3>3. Optional End-to-End Encrypted Synchronization & Cloud AI</h3>
          <p>
            If you choose to use our synchronization features or user-initiated Cloud AI capabilities, data is transmitted strictly per request using secure HTTPS endpoints and encrypted with industry-standard cryptographic keys. RebelRoot servers never inspect, store, or train models on your private documents.
          </p>

          <h3>4. Open Source Verification & Product-Specific Policies</h3>
          <p>
            Since all of our codebases are open source under permissive licenses, you can inspect the compile scripts, review network call configurations, and verify these claims independently. For detailed permissions and data safety disclosures per application, please refer to our product policies:
          </p>
          <ul>
            <li><a href="/mocoffice/privacy-policy">MOC OFFICE Privacy Policy &amp; Data Safety</a></li>
            <li><a href="/omnibrowser/privacy-policy">Omni Browser Privacy Policy &amp; Data Safety</a></li>
          </ul>

        </RichText>
      </PrivacyPolicyContainer>
    </Page>
  );
}

const PrivacyPolicyContainer = styled.div`
  max-width: 90rem;
  margin: auto;
  overflow-x: auto;
`;
