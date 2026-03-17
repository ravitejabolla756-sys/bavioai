'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppleIcon, AtSignIcon, GithubIcon, Grid2x2PlusIcon, Lock } from 'lucide-react';

export function AuthPage({ isLoginDefault = false }: { isLoginDefault?: boolean }) {
	const [isLogin, setIsLogin] = useState(isLoginDefault);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		// Simulate a network request
		setTimeout(() => {
			setLoading(false);
			alert(`${isLogin ? "Logged in" : "Account created"} successfully for ${email}`);
		}, 800);
	};

	const handleSocial = (provider: string) => {
		alert(`Redirecting to ${provider} authentication...`);
	};

	return (
		<main className="relative w-full h-full lg:grid lg:grid-cols-2 bg-[#050505] text-white overflow-hidden">
			{/* Left Side Testimonial */}
			<div className="bg-[#0a0a0a] relative hidden flex-col border-r border-white/[0.05] p-10 lg:flex overflow-hidden">
				<div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
				<div className="z-20 flex items-center gap-3">
					<div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
						<span className="text-white text-sm font-black relative z-10">B</span>
					</div>
					<p className="text-2xl font-bold tracking-tight">Bavio</p>
				</div>
				
				<div className="z-20 mt-auto">
					<blockquote className="space-y-4">
						<p className="text-xl font-medium leading-relaxed text-white">
							&ldquo;This Platform has helped me to save time and serve my
							clients faster than ever before. The AI workflows are incredible!&rdquo;
						</p>
						<footer className="font-mono text-sm font-semibold text-zinc-400">
							~ Ali Hassan
						</footer>
					</blockquote>
				</div>
				<div className="absolute inset-0 z-0">
					<FloatingPaths position={1} />
					<FloatingPaths position={-1} />
				</div>
			</div>

			{/* Right Side Form */}
			<div className="relative flex flex-col justify-center p-8 lg:p-12 z-10 overflow-y-auto max-h-[90vh] w-full">
				<div
					aria-hidden
					className="absolute inset-0 isolate contain-strict -z-10 opacity-60 pointer-events-none"
				>
					<div className="bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(99,102,241,0.08)_0,rgba(255,255,255,0.02)_50%,transparent_80%)] absolute top-0 right-0 h-[320px] w-[140px] -translate-y-[87.5px] rounded-full" />
					<div className="bg-[radial-gradient(50%_50%_at_50%_50%,rgba(99,102,241,0.05)_0,rgba(255,255,255,0.01)_80%,transparent_100%)] absolute top-0 right-0 h-[320px] w-[60px] translate-x-[5%] -translate-y-[50%] rounded-full" />
				</div>

				<div className="mx-auto space-y-6 w-full max-w-sm">
					{/* Mobile Logo */}
					<div className="flex items-center gap-3 lg:hidden mb-8">
						<div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
							<span className="text-white text-sm font-black tracking-tight">B</span>
						</div>
						<p className="text-2xl font-bold">Bavio</p>
					</div>

					<div className="flex flex-col space-y-2 text-center lg:text-left">
						<h1 className="text-3xl font-bold tracking-tight text-white">
							{isLogin ? "Welcome back" : "Create an account"}
						</h1>
						<p className="text-zinc-400 text-sm">
							{isLogin 
								? "Enter your details to sign in to your account." 
								: "Enter your details below to create your account."}
						</p>
					</div>

					{/* Social Logins */}
					<div className="space-y-3">
						<Button 
							type="button" 
							className="w-full bg-white text-black hover:bg-zinc-200 rounded-full h-11 font-semibold transition-all relative"
							onClick={() => handleSocial('Google')}
						>
							<GoogleIcon className='w-5 h-5 absolute left-4' />
							Continue with Google
						</Button>
						<Button 
							type="button" 
							className="w-full bg-transparent border border-white/[0.1] text-white hover:bg-white/5 rounded-full h-11 font-semibold transition-all relative"
							onClick={() => handleSocial('Apple')}
						>
							<AppleIcon className='w-5 h-5 absolute left-4' />
							Continue with Apple
						</Button>
					</div>

					<AuthSeparator />

					{/* Email/Password Form */}
					<form className="space-y-5" onSubmit={handleSubmit}>
						<div className="space-y-3">
							<div className="relative">
								<Input
									placeholder="name@example.com"
									className="peer pl-11 rounded-full bg-white/[0.03] border-white/10 text-white focus-visible:ring-indigo-500 h-11 placeholder:text-zinc-500"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								<div className="text-zinc-500 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 peer-disabled:opacity-50">
									<AtSignIcon className="w-5 h-5" aria-hidden="true" />
								</div>
							</div>
							<div className="relative">
								<Input
									placeholder="Password"
									className="peer pl-11 rounded-full bg-white/[0.03] border-white/10 text-white focus-visible:ring-indigo-500 h-11 placeholder:text-zinc-500"
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									minLength={4}
								/>
								<div className="text-zinc-500 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4 peer-disabled:opacity-50">
									<Lock className="w-5 h-5" aria-hidden="true" />
								</div>
							</div>
						</div>

						<Button 
							type="submit" 
							disabled={loading || !email || !password}
							className="w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 h-11 font-bold shadow-lg shadow-indigo-500/20 transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
						>
							{loading ? (
								<span className="animate-pulse">Processing...</span>
							) : (
								<span>{isLogin ? "Sign In" : "Sign Up"}</span>
							)}
						</Button>
					</form>
					
					{/* Toggle Mode */}
					<div className="text-center pt-2">
						<p className="text-sm text-zinc-400">
							{isLogin ? "Don't have an account? " : "Already have an account? "}
							<button 
								type="button"
								onClick={() => setIsLogin(!isLogin)} 
								className="text-white hover:text-indigo-400 font-semibold underline underline-offset-4 transition-colors cursor-pointer"
							>
								{isLogin ? "Sign Up" : "Sign In"}
							</button>
						</p>
					</div>

					{/* Footer terms */}
					<p className="text-zinc-600 text-[11px] text-center mt-6">
						By clicking continue, you agree to our{' '}
						<a href="#" className="hover:text-zinc-300 underline underline-offset-4 transition-colors">Terms of Service</a>
						{' '}and{' '}
						<a href="#" className="hover:text-zinc-300 underline underline-offset-4 transition-colors">Privacy Policy</a>.
					</p>
				</div>
			</div>
		</main>
	);
}

