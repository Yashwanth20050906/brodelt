
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar } from 'lucide-react';

const Success = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto container-padding">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-primary/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Your fitness consultation request has been submitted successfully.
            </p>
            
            <div className="glass-card rounded-xl p-8 mb-8 text-left">
              <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <span className="mr-3 text-primary font-bold">1.</span>
                  <p>Our admin team will review your consultation request within 24 hours.</p>
                </li>
                <li className="flex">
                  <span className="mr-3 text-primary font-bold">2.</span>
                  <p>Your request will be assigned to a trainer who specializes in your specific fitness goals.</p>
                </li>
                <li className="flex">
                  <span className="mr-3 text-primary font-bold">3.</span>
                  <p>The trainer will contact you via WhatsApp or our website's messaging system to schedule your consultation.</p>
                </li>
                <li className="flex">
                  <span className="mr-3 text-primary font-bold">4.</span>
                  <p>You'll receive a detailed fitness plan based on your consultation.</p>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/">
                  Return to Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full" asChild>
                <a href="#" className="inline-flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Check Appointment Status
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Success;
