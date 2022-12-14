---
slug: build-tools-demystified-my-thoughts
date: '2019-08-15'
title: 'Build Tools Demystified - My Thoughts'
coverImage: '/assets/blog/undraw_empty_cart.png'
---

Hi again! Another prep post for a work talk I'm giving. The talk isn't until the
start of October, so if you're reading this post after that point I hope it
helps you. This one will probably be followed up by another one that takes a
more "talk in a post" approach, whereas this one will be "thoughts regarding the
topic that are unorganized". It's probably pretty rough, but I figured I would
put it out there in case there's interest. If that's your jam, feel free to read
on and I'd appreciate any feedback that you have!

The topic that I selected to share at this internal work conference is focused
on demystifying the build tools that are used in the JavaScript stack at work.
We utilize Next.js, a fantastic library that makes it so that we rarely have to
interact with our build tools since they do a fantastic job of updating them in
a way that doesn't usually break our applications. Sometimes though we have
projects that aren't using Next.js (either they're using an old version of the
stack before Next.js was adopted or they're not using the stack at all) or they
have run into something that they need to adjust to fit their specific project
and they come to us asking various questions about build tools because they're
having issues. In those cases, it's helpful to have some background knowledge
about what the tools are doing and why they are there.

When using Next.js it includes configuration and support for Babel and webpack.
Their out-of-the-box configurations are pretty solid, and in most cases easily
extendable. For instance, we've included a babel configuration file in our stack
that sets up the styled-components babel plugin, and that has been relatively
painless to have an keep up to date. Other build tools that we've helped
projects work with include Gulp and Grunt, though we don't have many projects
with changing Gulp/Grunt setups at this point. Most of those are the legacy
AngularJS projects and since they don't change all that often we're not going to
talk about them in this post. As such, I'll be focusing on Babel and webpack.

For those who aren't familiar with the typical web development stack, we utilize
Babel and webpack to take the code that we write and change it
(compile/transpile/whatever else you want to call it) to the ideal format for
the intended consumption method. Generally JavaScript code is consumed in the
browser, with different browsers supporting different features.

Babel is a [JavaScript Compiler](https://babeljs.io) that lets you write code
using the latest language features and will transform that according to the
configuration you give it. By default, it doesn't actually do any
transforming-it only transforms using the plugins that you supply it.

webpack is a [Bundler](https://webpack.js.org) that will take the files you give
it (usually called "entries") and gather all the assets/code that are referenced
into a set of files that are ready to serve to the browser.

One of the greatest features of webpack and babel is extensibility through a
vast plugin ecosystem. In a lot of cases, people will utilize Babel within
webpack through something called `babel-loader`. Loaders are used by webpack to
customize how file types are bundled in the pipeline, and so `babel-loader` is
used to run files through Babel before being bundled by webpack.

In either case (using Babel directly or within webpack), the configuration files
are where a lot of the "magic" happens that I'll be de-mystifying through this
talk I'm going to give. The goal of the talk is for people to have a working
vocabulary they can use when googling the different things they might need to
while working with these tools as well as provide them with some strategies for
working with them. One of my biggest goals is to have people be less scared of
tinkering with the tools, since more often than not you just need to give it a
try and see if it works.

Both of these fantastic tools have thorough documentation, and one of my
favorite sections of the webpack docs is called
["Concepts"](https://webpack.js.org/concepts/) since it gives a great high-level
overview of the main things going on with webpack. Those main concepts include:

- [Entry](https://webpack.js.org/concepts/#entry)
- [Output](https://webpack.js.org/concepts/#output)
- [Loaders](https://webpack.js.org/concepts/#loaders)
- [Plugins](https://webpack.js.org/concepts/#plugins)
- [Mode](https://webpack.js.org/concepts/#mode)

Their descriptions of them are spot on, but to tie them together I'll add my
own. Essentially webpack takes an entry point (or points), usually a JavaScript
file but doesn't have to be, and builds out a map of the dependencies that it
has, utilizing the Loaders based on the file paths, running it all through the
plugins, and spits out a set of output files with the mode allowing you to
utilize some preset things.

While Babel doesn't have a "Concepts" page, there are still some major concepts
that are important to understand in order to work with Babel from a consumer
standpoint. In my opinion that includes ideas and things like the following.
Note that I wouldn't recommend sitting and reading through any of these links
since they're pretty dense.

- [Plugins](https://babeljs.io/docs/en/plugins)
- [Presets](https://babeljs.io/docs/en/presets)
- [Options](https://babeljs.io/docs/en/options)
- [Config File Types](https://babeljs.io/docs/en/config-files)
- [That a Babel Handbook exists](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/)
- [What `preset-env` is since it's one of the most common presets](https://babeljs.io/docs/en/babel-preset-env)

So, while Babel might not have a dedicated docs page to describing their major
Concepts, these are the things I find people would get the most benefit from
understanding. Since the linked to docs pages are a bit dense, here are some
working definitions/views that I have for these topics. Plugins are the things
that actually give Babel behavior and capability. If you don't use any plugins,
Babel will just give you the code you gave it. There's a couple types of
plugins-Transform and Syntax. Syntax plugins are the more straightforward ones
to understand since they enable Babel to even parse the feature. While they're
simpler to understand, they're rarely used directly since merely parsing a
language feature doesn't do much good for the consumer of that code. Therefore
Transform plugins will load the Syntax plugins they need and transform the
relevant code to the desired output. Because it can be tedious to configure and
load all the plugins you might want in each project, Babel allows for Presets,
which are groups of plugins that are pre-configured. In both Presets and
Plugins, along with lots of other things about Babel the idea of passing in
`options` is super useful. Options allow for plugins and presets to adapt based
on the target environments that you have, the "mode" that you're in (similar to
webpack), or any other thing that they've been setup to handle. With babel,
there's a multitude of tools that utilize it and passing presets and plugins
through the command line can get pretty tedious, so there are a number of config
file types available to you, with two major kinds - Project Wide and File
Relative. The one that you'll generally want to use in application-type projects
or monorepos as of this writing is the Project Wide `babel.config.js` file.
Libraries will generally use a File Relative config, like a `.babelrc` file (or
something in their `package.json` file depending on how complex their
configurations are). If you do ever decide to write anything that other people
will use with Babel, the handbook linked above is an excellent resource. The
plugin handbook is super helpful if you're trying to debug someone else's
plugin, since they likely used that while writing it. In most projects that I've
seen, they utilize the `preset-env` provided by the babel team. The docs on that
are excellent, so I'd recommend checking those out if you're going to be using
it directly. Thankfully, Next.js handle a lot of the configuration for us and
even provides a preset we can use to extend their configuration (which we did to
add styled-components support).

I think that's all I'm going to get to so far as my thoughts on the overall
topic today. I might throw out some other, more detailed and specific posts as I
continue to refine what I'll be talking about. Thanks for reading!

_Banner image courtesy of undraw.co_
