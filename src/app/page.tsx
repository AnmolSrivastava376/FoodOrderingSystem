import {Example} from "@/components/DND/Example";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the home page.</p>
      <div className="flex gap-4">
        <a className="border px-2 py-1 rounded-md" href="/admin">Admin</a>
        <a className="border px-2 py-1 rounded-md" href="/kitchen">Kitchen</a>
        <a className="border px-2 py-1 rounded-md" href="/5">Table 5</a>
      </div>
      <Example />
    </div>
  );
}
