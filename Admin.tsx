import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AdminPaymentSettings from '@/components/AdminPaymentSettings';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [submissionCount, setSubmissionCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin-login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const storedSubmissions = localStorage.getItem('form_submissions_count');
    setSubmissionCount(storedSubmissions ? parseInt(storedSubmissions) : 0);
  }, []);

  return (
    <>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">Payment Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Overview of activity</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Total form submissions: {submissionCount}</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <AdminPaymentSettings />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
