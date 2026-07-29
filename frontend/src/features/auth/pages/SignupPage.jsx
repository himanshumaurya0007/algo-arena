import { Link } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

function SignupPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card className="space-y-6">
        <div>
          <h1 className="heading-lg">Create account</h1>
          <p className="body text-text-muted mt-2">
            Join AlgoArena and start tracking your coding practice.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold">Full Name</span>
            <input
              className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
              placeholder="Enter your full name"
              type="text"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Email</span>
            <input
              className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
              placeholder="you@example.com"
              type="email"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Password</span>
            <input
              className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
              placeholder="Create a password"
              type="password"
            />
          </label>

          <Button className="w-full" type="submit">
            Create Account
          </Button>
        </form>

        <p className="text-text-muted text-center text-sm">
          Already have an account?{' '}
          <Link className="text-primary font-semibold" to="/login/user">
            Login
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default SignupPage;
