---
slug: demystifying-babel-preset-env
date: '2019-08-16'
title: 'Demystifying @babel/preset-env'

coverImage: '/assets/blog/undraw_detailed_examination.png'
---

Ideally my post
[Build Tools Demystified](https://jnielson.com/build-tools-demystified-my-thoughts)
helped to clarify some of the basic ideas in play when using babel and webpack.
If not, please let me know things that can be clarified or added further! I'd
love to have this series by helpful to someone outside of the talk I give based
on it. I know for me reading is significantly more digestable than listening to
talks so I hope that this format helps someone.

One of the topics that I find really interesting when talking to people about
Babel is the `preset-env` that they provide. Since Babel is an open source
project, you can find
[the code for `@babel/preset-env` here](https://github.com/babel/babel/blob/master/packages/babel-preset-env/src/index.js),
but in this post we'll dig into a little bit why it is such a popular preset for
those using Babel. For reference,
[there are docs specifically for this preset](https://babeljs.io/docs/en/babel-preset-env)
which detail the options that it supports. Generally your usage of `preset-env`
(hereafter I'll just call it "the preset"), could be as simple as having a
`babel config file` that contains:

```json
{
  "presets": ["@babel/preset-env"]
}
```

While this simple usage works, their docs state:

> "We don't recommend using `preset-env` this way because it doesn't take
> advantage of its ability to target specific browsers."

I would add to that, since using it this way will result in transforming _all_
your code to ES5 which in a lot of cases you don't need-unless you get to
support really old environments. In most cases, at least where I've worked, we
generally only supported relatively recent browsers, and one of the coolest
features of the preset is that it integrates with `Browserslist` to allow you to
use the same targets that other tools utilizes. For instance, you can use a
`.browserslistrc` file to specify your targets with something like:

```
last 1 version
> 1%
maintained node versions
not dead
```

One of the benefits of using an approach like this is that you don't have to
manually maintain what versions of the browsers and such that you are targeting,
letting you instead focus on the code that you write.

### Using the Debug option

In addition to the fabulous `Browserslist` integration, there's a number of
other options that you can pass to the preset in order to customize or even
debug it. For instance if you use it like:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "debug": true
      }
    ]
  ]
}
```

You'll get a bunch of useful debug information to help you know what plugins are
being applied (and what browsers you're targeting that require them), something
like the following:

```shell
@babel/preset-env: `DEBUG` option
Using targets:
{
  "android": "67",
  "chrome": "74",
  "edge": "17",
  "firefox": "66",
  "ie": "10",
  "ios": "12",
  "node": "10.16",
  "opera": "12.1",
  "safari": "12",
  "samsung": "8.2"
}
Using modules transform: false
Using plugins:
  transform-template-literals { "android":"67", "ie":"10", "ios":"12", "opera":"12.1", "safari":"12" }
  transform-literals { "android":"67", "ie":"10", "opera":"12.1" }
  transform-function-name { "android":"67", "edge":"17", "ie":"10", "opera":"12.1" }
  transform-arrow-functions { "android":"67", "ie":"10", "opera":"12.1" }
  transform-block-scoped-functions { "android":"67", "ie":"10", "opera":"12.1" }
  transform-classes { "android":"67", "ie":"10", "opera":"12.1" }
  transform-object-super { "android":"67", "ie":"10", "opera":"12.1" }
  transform-shorthand-properties { "android":"67", "ie":"10", "opera":"12.1" }
  transform-duplicate-keys { "android":"67", "ie":"10", "opera":"12.1" }
  transform-computed-properties { "android":"67", "ie":"10", "opera":"12.1" }
  transform-for-of { "android":"67", "ie":"10", "opera":"12.1" }
  transform-sticky-regex { "android":"67", "ie":"10", "opera":"12.1" }
  transform-dotall-regex { "android":"67", "edge":"17", "firefox":"66", "ie":"10", "opera":"12.1" }
  transform-unicode-regex { "android":"67", "ie":"10", "opera":"12.1" }
  transform-spread { "android":"67", "ie":"10", "opera":"12.1" }
  transform-parameters { "android":"67", "edge":"17", "ie":"10", "opera":"12.1" }
  transform-destructuring { "android":"67", "ie":"10", "opera":"12.1" }
  transform-block-scoping { "android":"67", "ie":"10", "opera":"12.1" }
  transform-typeof-symbol { "android":"67", "ie":"10", "opera":"12.1" }
  transform-new-target { "android":"67", "ie":"10", "opera":"12.1" }
  transform-regenerator { "android":"67", "ie":"10", "opera":"12.1" }
  transform-exponentiation-operator { "android":"67", "ie":"10", "opera":"12.1" }
  transform-async-to-generator { "android":"67", "ie":"10", "opera":"12.1" }
  proposal-async-generator-functions { "android":"67", "edge":"17", "ie":"10", "opera":"12.1" }
  proposal-object-rest-spread { "android":"67", "edge":"17", "ie":"10", "opera":"12.1" }
  proposal-unicode-property-regex { "android":"67", "edge":"17", "firefox":"66", "ie":"10", "opera":"12.1", "samsung":"8.2" }
  proposal-json-strings { "android":"67", "edge":"17", "ie":"10", "opera":"12.1", "samsung":"8.2" }
  proposal-optional-catch-binding { "android":"67", "edge":"17", "ie":"10", "opera":"12.1", "samsung":"8.2" }
  transform-named-capturing-groups-regex { "android":"67", "edge":"17", "firefox":"66", "ie":"10", "opera":"12.1", "samsung":"8.2" }
Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
```

The above was generated using the following `Browserslist` query:
`last 2 versions, current node`. As you can probably guess, in most applications
this includes way more than you actually need to support, in fact using
`npx browserslist 'last 2 versions, current node'` prints out the following list
right now:

```shell
and_chr 75
and_ff 67
and_qq 1.2
and_uc 11.8
android 67
baidu 7.12
bb 10
bb 7
chrome 75
chrome 74
edge 18
edge 17
firefox 67
firefox 66
ie 11
ie 10
ie_mob 11
ie_mob 10
ios_saf 12.2
ios_saf 12.0-12.1
kaios 2.5
node 10.16.0
op_mini all
op_mob 46
op_mob 12.1
opera 58
opera 57
safari 12.1
safari 12
samsung 9.2
samsung 8.2
```

## Why are targets so useful and important?

If you don't need to support things like ie10, you should probably adjust your
query to be something like the example used in the `.browserslistrc` file above.
Running that query,
`npx browserslist 'last 1 version, > 1%, maintained node versions, not dead'`
gives the following output:

```shell
and_chr 75
and_ff 67
and_qq 1.2
and_uc 11.8
android 67
baidu 7.12
chrome 75
chrome 74
chrome 73
edge 18
edge 17
firefox 67
firefox 66
ie 11
ie_mob 11
ios_saf 12.2
ios_saf 12.0-12.1
kaios 2.5
node 8.16.0
node 12.5.0
node 10.16.0
op_mini all
op_mob 46
opera 58
safari 12.1
samsung 9.2
```

Doing this change we dropped support for some old and dead things, like bb 10
and bb 7 (the blackberry browser), and added support for more node versions (8
and 12). We also grabbed an extra chrome version, probably due to its current
usage amount.

The preset's debug output for this list looks like this right now:

```shell
@babel/preset-env: `DEBUG` option
Using targets:
{
  "android": "67",
  "chrome": "73",
  "edge": "17",
  "firefox": "66",
  "ie": "11",
  "ios": "12",
  "node": "8.16",
  "opera": "46",
  "safari": "12.1",
  "samsung": "9.2"
}
Using modules transform: false
Using plugins:
  transform-template-literals { "android":"67", "ie":"11", "ios":"12", "safari":"12.1" }
  transform-literals { "android":"67", "ie":"11" }
  transform-function-name { "android":"67", "edge":"17", "ie":"11" }
  transform-arrow-functions { "android":"67", "ie":"11" }
  transform-block-scoped-functions { "android":"67" }
  transform-classes { "android":"67", "ie":"11" }
  transform-object-super { "android":"67", "ie":"11" }
  transform-shorthand-properties { "android":"67", "ie":"11" }
  transform-duplicate-keys { "android":"67", "ie":"11" }
  transform-computed-properties { "android":"67", "ie":"11" }
  transform-for-of { "android":"67", "ie":"11" }
  transform-sticky-regex { "android":"67", "ie":"11" }
  transform-dotall-regex { "android":"67", "edge":"17", "firefox":"66", "ie":"11", "opera":"46" }
  transform-unicode-regex { "android":"67", "ie":"11" }
  transform-spread { "android":"67", "ie":"11" }
  transform-parameters { "android":"67", "edge":"17", "ie":"11" }
  transform-destructuring { "android":"67", "ie":"11" }
  transform-block-scoping { "android":"67", "ie":"11" }
  transform-typeof-symbol { "android":"67", "ie":"11" }
  transform-new-target { "android":"67", "ie":"11" }
  transform-regenerator { "android":"67", "ie":"11" }
  transform-exponentiation-operator { "android":"67", "ie":"11" }
  transform-async-to-generator { "android":"67", "ie":"11" }
  proposal-async-generator-functions { "android":"67", "edge":"17", "ie":"11", "node":"8.16", "opera":"46" }
  proposal-object-rest-spread { "android":"67", "edge":"17", "ie":"11", "opera":"46" }
  proposal-unicode-property-regex { "android":"67", "edge":"17", "firefox":"66", "ie":"11", "node":"8.16", "opera":"46", "samsung":"9.2" }
  proposal-json-strings { "android":"67", "edge":"17", "ie":"11", "node":"8.16", "opera":"46", "samsung":"9.2" }
  proposal-optional-catch-binding { "android":"67", "edge":"17", "ie":"11", "node":"8.16", "opera":"46", "samsung":"9.2" }
  transform-named-capturing-groups-regex { "android":"67", "edge":"17", "firefox":"66", "ie":"11", "node":"8.16", "opera":"46", "samsung":"9.2" }
Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
```

If your organization has decided to drop support for Internet Explorer entirely,
you could append an exclusion to your query `not ie 11, not ie_mob 11` and take
those off the list as well. If you're going to do that, you might even be able
to convince your organization to drop what is called "Android Browser" in
caniuse ("android 67" above) since it has 0% usage, to reduce the amount of
transforms you apply even more. So, add `not android 67` to your query. Once
you've done that, the preset debug output looks more like this:

```shell
@babel/preset-env: `DEBUG` option
Using targets:
{
  "chrome": "73",
  "edge": "17",
  "firefox": "66",
  "ios": "12",
  "node": "8.16",
  "opera": "46",
  "safari": "12.1",
  "samsung": "9.2"
}
Using modules transform: false
Using plugins:
  transform-template-literals { "ios":"12", "safari":"12.1" }
  transform-function-name { "edge":"17" }
  transform-dotall-regex { "edge":"17", "firefox":"66", "opera":"46" }
  transform-parameters { "edge":"17" }
  proposal-async-generator-functions { "edge":"17", "node":"8.16", "opera":"46" }
  proposal-object-rest-spread { "edge":"17", "opera":"46" }
  proposal-unicode-property-regex { "edge":"17", "firefox":"66", "node":"8.16", "opera":"46", "samsung":"9.2" }
  proposal-json-strings { "edge":"17", "node":"8.16", "opera":"46", "samsung":"9.2" }
  proposal-optional-catch-binding { "edge":"17", "node":"8.16", "opera":"46", "samsung":"9.2" }
  transform-named-capturing-groups-regex { "edge":"17", "firefox":"66", "node":"8.16", "opera":"46", "samsung":"9.2" }
