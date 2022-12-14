---
slug: debugging-react-ssr-patching-problems
date: '2020-09-04'
title: 'Debugging React SSR Patching Problems'
coverImage: '/assets/blog/undraw_Problem_solving.png'
---

When using React 16, an issue that I've run into pretty frequently when using
Server Side Rendering (SSR) is messed up styling. That may sound like a pretty
vague thing, but generally this is accompanied by an obscure warning that
doesn't seem related, something like:

![WarningScreenshot.png](/assets/blog/debugging-react-ssr-patching-problems/WarningScreenshot.png)

There's likely terms in this post that could use a definition...
[let me know](https://twitter.com/messages/compose?recipient_id=870640964&text=Can%20you%20add%20a%20definition%20for)
which ones! I probably won't add it to this post for scope's sake, but I could
find/write one and link to it 😊

## Messed up styles... a Next.js issue?

A prime example of messed up styling was brought up by my coworker, Zack, who
had filed
[an issue with Next.js](https://github.com/vercel/next.js/issues/16796) about
styles not being correct, and then asked in our work slack if anyone wanted to
dig into it. I looked at
[his repo that has a reproduction of the issue](https://github.com/SimplyComplexable/next-issue)
to see what might be happening. I've pulled it into
[a CodeSandbox example](https://codesandbox.io/s/react-ssr-patching-issue-example-ok3m7)
to make it easier to see a running version.

The crux of the issue that was reported is that the styling for the first text
block, which is only rendered on the client (determined by checking to make sure
window is defined) isn't correct when the page is server side rendered (it
should have a blue background). If you don't really care why this happens, and
just want to know what you can do try the following:

- Use semantic elements
- Try a better client-only render strategy to avoid a hydration mismatch
- Avoid server rendering DOM elements too eagerly

There's more details on these suggestions later in the post, but first more into
why it happens.

## Actually a React v16 issue

After digging into it I found that it's a React issue that’s been around a long
time, caused by having server/client mismatches like this. Here's the
[original React issue](https://github.com/facebook/react/issues/10591), which
led to an issue about a still-not-finished blog post
[on the docs site](https://github.com/reactjs/reactjs.org/issues/25). In the
reproduction, the client side hydration thinks the first div is for the `Test`
component since that’s the first thing in the client-side structure. On the
client `Test` is supposed to be included in the render (since window is now
defined), so React tries to fix the mismatch of wanting `Test` by re-using the
DOM elements that already exist. React patches the text but not the attributes
when it re-uses the DOM elements, then appends a new `Test2` on the end to match
what it expects.

From the
[React docs on Hydration](https://reactjs.org/docs/react-dom.html#hydrate):

> React expects that the rendered content is identical between the server and
> the client.

When there is a mismatch, you get a warning... like the one in the screenshot
above. They're not super helpful usually since the Client side React doesn't
have knowledge of what Server side React was working with when it rendered.
Client side React tries it's best with the output from the server to make the
warnings useful... but as you saw in the first screenshot there's not much to
work off of.

## Avoiding the issue (or fixing it if you have it)

In order to avoid this issue there's a few things you can do:

- Use semantic elements
- Try a better client-only render strategy to avoid a hydration mismatch
- Avoid server rendering DOM elements too eagerly

I'd first recommend avoiding `div` elements where possible, since React won't
try to reuse an element if it doesn't match. In most applications using semantic
elements could probably avoid the issue entirely, but in the cases where it
doesn't there's a few more things to do.

Using a better client side only render strategy, as described in the
[React docs on hydration](https://reactjs.org/docs/react-dom.html#hydrate) is a
valid solution to this issue. The docs say:

> If you intentionally need to render something different on the server and the
> client, you can do a two-pass rendering.

To accomplish a "two-pass rendering", I generally reach for an `isMounted` state
variable that starts out `false` and is changed to `true` in a `useEffect` hook.

Something like:

```jsx
const ClientOnlyComponent = () => {
  const [isMounted, setIsMounted] = React.useState(false)
  React.useEffect(() => setIsMounted(true))
  return isMounted ? <ClientSideStuff /> : <WhatGetsRenderedServerSide />
}
```

I've not seen tons of cases where this is the approach that you should take, but
it is particularly useful in cases where you don't have anything to render
server side.

Finally, you should also check the output of your Server Side Render
occasionally. My favorite way to do this is through a right-click "View Page
Source" which should give you the HTML as it was from the server. I've
frequently seen extra `div` elements in this output that have missing content
because there was a null check that excluded Another issue that causes this to
come up often is "extra divs" in the SSR due to null checks or other issues.
Something to watch out for would be nested empty divs like:

```html
<div class="xyz">
  <div class="abc"></div>
</div>
```

These `div` elements are prime candidates for React to reuse and cause issues
with, so if you have a component that doesn't actually render anything on the
server I'd highly recommend avoiding the wrappers being rendered either.

[A comment on the React issue has a great real-world example](https://github.com/facebook/react/issues/10591#issuecomment-334425529):

![IssueScreenshot.png](/assets/blog/debugging-react-ssr-patching-problems/IssueScreenshot.png)

In this case they were trying to use a `className` to do mobile/desktop styles,
but the server doesn't know what the screen size is so it uses a set default,
which more than likely is the wrong one, causing an attribute mismatch but no
structural differences allowing reuse to occur.

## What about key props?

In that comment, they mention trying to use a `key` prop to tell React that it's
a different div. The reason why the `key` prop wouldn't work in these scenarios
is because it isn't actually rendered into the HTML that is sent over the wire
from the server to the client, so the client-side hydration would have no
knowledge of what the server-side `key` prop was to compare with. This would
cause React to attach the `key` client-side, but wouldn't result in throwing out
the `div` that the server had sent over.

_Banner image courtesy of undraw.co_
