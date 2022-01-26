// Student Name : Margaret McCarthy
// Student Number : 20095610

// Part 1 - READ 
// Six useful find queries on the movies collection
 
// Query 1
// Description : Query to list the title and plot of all the movies released in USA with 
// * a imdb rating of 6 and over 
// * AND a rotten tomato rating or 4 and over  
// * runtime between 1 and 2 hours 
// * language French or English
// * sorted by title in ascending order.

db.movies.find(
{ 
	countries: "USA",
	$and: [ {"imdb.rating": { $gt: 6 }}, {"tomatoes.viewer.rating": { $gt: 4 }}],
	runtime: {$gte: 60, $lte: 120},
	languages: { $eq: ["English", "French"] }
},
	{_id: 0, title: 1, plot: 1, countries: 1, "imdb.rating" : 1, "tomatoes.viewer.rating": 1, runtime: 1, languages: 1 }
	).sort({title: 1}).pretty()
	
// Query 2
// Description : Query to return the movie title and comments from Comedy OR Fantasy movies where
// * the imdb rating was less than 4 but had more than 400 votes
// * between the years 1970 and 2000

db.movies.find(
{	
	comments: {$exists: true},
	$or: [{ genres: "Comedy"}, {genres: "Fantasy"}],
	$and: [{ "imdb.rating": { $lt: 2}}, {"imdb.votes": { $gt: 400}}],
	year: {$gte: 1970, $lte: 2000}
},		
	{_id: 0, title: 1, "comments.name": 1, "comments.text": 1, genres: 1, "imdb.rating": 1, "imdb.votes" : 1}
	).sort({"comments.name": 1}).pretty()

// Query 3
// Description : Query to list the directors with movies with a runtiime longer than 3 hours
// * released at a later date than the year 1900 but before 1980
// * rated "PG" or "G"
// * sorted by directors in ascending order and title in descending order

db.movies.find(
{
	runtime: {$gt: 180},
	rated: {$in: ["PG", "G"]},
	$and: [{released: {$gte : new ISODate("1900-01-01T00:00:00Z"), $lt: new ISODate("1980-01-01T00:00:00Z")}}]
},
{_id: 0, title: 1, directors: 1, runtime: 1, rated: 1, released: 1}
).sort({directors: 1, title: -1}).pretty()

// Query 4
// Description : Query to return the number of movies commmented on from before 1950
// * where a poster for this movie exists
// * the cast contains 3 actors
// * order by title and then year

db.movies.find(
{
	comments: {$exists: true},
	year: { $lt: 1950 },
	poster: {$exists: true},
	cast: {$size: 3 } 
},
	{_id: 0, title: 1, "comments.text": 1, year:  1, poster: 1, cast: 1}
	).sort({year : 1, title : 1}).pretty()

// Query 5
// Description : Query to return the number of movies that were made in the USA
// * that were of the genre Fantasy and Comedy
// * not rated G or PG
// * had a rating either above 8 or below 4 in tomatoes 
// * limited to 20 results not including the first 50

db.movies.find(
{
	countries: "USA",
	genres: { $all: ["Fantasy", "Comedy"] },
	$and: [{rated: {$ne: "PG"}}, {rated: { $ne: "G"}}, {rated: { $ne: "PG-13"}}]
},
	{_id: 0, title: 1, genres: 1, rated: 1, countries: 1}
	).limit(20).skip(50).pretty()
	



// Query 6
// Description : Query to find all the movies commented on by Stephen McDonald from 2010 onwards 
// * were made not made in France or Ireland
// * with either French or Irish as the spoken language
// * sorted by title

db.movies.find(
{
	comments: { $elemMatch: {name: "Steven Mcdonald", date: { $gte: new ISODate("2010-01-01T00:00:00Z") }} },
	$nor: [{ countries: "France"}, {countries: "Ireland"}],
	$or: [{ languages: "French"}, {languages: "Irish"}]
},
	{_id:0, title: 1, "comments.name" :1, "comments.date": 1, countries: 1, languages: 1}
	).sort({title: 1}).limit(50).pretty()
	

// Part 2 - CREATE 
// MOVIES
// Add three movies that were released between 2017 and 2021.

// Movie 1
// 	Dune

