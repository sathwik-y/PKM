import React, { useState } from 'react';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate,useLocation } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email:'',
    password: '',
    confirmPassword: ''
  });
  const [error,setError] = useState('');
  const [successMessage,setSuccessMessage]  = useState('');
  const {login,register} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!isLogin) {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
    }

  if(isLogin){
    const success = await(login(username,password));
    if(success){
      setFormData({
        username: '',
        email:'',
        password: '',
        confirmPassword: ''
      });
      setSuccessMessage('');
      navigate(from,{replace:true});

    }else{
      alert('Login failed!')
    }
  }else{
      try{
        const success = await register(username,email,password);
        if(success){
          setFormData({
            username: '',
            email:'',
            password: '',
            confirmPassword: ''
          });
          setError('');
          setSuccessMessage('Registration Successful! Please log in.');
          setIsLogin(true);
        }
      }catch(err){
        setError('Signup Failed: '+err.message);
      }
  }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccessMessage('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className='error-message'>{error}</div>}
        {successMessage && <div className='success-message'>{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
            {!isLogin&&(
              <div className='form-group'>
                <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              </div>
            )}
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <button type="submit" className="btn login-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-form">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            className="toggle-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};
export default Login;
