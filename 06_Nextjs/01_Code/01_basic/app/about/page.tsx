import AboutPresentation from './AboutPresentation';

export default function page() {
  const dataPromise = fetch('http://localhost:3000/api/about').then((res) => res.json());

  return <AboutPresentation data={dataPromise} />;
}