import LeftPanel from '@/components/login/LeftPanel';
import Head from 'next/head';
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import FormHeader from '@/components/login/FormHeader';
import FormStatus from '@/components/login/FormStatus';
import LoginFooter from '@/components/login/LoginFooter';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 relative overflow-hidden">
      <Head>
        <title>DRDA GOA - Login</title>
        <link rel="icon" href="/Seal_of_Goa.webp" />
      </Head>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgb(148 163 184 / 0.15) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative min-h-screen flex items-stretch">
        {/* LEFT PANEL - Visual & Branding */}
        <LeftPanel />

        {/* RIGHT PANEL - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="flex-1 lg:w-[42%] flex items-center justify-center p-6 sm:p-12 lg:p-16"
        >
          <div className="w-full max-w-md">
            {/* Mobile Header - Only visible on small screens */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:hidden mb-8 flex items-center gap-3 pb-6 border-b border-slate-200"
            >
              <div className="h-14 w-14 relative">
                <Image
                  src="/Seal_of_Goa.webp"
                  alt="Government of Goa"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  DRDA Goa Portal
                </h1>
                <p className="text-xs text-slate-600">Government of Goa</p>
              </div>
            </motion.div>

            {/* Dynamic Header */}
            <FormHeader />

            {/* Error/Success Messages */}
            {/* <FormStatus error="dsad" successMessage="" /> */}

            {/* View Switching Logic */}
            <AnimatePresence mode="wait">
              <LoginForm />
            </AnimatePresence>

            {/* Footer */}
            <LoginFooter />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login