function FloatingPaths({ position }: { position: number }) {
	const paths = Array.from({ length: 36 }, (_, i) => ({
		id: i,
		d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
			380 - i * 5 * position
		} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
			152 - i * 5 * position
		} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
			684 - i * 5 * position
		} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
		color: `rgba(255,255,255,${0.02 + i * 0.01})`,
		width: 0.5 + i * 0.03,
	}));

	return (
		<div className="pointer-events-none absolute inset-0">
			<svg
				className="h-full w-full text-white"
				viewBox="0 0 696 316"
				fill="none"
			>
				<title>Background Paths</title>
				{paths.map((path) => (
					<motion.path
						key={path.id}
						d={path.d}
						stroke="currentColor"
						strokeWidth={path.width}
						strokeOpacity={0.03 + path.id * 0.005} // Dimmed the strokes for dark mode
						initial={{ pathLength: 0.3, opacity: 0.3 }}
						animate={{
							pathLength: 1,
							opacity: [0.1, 0.3, 0.1],
							pathOffset: [0, 1, 0],
						}}
						transition={{
							duration: 20 + Math.random() * 10,
							repeat: Number.POSITIVE_INFINITY,
							ease: 'linear',
						}}
					/>
				))}
			</svg>
		</div>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center my-6">
			<div className="bg-white/10 h-px w-full" />
			<span className="text-zinc-500 px-4 text-xs font-semibold uppercase tracking-wider">OR</span>
			<div className="bg-white/10 h-px w-full" />
		</div>
	);
};
