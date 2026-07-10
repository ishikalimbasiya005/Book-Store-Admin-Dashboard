import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { message } from 'antd';
import { ROUTES } from '../../Constants';
import { useAuthStore } from '../../Store/useAuthStore';
import { CommonButton, CommonInput } from '../../Attributes';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
        .required('Required'),
});

const Register = () => {
    const navigate = useNavigate();
    const registerUser = useAuthStore(state => state.register);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            registerUser({
                id: Math.random().toString(36).substring(7),
                name: values.name,
                email: values.email,
                role: 'admin',
            });
            setIsLoading(false);
            message.success('Account created successfully! Please login.');
            navigate(ROUTES.LOGIN, { replace: true });
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
                <h1 className="text-3xl font-bold text-primary-text mb-2">Create Account</h1>
                <p className="text-secondary-text">Join us and manage your store</p>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-5">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-primary-text ml-1">Full Name</label>
                    <CommonInput
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        prefix={<FiUser className="text-placeholder" />}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger text-sm mt-1 ml-1">{formik.errors.name}</div>
                    ) : null}
                </div>

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

                <div className="space-y-1">
                    <label className="text-sm font-medium text-primary-text ml-1">Confirm Password</label>
                    <div className="relative">
                        <CommonInput
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="••••••••"
                            prefix={<FiLock className="text-placeholder" />}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="ebm-input pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-placeholder hover:text-primary-text transition-colors"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="text-danger text-sm mt-1 ml-1">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

                <CommonButton
                    type="submit"
                    className="bg-sidebar-active text-white w-full justify-center h-12 text-base font-semibold mt-6 hover:opacity-90 transition-opacity"
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </CommonButton>
            </form>

            <div className="mt-8 text-center text-sm text-secondary-text">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="text-sidebar-active hover:text-accent font-bold transition-colors">
                    Sign In
                </Link>
            </div>
        </motion.div>
    );
};

export default Register;
