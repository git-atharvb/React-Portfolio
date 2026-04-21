import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';
import ScrollReveal from '../ScrollReveal.jsx';

const iconMap = {
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
};

function ContactSection({ contact, formStatus, onFormSubmit, onSpotlight, socials }) {
  const statusMap = {
    idle: { className: '', message: 'Tell me a little about the role, project, or idea.' },
    submitting: { className: 'is-pending', message: 'Sending your message...' },
    success: { className: 'is-success', message: contact.successMessage },
    error: { className: 'is-error', message: contact.errorMessage },
  };
  const activeStatus = statusMap[formStatus];

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-shell">
        <ScrollReveal className="contact-grid">
          <section className="panel contact-copy" onPointerMove={onSpotlight}>
            <p className="section-eyebrow">Contact</p>
            <h2>{contact.heading}</h2>
            <p>{contact.body}</p>
            <a className="contact-email" href={`mailto:${contact.email}`}>
              <FaEnvelope aria-hidden="true" />
              {contact.email}
            </a>
            <div className="social-row" role="list" aria-label="Social links">
              {socials.map((social) => {
                const Icon = iconMap[social.icon];

                return (
                  <ActionButton
                    className="social-button"
                    href={social.href}
                    key={social.platform}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden="true" />
                    <span>{social.platform}</span>
                  </ActionButton>
                );
              })}
            </div>
          </section>

          <section className="panel contact-form-panel" onPointerMove={onSpotlight}>
            <form action={contact.formAction} className="contact-form" method="POST" onSubmit={onFormSubmit}>
              <label className="field">
                <span>Name</span>
                <input autoComplete="name" name="name" placeholder="Your name" required type="text" />
              </label>
              <label className="field">
                <span>Email</span>
                <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
              </label>
              <label className="field">
                <span>Message</span>
                <textarea name="message" placeholder="Tell me about the opportunity or idea." required rows="5" />
              </label>
              <div aria-live="polite" className={`form-status ${activeStatus.className}`} role="status">
                {activeStatus.message}
              </div>
              <ActionButton
                className="button-primary submit-button"
                disabled={formStatus === 'submitting'}
                type="submit"
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send message'}
              </ActionButton>
            </form>
          </section>
        </ScrollReveal>
      </div>
    </footer>
  );
}

export default ContactSection;