db.movies.insertOne(
  {
    "_id" : ObjectId("573a1390000313caabcd4217"),
    "title" : "Dune",
	"year" : 2021,
	"cast" : [
				"Timothée Chalamet",
                "Rebecca Ferguson",
                "Zendaya",
                "Jason Momoa"],
	"plot" : "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
	"directors" : [
				"Denis Villeneuve"],
	"imdb" : {
		"rating" : 8.2,
		"votes" : 400,
	},
	"genres" : [
				"Action",
				"Adventure",
				"Drama"
				]
	}
)

// Movie 2
// 	Lady Bird

db.movies.insertOne(
  {
    "_id" : ObjectId("573bb440000313caabcd4217"),
    "title" : "Lady Bird",
	"year" : 2017,
	"cast" : [
				"Saoirse Ronan",
                "Laurie Metcalf",
                "Tracy Letts",
                "Lucas Hedges"],
	"plot" : "In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.",
	"directors" : [
				"Greta Gerwig"],
	"imdb" : {
		"rating" : 7.4,
		"votes" : 360,
	},
	"genres" : [
				"Comedy",
				"Drama"
				]
	}
)

// Movie 3
// 	Marriage Story

db.movies.insertOne(
  {
    "_id" : ObjectId("573bb65df70313caabcd4999"),
    "title" : "Marriage Story",
	"year" : 2019,
	"cast" : [
				"Adam Driver",
                "Scarlett Johansson",
                "Julia Greer",
                "Azhy Robertson",
				"Wallace Shawn"],
	"plot" : "Noah Baumbach's incisive and compassionate look at a marriage breaking up and a family staying together.",
	"directors" : [
				"Noah Baumbach"],
	"imdb" : {
		"rating" : 7.9,
		"votes" : 280,
	},
	"genres" : [
				"Comedy",
				"Drama",
				"Romance"
				]
	}
)

// Create User Collection with two user documents

db.users.insertMany( [
  {
    "_id": "20095610",
	"name": "Mags McCarthy",
	"email": "20095610@mail.wit.ie",
	"password" : "test123",
	"phone number" : "0218844448",
	"favourites" : [
					{ "title" : "Cinderella", "_id" : ObjectId("573a1390f29313caabcd4217") },
					{ "title" : "Marriage Story", "_id" : ObjectId("573bb65df70313caabcd4999") },
					{ "title" : "Jack and the Beanstalk", "_id" : ObjectId("573a1390f29313caabcd42bf")}
					]
  },
  
   {
    "_id": "20095622",
	"name": "Denis Lyons",
	"email": "denis@lyons.ie",
	"password" : "password",
	"phone number" : "0812255487",
	"favourites" : [
					{ "title" : "The House of the Devil", "_id" : ObjectId("573a1390f29313caabcd418c") },
					{ "title" : "A Terrible Night", "_id" : ObjectId("573a1390f29313caabcd41a9") },
					{ "title" : "Tables Turned on the Gardener", "_id" : ObjectId("573a1390f29313caabcd413e")}
					]
  }
 ]
);
		
// Part 3 - UPDATE
 
// Update the IMDB rating on the movie Marriage Story to a new value and increase the number of votes by 1

db.movies.updateOne(
   { _id: ObjectId("573bb65df70313caabcd4999") },
	   {
		   $set: { "imdb.rating": 8.1},
		   $inc: {"imdb.votes": 1}
	   }
)

// Add a tomoatoes subdocument to the Lady Bird 

db.movies.updateOne(
	{_id: ObjectId("573bb440000313caabcd4217") },
		{
			$set: {
				"tomatoes" : {"viewer" : { "rating" : 4.2, "numReviews" : 180 },
                "lastUpdated" : ISODate("2017-12-14T18:50:27Z")}
			}
		}
)

// Add a new favourite to the array in Mags Mccarthy's user Document

db.users.updateOne(
{_id: "20095622" },
	{
		$push: 
			{ "favourites" : { "title" : "Panorama of Esplanade by Night", "_id" : ObjectId("573a1390f29313caabcd4292") }
			}
	}
)

// Update to add a new Address field to the user collection to all users.  
// * Set the default value of the address field to 'Default Address"

db.users.updateMany(
{},
	{ $set: {"Address" : "Default Address"} },
	false,
	true
)
				
// Update the movies collection to change the name Ireland to Republic of Ireland .  	

db.movies.updateMany(
   { countries: "Ireland" },
   { $set: { "countries.$[country]" : "Republic of Ireland" } },
   	   { arrayFilters: [ { "country": { $eq: "Ireland" } } ] }
)	

// Part 4 - DELETE 

// A delete statement to delete one of the movies that was added.

db.movies.deleteOne( { title: "Marriage Story" } )  





















