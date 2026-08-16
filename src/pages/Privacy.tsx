import PageLayout from '@/components/PageLayout';

const Privacy = () => (
  <PageLayout eyebrow="Legal" title="Privacy Policy">
    <section className="section-padding bg-background">
      <div className="container-wide max-w-3xl font-body text-muted-foreground leading-relaxed space-y-6">
        <p>
          JW Garden Services respects your privacy. This policy explains what information we
          collect when you contact us and how we use it.
        </p>
        <div>
          <h2 className="font-heading text-2xl text-foreground font-semibold mb-3">
            Information we collect
          </h2>
          <p>
            When you submit our enquiry form we collect your name, email address, phone number
            and the details of your message. We use this solely to respond to your enquiry and
            to provide the services you ask about.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl text-foreground font-semibold mb-3">
            How we use your information
          </h2>
          <p>
            We never sell or share your details with third parties for marketing. We keep
            enquiry records only for as long as needed to quote for and carry out work.
          </p>
        </div>
        <div>
          <h2 className="font-heading text-2xl text-foreground font-semibold mb-3">
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
);

export default Privacy;