---
slug: demystifying-webpack-whats-a-bundler-doing
date: '2019-08-29'
title: "Demystifying webpack - What's a Bundler doing?"

coverImage: '/assets/blog/undraw_segment_analysis.png'
---

In my introduction to this series on
[Demystifying Build Tools](https://jnielson.com/build-tools-demystified-my-thoughts),
I introduced the core concepts of webpack and babel. I've created a couple other
posts on various facets of babel, like
[`@babel/preset-env`](https://jnielson.com/demystifying-babel-preset-env) and
[`babel plugins more generally`](https://jnielson.com/demystifying-babel-plugins-a-debugging-story).
If you haven't read those, I'd highly recommend them (obviously!). In this post
I'll shift and cover a little more about webpack. In the talk I'm prepping for,
I'm intending to spend more time on babel and less time on webpack, which you
might have guessed from the blog coverage difference.

## Why less on webpack?

I haven't had nearly as much in our projects to manage with webpack since we're
using the defaults provided by [next.js](https://nextjs.org) (thanks Next
team!). But, the things that I have found valuable to be aware of include a
knowledge of what webpack is at a little more depth than the concepts docs
referenced in the introduction post and also how to use and read the
`webpack-bundle-analyzer` plugin. In my opinion, having a knowledge of webpack
makes it simpler to work with as the core concepts build together masterfully,
and then the bundle-analyzer plugin is super useful to examine what webpack is
outputting that I can't imagine doing a project where I don't use it at least
once to sanity check that nothing I don't expect is included in the bundle.

So, to learn more about webpack where do you start? First, I'd start with
breaking down the description they use for webpack in their docs:

> "At its core, webpack is a static module bundler for modern JavaScript
> applications."
>
> [webpack docs](https://webpack.js.org/concepts/)

That statement is relatively simple, but can be broken down to emphasize the key
features and goals of webpack. I'll talk more to each of the following ideas:

- Bundler
- Module
- Static
- Modern JavaScript
- Applications (including libraries)

## Bundler

At its core, webpack is a bundler. Not a task runner or a compiler, a bundler.
What is a bundler? In the context of webpack, it takes all files referenced from
the entry point(s) and spits out at least 1 file called "the bundle". The goal
of the bundle is to package code in a way that makes sense for the target
environment, in most cases that's the browser. With HTTP 1.1, it tends to be
best to serve as much of the application in a single file, to reduce the number
of round-trips needed to get the code for the browser to execute. But, with HTTP
2 as well as in environments where you want heavier caching it makes sense to
split your "bundle" into multiple files that can be cached and served
independently and in parallel.

How does webpack's role as a bundler impact you? Well, for the most part it
doesn't. Since it's a bundler it usually does its thing just fine, and once
setup in an application it doesn't take much maintenance unless you add a new
file type or want to process something differently. More on that later though!

## Module

In stating its place as a bundler, the webpack docs clarify that it is a
`module` bundler. In that aspect, it treats everything as a module: JavaScript
Code, Images, Raw files, you name it and it is a module in webpack. Modules are
loaded into webpack through a variety of `loaders`, which you can read more
about [on the loaders concepts page](https://webpack.js.org/concepts/#loaders).
Essentially in order to support a large variety of file types you'll need to add
loaders for them so that webpack can understand them. Out of the box it supports
JavaScript and JSON "modules", much like Node itself. In webpack 4 at least, the
module type you use greatly impacts the extra features webpack is able to
enable, such as Tree Shaking. Modules are key in webpack, since that is how it
determines what code to include in the bundle that it creates. It starts from
your "entry point" (which is a module) and pulls in everything referenced by
that module. In order to pull it in, it needs to be a module! So, anything that
you `import` in that entry module will end up in your bundle that is created.
Without module boundaries, webpack wouldn't be able to determine code that can
be left out, and we'd be back to including entire directories in what we serve
to the browser.

## Static

One of the best features of webpack, in my opinion, is the static analysis
capabilities that are unlocked by it being a `static` (in other words, build
time) module bundler. A runtime bundler could probably work, but it wouldn't be
able to do Tree Shaking or Dead Code Elimination. This would be a pretty large
drawback for me, since it is pretty common in my projects to only use part of
the aspects that a library or component exposes. In my opinion, the word
`static` in this context also implies that the build output won't change unless
the build input does (assuming you have things configured correctly), which
gives me some confidence in being able to run builds as many times as needed.
Related to that, another benefit of `static` in this context is that it allows
the build process to support plugins that act on those `static` assets to
transform, adjust, or otherwise do something to the code.

There are some downsides to it being a `static` module bundler. One of the
largest I've run into is the inability to dynamically use `require.context` in
storybook to get just the stories that I want with some sort of option string.
This led to us re-writing our storybook config file whenever we want a different
set of components to work on, which thankfully was relatively easy to implement.

## Modern JavaScript

Since the docs statement says "modern JavaScript applications", I decided that
there should be a comma in there and broke it down even further. Modern can be
made to indicate that it is something up to date, but I think when you combine
it with JavaScript you usually get the idea of `ESNext` or `ES2015`. In the case
of new language features, that job is actually handled by `babel`, which webpack
can run on your code as it bundles it. This interplay is something that I wanted
to highlight since it illustrates the capability of the module bundler to take
in anything that you can tell it how to handle. Since it runs in node, webpack
can be default handle whatever syntax your version of node can. Since you can
run it with `babel`, webpack can optionally handle whatever syntax you throw at
it (within the limits of babel of course). These two libraries work together to
output your code in a manner that's suitable for browser consumption. In the
simplest configuration, babel will take your files and output them, one for one
or all to one, transformed according to the plugins you use. Using webpack, it
can be a little smarter than that and only run `babel` on the files that it is
bundling, allowing you to have other files in your `src` directory (or however
you organize yourself) that don't need to be processed by babel.

Splitting this up further, `Modern` is also a good descriptor of webpack itself.
The team there does a great job adding new features/plugins, fixing things, and
overall keeping the tool `modern` in the sense of up to date and useful!
`JavaScript` by itself doesn't mean all that much though, it does indicate that
webpack is focused on that language (though if I understand correctly it
supports web assembly to some extent).

## Applications (including libraries)

The core use case for webpack is definitely applications that are served to the
browser, but it can also be used for libraries if they have a desire to do so.
There is support for libraries in a similar way to applications, and they have
an
[awesome guide on their docs site](https://webpack.js.org/guides/author-libraries/)
about how to use webpack to bundle your library code. Since webpack focuses on
the application level, there are tons of plugins that support that use providing
things like aliasing, loading all the file types you use, and others.

## The Bundle Analyzer

After you've got webpack setup and outputting some wonderful files to serve to
the browser, you might run into a case where you're curious what is in there. In
most cases, your bundle will be minified and uglified so it won't be much good
to try and read what's there, though there are some things that don't uglify
very well that you can use if you're trying to check to see if something is
there quickly. But, outside of that the `webpack-bundle-analyzer` is a fantastic
tool. For use in [next.js](https://nextjs.org), it's as simple as installing the
[Next.js plugin](https://github.com/zeit/next.js/tree/canary/packages/next-bundle-analyzer)
and following the instructions in the readme to add it to your project. Since
Next produces two bundles, one for the server and another for the client, it can
be pretty intimidating to set up any webpack things from scratch. So, I'm super
grateful for the team that added this plugin since it's already setup to create
a bundle analyzer for both bundles. Most of the time I just use the client
bundle, but the server bundle is also quite helpful. The
[bundle analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) looks
pretty overwhelming when you first look at it, since it shows in some manner
every file that is included in the bundle. There's a number of things to look at
when using the bundle analyzer, but there are a few that I want to call out:

1. Different Size Settings
1. Hiding chunks
1. Outputting a JSON file (not currently supported by the next-bundle-analyzer
   plugin)

### Different Size Settings

One of the first things you might wonder is "where does this size information
come from?", since in most cases you won't be seeing what your file explorer
told you the size was. In the sidebar menu when analyzing your bundle, you can
select between `stat`, `parsed`, and `gzip`. These are described in detail on
the documentation page linked above, but I think it's useful to point out that
`stat` should be close to your file system output, `parsed` should be the
post-webpack size (minified/uglified) and then `gzip` is the compressed size of
the post-webpack file. By default the `parsed` size is pulled up, which is why I
pointed out that they might look different than you might expect. In most cases
I've seen, `parsed` is the most useful number, since `stat` doesn't help much as
it's pre-webpack and `gzip` is useful... but I don't want to spend my time
optimizing my code for `gzip` compression since the time the browser spends
parsing it is usually longer than the network time a few more bytes off would
save. There's more information on this in
[the documentation](https://www.npmjs.com/package/webpack-bundle-analyzer#user-content-size-definitions).

### Hiding Chunks

In most cases, the output from the bundle analyzer will be entirely too much to
handle as most projects that care to analyze their bundle will have hundreds of
modules. If you haven't used it before, clicking on a module/section will zoom
in on it, but that doesn't actually hide the ones that now can't be seen. To do
that, you can uncheck them in the sidebar menu, which will actually re-draw the
entire page in most cases. There are a number of things that you might want to
hide, like a node_module that you're stuck with and can't reduce the size of or
a section of your application that you're not working on right now and is
distracting from the actual part you are inspecting. There's more information on
this in
[the documentation](https://www.npmjs.com/package/webpack-bundle-analyzer).

### Outputting a JSON file

In a lot of cases, webpack has way more information available then even the
bundle analyzer shows, and in that case I find the bundle analyzer's capability
to output the `stats.json` file from webpack for you to be wonderful. Since the
bundle analyzer already uses a lot of the stats options (and webpack does slow
down a bit when you use a bunch of stats options), it's helpful to be able to
re-use those and output them to a file. Sadly the next-bundle-analyzer plugin
doesn't currently support passing any options to the bundle analyzer (they'd
probably add it, but I haven't cared enough yet since it isn't terribly hard to
use for a one-off case). So, if you want to do this in a next context you'd need
to manually adjust your next.config.js to use the bundle analyzer (in a similar
way to
[what the plugin does](https://github.com/zeit/next.js/blob/canary/packages/next-bundle-analyzer/index.js)
ideally) to pass the `generateStatsFile: true` option to the bundle analyzer,
with the `statsFilename` changed based off which build is running. The stats
file is a bit of a beast to handle, so we're not going to talk about it much
here, but it is super useful if you think webpack is doing something weird!

Thanks for reading! Ideally this helps you understand a little bit more about
webpack, in combination with going through their
[core concepts docs](https://webpack.js.org/concepts/). I'd highly recommend
spending some time on doing so, since even if you're using an awesome tool like
[next.js](https://nextjs.org) there's still benefits that come from
understanding what is happening to bundle your code.

_Cover image courtesy of undraw.co_
