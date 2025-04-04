
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { UserFormData } from '@/utils/types';

const UserForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    fitnessLevel: '',
    healthIssues: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.fitnessGoal) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // Store form data in session storage to use it in payment page
      sessionStorage.setItem('userFormData', JSON.stringify(formData));
      
      // Navigate to payment page
      navigate('/payment');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="glass-card border-0 w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Request Fitness Consultation</CardTitle>
        <CardDescription>
          Fill out the form below to connect with our expert trainers. After submission, you'll be directed to a payment page.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                className="glass-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                className="glass-input"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                className="glass-input"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="25"
                className="glass-input"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                name="height"
                placeholder="175"
                className="glass-input"
                value={formData.height}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                name="weight"
                placeholder="70"
                className="glass-input"
                value={formData.weight}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fitnessGoal">Fitness Goal <span className="text-destructive">*</span></Label>
              <Select 
                onValueChange={(value) => handleSelectChange('fitnessGoal', value)}
                required
              >
                <SelectTrigger id="fitnessGoal" className="glass-input">
                  <SelectValue placeholder="Select a goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weightLoss">Weight Loss</SelectItem>
                  <SelectItem value="muscleGain">Muscle Gain</SelectItem>
                  <SelectItem value="toning">Toning</SelectItem>
                  <SelectItem value="endurance">Endurance</SelectItem>
                  <SelectItem value="flexibility">Flexibility</SelectItem>
                  <SelectItem value="overall">Overall Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fitnessLevel">Fitness Level</Label>
              <Select 
                onValueChange={(value) => handleSelectChange('fitnessLevel', value)}
              >
                <SelectTrigger id="fitnessLevel" className="glass-input">
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="healthIssues">Any Health Issues or Injuries?</Label>
            <Textarea
              id="healthIssues"
              name="healthIssues"
              placeholder="Please mention any health concerns or previous injuries..."
              className="glass-input min-h-[80px]"
              value={formData.healthIssues}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Your Fitness Challenge or Query <span className="text-destructive">*</span></Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe your fitness challenge or what specific advice you're looking for..."
              className="glass-input min-h-[120px]"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between flex-col sm:flex-row gap-4">
        <p className="text-sm text-muted-foreground">
          Required fields are marked with <span className="text-destructive">*</span>
        </p>
        <Button 
          type="submit" 
          size="lg" 
          className="rounded-full"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Processing..." : "Continue to Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserForm;
