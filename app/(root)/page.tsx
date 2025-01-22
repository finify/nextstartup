import SearchFrom from "@/components/SearchFrom";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;
  const params = {search:query || null};

  // const posts = await client.fetch(STARTUPS_QUERY);
  const {data:posts} = await sanityFetch({query: STARTUPS_QUERY, params});
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup <br /> Connect with Enterprenuers</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Noticed in virtual competitions
        </p>
        <SearchFrom query={query} />
      </section>

      <section className="section_container">
          <p className="text-30-semibold">
            {query ? `Search results for "${query}"` : "Latest Pitches"}
          </p>

          <ul className="mt-7 card_grid">
            {
              posts?.length > 0 ? (
                posts.map((post: StartupTypeCard) => (
                  <StartupCard key={`card-${post._id}`} post={post} />
                ))
              ) : (
                <p>No posts found</p>
              )
            }

          </ul>

      </section>
      <SanityLive />
    </>
  );
}
