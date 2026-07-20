import Badge from '../shared/ui/Badge';
import Button from '../shared/ui/Button';
import Card from '../shared/ui/Card';

function App() {
  return (
    <>
      <main className="bg-background min-h-screen p-10">
        <section className="mx-auto max-w-6xl space-y-10">
          <div>
            <h1 className="heading-xl text-secondary">AlgoArena</h1>

            <p className="body text-text-muted mt-4 max-w-2xl">
              Practice coding. Master interviews. Track your progress.
            </p>
          </div>

          <div className="flex gap-4">
            <Button>Get Started</Button>

            <Button variant="secondary">Explore Roadmaps</Button>

            <Button variant="outline">Login</Button>

            <Button variant="ghost">Learn More</Button>
          </div>

          <div className="flex gap-3">
            {/* <div className="flex"> */}

            <Badge>Easy</Badge>

            <Badge>Medium</Badge>

            <Badge>Hard</Badge>
          </div>

          <Card>
            <h2 className="heading-sm mb-3">Welcome to AlgoArena</h2>

            <p className="body">
              This card is using the project's design system. If everything
              looks correct, then your fonts, colors and Tailwind theme are
              configured properly.
            </p>
          </Card>

          <Card>
            <p className="code">
              {`function binarySearch(arr,target){

    ...

}`}
            </p>
          </Card>
        </section>
      </main>
    </>
  );
}

export default App;
