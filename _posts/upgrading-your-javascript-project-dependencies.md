---
slug: upgrading-your-javascript-project-dependencies
date: '2019-09-11'
title: 'Upgrading Your JavaScript Project Dependencies'

coverImage: '/assets/blog/undraw_update.png'
---

- Why Should we Update?
- How often should we update?
- What is the best way to update?
- When should we not update?
- Why is updating hard?
- What makes it easier?

Some time ago, I set off to answer the above questions. In my position at work
we interact with a lot of developers on a number of different projects. Some
projects are consistently up to date, while others are always at least 6 months
behind. From what we've seen, the difference between these two groups of
projects is usually not in how they view updates (generally people want to
update), but in how much care they give to maintaining their project. The
projects that are up to date, are also usually the ones where the developers are
encouraged to spend time refactoring code when they're working in a section of
the application, or the ones with the best documentation. On the other hand, the
projects that are consistently out of date are the ones where developers are
encouraged to go as fast as possible in adding new features, and rarely go back
to refactor or document.

## A Lawn Analogy?

This is a similar idea to taking care of your lawn, since if you only work in
your lawn in the place where you're planting a new flower, tree, or bush, the
other areas just grow and grow without ever being pruned or cared for.

![Beautiful Lawn from Wikimedia Commons](Beautiful_Lawn.jpg)

Eventually, you might get a notice from someone that you have a tree about to
hit a power line and you have to have it trimmed or they'll cut it down at the
end of the month. At this point, the work to trim the tree is significantly
greater than if you would have pruned the tree a few months ago and spent some
time keeping the tree well maintained. Some people when faced with this
situation will let the company come cut it down and then pay the charges that
come from it, while others decide it is worth the effort to trim the tree back
themselves, and still others hire someone else to do it for them in an effort to
save the tree.

How does this relate to updating your project dependencies? Well sometimes you
have a project where you do a great job of regularly updating your dependencies
and it takes a little effort regularly but more often than not it's
straightforward. Other times you have a project where you only work on it
occasionally and so it never receives any updates and when you do decide to
update it takes forever and a ton of work (like this blog, which hasn't been
updated in a while and has some 44/55 dependencies out of date). Since I've come
clean and pointed out that my blog site hasn't been updated in a while, I'm
going to take this chance to outline my thoughts on answers to the above
questions (essentially who, what, when, why, and how - the basic questions of
life they taught me in school) and hopefully that motivates me to update my own
blog.

## Why update?

So, why should we update? From what I've seen the typical answers for why update
include things like the following:

- Bug fixes
- Security patches
- Cool new features
- Easier to submit bug reports
- Keeping up with major changes to make future updates easier

In my experience, the number one reason to update is to receive bug fixes. In
pretty much every release of the libraries I follow there are at least some sort
of bug being fixed, even if it doesn't impact me right then. Related to bug
fixes are the important security patches, which are occasionally back-ported but
more often you just need to be on the latest version in order to get them.
Sometimes they are so vital that it's worth being on the "bleeding edge" or the
latest release of a library to get an update that fixes some bug or security
issue that has actually impacted you, and I know that libraries appreciate those
who are willing to risk being on the "bleeding edge" and trying their alpha or
canary builds in order to get a good test of it before promoting it.

Another reason to update is to make future updating easier. If you take the time
to make it over that major update spot you'll be able to more easily update in
the future since usually libraries and tools release changes in an incremental
fashion that gives you an easy set of steps to follow if you're on the latest
version. For instance, React recently released a version that deprecates some
component lifecycle method versions, requiring you to rename your uses of them
to an `UNSAFE_` variant. But, they've also provided a codemod that you can run
which will do it for you automagically! In cases like this, the codemod would
theoretically work on any version of the library that has support for the
feature. In the case of storybook.js, in version 5.2 (which is in a release
candidate version right now) they introduced
[a new way to write your stories called CSF](https://medium.com/storybookjs/component-story-format-66f4c32366df).
They also provided a codemod that allows you to automagically update most of
your stories, but there are cases that it doesn't work for. In cases like that,
being on the latest version of the library ensures that you can receive the best
support since that's the targeted upgrade path they've been working on.

From the above cases, you can see that there are some huge upsides to using
popular and stable libraries that try to minimize breaking changes. They're
motivated to keep people on the latest version, and so they provide tools to
make upgrading easier or change things less drastically since drastic changes
make for harder upgrades!

## How often?

Now that you've been convinced that you should update (and if you're not
convinced, reach out to me with suggestions on how I could improve that
section), how often do you update things? Well, it really depends on your
project! From what I've seen, there are about 4 categories you could split into:

