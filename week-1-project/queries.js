// Task 1
use plp_bookstore;
switched to db plp_bookstore

db.createCollection("books")
{ ok: 1 }

// Task 2
db.books.insertMany([{ title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'}, {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }])
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6838bd8615a4865b5107ca30'),
    '1': ObjectId('6838bd8615a4865b5107ca31'),
    '2': ObjectId('6838bd8615a4865b5107ca32'),
    '3': ObjectId('6838bd8615a4865b5107ca33'),
    '4': ObjectId('6838bd8615a4865b5107ca34'),
    '5': ObjectId('6838bd8615a4865b5107ca35'),
    '6': ObjectId('6838bd8615a4865b5107ca36'),
    '7': ObjectId('6838bd8615a4865b5107ca37'),
    '8': ObjectId('6838bd8615a4865b5107ca38'),
    '9': ObjectId('6838bd8615a4865b5107ca39'),
    '10': ObjectId('6838bd8615a4865b5107ca3a'),
    '11': ObjectId('6838bd8615a4865b5107ca3b')
  }
}
db.books.find({genre: "Fiction"})
{
  _id: ObjectId('6838bd8615a4865b5107ca30'),
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  genre: 'Fiction',
  published_year: 1960,
  price: 12.99,
  in_stock: true,
  pages: 336,
  publisher: 'J. B. Lippincott & Co.'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca32'),
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  genre: 'Fiction',
  published_year: 1925,
  price: 9.99,
  in_stock: true,
  pages: 180,
  publisher: "Charles Scribner's Sons"
}
{
  _id: ObjectId('6838bd8615a4865b5107ca35'),
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  genre: 'Fiction',
  published_year: 1951,
  price: 8.99,
  in_stock: true,
  pages: 224,
  publisher: 'Little, Brown and Company'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca39'),
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  published_year: 1988,
  price: 10.99,
  in_stock: true,
  pages: 197,
  publisher: 'HarperOne'
}
db.books.find({published_year: {$gt: 1940}})
{
  _id: ObjectId('6838bd8615a4865b5107ca30'),
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  genre: 'Fiction',
  published_year: 1960,
  price: 12.99,
  in_stock: true,
  pages: 336,
  publisher: 'J. B. Lippincott & Co.'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca31'),
  title: '1984',
  author: 'George Orwell',
  genre: 'Dystopian',
  published_year: 1949,
  price: 10.99,
  in_stock: true,
  pages: 328,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca35'),
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  genre: 'Fiction',
  published_year: 1951,
  price: 8.99,
  in_stock: true,
  pages: 224,
  publisher: 'Little, Brown and Company'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca37'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 19.99,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca38'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca39'),
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  published_year: 1988,
  price: 10.99,
  in_stock: true,
  pages: 197,
  publisher: 'HarperOne'
}
db.books.find({author: "George Orwell"})
{
  _id: ObjectId('6838bd8615a4865b5107ca31'),
  title: '1984',
  author: 'George Orwell',
  genre: 'Dystopian',
  published_year: 1949,
  price: 10.99,
  in_stock: true,
  pages: 328,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca38'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}
db.books.updateOne({title: 'The Lord of the Rings'}, {$set: {price: 10.00}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
db.books.deleteOne({title: 'The Hobbit'})
{
  acknowledged: true,
  deletedCount: 1
}

// Task 3
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

db.books.find({in_stock: true, published_year: { $gt: 2010 }})
db.books.find({in_stock: true}, {published_year: { $gt: 2010 }})
MongoServerError[Location16020]: Expression $gt takes exactly 2 arguments. 1 were passed in.
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})
db.books.find(
  {
    in_stock: true,
    published_year: { $gt: 2010 }
  },
  {
    title: 1,
    author: 1,
    price: 1,
    _id: 0
  }
)
db.books.find().sort({ price: 1 })
{
  _id: ObjectId('6838bd8615a4865b5107ca36'),
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  genre: 'Romance',
  published_year: 1813,
  price: 7.99,
  in_stock: true,
  pages: 432,
  publisher: 'T. Egerton, Whitehall'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca38'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca35'),
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  genre: 'Fiction',
  published_year: 1951,
  price: 8.99,
  in_stock: true,
  pages: 224,
  publisher: 'Little, Brown and Company'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca32'),
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  genre: 'Fiction',
  published_year: 1925,
  price: 9.99,
  in_stock: true,
  pages: 180,
  publisher: "Charles Scribner's Sons"
}
{
  _id: ObjectId('6838bd8615a4865b5107ca3b'),
  title: 'Wuthering Heights',
  author: 'Emily Brontë',
  genre: 'Gothic Fiction',
  published_year: 1847,
  price: 9.99,
  in_stock: true,
  pages: 342,
  publisher: 'Thomas Cautley Newby'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca37'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 10,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca31'),
  title: '1984',
  author: 'George Orwell',
  genre: 'Dystopian',
  published_year: 1949,
  price: 10.99,
  in_stock: true,
  pages: 328,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca39'),
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  published_year: 1988,
  price: 10.99,
  in_stock: true,
  pages: 197,
  publisher: 'HarperOne'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca33'),
  title: 'Brave New World',
  author: 'Aldous Huxley',
  genre: 'Dystopian',
  published_year: 1932,
  price: 11.5,
  in_stock: false,
  pages: 311,
  publisher: 'Chatto & Windus'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca3a'),
  title: 'Moby Dick',
  author: 'Herman Melville',
  genre: 'Adventure',
  published_year: 1851,
  price: 12.5,
  in_stock: false,
  pages: 635,
  publisher: 'Harper & Brothers'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca30'),
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  genre: 'Fiction',
  published_year: 1960,
  price: 12.99,
  in_stock: true,
  pages: 336,
  publisher: 'J. B. Lippincott & Co.'
}
db.books.find().sort({ price: -1 })
{
  _id: ObjectId('6838bd8615a4865b5107ca30'),
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  genre: 'Fiction',
  published_year: 1960,
  price: 12.99,
  in_stock: true,
  pages: 336,
  publisher: 'J. B. Lippincott & Co.'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca3a'),
  title: 'Moby Dick',
  author: 'Herman Melville',
  genre: 'Adventure',
  published_year: 1851,
  price: 12.5,
  in_stock: false,
  pages: 635,
  publisher: 'Harper & Brothers'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca33'),
  title: 'Brave New World',
  author: 'Aldous Huxley',
  genre: 'Dystopian',
  published_year: 1932,
  price: 11.5,
  in_stock: false,
  pages: 311,
  publisher: 'Chatto & Windus'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca31'),
  title: '1984',
  author: 'George Orwell',
  genre: 'Dystopian',
  published_year: 1949,
  price: 10.99,
  in_stock: true,
  pages: 328,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca39'),
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  published_year: 1988,
  price: 10.99,
  in_stock: true,
  pages: 197,
  publisher: 'HarperOne'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca37'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 10,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca32'),
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  genre: 'Fiction',
  published_year: 1925,
  price: 9.99,
  in_stock: true,
  pages: 180,
  publisher: "Charles Scribner's Sons"
}
{
  _id: ObjectId('6838bd8615a4865b5107ca3b'),
  title: 'Wuthering Heights',
  author: 'Emily Brontë',
  genre: 'Gothic Fiction',
  published_year: 1847,
  price: 9.99,
  in_stock: true,
  pages: 342,
  publisher: 'Thomas Cautley Newby'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca35'),
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  genre: 'Fiction',
  published_year: 1951,
  price: 8.99,
  in_stock: true,
  pages: 224,
  publisher: 'Little, Brown and Company'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca38'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca36'),
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  genre: 'Romance',
  published_year: 1813,
  price: 7.99,
  in_stock: true,
  pages: 432,
  publisher: 'T. Egerton, Whitehall'
}
db.books.find().limit(5)
{
  _id: ObjectId('6838bd8615a4865b5107ca30'),
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  genre: 'Fiction',
  published_year: 1960,
  price: 12.99,
  in_stock: true,
  pages: 336,
  publisher: 'J. B. Lippincott & Co.'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca31'),
  title: '1984',
  author: 'George Orwell',
  genre: 'Dystopian',
  published_year: 1949,
  price: 10.99,
  in_stock: true,
  pages: 328,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca32'),
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  genre: 'Fiction',
  published_year: 1925,
  price: 9.99,
  in_stock: true,
  pages: 180,
  publisher: "Charles Scribner's Sons"
}
{
  _id: ObjectId('6838bd8615a4865b5107ca33'),
  title: 'Brave New World',
  author: 'Aldous Huxley',
  genre: 'Dystopian',
  published_year: 1932,
  price: 11.5,
  in_stock: false,
  pages: 311,
  publisher: 'Chatto & Windus'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca35'),
  title: 'The Catcher in the Rye',
  author: 'J.D. Salinger',
  genre: 'Fiction',
  published_year: 1951,
  price: 8.99,
  in_stock: true,
  pages: 224,
  publisher: 'Little, Brown and Company'
}
db.books.find().skip(5).limit(5)
{
  _id: ObjectId('6838bd8615a4865b5107ca36'),
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  genre: 'Romance',
  published_year: 1813,
  price: 7.99,
  in_stock: true,
  pages: 432,
  publisher: 'T. Egerton, Whitehall'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca37'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 10,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca38'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca39'),
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  published_year: 1988,
  price: 10.99,
  in_stock: true,
  pages: 197,
  publisher: 'HarperOne'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca3a'),
  title: 'Moby Dick',
  author: 'Herman Melville',
  genre: 'Adventure',
  published_year: 1851,
  price: 12.5,
  in_stock: false,
  pages: 635,
  publisher: 'Harper & Brothers'
}
db.books.find().skip(5).limit(5)
{
  _id: ObjectId('6838bd8615a4865b5107ca36'),
  title: 'Pride and Prejudice',
  author: 'Jane Austen',
  genre: 'Romance',
  published_year: 1813,
  price: 7.99,
  in_stock: true,
  pages: 432,
  publisher: 'T. Egerton, Whitehall'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca37'),
  title: 'The Lord of the Rings',
  author: 'J.R.R. Tolkien',
  genre: 'Fantasy',
  published_year: 1954,
  price: 10,
  in_stock: true,
  pages: 1178,
  publisher: 'Allen & Unwin'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca38'),
  title: 'Animal Farm',
  author: 'George Orwell',
  genre: 'Political Satire',
  published_year: 1945,
  price: 8.5,
  in_stock: false,
  pages: 112,
  publisher: 'Secker & Warburg'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca39'),
  title: 'The Alchemist',
  author: 'Paulo Coelho',
  genre: 'Fiction',
  published_year: 1988,
  price: 10.99,
  in_stock: true,
  pages: 197,
  publisher: 'HarperOne'
}
{
  _id: ObjectId('6838bd8615a4865b5107ca3a'),
  title: 'Moby Dick',
  author: 'Herman Melville',
  genre: 'Adventure',
  published_year: 1851,
  price: 12.5,
  in_stock: false,
  pages: 635,
  publisher: 'Harper & Brothers'
}

