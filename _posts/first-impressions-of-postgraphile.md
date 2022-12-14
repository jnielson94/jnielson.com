---
slug: first-impressions-of-postgraphile
date: '2021-01-12'
title: 'First impressions of Postgraphile'
coverImage: /assets/blog/undraw_dashboard.png
---

Over the last few months I've gotten to work on a project utilizing
[Postgraphile](https://www.graphile.org/postgraphile/) for the first time, and
it was pretty fun! I was jumping into the project near the end, so I wasn't
involved in setting up the library, but I did get a fair amount of usage time in
and wanted to write down and consolidate some thoughts I had.

One of the first things I needed to do involving Postgraphile was changing the
database schema, something that the other people working on the project had
setup [graphile/migrate](https://github.com/graphile/migrate) to handle. It was
super straightforward to use, which I appreciated, especially since Postgraphile
didn't require a server restart after running migrations.

## Some high level thoughts

After my first couple days I wrote down the following thoughts about
Postgraphile. I'm sharing them pretty raw here, but I think they say a lot about
the things that stuck out to me off the bat.

- Security rules on the database level should exist anyway, so it makes sense to
  use those as your security model
- Using comments on the columns to control what goes into the graphql is kind of
  mind-bending, but works super well
- RLS (row-level security) in Postgres is nifty. Super nice for user-specific
  data.

## Handling non-user inputs

One of the first tasks I was completing on the project was adding a new table
for an upcoming section of the application. We wanted to keep track of
created_at and updated_at timestamps (which should be set automatically and not
by the user), something that I've done previously by using Date.now() in the
mutation handler that creates or updates the item. I'd frequently forget to
include that in a spot and end up with actions that don't update the updated_at
timestamp, causing inconsistencies! Inconsistencies are some of the worst bugs
to track down in my opinion since they're usually super subtle and hard to
replicate on demand.

Postgraphile's
[documentation recommends](https://www.graphile.org/postgraphile/postgresql-schema-design/#triggers)
keeping created_at and updated_at correctly set for rows by utilizing a
[trigger](https://www.postgresql.org/docs/current/sql-createtrigger.html).
Following their recommendation was super straightforward, since their
documentation had this exact example. This approach results in handling this at
the database-level which lets you can manually test if it works by adding or
updating a row directly in the database without needing to run it through the
GraphQL layer and thereby avoid some complexities.

## Sometimes you need to adjust your approach

At one point while working on the project we needed some file upload
capabilities. I helped review the pull request adding this since it required
changing how we had the server setup. Instead of utilizing Postgraphile
middleware directly the PR changed the project to utilize
`apollo-server-express` with Postgraphile as a plugin and schema generator.

We learned that sometimes there are things you need to do that a tool just can't
do, like Postgraphile natively handling file uploads in the timeline we were
working on... so you adjust and hack things together to make it work! Thankfully
we were able to utilize a library
[postgraphile-apollo-server](https://github.com/graphile/postgraphile-apollo-server)
to make that transition easier and avoid needing to rewrite a bunch of code to
get us on apollo-server.

### Hidden functionality

After making the switch to `apollo-server-express` we learned that there was
some functionality in the Postgraphile middleware that wasn't replicated as some
things that didn't seem related broke after this change. The main thing we ran
into was handling JSON objects is different between apollo-server-express and
Postgraphile. Postgraphile automatically stringifies and parses JSON where
needed, while apollo-server-express requires the developer to add that in where
needed. Since we had started with the library that did it automatically, it was
super painful to come across places we needed to do this after switching.

## Things I liked in Postgraphile

Working with Postgraphile itself is actually super straightforward. As I
mentioned in my high level thoughts earlier the reliance on the database for a
lot of features makes a bunch of sense when your goal is to avoid re-working and
duplicating features that already exist there. I really liked the experience of
working so close to the database since if there were issues there was only 1,
maybe 2, places to look for where that logic would be.

Another thing I really liked about the setup was the generated database schema
file, since it made PR reviews super easy for database changes. For example, in
order to adjust a function in Postgres you utilize `CREATE OR REPLACE FUNCTION`
in your migration and would need to include the entire function in order for the
migration to work properly. But, after the migrations were run the `git diff` of
the generated schema only contained what actually changed making it super easy
to validate in PR review.

## There are always tradeoffs

One thing that I found while working with Postgraphile, and earlier last year
while working with TypeORM, is that everything has tradeoffs. Something that one
library chooses to make super easy to do will likely make something else way
harder.

## Things I want to look into with Postgraphile

- Testing
- Subscriptions
- Debugging deeper problems

Something I've been wanting to focus more on is testing, especially in the node
backend code that I write. I haven't seen much focus on testing in the overall
node GraphQL ecosystem, but Postgraphile does have a
[guide on testing with jest](https://www.graphile.org/postgraphile/testing-jest/)
available that looks pretty solid.

GraphQL subscriptions weren't needed for this project, but they're talked about
in the Postgraphile documentation. I'd want to read through that before
committing to using Postgraphile in a project that needs subscriptions since I
have no idea how they are to work with.

Most issues I've run into with Postgraphile so far I've been able to work out
through the GraphQL playground or direct database queries how to fix. I'd be
interested in looking at the deeper debugging story - what happens when it seems
like Postgraphile isn't working correctly. I've had to dig in like that a few
times with TypeORM this last year and it was super painful since TypeORM has
decent "info" logging, but very little "debugging" logs.

## Would I start a new project with Postgraphile?

After spending a few months working on a project utilizing Postgraphile I think
it's a solid pick for a project where you already have a postgres database and
want to put a GraphQL server on top of it. The next project I'm working on is
using [Blitz.js](https://blitzjs.com/) which utilizes Prisma 2 for the default
database client, and that seems like the option I would usually reach for. It
should be fun!

_Banner image courtesy of undraw.co_
