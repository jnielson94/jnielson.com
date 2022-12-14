---
slug: evaluating-javascript-open-source-packages
date: '2019-09-16'
title: 'Evaluating JavaScript Open Source Packages'

coverImage: '/assets/blog/undraw_instant_analysis.png'
---

In almost every project there will come a point where you reach for an existing
package to augment your source code to make it simpler, more robust, or to
reduce the amount of maintenance. When you reach for a libary it is important to
evaluate the different options available, on a number of different fronts. If
you simply evaluate a package based on if it will accomplish the task you have
for it, you might miss out on some important considerations that can come back
and hurt you later. For instance, if you pick a package that only has 1 line of
actual source code and no tests does that package really give you any benefits?
I would say it doesn't, but each project is different and it might be helpful to
your project to be able to import that 1 line from a package instead of a local
file.

So, what do you consider when evaluating a package? In my experience, it's
helpful to have a list ready to go through for each package that you think might
work for the need you have. My list usually looks something like the following:

- License permissiveness
- Stability
- Maintenance Level
- Popularity
- Documentation Quality
- Amount of code in the library
- Amount of code it will require/save in my project
- Open and Closed Pull Request trends
- Contributing Documentation

In using this list, I have a number of questions I ask myself to evaluate each
category, which I'll include below. You should generally answer as many
questions as you need to ensure a package isn't a definite "no", and write down
your answers! By writing down the answers that you come up with to each question
you pose for the various packages you're providing notes and documentation for
future you in order to answer the question 6 months from now, "Why did you
choose [this package] over [that package]?" (which comes up more often than
not).

I want to point out that this list is definitely personal opinions that I have
found useful in my projects. If you have other suggestions, feel free to share
them with me! I'd love to know what other people do when evaluating packages,
since there might be critical steps I'm missing.

## License permissiveness

The first point that I usually check when evaluating a potential solution to my
problem is the license that it uses, and how permissive that license is. When
evaluating packages for use in a work project it's super important to follow the
guidelines of your organization, as it can cause some major issues if you use a
license incorrectly. So, the questions that I ask myself regarding the license:

- Is the license on the short-list of pre-approved ones for the organization?
- Is the license something I'm comfortable with using in a personal project?
- Does the license require any sort of attribution or having my project adopt
  that license?
- Is using this package worth the license requirements?

## Stability

