const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID} = graphql;
const _ = require('lodash');
const Book = require('../models/bookSchema');
const Author = require('../models/authorSchema');

// dummyData
const books = [
    {name: 'Name of the wind', genre: "Fantasy", id: "1", authorId: "1"},
    {name: 'The Final Empire', genre: "Fantasy", id: "2", authorId: "2"},
    {name: 'The Long Earth', genre: "sci-fi", id: "3", authorId: "3"},
    {name: 'Name of the wind', genre: "Fantasy", id: "1", authorId: "1"},
    {name: 'The Final Empire', genre: "Fantasy", id: "2", authorId: "2"},
    {name: 'The Long Earth', genre: "sci-fi", id: "3", authorId: "3"},
];

const authors = [
    {name: 'Patrick Rothfuss', age: "44", id: "1"   },
    {name: 'Brandon Sanderson', age: "42", id: "2"},
    {name: 'Terry Prachett', age: "66", id: "3"}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        authorId: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({id: parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from database
               return  Book.findById(args.id);

            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from database
               return  Author.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // code to get data from database
               return  Book.find({})

            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // code to get data from database
               return  Author.find({})

            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        addAuthor: {
             type: AuthorType,
             args: {
                 name: {type: GraphQLString},
                 age: {type: GraphQLInt}
             },
             resolve(parent, args){
                 let author = new Author({
                     name: args.name,
                     age: args.age
                 });
                return  author.save();
             }
        },        
        addBook: {
             type: BookType,
             args: {
                 name: {type: GraphQLString},
                 genre: {type: GraphQLString},
                 authorId: {type: GraphQLString}
             },
             resolve(parent, args){
                 let book = new Book({
                     name: args.name,
                     genre: args.genre,
                     authorId: args.authorId
                 });
                return  book.save();
             }
        },        
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
