import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';

export default function MocOfficePrivacyPolicyPage() {
  return (
    <Page
      title="Privacy Policy &amp; Data Safety | MOC OFFICE"
      description="MOC OFFICE is built on a strict privacy-first, on-device-first architecture. Read our full data safety declarations and Google Play Safety disclosures."
    >
      <PrivacyPolicyContainer>
        <RichText>
          <MetaDataBlock>
            <p><strong>Last Updated:</strong> August 16, 2026</p>
            <p><strong>Publisher:</strong> RebelRoot</p>
            <p><strong>App Name:</strong> MOC OFFICE</p>
            <p><strong>Package Name:</strong> <code>com.rebelroot.mocoffice</code></p>
          </MetaDataBlock>

          <IntroParagraph>
            This document sets forth the Privacy Policy and Data Security disclosures for MOC OFFICE. MOC OFFICE is engineered on an offline-first, privacy-by-design architecture. The application does not collect, monitor, track, store, or sell any personal data, document content, or usage telemetry.
          </IntroParagraph>

          <hr />

          <h2>1. Privacy Policy &amp; Architectural Commitments</h2>

          <h3>1.1 Zero Telemetry, Analytics, and Tracking</h3>
          <ul>
            <li>
              <strong>No Telemetry SDKs:</strong> MOC OFFICE contains no third-party tracking libraries, advertising networks, device fingerprinting code, or background telemetry services (such as Firebase Analytics, Adjust, or AppsFlyer).
            </li>
            <li>
              <strong>No Remote Document Ingestion:</strong> Your documents (PDF, Word, Excel, PowerPoint) are processed, rendered, edited, and saved entirely on your local device. RebelRoot operates no remote backend servers or databases that store your document files.
            </li>
            <li>
              <strong>Local-First Storage:</strong> Recent file indices, favorite markers, bookmarks, reading themes, and user preferences reside exclusively within Android internal app storage on your physical device.
            </li>
          </ul>

          <h3>1.2 AI Processing and Data Transmission Disclosures</h3>
          <p>
            MOC OFFICE provides both on-device and optional cloud-based Artificial Intelligence features for document summarization, extraction, and interactive analysis:
          </p>
          <ul>
            <li>
              <strong>Local On-Device Inference:</strong> When utilizing local AI mode on supported 64-bit devices, inference runs directly through our embedded native engine (LLaMA.cpp). No document text or prompts ever leave your device.
            </li>
            <li>
              <strong>User-Initiated Cloud AI:</strong> When you choose to utilize Cloud AI services (such as Google Gemini, Groq, OpenRouter, Cerebras, or Mistral), the application transmits only the specific text excerpt or document context explicitly selected for that request directly to the chosen AI provider API.
            </li>
            <li>
              <strong>No Model Training:</strong> Document contents sent via standard API integrations are processed for single-turn inference responses and are not retained or utilized to train public foundation models.
            </li>
            <li>
              <strong>Secure API Key Storage:</strong> All user-provided API keys are encrypted client-side using Android Keystore and Jetpack Security Preferences. Keys are never transmitted to RebelRoot.
            </li>
          </ul>

          <h3>1.3 Android Permissions &amp; Data Safety Declarations</h3>
          <p>
            MOC OFFICE requests permissions strictly required to execute core document viewing, editing, and utility functions:
          </p>

          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Functional Purpose</th>
                  <th>Data Safety &amp; Scope Context</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>INTERNET</strong></td>
                  <td>Enables user-initiated requests to Cloud AI providers (Gemini, Groq, etc.) and checking for software updates.</td>
                  <td>No background network polling, telemetry, or document uploads occur. Operates on HTTPS only.</td>
                </tr>
                <tr>
                  <td><strong>MANAGE_EXTERNAL_STORAGE</strong><br />(Android 11+)</td>
                  <td>Enables discovering, indexing, opening, and saving PDF and Office documents across user storage.</td>
                  <td>Required for full document management functionality. File access is limited to document reading and writing operations initiated by the user.</td>
                </tr>
                <tr>
                  <td><strong>READ_EXTERNAL_STORAGE</strong> &amp;<br /><strong>WRITE_EXTERNAL_STORAGE</strong><br />(Android 10 &amp; below)</td>
                  <td>Legacy file read and write operations for opening and saving documents.</td>
                  <td>Operates on user-selected files only with Scoped Storage compatibility.</td>
                </tr>
                <tr>
                  <td><strong>REQUEST_INSTALL_PACKAGES</strong></td>
                  <td>Allows installing application updates when downloaded directly by the user.</td>
                  <td>Only invoked when the user explicitly triggers an in-app software update.</td>
                </tr>
              </tbody>
            </StyledTable>
          </TableWrapper>

          <h3>1.4 Open Source Engine &amp; Third-Party Libraries</h3>
          <p>
            MOC OFFICE utilizes industry-standard open-source libraries to deliver high-performance document handling:
          </p>
          <ul>
            <li>
              <strong>PDF.js &amp; iText 7:</strong> Used for standards-compliant PDF parsing, vector rendering, text extraction, and non-destructive in-place editing. All processing is 100% on-device.
            </li>
            <li>
              <strong>Apache POI:</strong> Used for local parsing and manipulation of Microsoft Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) file structures.
            </li>
            <li>
              <strong>LLaMA.cpp:</strong> High-performance C++ engine for private, offline on-device neural network execution.
            </li>
            <li>
              <strong>Google ML Kit (Offline Mode):</strong> Optical Character Recognition (OCR) operates purely using local on-device models without network calls.
            </li>
          </ul>

          <h3>1.5 Data Retention and Deletion</h3>
          <p>
            Because RebelRoot does not store or process your documents on remote servers:
          </p>
          <ul>
            <li>You retain complete, unrestricted ownership and custody of all files.</li>
            <li>Deleting a file within the application permanently removes the physical file from your device storage.</li>
            <li>Uninstalling MOC OFFICE removes all associated application settings, cache, and local preferences immediately.</li>
          </ul>

          <hr />

          <h2>2. Technical Security Implementations</h2>
          <ol>
            <li>
              <strong>Byte-Level Truncation &amp; Non-Destructive Saving:</strong> In-place PDF saves employ atomic file replacement and strict byte-level truncation protocols to eliminate file corruption risks.
            </li>
            <li>
              <strong>Keystore-Backed Cryptography:</strong> All sensitive configurations and credentials remain protected behind hardware-backed encryption keys (TEE/StrongBox).
            </li>
            <li>
              <strong>R8 Optimization &amp; Log Stripping:</strong> Release production binaries undergo comprehensive ProGuard and R8 bytecode optimization, stripping debug logging, exception stack traces, and internal identifiers.
            </li>
            <li>
              <strong>No Cleartext Network Traffic:</strong> Network security configurations strictly forbid cleartext HTTP transmissions.
            </li>
          </ol>

          <hr />

          <h2>3. Contact Information</h2>
          <p>
            For questions, security audits, or inquiries regarding this Privacy Policy and Data Safety declaration, please contact:
          </p>
          <ul>
            <li><strong>Organization:</strong> RebelRoot</li>
            <li><strong>Website:</strong> <a href="https://rebelroot.xyz" target="_blank" rel="noopener noreferrer">https://rebelroot.xyz</a></li>
            <li><strong>Email:</strong> <a href="mailto:support@rebelroot.xyz">support@rebelroot.xyz</a></li>
            <li><strong>Repository:</strong> <a href="https://github.com/rebelroot" target="_blank" rel="noopener noreferrer">https://github.com/rebelroot</a></li>
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

const MetaDataBlock = styled.div`
  background: rgb(var(--secondBackground));
  padding: 2rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(var(--text), 0.08);
  margin-bottom: 3rem;
  
  p {
    margin: 0.5rem 0;
    font-size: 1.6rem;
  }
`;

const IntroParagraph = styled.p`
  font-size: 2rem;
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 500;
  margin-bottom: 3rem;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 3rem 0;
  border: 1px solid rgba(var(--text), 0.08);
  border-radius: 0.8rem;
`;

const StyledTable = styled.table`
  width: 100% !important;
  border-collapse: collapse !important;
  font-size: 1.5rem;

  th, td {
    padding: 1.5rem 2rem !important;
    border: 1px solid rgba(var(--text), 0.08) !important;
    text-align: left;
    vertical-align: top;
  }

  tr:nth-child(even) {
    background: rgba(var(--text), 0.04) !important;
  }

  tr:nth-child(odd) {
    background: transparent !important;
  }

  th {
    background: rgba(var(--secondary), 0.2) !important;
    font-weight: bold;
    color: rgb(var(--text)) !important;
  }

  tr:last-child td {
    border-bottom: 1px solid rgba(var(--text), 0.08) !important;
  }
  
  td:first-child {
    font-weight: bold;
    white-space: nowrap;
  }
`;
