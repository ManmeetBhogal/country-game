import CountryCode from "./lib/countryCode";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold m-10">Guess the Country</h1>
      <CountryCode />
    </div>
  );
}
