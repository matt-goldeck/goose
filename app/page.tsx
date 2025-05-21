import { getIsUserAuthorized } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default async function Home() {
  const userAuthorized = await getIsUserAuthorized();
  if (!userAuthorized) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-bold font-tourney mb-4 text-harvest">
          Afterburner
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8">
          Take control of your job hunt. Track applications, companies, and
          outcomes with clarity and speed.
        </p>
        <Link href="/sign-up">
          <Button
            label="Get Started"
            className="text-lg px-6 py-3 font-jetBrainsMono"
          />
        </Link>
      </section>

      <Divider className="my-4" />

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 font-tourney">
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "App Tracker",
                emoji: "💾",
                desc: "Lock onto your targets and track every job application journey with precision.",
              },
              {
                title: "Company CRM",
                emoji: "🛰️",
                desc: "Run recon on dream companies. Establish intel. Monitor your targets like a true job-hunting ace.",
              },
              {
                title: "AI Wingman",
                emoji: "🦅",
                desc: "He's quick. He's smart. He's got Matt's OpenAI API key. Your co-pilot will stop at nothing to get you hired.",
              },
            ].map(({ title, desc, emoji }) => (
              <div
                key={title}
                className="p-8 rounded-2xl shadow-lg border border-orange-200 hover:shadow-2xl transition-shadow duration-300 text-center">
                <div className="text-5xl mb-4">{emoji}</div>
                <h3 className="text-2xl font-bold text-harvest mb-3">
                  {title}
                </h3>
                <p className="text-white text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider className="my-4" />

      {/* Testimonials */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 font-tourney">
          Testimonials
        </h2>
        {[
          {
            review:
              "This tool actually changed my life -- I would never look for a job without it!",
            name: "Matt Goldeck",
          },
          { review: "Wow that looks very nice", name: "Matt's Mom" },
          {
            review: "You'll be hearing from our lawyers very soon",
            name: "Micro-Star International",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="py-8 px-6 bg-harvest rounded-xl shadow-md mb-6 text-center">
            <p className="text-xl italic mb-4">“{testimonial.review}”</p>
            <p className="font-semibold">— {testimonial.name}</p>
          </div>
        ))}
      </section>

      <Divider className="my-4" />

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Got what it takes to enter the{" "}
          <a
            className="underline text-harvest"
            href="https://www.youtube.com/watch?v=siwpn14IE7E"
            target="_blank"
            rel="noopener noreferrer">
            Danger Zone
          </a>
          ?
        </h2>
        <Link href="/sign-up">
          <Button
            label="Join the Wing"
            className="text-lg px-6 py-3 font-jetBrainsMono"
          />
        </Link>
      </section>
    </div>
  );
}
