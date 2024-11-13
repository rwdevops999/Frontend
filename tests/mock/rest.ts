import { http, HttpResponse } from "msw";
import { database } from "./database";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const tutorialRestHandler = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://localhost:8081/api/find", () => {
    return HttpResponse.json(database.tutorial.findMany({}));
  }),
  http.get(
    "http://localhost:8081/api/find/keywords/:keywords",
    ({ params }) => {
      let keyword: string = params.keywords as string;

      if (keyword != undefined) {
        return HttpResponse.json(
          database.tutorial.findMany({
            where: {
              title: {
                contains: keyword,
              },
            },
          })
        );
      }
    }
  ),
  http.get("http://localhost:8081/api/find/published", ({ request }) => {
    const url = new URL(request.url);
    const pub = url.searchParams.get("published");

    if (pub === "true") {
      return HttpResponse.json(
        database.tutorial.findMany({
          where: {
            published: {
              equals: true,
            },
          },
        })
      );
    }

    return HttpResponse.json(
      database.tutorial.findMany({
        where: {
          published: {
            equals: false,
          },
        },
      })
    );
  }),
  http.get("http://localhost:8081/api/find/:tid", ({ params }) => {
    let tid = parseInt(params.tid as string);

    let tutorial = database.tutorial.findFirst({
      where: { id: { equals: tid } },
    });

    // // ...and respond to them using this JSON response.
    return HttpResponse.json([tutorial]);
  }),
  http.delete("http://localhost:8081/api/delete/:id", ({ params }) => {
    let id = parseInt(params.id as string);
    let tutorial = database.tutorial.delete({ where: { id: { equals: id } } });

    return HttpResponse.json(tutorial);
  }),
  http.put(
    "http://localhost:8081/api/update/:id",
    async ({ params, request }) => {
      let tutorialId = parseInt(params.id as string);
      const data = await request.clone().json();

      let obj = JSON.parse(JSON.stringify(data));

      database.tutorial.update({
        where: { id: { equals: tutorialId } },
        data: {
          title: obj.title,
          description: obj.description,
          published: obj.published,
          filename: obj.tutorialFile,
        },
      });
    }
  ),
  http.put("http://localhost:8081/api/publish/:id", ({ params }) => {
    let id = parseInt(params.id as string);

    database.tutorial.update({
      where: { id: { equals: id } },
      data: { published: true },
    });

    return HttpResponse.json({ status: 200 });
  }),
  http.delete("http://localhost:8081/api/delete", () => {
    database.tutorial.deleteMany({
      where: {
        id: {
          gt: 0,
        },
      },
    });

    return HttpResponse.json({ status: 200 });
  }),
  http.put("http://localhost:8081/api/publish", () => {
    database.tutorial.updateMany({
      where: { published: { equals: false } },
      data: { published: true },
    });

    return HttpResponse.json({ status: 200 });
  }),
  http.post("http://localhost:8081/api/create", async ({ request }) => {
    const data = await request.json();

    let obj = JSON.parse(JSON.stringify(data));

    database.tutorial.create({
      id: getRandomInt(100),
      title: obj.title,
      description: obj.description,
      published: obj.published,
      filename: obj.tutorialFile,
    });

    // ...and respond to them using this JSON response.
    return HttpResponse.json({ status: 200 });
  }),
  http.post("http://localhost:8081/api/bucket/create", async ({ request }) => {
    const data = await request.formData();

    const name: string = data.get("name") as string;

    database.bucket.create({
      id: getRandomInt(100),
      name: name,
    });

    // ...and respond to them using this JSON response.
    return HttpResponse.json({ status: 200 });
  }),
  http.delete("http://localhost:8081/api/bucket/delete/:id", ({ params }) => {
    let id = parseInt(params.id as string);
    database.bucket.delete({ where: { id: { equals: id } } });

    return HttpResponse.json({ status: 200 });
  }),
  http.get("http://localhost:8081/api/bucket/find", () => {
    return HttpResponse.json(database.bucket.findMany({}));
  }),
  http.put("http://localhost:8081/api/bucket/default/:id", ({ params }) => {
    let bucketId = parseInt(params.id as string);

    database.bucket.updateMany({
      where: { selected: { equals: true } },
      data: { selected: false },
    });

    database.bucket.update({
      where: { id: { equals: bucketId } },
      data: { selected: true },
    });

    return HttpResponse.json({ status: 200 });
  }),
  http.get("http://localhost:8081/api/bucket/default", () => {
    const bucket = database.bucket.findFirst({
      where: {
        selected: {
          equals: true,
        },
      },
    });

    return HttpResponse.json(bucket);
  }),
];

export const restHandlers = [...tutorialRestHandler];