1. Active development applications
2. Maintenance ("every so often") applications
3. Libraries
4. Rarely touched and even more rarely organized projects

In my experience with applications you can get into a pretty good rhythm based
on how much you work on the project. From what I've seen, projects that are
actively worked on (daily in most cases) should be trying to update their
dependencies every "sprint" near the start to give time to naturally test the
updates instead of needing to run through all the test cases for your
application right before releasing things. In other words, if you update early
in a cycle you can spend some time to fix things that crop up instead of trying
to do it late in a cycle and having to rollback if you run into any issues. Some
people might find updating every sprint to be overkill, but I'd suggest that
it's better to have a small update reguarly instead of waiting until there are a
large amount of updates.

In a different case you have the applications that are worked on "every so
often" when there's a major bug or some feature that needs to be added/adjusted.
In this case, I find it best to check for updates but not actually do them
unless they're minor and easy to verify. In the case of projects like this I
tend to let updates build up a little bit, so that once you've got enough
updates that look useful/major/helpful you can add a task to do the updates with
a full verification that things are still working after. Ideally you'd have
written automated tests that can be used to speed up that verification, but I
haven't seen many projects that actually do that effectively.

For libraries I've found that as often as there are updates to dependencies it's
worth at least looking into updating to use it. In most cases there is benefit
to updating and releasing a version since those updates will include bug fixes
that you might not have run into but your consumers might.

The last category of suggestion that I've found is inactive side projects, or
things that are worked on so in-frequently that there isn't even a system in
place to track what needs to be done. Since I've been blogging more regularly
lately this project doesn't fall into that category anymore, but for a while I
didn't even have a list of things that I wanted to blog about or do to my blog
since I hadn't touched it in months. In the case of projects that haven't been
touched in months usually I've found it more useful to do what needs to be done
and get out, or get back into a regular cadence of working on it before trying
to update. In the case of my blog site, I've been enjoying the current authoring
experience enough that I've been doing it in a more regular manner which makes
it easier to justify updating things.

## How to update?

Once you've determined how often to update, how do you actually do it? How do
you make it happen on that schedule that you just determined? In my opinion,
using one of the tools that will automatically check your package.json for
updates is the best way to go if your source is open and available. I haven't
investigated them too much, but I've seen projects use tools like `greenkeeper`
or `renovate` with what seems to be great success. In most cases, these tools
can submit a pull request to your project whenever a new version is released and
if you've got it setup correctly that can trigger a run of your test suite and a
test deployment of the application. In cases that you have closed source or want
to do it more manually, there are great tools like `depcheck` or `npm-check`
(which is best run as `npx npm-check -u` in the project folder, in my opinion)
which can programmatically read your manifest file and check for the latest
versions. Either of these approaches are preferred in my mind over manually
check with `npm show [package]` or similar going through your dependencies one
by one to check for a newer version and update to it. In my opinion, this is a
case where automation can really shine though, so embrace it!

For the `npm-check` tool (the one I use most frequently), if you use it with
`npx npm-check -u` in your project, the output would look something like this if
you have no updates:

![npm-check no updates output](npm-check-no-updates.png)

If you have a few updates it would look something like this:

![npm-check a few updates output](npm-check-few-updates.png)

While if you have a lot of updates it provides some nice pagination for you:

![npm-check many updates output](npm-check-many-updates.png)

In the case of the minor and patch updates that it splits out for you, those are
usually pretty safe if the libraries you use follow `semver`. If they don't that
makes things more difficult, but most JavaScript packages (the topic for this
post) do use semver and try to stick to it. If you update a patch/minor update
and it causes issues, most libraries will work with you to fix them and release
a new minor/patch update.

