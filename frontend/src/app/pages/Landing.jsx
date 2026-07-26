import { Link } from "react-router-dom";

import Badge from "../../shared/ui/Badge";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";


function Landing(){

return (

<div className="bg-background min-h-screen">

{/* Hero Section */}
<section className="max-w-6xl mx-auto px-4 py-20">
<div className="text-center space-y-8">

<div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
  🚀 Now in Demo Mode
</div>

<h1 className="heading-xl text-secondary">
AlgoArena
</h1>


<p className="body text-text-muted mt-4 max-w-2xl mx-auto">
Practice coding. Master interviews. Track your progress.
A full-stack platform with real-time code editor, 
submissions tracking, and admin management.
</p>

</div>


<div className="flex justify-center gap-4 mt-12 flex-wrap">

<Link to="/register">
<Button>
Get Started
</Button>
</Link>


<Button variant="secondary">
Explore Roadmaps
</Button>


<Link to="/login">
  <Button variant="outline">
    Login
  </Button>
</Link>

<Link to="/register">
  <Button variant="outline">
    Register
  </Button>
</Link>

</div>


<div className="flex justify-center gap-3 mt-16">

{/* <Badge>Easy</Badge>

<Badge>Medium</Badge>

<Badge>Hard</Badge> */}

</div>



<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">

<Card>
<h3 className="heading-sm">💻 Code Editor</h3>
<p className="body mt-2">
Monaco-powered editor with Python, C++, Java, and C support.
Write, submit, and see results instantly.
</p>
</Card>

<Card>
<h3 className="heading-sm">📊 Track Progress</h3>
<p className="body mt-2">
Monitor your coding journey with detailed submission history,
execution stats, and performance analytics.
</p>
</Card>

<Card>
<h3 className="heading-sm">🛠️ Admin Panel</h3>
<p className="body mt-2">
Full CRUD management for categories, topics, problems, and users
with AI-assisted content authoring capabilities.
</p>
</Card>

</div>

</section>

</div>

);

}


export default Landing;
