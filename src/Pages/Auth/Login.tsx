import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { ROUTES } from '../../Constants';
import { useAuthStore } from '../../Store/useAuthStore';
import { CommonButton, CommonInput } from '../../Attributes';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore(state => state.login);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            login({
                id: '1',
                name: 'Admin User',
                email: values.email,
                role: 'admin',
                avatar: '/assets/Images/female_profile_avatar.png'
            });
            setIsLoading(false);
            navigate(ROUTES.DASHBOARD, { replace: true });
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="auth-card"
        >
            <div className="flex items-center justify-center gap-3 mb-8">
                <img src="/assets/Images/Book-Logo.png" alt="Readora" className="h-10 w-auto object-contain" />
                <span className="text-2xl font-bold text-primary-text tracking-wide">Readora</span>
            </div>
            
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-primary-text mb-2">Welcome Back</h1>
                <p className="text-secondary-text">Sign in to your admin account</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-primary-text ml-1">Email</label>
                    <CommonInput
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        prefix={<FiMail className="text-placeholder" />}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger text-sm mt-1 ml-1">{formik.errors.email}</div>
                    ) : null}
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-primary-text ml-1">Password</label>
                    <div className="relative">
                        <CommonInput
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            prefix={<FiLock className="text-placeholder" />}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="ebm-input pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-placeholder hover:text-primary-text transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger text-sm mt-1 ml-1">{formik.errors.password}</div>
                    ) : null}
                </div>

                <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer text-primary-text group">
                        <input
                            type="checkbox"
                            name="rememberMe"
                            checked={formik.values.rememberMe}
                            onChange={formik.handleChange}
                            className="w-4 h-4 rounded border-border-color text-sidebar-active focus:ring-sidebar-active bg-inputbox-bg transition-colors"
                        />
                        <span className="group-hover:text-accent transition-colors">Remember me</span>
                    </label>
                    <a href="#" className="text-sidebar-active hover:text-accent font-medium transition-colors">
                        Forgot Password?
                    </a>
                </div>

                <CommonButton
                    type="submit"
                    className="bg-sidebar-active text-white w-full justify-center h-12 text-base font-semibold hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                </CommonButton>
            </form>

            <div className="mt-8 text-center text-sm text-secondary-text">
                Don't have an account?{' '}
                <Link to={ROUTES.REGISTER} className="text-sidebar-active hover:text-accent font-bold transition-colors">
                    Create Account
                </Link>
            </div>
        </motion.div>
    );
};

export default Login;
