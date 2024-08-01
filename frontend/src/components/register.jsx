import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, password }));
    navigate("/")
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
            {error && <p className="text-error mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
