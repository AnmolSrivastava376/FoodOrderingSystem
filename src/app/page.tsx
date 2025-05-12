export default function Home() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the home page.</p>
      <div className="flex flex-col gap-4">
        <a className="border px-2 py-1 rounded-md max-w-[200px]" href="/admin">Go to Admin page</a>
        <a className="border px-2 py-1 rounded-md max-w-[200px]" href="/kitchen">Go to Kitchen page</a>
        <a className="border px-2 py-1 rounded-md max-w-[200px]" href="/5">Go to Table 5</a>
      </div>
    </div>
  );
}
