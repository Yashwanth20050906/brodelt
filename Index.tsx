
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UserForm from '@/components/UserForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <Features />
        
        {/* Contact Section */}
        <section id="contact" className="section-padding bg-secondary">
          <div className="container mx-auto container-padding">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full mb-4">
                Get Started
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Request Your Personalized Consultation
              </h2>
              <p className="text-muted-foreground">
                Fill out the form below to connect with our fitness experts. After submission, you'll complete a payment of ₹25 to initiate your consultation.
              </p>
            </div>
            
            <UserForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
