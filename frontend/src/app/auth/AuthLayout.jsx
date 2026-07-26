const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-9xl">

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">
              {title}
            </h1>

            <p className="text-slate-400 mt-2">
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