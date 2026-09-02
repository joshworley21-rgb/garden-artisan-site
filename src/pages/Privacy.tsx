import Seo from '@/components/Seo';
import PageLayout from '@/components/PageLayout';

const Privacy = () => (
  <>
    <Seo
      title="Privacy Policy | JW Garden Services"
      description="How JW Garden Services collects, uses and protects the information you send through our enquiry form."
      path="/privacy"
    />
    <PageLayout eyebrow="Legal" title="Privacy policy">
      <section className="section-tight">
        <div className="wrap max-w-measure space-y-8 text-pretty text-[1.0625rem] text-stone">
        <p>
          JW Garden Services respects your privacy. This policy explains what information we
          collect when you contact us and how we use it.
        </p>
        <div>
          <h2 className="display-3 mb-3 text-ink">
            Information we collect
          </h2>
          <p>
            When you submit our enquiry form we collect your name, email address, phone number
            and the details of your message. We use this solely to respond to your enquiry and
            to provide the services you ask about.
          </p>
        </div>
        <div>
          <h2 className="display-3 mb-3 text-ink">
            How we use your information
          </h2>
          <p>
            We never sell or share your details with third parties for marketing. We keep
            enquiry records only for as long as needed to quote for and carry out work.
          </p>
        </div>
        <div>
          <h2 className="display-3 mb-3 text-ink">
            Your rights
          </h2>
          <p>
            You can ask us at any time to see, correct or delete the information we hold about
            you. Contact us and we'll action your request promptly.
          </p>
        </div>
        </div>
      </section>
    </PageLayout>
  </>
);

export default Privacy;