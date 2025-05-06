export default function Home() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the home page.</p>
      <div className="flex gap-4">
        <a className="border px-2 py-1 rounded-md" href="/admin">Go to Admin page</a>
        <a className="border px-2 py-1 rounded-md" href="/kitchen">Go to Kitchen page</a>
      </div>
    </div>
  );
}
