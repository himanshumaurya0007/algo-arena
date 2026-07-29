import { Link } from 'react-router-dom';
import Button from '../../../shared/ui/Button';
import Card from '../../../shared/ui/Card';

function LoginChoicePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="heading-lg">Choose your login</h1>
        <p className="body text-text-muted mx-auto mt-2 max-w-2xl">
          Continue to AlgoArena as a learner or access the admin workspace to
          manage platform content.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="space-y-5">
          <div>
            <h2 className="heading-sm">User Login</h2>
            <p className="body text-text-muted mt-2">
              Solve problems, read articles, track submissions, and continue
              your coding practice.
            </p>
          </div>

          <Link to="/login/user">
            <Button className="w-full">Continue as User</Button>
          </Link>
        </Card>

        <Card className="space-y-5">
          <div>
            <h2 className="heading-sm">Admin Login</h2>
            <p className="body text-text-muted mt-2">
              Manage problems, topics, articles, blogs, videos, and platform
              users.
            </p>
          </div>

          <Link to="/login/admin">
            <Button className="w-full" variant="outline">
              Continue as Admin
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}

export default LoginChoicePage;
