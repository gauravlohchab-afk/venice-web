import { LegalPage } from '../components/ui/LegalPage'
import { site } from '../data/site'

// Describes what this website actually does with visitor data (checked against the code in
// November 2026). It replaces the WordPress default policy carried over from the old site.
// The clinic should review the wording before launch.
export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="11 November 2026"
      intro={
        <p>
          This policy explains what information {site.name} collects through this website, why we collect it and how you can contact us about it.
        </p>
      }
      sections={[
        {
          heading: 'Who we are',
          body: (
            <p>
              {site.name}, {site.address.line1}, {site.address.line2}. You can reach us at{' '}
              <a className="link-underline text-ink" href={`mailto:${site.email}`}>{site.email}</a> or{' '}
              <a className="link-underline text-ink" href={site.phone.href}>{site.phone.display}</a>.
            </p>
          ),
        },
        {
          heading: 'Information we collect',
          body: (
            <>
              <p>We only collect information you choose to send us through the forms on this website:</p>
              <ul>
                <li>Booking requests: your name, email address, phone number, age, preferred date and time, the treatment you are interested in and your preferred payment method.</li>
                <li>Consultation requests: your name, email address, phone number, the treatment you are interested in and any message you add.</li>
                <li>Contact form: your name, email address, phone number, the treatment you are interested in (or a general enquiry) and your message.</li>
              </ul>
              <p>With every request we also record which page of the website it was sent from.</p>
            </>
          ),
        },
        {
          heading: 'How we use it',
          body: (
            <p>
              We use your details to reply to your request, arrange and confirm appointments and answer questions about our treatments. We do not sell your information or share it with anyone for marketing.
            </p>
          ),
        },
        {
          heading: 'Where it is stored',
          body: (
            <p>
              Requests from all forms are sent over an encrypted connection to the system our team uses to manage enquiries and appointments. Only clinic staff who handle your request can see them.
            </p>
          ),
        },
        {
          heading: 'Cookies and tracking',
          body: (
            <p>
              This website does not use analytics, advertising trackers or its own cookies, and it has no user accounts.
            </p>
          ),
        },
        {
          heading: 'Third-party services',
          body: (
            <>
              <p>Some parts of the website are provided by other companies, which may receive your IP address when the page loads:</p>
              <ul>
                <li>Google Fonts, for the typefaces used on the site.</li>
                <li>Google Maps, for the map on our Contact page.</li>
              </ul>
              <p>Links to Facebook, Instagram and Messenger take you to those services, which have their own privacy policies.</p>
            </>
          ),
        },
        {
          heading: 'How long we keep it',
          body: <p>We keep your details only for as long as we need them to respond to your request and manage your appointments, or as long as the law requires.</p>,
        },
        {
          heading: 'Your rights',
          body: (
            <p>
              Under the Philippine Data Privacy Act of 2012, you can ask to see the information we hold about you, have it corrected or have it deleted. Email{' '}
              <a className="link-underline text-ink" href={`mailto:${site.email}`}>{site.email}</a> or call{' '}
              <a className="link-underline text-ink" href={site.phone.href}>{site.phone.display}</a> and we will help.
            </p>
          ),
        },
      ]}
    />
  )
}
