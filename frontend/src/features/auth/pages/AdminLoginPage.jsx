import { Link } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

function AdminLoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-12">
      <Card className="space-y-6">
        <div>
          <h1 className="heading-lg">Admin Login</h1>
          <p className="body text-text-muted mt-2">
            Sign in to manage problems, articles, blogs, and users.
          </p>
        </div>

        <form className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold">Admin Email</span>
            <input
              className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
              placeholder="admin@example.com"
              type="email"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-semibold">Password</span>
            <input
              className="border-border bg-background focus:border-primary min-h-11 w-full rounded-md border px-4 outline-none"
              placeholder="Enter admin password"
              type="password"
            />
          </label>

          <Button className="w-full" type="submit" variant="secondary">
            Login as Admin
          </Button>
        </form>

        <p className="text-text-muted text-center text-sm">
          Wrong option?{' '}
          <Link className="text-primary font-semibold" to="/login">
            Choose again
          </Link>
        </p>
      </Card>
    </main>
  );
}

export default AdminLoginPage;
