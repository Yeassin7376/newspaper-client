import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAxios from '../../hooks/useAxios';

const Login = () => {
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstant = useAxios();
  const from = location.state?.from || '/';
  // console.log(location)

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    signIn(data.email, data.password)
      .then(async (result) => {
        // console.log(result.user);
        const userInfo = {
          email: result.user.email
        };
        await axiosInstant.post('/users', userInfo);
        // console.log(res);
        toast.success('User login successful');
        navigate(from);
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.code);
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Welcome Back</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
            {errors.email?.type === 'required' && <p className="text-red-500">Email is Required</p>}

            <label className="label">Password</label>
            <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
            {errors.password?.type == 'required' && <p className="text-red-500">Password is Required</p>}
            {errors.password?.type == 'minLength' && <p className="text-red-500">Password must be longer then 6 characters</p>}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-primary text-black mt-4">Login</button>
            <div>
              <p>
                <small className="text-gray-600 md:font-medium md:text-sm">
                  Don't have an account ? Please{' '}
                  <Link to="/register" state={{ from }} className="btn btn-link p-0">
                    Register
                  </Link>
                </small>
              </p>
            </div>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
