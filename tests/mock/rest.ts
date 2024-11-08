import { http, HttpResponse } from "msw";
import { database } from "./database";

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const tutorialRestHandler = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://localhost:8081/api/find", () => {
    console.log(
      "[INTERCEPT] REST FIND ALL: = " + database.tutorial.findMany({}).length
    );
    return HttpResponse.json(database.tutorial.findMany({}));
  }),
  http.get(
    "http://localhost:8081/api/find/keywords/:keywords",
    ({ params }) => {
      console.log(
        "[REST INTERCEPTED] FIND BY KEYWORDS : " + JSON.stringify(params)
      );
      let keyword: string = params.keywords as string;

      console.log("[REST] KEYWORDS = " + keyword);

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

    console.log("[REST INTERCEPTED] FIND PUBLISHED : " + pub);

    if (pub === "true") {
      const tuts = database.tutorial.findMany({
        where: {
          published: {
            equals: true,
          },
        },
      });
      console.log("[REST INTERCEPTED] FIND PUBLISHED : # = " + tuts.length);

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
    console.log("[INTERCEPT] REST FIND BY ID: = " + tid);

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
      console.log(
        "[REST INTERCEPTED OPTIONS] Update By Id DATA = " + JSON.stringify(data)
      );

      let obj = JSON.parse(JSON.stringify(data));

      console.log("[REST INTERCEPTED] Update By Id = " + tutorialId);

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
  // http.options("http://localhost:8081/api/update/:id", async ({ params }) => {
  //   let tutorialId = parseInt(params.id as string);

  //   console.log("[REST INTERCEPTED OPTIONS] Update By Id = " + tutorialId);
  // }),

  http.put("http://localhost:8081/api/publish/:id", ({ params }) => {
    let id = parseInt(params.id as string);
    console.log("[REST INTERCEPTED] Publish By Id = " + id);

    console.log(
      "[DB] BEFORE UPDATE = " +
        JSON.stringify(
          database.tutorial.findFirst({ where: { id: { equals: id } } })
        )
    );

    database.tutorial.update({
      where: { id: { equals: id } },
      data: { published: true },
    });

    console.log(
      "[DB] AFTER UPDATE = " +
        JSON.stringify(
          database.tutorial.findFirst({ where: { id: { equals: id } } })
        )
    );
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

    console.log("[REST] INTERCEPT: CREATE: " + obj.title);

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
    console.log("[REST] INTERCEPT: CREATE BUCKET: " + data.get("name"));

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
    console.log("[REST] INTERCEPT: DELETE BUCKET: " + id);
    database.bucket.delete({ where: { id: { equals: id } } });

    return HttpResponse.json({ status: 200 });
  }),
  http.get("http://localhost:8081/api/bucket/find", () => {
    console.log(
      "[INTERCEPT] REST FIND ALL BUCKETS: = " +
        database.bucket.findMany({}).length
    );
    return HttpResponse.json(database.bucket.findMany({}));
  }),
  http.put("http://localhost:8081/api/bucket/default/:id", ({ params }) => {
    let bucketId = parseInt(params.id as string);

    console.log("[INTERCEPT] REST UPDATE DEFAULT BUCKET");

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
    console.log("[INTERCEPT] REST DEFAULT BUCKET");

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