In the cases of more major updates, libraries or tools will frequently include a
`codemod`, or a script that can be run that allows for automatic updating to a
new syntax, name, etc. These codemods are super handy, and I'd highly recommend
using them! If you have a case where one isn't provided, write your own! Most
codemods I've seen use [jscodeshift](https://github.com/facebook/jscodeshift)
under the hood, and I would think most library maintainers would appreciate some
help getting people to update (I know I do!).

Outside of automated tooling, you'll want to make sure that you read through any
provided documentation like changelogs or release notes that can give you
insight into things you might need to update. For example, if you're running
into issues installing a library like `gulp-sass` or `node-sass` the first place
you'd want to go is to check their release notes to make sure that the version
of node you're on is compatible with the version of the library you're trying to
install. In this specific case, the library depends on some native hooks in
node, and so if it isn't compatible with your node version it won't work at all.
So, you'd go to their releases page,
[like the one for `gulp-sass`](https://github.com/dlmanning/gulp-sass/releases)
which usually looks to just say it updated to X version of
[`node-sass`, which has a releases page as well](https://github.com/sass/node-sass/releases/),
which details what versions of node are supported.

## Are there times to not update?

Sometimes, especially when projects use the automated tools mentioned above I've
seen some of the update pull requests sitting for a long while. I've
occasionally wondered why that is, since these projects have a great test suite
that ensure things are still working on the new version of the library, but for
whatever reason the maintainers have chosen not to merge the pull request. In my
thinking, there are a few reasons for this:

- Some feature was removed without a replacement (usually results in tests
  failing though)
- Want to allow major versions time to "bake" (get bugs out and let others find
  regressions and issues)
- Want to hold off on dependency updates and batch them
- Higher priority projects or tasks don't leave time for lower priority projects
  or updates

If you know of other reasons that people choose not to update, let me know and
I'll add to this list! I'd love to understand the why behind them, especially in
cases where the tests (automated and manual) still pass. From what I've seen
most of the time it's to allow "baking" of the update, and the pull request gets
merged after a couple weeks (and run with the latest project code). This time
allows others in the community to find issues for you, and ideally gives you a
better experience in updating. Some people have enough risk tolerance to update
immediately though, and those are the people that I appreciate for their efforts
in stabilizing the dependencies.

## What makes updating hard?

Outside of the times that you choose not to update for whatever reason (if it
isn't captured I'd appreciate you sharing it with me!), there are times where
updating is just plain hard. That's okay. Sometimes the project is so large and
complex, or there are too many things that need updates, or you simply don't
have time to test all the things in your application that could potentially be
impacted by an update. In all of these cases, there are valid reasons to not
update or to put it off, but from what I've seen people usually regret those
decisions-especially in projects that are in active development since they come
due later. So, some things that I've found that make updating hard or more
difficult:

- Requires ensuring nothing in your code has broken
- Incomplete documentation on what changed
- Updates are super frequent (some libraries release new versions almost daily)
- Requires checking for the updates (manually or automatically)
- Some libraries don't follow a versioning scheme (semver)

As I said earlier, each of these is a totally fair reason to not want to update.
In most of these cases there are things you can do to make it easier, but
sometimes it is just plain hard. The hardest I've had to deal with is libraries
that don't follow any sort of versioning scheme, so you never really know what
you're going to get when you update. Most projects I work with follow
[semver](https://semver.org), which provides a nice framework to make your
update decision within. But, the ones that don't (or say they do but are still
on `0.x.x` versions) are incredibly difficult to keep track of.

## What makes it easier to update?

Outside of the truly hard cases, and in spite of them, there are some things
that you can do in your application to make it easier to update. For example:

- Automated tests that give you confidence
- Automated tools that make it less manual to check for updates
- Reading documentation and changelogs (and submitting pull requests that
  update/create them if they don't exist!)
- Making it a regular task is easier than doing a huge update every couple
  months

One of the best things that you can do to make updating easier is to create a
suite of tests that can be automated and run whenever you update. When you've
got tests that give you confidence it makes it way easier to catch when an
update breaks things (expectedly or unexpectedly) and also speeds up the update
process. To some extent, automated tests are a requirement for regular updating
since without them you'll likely fall into the trap of feeling like you need to
manually test your entire application after any updates, regardless of their
size. Ideally your tests are written in such a way that if a dependency changes
it doesn't fail unless your application legitimately breaks, but that's a
different issue.

In addition to tests, using the automated tools I mentioned above make it way
easier to manage a large number of dependencies. For instance, `npm-check`
provides links to the readme/changelog/repository if it can find it, which is
super useful to go check and see what changed.

To reiterate, having a regular task of updating makes a huge difference in how
much effort it takes! It is way easier to justify and make time to read 3 or 4
changelogs for libraries then to go through 40+ and do a major update on most of
them. In any case, you're way more likely to quickly diagnose issues when
updating 2 or 3 dependencies at a time, even if you eventually have to
update 44. There are times where you have dependencies that need to be updated
at the same time in order to ensure you don't run into larger issues. For
example, storybook and next both use babel under the hood. A while back they
were updating to babel 7, but they did it at different times and so it was
significantly easier to wait until they were both on babel 7 and update our
projects after that. The alternative would have been to update one and adjust
configs and things to isolate them to support babel 7 in one case and babel 6 in
another, which is doable... but work that would then need to be un-done once
both were on babel 7. So again, there are times where it makes sense to put off
updating or just not do it.

Another point to making updating easier is to have less dependencies. It might
seem obvious, but updating is less painful if there is less of it to do! One
great way to accomplish this is using tools like `gatsby` or `next` which
provide a lot of the tooling that you need to get up and running for you, and
hide a huge number of dependencies (and update them for you!) to make it easier
to work on your actual project. One feature of `gatsby` that I'm loving is
themes, since they can abstract even more away for you. Since I originally wrote
this post I spent about a day updating to use the
`@eggheadio/gatsby-theme-egghead-blog` and got to rip out most of the things I
had in my blog codebase from the `@eggheadio/gatsby-starter-egghead-blog`, since
they now exist in the theme! It was actually a pretty fun experience updating
from the starter to the theme, especially since I hadn't done all that much to
customize it and could just rip most of it out.

That's all that I've got for now on updating dependencies, feel free to reach
out if you have other thoughts on the matter as I'd love to hear them! Thanks
for reading! For those who might appreciate seeing a bit of the process, I left
the outline for this post below (it also provides a nice summary for those who
might have skimmed). If you like that, let me know and I can do it more often!

## Outline (for reference if someone was curious or wanted an overview)

- Why Should we Update?
  - Bug fixes from dependencies
  - Security patches from platforms/libraries (ex. node)
  - Cool new features (ex. react hooks)
  - Easier to submit bug reports (most libraries require you to be on the latest
    version to ensure the bug still exists)
- How often should we update?
  - It depends!
  - Active applications should at least check for updates each "sprint" (every
    couple weeks) to avoid build-up, and should do updates at least monthly
  - Maintenance applications should do minor updates regularly-every 2 months or
    so (#semver), with tickets/notes to complete major updates with more testing
  - Libraries should update as often as needed (usually they have less
    dependencies), ensuring to communicate semver changes as needed
  - Side projects (like my blog) get an update when there's time - making
    progress is more important than updating unless you've hit a bug or need a
    feature
- What is the best way to update?
  - Use automated tools or scripts like `greenkeeper`, `renovate`, `depcheck` or
    `npm-check`
  - Other options include manually installing the latest version of packages
  - Automation is great at this though
- When should we not update?
  - Feature removed that you need without a replacement
  - Major version changes sometimes need some "baking" time to find and fix
    major bugs or regressions (ex next 9.0.1 fixed some dynamic routes issues)
- Why is updating hard?
  - Requires ensuring nothing in your code has broken
  - Incomplete documentation on what changed
  - Updates are super frequent (some libraries release new versions almost
    daily)
  - Requires checking for the updates (manually or automatically)
  - Some libraries don't follow a versioning scheme (semver)
- What makes it easier?

  - Automated tests that give you confidence
  - Automated tools that make it less manual to check for updates
  - Reading documentation and changelogs (and submitting pull requests that
    update/create them if they don't exist!)
  - Making it a regular task is easier than doing a huge update every couple
    months

_Banner image courtesy of undraw.co, lawn image from Wikimedia commons_
