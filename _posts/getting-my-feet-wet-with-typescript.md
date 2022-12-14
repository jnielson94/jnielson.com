---
slug: getting-my-feet-wet-with-typescript
date: '2020-02-28'
title: 'Getting my feet wet with TypeScript'

coverImage: '/assets/blog/undraw_code_typing.png'
---

Hi there! I'm writing this post with the goal of helping people who are in a
similar spot to where I am, at the time of writing. As mentioned in my
[changing jobs post](https://jnielson.com/jnielson-is-changing-jobs), my new job
mostly uses TypeScript. Prior to this job I'd written a total of zero characters
of production TypeScript! Starting at this position and wanting to jump right
in, I've written some lines of production TypeScript now! In this post I hope to
share a few things that tripped me up as I've been slowly working in TypeScript.
Before I get into it though, I want to share a couple thoughts on learning...

## Thoughts on learning

Awhile back I wrote a post about
[sharpening your axe](https://jnielson.com/sharpen-your-axe) where I shared a
few of my thoughts on learning. To reference that a bit, with TypeScript I have
a general idea of how it works, and I know where to find and have access to the
documentation and some sample (existing production) code in a few projects.
Since I have these resources, I was able to jump straight to, for the most part,
knowing what I don't know. There's a huge number of features available in
TypeScript that I haven't needed to dig into yet... but at least I know where I
can find out about them. For instance, I have had no need, so far, of Generics,
but I know exactly where to look if I do need them:
[The TypeScript docs](TypeScriptlang.org/docs/handbook/generics.html). Also,
since:

> TypeScript is a typed **superset** of JavaScript that compiles to plain
> JavaScript
>
> - [TypeScriptlang homepage](https://typescriptlang.org) (emphasis added)

I'm able to utilize the vast JavaScript knowledge that I do have, and if I do
something in my work that TypeScript doesn't like the compiler will tell me.
Since there's this existing bed of knowledge, I went ahead and read through
[the TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
document that they have available to have some general knowledge in my head...
but outside of that it's been a "learn as it comes up" approach, especially
since I'm mainly working on existing projects.

With that background, let's dive into some of the things I've learned while
"getting my feet wet with TypeScript"!

## Getting my feet wet with TypeScript through Create-React-App and Next.js

One of the first things that I had heard about TypeScript in the past was how
painful it was to get integrated into the tools you were already using if you
started a project without it. Well, prior to my arrival the projects I've been
working on were changed to use TypeScript. From what I understand, that was made
way easier by the built-in support of TypeScript in the tools we mainly use -
[Create React App](https://create-react-app.dev/docs/getting-started/) and
[Next.js](https://nextjs.org). So far as I can tell, we're pretty much using the
built-in support with both of these tools... though there might also have been
some customization since I haven't actually dug into it. I haven't needed to...
we'll see if that changes? Either way, the experience has been seamless so far!
I haven't noticed any drastic difference in hot reloading times when working on
things, and I've appreciated the error messages so far (make sure to read
those)!

## Using examples of things already working in the project

One point that I mentioned earlier in the section about learning, is how useful
it's been to have existing production code to lean on. There's something to be
said for caution there, even if you trust the developer(s) who wrote the code...
but I'm not going to dig into that now.

One example that I did want to share of this was when I was trying to use
[a ref](https://reactjs.org/docs/refs-and-the-dom.html) for the first time. As I
usually do, I utilized the
[useRef hook](https://reactjs.org/docs/hooks-reference.html#useref) with an
initial value of null... but TypeScript didn't like that one! My first thought
for solving it was to do a search... and the first StackOverflow answer made the
compilier happy! In my younger years I probably would have called that good...
but I had this thought that I didn't love the look of that answer. So, I decided
to search the project to see if there was an existing case of using a ref with
an initial value of null, and there was! It was way simpler than the complex
typing that I had found on StackOverflow... though I later pivoted and didn't
end up needing a ref after all that.

## Trying something new

Another example of something that I reached for without knowing was an
[enum](https://www.typescriptlang.org/docs/handbook/enums.html). I wanted a
string enum to define the available sizes for a new component I was writing, and
while I wanted to use my experience I just talked about and find something in
the project to model after... I had no idea what to search for. So, I knew that
an enum pretty closely matched the concept of what I was looking for... but I
didn't love using it! The enum definition looked something like:

```tsx
export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}
interface SomeComponentProps {
  size: Size
}
```

To satisfy the typechecker when using an enum, you had to import the enum that
had been defined in the type... at least that's what the docs made it seem like.
It looked something like this:

```tsx
import { SomeComponent, Size } from '../some-component'

const component = () => <SomeComponent size={Size.small} />
```

As I mentioned in my
[tips and tricks post](https://jnielson.com/tips-and-tricks-new-thing), I get to
do regular pair programming sessions with my lead dev. In one of these sessions,
I brought up the enum deal and they had never seen an enum before (in
TypeScript)! He suggested the way they usually type something like that, using a
string union like so:

```tsx
interface SomeComponentProps {
  size: 'small' | 'medium' | 'large'
}
```

There's probably some case where an enum would make more sense, but so far as my
team is concerned a union of strings makes more sense in this case. It still
gives autocompletion, which is probably the biggest benefit I've seen so far in
TypeScript!

## Pros and Cons?

This post is definitely not a pros and cons type post, but I do want to point
out that there are definitely pros and cons to the approaches you can take to
learning something. There's a wide spectrum of strategies, depth, planning, and
winging it that come together and end up with you being at the place where you
can actually work on a project that ships to customers. For me in the case of
TypeScript, I leaned pretty heavily towards the "wing it and only go as deep as
needed" side, but there are tradeoffs there. I probably won't be writing too
many posts focused on TypeScript with this approach, since I'm not currently
planning to dive deep into the more advanced features... but I guess we'll see.

Thanks for reading! Hope to see you around here again soon 😊

_Banner image courtesy of undraw.co_
