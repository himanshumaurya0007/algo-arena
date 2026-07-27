import { Link } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

function UserLoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card className="space-y-6">
        <div>
          <h1 className="heading-lg">User Login</h1>
          <p className="body text-text-muted mt-2">
            Sign in to continue solving problems and tracking your progress.
          </p>
        </div>

        <form className="space-y-4">
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
              placeholder="Enter your password"
              type="password"
            />
          </label>

          <Button className="w-full" type="submit">
            Login as User
          </Button>
        </form>

        <div className="text-text-muted space-y-2 text-center text-sm">
          <p>
            New to AlgoArena?{' '}
            <Link className="text-primary font-semibold" to="/signup">
              Create an account
            </Link>
          </p>

          <p>
            Wrong option?{' '}
            <Link className="text-primary font-semibold" to="/login">
              Choose again
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}

export default UserLoginPage;
