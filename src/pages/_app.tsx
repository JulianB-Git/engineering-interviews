import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppProvider } from "../context/appContext";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const token = process.env.NEXT_PUBLIC_GIT_TOKEN;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [repos, setRepos] = useState<any[]>([]);

  const fetchRepos = async () => {
    const response = await fetch(
      "https://api.github.com/users/JulianB-Git/repos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    const moddedRepos = data.map((repo: any) => {
      return {
        id: repo.id,
        name: repo.name,
        isChecked: false,
      };
    });

    setRepos(moddedRepos);
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleToggle = (id: any) => {
    const currentState = [...repos];

    currentState.find((o) => {
      if (o.id == id) {
        o.isChecked = !o.isChecked;
      }
    });

    setRepos(currentState);
  };

  const value = { repos, handleToggle };

  return (
    <SessionProvider session={session}>
      <AppProvider value={value}>
        <Component {...pageProps} />
      </AppProvider>
    </SessionProvider>
  );
}
