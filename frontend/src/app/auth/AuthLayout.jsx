const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-3 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">

          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-slate-400 mt-1 sm:mt-2">
              {subtitle}
            </p>
          </div>

          {children}

        </div>

      </div>
    </div>
  );
};

export default AuthLayout;