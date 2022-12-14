---
slug: demystifying-babel-plugins-a-debugging-story
date: '2019-08-27'
title: 'Demystifying Babel Plugins: A Debugging Story'

coverImage: '/assets/blog/undraw_ideas.png'
---

In previous posts in this series,
[Build Tools Demystified](https://jnielson.com/build-tools-demystified-my-thoughts)
and
[Demystifying @babel/preset-env](https://jnielson.com/demystifying-babel-preset-env)
I introduced the ideas I wanted to cover and then dove into `@babel/preset-env`
to see what we could learn. In this post, I'm going to do a little more general
treatment of babel plugins, though the examples I use will largely be
`babel-plugin-styled-components` and `@babel/preset-env` since those are the
ones that I most commonly utilize in my projects.

As part of understanding more about babel plugins, it's important to realize
that the amount of things you need to know to work with plugins is significantly
lower than what you need to write plugins. For writing plugins,
[definitely check out the babel handbook on plugins](https://github.com/jamiebuilds/babel-handbook)
but there isn't a similar handbook of instructions that you can follow to work
with or understand an existing plugin. If it was written following the handbook
then you should be at a pretty solid place, but I'm going to assume most people
haven't read through that awesome (and long) handbook and roll with that.

## Major Concepts

There's 2 major concepts involved in babel plugins:
[Abstract Syntax Trees (ASTs)](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
and [the Visitor Pattern](https://en.wikipedia.org/wiki/Visitor_pattern). The
basic idea of ASTs it to take the code that you write and parse it to just the
important language constructs and generate a tree structure of "nodes" that
allows you to traverse the "code" to manipulate it. In order to manipulate it,
babel utilizes the Visitor pattern which basically allows plugins to be aware of
all the node types, select ones they care about and do their thing to them,
before passing it back to babel. The combination of these two ideas is
incredibly powerful and unlocks the wide range of plugins that exist in the
babel ecosystem. The two plugins I'm most familiar with are `@babel/preset-env`
and `babel-plugin-styled-components`, as mentioned earlier. In
`@babel/preset-env` there's a wide array of plugins that are enabled based off
the targets that are passed to it,
[more on `@babel/preset-env` here](https://jnielson.com/demystifying-babel-preset-env).
Since preset-env is a _preset_ and not a _plugin_, strictly speaking, the rest
of this post will focus on `babel-plugin-styled-components` and the experiences
I've had with it.

## Using a Plugin

In my experience there's usually 3 ways that a plugin is used:

1. Part of a preset
1. Directly to enable a language feature/syntax
1. Directly to support a library/code style

In each of these cases your approach with the plugin usually varies. In the
first case, you often don't know the plugin is even being used. Unless you dig
into the preset source or dependencies you often have no idea what plugins are
included in it, and what impact they're having on your output. In the second,
you include a plugin because you want to enable some new feature or syntax to
use in your codebase. Usually teams will evaluate these additions pretty
strictly, because the more plugins you have the longer your build process will
take (by nature of each plugin running on the entire tree, even if it only
actually does something on specific nodes). Then with the third type you have
plugins like `babel-plugin-styled-components` that enable cool features of the
library like SSR. The reason to call out these different uses of plugins is it
greatly impacts how you approach the plugin if you run into issues with it.

## Issues when trying to use a Plugin

In my experience there's usually 3 kinds of issues you run into:

1. Plugin not doing something you want
1. Plugin doing something you didn't expect or don't want
1. Plugin running at all

In these three cases the way you approach debugging is a little different. In
each case, it's super useful to have a minimal reproduction you're working with.
Minimal reproductions make problems easier to notice and trace, as well as can
be submitted to projects that accept bug reports if you happen to determine it's
actually an issue with the project. There are of course issues that don't occur
in a smaller reproduction, but in the majority of cases I've seen there's
benefits to trying to boil it down to the simplest case possible. Once you have
a simple case, there's a few things you can check for to figure out what might
be going on. They depend on what's happening of course, but let's run through
some possibilities:

### Plugin isn't doing something you want it to

The first, and usually easiest to notice case is where you a plugin that isn't
doing something you'd expect. An example of this that I ran into was with
`babel-plugin-styled-components` with the `ssr` option flipped to true still
producing a className mismatch warning. This warning indicates that something
isn't quite right in the build process, since the `babel-plugin` is designed to
generate consistent classNames for the server and client renders of a component.
First, I had to rule out that it wasn't an issue of the plugin not running at
all, and that was pretty easy to do by digging into node_modules and adding a
simple console.log statement. Then, after spending some time trying to get a
minimal reproduction, the smallest I could get still involved my code, a shared
component library, `babel-plugin-styled-components` and `@babel/preset-env` -
not a very small reproduction if you ask me! But, as I turned things off and
back on checking for the issue, I realized that my code wasn't actually a part
of the issue since it was getting transformed correctly and not producing the
warning if the shared library code wasn't present. At this point I knew that it
wasn't an issue with the actual application, so I was able to strip away pretty
much all the application and boil it down to the simplest Next.js SSR setup I
could get with the simplest library component that the issue would happen to.
After playing with the options of various plugins for a while, I realized that
`babel-plugin-styled-components` wasn't actually visiting any of the nodes that
are output from the shared library component. Since we pre-build the shared
library components, it turns out that we weren't using
`babel-plugin-styled-components` but we were using `@babel/preset-env` to build
them. The targets
([something I talked about at length in my post on preset-env](https://jnielson.com/demystifying-babel-preset-env))
were setup to have `@babel/preset-env` transform the template literals that
`babel-plugin-styled-components` looks for and made it so that
`babel-plugin-styled-components` didn't recognize the styled-components out of
the shared library. This meant that it wasn't doing what I wanted it to,
transform the code to be SSR compatible, because another plugin had already
transformed the code previously. In this case, I learned that the order matters
for babel plugins, since it's possible for one plugin to transform a node type
into a different one and cause other plugins expecting the original type to not
work.

### Plugin is doing something that you don't want

Related to the previously discussed issue of a plugin not doing what you want,
but significantly harder to notice in most cases, are plugins doing something
that you don't want. I was recently involved in debugging an
[issue on the storybookjs repo](https://github.com/storybookjs/storybook/issues/7710)
where someone was running into an `_esmodule` property being added to their
exported object by `@babel/preset-env`, something they weren't aware was
happening until it started showing up in their storybook. In this case, they had
forgotten to switch and tell `@babel/preset-env` to avoid transforming modules,
and so it was transforming them. In most cases that will work just fine, but it
does cause issues with other tools like webpack (for application code) being
unable to use features like tree-shaking. As such, they had spent a couple hours
trying to debug why this unexpected thing was happening and it boiled down to a
plugin option. In this example, the plugin was doing something they didn't want
anymore, but it took some prior knowledge on my part to know that `_esmodule` is
a property used by `@babel/preset-env` to indicate that it is a transformed
`esModule` file. In the cases of plugins doing unexpected things that you don't
know about, the best way to recognize it that I've found is to occasionally
glance at your output from the babel process (before minification/uglification
ideally) to see if there's anything in there that you wouldn't expect given the
options and targets that you've used. I find that checking on that a couple
times a year is sufficient, since in most cases your targets and options don't
need to change, but if you never check it then there's a pretty good chance you
have a plugin doing something that you don't know about. On the bright side,
issues of this type indicate that the plugin is actually running (although it
might not be configured properly) so you can rule out the third type of issue!

### Plugin is not running at all

Sometimes it's hard to tell if you have a plugin that isn't running or a plugin
that isn't doing something you want, but in most cases it's usually pretty easy
to debug and see if a plugin is being run. Since this is JavaScript and we use
`npm` or `yarn` for our packages, you can usually go into the `node_modules`
folder and edit the built library/plugin code to check and see if it's running -
especially useful if it doesn't provide a `debug` option (which
`@babel/preset-env` provides). In the cases of plugins not running, usually it's
a config issue or picking the wrong plugin. I talked briefly in the overview
post about the difference between transform and syntax plugins since one will
actually adjust the output code while the other enables the parser to recognize
the input. I also noted that transform plugins are supposed to enable the
required syntax plugins for you. So, in most cases that I've seen issues of this
type the config is the place to look and make sure there aren't plugins running
before that are causing the plugin you want to not run, or to check and make
sure that the options you pass the plugin are valid and correct.

## Conclusion

Overall, babel plugins from a users perspective are quite simple. They're
designed to take code and transform it into other code based on it's defined use
case, options, and the targets of the build. These simple plugins have been
built up into presets that enable you to turn on whole lists of plugins at once,
and it's entirely possible (and relatively simple) to build your own preset! It
could be a "smart" preset like `@babel/preset-env` or it could be a simple
preset that enables the various plugins you need in your project.

Thanks for reading! I hope you've learned something! If you have, or if you have
any comments or suggestions feel free to reach out and let me know. Thanks!

_Banner photo courtesy of undraw.co_
