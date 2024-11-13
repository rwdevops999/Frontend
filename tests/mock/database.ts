import { faker } from "@faker-js/faker";
import { factory, oneOf, primaryKey } from "@mswjs/data";
import { Tutorial } from "../../src/entities/Tutorial";
import { Bucket } from "../../src/entities/Bucket";

export const database = factory({
  tutorial: {
    id: primaryKey(faker.number.int),
    description: faker.string.alpha,
    title: faker.string.alpha,
    published: faker.datatype.boolean,
    filename: faker.system.fileName,
  },
  bucket: {
    id: primaryKey(faker.number.int),
    name: faker.string.alpha,
    selected: faker.datatype.boolean,
    favorite: faker.datatype.boolean,
    tutorials: faker.number.int,
    updatedate: faker.date.anytime,
  },
  file: {
    id: primaryKey(faker.number.int),
    tutorial: oneOf("tutorial"),
    type: faker.string.alpha,
    fileContent: faker.string.binary,
    bucket: oneOf("bucket"),
  },
});

export const createDBTutorial = (tutorial: Tutorial): Tutorial => {
  let newTutorial = database.tutorial.create({
    ...tutorial,
  });

  return newTutorial;
};

export const createDBBucket = (bucket: Bucket): Bucket => {
  let newBucket = database.bucket.create({
    ...bucket,
  });

  return newBucket;
};

let tutorialIds = new Array();
let bucketIds = new Array();

const defaultTutorial: Tutorial = {
  id: undefined,
  title: "Title 1",
  description: "Description 1",
  published: false,
  filename: "File 1",
};

const defaultBucket: Bucket = {
  id: undefined,
  name: "Bucket 1",
  selected: false,
  favorite: false,
  tutorials: 0,
  updateDate: new Date(),
};

export const removeDBTutorials = () => {
  database.tutorial.deleteMany({ where: { id: { in: tutorialIds } } });
  tutorialIds = new Array();
};

export const removeDBBuckets = () => {
  database.bucket.deleteMany({ where: { id: { gt: 0 } } });
  bucketIds = new Array();
};

export const createTutorials = (
  num: number,
  remove: boolean = true,
  tutorial?: Tutorial
) => {
  if (remove) {
    removeDBTutorials();
  }

  for (let i = 0; i < num; i++) {
    let tut = {
      title: "Title " + i,
      description: "Description " + i,
      published: false,
      filename: "File " + i,
    };

    let { id } = createDBTutorial({
      ...defaultTutorial,
      ...tut,
      ...tutorial,
    });
    tutorialIds.push(id);
  }
};

export const createBuckets = (
  num: number,
  remove: boolean = true,
  bucket?: Bucket
) => {
  if (remove) {
    removeDBBuckets();
  }

  for (let i = 0; i < num; i++) {
    let { id } = createDBBucket({
      ...defaultBucket,
      ...bucket,
    });
    bucketIds.push(id);
  }
};

export const getDBTutorialByIndex = (index: number): Tutorial => {
  return database.tutorial.findFirst({
    where: { id: { equals: tutorialIds[index] } },
  })!;
};

export const getDBBucketByIndex = (index: number): Bucket => {
  return database.bucket.findFirst({
    where: { id: { equals: bucketIds[index] } },
  })!;
};

export const createNonPublishedTutorials = () => {
  removeDBTutorials();
};
