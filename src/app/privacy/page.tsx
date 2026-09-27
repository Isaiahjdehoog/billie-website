import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  privacyMeta,
  privacySections,
  type Block,
} from "@/lib/privacy";

export const metadata: Metadata = {
  title: privacyMeta.title,
  description: privacyMeta.description,
  alternates: { canonical: "/privacy" },
};

function renderBlock(block: Block, key: number) {
  if ("h3" in block) {
    return (
      <h3 key={key} className="mt-6 text-[17px] font-bold text-ledger">
        {block.h3}
      </h3>
    );
  }
  if ("list" in block) {
    return (
      <ul key={key} className="mt-3 list-disc space-y-1.5 pl-5">
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p key={key} className="mt-3">
      {block.p}
    </p>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="top" className="bg-bone">
        <article className="mx-auto w-full max-w-2xl px-5 py-14 sm:px-8 sm:py-20">
          <h1 className="font-serif text-[40px] font-[400] leading-[1.1] text-ink md:text-[56px]">
            {privacyMeta.heading}
          </h1>
          <p className="mt-4 u-label text-mist">
            {privacyMeta.dates}
          </p>

          <div className="text-[16px] leading-relaxed text-ink/80">
            {privacySections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="text-[21px] font-bold text-ink">
                  {section.heading}
                </h2>
                {section.blocks.map(renderBlock)}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
