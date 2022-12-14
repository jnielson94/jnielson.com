---
slug: balancing-reuse-and-duplication-with-react
date: '2021-02-05'
title: 'Balancing Reuse and Duplication with React'
coverImage: /assets/blog/undraw_logic.png
---

Working with [Components](https://reactjs.org/docs/components-and-props.html) in
a React project I usually reach a point where there are pieces that I need to
add that are similar to components that exist, but not 100% the same. There
might be slight differences in what data is available or the order it is
presented. When dealing with code, this leads to an interesting problem of
deciding between adjusting the existing component to be re-used or copy/pasting
and making the small changes to end up with 2 similar components instead.

When I say 'adjusting the existing component' that usually involves adding 1 or
more props and using those props in a bunch of conditional logic to handle the
two similar situations (the new one and the existing one). For simplicity in
this article I'll refer to this as `reuse`.

For 'copy/pasting and making small changes' that usually means taking what was
there and adjusting it to handle the new case and removing pieces that are no
longer needed. For simplicity in this article I'll refer to this method as
`duplicate`.

Both of these methods (`reuse` and `duplicate`) have pros and cons, but I
generally prefer these methods to starting from scratch if there's an existing
component to in the project.

Thanks to source control software like Git, it's relatively painless to switch
approaches if I find that I picked the wrong one to start with. The biggest
downside of pivoting to the other option is the lost time, which is a
significant factor in decision making when projects are on a timeline.

In order to make the decision of which approach to try first (and hopefully
spend the minimum required time on the feature), I dive into the code of the
existing component and look around to see what indicators exist in the component
and surrounding code that would make one path better or easier than the other.
Before I get into those indicators let me share an example from a recent
project.

## Advanced Search - An example in `reuse`

A recent project I worked on had designs for an advanced search bar on 3
different pages. Each page was working with a different kind of data, which
meant that there would be some fields to search on that were shared while others
were unique to the page. For example, each page allowed you to search the data
by the created and updated dates. Meanwhile, each page had unique fields
conveying 'status'.

Someone else on the team had created the advanced search for the first page that
needed it, and I ended up being tasked with the other 2 advanced search bars.
This meant that I _knew_ I would be doing this same type of thing twice, so it
was worth the time to plan ahead and dig into the existing components to
evaluate if I should `reuse` or `duplicate`.

## Indicators to `reuse`

When digging into an existing component to figure out if I might be able to
`reuse` it for a similar feature there's a number of indicators, which I'll
phrase as questions, that I check for, which I'll briefly mention before digging
into specifics. I generally use these indicators to inform a choice between
`reuse` and `duplicate`, so this section will have that framing.

- How does the data flow through this component and is it able to handle the
  `reuse` case?
  - (When using TypeScript) Are the typings simple enough to `reuse`?
- How many imports already exist and are they directly `reuse`able?
- How many conditional branches already exist indicating how much this component
  has already been `reuse`d?
- How safe is it to edit this component?

### Data flow and typings

Data flow and typings are critical things to consider when determining if you
can `reuse` since they are likely to be the first thing that makes it
impossible. The answer I find to this question is usually one of two options:

1. "The data is coming from spreading a huge object that has tons of data which
   this component sends to the right spot"
1. "The data is specifically passed in as few pieces as possible for this
   component"

There are always tradeoffs so neither approach is inherently bad. I've found it
much more difficult to `reuse` the first instance especially when using
TypeScript, since the typings to allow spreading huge objects I usually can't
find a way to simplify
([Generics](https://www.typescriptlang.org/docs/handbook/generics.html) exist
but those aren't usually considered "simple").

### Imports and Sub-components

Generally speaking with React Components that main imports will be
Sub-components or utility functions. Utility functions tend to be easy `reuse`
cases since they're designed that way, but Sub-components can be really
interesting. When there are Sub-components I find that I need to examine each
one independently with these same indicators. The reason for this is that each
Sub-component could also become a `reuse` or a `duplicate` depending on the
scenario.

For example, with the search field the `Input` sub-component was an easy `reuse`
since it had been designed to be super flexible yet specific with how it handled
data. Meanwhile the `Status` component (used to pick which "status" values would
be included in the search) was a `duplicate` case since the values (which was
all the component did basically) were specific to that data type.

### Conditional branches

In my experience with `reuse` it usually results in additional conditional
branches in the code to handle the 'similar but not the same' aspect. I have
this indicator in my list because I've run into cases where a component is
relatively simple to `reuse` for the second or third usage, but eventually the
logic in that component becomes complicated enough that I find it better to
`duplicate` and simplify again. For example, a component might have started by
taking 4 or 5 props to get all the data required in. Then it was reused to add
an optional prop that adds an additional bit of text in. Then maybe an optional
image was added. Eventually you reach a point where there's more optional props
than required ones (looking at you Hero components) and it becomes simpler to
`duplicate`.

### Safety when editing

In some projects, especially ones that don't have robust test suites (which we
all want but which few projects seem to have), there's an important factor of
'safety' when editing things that might already be in production. For example,
changing the root component of a section of the application might be something
you don't have time to do since you would need to test that entire section
again. But, if your testing is largely automated and more importantly gives you
confidence that would be less of a concern.

## Similar Detail Pages - An example in `duplicate`

In that same project there were two similar pages showing a 'detail' view of a
data type. The pages had the same layout, major features, and were pretty much
the same outside of one key point - the actual data fields used had different
names! Each page interacted with a different service in addition to the
application's backend for data, which resulted in entirely different data
structures. Since the project utilized TypeScript, as I mentioned in the
indicator to `reuse` this singular difference made it nearly impossible to
`reuse` any significant chunk of the components between the two pages. This
resulted in a bunch of `duplicate` components, which worked out fine for the
project. This was also a `duplicate` choice since it was much safer to avoid
editing the already-in-production root component for the detail page.

## Indicators to `duplicate`

When deciding to start with `duplicate` as the method for a similar feature, I
usually utilize the same indicators that I already talked about in `reuse`.
Duplication is a 'hot topic' in programming, which generally leads to people
avoiding it. I'm not going to get into that discussion in this article, but I
would encourage you to check out
[Dan Abramov's talk the WET codebase](https://www.deconstructconf.com/2019/dan-abramov-the-wet-codebase).

When approaching a task in a project you (or someone familiar with the project)
usually has a gut feeling on if `duplicate` or `reuse` should be tried first,
which impact the angle I answer the questions with. For example, if I feel like
a feature will likely be a `duplicate` case I utilize these questions:

- How can the data flow through this component be cleaned up or simplified using
  `duplicate`?
  - (When using TypeScript) How can the typings be simplified through using
    `duplicate`?
- How many imports already exist and do they need to be `duplicate`d?
- How many conditional branches already exist and could be removed when using
  `duplicate`?
- How much safer is it to not touch the existing component?

The reasons behind most of these questions are largely the same as the last
section, just flipped to focus on simplification which is usually something that
can be accomplished though taking a second pass at a feature. There is one
that's new though:

## It's a spectrum!

Thanks to the power inherent in the Component model which React utilizes,
`reuse` and `duplicate` are on a spectrum! Most tasks will likely use both since
pieces that are easier to `reuse` could be
[extracted as a component](https://reactjs.org/docs/components-and-props.html#extracting-components)
while pieces that are more difficult will likely utilize the `duplicate` method
and focus on
[composition instead of inheritance](https://reactjs.org/docs/composition-vs-inheritance.html).

_Banner image courtesy of undraw.co_