// Task 4
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])
{
  _id: 'Fiction',
  averagePrice: 10.74
}
{
  _id: 'Dystopian',
  averagePrice: 11.245000000000001
}
{
  _id: 'Adventure',
  averagePrice: 12.5
}
{
  _id: 'Gothic Fiction',
  averagePrice: 9.99
}
{
  _id: 'Romance',
  averagePrice: 7.99
}
{
  _id: 'Fantasy',
  averagePrice: 10
}
{
  _id: 'Political Satire',
  averagePrice: 8.5
}
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      totalBooks: { $sum: 1 }
    }
  },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])
{
  _id: 'George Orwell',
  totalBooks: 2
}
db.books.aggregate([
  {
    $group: {
      _id: {
        decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { "_id.decade": 1 } }
])
{
  _id: {
    decade: 1810
  },
  count: 1
}
{
  _id: {
    decade: 1840
  },
  count: 1
}
{
  _id: {
    decade: 1850
  },
  count: 1
}
{
  _id: {
    decade: 1920
  },
  count: 1
}
{
  _id: {
    decade: 1930
  },
  count: 1
}
{
  _id: {
    decade: 1940
  },
  count: 2
}
{
  _id: {
    decade: 1950
  },
  count: 2
}
{
  _id: {
    decade: 1960
  },
  count: 1
}
{
  _id: {
    decade: 1980
  },
  count: 1
}

// Task 5
db.books.createIndex({ title: 1 })
title_1
db.books.createIndex({ author: 1, published_year: -1 })
author_1_published_year_-1
db.books.find({ title: "The Hobbit" }).explain("executionStats")
        },
        indexName: 'title_1',
        isMultiKey: false,
        multiKeyPaths: {
          title: []
        },
        isUnique: false,
        isSparse: false,
        isPartial: false,
        indexVersion: 2,
        direction: 'forward',
        indexBounds: {
          title: [
            '["The Hobbit", "The Hobbit"]'
          ]
        },
        keysExamined: 0,
        seeks: 1,
        dupsTested: 0,
        dupsDropped: 0
      }
    }
  },
  queryShapeHash: 'B6C1D6F79AAA979584A9BA83C2F8D87C839BED87CAE10CD5F0AE5B89BCE86C6B',
  command: {
    find: 'books',
    filter: {
      title: 'The Hobbit'
    },
    '$db': 'plp_bookstore'
  },
  serverInfo: {
    host: 'DESKTOP-26A9125',
    port: 27017,
    version: '8.0.9',
    gitVersion: 'f882ef816d531ecfbb593843e4c554fda90ca416'
  },
  serverParameters: {
    internalQueryFacetBufferSizeBytes: 104857600,
    internalQueryFacetMaxOutputDocSizeBytes: 104857600,
    internalLookupStageIntermediateDocumentMaxSizeBytes: 104857600,
    internalDocumentSourceGroupMaxMemoryBytes: 104857600,
    internalQueryMaxBlockingSortMemoryUsageBytes: 104857600,
    internalQueryProhibitBlockingMergeOnMongoS: 0,
    internalQueryMaxAddToSetBytes: 104857600,
    internalDocumentSourceSetWindowFieldsMaxMemoryBytes: 104857600,
    internalQueryFrameworkControl: 'trySbeRestricted',
    internalQueryPlannerIgnoreIndexWithCollationForRegex: 1
  },
  ok: 1
}
plp_bookstore

