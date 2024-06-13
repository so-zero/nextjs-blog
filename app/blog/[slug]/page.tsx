import { fullBlogType } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == '${slug}'] {
        "slug":slug.current,
        title,
        content,
        titleImage
}[0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function BlogSection({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlogType = await getData(params.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>
      <Image
        src={urlFor(data.titleImage).url()}
        alt="blog image"
        width={800}
        height={800}
        priority
        className="rounded-lg mt-8 border overflow-hidden bg-white"
      />
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary prose-a:text-decoration-line:none">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
