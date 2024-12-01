import { useState } from 'react';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
    age: '',
    gender: '',
    expertise: '',
    qualification: '',
    workHours: { start: '', end: '' },
    experience: '',
    consultationFee: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let registrationData;
      
      if (formData.userType === 'client') {
        // Format data for client registration
        registrationData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profileData: {
            age: Number(formData.age),
            Gender: formData.gender,
            history: []
          }
        };
      } else {
        // Format data for therapist registration
        const expertiseArray = formData.expertise ? formData.expertise.split(',').map(item => item.trim()) : [];
        
        registrationData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profileData: {
            expertise: expertiseArray,
            qualification: formData.qualification,
            availability: {
              online: false,
              workHours: {
                start: formData.workHours.start,
                end: formData.workHours.end
              }
            },
            approvalStatus: 'Pending',
            experience: Number(formData.experience),
            consultationFee: Number(formData.consultationFee)
          }
        };
      }

      // Log the request data
      console.log('Sending registration data:', registrationData);

      const endpoint = formData.userType === 'client' 
        ? 'http://localhost:5000/clients/register'
        : 'http://localhost:5000/therapists/register';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const data = await response.json();
      console.log('Response:', data); // Log the response

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Registration successful:', data);
      navigate('/login');

    } catch (err) {
      console.error('Registration error:', err); // Log any errors
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (e) => {
    e.preventDefault(); // Prevent form submission
    // Validate first step fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError(''); // Clear any existing errors
    setIsNextClicked(true);
  };

  const renderInitialFields = () => (
    <div className="rounded-md space-y-4">
      {/* Name */}
      <div>
        <label htmlFor="name" className="sr-only">Full name</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Full name"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="sr-only">Email address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="appearance-none rounded-lg relative block w-full pl-10 pr-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
            placeholder="Confirm password"
          />
        </div>
      </div>

      {/* User Type Selection */}
      <div>
        <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
          I am a
        </label>
        <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
        >
          <option value="client">Client seeking therapy</option>
          <option value="therapist">Licensed therapist</option>
        </select>
      </div>
    </div>
  );

  const renderTherapistFields = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
      
      <div>
        <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">
          Expertise (separate with commas)
        </label>
        <input
          id="expertise"
          name="expertise"
          type="text"
          value={formData.expertise}
          onChange={handleChange}
          className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          placeholder="e.g., Depression, Anxiety, Stress Management"
        />
      </div>

      <div>
        <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">
          Qualification
        </label>
        <input
          id="qualification"
          name="qualification"
          type="text"
          value={formData.qualification}
          onChange={handleChange}
          className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          placeholder="Qualification"
        />
      </div>

      <div>
        <label htmlFor="workHours" className="block text-sm font-medium text-gray-700">
          Availability (Work Hours)
        </label>
        <div className="flex gap-2">
          <input
            id="workHoursStart"
            name="workHoursStart"
            type="time"
            value={formData.workHours.start}
            onChange={(e) => setFormData({
              ...formData,
              workHours: { ...formData.workHours, start: e.target.value }
            })}
            className="mt-1 appearance-none rounded-lg relative block w-1/2 px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
          <input
            id="workHoursEnd"
            name="workHoursEnd"
            type="time"
            value={formData.workHours.end}
            onChange={(e) => setFormData({
              ...formData,
              workHours: { ...formData.workHours, end: e.target.value }
            })}
            className="mt-1 appearance-none rounded-lg relative block w-1/2 px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
          Experience (years)
        </label>
        <input
          id="experience"
          name="experience"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          placeholder="Experience"
        />
      </div>

      <div>
        <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700">
          Consultation Fee
        </label>
        <input
          id="consultationFee"
          name="consultationFee"
          type="number"
          value={formData.consultationFee}
          onChange={handleChange}
          className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          placeholder="Consultation Fee"
        />
      </div>
    </div>
  );

  const renderClientFields = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
          placeholder="Your age"
        />
      </div>

      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-say">Prefer not to say</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isNextClicked ? 'Complete Your Profile' : 'Create your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isNextClicked ? 'Please provide your personal details' : 'Join WellMind and start your wellness journey'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-50">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {!isNextClicked ? (
            renderInitialFields()
          ) : (
            formData.userType === 'therapist' ? renderTherapistFields() : renderClientFields()
          )}

          <div className="flex gap-4">
            {isNextClicked && (
              <button
                type="button"
                onClick={() => setIsNextClicked(false)}
                className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Back
              </button>
            )}
            {!isNextClicked ? (
              <button
                type="button"
                onClick={handleNext}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </form>

        {!isNextClicked && (
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-teal-600 hover:text-teal-500">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;
