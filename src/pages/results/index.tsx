import AppContext from "@/context/appContext";
import Link from "next/link";
import { useContext } from "react";

export default function Page() {
  const { repos } = useContext(AppContext);

  const filtered = repos.filter((o) => o.isChecked);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-2 p-24'>
      {filtered.map(({ id, name, isChecked }) => (
        <div key={id}>{name}</div>
      ))}
      <Link className='bg-blue-300 border rounded py-1 px-2' href={"/"}>
        Back
      </Link>
    </div>
  );
}
