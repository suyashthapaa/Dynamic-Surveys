'use client';

import { arrowRight, Eye EyeOff } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import { AuthShell } from '@/components/auth-shell';
import { useAuth } from '@/components/auth-provider';
import { ApiRequestError } from '@/lib/api';

export default function SignInPage() {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, set]
}