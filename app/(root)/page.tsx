import SearchFrom from "@/components/SearchFrom";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;

  const posts = [
      {
        _createdAt: new Date(),
        views: 55,
        _id: "1",
        author: {_id:1, name: "John Doe"},
        description: "This is a description",
        title: "This is a title",
        image: {url: "https://via.placeholder.com/150"},
        category:"Robots",
      }

  ];
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
                posts.map((post: StartupCardType) => (
                  <StartupCard key={`card-${post._id}`} post={post} />
                ))
              ) : (
                <p>No posts found</p>
              )
            }

          </ul>

      </section>
    </>
  );
}
