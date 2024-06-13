import { Card, CardContent } from "@/components/ui/card";
import { blogCardType } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == 'blog']|order(_createdAt desc) {
    title,
    description,
    "slug":slug.current,
    titleImage
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: blogCardType[] = await getData();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post, index) => {
        return (
          <Card key={index}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={350}
              height={350}
              className="w-full rounded-t-lg h-[200px] object-cover bg-white"
            />
            <CardContent>
              <h3 className="text-lg font-bold line-clamp-2 mt-2 ">
                {post.title}
              </h3>
              <p className="text-sm line-clamp-3 mt-3 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>
              <Button asChild className="w-full mt-7">
                <Link href={`/blog/${post.slug}`}>Read More</Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