In order to properly evaluate a package for use, I feel like looking at how
stable the package seems is critical to future efforts to stay up to date. I
recently wrote
[about upgrading your project dependencies](https://jnielson.com/upgrading-your-javascript-project-dependencies)
and the work that it takes to do that regularly is significantly less if you use
stable packages. How do you determine a package's stability? I usually use
questions like the following:

- Are there frequent releases? (This could be good or bad depending on the
  package)
- Do they utilize alpha/beta/canary releases to test out changes? (and do people
  use those?)
- Does it seem like people usually stay on the latest version? (This is a hard
  question to find data on quickly, but super worthwhile)
- Is there a cycle for making breaking changes (major versions when using
  semver)?
- Is there a large number of open issues? (Raw issue counts don't always share
  useful information, but it can be helpful to check)

There's all sorts of different metrics and things you can check on to try and
determine how stable a package is, but I find it important to consider because
some of the other aspects become significantly less important if a package is in
a stable state and doesn't require any major changes or bugfixes.

## Maintenance Level

If you have a project that isn't particularly stable, it becomes vital to
determine what the current maintainer's level of involvement is. If there's just
a single person working on the package, is that their full-time job? Or do they
have other higher-priority things? If there's multiple maintainers you might
consider if it seems like there's a "lead maintainer" who if they dropped off
the package would stop moving forward. Particularly with less stable packages,
having changes and improvements stop is not what you want to have happen since
that could lead to critical bugs not being able to be fixed without forking the
package. In determining the maintenance level I tend to ask myself questions
like:

- How many contributors are there to the package source code?
- Does it look like there's a single person with permission to release updates,
  or can multiple people?
- Are there any people working on it full-time? (Not every package needs
  full-time people working on it, but core ones I like to have it)
- How quickly are issues and pull requests addressed? Does it seem like the
  maintainers work on it in spurts?
- Is there a way to contribute funding/support to the maintainers? Can you do
  that?

## Popularity

An important consideration in tandem with the Maintenance level is the
popularity of the package. If a package is popular enough, it becomes more
important to have a higher maintenance level through full-time maintainers or
other means. But, important packages are useful because the maintainers tend to
develop better habits relating to releases and documentation as the package
increases in popularity. Picking a package purely because it is popular isn't
always the best choice for a project, but it can make a difference in the
resources that are available to help you figure out how to use the package. It
can also impact how likely it is that the package maintenance will be picked up
should something happen to prevent the current maintainers from keeping up with
it. An important consideration with popularity is usually the package download
count, but I don't find that metric to be particularly useful since it doesn't
give any insight into how many projects are actually utilizing the package. I
like the new Github "Used By" badge a little more but it still has some serious
limitations. For now, I will just point out the things that I use to try and
approximate how popular a package is:

- What do the comparative download counts look like? (It's important to use
  relative amounts, since raw download counts are meaningless)
- What does the github "Used By" badge say? How does that compare with other
  options?
- How does the project compare in google result counts?
- Are the questions on stackoverflow answered and accepted? Does it look like it
  is a community effort to answer questions?

For comparative download counts I usually use
[npmtrends](https://www.npmtrends.com/styled-components-vs-emotion-vs-glamorous),
which doesn't provide a complete picture but can give you a decent idea of what
the package looks like from that perspective. StackOverflow allows you to view
tags, so you could check the
[styled-components](https://stackoverflow.com/questions/tagged/styled-components)
tag to get a feel for if those questions are being answered and who is answering
them.

## Documentation Quality

An important and often overlooked aspect of an open source package is how good
the documentation is. For simple packages the documentation might be sufficient
as a simple readme that details the exports and how to use them. For more
complex packages you'll often find they have an entire site dedicated to
documentation. In either case, it is important to consider the documentation
quality relative to the code you're pulling in. I generally use questions like
the following to assess the quality of the docs:

- When was the README last updated?
- Does the README include all the exports from the package or are there
  undocumented features?
- Is there a changelog or place for release notes?
- Are the changelog/release notes more clear than the list of commits?

If they utilize a documentation website I'll check that out (ideally the source
code for it in addition to the live site), using questions like the following
(in addition to looking at the in-code documentation):

- Does the website get updated when things change?
- Is the website organized to make it easy to find what I need?
- Does the website have missing information?
- Are there terms on the website that are unclear and not explained?

Evaluating documentation quality is very personal, since what might make perfect
sense to me has the possibility of completely confusing the next developer to
come along. This is a step that I think it's super useful to get more than one
person's opinion on, since usually people will generate an opinion on
documentation as soon as they look at it the first time. Doing a review of the
available documentation is pretty critical in making sure that the library
actually solves the problem you're trying to solve, but it also helps to
evaluate how easy it will be to figure out how to use the library and handle the
weird things that will inevitably come up.

## Amount of code in the library

Sometimes pulling in a package is helpful, but other times if you're just going
to use it in a couple places you might be better off with writing more specific
code for your project. In a lot of cases packages have extra abstractions that
make them more reusable but add more code than you might need in your use. It
might also be the case that there's a built-in language feature that can do
most, and sometimes all, of what the package does. For example, it used to be
common to use the `left-pad` package (and it still has 4 million weekly
downloads), but JavaScript has a built-in `padStart()` method which does the
same thing and doesn't require you to pull in a package. So, in some cases you
want to make sure to ask yourself questions like:

- Can this be done using a built-in language feature?
- Does the package provide extra features I don't need?
- Would there be a significant maintenance increase in my project to write the
  functionality myself? (Usually this is a yes, but some packages are trivial)
- Does the package have tests and other code quality tools used that I don't
  want to replicate?

## Amount of code it will require/save in my project

Something that isn't talked about often enough when using packages is the idea
of how much code is required to consume the package. In some cases, it might be
worthwhile to build a project-specific version of a package simply to reduce the
amount of code needed to use the package. Dan Abramov wrote a post titled
["Optimized for Change"](https://overreacted.io/optimized-for-change/) which
mentions this idea of "second order" API design - how does code using this API
will look and evolve. In order to evaluate this idea for packages I look at, I
tend to address questions like the following:

- How long are the examples?
- How much difference is there between the examples? Is there a lot of
  boilerplate?
- Does the amount of code the package saves outweighs the amount of code it
  requires me to write?

## Open and Closed Pull Request trends

Another thing to glance at related to Maintenance level is the open and closed
pull requests for the package. If a package has a bunch of open pull requests
that sit there for a really long time with no movement then there's likely an
underlying issue with the maintenance level that I wouldn't want to commit to
using the package. If there's no open pull requests that's usually a good sign,
but if there haven't been any pull requests in the recent time span I'd want to
make sure I had evaluated how stable the project is earlier on. If there's a lot
of open pull requests but also lots of recently closed pull requests it could
simply be an incredibly active package, but in most cases I've come across the
issue is usually related to a lack of maintainers. So, I ask questions like:

- How long have open pull requests been open?
- Are there any recently closed pull requests?
- Does it look like pull requests are closed in batches? How frequently does
  that happen?
- Are pull requests usually closed (declined) or merged?
- Is there a lot of chatter on pull requests before they're approved or
  declined?

## Contributing Documentation

One of the last things that I check is if the project has contributing processes
documented. Usually this isn't too big a deal since most people will document
them as a favor to future them, but sometimes a project only has a single
maintainer who hasn't cared to document the process used to make changes to the
package in a reliable way. The questions here are usually:

- Does contributing documentation exist?
- Is there a pull request or issue template?

## Conclusion

Once you put a package "through the ringer" and evaluate it, then what? How do
you determine what package to use? Usually it comes down to a personal/project
preference of what package makes the most sense. In almost all cases it will be
a trade-off as one package might be smaller but less robust or another might be
more feature-complete but add some extra bundle size that you'd prefer not to
add. In any case, what packages you ultimately choose should be a decision that
you are able to back up, so ideally you write down the answers to the questions
you posed to each package as you do it in order to have some documentation for
future you! I find that there's great value in being able to answer the
question, "Why did you choose this package over the other option?" 6 months down
the road by having notes, particularly since if things have changed in those 6
months you have the notes from last time and you can re-evaluate with ease!

---

## Outline / Prep

What matters with a JavaScript Open Source Package? (Not ordered)

TL;DR Points:

- Check the stability and popularity - are there frequent releases? Do people
  use it?
- What's the Maintenance level? Are there people working on it full-time?
- Code/Documentation/Contributing quality - are things documented and working?
- License check is vital! Make sure it is a license you can use
- Consider writing it yourself if it's insignificant?

* Stability (How often do they release? Do they do alpha/beta releases? Do
  people use those?)
* Maintenance level (are people working on it full-time? Does it have multiple
  contributors? etc)
* Popularity (How many other projects depend on it? What do the download counts
  look like?)
* Code Quality (Do they have tests? CI builds?)
* Documentation quality (Is it up to date? Do they have previous versions
  available? Is it a separate site or just a readme?)
* Contributing Documentation (Does it exist? Do they have Issue/PR Templates in
  github?)
* Open and Closed Pull Requests (Did they sit for a long time? Was there
  back-and-forth conversation about them?)
* What license(s) does it have involved in it? (Is it clear why it has those?
  Does your organization allow it?)
* How much code is actually there? (bundlephobia & looking at the source - it
  might be better to inline)

_Banner image courtesy of undraw.co_
