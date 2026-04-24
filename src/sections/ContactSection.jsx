import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import ActionButton from '../components/ActionButton.jsx';
import ScrollReveal from '../ScrollReveal.jsx';
import { portfolioContent } from '../content/portfolioContent.js';

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
    <footer className="content-section contact-section !pb-0" id="contact">
      <ScrollReveal className="contact-centered-shell" delay={0.06}>
        <div className="contact-centered-copy">
          <p className="section-eyebrow">Contact</p>
          <h2 className="contact-title">{contact.heading}</h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            {contact.body}
          </p>

          <div className="contact-quick-actions">
            <ActionButton className="button-secondary" href={`mailto:${contact.email}`}>
              <FaEnvelope aria-hidden="true" />
              Email Me
            </ActionButton>
            {socials.map((social) => {
              const Icon = iconMap[social.icon];

              return (
                <ActionButton
                  className="button-secondary"
                  href={social.href}
                  key={social.platform}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon aria-hidden="true" />
                  {social.platform}
                </ActionButton>
              );
            })}
          </div>
        </div>

        <div className="contact-form-shell" onPointerMove={onSpotlight}>
          <form action={contact.formAction} className="contact-form" method="POST" onSubmit={onFormSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="field">
                <span>Name</span>
                <input autoComplete="name" name="name" placeholder="Your name" required type="text" />
              </label>
              <label className="field">
                <span>Email</span>
                <input autoComplete="email" name="email" placeholder="you@example.com" required type="email" />
              </label>
            </div>

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
        </div>
      </ScrollReveal>

      <div className="mt-12 flex w-full flex-col items-center justify-center gap-2 border-t border-white/10 pb-2 pt-6">
        <p className="flex flex-wrap items-center justify-center gap-1.5 text-sm font-medium tracking-wide text-gray-400 transition-colors hover:text-gray-300 md:text-base">
          <span className="text-accent">&copy;</span>
          <span>{portfolioContent.footer.year}</span>
          <span className="hidden text-gray-600 md:inline">|</span>
          <span>{portfolioContent.footer.text}</span>
          <span className="align-super text-xs text-gray-500">&reg;</span>
        </p>
        <p className="text-xs text-gray-600">All rights reserved.</p>
      </div>
    </footer>
  );
}

export default ContactSection;