Using polyfills: No polyfills were added, since the `useBuiltIns` option was not set.
```

These adjustments are important for a lot of reasons, but the biggest one is
that each plugin that you use in Babel contributes to how long the process
takes. While that might not seem like a huge deal in your application, it can
add up. For those who didn't feel like counting, adjusting our targets reduced
our list of transforms that we use from 28 to 9. While this does exclude some
possible users, you'll want to work with your analytics to determine if that
actually matters. If it does, you might look into the module/nomodule split to
produce two different bundles,
[something that Jake Archibald has an excellent post on](https://jakearchibald.com/2017/es-modules-in-browsers/#nomodule-for-backwards-compatibility).

Another feature that the preset supports is the modules transform (you might
have noticed that mentioned in the debug logs above). There's a number of modes
for this transform, with the default being "auto" (usually ends up as commonjs).
For those that use webpack to bundle your code, you'll want to set
`modules: false` in order to allow webpack's cool features like tree shaking to
work. If you don't set `modules: false`, babel will transform the import/export
statements into require/`module.exports` statements (aka not ES6 modules), which
webpack can't statically analyze. In cases for library code, you'll probably
want to produce an ES6 modules build, and a commonjs build, but maybe not.

To sum up, `@babel/preset-env` is a smart preset - a collection of plugins that
are enabled or disabled based on the targets you give it to transform your code
into something compatible with your targets. Hopefully you learned something
from this, I certainly did while writing it!

_Banner image courtesy of undraw.co_
